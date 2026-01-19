import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, X, Loader2, Sparkles, AlertCircle, Quote as QuoteIcon, Library, Brain, Layers } from 'lucide-react';
import { MentalModel, Discipline } from './types';
// Fix: Added ICON_MAP to the imported constants
import { MENTAL_MODELS, QUOTES, ICON_MAP } from './constants';
import { generateModelDeepDive, solveWithModel, getRandomWisdom } from './services/geminiService';
import ModelCard from './components/ModelCard';
import InversionToggle from './components/InversionToggle';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | 'All'>('All');
  const [tooHardPile, setTooHardPile] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<MentalModel | null>(null);
  const [deepDive, setDeepDive] = useState<string | null>(null);
  const [isDeepDiveLoading, setIsDeepDiveLoading] = useState(false);
  const [dailyWisdom, setDailyWisdom] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'latticework' | 'lab'>('latticework');
  const [problemInput, setProblemInput] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState<any | null>(null);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);

  // Initialize daily wisdom
  useEffect(() => {
    const fetchWisdom = async () => {
      try {
        const wisdom = await getRandomWisdom();
        setDailyWisdom(wisdom);
      } catch (err) {
        console.error("Failed to fetch wisdom", err);
      }
    };
    fetchWisdom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleInversion = useCallback(() => {
    setIsDark(prev => {
      const newVal = !prev;
      if (newVal) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newVal;
    });
  }, []);

  const addToTooHard = useCallback((e: React.MouseEvent, model: MentalModel) => {
    e.stopPropagation();
    setTooHardPile(prev => [...new Set([...prev, model.id])]);
  }, []);

  const removeFromTooHard = useCallback((id: string) => {
    setTooHardPile(prev => prev.filter(mid => mid !== id));
  }, []);

  const filteredModels = useMemo(() => {
    return MENTAL_MODELS.filter(m => {
      const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDiscipline = selectedDiscipline === 'All' || m.discipline === selectedDiscipline;
      const notTooHard = !tooHardPile.includes(m.id);
      return matchesSearch && matchesDiscipline && notTooHard;
    });
  }, [searchQuery, selectedDiscipline, tooHardPile]);

  const handleModelClick = async (model: MentalModel) => {
    setSelectedModel(model);
    setIsDeepDiveLoading(true);
    setDeepDive(null);
    try {
      const content = await generateModelDeepDive(model.title);
      setDeepDive(content || null);
    } catch (err) {
      setDeepDive("Error retrieving wisdom from the Oracle.");
    } finally {
      setIsDeepDiveLoading(false);
    }
  };

  const handleSolve = async () => {
    if (!selectedModel || !problemInput.trim()) return;
    setIsAnalysisLoading(true);
    try {
      const result = await solveWithModel(selectedModel.title, problemInput);
      setAiAnalysis(result);
    } catch (err) {
      setAiAnalysis({ analysis: "Analysis failed. Even Munger has bad days.", steps: [], conclusion: "" });
    } finally {
      setIsAnalysisLoading(false);
    }
  };

  const randomQuote = useMemo(() => QUOTES[Math.floor(Math.random() * QUOTES.length)], []);

  return (
    <div className="min-h-screen font-sans selection:bg-gold selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-cream/80 dark:bg-charcoal/80 backdrop-blur-md border-b border-charcoal/5 dark:border-cream/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setActiveTab('latticework')}>
            <div className="w-8 h-8 bg-charcoal dark:bg-cream flex items-center justify-center rounded">
              <span className="text-cream dark:text-charcoal font-serif font-bold text-xl">M</span>
            </div>
            <span className="font-serif text-lg tracking-tight hidden sm:block">The Munger Latticework</span>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => setActiveTab('latticework')}
                className={`text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'latticework' ? 'text-gold' : 'text-charcoal/50 dark:text-cream/50 hover:text-charcoal dark:hover:text-cream'}`}
              >
                The Latticework
              </button>
              <button 
                onClick={() => setActiveTab('lab')}
                className={`text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'lab' ? 'text-gold' : 'text-charcoal/50 dark:text-cream/50 hover:text-charcoal dark:hover:text-cream'}`}
              >
                Application Lab
              </button>
            </div>
            <InversionToggle isDark={isDark} onToggle={toggleInversion} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-20 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-8 text-gold animate-pulse">
          <QuoteIcon className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">{randomQuote.attribution}</span>
        </div>
        <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-tight">
          Master the Best of What Other People Have Already <span className="italic font-normal">Figured Out.</span>
        </h1>
        <p className="text-xl text-charcoal/60 dark:text-cream/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          The world's greatest thinkers don't just know facts; they build a latticework of mental models to navigate complexity with clarity.
        </p>
        
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/40 dark:text-cream/40 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search mental models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-5 rounded-none bg-paper dark:bg-slate border-b-2 border-charcoal/10 dark:border-cream/10 focus:border-gold outline-none text-lg transition-all"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        {activeTab === 'latticework' ? (
          <>
            {/* Filter Chips */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
              {(['All', 'Psychology', 'Economics', 'Physics', 'Math', 'General'] as (Discipline | 'All')[]).map(discipline => (
                <button
                  key={discipline}
                  onClick={() => setSelectedDiscipline(discipline)}
                  className={`
                    px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-300
                    ${selectedDiscipline === discipline 
                      ? 'bg-charcoal text-cream dark:bg-cream dark:text-charcoal border-charcoal dark:border-cream' 
                      : 'border-charcoal/10 dark:border-cream/10 hover:border-gold text-charcoal/50 dark:text-cream/50'}
                  `}
                >
                  {discipline}
                </button>
              ))}
            </div>

            {/* Grid */}
            {filteredModels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-charcoal/5 dark:bg-cream/5 border border-charcoal/5 dark:border-cream/5">
                {filteredModels.map(model => (
                  <ModelCard 
                    key={model.id} 
                    model={model} 
                    onClick={handleModelClick} 
                    onTooHard={addToTooHard}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 opacity-50">
                <Brain className="w-12 h-12 mx-auto mb-4 text-gold" />
                <p className="font-serif italic text-xl">No models match your current mental framework.</p>
              </div>
            )}

            {/* Daily Wisdom Section */}
            {dailyWisdom && (
              <section className="mt-24 p-12 bg-berkshire text-cream relative overflow-hidden group">
                <div className="absolute right-0 top-0 opacity-10 scale-150 rotate-12 transition-transform duration-1000 group-hover:rotate-0">
                  <Library className="w-64 h-64" />
                </div>
                <div className="max-w-3xl relative z-10">
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-mutedGold mb-6 block">Daily Wisdom from the Vault</span>
                  <p className="text-2xl font-serif italic mb-8 leading-relaxed">
                    "{dailyWisdom}"
                  </p>
                  <div className="h-px w-20 bg-mutedGold"></div>
                </div>
              </section>
            )}

            {/* Too Hard Pile Section */}
            {tooHardPile.length > 0 && (
              <section className="mt-24 border-t border-charcoal/5 dark:border-cream/5 pt-16">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-serif text-3xl">The "Too Hard" Pile</h2>
                  <span className="text-xs text-charcoal/50 dark:text-cream/50 uppercase tracking-widest">A place for complex things we'll revisit later.</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {tooHardPile.map(id => {
                    const model = MENTAL_MODELS.find(m => m.id === id);
                    if (!model) return null;
                    return (
                      <div key={id} className="relative p-4 bg-paper dark:bg-slate border border-charcoal/10 dark:border-cream/10 group">
                        <span className="text-sm font-medium">{model.title}</span>
                        <button 
                          onClick={() => removeFromTooHard(id)}
                          className="absolute -top-2 -right-2 bg-charcoal text-cream dark:bg-cream dark:text-charcoal rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </>
        ) : (
          /* Application Lab Tab */
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Layers className="w-12 h-12 text-gold mx-auto mb-4" />
              <h2 className="font-serif text-4xl mb-4">The Application Lab</h2>
              <p className="text-charcoal/60 dark:text-cream/60">Select a model and feed it a problem to see rational analysis in action.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="md:col-span-1 space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-charcoal/50 dark:text-cream/50">1. Select Model</label>
                <div className="flex flex-col gap-2">
                  {MENTAL_MODELS.map(m => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedModel(m)}
                      className={`p-4 text-left border transition-all ${selectedModel?.id === m.id ? 'border-gold bg-gold/5' : 'border-charcoal/5 dark:border-cream/5 hover:border-gold/50'}`}
                    >
                      <span className="text-sm font-medium">{m.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-charcoal/50 dark:text-cream/50">2. Define Problem</label>
                <textarea 
                  value={problemInput}
                  onChange={(e) => setProblemInput(e.target.value)}
                  placeholder="Example: 'Should I quit my stable job to start a niche coffee roasting business?'"
                  className="w-full h-40 p-6 bg-paper dark:bg-slate border-b-2 border-charcoal/10 dark:border-cream/10 outline-none focus:border-gold resize-none text-lg font-light"
                />
                
                <button
                  onClick={handleSolve}
                  disabled={!selectedModel || !problemInput.trim() || isAnalysisLoading}
                  className="w-full py-4 bg-charcoal text-cream dark:bg-cream dark:text-charcoal font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gold dark:hover:bg-gold hover:text-white transition-all disabled:opacity-30"
                >
                  {isAnalysisLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  Generate Analysis
                </button>

                {aiAnalysis && (
                  <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="p-8 bg-paper dark:bg-slate border-l-4 border-gold">
                      <h4 className="font-serif text-2xl mb-4">Analysis: {selectedModel?.title}</h4>
                      <p className="text-lg font-light leading-relaxed whitespace-pre-wrap">{aiAnalysis.analysis}</p>
                    </div>

                    <div className="space-y-4">
                      <h5 className="text-xs font-bold uppercase tracking-widest text-gold">Strategic Steps</h5>
                      <ul className="space-y-4">
                        {aiAnalysis.steps.map((step: string, i: number) => (
                          <li key={i} className="flex gap-4">
                            <span className="font-serif text-xl italic text-charcoal/30 dark:text-cream/30">0{i+1}</span>
                            <span className="text-charcoal/80 dark:text-cream/80">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-8 border-2 border-dashed border-charcoal/10 dark:border-cream/10">
                      <h5 className="text-xs font-bold uppercase tracking-widest mb-4">The Verdict</h5>
                      <p className="font-serif text-xl italic text-gold">{aiAnalysis.conclusion}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Model Detail Modal */}
      {selectedModel && activeTab === 'latticework' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-charcoal/90 backdrop-blur-sm" onClick={() => setSelectedModel(null)}></div>
          <div className="relative bg-cream dark:bg-charcoal w-full max-w-4xl h-[90vh] overflow-y-auto overflow-x-hidden border border-cream/10 shadow-2xl">
            <button 
              onClick={() => setSelectedModel(null)}
              className="absolute top-6 right-6 p-2 text-charcoal/50 dark:text-cream/50 hover:text-gold transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 md:p-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-paper dark:bg-slate text-gold border border-gold/20">
                  {ICON_MAP[selectedModel.icon]}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold">{selectedModel.discipline}</span>
                  <h2 className="font-serif text-4xl md:text-6xl mt-1">{selectedModel.title}</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-charcoal/40 dark:text-cream/40 border-b border-charcoal/10 dark:border-cream/10 pb-2">Deep Insights</h3>
                  
                  {isDeepDiveLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                      <Loader2 className="w-8 h-8 animate-spin text-gold" />
                      <p className="font-serif italic text-charcoal/50 dark:text-cream/50">Consulting the records of Berkshire Hathaway...</p>
                    </div>
                  ) : (
                    <div className="prose prose-lg dark:prose-invert font-light leading-relaxed max-w-none">
                      <p className="text-xl whitespace-pre-wrap">{deepDive}</p>
                    </div>
                  )}

                  {selectedModel.crossPollinationIds && (
                    <div className="mt-16">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-6">Cross-Pollination</h4>
                      <div className="flex flex-wrap gap-4">
                        {selectedModel.crossPollinationIds.map(id => {
                          const related = MENTAL_MODELS.find(m => m.id === id);
                          if (!related) return null;
                          return (
                            <button 
                              key={id} 
                              onClick={() => handleModelClick(related)}
                              className="px-4 py-2 bg-paper dark:bg-slate border border-charcoal/5 dark:border-cream/5 hover:border-gold transition-colors text-sm flex items-center gap-2"
                            >
                              <span className="text-gold">{ICON_MAP[related.icon]}</span>
                              <span>{related.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="md:col-span-1">
                  <div className="sticky top-0 space-y-12">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-charcoal/40 dark:text-cream/40 mb-4">Key Axiom</h4>
                      <p className="font-serif text-lg italic italic leading-relaxed border-l-2 border-gold pl-4">
                        {selectedModel.summary}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-charcoal/40 dark:text-cream/40 mb-4">Application Lab</h4>
                      <button 
                        onClick={() => {
                          setActiveTab('lab');
                          setSelectedModel(selectedModel);
                        }}
                        className="w-full py-4 bg-charcoal text-cream dark:bg-cream dark:text-charcoal text-xs font-bold uppercase tracking-widest hover:bg-gold dark:hover:bg-gold hover:text-white transition-all"
                      >
                        Try with a Problem
                      </button>
                    </div>

                    <div className="p-6 bg-paper dark:bg-slate border border-charcoal/5 dark:border-cream/5">
                      <div className="flex items-center gap-2 mb-4">
                        <AlertCircle className="w-4 h-4 text-gold" />
                        <h4 className="text-xs font-bold uppercase tracking-widest">Rational Warning</h4>
                      </div>
                      <p className="text-xs text-charcoal/60 dark:text-cream/60 leading-loose">
                        To the man with only a hammer, every problem looks like a nail. Avoid over-application. Use multiple models to form a true latticework.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-paper dark:bg-slate border-t border-charcoal/5 dark:border-cream/5 py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <QuoteIcon className="w-8 h-8 mx-auto mb-8 text-gold opacity-30" />
          <p className="font-serif text-3xl italic mb-8">"I have nothing to add."</p>
          <div className="h-px w-12 bg-gold mx-auto mb-12"></div>
          <div className="flex flex-col md:flex-row items-center justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal/30 dark:text-cream/30 gap-8">
            <div className="flex gap-8">
              <a href="#" className="hover:text-gold transition-colors">Philosophy</a>
              <a href="#" className="hover:text-gold transition-colors">Archive</a>
              <a href="#" className="hover:text-gold transition-colors">Legal</a>
            </div>
            <span>Built for the rational mind.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;