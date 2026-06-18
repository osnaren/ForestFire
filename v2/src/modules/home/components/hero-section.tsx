// 'use client';

import RotatingText from '@/blocks/TextAnimations/RotatingText/RotatingText';
import { AnimatedGradientText, AnimatedGroup, FloatingElement, GlowingButton } from '@/components/ui';
import { homeConfig } from '@/config/pages';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative px-4 py-24 sm:py-32 lg:py-40" role="banner">
      <div className="relative z-10 mx-auto max-w-7xl space-y-10 text-center">
        <AnimatedGroup preset="blur-slide">
          {/* Status Badge */}
          <header className="mb-8 flex justify-center">
            <AnimatedGradientText>
              🔥 <hr className="bg-border mx-2 h-4 w-px shrink-0" />{' '}
              <span className="from-primary via-accent to-primary animate-gradient inline bg-linear-to-r bg-size-[200%_100%] bg-clip-text text-transparent">
                {homeConfig.hero.badge.text}
              </span>
              <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>
          </header>
        </AnimatedGroup>

        <div className="space-y-8">
          <div className="relative">
            <FloatingElement duration={6} yOffset={8} intensity={0.4} delay={0.2}>
              <h1 className="font-display text-foreground relative flex flex-col items-center gap-2 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                <span className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                  <span className="text-foreground">{homeConfig.hero.title.main}</span>
                  <RotatingText
                    texts={homeConfig.hero.title.classes}
                    mainClassName="px-2 sm:px-3 md:px-4 overflow-hidden py-1 sm:py-2 md:py-3 justify-center rounded-lg bg-muted/50 backdrop-blur-sm"
                    staggerFrom={'last'}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-120%' }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                    rotationInterval={2500}
                    animateOnMount={false}
                  />
                </span>
                <span className="from-primary via-primary to-accent relative block bg-linear-to-r bg-clip-text text-transparent">
                  {homeConfig.hero.title.accent}
                  <div className="from-primary/10 to-accent/10 absolute -inset-2 rounded-lg bg-linear-to-r opacity-50 blur-xl" />
                </span>
              </h1>
            </FloatingElement>
          </div>

          <div className="relative">
            <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed sm:text-xl lg:text-2xl">
              {homeConfig.hero.description}
            </p>
            <div className="via-primary/5 absolute inset-0 rounded-lg bg-linear-to-r from-transparent to-transparent opacity-30 blur-xl" />
          </div>
        </div>

        {/* Action Buttons */}
        <AnimatedGroup preset="blur-slide" className="pt-4">
          <nav
            className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6"
            role="navigation"
            aria-label="Primary actions"
          >
            <Link href={homeConfig.hero.cta.primary.href} className="group">
              <GlowingButton size="lg" className="w-full px-8 py-4 text-lg font-semibold transition-all sm:w-auto">
                {homeConfig.hero.cta.primary.text}
                <div className="ml-2 transition-transform duration-200 group-hover:translate-x-1">→</div>
              </GlowingButton>
            </Link>
            <Link
              href={homeConfig.hero.cta.secondary.href}
              className="border-border bg-card/50 text-foreground hover:border-border/60 hover:bg-card/70 focus:ring-ring flex items-center justify-center gap-2 rounded-xl border px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              {homeConfig.hero.cta.secondary.text}
            </Link>
          </nav>
        </AnimatedGroup>
      </div>
    </section>
  );
}
