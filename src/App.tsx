import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  FileSpreadsheet, 
  Play, 
  Pause, 
  Sprout, 
  Loader2,
  ShieldCheck
} from 'lucide-react';
import type { GardenService } from './types/service';
import type { DiscordUser } from './types/auth';
import { loadServices, saveServices, exportServicesToCSV } from './utils/storage';
import { parseDiscordCallback, fetchDiscordProfile, clearDiscordHash, getDiscordOAuthUrl } from './utils/discordAuth';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { ServiceTable } from './components/ServiceTable';
import { ServiceModal } from './components/ServiceModal';
import { DropboxModal } from './components/DropboxModal';
import { AddonModal } from './components/AddonModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { DetailModal } from './components/DetailModal';

const DISCORD_USER_KEY = 'everlasting_garden_discord_user_v1';

export const App: React.FC = () => {
  const [user, setUser] = useState<DiscordUser | null>(() => {
    try {
      const raw = localStorage.getItem(DISCORD_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [services, setServices] = useState<GardenService[]>(() => loadServices());
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingService, setEditingService] = useState<GardenService | null>(null);
  const [selectedDropbox, setSelectedDropbox] = useState<GardenService | null>(null);
  const [selectedAddon, setSelectedAddon] = useState<GardenService | null>(null);
  const [selectedDelete, setSelectedDelete] = useState<GardenService | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<GardenService | null>(null);

  // Bot Simulator State (Simulasi Worker)
  const [isSimulating, setIsSimulating] = useState(false);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle Official Discord OAuth2 Callback on Mount
  useEffect(() => {
    const { accessToken, error } = parseDiscordCallback();

    if (error) {
      setAuthError(`Otorisasi Discord ditolak: ${error}`);
      clearDiscordHash();
      return;
    }

    if (accessToken) {
      setIsAuthenticating(true);
      fetchDiscordProfile(accessToken)
        .then((discordUser) => {
          setUser(discordUser);
          clearDiscordHash();
          setAuthError(null);
        })
        .catch((err) => {
          console.error('Discord Auth Error:', err);
          setAuthError('Gagal memverifikasi token resmi Discord. Silakan coba lagi.');
          clearDiscordHash();
        })
        .finally(() => {
          setIsAuthenticating(false);
        });
    }
  }, []);

  // Save services changes
  useEffect(() => {
    saveServices(services);
  }, [services]);

  // Save user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(DISCORD_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(DISCORD_USER_KEY);
    }
  }, [user]);

  // Live Bot Simulation Tick
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setServices((prev) =>
        prev.map((s) => {
          if (s.loginStatus !== 'Berhasil') return s;

          const addedDen = Math.floor(Math.random() * 50000) + 10000;
          const addedLove = s.mixingGrowbooster ? 150 : s.growbooster ? 100 : 50;

          return {
            ...s,
            den: s.den + addedDen,
            lovePoint: Math.min(s.targetLovePoint, s.lovePoint + addedLove),
            lastHarvestAt: new Date().toISOString(),
            lastUpdatedAt: new Date().toISOString(),
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  // 1 Akun Discord = 1 Akun Megaxus: Filter hanya akun milik user Discord yang sedang login!
  const myServices = user ? services.filter((s) => s.discordUserId === user.id) : [];
  const hasAccountRegistered = myServices.length >= 1;

  // Handlers
  const handleSaveService = (data: Partial<GardenService>) => {
    if (!user) return;

    if (editingService) {
      // Edit existing
      setServices((prev) =>
        prev.map((s) => (s.id === editingService.id ? { ...s, ...data, lastUpdatedAt: new Date().toISOString() } : s))
      );
      setEditingService(null);
    } else {
      // ATURAN KERAS: 1 Akun Discord = 1 Akun Megaxus
      if (hasAccountRegistered) {
        alert('Setiap akun Discord hanya dapat mendaftarkan 1 akun AyoDance.');
        return;
      }

      const newService: GardenService = {
        id: `srv-${Date.now()}`,
        discordUserId: user.id, // Terikat 1-to-1 dengan ID Discord pengguna
        megaxusId: data.megaxusId || '',
        nickname: data.nickname || '',
        trustedNickname: data.trustedNickname || '',
        seed: data.seed || 'sunflower',
        secretSeed: data.secretSeed || 'secret_magic',
        queenbee: data.queenbee || 'Semua',
        growbooster: data.growbooster ?? true,
        mixingGrowbooster: data.mixingGrowbooster ?? false,
        gacha: data.gacha ?? false,
        gachaRefill: data.gachaRefill || 0,
        goldenGacha: data.goldenGacha ?? false,
        goldenGachaRefill: data.goldenGachaRefill || 0,
        notes: data.notes || '',
        den: 0,
        cash: 0,
        lovePoint: 0,
        targetLovePoint: 50000,
        coupleTitle: 'Pending Party',
        loginStatus: 'Berhasil',
        lastHarvestAt: new Date().toISOString(),
        lastUpdatedAt: new Date().toISOString(),
        validUntil: 'PERMANENT',
        dropboxUrl: `https://www.dropbox.com/scl/fo/rxr-garden/${data.megaxusId}_reports`,
        addons: [],
        isMine: true,
      };
      setServices((prev) => [newService, ...prev]);
    }
  };

  const handleDeleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const handleDeleteDropbox = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, dropboxUrl: '' } : s))
    );
  };

  const handleUpdateServiceAddon = (updated: GardenService) => {
    setServices((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
    setSelectedAddon(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-black transition-colors">
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeCount={myServices.filter((s) => s.loginStatus === 'Berhasil').length}
        user={user}
        onLogout={() => setUser(null)}
        onOpenDiscordLogin={() => {
          window.location.href = getDiscordOAuthUrl();
        }}
      />

      {/* ALERT ERROR AUTH JIKA ADA */}
      {authError && (
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8 w-full">
          <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-xs text-red-800 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300 flex items-center justify-between">
            <span>{authError}</span>
            <button onClick={() => setAuthError(null)} className="font-bold underline ml-2 cursor-pointer">
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* LOADING SCREEN AUTH */}
      {isAuthenticating ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <Loader2 className="h-10 w-10 text-[#5865F2] animate-spin mb-4" />
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Memverifikasi Akun Discord Resmi...
          </h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Mengambil data profil dari Discord API. Mohon tunggu sebentar.
          </p>
        </div>
      ) : !user ? (
        /* LANDING PAGE EVERLASTING GARDEN */
        <LandingPage
          activeAccountsCount={services.filter((s) => s.loginStatus === 'Berhasil').length}
          onDevLoginSuccess={(devUser) => setUser(devUser)}
        />
      ) : (
        /* DASHBOARD PRIVAT USER */
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-in fade-in duration-300">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Dashboard Layanan Privat
                </span>
                <span className="text-zinc-300 dark:text-zinc-700">&bull;</span>
                <span className="text-xs text-zinc-500 font-mono">
                  Discord: {user.globalName} (@{user.username})
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
                Layanan Joki Garden Saya
              </h1>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                1 Akun Discord = 1 Akun Megaxus. Sistem hanya menampilkan akun joki milikmu sendiri.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Simulasi Bot Worker */}
              <button
                onClick={() => setIsSimulating(!isSimulating)}
                className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold shadow-xs transition-colors cursor-pointer ${
                  isSimulating
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 animate-pulse'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
                }`}
                title="Aktifkan simulasi panen otomatis di background"
              >
                {isSimulating ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                <span>{isSimulating ? 'Worker Aktif (Simulasi Live)' : 'Simulasi Worker Bot'}</span>
              </button>

              {/* Buat Laporan */}
              <button
                disabled={myServices.length === 0}
                onClick={() => exportServicesToCSV(myServices)}
                className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 shadow-xs hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Buat Laporan</span>
              </button>

              {/* Tombol Buat Akun (Maksimal 1 Akun) */}
              {!hasAccountRegistered ? (
                <button
                  onClick={() => {
                    setEditingService(null);
                    setIsCreateOpen(true);
                  }}
                  className="flex items-center gap-2 rounded-xl bg-sunflower px-4 py-2 text-xs font-bold text-zinc-950 shadow-sm hover:bg-sunflower-hover transition-colors cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Daftarkan Akun Garden</span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Kuota Terpenuhi (1/1 Akun)</span>
                </div>
              )}
            </div>
          </div>

          {/* Tabel Privat: Hanya 1 Akun Milik Discord User Ini */}
          <ServiceTable
            services={myServices}
            onOpenDetail={(s) => setSelectedDetail(s)}
            onOpenEdit={(s) => {
              setEditingService(s);
              setIsCreateOpen(true);
            }}
            onOpenDropbox={(s) => setSelectedDropbox(s)}
            onOpenAddon={(s) => setSelectedAddon(s)}
            onOpenDelete={(s) => setSelectedDelete(s)}
            onAddNewAccount={() => {
              setEditingService(null);
              setIsCreateOpen(true);
            }}
          />
        </main>
      )}

      <footer className="mt-auto border-t border-zinc-200 bg-white py-6 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
        <p className="flex items-center justify-center gap-1.5">
          <Sprout className="h-4 w-4 text-emerald-500" />
          <span>EVERLASTING GARDEN &bull; 1 Akun Discord = 1 Akun Megaxus Privat.</span>
        </p>
      </footer>

      {/* MODALS */}
      <ServiceModal
        isOpen={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false);
          setEditingService(null);
        }}
        onSave={handleSaveService}
        editingService={editingService}
      />

      <DropboxModal
        service={selectedDropbox}
        onClose={() => setSelectedDropbox(null)}
        onDeleteFolder={handleDeleteDropbox}
      />

      <AddonModal
        service={selectedAddon}
        onClose={() => setSelectedAddon(null)}
        onUpdateService={handleUpdateServiceAddon}
      />

      <DeleteConfirmModal
        service={selectedDelete}
        onClose={() => setSelectedDelete(null)}
        onConfirm={handleDeleteService}
      />

      <DetailModal
        service={selectedDetail}
        onClose={() => setSelectedDetail(null)}
        onOpenDropbox={(s) => setSelectedDropbox(s)}
        onOpenAddon={(s) => setSelectedAddon(s)}
      />
    </div>
  );
};

export default App;
