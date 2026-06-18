'use client';

import { AnimatedGroup, GlowingButton } from '@/components/ui';
import { notFoundConfig } from '@/config/pages';
import { ArrowLeft, Home, MapPin, Trees } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const { title, description, actions, funFact } = notFoundConfig;

  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
        <Trees className="h-[80vh] w-[80vh]" />
      </div>

      <AnimatedGroup preset="scale" className="z-10 max-w-2xl space-y-8">
        {/* 404 Display */}
        <div className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-orange-500/10 ring-1 ring-orange-500/20 sm:h-56 sm:w-56">
          <div className="absolute inset-0 animate-pulse rounded-full bg-orange-500/5 blur-3xl" />
          <div className="flex flex-col items-center">
            <span className="font-display text-6xl font-bold text-orange-500 sm:text-8xl">404</span>
            <MapPin className="mt-2 h-8 w-8 text-orange-400/80" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          <p className="text-muted-foreground mx-auto max-w-lg text-lg">{description}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={actions.home.href}>
            <GlowingButton size="lg" className="w-full sm:w-auto">
              <Home className="mr-2 h-4 w-4" />
              {actions.home.text}
            </GlowingButton>
          </Link>

          <button
            onClick={() => router.back()}
            className="hover:bg-accent hover:text-accent-foreground border-input bg-background ring-offset-background focus-visible:ring-ring inline-flex h-11 w-full items-center justify-center rounded-md border px-8 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {actions.back.text}
          </button>
        </div>

        {/* Fun Fact Card */}
        <div className="bg-card/50 mx-auto mt-12 max-w-md rounded-xl border p-6 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <p className="text-muted-foreground text-left text-sm">
              <span className="text-foreground mb-1 block font-semibold">Fun Fact:</span>
              {funFact}
            </p>
          </div>
        </div>
      </AnimatedGroup>
    </main>
  );
}
