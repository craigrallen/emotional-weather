export type WeatherState = 'stormy' | 'rainy' | 'cloudy' | 'partly-cloudy' | 'mostly-sunny' | 'sunny' | 'rainbow';

export interface WeatherInfo {
  id: WeatherState;
  emoji: string;
  label: string;
  gradient: string;
  color: string;
}

export interface Member {
  id: string;
  name: string;
  avatar: string;
  currentWeather: WeatherState;
  updatedAt: string;
}

export interface WeatherEntry {
  memberId: string;
  weather: WeatherState;
  date: string; // YYYY-MM-DD
}

export interface Household {
  name: string;
  members: Member[];
  history: WeatherEntry[];
}

export const WEATHERS: WeatherInfo[] = [
  { id: 'stormy', emoji: '⛈️', label: 'Stormy', gradient: 'linear-gradient(135deg, #4a4458 0%, #6b5b7b 50%, #8a7a9a 100%)', color: '#6b5b7b' },
  { id: 'rainy', emoji: '🌧️', label: 'Rainy', gradient: 'linear-gradient(135deg, #7b8fa8 0%, #9baec4 50%, #b8ccdd 100%)', color: '#9baec4' },
  { id: 'cloudy', emoji: '☁️', label: 'Cloudy', gradient: 'linear-gradient(135deg, #b0b8c8 0%, #c8d0dd 50%, #dde3ec 100%)', color: '#c8d0dd' },
  { id: 'partly-cloudy', emoji: '⛅', label: 'Partly Cloudy', gradient: 'linear-gradient(135deg, #c4cfe0 0%, #d8dfe8 30%, #f0dcc0 100%)', color: '#d8dfe8' },
  { id: 'mostly-sunny', emoji: '🌤️', label: 'Mostly Sunny', gradient: 'linear-gradient(135deg, #f0dcc0 0%, #f5e6c8 50%, #fcebd2 100%)', color: '#f5e6c8' },
  { id: 'sunny', emoji: '☀️', label: 'Sunny', gradient: 'linear-gradient(135deg, #fce4b8 0%, #fdd89b 50%, #ffe0a0 100%)', color: '#fdd89b' },
  { id: 'rainbow', emoji: '🌈', label: 'Rainbow', gradient: 'linear-gradient(135deg, #ffd4d4 0%, #ffdaa8 20%, #fffab8 40%, #c8f7c5 60%, #c4e0f9 80%, #e8d5f5 100%)', color: '#ffdaa8' },
];

export const AVATARS = ['😊','😎','🥰','🤓','👶','👧','👦','👩','👨','👵','👴','🐱','🐶','🦊','🐻','🐼','🐸','🦁','🐰','🐮'];
