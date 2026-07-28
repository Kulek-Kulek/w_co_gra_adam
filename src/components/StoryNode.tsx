import React from 'react';
import { GameNode, Choice } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface StoryNodeProps {
  node: GameNode;
  onSelectChoice: (choice: Choice) => void;
}

export const StoryNode: React.FC<StoryNodeProps> = ({ node, onSelectChoice }) => {
  // Format formatted text with paragraphs and Markdown-like bold formatting
  const renderParagraphs = (rawText: string) => {
    const paragraphs = rawText.split('\n\n').filter((p) => p.trim().length > 0);

    return paragraphs.map((para, idx) => {
      // Parse **bold** parts
      const parts = para.split(/(\*\*.*?\*\*)/g);

      return (
        <p key={idx} className="mb-4 text-[#3a352e] leading-relaxed text-base sm:text-lg">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="text-[#1a1714] font-bold bg-[#f3ede2] px-1 rounded">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto artistic-card rounded-xl p-5 sm:p-7 shadow-xl transition-all duration-300">
      {/* Act Tag */}
      {node.actTitle && (
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-xs text-[#8a652e] uppercase tracking-[0.2em] font-semibold">
            {node.actTitle}
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#8a652e]/30 to-transparent" />
        </div>
      )}

      {/* Optional Scene Illustration */}
      {node.image && (
        <div className="mb-5 rounded-lg overflow-hidden border border-[#e2d9cc] shadow-sm bg-[#faf8f5]">
          <img
            src={node.image}
            alt={node.actTitle || 'Ilustracja sceny'}
            referrerPolicy="no-referrer"
            className="w-full h-48 sm:h-64 object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
          />
        </div>
      )}

      {/* Main Narrative Content */}
      <div className="font-serif text-[#3a352e] mb-6 space-y-1">
        {renderParagraphs(node.text)}
      </div>

      {/* Choice Prompt */}
      <div className="border-t border-[#e2d9cc] pt-5">
        <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[#736c61] uppercase tracking-[0.15em]">
          <Sparkles className="w-3.5 h-3.5 text-[#8a652e]" />
          <span>Co decydujesz?</span>
        </div>

        {/* Choices List */}
        <div className="space-y-3">
          {node.choices.map((choice) => (
            <div key={choice.id} className="group">
              <button
                onClick={() => onSelectChoice(choice)}
                className="w-full text-left bg-[#fcfaf7] hover:bg-[#f3ede2] border border-[#e2d9cc] hover:border-[#8a652e] rounded-lg p-3.5 sm:p-4 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex items-start gap-3.5"
              >
                <div className="mt-0.5 w-6 h-6 rounded-full bg-[#eee8dd] group-hover:bg-[#8a652e] group-hover:text-[#ffffff] text-[#8a652e] flex items-center justify-center shrink-0 transition-colors font-mono text-xs font-bold border border-[#e2d9cc]">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="font-serif text-base text-[#2c2825] group-hover:text-[#1a1714] font-semibold leading-snug block">
                    {choice.text}
                  </span>

                  {choice.consequence && (
                    <span className="block mt-1 font-mono text-xs text-[#736c61] group-hover:text-[#524b42]">
                      ↳ {choice.consequence}
                    </span>
                  )}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
