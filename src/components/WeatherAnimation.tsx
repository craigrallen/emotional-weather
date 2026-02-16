import { type WeatherState, WEATHERS } from '../types';

interface Props {
  weather: WeatherState;
  size?: 'sm' | 'lg';
}

export function WeatherAnimation({ weather, size = 'sm' }: Props) {
  const info = WEATHERS.find(w => w.id === weather)!;
  const isLg = size === 'lg';
  const h = isLg ? 'h-40' : 'h-28';

  return (
    <div className={`weather-card ${h} w-full`}>
      <div className="weather-bg" style={{ background: info.gradient }} />
      <div className="relative z-10 flex items-center justify-center h-full">
        {weather === 'stormy' && (
          <>
            <div className="storm-flash" />
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rain-drop" style={{
                left: `${8 + i * 8}%`,
                animationDelay: `${Math.random() * 0.8}s`,
                height: '14px',
              }} />
            ))}
            <span className={isLg ? 'text-6xl' : 'text-4xl'}>{info.emoji}</span>
          </>
        )}
        {weather === 'rainy' && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rain-drop" style={{
                left: `${10 + i * 10}%`,
                animationDelay: `${Math.random() * 0.8}s`,
              }} />
            ))}
            <span className={isLg ? 'text-6xl' : 'text-4xl'}>{info.emoji}</span>
          </>
        )}
        {weather === 'cloudy' && (
          <span className={`cloud-float ${isLg ? 'text-6xl' : 'text-4xl'}`}>{info.emoji}</span>
        )}
        {weather === 'partly-cloudy' && (
          <span className={`cloud-float ${isLg ? 'text-6xl' : 'text-4xl'}`}>{info.emoji}</span>
        )}
        {weather === 'mostly-sunny' && (
          <div className="relative">
            <span className={`sun-glow inline-block ${isLg ? 'text-6xl' : 'text-4xl'}`}>{info.emoji}</span>
          </div>
        )}
        {weather === 'sunny' && (
          <div className="relative">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="sun-ray" style={{
                top: '50%', left: '50%',
                transform: `rotate(${i * 45}deg) translateY(-28px)`,
                animationDelay: `${i * 0.25}s`,
              }} />
            ))}
            <span className={`sun-glow inline-block ${isLg ? 'text-6xl' : 'text-4xl'}`}>{info.emoji}</span>
          </div>
        )}
        {weather === 'rainbow' && (
          <span className={`rainbow-glow inline-block ${isLg ? 'text-6xl' : 'text-4xl'}`}>{info.emoji}</span>
        )}
      </div>
    </div>
  );
}
