import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { GameNode, GameStats } from '../types';
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
        colors: ['#8a652e', '#5e7a5b', '#d9b882', '#faf8f5'],
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

  // Tailored title per ending path
  const getEndingTitle = () => {
    if (node.endingPathType === 'chess') {
      return 'Gratulacje! Rozstawiliście figury na dywanie!';
    }
    if (node.endingPathType === 'reading') {
      return 'Gratulacje! Maluch poprosił o kolejny rozdział!';
    }
    if (node.endingPathType === 'english') {
      return 'Gratulacje! Wymówił «knight» bezbłędnie!';
    }
    return node.title || 'Gratulacje! Razem opanowaliście ten dzień!';
  };

  return (
    <div className="w-full max-w-2xl mx-auto artistic-card border border-[#8a652e]/50 rounded-xl p-6 sm:p-8 shadow-xl relative">
      {/* Top Gold Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#a87f42] via-[#8a652e] to-[#5e7a5b] rounded-t-xl" />

      {/* Header Banner */}
      <div className="text-center mb-6 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f3ede2] border border-[#e2d9cc] text-[#8a652e] font-mono text-xs uppercase tracking-[0.2em] mb-3 font-semibold">
          <Trophy className="w-3.5 h-3.5 text-[#8a652e]" />
          <span>Sukces — Wyzwanie Opanowane!</span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl text-[#1a1714] font-bold leading-tight mb-2">
          {getEndingTitle()}
        </h1>

        <p className="font-sans text-sm text-[#5e564b] max-w-lg mx-auto font-medium">
          Razem opanowaliście ten dzień! Pokazałeś dziecku, że świat bez ekranów potrafi być niesamowicie wciągający.
        </p>
      </div>

      {/* Final Narrative Outcome Box */}
      <div className="bg-[#faf8f5] border border-[#e2d9cc] rounded-lg p-5 mb-6 shadow-sm">
        <p className="font-serif text-base text-[#2c2825] leading-relaxed">
          {node.text}
        </p>
      </div>

      {/* Prominent Newsletter & Free Guide Form (Placed immediately near the top) */}
      <div className="bg-[#faf8f5] border-2 border-[#8a652e]/40 rounded-xl p-5 sm:p-6 mb-6 shadow-md relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <Mail className="w-4 h-4 text-[#8a652e]" />
          <h3 className="font-mono text-xs text-[#8a652e] uppercase tracking-wider font-bold">
            Bądź na bieżąco & odeberz bezpłatny poradnik
          </h3>
        </div>

        <p className="font-sans text-xs text-[#3a352e] leading-relaxed mb-4">
          Zostaw swój adres e-mail poniżej, aby nie przegapić premiery książki! Otrzymasz natychmiast bezpłatny <strong>„Mini-przewodnik higieny cyfrowej”</strong> przygotowany przez <strong>Fundację ProjektPL</strong>.
        </p>

        {submitted ? (
          <div className="bg-[#f0f7f1] border border-[#c2e2c6] rounded-lg p-4 text-center">
            <CheckCircle2 className="w-8 h-8 text-[#3e6939] mx-auto mb-2" />
            <h4 className="font-serif text-base font-bold text-[#1e3d1a] mb-1">
              Dziękujemy za zapis!
            </h4>
            <p className="font-sans text-xs text-[#2c4728] mb-3">
              Adres {email} został dodany do listy powiadomień premiery. Twój poradnik jest gotowy do pobrania!
            </p>

            <a
              href="#download"
              onClick={(e) => {
                e.preventDefault();
                alert('Pobieranie pliku: Mini-przewodnik_higieny_cyfrowej_ProjektPL.pdf');
              }}
              className="inline-flex items-center gap-2 bg-[#5e7a5b] hover:bg-[#4a6348] text-[#ffffff] font-mono text-xs font-bold py-2.5 px-4 rounded transition-colors"
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
                className="w-full bg-[#ffffff] border border-[#e2d9cc] focus:border-[#8a652e] rounded px-3 py-2.5 text-xs font-sans text-[#2c2825] outline-none transition-colors"
              />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Twój adres e-mail *"
                className="w-full bg-[#ffffff] border border-[#e2d9cc] focus:border-[#8a652e] rounded px-3 py-2.5 text-xs font-sans text-[#2c2825] outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#8a652e] hover:bg-[#735323] text-[#ffffff] font-mono font-bold text-xs py-3 px-4 rounded transition-all cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <Sparkles className="w-4 h-4 text-[#ffffff]" />
              <span>Zapisz się na newsletter & odbierz poradnik</span>
            </button>

            <span className="block text-[10px] font-mono text-[#736c61] text-center">
              Gwarantujemy brak spamu. Możesz wypisać się w każdej chwili.
            </span>
          </form>
        )}
      </div>

      {/* Book Presentation Section */}
      <div className="bg-[#faf8f5] border border-[#e2d9cc] rounded-xl p-5 sm:p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-[#8a652e]" />
          <span className="font-mono text-xs text-[#8a652e] uppercase tracking-[0.15em] font-semibold">
            O Książce —{' '}
            <a
              href="https://www.angielskizmaja.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold text-[#8a652e] hover:text-[#5e431c]"
            >
              Anna Szczypka
            </a>
          </span>
        </div>

        <h2 className="font-serif text-xl text-[#1a1714] font-bold mb-3">
          „Adam gra w szachy”
        </h2>

        <p className="font-serif text-sm text-[#3a352e] leading-relaxed mb-4">
          Ta interaktywna historia inspirowana jest nadchodzącą książką autorki{' '}
          <a
            href="https://www.angielskizmaja.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-bold text-[#8a652e] hover:text-[#5e431c]"
          >
            Anny Szczypki
          </a>
          . To wyjątkowa publikacja łącząca w sobie opowiadania pobudzające dziecięcą wyobraźnię, naukę gry w szachy od podstaw oraz naturalną, bezwysiłkową naukę języka angielskiego.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs text-[#5e564b] mb-4">
          <div className="bg-[#ffffff] p-2.5 rounded border border-[#e2d9cc] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#8a652e]" />
            <span>Szachy od podstaw</span>
          </div>
          <div className="bg-[#ffffff] p-2.5 rounded border border-[#e2d9cc] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#8a652e]" />
            <span>Język Angielski</span>
          </div>
          <div className="bg-[#ffffff] p-2.5 rounded border border-[#e2d9cc] flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 text-[#8a652e]" />
            <span>Higiena Cyfrowa</span>
          </div>
        </div>

        <div className="text-center font-mono text-xs text-[#8a652e] font-bold bg-[#f3ede2] py-2.5 px-3 rounded border border-[#e2d9cc]">
          🚀 Przedsprzedaż książki rusza pod koniec września!
        </div>
      </div>

      {/* Optional Outdoor Route Tip */}
      {wentOutdoor && (
        <div className="mb-6 bg-[#f0f7f1] border border-[#c2e2c6] rounded-lg p-4 flex items-start gap-3">
          <div className="p-2 rounded bg-[#d8ebd9] text-[#3e6939] shrink-0 mt-0.5 border border-[#b2d8b4]">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <span className="font-mono text-xs text-[#3e6939] uppercase tracking-wider font-bold block mb-1">
              Wskazówka Lokalna dla Rodziców:
            </span>
            <p className="font-sans text-xs text-[#2c4728] leading-relaxed">
              Twoje dziecko ma w sobie mnóstwo zdrowej energii! Warto sprawdzić w urzędzie gminy/miasta lub na lokalnych stronach, jakie sekcje sportowe i rekreacyjne działają w Twojej najbliższej okolicy – to świetna, stała alternatywa dla ekranów!
            </p>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleShare}
          className="flex-1 bg-[#ffffff] hover:bg-[#f3ede2] text-[#2c2825] border border-[#e2d9cc] font-mono text-xs py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer font-bold"
        >
          <Share2 className="w-4 h-4 text-[#8a652e]" />
          <span>{copied ? 'Skopiowano link!' : 'Udostępnij grę rodzicom'}</span>
        </button>

        <button
          onClick={onRestart}
          className="flex-1 bg-[#f3ede2] hover:bg-[#eae1d0] text-[#1a1714] border border-[#e2d9cc] font-mono text-xs py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-[#8a652e]" />
          <span>Zagraj ponownie (odkryj inne ścieżki)</span>
        </button>
      </div>
    </div>
  );
};
