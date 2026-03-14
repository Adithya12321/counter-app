import React, { useState, useEffect } from 'react';
import { Minus, Plus, RotateCcw, Trash2, Settings2, X } from 'lucide-react';

export type Theme = 'default' | 'ocean' | 'midnight' | 'sunset' | 'emerald';

export interface HistoryEvent {
  id: string;
  timestamp: number;
  change: number;
  action: 'increment' | 'decrement' | 'reset' | 'initial';
}

export interface CounterData {
  id: string;
  name: string;
  count: number;
  theme: Theme;
  goal?: number;
  history: HistoryEvent[];
}

interface CounterCardProps extends CounterData {
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onReset: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdateName: (id: string, name: string) => void;
  onUpdateTheme: (id: string, theme: Theme) => void;
  onUpdateGoal: (id: string, goal: number | undefined) => void;
}

const themeStyles: Record<Theme, { card: string, button: string, text: string }> = {
  default: { card: 'bg-white border-slate-200 shadow-sm', button: 'bg-slate-100 hover:bg-slate-200 text-slate-700', text: 'text-slate-800' },
  ocean: { card: 'bg-blue-500 border-blue-600 shadow-blue-500/20', button: 'bg-blue-600 hover:bg-blue-700 text-white', text: 'text-white' },
  midnight: { card: 'bg-slate-900 border-slate-800 shadow-slate-900/20', button: 'bg-slate-800 hover:bg-slate-700 text-white', text: 'text-white' },
  sunset: { card: 'bg-orange-500 border-orange-600 shadow-orange-500/20', button: 'bg-orange-600 hover:bg-orange-700 text-white', text: 'text-white' },
  emerald: { card: 'bg-emerald-500 border-emerald-600 shadow-emerald-500/20', button: 'bg-emerald-600 hover:bg-emerald-700 text-white', text: 'text-white' },
};

const CounterCard: React.FC<CounterCardProps> = ({
  id, name, count, theme, goal, history,
  onIncrement, onDecrement, onReset, onDelete, onUpdateName, onUpdateTheme, onUpdateGoal
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [showSettings, setShowSettings] = useState(false);
  const [editGoal, setEditGoal] = useState(goal?.toString() || '');

  useEffect(() => {
    setEditGoal(goal?.toString() || '');
  }, [goal]);

  const styles = themeStyles[theme];

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editName.trim()) {
      onUpdateName(id, editName.trim());
    } else {
      setEditName(name);
    }
    setIsEditing(false);
  };

  const handleGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = editGoal.trim();
    if (val === '') {
      onUpdateGoal(id, undefined);
    } else {
      const num = parseInt(val);
      if (!isNaN(num)) {
        onUpdateGoal(id, num);
      }
    }
  };

  const progress = goal ? Math.min(Math.max((count / goal) * 100, 0), 100) : 0;

  return (
    <div className={`relative flex flex-col p-6 rounded-2xl border ${styles.card} transition-all duration-300 hover:shadow-lg overflow-hidden group w-full max-w-sm`}>
      {/* Header section */}
      <div className="flex justify-between items-center mb-6">
        {isEditing ? (
          <form onSubmit={handleNameSubmit} className="flex-1 mr-2">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className={`w-full px-2 py-1 rounded-md text-sm font-semibold border-2 border-primary-500 focus:outline-none ${theme === 'default' ? 'bg-white text-slate-800' : 'bg-white/20 text-white placeholder-white/60'}`}
              autoFocus
              onBlur={handleNameSubmit}
            />
          </form>
        ) : (
          <h3
            className={`text-lg font-semibold truncate cursor-pointer ${styles.text} hover:underline decoration-1 underline-offset-4 decoration-primary-300`}
            onClick={() => setIsEditing(true)}
            title="Click to edit name"
          >
            {name}
          </h3>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-full transition-colors sm:opacity-0 group-hover:opacity-100 focus:opacity-100 ${styles.button}`}
            aria-label="Settings"
          >
            <Settings2 size={16} />
          </button>
        </div>
      </div>

      {/* Settings Panel (Overlay) */}
      {showSettings && (
        <div className="absolute inset-0 p-4 bg-white/98 backdrop-blur-md z-10 shadow-sm animate-in fade-in slide-in-from-top-4 duration-200 rounded-2xl flex flex-col">
          <div className="flex justify-between items-center mb-4 shrink-0">
            <h4 className="text-sm font-bold text-slate-800">Card Settings</h4>
            <button onClick={() => setShowSettings(false)} className="text-slate-500 hover:text-slate-800 p-1">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-5 pb-4">

          <div className="mb-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Theme selection</span>
            <div className="flex gap-2">
              {(Object.keys(themeStyles) as Theme[]).map((t) => (
                <button
                  key={t}
                  onClick={() => onUpdateTheme(id, t)}
                  className={`w-6 h-6 rounded-full border-2 ${theme === t ? 'border-primary-600 scale-110 shadow-sm' : 'border-transparent'} transition-all ${t === 'default' ? 'bg-slate-200' :
                      t === 'ocean' ? 'bg-blue-500' :
                        t === 'midnight' ? 'bg-slate-900' :
                          t === 'sunset' ? 'bg-orange-500' : 'bg-emerald-500'
                    }`}
                  aria-label={`Theme ${t}`}
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Daily Goal</label>
            <form onSubmit={handleGoalSubmit} className="flex gap-2">
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                value={editGoal}
                onChange={(e) => setEditGoal(e.target.value)}
                placeholder="Target count..."
                className="flex-1 px-3 py-1.5 rounded-lg text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-white"
              />
              <button
                type="submit"
                className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Set
              </button>
            </form>
          </div>

          <div className="mb-5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Recent Activity</span>
            <div className="space-y-2">
              {history.map((event) => (
                <div key={event.id} className="flex justify-between items-center text-xs py-1.5 border-b border-slate-50 last:border-0">
                  <span className="text-slate-500">
                    {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className={`font-mono font-bold ${
                    event.action === 'increment' ? 'text-emerald-600' : 
                    event.action === 'decrement' ? 'text-rose-600' : 
                    event.action === 'reset' ? 'text-amber-600' : 'text-slate-400'
                  }`}>
                    {event.action === 'increment' ? '+' : ''}{event.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
          </div>
          
          <div className="pt-4 border-t border-slate-100 shrink-0 mt-auto flex gap-2">
            <button
              onClick={() => { onReset(id); setShowSettings(false); }}
              className="flex-1 flex items-center justify-center gap-1 text-xs py-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold transition-colors select-none"
            >
              <RotateCcw size={14} /> Reset
            </button>
            <button
              onClick={() => onDelete(id)}
              className="flex-1 flex items-center justify-center gap-1 text-xs py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-bold transition-colors select-none"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      )}

      {/* Main Counter Display */}
      <div className="flex flex-col items-center justify-center my-4 flex-1">
        <span className={`text-6xl font-bold tracking-tighter ${styles.text} transition-all duration-300`}>
          {count}
        </span>
        {goal !== undefined && (
          <div className="w-full mt-4 flex flex-col items-center gap-2">
            <div className="flex justify-between w-full max-w-[200px] text-[10px] font-bold uppercase tracking-wider">
              <span className={styles.text}>Progress</span>
              <span className={styles.text}>{Math.round(progress)}%</span>
            </div>
            <div className="w-full max-w-[200px] h-1.5 bg-black/10 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ease-out rounded-full ${theme === 'default' ? 'bg-primary-500' : 'bg-white'}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className={`text-xs font-medium opacity-80 ${styles.text}`}>
              {count} / {goal}
            </span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <button
          onClick={() => onDecrement(id)}
          className={`group flex items-center justify-center py-4 rounded-xl font-medium transition-all active:scale-90 select-none touch-manipulation ${styles.button}`}
          aria-label="Decrease"
        >
          <Minus size={24} className="transition-transform group-hover:-translate-x-1" />
        </button>
        <button
          onClick={() => onIncrement(id)}
          className={`group flex items-center justify-center py-4 rounded-xl font-medium transition-all active:scale-90 select-none touch-manipulation ${styles.button}`}
          aria-label="Increase"
        >
          <Plus size={24} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default CounterCard;
