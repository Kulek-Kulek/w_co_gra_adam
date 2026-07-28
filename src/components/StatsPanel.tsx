import React from 'react';
import { GameStats, ChoiceEffect } from '../types';
import { BatteryCharging, Brain, HeartHandshake, Sparkles } from 'lucide-react';

interface StatsPanelProps {
  stats: GameStats;
  lastDelta?: ChoiceEffect | null;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats, lastDelta }) => {
  const getBarColor = (val: number) => {
    if (val >= 60) return 'bg-[#5e7a5b] text-[#5e7a5b]';
    if (val >= 35) return 'bg-[#8a652e] text-[#8a652e]';
    return 'bg-[#c26343] text-[#c26343] animate-pulse';
  };

  const statItems = [
    {
      key: 'parentEnergy' as keyof GameStats,
      label: 'Energia Rodzica',
      shortDesc: 'Cierpliwość & siły',
      val: stats.parentEnergy,
      delta: lastDelta?.parentEnergy,
      icon: BatteryCharging,
    },
    {
      key: 'childFocus' as keyof GameStats,
      label: 'Skupienie Dziecka',
      shortDesc: 'Wyciszenie & odporność',
      val: stats.childFocus,
      delta: lastDelta?.childFocus,
      icon: Brain,
    },
    {
      key: 'familyBond' as keyof GameStats,
      label: 'Wspólna Relacja',
      shortDesc: 'Bliskość & poczucie więzi',
      val: stats.familyBond,
      delta: lastDelta?.familyBond,
      icon: HeartHandshake,
    },
    {
      key: 'creativityMovement' as keyof GameStats,
      label: 'Kreatywność i Ruch',
      shortDesc: 'Zdrowy rozwój & energia',
      val: stats.creativityMovement,
      delta: lastDelta?.creativityMovement,
      icon: Sparkles,
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mb-6 artistic-card rounded-xl p-4 sm:p-5 shadow-lg select-none">
      <div className="flex items-center justify-between mb-3 border-b border-[#e2d9cc] pb-2">
        <span className="font-mono text-[11px] tracking-[0.15em] text-[#5e564b] uppercase font-bold">
          Wskaźniki stanu (0–100%)
        </span>
        <span className="font-mono text-[10px] text-[#736c61]">
          Cel: Równowaga i wyciszenie
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {statItems.map((item) => {
          const Icon = item.icon;
          const deltaVal = item.delta;
          const displayVal = Math.min(100, Math.max(0, item.val));

          return (
            <div
              key={item.key}
              className="relative bg-[#faf8f5] border border-[#e2d9cc] rounded-lg p-3 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Icon className="w-3.5 h-3.5 text-[#8a652e] shrink-0" />
                  <span className="font-sans text-xs font-semibold text-[#2c2825] truncate">
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 font-mono text-xs">
                  {deltaVal !== undefined && deltaVal !== 0 && (
                    <span
                      key={Date.now() + item.key}
                      className={`animate-float-up text-[11px] font-bold ${
                        deltaVal > 0 ? 'text-[#3e6939]' : 'text-[#a64d30]'
                      }`}
                    >
                      {deltaVal > 0 ? `+${deltaVal}` : deltaVal}
                    </span>
                  )}
                  <span className="font-bold text-[#1a1714]">{displayVal}%</span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full h-2 bg-[#eee8dd] rounded-full overflow-hidden relative border border-[#e2d9cc]">
                <div
                  className={`h-full transition-all duration-700 ease-out rounded-full ${getBarColor(
                    displayVal
                  )}`}
                  style={{ width: `${displayVal}%` }}
                />
              </div>

              <div className="mt-1 text-[10px] text-[#736c61] font-mono flex justify-between">
                <span>{item.shortDesc}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
