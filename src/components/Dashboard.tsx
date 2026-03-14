import React, { useState, useEffect } from 'react';
import { PlusCircle, BarChart3, Users } from 'lucide-react';
import CounterCard, { CounterData, Theme, HistoryEvent } from './CounterCard';

const Dashboard: React.FC = () => {
    const [counters, setCounters] = useState<CounterData[]>(() => {
        const saved = localStorage.getItem('tallypro_counters');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Simple migration: ensure history and other new fields exist
                return parsed.map((c: any) => ({
                    ...c,
                    history: c.history || [{ 
                        id: Date.now().toString(), 
                        timestamp: Date.now(), 
                        action: 'initial', 
                        change: c.count 
                    }]
                }));
            } catch (e) {
                console.error("Failed to parse counters", e);
            }
        }
        return [
            { 
                id: '1', 
                name: 'Water Glasses', 
                count: 0, 
                theme: 'ocean', 
                history: [{ id: 'h1', timestamp: Date.now(), action: 'initial', change: 0 }] 
            },
            { 
                id: '2', 
                name: 'Pushups', 
                count: 0, 
                theme: 'sunset', 
                history: [{ id: 'h2', timestamp: Date.now(), action: 'initial', change: 0 }] 
            }
        ];
    });

    // Basic stats for the dashboard header
    const totalCount = counters.reduce((acc, curr) => acc + curr.count, 0);

    useEffect(() => {
        localStorage.setItem('tallypro_counters', JSON.stringify(counters));
    }, [counters]);

    const addCounter = () => {
        const newCounter: CounterData = {
            id: Date.now().toString(),
            name: `New Counter ${counters.length + 1}`,
            count: 0,
            theme: 'default',
            history: [{ 
                id: `h-${Date.now()}`, 
                timestamp: Date.now(), 
                action: 'initial', 
                change: 0 
            }]
        };
        setCounters([...counters, newCounter]);
    };

    const deleteCounter = (id: string) => {
        setCounters(counters.filter(c => c.id !== id));
    };

    const createEvent = (action: 'increment' | 'decrement' | 'reset', change: number): HistoryEvent => ({
        id: Math.random().toString(36).substring(2, 9),
        timestamp: Date.now(),
        action,
        change
    });

    const increment = (id: string) => {
        setCounters(counters.map(c => 
            c.id === id ? { 
                ...c, 
                count: c.count + 1,
                history: [createEvent('increment', 1), ...c.history].slice(0, 10)
            } : c
        ));
    };

    const decrement = (id: string) => {
        setCounters(counters.map(c => 
            c.id === id ? { 
                ...c, 
                count: c.count - 1,
                history: [createEvent('decrement', -1), ...c.history].slice(0, 10)
            } : c
        ));
    };

    const reset = (id: string) => {
        setCounters(counters.map(c => 
            c.id === id ? { 
                ...c, 
                count: 0,
                history: [createEvent('reset', -c.count), ...c.history].slice(0, 10)
            } : c
        ));
    };

    const updateName = (id: string, name: string) => {
        setCounters(counters.map(c => c.id === id ? { ...c, name } : c));
    };

    const updateTheme = (id: string, theme: Theme) => {
        setCounters(counters.map(c => c.id === id ? { ...c, theme } : c));
    };

    const updateGoal = (id: string, goal: number | undefined) => {
        setCounters(counters.map(c => c.id === id ? { ...c, goal } : c));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 mb-20 sm:mb-0">
            {/* Dashboard Top Metrics */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Your Counters</h1>
                    <p className="text-slate-500 mt-1">Manage and track your goals effectively.</p>
                </div>

                <div className="flex gap-4">
                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3 flex-1 sm:flex-initial">
                        <div className="bg-primary-100 p-2 rounded-lg text-primary-600">
                            <BarChart3 size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total</p>
                            <p className="text-xl font-black text-slate-900 leading-none">{totalCount}</p>
                        </div>
                    </div>

                    <button
                        onClick={addCounter}
                        className="hidden sm:flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95 text-sm font-bold"
                    >
                        <PlusCircle size={18} />
                        <span>Add Counter</span>
                    </button>
                </div>
            </div>

            {/* Floating Action Button (Mobile) */}
            <button
                onClick={addCounter}
                className="sm:hidden fixed bottom-6 right-6 z-50 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl shadow-slate-900/40 active:scale-90 transition-transform flex items-center justify-center border-2 border-slate-800"
                aria-label="Add Counter"
            >
                <PlusCircle size={28} />
            </button>

            {/* Counters Grid */}
            {counters.length === 0 ? (
                <div className="text-center py-20 bg-white/50 backdrop-blur rounded-3xl border border-slate-200 border-dashed">
                    <Users size={48} className="mx-auto text-slate-400 mb-4" />
                    <h3 className="text-lg font-bold text-slate-900">No counters active</h3>
                    <p className="text-slate-500 mt-1 mb-6 max-w-sm mx-auto">Create your first counter to start tracking habits, inventory, or event attendees.</p>
                    <button
                        onClick={addCounter}
                        className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl shadow-md shadow-primary-500/20 transition-all font-medium"
                    >
                        <PlusCircle size={20} />
                        Create First Counter
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center sm:place-items-stretch">
                    {counters.map(counter => (
                        <CounterCard
                            key={counter.id}
                            {...counter}
                            onIncrement={increment}
                            onDecrement={decrement}
                            onReset={reset}
                            onDelete={deleteCounter}
                            onUpdateName={updateName}
                            onUpdateTheme={updateTheme}
                            onUpdateGoal={updateGoal}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
