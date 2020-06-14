export interface Contribution {
  id?: string;
  type: 'topic' | 'resource';
  topic: string;
  content: string;
  sources: string[];
  votes?: number;
  createdAt?: string;
  createdBy?: string;
}
