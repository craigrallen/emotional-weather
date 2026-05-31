import { useState } from 'react';
import { type Household, type Member, type WeatherState, WEATHERS } from '../types';
import { WeatherAnimation } from './WeatherAnimation';
import { WeatherPicker } from './WeatherPicker';
import { setWeather, save, getNudges } from '../store';

interface Props {
  household: Household;
  onChange: (h: Household) => void;
}

export function Dashboard({ household, onChange }: Props) {
  const [picking, setPicking] = useState<Member | null>(null);
  const nudges = getNudges(household);

  const handleSelect = (memberId: string, weather: WeatherState) => {
    const h = setWeather(household, memberId, weather);
    save(h);
    onChange(h);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-center mb-1">{household.name}</h2>
      <p className="text-center text-sm text-gray-400 mb-5">Today's forecast</p>

      {nudges.length > 0 && (
        <div className="mb-4 space-y-2">
          {nudges.map((n, i) => (
            <div key={i} className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 text-sm text-amber-800">
              {n}
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3">
        {household.members.map(m => {
          const info = WEATHERS.find(w => w.id === m.currentWeather)!;
          return (
            <button
              key={m.id}
              onClick={() => setPicking(m)}
              className="w-full text-left weather-card rounded-2xl shadow-md hover:shadow-lg transition-shadow"
            >
              <WeatherAnimation weather={m.currentWeather} />
              <div className="relative z-10 -mt-28 h-28 flex items-center px-5 gap-4">
                <span className="text-3xl bg-white/60 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center shadow-sm">{m.avatar}</span>
                <div>
                  <div className="font-semibold text-white drop-shadow">{m.name}</div>
                  <div className="text-sm text-white/80 drop-shadow">{info.emoji} {info.label}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {picking && (
        <WeatherPicker
          current={picking.currentWeather}
          onSelect={w => handleSelect(picking.id, w)}
          onClose={() => setPicking(null)}
        />
      )}
    </div>
  );
}
