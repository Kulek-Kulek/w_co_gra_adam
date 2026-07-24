import React from 'react';
import { GameStats, ChoiceEffect } from '../types';
import { BatteryCharging, Brain, HeartHandshake, Sparkles } from 'lucide-react';

interface StatsPanelProps {
  stats: GameStats;
  lastDelta?: ChoiceEffect | null;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats, lastDelta }) => {
  const getBarColor = (val: number) => {
    if (val >= 60) return 'bg-[#4a7c59] text-[#73b284]';
    if (val >= 35) return 'bg-[#b08d57] text-[#e0c36e]';
    return 'bg-[#c4472a] text-[#e87056] animate-pulse';
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
    <div className="w-full max-w-2xl mx-auto mb-8 artistic-card rounded-lg p-4 sm:p-5 shadow-2xl select-none">
      <div className="flex items-center justify-between mb-3 border-b border-[#3e3a35] pb-2">
        <span className="font-mono text-[11px] tracking-[0.15em] text-[#a09888] uppercase font-semibold">
          Wskaźniki stanu (0–100%)
        </span>
        <span className="font-mono text-[10px] text-[#8c8273]">
          Cel: Równowaga i wyciszenie
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {statItems.map((item) => {
          const Icon = item.icon;
          const deltaVal = item.delta;
          const displayVal = Math.min(100, Math.max(0, item.val));

          return (
            <div
              key={item.key}
              className="relative bg-[#151413] border border-[#3e3a35] rounded p-3 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Icon className="w-3.5 h-3.5 text-[#b08d57] shrink-0" />
                  <span className="font-sans text-xs font-semibold text-[#f0e8db] truncate">
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 font-mono text-xs">
                  {deltaVal !== undefined && deltaVal !== 0 && (
                    <span
                      key={Date.now() + item.key}
                      className={`animate-float-up text-[11px] font-bold ${
                        deltaVal > 0 ? 'text-[#52aa6a]' : 'text-[#e5593e]'
                      }`}
                    >
                      {deltaVal > 0 ? `+${deltaVal}` : deltaVal}
                    </span>
                  )}
                  <span className="font-bold text-[#f0e8db]">{displayVal}%</span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full h-2 bg-[#23211f] rounded-full overflow-hidden relative border border-[#3e3a35]/50">
                <div
                  className={`h-full transition-all duration-700 ease-out rounded-full ${getBarColor(
                    displayVal
                  )}`}
                  style={{ width: `${displayVal}%` }}
                />
              </div>

              <div className="mt-1 text-[10px] text-[#8c8273] font-mono flex justify-between">
                <span>{item.shortDesc}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
