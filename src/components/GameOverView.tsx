import React from 'react';
import { GameNode } from '../types';
import { AlertTriangle, RotateCcw, ArrowLeft, Brain, HeartHandshake, BatteryCharging, Sparkles } from 'lucide-react';

interface GameOverViewProps {
  node: GameNode;
  onRetry: () => void;
  onUndoLastStep: () => void;
  canUndo: boolean;
}

export const GameOverView: React.FC<GameOverViewProps> = ({
  node,
  onRetry,
  onUndoLastStep,
  canUndo,
}) => {
  const stats = node.finalStatsOverview || {
    childFocus: 0,
    familyBond: 20,
    parentEnergy: 20,
    creativityMovement: 10,
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#1f1d1b] border border-[#c4472a]/50 rounded-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Top Warning Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#c4472a] via-[#e5593e] to-[#c4472a]" />

      <div className="flex items-center gap-2 mb-4">
        <span className="p-1.5 rounded bg-[#381a14] border border-[#7a2c1a] text-[#e87056]">
          <AlertTriangle className="w-4 h-4" />
        </span>
        <span className="font-mono text-xs tracking-[0.2em] text-[#e87056] uppercase font-semibold">
          {node.actTitle || 'Ślepy zaułek (Game Over)'}
        </span>
      </div>

      <h2 className="font-serif text-xl sm:text-2xl text-[#f5efe6] font-bold mb-4">
        Sytuacja wymknęła się spod kontroli
      </h2>

      {/* Main Narrative */}
      <p className="font-serif text-base text-[#e0d7c6] leading-relaxed mb-6 bg-[#151413] p-5 rounded border border-[#3e3a35]">
        {node.text}
      </p>

      {/* Game Commentary / Educational Insight */}
      {node.gameOverCommentary && (
        <div className="mb-6 bg-[#2a1d1a] border-l-4 border-[#c4472a] p-4 rounded-r border-t border-b border-r border-[#3e3a35]">
          <span className="block font-mono text-xs text-[#e87056] uppercase tracking-wider mb-1">
            Wskazówka ekspercka:
          </span>
          <p className="font-serif text-sm italic text-[#ebdcd5]">
            „{node.gameOverCommentary}”
          </p>
        </div>
      )}

      {/* Final Outcome Metrics */}
      <div className="mb-8 bg-[#151413] border border-[#3e3a35] rounded-lg p-4">
        <span className="block font-mono text-xs text-[#a09888] uppercase tracking-wider mb-3">
          Wskaźniki końcowe tej ścieżki:
        </span>

        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          <div className="flex items-center justify-between bg-[#23211f] p-2.5 rounded border border-[#3e3a35]">
            <span className="text-[#b0a898] flex items-center gap-1">
              <Brain className="w-3.5 h-3.5 text-[#e87056]" />
              Skupienie Dziecka:
            </span>
            <span className="font-bold text-[#e87056]">{stats.childFocus}%</span>
          </div>

          <div className="flex items-center justify-between bg-[#23211f] p-2.5 rounded border border-[#3e3a35]">
            <span className="text-[#b0a898] flex items-center gap-1">
              <HeartHandshake className="w-3.5 h-3.5 text-[#e87056]" />
              Wspólna Relacja:
            </span>
            <span className="font-bold text-[#e87056]">{stats.familyBond}%</span>
          </div>

          <div className="flex items-center justify-between bg-[#23211f] p-2.5 rounded border border-[#3e3a35]">
            <span className="text-[#b0a898] flex items-center gap-1">
              <BatteryCharging className="w-3.5 h-3.5 text-[#e87056]" />
              Energia Rodzica:
            </span>
            <span className="font-bold text-[#e87056]">{stats.parentEnergy}%</span>
          </div>

          <div className="flex items-center justify-between bg-[#23211f] p-2.5 rounded border border-[#3e3a35]">
            <span className="text-[#b0a898] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#e87056]" />
              Kreatywność i Ruch:
            </span>
            <span className="font-bold text-[#e87056]">{stats.creativityMovement}%</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        {canUndo && (
          <button
            onClick={onUndoLastStep}
            className="flex-1 bg-[#23211f] hover:bg-[#2c2926] text-[#f5efe6] border border-[#3e3a35] font-mono text-sm py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Cofnij tylko ostatni wybór</span>
          </button>
        )}

        <button
          onClick={onRetry}
          className="flex-1 bg-[#c4472a] hover:bg-[#a83820] text-[#ffffff] font-mono font-bold text-sm py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-xl"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Cofnij czas i spróbuj jeszcze raz</span>
        </button>
      </div>
    </div>
  );
};
