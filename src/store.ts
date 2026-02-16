import type { Household, WeatherState, WeatherEntry } from './types';

const KEY = 'emotional-weather';

export function load(): Household | null {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export function save(h: Household) {
  localStorage.setItem(KEY, JSON.stringify(h));
}

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function setWeather(h: Household, memberId: string, weather: WeatherState): Household {
  const date = today();
  const members = h.members.map(m =>
    m.id === memberId ? { ...m, currentWeather: weather, updatedAt: new Date().toISOString() } : m
  );
  // Upsert today's history entry
  const history = h.history.filter(e => !(e.memberId === memberId && e.date === date));
  history.push({ memberId, weather, date });
  return { ...h, members, history };
}

export function getHistory(h: Household, memberId: string, days = 30): (WeatherEntry | null)[] {
  const result: (WeatherEntry | null)[] = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const date = d.toISOString().slice(0, 10);
    const entry = h.history.find(e => e.memberId === memberId && e.date === date);
    result.push(entry || null);
  }
  return result;
}

export function getNudges(h: Household): string[] {
  const nudges: string[] = [];
  const now = new Date();
  for (const m of h.members) {
    let stormyDays = 0;
    for (let i = 0; i < 3; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const date = d.toISOString().slice(0, 10);
      const entry = h.history.find(e => e.memberId === m.id && e.date === date);
      if (entry && (entry.weather === 'stormy' || entry.weather === 'rainy')) stormyDays++;
    }
    if (stormyDays >= 2) {
      nudges.push(`Maybe check in on ${m.name}? 💛`);
    }
  }
  return nudges;
}
