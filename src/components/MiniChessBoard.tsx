import React, { useState } from 'react';
import { Volume2, BookOpen } from 'lucide-react';

interface PieceInfo {
  id: string;
  symbol: string;
  namePl: string;
  nameEn: string;
  phonetic: string;
  desc: string;
}

const CHESS_PIECES: PieceInfo[] = [
  {
    id: 'knight',
    symbol: '♘',
    namePl: 'Skoczek / Konik',
    nameEn: 'Knight',
    phonetic: '[nait]',
    desc: 'Skacze w kształcie litery "L". Potrafi przeskakiwać nad innymi figurami!',
  },
  {
    id: 'pawn',
    symbol: '♙',
    namePl: 'Pionek',
    nameEn: 'Pawn',
    phonetic: '[pɔːn]',
    desc: 'Idzie do przodu o jedno pole (lub dwa w pierwszym ruchu), bije na ukos.',
  },
  {
    id: 'rook',
    symbol: '♖',
    namePl: 'Wieża',
    nameEn: 'Rook',
    phonetic: '[rʊk]',
    desc: 'Porusza się po liniach prostych – pionowo i poziomo – o dowolną liczbę pól.',
  },
  {
    id: 'bishop',
    symbol: '♗',
    namePl: 'Goniec',
    nameEn: 'Bishop',
    phonetic: '[ˈbɪʃəp]',
    desc: 'Biega po przekątnych (skosach) tego samego koloru.',
  },
  {
    id: 'queen',
    symbol: '♕',
    namePl: 'Hetman / Królowa',
    nameEn: 'Queen',
    phonetic: '[kwiːn]',
    desc: 'Najpotężniejsza figura! Łączy ruchy Wieży i Gońca.',
  },
  {
    id: 'king',
    symbol: '♔',
    namePl: 'Król',
    nameEn: 'King',
    phonetic: '[kɪŋ]',
    desc: 'Najważniejsza figura na planszy. Robi po jednym kroku w dowolnym kierunku.',
  },
];

export const MiniChessBoard: React.FC = () => {
  const [selectedPiece, setSelectedPiece] = useState<PieceInfo>(CHESS_PIECES[0]);

  const speakEn = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-[#faf8f5] border border-[#e2d9cc] rounded-xl p-5 shadow-sm my-6">
      <div className="flex items-center justify-between mb-4 border-b border-[#e2d9cc] pb-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#8a652e]" />
          <h3 className="font-mono text-xs text-[#8a652e] uppercase tracking-wider font-semibold">
            Interaktywny Słowniczek Szachowy Adasia
          </h3>
        </div>
        <span className="font-mono text-[10px] text-[#736c61]">
          Kliknij figurę
        </span>
      </div>

      {/* Piece Selection Grid */}
      <div className="grid grid-cols-6 gap-1.5 mb-4 bg-[#f3ede2] p-2 rounded border border-[#e2d9cc]">
        {CHESS_PIECES.map((piece) => {
          const isSelected = selectedPiece.id === piece.id;
          return (
            <button
              key={piece.id}
              onClick={() => setSelectedPiece(piece)}
              className={`flex flex-col items-center justify-center p-2 rounded transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#ffffff] border border-[#8a652e] text-[#1a1714] shadow-sm scale-105 font-bold'
                  : 'bg-[#faf8f5] border border-[#e2d9cc] text-[#5e564b] hover:border-[#8a652e]/60 hover:text-[#1a1714]'
              }`}
            >
              <span className="text-2xl sm:text-3xl select-none leading-none mb-1">
                {piece.symbol}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-tighter truncate w-full text-center">
                {piece.nameEn}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Piece Card Detail */}
      <div className="bg-[#ffffff] border border-[#e2d9cc] rounded-lg p-4 flex flex-col sm:flex-row items-center gap-4 shadow-sm">
        <div className="w-16 h-16 rounded-lg bg-[#f3ede2] border border-[#e2d9cc] flex items-center justify-center text-4xl text-[#8a652e] shrink-0 shadow-inner">
          {selectedPiece.symbol}
        </div>

        <div className="flex-1 text-center sm:text-left min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
            <span className="font-serif text-lg font-bold text-[#1a1714]">
              {selectedPiece.namePl}
            </span>
            <span className="font-mono text-sm text-[#8a652e] font-semibold bg-[#f3ede2] px-2.5 py-0.5 rounded border border-[#e2d9cc] flex items-center gap-1.5">
              {selectedPiece.nameEn} {selectedPiece.phonetic}
              <button
                onClick={() => speakEn(selectedPiece.nameEn)}
                title="Posłuchaj wymowy"
                className="hover:text-[#1a1714] transition-colors p-0.5 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5 text-[#8a652e]" />
              </button>
            </span>
          </div>

          <p className="font-sans text-xs text-[#5e564b] leading-relaxed">
            {selectedPiece.desc}
          </p>
        </div>
      </div>
    </div>
  );
};
