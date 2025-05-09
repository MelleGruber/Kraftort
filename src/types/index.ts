
export type Season = "spring" | "summer" | "autumn" | "winter";

export interface Location {
  id: string;
  name: string;
  description: string;
  xPosition: number;
  yPosition: number;
  stories: Story[];
  imageUrl?: string;
  images?: string[];
}

export interface Story {
  id: string;
  title: string;
  content: string;
  audioUrl?: string;
  season: Season;
  images: string[];
}

export interface SanctuaryData {
  locations: Location[];
}
