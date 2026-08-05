import React, { useState, useEffect } from 'react';
import { GameStats, Choice, HistoryItem, ChoiceEffect } from './types';
import { STORY_NODES, INITIAL_STATS } from './data/storyData';
import { Header } from './components/Header';
import { StatsPanel } from './components/StatsPanel';
import { StoryNode } from './components/StoryNode';
import { GameOverView } from './components/GameOverView';
import { SuccessView } from './components/SuccessView';
import { sounds } from './utils/audio';
import { BookOpen, Sparkles, Play, ShieldAlert, Heart, Brain, Users, X } from 'lucide-react';
import coffeeMugImg from './assets/images/coffee_mug_1785231805722.jpg';

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
  const [showTeamModal, setShowTeamModal] = useState<boolean>(false);

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

  // Undo last step & reset wentOutdoor if no longer on outdoor path
  const handleGoBack = () => {
    if (history.length === 0) return;
    sounds.playChoice();

    const newHistory = history.slice(0, -1);
    const lastHistory = history[history.length - 1];

    // Check if outdoor path remains anywhere in remaining history or target node
    const isOutdoorPath = (id: string) =>
      id === 'p1_wyjscie_dwor' || id === 'p3_dwor_kapitulacja' || id === 'p3_dwor_awantura';

    const stillOutdoor =
      newHistory.some((item) => isOutdoorPath(item.nodeId)) || isOutdoorPath(lastHistory.nodeId);

    setStats(lastHistory.statsBefore);
    setCurrentNodeId(lastHistory.nodeId);
    setHistory(newHistory);
    setWentOutdoor(stillOutdoor);
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
    <div className="min-h-screen bg-[#f7f3eb] text-[#2e2a25] font-serif py-6 px-3 sm:px-6 flex flex-col justify-between selection:bg-[#8a652e] selection:text-[#ffffff]">
      <div className="w-full max-w-3xl mx-auto flex-1">
        {/* Splash Landing View */}
        {currentNodeId === 'splash' ? (
          <div className="w-full max-w-2xl mx-auto py-6 sm:py-10 text-center flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f3ede2] border border-[#e2d9cc] text-[#8a652e] font-mono text-xs uppercase tracking-[0.2em] mb-4 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#8a652e]" />
              <span>Interaktywny Scenariusz Przygodowy (3–5 min)</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#1a1714] leading-tight mb-2 tracking-tighter uppercase">
              W CO GRA<br />ADAM?
            </h1>

            <p className="font-mono text-xs sm:text-sm text-[#8a652e] uppercase tracking-[0.25em] mb-6 font-semibold">
              #OpanujWyzwanieCyfrowe &bull; #ProjektPL
            </p>

            {/* Splash Illustration Image Banner */}
            <div className="w-full max-w-md mx-auto mb-6 rounded-xl overflow-hidden border border-[#e2d9cc] shadow-md bg-[#ffffff]">
              <img
                src={coffeeMugImg}
                alt="Kawa w kubku - W co gra Adam"
                referrerPolicy="no-referrer"
                className="w-full h-56 sm:h-64 object-cover object-center"
              />
            </div>

            <div className="artistic-card rounded-xl p-6 sm:p-8 mb-6 text-left max-w-xl mx-auto shadow-md bg-[#ffffff]">
              <p className="font-serif text-base sm:text-lg text-[#3a352e] leading-relaxed">
                Sobotnie popołudnie. Pijesz ciepłą kawę. Dziecko podchodzi i rzuca: <em className="text-[#1a1714] font-bold border-b border-[#8a652e]/40 pb-0.5">„Nudzi mi się... Mogę tablet? Tylko na chwilę!”</em>.
                <br /><br />
                Obserwuj, jak Twoje decyzje odbijają się na czterech obszarach. Odkryj, jak przenieść uwagę dziecka z cyfrowego ekranu do świata książki i szachów!
              </p>
            </div>

            {/* Quick Metrics Teaser */}
            <div className="w-full max-w-lg grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8 font-mono text-xs">
              <div className="bg-[#ffffff] border border-[#e2d9cc] p-3 rounded-lg text-center shadow-sm">
                <Brain className="w-4 h-4 text-[#8a652e] mx-auto mb-1" />
                <span className="block text-[10px] uppercase tracking-wider text-[#736c61]">Skupienie</span>
                <span className="font-bold text-[#1a1714]">30%</span>
              </div>
              <div className="bg-[#ffffff] border border-[#e2d9cc] p-3 rounded-lg text-center shadow-sm">
                <Heart className="w-4 h-4 text-[#8a652e] mx-auto mb-1" />
                <span className="block text-[10px] uppercase tracking-wider text-[#736c61]">Relacja</span>
                <span className="font-bold text-[#1a1714]">70%</span>
              </div>
              <div className="bg-[#ffffff] border border-[#e2d9cc] p-3 rounded-lg text-center shadow-sm">
                <ShieldAlert className="w-4 h-4 text-[#8a652e] mx-auto mb-1" />
                <span className="block text-[10px] uppercase tracking-wider text-[#736c61]">Energia</span>
                <span className="font-bold text-[#1a1714]">80%</span>
              </div>
              <div className="bg-[#ffffff] border border-[#e2d9cc] p-3 rounded-lg text-center shadow-sm">
                <BookOpen className="w-4 h-4 text-[#8a652e] mx-auto mb-1" />
                <span className="block text-[10px] uppercase tracking-wider text-[#736c61]">Ruch</span>
                <span className="font-bold text-[#1a1714]">45%</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleStartGame}
                className="bg-[#8a652e] hover:bg-[#735323] text-[#ffffff] font-bold uppercase tracking-widest text-sm py-4 px-10 rounded-lg shadow-lg transition-all cursor-pointer flex items-center gap-3 transform hover:-translate-y-0.5"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Rozpocznij Grę</span>
              </button>

              <button
                onClick={() => setShowTeamModal(true)}
                className="bg-[#f3ede2] hover:bg-[#eae1d0] text-[#8a652e] border border-[#e2d9cc] font-mono text-xs font-bold uppercase tracking-wider py-4 px-6 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-[#8a652e]" />
                <span>Zespół</span>
              </button>
            </div>

            <div className="mt-8 font-mono text-[11px] text-[#736c61]">
              Gra inspirowana nadchodzącą książką autorki{' '}
              <a
                href="https://www.angielskizmaja.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold text-[#8a652e] hover:text-[#5e431c]"
              >
                Anny Szczypki
              </a>{' '}
              — „Adam gra w szachy”.
            </div>
          </div>
        ) : (
          <>
            {/* Header with Progress Bar & Controls */}
            <Header
              actTitle={currentNode.actTitle}
              timeLabel={currentNode.timeLabel}
              progressPercent={currentNode.progressPercent}
              nodeType={currentNode.type}
              soundEnabled={soundEnabled}
              onToggleSound={handleToggleSound}
              onRestart={handleRestart}
              canGoBack={history.length > 0}
              onGoBack={handleGoBack}
              onOpenTeamModal={() => setShowTeamModal(true)}
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

      {/* Team Modal Overlay */}
      {showTeamModal && (
        <div className="fixed inset-0 bg-[#1a1714]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#ffffff] border border-[#8a652e]/50 rounded-xl max-w-md w-full p-6 shadow-2xl relative animate-fade-in">
            <button
              onClick={() => setShowTeamModal(false)}
              className="absolute top-4 right-4 p-1 rounded bg-[#f3ede2] text-[#736c61] hover:text-[#1a1714] border border-[#e2d9cc] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-[#8a652e]" />
              <h3 className="font-serif text-lg font-bold text-[#1a1714]">
                Zespół i Twórcy
              </h3>
            </div>

            <div className="bg-[#faf8f5] border border-[#e2d9cc] rounded-lg p-4 font-serif text-sm text-[#3a352e] leading-relaxed mb-4">
              in progress... ale będziemy chcieli podziękować wszystkim którzy brali udział w konsultacjach testach i tworzeniu gry! :)
            </div>

            <button
              onClick={() => setShowTeamModal(false)}
              className="w-full bg-[#8a652e] hover:bg-[#735323] text-[#ffffff] font-mono text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded transition-colors cursor-pointer"
            >
              Zamknij
            </button>
          </div>
        </div>
      )}

      {/* Footer Branding */}
      <footer className="w-full max-w-3xl mx-auto mt-12 pt-6 border-t border-[#e2d9cc] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#736c61] gap-2 select-none">
        <span>Fundacja ProjektPL &bull; Gra „W co gra Adam”</span>
        <span>
          Autorzy:{' '}
          <a
            href="https://www.angielskizmaja.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-bold text-[#8a652e] hover:text-[#5e431c]"
          >
            Anna Szczypka
          </a>{' '}
          &bull; 2026
        </span>
      </footer>
    </div>
  );
}
