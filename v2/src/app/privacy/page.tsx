import { AnimatedGroup } from '@/components/ui';
import { siteConfig } from '@/config/pages';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Forest Fire Classifier',
};

export default function PrivacyPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
      <AnimatedGroup preset="blur-slide" className="space-y-12">
        <header className="space-y-4 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
          <p className="text-muted-foreground text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        </header>

        <div className="prose prose-invert prose-lg text-muted-foreground mx-auto max-w-none space-y-8">
          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">1. Introduction</h2>
            <p>
              Welcome to {siteConfig.name} ("we," "our," or "us"). We are committed to protecting your privacy. This
              Privacy Policy explains how we handle your information when you use our website and services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">2. Data Processing</h2>
            <p>
              Our application is designed with a "privacy-first" approach. When you use our image classification tool:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">Server-Side Processing:</strong> Image analysis is performed on our
                secure servers to ensure consistent performance and protect our proprietary model architecture. Images
                are transmitted securely via encryption.
              </li>
              <li>
                <strong className="text-foreground">No Data Retention:</strong> We operate with a strict no-storage
                policy. Images are processed in memory for the sole purpose of generating a prediction and are
                immediately discarded. We do <strong>not</strong> store, save, or use your uploaded images to train our
                models.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">3. Analytics</h2>
            <p>
              We use Vercel Analytics to understand how our website is used. This service collects anonymous usage data,
              such as:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Page views and navigation paths</li>
              <li>Device type and browser information</li>
              <li>General geographic location (country/region)</li>
            </ul>
            <p>
              This data is aggregated and does not identify individual users. We use this information solely to improve
              the performance and user experience of our application.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">4. Third-Party Services</h2>
            <p>
              Our website is hosted on Vercel. Please refer to Vercel's privacy policy for information on how they
              handle data related to hosting and infrastructure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <a href={`mailto:${siteConfig.author.email}`} className="text-primary hover:underline">
                {siteConfig.author.email}
              </a>
            </p>
          </section>
        </div>
      </AnimatedGroup>
    </main>
  );
}
