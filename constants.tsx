
import React from 'react';
import { 
  Zap, 
  RefreshCw, 
  Target, 
  ShieldCheck, 
  Layers, 
  Compass, 
  Scale, 
  Hash, 
  Microscope, 
  BrainCircuit,
  Binary,
  Globe,
  TrendingUp,
  RotateCcw,
  Activity,
  Infinity,
  CheckCircle,
  Dna,
  Link,
  Cpu,
  ArrowRightLeft,
  Divide,
  PieChart,
  Waves,
  Eye,
  HandMetal,
  Hammer
} from 'lucide-react';
import { MentalModel, Quote } from './types';

export const MENTAL_MODELS: MentalModel[] = [
  // --- EXISTING CLASSICS ---
  {
    id: 'inversion',
    title: 'Inversion',
    discipline: 'Math',
    summary: 'Instead of solving a problem forward, try thinking about it backward.',
    icon: 'RefreshCw',
    description: 'The practice of thinking through a problem in reverse. Instead of asking "How can I succeed?", ask "What will guarantee failure?" and then avoid those things. Munger often said: "Invert, always invert."',
    crossPollinationIds: ['probabilistic-thinking', 'regression-to-the-mean']
  },
  {
    id: 'circle-of-competence',
    title: 'Circle of Competence',
    discipline: 'General',
    summary: 'Know where your knowledge begins and ends.',
    icon: 'Target',
    description: 'Understanding where you have a high level of skill or knowledge and where you do not. Staying inside this circle is essential for avoiding costly mistakes.',
    crossPollinationIds: ['margin-of-safety', 'specialization']
  },
  {
    id: 'margin-of-safety',
    title: 'Margin of Safety',
    discipline: 'General',
    summary: 'Always leave room for error and the unknown.',
    icon: 'ShieldCheck',
    description: 'The concept of making a buffer against error, bad luck, or complexity. It allows you to be wrong without being ruined.',
    crossPollinationIds: ['circle-of-competence', 'redundancy']
  },
  {
    id: 'incentives',
    title: 'Incentive-Caused Bias',
    discipline: 'Psychology',
    summary: 'Show me the incentive and I will show you the outcome.',
    icon: 'Zap',
    description: 'Human behavior is driven primarily by incentives. This leads to "Incentive-Caused Bias," where even decent people will act immorally if the reward structure encourages it.',
    crossPollinationIds: ['reciprocity', 'social-proof']
  },
  {
    id: 'compounding',
    title: 'Compounding',
    discipline: 'Math',
    summary: 'The powerful effect of constant gains over time.',
    icon: 'Layers',
    description: 'Einstein called it the eighth wonder of the world. Small, consistent improvements or investments grow exponentially over long periods.',
    crossPollinationIds: ['critical-mass', 'network-effects']
  },
  {
    id: 'probabilistic-thinking',
    title: 'Probabilistic Thinking',
    discipline: 'Math',
    summary: 'Estimating the likelihood of any specific outcome.',
    icon: 'Hash',
    description: 'Moving away from binary "yes/no" thinking toward thinking in probabilities. It helps in making decisions under uncertainty.',
    crossPollinationIds: ['margin-of-safety', 'normal-distribution']
  },

  // --- PSYCHOLOGY (THE 25 TENDENCIES) ---
  {
    id: 'lollapalooza-effect',
    title: 'Lollapalooza Effect',
    discipline: 'Psychology',
    summary: 'Multiple psychological biases acting in the same direction.',
    icon: 'Activity',
    description: 'When several mental models act in concert toward a single goal, the result is extreme—often leading to massive success or spectacular failure.',
    crossPollinationIds: ['social-proof', 'authority-bias']
  },
  {
    id: 'social-proof',
    title: 'Social Proof',
    discipline: 'Psychology',
    summary: 'The tendency to do what others are doing.',
    icon: 'Globe',
    description: 'In uncertainty, humans look to others for cues on how to act. This "herd mentality" often overrides individual logic.',
    crossPollinationIds: ['authority-bias', 'lollapalooza-effect']
  },
  {
    id: 'authority-bias',
    title: 'Authority Bias',
    discipline: 'Psychology',
    summary: 'Trusting experts or leaders blindly.',
    icon: 'HandMetal',
    description: 'A tendency to follow the instructions or opinions of a perceived authority figure, regardless of the logic.',
    crossPollinationIds: ['social-proof', 'incentives']
  },
  {
    id: 'reciprocity',
    title: 'Reciprocity',
    discipline: 'Psychology',
    summary: 'The tendency of humans to return favors or harms.',
    icon: 'Scale',
    description: 'A powerful psychological bias where we feel obligated to give back when we receive. It is the basis for much of human social interaction.',
    crossPollinationIds: ['incentives', 'social-proof']
  },
  {
    id: 'confirmation-bias',
    title: 'Confirmation Bias',
    discipline: 'Psychology',
    summary: 'Seeking only information that confirms existing beliefs.',
    icon: 'Eye',
    description: 'The human brain is an organ designed to find what it expects to find. We ignore evidence that challenges our worldview.',
    crossPollinationIds: ['first-principles', 'inversion']
  },
  {
    id: 'commitment-consistency',
    title: 'Commitment & Consistency',
    discipline: 'Psychology',
    summary: 'Staying the course because you have already started.',
    icon: 'Infinity',
    description: 'Once we take a public stand or perform an action, we feel pressure to behave consistently with that commitment.',
    crossPollinationIds: ['sunk-cost', 'confirmation-bias']
  },

  // --- ECONOMICS & BUSINESS ---
  {
    id: 'opportunity-cost',
    title: 'Opportunity Cost',
    discipline: 'Economics',
    summary: 'The value of the next best alternative given up.',
    icon: 'ArrowRightLeft',
    description: 'Every choice involves a trade-off. To evaluate an investment, you must compare it to the best available alternative.',
    crossPollinationIds: ['margin-of-safety', 'comparative-advantage']
  },
  {
    id: 'comparative-advantage',
    title: 'Comparative Advantage',
    discipline: 'Economics',
    summary: 'Focusing on what you do best relative to others.',
    icon: 'TrendingUp',
    description: 'Individuals or nations benefit by specializing in goods they can produce at a lower opportunity cost.',
    crossPollinationIds: ['opportunity-cost', 'specialization']
  },
  {
    id: 'creative-destruction',
    title: 'Creative Destruction',
    discipline: 'Economics',
    summary: 'New innovations replacing outdated systems.',
    icon: 'Zap',
    description: 'The process of industrial mutation that incessantly revolutionizes the economic structure from within.',
    crossPollinationIds: ['evolution', 'surfing']
  },
  {
    id: 'network-effects',
    title: 'Network Effects',
    discipline: 'Economics',
    summary: 'A product becomes more valuable as more people use it.',
    icon: 'Link',
    description: 'Metcalfe’s Law states that the value of a network is proportional to the square of the number of users.',
    crossPollinationIds: ['compounding', 'critical-mass']
  },
  {
    id: 'surfing',
    title: 'Surfing',
    discipline: 'Economics',
    summary: 'Riding a massive wave of technological or social change.',
    icon: 'Waves',
    description: 'Munger uses the surfer analogy: when a massive wave of change comes (like the Internet), the few who "catch" it early gain huge advantages.',
    crossPollinationIds: ['creative-destruction', 'critical-mass']
  },

  // --- PHYSICS & ENGINEERING ---
  {
    id: 'entropy',
    title: 'Entropy',
    discipline: 'Physics',
    summary: 'The natural tendency toward disorder and decay.',
    icon: 'RotateCcw',
    description: 'Systems left alone naturally move from order to chaos. Constant energy and maintenance are required to prevent decay.',
    crossPollinationIds: ['feedback-loops', 'evolution']
  },
  {
    id: 'redundancy',
    title: 'Redundancy',
    discipline: 'General',
    summary: 'Using backup systems to prevent total failure.',
    icon: 'Cpu',
    description: 'Borrowed from engineering, this involves having secondary parts or systems that take over if the primary fails.',
    crossPollinationIds: ['margin-of-safety', 'critical-mass']
  },
  {
    id: 'critical-mass',
    title: 'Critical Mass',
    discipline: 'Physics',
    summary: 'The point where a small change causes a big transition.',
    icon: 'Compass',
    description: 'Borrowed from nuclear physics, this describes the point where a system achieves enough momentum to sustain itself.',
    crossPollinationIds: ['network-effects', 'compounding']
  },
  {
    id: 'first-principles',
    title: 'First Principles',
    discipline: 'Physics',
    summary: 'Breaking down reality into fundamental truths.',
    icon: 'Microscope',
    description: 'Deconstructing complex problems to their basic components and rebuilding them from scratch, rather than reasoning by analogy.',
    crossPollinationIds: ['inversion', 'math-reasoning']
  },

  // --- BIOLOGY ---
  {
    id: 'evolution',
    title: 'Evolution',
    discipline: 'Biology',
    summary: 'Adaptation and survival through competition.',
    icon: 'Dna',
    description: 'The natural process where organisms better adapted to their environment tend to survive and produce more offspring.',
    crossPollinationIds: ['creative-destruction', 'entropy']
  },
  {
    id: 'ecosystem',
    title: 'Ecosystem',
    discipline: 'Biology',
    summary: 'Interconnected systems where every part affects the other.',
    icon: 'Globe',
    description: 'In business and biology, no entity exists in a vacuum. Everything is part of a complex, interdependent web.',
    crossPollinationIds: ['network-effects', 'social-proof']
  },

  // --- MATH & LOGIC ---
  {
    id: 'regression-to-the-mean',
    title: 'Regression to the Mean',
    discipline: 'Math',
    summary: 'Extreme outcomes tend to return to the average.',
    icon: 'Divide',
    description: 'In any series with a luck component, an extreme outcome will likely be followed by one closer to the average.',
    crossPollinationIds: ['probabilistic-thinking', 'inversion']
  },
  {
    id: 'normal-distribution',
    title: 'Normal Distribution',
    discipline: 'Math',
    summary: 'The standard bell curve of occurrences.',
    icon: 'PieChart',
    description: 'Many natural phenomena follow a bell curve where most results cluster around the center.',
    crossPollinationIds: ['probabilistic-thinking', 'regression-to-the-mean']
  },
  {
    id: 'checklists',
    title: 'Checklists',
    discipline: 'General',
    summary: 'Preventing errors through structured verification.',
    icon: 'CheckCircle',
    description: 'Human memory is flawed. A simple checklist can prevent "dumb" mistakes that even experts make.',
    crossPollinationIds: ['circle-of-competence', 'inversion']
  },
  {
    id: 'specialization',
    title: 'Specialization',
    discipline: 'General',
    summary: 'The power of being a narrow expert.',
    icon: 'Hammer',
    description: 'By focusing on a narrow field, you can achieve mastery and efficiency that a generalist cannot match.',
    crossPollinationIds: ['comparative-advantage', 'circle-of-competence']
  }
];

export const ICON_MAP: Record<string, React.ReactNode> = {
  RefreshCw: <RefreshCw className="w-6 h-6" />,
  Target: <Target className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Hash: <Hash className="w-6 h-6" />,
  Microscope: <Microscope className="w-6 h-6" />,
  Compass: <Compass className="w-6 h-6" />,
  Scale: <Scale className="w-6 h-6" />,
  BrainCircuit: <BrainCircuit className="w-6 h-6" />,
  Binary: <Binary className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  RotateCcw: <RotateCcw className="w-6 h-6" />,
  Activity: <Activity className="w-6 h-6" />,
  Infinity: <Infinity className="w-6 h-6" />,
  CheckCircle: <CheckCircle className="w-6 h-6" />,
  Dna: <Dna className="w-6 h-6" />,
  Link: <Link className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  ArrowRightLeft: <ArrowRightLeft className="w-6 h-6" />,
  Divide: <Divide className="w-6 h-6" />,
  PieChart: <PieChart className="w-6 h-6" />,
  Waves: <Waves className="w-6 h-6" />,
  Eye: <Eye className="w-6 h-6" />,
  HandMetal: <HandMetal className="w-6 h-6" />,
  Hammer: <Hammer className="w-6 h-6" />
};

export const QUOTES: Quote[] = [
  { text: "Show me the incentive and I will show you the outcome.", attribution: "Charlie Munger" },
  { text: "I have nothing to add.", attribution: "Charlie Munger" },
  { text: "Invert, always invert.", attribution: "Charlie Munger" },
  { text: "The first rule of compounding is to never interrupt it unnecessarily.", attribution: "Charlie Munger" },
  { text: "Knowing what you don't know is more useful than being brilliant.", attribution: "Charlie Munger" },
  { text: "Take a simple idea and take it seriously.", attribution: "Charlie Munger" },
  { text: "A lot of people with high IQs are terrible investors because they've got terrible temperaments.", attribution: "Charlie Munger" }
];
