import { useState } from 'react';
import { type Household, WEATHERS } from '../types';
import { getHistory } from '../store';

interface Props {
  household: Household;
}

export function History({ household }: Props) {
  const [selectedMember, setSelectedMember] = useState(household.members[0]?.id);
  const history = getHistory(household, selectedMember, 30);

  const dayLabels = () => {
    const labels: string[] = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      labels.push(d.toLocaleDateString('en', { month: 'short', day: 'numeric' }));
    }
    return labels;
  };
  const labels = dayLabels();

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-center mb-1">Weather History</h2>
      <p className="text-center text-sm text-gray-400 mb-5">Past 30 days</p>

      <div className="flex gap-2 justify-center mb-5 flex-wrap">
        {household.members.map(m => (
          <button
            key={m.id}
            onClick={() => setSelectedMember(m.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedMember === m.id
                ? 'bg-amber-100 text-amber-800 shadow-sm'
                : 'bg-white/60 text-gray-500 hover:bg-white'
            }`}
          >
            {m.avatar} {m.name}
          </button>
        ))}
      </div>

      <div className="bg-white/70 backdrop-blur rounded-2xl p-5 shadow-sm">
        <div className="grid grid-cols-7 gap-1.5">
          {['M','T','W','T','F','S','S'].map((d,i) => (
            <div key={i} className="text-center text-xs text-gray-400 mb-1">{d}</div>
          ))}
          {/* offset to align with weekday */}
          {(() => {
            const now = new Date();
            const start = new Date(now);
            start.setDate(start.getDate() - 29);
            const offset = (start.getDay() + 6) % 7; // Mon=0
            const cells = [];
            for (let i = 0; i < offset; i++) {
              cells.push(<div key={`off-${i}`} className="heatmap-cell" />);
            }
            history.forEach((entry, i) => {
              const weather = entry ? WEATHERS.find(w => w.id === entry.weather) : null;
              cells.push(
                <div
                  key={i}
                  className="heatmap-cell cursor-default"
                  style={{
                    background: weather ? weather.gradient : '#f0ece8',
                    border: weather ? 'none' : '1px dashed #ddd',
                  }}
                  title={`${labels[i]}: ${weather ? weather.label : 'No entry'}`}
                />
              );
            });
            return cells;
          })()}
        </div>

        <div className="flex gap-2 justify-center mt-4 flex-wrap">
          {WEATHERS.map(w => (
            <div key={w.id} className="flex items-center gap-1 text-xs text-gray-500">
              <div className="w-3 h-3 rounded" style={{ background: w.color }} />
              {w.emoji}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
