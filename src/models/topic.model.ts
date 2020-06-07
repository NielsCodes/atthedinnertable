export interface Topic {
  id: string;
  title: string;
  message: string;
  rating: {
    up: number;
    down: number
  };
}
