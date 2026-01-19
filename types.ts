
export type Discipline = 'Psychology' | 'Economics' | 'Physics' | 'Math' | 'Biology' | 'General';

export interface MentalModel {
  id: string;
  title: string;
  discipline: Discipline;
  summary: string;
  icon: string;
  description: string;
  crossPollinationIds?: string[];
}

export interface ApplicationScenario {
  title: string;
  content: string;
  modelApplied: string;
}

export interface Quote {
  text: string;
  attribution: string;
}
