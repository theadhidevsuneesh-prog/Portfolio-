export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface SkillItem {
  name: string;
  iconName: string;
  level: number; // 0-100 indicating confidence
}

export interface SkillCategory {
  title: string;
  description: string;
  items: SkillItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  type: 'interactive-ai' | 'canvas' | 'markdown';
}
