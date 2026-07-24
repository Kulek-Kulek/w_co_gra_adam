import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { GameNode, GameStats } from '../types';
import { MiniChessBoard } from './MiniChessBoard';
import {
  Trophy,
  CheckCircle2,
  Mail,
  Download,
  Share2,
  RotateCcw,
  Sparkles,
  MapPin,
  Heart,
  BookOpen,
} from 'lucide-react';

interface SuccessViewProps {
  node: GameNode;
  finalStats: GameStats;
  wentOutdoor: boolean;
  onRestart: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({
  node,
  finalStats,
  wentOutdoor,
  onRestart,
}) => {
  const [email, setEmail] = useState('');
  const [parentName, setParentName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Launch celebratory confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#b08d57', '#4a7c59', '#d9b882', '#f5efe6'],
      });
    } catch {
      // Ignore if canvas isn't supported
    }
  }, []);

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto artistic-card border border-[#b08d57]/60 rounded-xl p-6 sm:p-8 shadow-2xl relative">
      {/* Top Gold Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#7a5d2e] via-[#b08d57] to-[#d9b882] rounded-t-xl" />

      {/* Header Banner */}
      <div className="text-center mb-6 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#23211f] border border-[#3e3a35] text-[#b08d57] font-mono text-xs uppercase tracking-[0.2em] mb-3">
          <Trophy className="w-3.5 h-3.5" />
          <span>Sukces — Wyzwanie Opanowane!</span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl text-[#f5efe6] font-bold leading-tight mb-2">
          {node.title || 'Wyzwanie cyfrowe opanowane w wielkim stylu!'}
        </h1>

        <p className="font-sans text-sm text-[#a09888] max-w-lg mx-auto">
          Pokazałeś dziecku, że świat bez ekranów potrafi być niesamowicie wciągający.
        </p>
      </div>

      {/* Final Outcome Box */}
      <div className="bg-[#151413] border border-[#3e3a35] rounded-lg p-5 mb-6">
        <p className="font-serif text-base text-[#e0d7c6] leading-relaxed mb-4">
          {node.text}
        </p>

        <div className="border-t border-[#3e3a35] pt-3.5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center font-mono text-xs">
          <div className="bg-[#23211f] p-2.5 rounded border border-[#3e3a35]">
            <span className="block text-[10px] text-[#8c8273] uppercase tracking-wider">Energia</span>
            <span className="font-bold text-[#b08d57] text-sm">{finalStats.parentEnergy}%</span>
          </div>

          <div className="bg-[#23211f] p-2.5 rounded border border-[#3e3a35]">
            <span className="block text-[10px] text-[#8c8273] uppercase tracking-wider">Skupienie</span>
            <span className="font-bold text-[#4a7c59] text-sm">{finalStats.childFocus}%</span>
          </div>

          <div className="bg-[#23211f] p-2.5 rounded border border-[#3e3a35]">
            <span className="block text-[10px] text-[#8c8273] uppercase tracking-wider">Relacja</span>
            <span className="font-bold text-[#b08d57] text-sm">{finalStats.familyBond}%</span>
          </div>

          <div className="bg-[#23211f] p-2.5 rounded border border-[#3e3a35]">
            <span className="block text-[10px] text-[#8c8273] uppercase tracking-wider">Ruch</span>
            <span className="font-bold text-[#4a7c59] text-sm">{finalStats.creativityMovement}%</span>
          </div>
        </div>
      </div>

      {/* Optional Outdoor Route Tip */}
      {wentOutdoor && (
        <div className="mb-6 bg-[#1a291f] border border-[#2e4d36] rounded-lg p-4 flex items-start gap-3">
          <div className="p-2 rounded bg-[#243d2b] text-[#52aa6a] shrink-0 mt-0.5 border border-[#3e6648]">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <span className="font-mono text-xs text-[#52aa6a] uppercase tracking-wider font-bold block mb-1">
              Wskazówka Lokalna dla Rodziców:
            </span>
            <p className="font-sans text-xs text-[#c4e0cb] leading-relaxed">
              Twoje dziecko ma w sobie mnóstwo zdrowej energii! Warto sprawdzić w urzędzie gminy/miasta lub na lokalnych stronach, jakie sekcje sportowe i rekreacyjne działają w Twojej najbliższej okolicy – to świetna, stała alternatywa dla ekranów!
            </p>
          </div>
        </div>
      )}

      {/* Book Presentation Section */}
      <div className="bg-[#151413] border border-[#3e3a35] rounded-xl p-5 sm:p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-[#b08d57]" />
          <span className="font-mono text-xs text-[#b08d57] uppercase tracking-[0.15em] font-semibold">
            O Książce — Anna Szczypka
          </span>
        </div>

        <h2 className="font-serif text-xl text-[#f5efe6] font-bold mb-3">
          „Adam gra w szachy”
        </h2>

        <p className="font-serif text-sm text-[#e0d7c6] leading-relaxed mb-4">
          Ta interaktywna historia inspirowana jest nadchodzącą książką autorki Anny Szczypki. To wyjątkowa publikacja łącząca w sobie opowiadania pobudzające dziecięcą wyobraźnię, naukę gry w szachy od podstaw oraz naturalną, bezwysiłkową naukę języka angielskiego.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs text-[#a09888] mb-4">
          <div className="bg-[#23211f] p-2.5 rounded border border-[#3e3a35] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#b08d57]" />
            <span>Szachy od podstaw</span>
          </div>
          <div className="bg-[#23211f] p-2.5 rounded border border-[#3e3a35] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#b08d57]" />
            <span>Język Angielski</span>
          </div>
          <div className="bg-[#23211f] p-2.5 rounded border border-[#3e3a35] flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 text-[#b08d57]" />
            <span>Higiena Cyfrowa</span>
          </div>
        </div>

        <div className="text-center font-mono text-xs text-[#b08d57] font-semibold bg-[#23211f] py-2.5 px-3 rounded border border-[#3e3a35]">
          🚀 Przedsprzedaż książki rusza pod koniec września!
        </div>
      </div>

      {/* Interactive Mini Dictionary Demo */}
      <MiniChessBoard />

      {/* Pre-order & Free Digital Guide Form */}
      <div className="bg-[#151413] border border-[#3e3a35] rounded-xl p-5 sm:p-6 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Mail className="w-4 h-4 text-[#b08d57]" />
          <h3 className="font-mono text-xs text-[#b08d57] uppercase tracking-wider font-semibold">
            Bądź na bieżąco & odbierz bezpłatny poradnik
          </h3>
        </div>

        <p className="font-sans text-xs text-[#a09888] leading-relaxed mb-4">
          Zostaw swój adres e-mail poniżej, aby nie przegapić premiery książki! Dodatkowo otrzymasz już teraz bezpłatny <strong>„Mini-przewodnik higieny cyfrowej”</strong> przygotowany przez <strong>Fundację ProjektPL</strong>.
        </p>

        {submitted ? (
          <div className="bg-[#1a291f] border border-[#2e4d36] rounded-lg p-4 text-center">
            <CheckCircle2 className="w-8 h-8 text-[#52aa6a] mx-auto mb-2" />
            <h4 className="font-serif text-base font-bold text-[#e8f5eb] mb-1">
              Dziękujemy za zapis!
            </h4>
            <p className="font-sans text-xs text-[#b8e0c2] mb-3">
              Wybrany adres {email} został dodany do listy powiadomień premiery. Twój poradnik jest gotowy do pobrania!
            </p>

            <a
              href="#download"
              onClick={(e) => {
                e.preventDefault();
                alert('Pobieranie pliku: Mini-przewodnik_higieny_cyfrowej_ProjektPL.pdf');
              }}
              className="inline-flex items-center gap-2 bg-[#4a7c59] hover:bg-[#3d694a] text-[#ffffff] font-mono text-xs font-bold py-2.5 px-4 rounded transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Pobierz Mini-przewodnik (PDF)</span>
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmitEmail} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="Twoje imię (opcjonalnie)"
                className="w-full bg-[#1f1d1b] border border-[#3e3a35] focus:border-[#b08d57] rounded px-3 py-2.5 text-xs font-sans text-[#e0d7c6] outline-none transition-colors"
              />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Twój adres e-mail *"
                className="w-full bg-[#1f1d1b] border border-[#3e3a35] focus:border-[#b08d57] rounded px-3 py-2.5 text-xs font-sans text-[#e0d7c6] outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#b08d57] hover:bg-[#c4a473] text-[#1a1816] font-mono font-bold text-xs py-3 px-4 rounded transition-all cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-2 border border-[#e0d7c6]/20 uppercase tracking-wider"
            >
              <Sparkles className="w-4 h-4" />
              <span>Chcę odebrać poradnik i powiadomienie o książce</span>
            </button>

            <span className="block text-[10px] font-mono text-[#8c8273] text-center">
              Gwarantujemy brak spamu. Możesz wypisać się w każdej chwili.
            </span>
          </form>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleShare}
          className="flex-1 bg-[#1f1d1b] hover:bg-[#282522] text-[#e0d7c6] border border-[#3e3a35] font-mono text-xs py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-[#b08d57]" />
          <span>{copied ? 'Skopiowano link!' : 'Udostępnij tę grę rodzicom'}</span>
        </button>

        <button
          onClick={onRestart}
          className="flex-1 bg-[#23211f] hover:bg-[#2c2926] text-[#f5efe6] border border-[#3e3a35] font-mono text-xs py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-[#b08d57]" />
          <span>Zagraj ponownie (odkryj inne ścieżki)</span>
        </button>
      </div>
    </div>
  );
};
