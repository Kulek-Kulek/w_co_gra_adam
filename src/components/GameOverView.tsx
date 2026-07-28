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
    <div className="w-full max-w-2xl mx-auto bg-[#ffffff] border border-[#e5a092] rounded-xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      {/* Top Warning Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#c26343] via-[#d97c5f] to-[#c26343]" />

      <div className="flex items-center gap-2 mb-4">
        <span className="p-1.5 rounded bg-[#fdf2ef] border border-[#e5a092] text-[#c26343]">
          <AlertTriangle className="w-4 h-4" />
        </span>
        <span className="font-mono text-xs tracking-[0.2em] text-[#c26343] uppercase font-bold">
          {node.actTitle || 'Ślepy zaułek (Game Over)'}
        </span>
      </div>

      <h2 className="font-serif text-xl sm:text-2xl text-[#1a1714] font-bold mb-4">
        Sytuacja wymknęła się spod kontroli
      </h2>

      {/* Main Narrative */}
      <p className="font-serif text-base text-[#2c2825] leading-relaxed mb-6 bg-[#faf8f5] p-5 rounded-lg border border-[#e2d9cc]">
        {node.text}
      </p>

      {/* Game Commentary / Educational Insight */}
      {node.gameOverCommentary && (
        <div className="mb-6 bg-[#fdf6f4] border-l-4 border-[#c26343] p-4 rounded-r border-t border-b border-r border-[#f0d0c8]">
          <span className="block font-mono text-xs text-[#c26343] uppercase tracking-wider mb-1 font-bold">
            Wskazówka ekspercka:
          </span>
          <p className="font-serif text-sm italic text-[#4a352f]">
            „{node.gameOverCommentary}”
          </p>
        </div>
      )}

      {/* Final Outcome Metrics */}
      <div className="mb-8 bg-[#faf8f5] border border-[#e2d9cc] rounded-lg p-4">
        <span className="block font-mono text-xs text-[#736c61] uppercase tracking-wider mb-3">
          Wskaźniki końcowe tej ścieżki:
        </span>

        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          <div className="flex items-center justify-between bg-[#ffffff] p-2.5 rounded border border-[#e2d9cc]">
            <span className="text-[#5e564b] flex items-center gap-1">
              <Brain className="w-3.5 h-3.5 text-[#c26343]" />
              Skupienie Dziecka:
            </span>
            <span className="font-bold text-[#c26343]">{stats.childFocus}%</span>
          </div>

          <div className="flex items-center justify-between bg-[#ffffff] p-2.5 rounded border border-[#e2d9cc]">
            <span className="text-[#5e564b] flex items-center gap-1">
              <HeartHandshake className="w-3.5 h-3.5 text-[#c26343]" />
              Wspólna Relacja:
            </span>
            <span className="font-bold text-[#c26343]">{stats.familyBond}%</span>
          </div>

          <div className="flex items-center justify-between bg-[#ffffff] p-2.5 rounded border border-[#e2d9cc]">
            <span className="text-[#5e564b] flex items-center gap-1">
              <BatteryCharging className="w-3.5 h-3.5 text-[#c26343]" />
              Energia Rodzica:
            </span>
            <span className="font-bold text-[#c26343]">{stats.parentEnergy}%</span>
          </div>

          <div className="flex items-center justify-between bg-[#ffffff] p-2.5 rounded border border-[#e2d9cc]">
            <span className="text-[#5e564b] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#c26343]" />
              Kreatywność i Ruch:
            </span>
            <span className="font-bold text-[#c26343]">{stats.creativityMovement}%</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        {canUndo && (
          <button
            onClick={onUndoLastStep}
            className="flex-1 bg-[#f3ede2] hover:bg-[#eae1d0] text-[#1a1714] border border-[#e2d9cc] font-mono text-sm py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Cofnij tylko ostatni wybór</span>
          </button>
        )}

        <button
          onClick={onRetry}
          className="flex-1 bg-[#c26343] hover:bg-[#aa5133] text-[#ffffff] font-mono font-bold text-sm py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Cofnij czas i spróbuj jeszcze raz</span>
        </button>
      </div>
    </div>
  );
};
