import React from 'react';
import { Sparkles, Trash2, CheckCircle2, X, Check } from 'lucide-react';
import type { GardenService } from '../types/service';

interface AddonModalProps {
  service: GardenService | null;
  onClose: () => void;
  onUpdateService: (updated: GardenService) => void;
}

export const AddonModal: React.FC<AddonModalProps> = ({ service, onClose, onUpdateService }) => {
  if (!service) return null;

  const hasHerb = service.addons.some(a => a.code === 'AUTO_MIX_HERB' && a.isActive);

  const handleToggleAddon = () => {
    if (hasHerb) {
      const nextAddons = service.addons.filter(a => a.code !== 'AUTO_MIX_HERB');
      onUpdateService({
        ...service,
        addons: nextAddons,
        mixingGrowbooster: false,
      });
    } else {
      const newAddon = {
        id: `addon-${Date.now()}`,
        name: 'Auto Mix Herb',
        code: 'AUTO_MIX_HERB',
        expiresAt: 'PERMANENT',
        isActive: true,
      };
      onUpdateService({
        ...service,
        addons: [...service.addons, newAddon],
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Kelola Add-on</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Username: <b className="text-zinc-800 dark:text-zinc-200">{service.megaxusId}</b>
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Auto Mix Herb</h4>
                  {hasHerb ? (
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Aktif (Gratis / Permanen)
                    </span>
                  ) : (
                    <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      Belum Dipasang
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Fitur add-on wajib untuk membuka otomatisasi <b>Auto Mix Growbooster</b> saat berkebun.
                </p>
                <p className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5" />
                  Masa Aktif: Unlimited (Tanpa Batas Waktu)
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end border-t border-zinc-200 pt-3 dark:border-zinc-800">
              {hasHerb ? (
                <button
                  onClick={handleToggleAddon}
                  className="flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Nonaktifkan Add-on
                </button>
              ) : (
                <button
                  onClick={handleToggleAddon}
                  className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-700 shadow-xs transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Aktifkan Add-on (Gratis)
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-200 px-4 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
