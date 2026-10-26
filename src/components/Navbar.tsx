import React from 'react';
import { Sprout, Sun, Moon, Clock, ShieldCheck, LogOut } from 'lucide-react';
import type { DiscordUser } from '../types/auth';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeCount: number;
  user: DiscordUser | null;
  onLogout: () => void;
  onOpenDiscordLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  darkMode, 
  setDarkMode, 
  activeCount,
  user,
  onLogout,
  onOpenDiscordLogin,
}) => {
  const [time, setTime] = React.useState('');

  React.useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB');
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90 transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-tr from-emerald-500 to-[#5865F2] text-white shadow-sm font-bold">
            <Sprout className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                EVERLASTING GARDEN
              </span>
              <span className="hidden sm:inline-flex rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                AyoDance 24/7
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 hidden sm:block">
              Layanan Joki Couple Garden Audition Indonesia
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="hidden md:flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
            <Clock className="h-3.5 w-3.5 text-zinc-400" />
            <span>{time}</span>
          </div>

          {user && (
            <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{activeCount} Akun Aktif</span>
            </div>
          )}

          {/* User Status / Discord Login */}
          {user ? (
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 pl-2 pr-3 py-1 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5865F2] text-white font-bold text-xs">
                {user.globalName ? user.globalName[0].toUpperCase() : 'D'}
              </div>
              <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 max-w-[100px] sm:max-w-[140px] truncate">
                {user.globalName}
              </span>
              <button
                onClick={onLogout}
                className="ml-1 rounded-md p-1 text-zinc-400 hover:text-red-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                title="Keluar"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenDiscordLogin}
              className="flex items-center gap-2 rounded-xl bg-[#5865F2] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#4752c4] transition-colors"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 127.14 96.36">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
              <span>Masuk Discord</span>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors"
            title={darkMode ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
          >
            {darkMode ? <Sun className="h-4 w-4 text-sunflower" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
