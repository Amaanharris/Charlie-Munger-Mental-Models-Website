
import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface InversionToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const InversionToggle: React.FC<InversionToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-3 px-4 py-2 rounded-full border border-charcoal/10 dark:border-cream/10 hover:border-gold transition-colors duration-300 group"
      aria-label="Toggle Inversion Mode"
    >
      <span className="text-xs font-medium uppercase tracking-widest text-charcoal/60 dark:text-cream/60 group-hover:text-gold">
        {isDark ? "Revert" : "Invert"}
      </span>
      {isDark ? (
        <Sun className="w-4 h-4 text-mutedGold" />
      ) : (
        <Moon className="w-4 h-4 text-charcoal" />
      )}
    </button>
  );
};

export default InversionToggle;
