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
        <p key={idx} className="mb-4 text-[#e0d7c6] leading-relaxed text-base sm:text-lg">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="text-[#f5efe6] font-bold">
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
    <div className="w-full max-w-2xl mx-auto artistic-card rounded-xl p-6 sm:p-8 shadow-2xl transition-all duration-300">
      {/* Act Tag */}
      {node.actTitle && (
        <div className="flex items-center gap-2 mb-6">
          <span className="font-mono text-xs text-[#b08d57] uppercase tracking-[0.2em] font-semibold">
            {node.actTitle}
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#b08d57]/40 to-transparent" />
        </div>
      )}

      {/* Main Narrative Content */}
      <div className="font-serif text-[#e0d7c6] mb-8 space-y-2">
        {renderParagraphs(node.text)}
      </div>

      {/* Choice Prompt */}
      <div className="border-t border-[#3e3a35] pt-6">
        <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[#a09888] uppercase tracking-[0.15em]">
          <Sparkles className="w-3.5 h-3.5 text-[#b08d57]" />
          <span>Co decydujesz?</span>
        </div>

        {/* Choices List */}
        <div className="space-y-3.5">
          {node.choices.map((choice) => (
            <div key={choice.id} className="group">
              <button
                onClick={() => onSelectChoice(choice)}
                className="w-full text-left bg-[#151413] hover:bg-[#23211f] border border-[#3e3a35] hover:border-[#b08d57] rounded-lg p-4 sm:p-5 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex items-start gap-3.5"
              >
                <div className="mt-0.5 w-6 h-6 rounded-full bg-[#23211f] group-hover:bg-[#b08d57] group-hover:text-[#1a1816] text-[#b0a898] flex items-center justify-center shrink-0 transition-colors font-mono text-xs font-bold border border-[#3e3a35]">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="font-serif text-base text-[#f0e8db] group-hover:text-[#ffffff] leading-snug block">
                    {choice.text}
                  </span>

                  {choice.consequence && (
                    <span className="block mt-1.5 font-mono text-xs text-[#a09888] group-hover:text-[#c8c0b0]">
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
