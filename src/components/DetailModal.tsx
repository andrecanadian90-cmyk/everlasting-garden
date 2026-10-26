import React from 'react';
import { X, Sprout, Heart, Coins, AlertCircle } from 'lucide-react';
import type { GardenService } from '../types/service';
import { formatDate, formatNumber } from '../utils/storage';
import { SEED_OPTIONS, SECRET_SEED_OPTIONS } from '../constants/gardenData';

interface DetailModalProps {
  service: GardenService | null;
  onClose: () => void;
  onOpenDropbox: (service: GardenService) => void;
  onOpenAddon: (service: GardenService) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  service,
  onClose,
  onOpenDropbox,
  onOpenAddon,
}) => {
  if (!service) return null;

  const seedObj = SEED_OPTIONS.find(s => s.id === service.seed);
  const secretSeedObj = SECRET_SEED_OPTIONS.find(s => s.id === service.secretSeed);

  const lovePartyRemaining = Math.max(0, service.targetLovePoint - service.lovePoint);
  const isLoveMaxed = service.lovePoint >= service.targetLovePoint;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-5 border-b border-zinc-100 pb-4 dark:border-zinc-800">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
            <Sprout className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {service.nickname}
              </h3>
              <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-mono font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                {service.megaxusId}
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Status Bot: <b className="text-zinc-800 dark:text-zinc-200">{service.loginStatus}</b>
            </p>
          </div>
        </div>

        {/* Telemetry Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
          <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40">
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
              <Coins className="h-3.5 w-3.5 text-amber-500" />
              Den Game
            </span>
            <p className="mt-1 text-base font-bold text-zinc-900 dark:text-zinc-100 font-mono">
              {formatNumber(service.den)}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40">
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
              <Heart className="h-3.5 w-3.5 text-rose-500" />
              Love Point
            </span>
            <p className="mt-1 text-base font-bold text-zinc-900 dark:text-zinc-100 font-mono">
              {formatNumber(service.lovePoint)}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40">
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
              <Coins className="h-3.5 w-3.5 text-blue-500" />
              Cash AyoDance
            </span>
            <p className="mt-1 text-base font-bold text-zinc-900 dark:text-zinc-100 font-mono">
              {formatNumber(service.cash)}
            </p>
          </div>
        </div>

        {/* Love Party Banner */}
        {isLoveMaxed ? (
          <div className="mb-5 rounded-xl border border-rose-300 bg-rose-50 p-3 text-xs font-semibold text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300 flex items-center gap-2">
            <Heart className="h-4 w-4 text-rose-600 animate-bounce" />
            Love Point sudah maksimal. Segera lakukan love party!
          </div>
        ) : lovePartyRemaining <= 1000 ? (
          <div className="mb-5 rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs font-semibold text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            {lovePartyRemaining} menuju love party, segera lakukan love party
          </div>
        ) : null}

        {/* Configuration Details */}
        <div className="space-y-3 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800 text-xs">
          <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
            <span className="text-zinc-500">Seed Ditanam:</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">{seedObj?.name || service.seed}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
            <span className="text-zinc-500">Secret Seed:</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">{secretSeedObj?.name || service.secretSeed}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
            <span className="text-zinc-500">Ambil Item otomatis (Queenbee):</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">{service.queenbee}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
            <span className="text-zinc-500">Auto Growbooster:</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">{service.growbooster ? 'Aktif' : 'Nonaktif'}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
            <span className="text-zinc-500">Auto Mix Growbooster:</span>
            <span className="font-semibold text-purple-700 dark:text-purple-400">
              {service.mixingGrowbooster ? 'Aktif (Herb On)' : 'Nonaktif'}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
            <span className="text-zinc-500">Gacha Biasa:</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {service.gacha ? `Aktif (${service.gachaRefill} Refill)` : 'Nonaktif'}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
            <span className="text-zinc-500">Golden Gacha:</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {service.goldenGacha ? `Aktif (${service.goldenGachaRefill} Refill)` : 'Nonaktif'}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
            <span className="text-zinc-500">Panen Terakhir:</span>
            <span className="font-mono text-zinc-700 dark:text-zinc-300">{formatDate(service.lastHarvestAt)}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
            <span className="text-zinc-500">Masa Aktif Layanan:</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Permanen (Free to Use / Tanpa Limit)</span>
          </div>
          {service.notes && (
            <div className="pt-1">
              <span className="text-zinc-500">Catatan:</span>
              <p className="mt-1 text-zinc-800 dark:text-zinc-200 italic">{service.notes}</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenDropbox(service);
              }}
              className="rounded-xl border border-zinc-200 px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 dark:border-zinc-800 dark:text-blue-400 dark:hover:bg-blue-950/20"
            >
              Lihat Dropbox
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenAddon(service);
              }}
              className="rounded-xl border border-zinc-200 px-3 py-2 text-xs font-semibold text-purple-600 hover:bg-purple-50 dark:border-zinc-800 dark:text-purple-400 dark:hover:bg-purple-950/20"
            >
              Kelola Add-on
            </button>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-200 px-4 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
