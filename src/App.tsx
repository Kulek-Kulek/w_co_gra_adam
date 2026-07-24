import React, { useState, useEffect } from 'react';
import { GameStats, Choice, HistoryItem, ChoiceEffect } from './types';
import { STORY_NODES, INITIAL_STATS } from './data/storyData';
import { Header } from './components/Header';
import { StatsPanel } from './components/StatsPanel';
import { StoryNode } from './components/StoryNode';
import { GameOverView } from './components/GameOverView';
import { SuccessView } from './components/SuccessView';
import { sounds } from './utils/audio';
import { BookOpen, Sparkles, Play, ShieldAlert, Heart, Brain, Save } from 'lucide-react';

const STORAGE_KEY = 'w_co_gra_adam_save_state';

interface SavedState {
  currentNodeId: string;
  stats: GameStats;
  history: HistoryItem[];
  wentOutdoor: boolean;
}

export default function App() {
  const [currentNodeId, setCurrentNodeId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: SavedState = JSON.parse(saved);
        if (parsed.currentNodeId && STORY_NODES[parsed.currentNodeId]) {
          return parsed.currentNodeId;
        }
      }
    } catch {
      // fallback
    }
    return 'splash';
  });

  const [stats, setStats] = useState<GameStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: SavedState = JSON.parse(saved);
        if (parsed.stats) return parsed.stats;
      }
    } catch {
      // fallback
    }
    return INITIAL_STATS;
  });

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: SavedState = JSON.parse(saved);
        if (Array.isArray(parsed.history)) return parsed.history;
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [wentOutdoor, setWentOutdoor] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: SavedState = JSON.parse(saved);
        if (typeof parsed.wentOutdoor === 'boolean') return parsed.wentOutdoor;
      }
    } catch {
      // fallback
    }
    return false;
  });

  const [lastDelta, setLastDelta] = useState<ChoiceEffect | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Automatically save state whenever core game progress updates
  useEffect(() => {
    try {
      const stateToSave: SavedState = {
        currentNodeId,
        stats,
        history,
        wentOutdoor,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch {
      // Ignore quota errors
    }
  }, [currentNodeId, stats, history, wentOutdoor]);

  const currentNode = STORY_NODES[currentNodeId] || STORY_NODES['paragraf_1'];

  // Start game from Splash Screen
  const handleStartGame = () => {
    sounds.playChoice();
    setCurrentNodeId('paragraf_1');
    setStats(INITIAL_STATS);
    setHistory([]);
    setLastDelta(null);
    setWentOutdoor(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select a choice
  const handleSelectChoice = (choice: Choice) => {
    sounds.playChoice();

    // Check if player selected outdoor path
    if (choice.nextNodeId === 'p1_wyjscie_dwor' || currentNodeId === 'p1_wyjscie_dwor') {
      setWentOutdoor(true);
    }

    // Save history for undo feature
    const newHistoryItem: HistoryItem = {
      nodeId: currentNodeId,
      selectedChoiceText: choice.text,
      statsBefore: { ...stats },
      statsAfter: { ...stats },
    };

    // Calculate new stats bounded 0-100
    const newStats: GameStats = {
      parentEnergy: Math.min(
        100,
        Math.max(0, stats.parentEnergy + (choice.effect.parentEnergy || 0))
      ),
      childFocus: Math.min(
        100,
        Math.max(0, stats.childFocus + (choice.effect.childFocus || 0))
      ),
      familyBond: Math.min(
        100,
        Math.max(0, stats.familyBond + (choice.effect.familyBond || 0))
      ),
      creativityMovement: Math.min(
        100,
        Math.max(0, stats.creativityMovement + (choice.effect.creativityMovement || 0))
      ),
    };

    newHistoryItem.statsAfter = newStats;

    // Trigger audio cues based on total delta impact
    const totalDelta =
      (choice.effect.parentEnergy || 0) +
      (choice.effect.childFocus || 0) +
      (choice.effect.familyBond || 0) +
      (choice.effect.creativityMovement || 0);

    if (totalDelta > 0) {
      sounds.playStatGain();
    } else if (totalDelta < 0) {
      sounds.playStatLoss();
    }

    const nextNode = STORY_NODES[choice.nextNodeId];
    if (nextNode?.type === 'game_over') {
      sounds.playGameOver();
    } else if (nextNode?.type === 'success') {
      sounds.playSuccess();
    }

    setLastDelta(choice.effect);
    setStats(newStats);
    setHistory((prev) => [...prev, newHistoryItem]);
    setCurrentNodeId(choice.nextNodeId);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Undo last step
  const handleGoBack = () => {
    if (history.length === 0) return;
    sounds.playChoice();

    const lastHistory = history[history.length - 1];
    setStats(lastHistory.statsBefore);
    setCurrentNodeId(lastHistory.nodeId);
    setHistory((prev) => prev.slice(0, -1));
    setLastDelta(null);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Full restart
  const handleRestart = () => {
    sounds.playChoice();
    setCurrentNodeId('splash');
    setStats(INITIAL_STATS);
    setHistory([]);
    setLastDelta(null);
    setWentOutdoor(false);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle audio sound engine
  const handleToggleSound = () => {
    const isNowOn = sounds.toggleSound();
    setSoundEnabled(isNowOn);
  };

  return (
    <div className="min-h-screen bg-[#1a1816] text-[#e0d7c6] font-serif py-6 px-3 sm:px-6 flex flex-col justify-between selection:bg-[#b08d57] selection:text-[#1a1816]">
      <div className="w-full max-w-3xl mx-auto flex-1">
        {/* Splash Landing View (Artistic Flair Style) */}
        {currentNodeId === 'splash' ? (
          <div className="w-full max-w-2xl mx-auto py-8 sm:py-12 text-center flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#23211f] border border-[#3e3a35] text-[#b08d57] font-mono text-xs uppercase tracking-[0.2em] mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#b08d57]" />
              <span>Interaktywny Scenariusz Przygodowy (3–5 min)</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#f5efe6] leading-tight mb-3 tracking-tighter uppercase">
              W CO GRA<br />ADAM?
            </h1>

            <p className="font-mono text-xs sm:text-sm text-[#b08d57] uppercase tracking-[0.25em] mb-8">
              #OpanujWyzwanieCyfrowe &bull; #ProjektPL
            </p>

            <div className="artistic-card rounded-lg p-6 sm:p-8 mb-8 text-left max-w-xl mx-auto shadow-2xl">
              <p className="font-serif text-base sm:text-lg text-[#d8cfc0] leading-relaxed">
                Sobotnie popołudnie. Pijesz ciepłą kawę. Dziecko podchodzi i rzuca: <em className="text-[#f0e8db] border-b border-[#b08d57]/40 pb-0.5">„Nudzi mi się... Mogę tablet? Tylko na chwilę!”</em>.
                <br /><br />
                Podejmuj decyzje rodzicielskie. Obserwuj wskaźniki skupienia, energii i relacji. Odkryj, jak przenieść uwagę dziecka z cyfrowego ekranu do świata książki i szachów!
              </p>
            </div>

            {/* Quick Metrics Teaser */}
            <div className="w-full max-w-lg grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-10 font-mono text-xs">
              <div className="bg-[#151413] border border-[#3e3a35] p-3 rounded text-center">
                <Brain className="w-4 h-4 text-[#b08d57] mx-auto mb-1" />
                <span className="block text-[10px] uppercase tracking-wider text-[#a09888]">Skupienie</span>
                <span className="font-bold text-[#f0e8db]">30%</span>
              </div>
              <div className="bg-[#151413] border border-[#3e3a35] p-3 rounded text-center">
                <Heart className="w-4 h-4 text-[#b08d57] mx-auto mb-1" />
                <span className="block text-[10px] uppercase tracking-wider text-[#a09888]">Relacja</span>
                <span className="font-bold text-[#f0e8db]">70%</span>
              </div>
              <div className="bg-[#151413] border border-[#3e3a35] p-3 rounded text-center">
                <ShieldAlert className="w-4 h-4 text-[#b08d57] mx-auto mb-1" />
                <span className="block text-[10px] uppercase tracking-wider text-[#a09888]">Energia</span>
                <span className="font-bold text-[#f0e8db]">80%</span>
              </div>
              <div className="bg-[#151413] border border-[#3e3a35] p-3 rounded text-center">
                <BookOpen className="w-4 h-4 text-[#b08d57] mx-auto mb-1" />
                <span className="block text-[10px] uppercase tracking-wider text-[#a09888]">Ruch</span>
                <span className="font-bold text-[#f0e8db]">45%</span>
              </div>
            </div>

            <button
              onClick={handleStartGame}
              className="bg-[#b08d57] hover:bg-[#c4a473] text-[#1a1816] font-bold uppercase tracking-widest text-sm py-4 px-10 rounded shadow-2xl transition-all cursor-pointer flex items-center gap-3 transform hover:-translate-y-0.5 border border-[#e0d7c6]/20"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Rozpocznij Symulację</span>
            </button>

            <div className="mt-8 font-mono text-[11px] text-[#8c8273]">
              Gra inspirowana nadchodzącą książką autorki Anny Szczypki — „Adam gra w szachy”.
            </div>
          </div>
        ) : (
          <>
            {/* Header with Progress Bar & Controls */}
            <Header
              actTitle={currentNode.actTitle}
              timeLabel={currentNode.timeLabel}
              progressPercent={currentNode.progressPercent}
              soundEnabled={soundEnabled}
              onToggleSound={handleToggleSound}
              onRestart={handleRestart}
              canGoBack={history.length > 0}
              onGoBack={handleGoBack}
            />

            {/* Live Stats Indicators */}
            <StatsPanel stats={stats} lastDelta={lastDelta} />

            {/* Active View Router */}
            {currentNode.type === 'story' && (
              <StoryNode node={currentNode} onSelectChoice={handleSelectChoice} />
            )}

            {currentNode.type === 'game_over' && (
              <GameOverView
                node={currentNode}
                onRetry={handleStartGame}
                onUndoLastStep={handleGoBack}
                canUndo={history.length > 0}
              />
            )}

            {currentNode.type === 'success' && (
              <SuccessView
                node={currentNode}
                finalStats={stats}
                wentOutdoor={wentOutdoor}
                onRestart={handleStartGame}
              />
            )}
          </>
        )}
      </div>

      {/* Footer Branding */}
      <footer className="w-full max-w-3xl mx-auto mt-12 pt-6 border-t border-[#3e3a35] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#8c8273] gap-2 select-none">
        <span>Fundacja ProjektPL &bull; Gra „W co gra Adam”</span>
        <span>Autorzy: Anna Szczypka &bull; 2026</span>
      </footer>
    </div>
  );
}
