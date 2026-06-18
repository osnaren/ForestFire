'use client';

import { AnimatedGroup, GlowingButton } from '@/components/ui';
import { errorConfig } from '@/config/pages';
import { AlertTriangle, Home, RefreshCcw, ThermometerSun } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { title, description, actions, funFact } = errorConfig;

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
        <AlertTriangle className="h-[80vh] w-[80vh]" />
      </div>

      <AnimatedGroup preset="scale" className="z-10 max-w-2xl space-y-8">
        {/* 500 Display */}
        <div className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-red-500/10 ring-1 ring-red-500/20 sm:h-56 sm:w-56">
          <div className="absolute inset-0 animate-pulse rounded-full bg-red-500/5 blur-3xl" />
          <div className="flex flex-col items-center">
            <span className="font-display text-6xl font-bold text-red-500 sm:text-8xl">500</span>
            <ThermometerSun className="mt-2 h-8 w-8 text-red-400/80" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          <p className="text-muted-foreground mx-auto max-w-lg text-lg">{description}</p>
          {process.env.NODE_ENV === 'development' && (
            <div className="mx-auto mt-4 max-w-md rounded-md bg-red-950/30 p-4 text-left font-mono text-xs text-red-200">
              {error.message}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <GlowingButton size="lg" onClick={() => reset()} className="w-full sm:w-auto">
            <RefreshCcw className="mr-2 h-4 w-4" />
            {actions.retry.text}
          </GlowingButton>

          <Link href={actions.home.href || '/'}>
            <button className="hover:bg-accent hover:text-accent-foreground border-input bg-background ring-offset-background focus-visible:ring-ring inline-flex h-11 w-full items-center justify-center rounded-md border px-8 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 sm:w-auto">
              <Home className="mr-2 h-4 w-4" />
              {actions.home.text}
            </button>
          </Link>
        </div>

        {/* Fun Fact Card */}
        <div className="bg-card/50 mx-auto mt-12 max-w-md rounded-xl border p-6 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🧯</span>
            <p className="text-muted-foreground text-left text-sm">
              <span className="text-foreground mb-1 block font-semibold">Pro Tip:</span>
              {funFact}
            </p>
          </div>
        </div>
      </AnimatedGroup>
    </main>
  );
}
