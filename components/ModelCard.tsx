
import React from 'react';
import { ChevronRight, Archive } from 'lucide-react';
import { MentalModel } from '../types';
import { ICON_MAP } from '../constants';

interface ModelCardProps {
  model: MentalModel;
  onClick: (model: MentalModel) => void;
  onTooHard: (e: React.MouseEvent, model: MentalModel) => void;
  isArchived?: boolean;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, onClick, onTooHard, isArchived }) => {
  return (
    <div 
      onClick={() => onClick(model)}
      className={`
        group relative flex flex-col p-8 bg-paper dark:bg-charcoal border border-charcoal/5 dark:border-cream/5
        hover:border-gold dark:hover:border-gold transition-all duration-500 cursor-pointer overflow-hidden
        ${isArchived ? 'opacity-50 grayscale hover:grayscale-0' : ''}
      `}
    >
      {/* Decorative background element */}
      <div className="absolute -right-4 -bottom-4 text-charcoal/5 dark:text-cream/5 group-hover:text-gold/10 transition-colors duration-500">
        {ICON_MAP[model.icon]}
      </div>

      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-cream dark:bg-slate border border-charcoal/10 dark:border-cream/10 group-hover:border-gold/50 transition-colors duration-500">
          <span className="text-charcoal dark:text-cream">
            {ICON_MAP[model.icon]}
          </span>
        </div>
        <button 
          onClick={(e) => onTooHard(e, model)}
          className="p-1 text-charcoal/40 dark:text-cream/40 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          title="Add to 'Too Hard' Pile"
        >
          <Archive className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
          {model.discipline}
        </span>
      </div>

      <h3 className="font-serif text-2xl mb-4 group-hover:text-gold transition-colors duration-300">
        {model.title}
      </h3>

      <p className="text-charcoal/70 dark:text-cream/70 text-sm leading-relaxed mb-6 line-clamp-2">
        {model.summary}
      </p>

      <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
        <span>Deep Dive</span>
        <ChevronRight className="w-3 h-3" />
      </div>
    </div>
  );
};

export default ModelCard;
