import { existsSync } from 'fs';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';

const MODEL_URL = process.env.MODEL_URL || 'https://cdn.osnaren.com/forest-fire/model/model.json';
const CACHE_DIR = path.join(os.tmpdir(), 'forest-fire-model');

/**
 * Ensures the model files are present in the local cache directory.
 * Downloads them from the CDN if they are missing.
 * @returns Object containing paths to the model.json and the directory containing weights.
 */
export async function getModelPaths(): Promise<{ modelJsonPath: string; modelDir: string }> {
  // Ensure cache directory exists
  if (!existsSync(CACHE_DIR)) {
    await fs.mkdir(CACHE_DIR, { recursive: true });
  }

  const modelJsonPath = path.join(CACHE_DIR, 'model.json');

  // Check if model.json exists
  // In a real production environment, you might want to implement version checking or TTL
  if (!existsSync(modelJsonPath)) {
    console.log('Model not found in cache. Downloading from:', MODEL_URL);
    await downloadModel(MODEL_URL, CACHE_DIR);
  } else {
    console.log('Model found in cache:', modelJsonPath);
  }

  return { modelJsonPath, modelDir: CACHE_DIR };
}

async function downloadModel(url: string, destDir: string) {
  // Download model.json
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch model.json: ${response.statusText}`);

  const modelJson = await response.json();
  await fs.writeFile(path.join(destDir, 'model.json'), JSON.stringify(modelJson));

  // Download weights
  // modelJson.weightsManifest is an array of groups
  // We assume the weights are relative to the model.json URL
  const baseUrl = url.substring(0, url.lastIndexOf('/') + 1);

  if (modelJson.weightsManifest) {
    for (const group of modelJson.weightsManifest) {
      for (const relativePath of group.paths) {
        const weightUrl = baseUrl + relativePath;
        const weightDest = path.join(destDir, relativePath);

        // Ensure subdirectory exists if relativePath contains folders
        const weightDir = path.dirname(weightDest);
        if (!existsSync(weightDir)) {
          await fs.mkdir(weightDir, { recursive: true });
        }

        // Check if weight file already exists
        if (!existsSync(weightDest)) {
          console.log(`Downloading weight: ${relativePath}`);
          const weightRes = await fetch(weightUrl);
          if (!weightRes.ok) throw new Error(`Failed to fetch weight ${relativePath}: ${weightRes.statusText}`);

          const buffer = await weightRes.arrayBuffer();
          await fs.writeFile(weightDest, Buffer.from(buffer));
        }
      }
    }
  }
  console.log('Model download complete.');
}
