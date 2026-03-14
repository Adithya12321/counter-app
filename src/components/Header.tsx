
import { Layers, Crown } from 'lucide-react';

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur flex-none transition-colors duration-500 border-b border-slate-200/50 bg-white/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary-600 text-white p-2 rounded-xl">
                            <Layers size={20} />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-900">
                            Tally<span className="text-primary-600">Pro</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
                            Pricing
                        </button>
                        <button className="flex items-center gap-1.5 text-sm font-semibold bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 sm:px-4 py-2 rounded-full shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-0.5">
                            <Crown size={16} />
                            <span className="hidden sm:inline">Upgrade to Pro</span>
                            <span className="sm:hidden">Pro</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
