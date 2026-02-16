import { useState } from 'react';
import { type Household, AVATARS } from '../types';
import { save } from '../store';

interface Props {
  onComplete: (h: Household) => void;
}

export function Setup({ onComplete }: Props) {
  const [householdName, setHouseholdName] = useState('');
  const [members, setMembers] = useState<{ name: string; avatar: string }[]>([
    { name: '', avatar: '😊' },
  ]);

  const addMember = () => setMembers([...members, { name: '', avatar: '😊' }]);
  const updateMember = (i: number, field: 'name' | 'avatar', val: string) => {
    const m = [...members];
    m[i] = { ...m[i], [field]: val };
    setMembers(m);
  };
  const removeMember = (i: number) => setMembers(members.filter((_, j) => j !== i));

  const canSubmit = householdName.trim() && members.every(m => m.name.trim());

  const submit = () => {
    const h: Household = {
      name: householdName.trim(),
      members: members.map((m, i) => ({
        id: `m-${Date.now()}-${i}`,
        name: m.name.trim(),
        avatar: m.avatar,
        currentWeather: 'sunny',
        updatedAt: new Date().toISOString(),
      })),
      history: [],
    };
    save(h);
    onComplete(h);
  };

  return (
    <div className="min-h-dvh flex items-center justify-center p-6">
      <div className="bg-white/80 backdrop-blur rounded-3xl p-8 max-w-md w-full shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-1">🏠 Emotional Weather</h1>
        <p className="text-center text-sm text-gray-500 mb-6">How's the weather at home?</p>

        <label className="block text-sm font-medium mb-1">Household Name</label>
        <input
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 mb-5 focus:outline-none focus:ring-2 focus:ring-amber-200 bg-white/60"
          placeholder="The Johnsons"
          value={householdName}
          onChange={e => setHouseholdName(e.target.value)}
        />

        <label className="block text-sm font-medium mb-2">Family Members</label>
        {members.map((m, i) => (
          <div key={i} className="flex gap-2 mb-3 items-center">
            <div className="relative">
              <select
                className="appearance-none text-2xl bg-white/60 rounded-xl w-12 h-10 text-center cursor-pointer border border-gray-200"
                value={m.avatar}
                onChange={e => updateMember(i, 'avatar', e.target.value)}
              >
                {AVATARS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <input
              className="flex-1 rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-200 bg-white/60"
              placeholder="Name"
              value={m.name}
              onChange={e => updateMember(i, 'name', e.target.value)}
            />
            {members.length > 1 && (
              <button onClick={() => removeMember(i)} className="text-gray-400 hover:text-red-400 text-lg px-1">×</button>
            )}
          </div>
        ))}

        <button onClick={addMember} className="text-sm text-amber-600 hover:text-amber-700 mb-6 block">+ Add member</button>

        <button
          onClick={submit}
          disabled={!canSubmit}
          className="w-full py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 disabled:opacity-40 transition-all shadow-md"
        >
          Create Household ☀️
        </button>
      </div>
    </div>
  );
}
