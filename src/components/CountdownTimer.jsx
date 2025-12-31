import React, { useEffect, useMemo, useState } from 'react';
import { Paper, Group, Text, Badge, Divider } from '@mantine/core';
import {
  IconSwords,
  IconSparkles,
  IconCalendarEvent,
  IconClock,
  IconBolt,
  IconBroadcast,
} from '@tabler/icons-react';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandWhatsapp,
} from '@tabler/icons-react';


const SOCIALS = {
  facebook: 'https://facebook.com/clashofprodigies',
  instagram: 'https://instagram.com/clashofprodigies',
  tiktok: 'https://tiktok.com/@clashofprodigies',
  whatsapp: 'https://chat.whatsapp.com/KZ8XP7j3ECy9zzh8HXRKo3',
};


function coerceDate(value) {
  if (value instanceof Date) return value;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? new Date(Date.now()) : d;
}

function getTimeLeft(target) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

const pad = (n) => String(n).padStart(2, '0');

export const CountdownTimer = ({
  targetDate,
}) => {
  const target = useMemo(() => coerceDate(targetDate), [targetDate]);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  const totalSeconds = useMemo(() => {
    return (
      timeLeft.days * 86400 +
      timeLeft.hours * 3600 +
      timeLeft.minutes * 60 +
      timeLeft.seconds
    );
  }, [timeLeft]);

  const isFinished = useMemo(() => totalSeconds <= 0, [totalSeconds]);

  const stage = useMemo(() => {
    if (isFinished) return { label: 'LIVE NOW', mood: 'live' };
    if (totalSeconds <= 60) return { label: 'FINAL MINUTE', mood: 'critical' };
    if (totalSeconds <= 600) return { label: 'FINAL 10', mood: 'critical' };
    if (totalSeconds <= 3600) return { label: 'FINAL HOUR', mood: 'hot' };
    if (totalSeconds <= 86400) return { label: 'LAST DAY', mood: 'hot' };
    return { label: 'Start Date: ', mood: 'normal' };
  }, [isFinished, totalSeconds]);

  useEffect(() => {
    // Prevent scrolling while the overlay is mounted (web app “disabled” feel)
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    // Reset immediately if target changes
    setTimeLeft(getTimeLeft(target));

    if (isFinished) return;
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.getTime()]);

  const secondsProgress = isFinished ? 1 : (timeLeft.seconds % 60) / 60;

  const ringStyle = {
    background: `conic-gradient(rgba(255,255,255,0.92) ${
      secondsProgress * 360
    }deg, rgba(255,255,255,0.12) 0deg)`,
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      aria-modal="true"
      role="dialog"
    >
      {/* Component-scoped animation helpers */}
      <style>{`
        @keyframes copFloat { 0%{transform:translate3d(0,0,0)} 50%{transform:translate3d(0,-10px,0)} 100%{transform:translate3d(0,0,0)} }
        @keyframes copScan { 0%{transform:translateX(-120%) skewX(-12deg);opacity:0} 18%{opacity:.7} 70%{opacity:.55} 100%{transform:translateX(120%) skewX(-12deg);opacity:0} }
        @keyframes copFlicker { 0%,100%{opacity:1} 48%{opacity:.94} 50%{opacity:.72} 52%{opacity:.96} }
        @keyframes copPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.02)} }
      `}</style>

      {/* Hard overlay to disable the underlying app */}
      <div className="absolute inset-0 bg-slate-950/85" />

      {/* Neon arena background */}
      <div className="absolute inset-0">
        <div className="absolute -top-44 -left-44 h-[34rem] w-[34rem] rounded-full blur-3xl opacity-60 bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 animate-[copFloat_6.4s_ease-in-out_infinite]" />
        <div className="absolute -bottom-52 -right-52 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-55 bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 animate-[copFloat_7.6s_ease-in-out_infinite]" />
        <div className="absolute top-1/4 right-1/4 h-[22rem] w-[22rem] rounded-full blur-3xl opacity-35 bg-gradient-to-br from-emerald-400 via-lime-300 to-sky-400 animate-[copFloat_9.2s_ease-in-out_infinite]" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.10) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            maskImage: 'radial-gradient(circle at center, black 45%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(circle at center, black 45%, transparent 75%)',
          }}
        />

        {/* Scan light */}
        <div className="absolute inset-0 overflow-hidden opacity-60">
          <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-xl animate-[copScan_5.2s_linear_infinite]" />
        </div>
      </div>

      {/* Content wrapper */}
      <div className="relative w-[min(980px,92vw)] px-3">
        
        <Paper
          radius="xl"
          shadow="xl"
          withBorder
          className={[
            'relative rounded-3xl border-white/15 bg-slate-950/55 backdrop-blur-xl',
            'p-6 sm:p-8',
            stage.mood === 'critical'
              ? 'animate-[copPulse_1.2s_ease-in-out_infinite]'
              : 'animate-[copFlicker_8s_ease-in-out_infinite]',
          ].join(' ')}
        >
          {/* Header */}
          <Group justify="space-between" align="flex-start" className="gap-4">
            <div className="min-w-0">
              <Group gap="xs" className="flex-wrap">
                <IconSwords size={22} />
                <span className="w-fit text-black font-display font-black text-xl tracking-tight">
                Clash of Prodigies&nbsp;
                <span className="uppercase tracking-tight text-green-500 text-2xl">3</span>
              </span>
                </Group>

              <Group gap="xs" className="mt-4 flex-wrap">
                <Badge
                  radius="xl"
                  variant="light"
                  className={[
                    'border border-white/25 text-white uppercase tracking-[0.22em] text-[0.65rem]',
                    stage.mood === 'live'
                      ? 'bg-emerald-500/25'
                      : stage.mood === 'critical'
                      ? 'bg-rose-500/25'
                      : stage.mood === 'hot'
                      ? 'bg-amber-500/20'
                      : 'bg-white/10',
                  ].join(' ')}
                >
                  {stage.label + target.toLocaleString()}
                </Badge>
              </Group>
            </div>

            <Badge
              radius="xl"
              leftSection={isFinished ? <IconBroadcast size={14} /> : <IconSparkles size={14} />}
              className={[
                'border border-white/25 text-white shadow-sm',
                isFinished
                  ? 'bg-emerald-500/30'
                  : stage.mood === 'critical'
                  ? 'bg-rose-500/25'
                  : 'bg-cyan-500/20',
              ].join(' ')}
            >
              {isFinished ? 'LIVE' : 'IDLE'}
            </Badge>
          </Group>

          <Divider my="lg" color="rgba(255,255,255,0.14)" />

          {/* Tiles */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <TimeTile
              label="Days"
              value={timeLeft.days}
              gradient="from-fuchsia-500 via-violet-500 to-cyan-400"
              glow="from-fuchsia-500/45 via-violet-500/30 to-cyan-400/35"
              emphasize={stage.mood !== 'normal'}
            />
            <TimeTile
              label="Hours"
              value={timeLeft.hours}
              gradient="from-cyan-400 via-sky-500 to-emerald-400"
              glow="from-cyan-400/35 via-sky-500/30 to-emerald-400/35"
              emphasize={stage.mood !== 'normal'}
            />
            <TimeTile
              label="Minutes"
              value={timeLeft.minutes}
              gradient="from-emerald-400 via-lime-300 to-amber-300"
              glow="from-emerald-400/35 via-lime-300/30 to-amber-300/35"
              emphasize={stage.mood === 'critical'}
            />
            <TimeTile
              label="Seconds"
              value={timeLeft.seconds}
              gradient="from-amber-400 via-orange-500 to-rose-500"
              glow="from-amber-400/35 via-orange-500/30 to-rose-500/35"
              emphasize={stage.mood === 'critical'}
              ringStyle={ringStyle}
              ringActive={!isFinished}
            />
          </div>

          {/* Footer */}
          <Group w={'100%'} justify="center" className="mt-5 gap-3 flex-wrap">
            <Group gap="xs">
                <SocialLink
                href={SOCIALS.facebook}
      label="Facebook"
      Icon={IconBrandFacebook}
      ring="from-[#1877F2]/60 to-white/10"
      hover="hover:bg-[#1877F2]/20"
    />
    <SocialLink
      href={SOCIALS.instagram}
      label="Instagram"
      Icon={IconBrandInstagram}
      ring="from-[#F58529]/60 via-[#DD2A7B]/40 to-[#8134AF]/40"
      hover="hover:bg-[#DD2A7B]/20"
    />
    <SocialLink
      href={SOCIALS.tiktok}
      label="TikTok"
      Icon={IconBrandTiktok}
      ring="from-black/40 to-white/10"
      hover="hover:bg-white/10"
    />
    <SocialLink
      href={SOCIALS.whatsapp}
      label="WhatsApp"
      Icon={IconBrandWhatsapp}
      ring="from-[#25D366]/55 to-white/10"
      hover="hover:bg-[#25D366]/20"
    />
  </Group>
</Group>
        </Paper>
      </div>
    </div>
  );
};

const TimeTile = ({
  label,
  value,
  gradient,
  glow,
  emphasize,
  ringStyle,
  ringActive,
}) => {
  const barPct = Math.min(100, Math.max(10, (Number(value) / 60) * 100));

  return (
    <div className="relative">
      {/* Glow */}
      <div
        className={[
          'absolute -inset-2 rounded-2xl blur-2xl bg-gradient-to-r',
          glow,
          emphasize ? 'opacity-90' : 'opacity-70',
        ].join(' ')}
      />

      {/* Gradient frame */}
      <div className={['relative rounded-2xl p-[1px] bg-gradient-to-r', gradient].join(' ')}>
        <div className="relative rounded-2xl bg-slate-950/65 border border-white/10 backdrop-blur-xl px-4 py-4 overflow-hidden">
          {/* Optional seconds ring */}
          {ringStyle && (
            <div className="absolute -top-3 -right-3">
              <div className="h-11 w-11 rounded-full p-[2px]" style={ringStyle}>
                <div
                  className={[
                    'h-full w-full rounded-full bg-slate-950/85 border border-white/10',
                    ringActive ? 'animate-[copFlicker_6s_ease-in-out_infinite]' : '',
                  ].join(' ')}
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 text-white/80">
            <IconBolt size={16} />
            <span className="text-[0.7rem] uppercase tracking-[0.26em] font-semibold">
              {label}
            </span>
          </div>

          <div
            className={[
              'mt-3 font-black tabular-nums leading-none',
              'text-4xl sm:text-5xl md:text-6xl',
              'bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/60',
              emphasize ? 'drop-shadow-[0_0_18px_rgba(255,255,255,0.14)]' : '',
            ].join(' ')}
          >
            {pad(value)}
          </div>

          {/* Energy bar */}
          <div className="mt-4 h-[6px] w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className={['h-full rounded-full bg-gradient-to-r', gradient].join(' ')}
              style={{ width: `${barPct}%`, transition: 'width 400ms ease' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialLink = ({ href, label, Icon, ring, hover }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className={[
        'relative inline-flex items-center justify-center',
        'h-10 w-10 rounded-xl',
        'border border-white/15 bg-white/5 backdrop-blur',
        'transition-transform duration-150',
        'hover:scale-[1.06]',
        hover,
      ].join(' ')}
    >
      {/* gradient ring */}
      <span
        className={[
          'absolute -inset-[1px] rounded-xl',
          'bg-gradient-to-r',
          ring,
        ].join(' ')}
      />
      <span className="relative z-10 text-white/90">
        <Icon size={20} />
      </span>
    </a>
  );
};
