export interface Contribution {
  id: string;
  type: 'topic' | 'resource';
  topic?: string;
  content?: string;
  sources?: string[];
  votes?: number;
  created_at?: string;
  created_by?: string;
}
