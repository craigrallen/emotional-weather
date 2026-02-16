import { WEATHERS, type WeatherState } from '../types';
import { WeatherAnimation } from './WeatherAnimation';

interface Props {
  current: WeatherState;
  onSelect: (w: WeatherState) => void;
  onClose: () => void;
}

export function WeatherPicker({ current, onSelect, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white/90 backdrop-blur rounded-3xl p-6 max-w-sm w-full shadow-xl" onClick={e => e.stopPropagation()}>
        <h2 className="text-lg font-semibold text-center mb-4">How are you feeling?</h2>
        <div className="grid grid-cols-1 gap-3">
          {WEATHERS.map(w => (
            <button
              key={w.id}
              onClick={() => { onSelect(w.id); onClose(); }}
              className={`rounded-2xl overflow-hidden transition-all ${current === w.id ? 'ring-3 ring-amber-400 scale-[1.02]' : 'hover:scale-[1.01]'}`}
            >
              <WeatherAnimation weather={w.id} size="sm" />
              <div className="relative z-10 -mt-28 h-28 flex items-center justify-center">
                <span className="bg-white/70 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium shadow-sm">
                  {w.emoji} {w.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
