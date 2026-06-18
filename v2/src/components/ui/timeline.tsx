'use client';

import { cn } from '@/lib/utils';
import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface TimelineEntry {
  phase: string;
  duration: string;
  description: string;
  achievements: string[];
}

interface TimelineProps {
  data: TimelineEntry[];
  className?: string;
}

export function Timeline({ data, className }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className={cn('w-full', className)} ref={containerRef}>
      <div ref={ref} className="relative">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex justify-start pt-10 md:gap-10 md:pt-20"
          >
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="bg-primary shadow-primary/25 absolute left-3 flex h-10 w-10 items-center justify-center rounded-full shadow-lg md:left-3">
                <div className="h-4 w-4 rounded-full border border-white/30 bg-white/20 backdrop-blur-sm" />
              </div>
              <div className="hidden md:block md:pl-20">
                <h3 className="text-primary mb-1 text-lg font-semibold">{item.phase}</h3>
                <p className="text-muted-foreground text-sm">{item.duration}</p>
              </div>
            </div>

            <div className="relative w-full pr-4 pl-20 md:pl-4">
              <div className="mb-4 md:hidden">
                <h3 className="text-primary mb-1 text-lg font-semibold">{item.phase}</h3>
                <p className="text-muted-foreground text-sm">{item.duration}</p>
              </div>

              <div className="border-primary/10 bg-card/50 hover:border-primary/30 hover:shadow-primary/5 rounded-lg border p-6 backdrop-blur-sm transition-all hover:shadow-lg">
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex} className="flex items-start gap-2">
                      <div className="bg-primary mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                      <span className="text-muted-foreground text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}

        <div
          style={{
            height: height + 'px',
          }}
          className="via-primary/20 absolute top-0 left-8 w-0.5 overflow-hidden bg-linear-to-b from-transparent to-transparent md:left-8"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="from-primary via-primary/80 absolute inset-x-0 top-0 w-0.5 rounded-full bg-linear-to-b to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
