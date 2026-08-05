import React from 'react';
import { Volume2, VolumeX, RotateCcw, ArrowLeft, BookOpen, Users } from 'lucide-react';
import { NodeType } from '../types';

interface HeaderProps {
  actTitle?: string;
  timeLabel?: string;
  progressPercent: number;
  nodeType?: NodeType;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onRestart: () => void;
  canGoBack: boolean;
  onGoBack: () => void;
  onOpenTeamModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  actTitle,
  timeLabel,
  progressPercent,
  nodeType,
  soundEnabled,
  onToggleSound,
  onRestart,
  canGoBack,
  onGoBack,
  onOpenTeamModal,
}) => {
  const isGameOver = nodeType === 'game_over';
  const isSuccess = nodeType === 'success';

  return (
    <header className="w-full max-w-2xl mx-auto mb-6 select-none">
      <div className="flex items-center justify-between border-b border-[#e2d9cc] pb-3 mb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#8a652e]" />
          <span className="font-mono text-xs tracking-[0.2em] text-[#5e564b] uppercase font-bold">
            W CO GRA ADAM
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f3ede2] text-[#8a652e] border border-[#e2d9cc] font-semibold">
            3–5 min
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={onOpenTeamModal}
            title="Zespół"
            className="flex items-center gap-1 text-xs font-mono text-[#5e564b] hover:text-[#1a1714] transition-colors px-2 py-1 rounded bg-[#f3ede2] hover:bg-[#eae1d0] border border-[#e2d9cc] hover:border-[#8a652e] cursor-pointer"
          >
            <Users className="w-3.5 h-3.5 text-[#8a652e]" />
            <span className="hidden sm:inline">Zespół</span>
          </button>

          {canGoBack && (
            <button
              onClick={onGoBack}
              title="Cofnij ostatni wybór"
              className="flex items-center gap-1 text-xs font-mono text-[#5e564b] hover:text-[#1a1714] transition-colors px-2.5 py-1 rounded bg-[#f3ede2] hover:bg-[#eae1d0] border border-[#e2d9cc] hover:border-[#8a652e] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cofnij</span>
            </button>
          )}

          <button
            onClick={onRestart}
            title="Rozpocznij od nowa"
            className="flex items-center gap-1 text-xs font-mono text-[#5e564b] hover:text-[#1a1714] transition-colors px-2.5 py-1 rounded bg-[#f3ede2] hover:bg-[#eae1d0] border border-[#e2d9cc] hover:border-[#8a652e] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Od nowa</span>
          </button>

          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Wycisz dźwięki' : 'Włącz dźwięki'}
            className="p-1.5 rounded bg-[#f3ede2] text-[#5e564b] hover:text-[#8a652e] border border-[#e2d9cc] hover:border-[#8a652e] transition-colors cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[#8a652e]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-[#a09888]" />
            )}
          </button>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-[#eee8dd] h-2 rounded-full overflow-hidden border border-[#e2d9cc] mb-3">
        <div
          className={`h-full transition-all duration-500 ease-out ${
            isGameOver
              ? 'bg-[#c26343]'
              : isSuccess
              ? 'bg-gradient-to-r from-[#a87f42] via-[#8a652e] to-[#d9b882]'
              : 'bg-gradient-to-r from-[#a87f42] via-[#8a652e] to-[#5e7a5b]'
          }`}
          style={{
            width: isGameOver || isSuccess ? '100%' : `${Math.min(100, Math.max(0, progressPercent))}%`,
          }}
        />
      </div>

      {/* Act & Time header bar */}
      <div className="flex items-center justify-between text-xs font-mono text-[#736c61]">
        <span>{actTitle || 'Gra paragrafowa dla rodziców'}</span>
        {timeLabel && (
          <span className="text-[#8a652e] font-semibold bg-[#f3ede2] px-2.5 py-0.5 rounded border border-[#e2d9cc]">
            {timeLabel}
          </span>
        )}
      </div>
    </header>
  );
};
