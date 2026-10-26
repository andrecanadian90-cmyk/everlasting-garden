import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  Sparkles, 
  Zap, 
  ArrowRight, 
  Layers,
  Settings,
  ExternalLink,
  HelpCircle,
  X
} from 'lucide-react';
import type { DiscordUser } from '../types/auth';
import { getDiscordClientId, setDiscordClientId, getDiscordRedirectUri } from '../config/discord';
import { getDiscordOAuthUrl } from '../utils/discordAuth';
import { DevLoginModal } from './DevLoginModal';

interface LandingPageProps {
  activeAccountsCount: number;
  onDevLoginSuccess: (user: DiscordUser) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ activeAccountsCount, onDevLoginSuccess }) => {
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showDevModal, setShowDevModal] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [clientIdInput, setClientIdInput] = useState(() => getDiscordClientId());
  const redirectUri = getDiscordRedirectUri();

  // Stealth shortcut: Ctrl + Shift + D atau Alt + D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'D' || e.key === 'd')) ||
        (e.altKey && (e.key === 'D' || e.key === 'd'))
      ) {
        e.preventDefault();
        setShowDevModal(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Stealth click: Klik 5x pada titik tersembunyi di footer
  const handleSecretClick = () => {
    const next = clickCount + 1;
    if (next >= 5) {
      setShowDevModal(true);
      setClickCount(0);
    } else {
      setClickCount(next);
      setTimeout(() => setClickCount(0), 2500);
    }
  };

  const handleStartDiscordOAuth = () => {
    const currentId = getDiscordClientId();
    if (!currentId || currentId === '123456789012345678') {
      setShowConfigModal(true);
      return;
    }

    const authUrl = getDiscordOAuthUrl(currentId);
    window.location.href = authUrl;
  };

  const handleSaveAndAuthorize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientIdInput.trim()) return;

    setDiscordClientId(clientIdInput.trim());
    setShowConfigModal(false);

    const authUrl = getDiscordOAuthUrl(clientIdInput.trim());
    window.location.href = authUrl;
  };

  return (
    <div className="relative overflow-hidden bg-white text-zinc-900 dark:bg-black dark:text-zinc-50 transition-colors">
      {/* Background Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-linear-to-tr from-emerald-500/15 via-[#5865F2]/15 to-sunflower/10 blur-3xl dark:from-emerald-500/10 dark:via-[#5865F2]/20 dark:to-transparent" />

      {/* HERO SECTION */}
      <section className="relative mx-auto max-w-5xl px-4 pt-20 pb-16 text-center sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-8 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Sistem Otomasi 24/7 Aktif &bull; {activeAccountsCount} Akun Sedang Dikerjakan</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          <span className="block text-zinc-900 dark:text-white">EVERLASTING</span>
          <span className="bg-linear-to-r from-emerald-500 via-teal-400 to-[#5865F2] bg-clip-text text-transparent">
            GARDEN
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-600 sm:text-lg dark:text-zinc-300 leading-relaxed font-light">
          Layanan joki Couple Garden otomatis untuk <b className="text-zinc-900 dark:text-white font-semibold">Audition AyoDance Indonesia</b>. 
          Tanam bibit, semprot potion growbooster, gacha, dan panen otomatis 24 jam nonstop tanpa perlu buka game.
        </p>

        {/* CTA Login Official Discord */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3">
          <button
            onClick={handleStartDiscordOAuth}
            className="group relative flex items-center justify-center gap-3 rounded-2xl bg-[#5865F2] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#5865F2]/30 hover:bg-[#4752c4] hover:shadow-[#5865F2]/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 127.14 96.36">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
            </svg>
            <span>Masuk dengan Discord Resmi</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => setShowConfigModal(true)}
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors cursor-pointer"
          >
            <Settings className="h-3.5 w-3.5" />
            <span>Konfigurasi Discord Client ID (OAuth2)</span>
          </button>
        </div>

        <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
          Autentikasi resmi menggunakan protocol Discord OAuth2
        </p>
      </section>

      {/* FEATURE CARDS */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 border-t border-zinc-100 dark:border-zinc-900">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">
            FITUR UTAMA
          </h2>
          <h3 className="text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-white">
            Semua Kebutuhan Garden Terintegrasi Otomatis
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-zinc-200 bg-white/50 p-6 shadow-xs backdrop-blur-xs dark:border-zinc-800 dark:bg-zinc-950/50 hover:border-emerald-500/50 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4">
              <Sprout className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Auto Seed & Secret Seed</h4>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Pilih bibit utama (Sunflower, Rose, Tulip, dll) dan Secret Seed (Magic, Golden Apple, Rainbow Rose). Bot menanam ulang otomatis saat lahan kosong.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white/50 p-6 shadow-xs backdrop-blur-xs dark:border-zinc-800 dark:bg-zinc-950/50 hover:border-sunflower/50 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sunflower/10 text-amber-600 dark:text-sunflower mb-4">
              <Zap className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Queenbee & Smart Harvest</h4>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Otomasi panen cerdas dengan filter Queenbee: ambil Den, Love Point, atau Item secara selektif begitu bunga mekar.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white/50 p-6 shadow-xs backdrop-blur-xs dark:border-zinc-800 dark:bg-zinc-950/50 hover:border-purple-500/50 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-4">
              <Sparkles className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Auto Mix Growbooster</h4>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Dukungan potion Growbooster dan add-on eksklusif <b>Auto Mix Herb</b> untuk mempercepat durasi panen secara konsisten.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white/50 p-6 shadow-xs backdrop-blur-xs dark:border-zinc-800 dark:bg-zinc-950/50 hover:border-blue-500/50 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4">
              <Layers className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Cloud Report & Dropbox</h4>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Laporan pertumbuhan Den & Love Point tercatat real-time, sinkron dengan folder cloud Dropbox per ID dan dapat diunduh sebagai berkas spreadsheet.
            </p>
          </div>
        </div>
      </section>

      {/* DISCORD OAUTH CONFIGURATION MODAL */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-7 shadow-2xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setShowConfigModal(false)}
              className="absolute right-4 top-4 rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5865F2] text-white shadow-md shadow-[#5865F2]/30">
                <svg className="h-6 w-6 fill-current" viewBox="0 0 127.14 96.36">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Konfigurasi Discord OAuth2 Resmi
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Hubungkan dengan Discord Application milikmu
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveAndAuthorize} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Discord Application Client ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={clientIdInput}
                  onChange={(e) => setClientIdInput(e.target.value)}
                  placeholder="Contoh: 123456789012345678"
                  className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 focus:border-[#5865F2] focus:ring-2 focus:ring-[#5865F2]/20 outline-hidden font-mono"
                  autoFocus
                />
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3.5 dark:border-blue-900/40 dark:bg-blue-950/20 text-xs">
                <div className="flex items-start gap-2 text-blue-900 dark:text-blue-300 font-semibold mb-1">
                  <HelpCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>Langkah di Discord Developer Portal:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed pl-1">
                  <li>Buka <a href="https://discord.com/developers/applications" target="_blank" rel="noreferrer" className="text-[#5865F2] underline inline-flex items-center gap-0.5 font-medium">Discord Developer Portal <ExternalLink className="h-2.5 w-2.5" /></a> dan buat/pilih Application.</li>
                  <li>Masuk ke menu <b>OAuth2 &rarr; General</b>.</li>
                  <li>Tambahkan Redirect URI berikut:</li>
                </ol>
                <div className="mt-2 rounded-lg bg-zinc-900 p-2 text-[11px] font-mono text-emerald-400 select-all break-all border border-zinc-800">
                  {redirectUri}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConfigModal(false)}
                  className="rounded-xl border border-zinc-200 px-4 py-2.5 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-[#5865F2] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#4752c4] transition-colors"
                >
                  <span>Simpan & Otorisasi Discord</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DEV LOGIN MODAL (TERSEMBUNYI DARI PUBLIK) */}
      <DevLoginModal
        isOpen={showDevModal}
        onClose={() => setShowDevModal(false)}
        onSuccess={onDevLoginSuccess}
      />

      {/* Hidden stealth click target on the dot */}
      <div className="text-center py-2">
        <span 
          onClick={handleSecretClick}
          className="cursor-default select-none text-[10px] text-zinc-300/40 dark:text-zinc-800/40 hover:text-zinc-400/60 transition-colors"
          title=""
        >
          &bull;
        </span>
      </div>
    </div>
  );
};
