import React from 'react';
import { Volume2, VolumeX, RotateCcw, ArrowLeft, BookOpen } from 'lucide-react';

interface HeaderProps {
  actTitle?: string;
  timeLabel?: string;
  progressPercent: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onRestart: () => void;
  canGoBack: boolean;
  onGoBack: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  actTitle,
  timeLabel,
  progressPercent,
  soundEnabled,
  onToggleSound,
  onRestart,
  canGoBack,
  onGoBack,
}) => {
  return (
    <header className="w-full max-w-2xl mx-auto mb-6 select-none">
      <div className="flex items-center justify-between border-b border-[#3e3a35] pb-3 mb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#b08d57]" />
          <span className="font-mono text-xs tracking-[0.2em] text-[#a09888] uppercase font-semibold">
            W CO GRA ADAM
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#23211f] text-[#b08d57] border border-[#3e3a35]">
            3–5 min
          </span>
        </div>

        <div className="flex items-center gap-2">
          {canGoBack && (
            <button
              onClick={onGoBack}
              title="Cofnij ostatni wybór"
              className="flex items-center gap-1 text-xs font-mono text-[#b0a898] hover:text-[#f0e8db] transition-colors px-2.5 py-1 rounded bg-[#23211f] border border-[#3e3a35] hover:border-[#b08d57]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cofnij</span>
            </button>
          )}

          <button
            onClick={onRestart}
            title="Rozpocznij od nowa"
            className="flex items-center gap-1 text-xs font-mono text-[#b0a898] hover:text-[#f0e8db] transition-colors px-2.5 py-1 rounded bg-[#23211f] border border-[#3e3a35] hover:border-[#b08d57]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Od nowa</span>
          </button>

          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Wycisz dźwięki' : 'Włącz dźwięki'}
            className="p-1.5 rounded bg-[#23211f] text-[#b0a898] hover:text-[#b08d57] border border-[#3e3a35] hover:border-[#b08d57] transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[#b08d57]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-[#736c5f]" />
            )}
          </button>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-[#151413] h-2 rounded-full overflow-hidden border border-[#3e3a35] mb-3">
        <div
          className="bg-gradient-to-r from-[#7a5d2e] via-[#b08d57] to-[#d9b882] h-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
        />
      </div>

      {/* Act & Time header bar */}
      <div className="flex items-center justify-between text-xs font-mono text-[#a09888]">
        <span>{actTitle || 'Gra paragrafowa dla rodziców'}</span>
        {timeLabel && (
          <span className="text-[#b08d57] font-semibold bg-[#23211f] px-2.5 py-0.5 rounded border border-[#3e3a35]">
            {timeLabel}
          </span>
        )}
      </div>
    </header>
  );
};
