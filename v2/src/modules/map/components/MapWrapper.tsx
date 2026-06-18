'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, ChevronDown, ChevronUp, Eye, Flame, Info, Pause, Play } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const FireMap = dynamic(() => import('./FireMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-neutral-950 text-neutral-400">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute h-full w-full animate-ping rounded-full bg-emerald-500/20" />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
            <Flame size={24} className="animate-pulse" />
          </div>
        </div>
        <p className="font-display text-sm font-medium tracking-wider text-emerald-500/80 uppercase">
          Loading Satellite Data...
        </p>
      </div>
    </div>
  ),
});

export default function MapWrapper() {
  const [date, setDate] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'yesterday' | '2days' | 'custom'>('yesterday');
  const [isExpanded, setIsExpanded] = useState(true);
  const [opacity, setOpacity] = useState(0.8);
  const [isPlaying, setIsPlaying] = useState(false);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Default to yesterday to ensure data availability
    const d = new Date();
    d.setDate(d.getDate() - 1);
    setDate(d.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        setDate((prevDate) => {
          const d = new Date(prevDate);
          d.setDate(d.getDate() + 1);
          // If date is in future, reset to 7 days ago
          if (d > new Date()) {
            const resetDate = new Date();
            resetDate.setDate(resetDate.getDate() - 7);
            return resetDate.toISOString().split('T')[0];
          }
          return d.toISOString().split('T')[0];
        });
      }, 1500);
    } else {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    }
    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlaying]);

  const handlePeriodChange = (period: 'today' | 'yesterday' | '2days') => {
    setSelectedPeriod(period);
    setIsPlaying(false);
    const d = new Date();
    if (period === 'yesterday') d.setDate(d.getDate() - 1);
    if (period === '2days') d.setDate(d.getDate() - 2);
    setDate(d.toISOString().split('T')[0]);
  };

  const togglePlay = () => {
    if (!isPlaying) {
      // Start from 7 days ago if not already playing
      const d = new Date();
      d.setDate(d.getDate() - 7);
      setDate(d.toISOString().split('T')[0]);
      setSelectedPeriod('custom');
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-neutral-950">
      {date && <FireMap date={date} opacity={opacity} />}

      {/* Overlay Controls */}
      <div className="absolute top-16 left-4 z-1001 w-[calc(100%-2rem)] md:top-4 md:w-80">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Card className="overflow-hidden border-white/10 bg-black/60 p-0 shadow-xl backdrop-blur-xl">
            {/* Header */}
            <div
              className="flex cursor-pointer items-center justify-between border-b border-white/5 p-4 transition-colors hover:bg-white/5"
              onClick={() => setIsExpanded(!isExpanded)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setIsExpanded(!isExpanded);
                }
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-red-500/20 to-orange-500/20 text-red-500 shadow-lg ring-1 shadow-red-500/10 ring-red-500/20">
                  <Flame size={20} fill="currentColor" className="text-red-500" />
                </div>
                <div>
                  <h2 className="font-display text-sm font-bold text-white">Global Fire Map</h2>
                  <p className="text-xs font-medium text-neutral-400">NASA FIRMS Data</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-white">
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="space-y-6 p-4 pt-2">
                    {/* Date Controls */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                          <CalendarIcon size={12} />
                          <span>Observation Period</span>
                        </div>
                        <span className="font-mono text-[10px] text-neutral-500">{date}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-1.5 rounded-lg bg-white/5 p-1">
                        {[
                          { id: 'today', label: 'Today' },
                          { id: 'yesterday', label: 'Yesterday' },
                          { id: '2days', label: '2 Days Ago' },
                        ].map((period) => (
                          <button
                            key={period.id}
                            onClick={() => handlePeriodChange(period.id as 'today' | 'yesterday' | '2days')}
                            className={cn(
                              'rounded-md px-2 py-2 text-[10px] font-semibold tracking-wide uppercase transition-all duration-200 sm:text-xs',
                              selectedPeriod === period.id
                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                                : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                            )}
                          >
                            {period.label}
                          </button>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-full justify-start border-white/10 bg-white/5 text-left font-normal text-white hover:bg-white/10 hover:text-white',
                                  !date && 'text-muted-foreground'
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(new Date(date), 'PPP') : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="border-white/10 bg-neutral-900 text-white" align="start">
                              <Calendar
                                mode="single"
                                selected={date ? new Date(date) : undefined}
                                onSelect={(d) => {
                                  if (d) {
                                    setDate(format(d, 'yyyy-MM-dd'));
                                    setSelectedPeriod('custom');
                                    setIsPlaying(false);
                                  }
                                }}
                                disabled={(date) => date > new Date() || date < new Date('2000-01-01')}
                                className="bg-neutral-900 text-white"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={togglePlay}
                          className={cn(
                            'border-white/10 bg-white/5 hover:bg-white/10 hover:text-emerald-400',
                            isPlaying && 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                          )}
                        >
                          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                        </Button>
                      </div>
                    </div>

                    {/* Opacity Control */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                          <Eye size={12} />
                          <span>Layer Opacity</span>
                        </div>
                        <span className="font-mono text-[10px] text-neutral-500">{Math.round(opacity * 100)}%</span>
                      </div>
                      <input
                        id="opacity-slider"
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={opacity}
                        aria-label="Layer Opacity"
                        onChange={(e) => setOpacity(parseFloat(e.target.value))}
                        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-emerald-500 hover:accent-emerald-400"
                      />
                    </div>

                    {/* Info Box */}
                    <div className="rounded-lg border border-white/5 bg-white/5 p-3">
                      <div className="flex items-start gap-3">
                        <Info size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-white">About the Data</p>
                          <p className="text-[11px] leading-relaxed text-neutral-400">
                            Red/Orange dots represent thermal anomalies detected by MODIS & VIIRS satellites. Use the
                            play button to visualize fire progression over time.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
