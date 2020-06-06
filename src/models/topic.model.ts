export interface Topic {
  id: string;
  title: string;
  rating: {
    up: number;
    down: number
  };
}
