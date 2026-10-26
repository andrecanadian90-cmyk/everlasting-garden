import React, { useState, useEffect } from 'react';
import { X, Sparkles, Sprout, Shield } from 'lucide-react';
import type { GardenService, QueenbeeMode } from '../types/service';
import { SEED_OPTIONS, SECRET_SEED_OPTIONS } from '../constants/gardenData';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (serviceData: Partial<GardenService>) => void;
  editingService: GardenService | null;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingService,
}) => {
  const [megaxusId, setMegaxusId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [trustedNickname, setTrustedNickname] = useState('');
  const [seed, setSeed] = useState(SEED_OPTIONS[0].id);
  const [secretSeed, setSecretSeed] = useState(SECRET_SEED_OPTIONS[0].id);
  const [queenbee, setQueenbee] = useState<QueenbeeMode>('Semua');
  const [growbooster, setGrowbooster] = useState(true);
  const [mixingGrowbooster, setMixingGrowbooster] = useState(false);
  const [gacha, setGacha] = useState(false);
  const [gachaRefill, setGachaRefill] = useState(0);
  const [goldenGacha, setGoldenGacha] = useState(false);
  const [goldenGachaRefill, setGoldenGachaRefill] = useState(0);
  const [notes, setNotes] = useState('');

  // Check if editing service has Auto Mix Herb addon active
  const hasHerbAddon = editingService 
    ? editingService.addons.some(a => a.code === 'AUTO_MIX_HERB' && a.isActive)
    : false;

  useEffect(() => {
    if (editingService) {
      setMegaxusId(editingService.megaxusId);
      setNickname(editingService.nickname);
      setPassword('');
      setTrustedNickname(editingService.trustedNickname || '');
      setSeed(editingService.seed);
      setSecretSeed(editingService.secretSeed);
      setQueenbee(editingService.queenbee);
      setGrowbooster(editingService.growbooster);
      setMixingGrowbooster(editingService.mixingGrowbooster);
      setGacha(editingService.gacha);
      setGachaRefill(editingService.gachaRefill);
      setGoldenGacha(editingService.goldenGacha);
      setGoldenGachaRefill(editingService.goldenGachaRefill);
      setNotes(editingService.notes || '');
    } else {
      setMegaxusId('');
      setNickname('');
      setPassword('');
      setTrustedNickname('');
      setSeed(SEED_OPTIONS[0].id);
      setSecretSeed(SECRET_SEED_OPTIONS[0].id);
      setQueenbee('Semua');
      setGrowbooster(true);
      setMixingGrowbooster(false);
      setGacha(false);
      setGachaRefill(0);
      setGoldenGacha(false);
      setGoldenGachaRefill(0);
      setNotes('');
    }
  }, [editingService, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!megaxusId || !nickname) return;

    onSave({
      megaxusId,
      nickname,
      password: password || editingService?.password,
      trustedNickname,
      seed,
      secretSeed,
      queenbee,
      growbooster,
      mixingGrowbooster: hasHerbAddon ? mixingGrowbooster : false,
      gacha,
      gachaRefill: Number(gachaRefill),
      goldenGacha,
      goldenGachaRefill: Number(goldenGachaRefill),
      notes,
      validUntil: 'PERMANENT', // Layanan Free to Use tanpa batas masa aktif
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl my-8 rounded-2xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sunflower/20 text-sunflower-hover dark:text-sunflower">
            <Sprout className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {editingService ? 'Ubah Konfigurasi Layanan' : 'Daftarkan Akun Garden'}
              </h3>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                FREE TO USE (UNLIMITED)
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {editingService 
                ? `Mengubah konfigurasi akun ${editingService.megaxusId}` 
                : 'Layanan joki aktif permanen 24/7 tanpa masa aktif / kedaluwarsa'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SECTION 1: INFORMASI AKUN */}
          <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3 flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" />
              Informasi Akun AyoDance
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Megaxus ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={megaxusId}
                  onChange={(e) => setMegaxusId(e.target.value)}
                  placeholder="Username / Megaxus ID"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 focus:border-sunflower focus:ring-1 focus:ring-sunflower outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Nickname Game <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="IGN Karakter AyoDance"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 focus:border-sunflower focus:ring-1 focus:ring-sunflower outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  {editingService ? 'Password (kosongkan kalau tidak diubah)' : 'Password Game *'}
                </label>
                <input
                  type="password"
                  required={!editingService}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={editingService ? '••••••••' : 'Password Megaxus'}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 focus:border-sunflower focus:ring-1 focus:ring-sunflower outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Trusted Nickname (opsional)
                </label>
                <input
                  type="text"
                  value={trustedNickname}
                  onChange={(e) => setTrustedNickname(e.target.value)}
                  placeholder="Nickname terpercaya / partner"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 focus:border-sunflower focus:ring-1 focus:ring-sunflower outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: KONFIGURASI GARDEN */}
          <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3 flex items-center gap-1.5">
              <Sprout className="h-3.5 w-3.5" />
              Konfigurasi Bibit & Panen
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Seed (Bibit Utama)
                </label>
                <select
                  value={seed}
                  onChange={(e) => setSeed(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-2.5 py-2 text-xs text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 focus:border-sunflower outline-hidden"
                >
                  {SEED_OPTIONS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.duration})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Secret Seed (Bibit Rahasia)
                </label>
                <select
                  value={secretSeed}
                  onChange={(e) => setSecretSeed(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-2.5 py-2 text-xs text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 focus:border-sunflower outline-hidden"
                >
                  {SECRET_SEED_OPTIONS.map((ss) => (
                    <option key={ss.id} value={ss.id}>
                      {ss.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Ambil Item otomatis (Queenbee)
                </label>
                <select
                  value={queenbee}
                  onChange={(e) => setQueenbee(e.target.value as QueenbeeMode)}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-2.5 py-2 text-xs text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 focus:border-sunflower outline-hidden"
                >
                  <option value="Semua">Semua (Den, Love, Item)</option>
                  <option value="Den">Den saja</option>
                  <option value="Love">Love Point saja</option>
                  <option value="Item">Item saja</option>
                </select>
              </div>
            </div>

            {/* Booster Controls */}
            <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={growbooster}
                  onChange={(e) => setGrowbooster(e.target.checked)}
                  className="h-4 w-4 rounded-sm border-zinc-300 text-sunflower focus:ring-sunflower"
                />
                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                  Auto Growbooster (Gunakan potion otomatis)
                </span>
              </label>

              <div>
                <label className={`flex items-center gap-2.5 ${hasHerbAddon ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}>
                  <input
                    type="checkbox"
                    disabled={!hasHerbAddon}
                    checked={hasHerbAddon && mixingGrowbooster}
                    onChange={(e) => setMixingGrowbooster(e.target.checked)}
                    className="h-4 w-4 rounded-sm border-zinc-300 text-purple-600 focus:ring-purple-600"
                  />
                  <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                    Auto Mix Growbooster
                  </span>
                </label>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 ml-6.5 mt-0.5">
                  {hasHerbAddon 
                    ? 'Fitur aktif (Add-on Auto Mix Herb terpasang)' 
                    : 'Auto Mix Growbooster (butuh add-on Auto Mix Herb)'}
                </p>
              </div>
            </div>

            {/* Gacha Controls */}
            <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gacha}
                    onChange={(e) => setGacha(e.target.checked)}
                    className="h-4 w-4 rounded-sm border-zinc-300 text-sunflower focus:ring-sunflower"
                  />
                  <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                    Otomasi Gacha Biasa
                  </span>
                </label>
                {gacha && (
                  <div className="flex items-center gap-2 ml-6.5">
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">Refill gacha:</span>
                    <input
                      type="number"
                      min={0}
                      max={99}
                      value={gachaRefill}
                      onChange={(e) => setGachaRefill(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-20 rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 outline-hidden"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={goldenGacha}
                    onChange={(e) => setGoldenGacha(e.target.checked)}
                    className="h-4 w-4 rounded-sm border-zinc-300 text-sunflower focus:ring-sunflower"
                  />
                  <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                    Otomasi Golden Gacha
                  </span>
                </label>
                {goldenGacha && (
                  <div className="flex items-center gap-2 ml-6.5">
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">Refill golden gacha:</span>
                    <input
                      type="number"
                      min={0}
                      max={99}
                      value={goldenGachaRefill}
                      onChange={(e) => setGoldenGachaRefill(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-20 rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 outline-hidden"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800">
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Catatan
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Catatan khusus untuk layanan ini..."
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 focus:border-sunflower outline-hidden"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-sunflower px-5 py-2.5 text-xs font-bold text-zinc-950 hover:bg-sunflower-hover shadow-sm transition-colors cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>{editingService ? 'Simpan Konfigurasi' : 'Konfirmasi & Mulai Joki'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
