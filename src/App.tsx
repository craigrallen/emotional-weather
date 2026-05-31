import { useState } from 'react';
import type { Household } from './types';
import { load } from './store';
import { Setup } from './components/Setup';
import { Dashboard } from './components/Dashboard';
import { History } from './components/History';

type Tab = 'home' | 'history';

export default function App() {
  const [household, setHousehold] = useState<Household | null>(() => load());
  const [tab, setTab] = useState<Tab>('home');

  if (!household) return <Setup onComplete={setHousehold} />;

  const reset = () => {
    localStorage.removeItem('emotional-weather');
    setHousehold(null);
  };

  return (
    <div className="min-h-dvh pb-24">
      <div className="pt-6">
        {tab === 'home' && <Dashboard household={household} onChange={setHousehold} />}
        {tab === 'history' && <History household={household} />}
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 inset-x-0 p-3">
        <div className="max-w-sm mx-auto bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg flex items-center p-1.5 gap-1">
          <button onClick={() => setTab('home')} className={`nav-btn flex-1 py-2.5 rounded-xl text-sm font-medium ${tab === 'home' ? 'active' : ''}`}>
            🏠 Home
          </button>
          <button onClick={() => setTab('history')} className={`nav-btn flex-1 py-2.5 rounded-xl text-sm font-medium ${tab === 'history' ? 'active' : ''}`}>
            📅 History
          </button>
          <button onClick={reset} className="nav-btn py-2.5 px-3 rounded-xl text-sm text-gray-400 hover:text-red-400">
            ↺
          </button>
        </div>
      </div>
    </div>
  );
}
