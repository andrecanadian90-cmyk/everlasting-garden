import React from 'react';
import { 
  ExternalLink, 
  Sparkles, 
  Trash2, 
  Edit3, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Heart, 
  Coins, 
  Sprout, 
  Copy,
  Check,
  Plus
} from 'lucide-react';
import type { GardenService, LoginStatus } from '../types/service';
import { formatNumber } from '../utils/storage';
import { SEED_OPTIONS, SECRET_SEED_OPTIONS } from '../constants/gardenData';

interface ServiceTableProps {
  services: GardenService[];
  onOpenDetail: (service: GardenService) => void;
  onOpenEdit: (service: GardenService) => void;
  onOpenDropbox: (service: GardenService) => void;
  onOpenAddon: (service: GardenService) => void;
  onOpenDelete: (service: GardenService) => void;
  onAddNewAccount?: () => void;
}

export const ServiceTable: React.FC<ServiceTableProps> = ({
  services,
  onOpenDetail,
  onOpenEdit,
  onOpenDropbox,
  onOpenAddon,
  onOpenDelete,
  onAddNewAccount,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (status: LoginStatus) => {
    switch (status) {
      case 'Berhasil':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-3 w-3" />
            Berhasil
          </span>
        );
      case 'Diblokir':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-red-600 dark:text-red-400 border border-red-500/20">
            <XCircle className="h-3 w-3" />
            Diblokir
          </span>
        );
      case 'Password salah':
      case 'ID salah':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <AlertTriangle className="h-3 w-3" />
            {status}
          </span>
        );
      case 'Server bermasalah':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <XCircle className="h-3 w-3" />
            Server Error
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-zinc-500/10 px-2.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-500/20">
            {status}
          </span>
        );
    }
  };

  if (services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4">
          <Sprout className="h-7 w-7" />
        </div>
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
          Belum Ada Akun Terdaftar
        </h3>
        <p className="mt-1 max-w-sm text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Akun Discord kamu belum memiliki layanan joki aktif. 
          Setiap akun Discord hanya dapat mendaftarkan <b>1 akun AyoDance</b>.
        </p>

        {onAddNewAccount && (
          <button
            onClick={onAddNewAccount}
            className="mt-5 flex items-center gap-2 rounded-xl bg-sunflower px-5 py-2.5 text-xs font-bold text-zinc-950 shadow-sm hover:bg-sunflower-hover transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Daftarkan Akun Garden Saya</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-950 transition-colors">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-zinc-200 bg-zinc-50/75 dark:border-zinc-800 dark:bg-zinc-900/60 font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3.5 px-4">Megaxus ID</th>
              <th className="py-3.5 px-3">Nickname</th>
              <th className="py-3.5 px-3">Den</th>
              <th className="py-3.5 px-3">Ambil Item Otomatis</th>
              <th className="py-3.5 px-3">Gacha</th>
              <th className="py-3.5 px-3">Golden Gacha</th>
              <th className="py-3.5 px-3">Seed</th>
              <th className="py-3.5 px-3">Secret Seed</th>
              <th className="py-3.5 px-3">Growbooster</th>
              <th className="py-3.5 px-3">Add-on</th>
              <th className="py-3.5 px-3">Love Point</th>
              <th className="py-3.5 px-3">Couple Title</th>
              <th className="py-3.5 px-3">Status Login</th>
              <th className="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
            {services.map((s) => {
              const seedObj = SEED_OPTIONS.find((so) => so.id === s.seed);
              const secretSeedObj = SECRET_SEED_OPTIONS.find((ss) => ss.id === s.secretSeed);
              const isLoveMaxed = s.lovePoint >= s.targetLovePoint;
              const remaining = Math.max(0, s.targetLovePoint - s.lovePoint);
              const hasHerb = s.addons.some((a) => a.code === 'AUTO_MIX_HERB' && a.isActive);

              return (
                <tr
                  key={s.id}
                  className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40 transition-colors group"
                >
                  {/* Megaxus ID */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">
                        {s.megaxusId}
                      </span>
                      <button
                        onClick={() => handleCopy(s.id, s.megaxusId)}
                        className="rounded-sm p-0.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                        title="Salin ID"
                      >
                        {copiedId === s.id ? (
                          <Check className="h-3 w-3 text-emerald-500" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                    {s.trustedNickname && (
                      <span className="block text-[10px] text-zinc-400">
                        Trusted: {s.trustedNickname}
                      </span>
                    )}
                  </td>

                  {/* Nickname */}
                  <td className="py-3.5 px-3 whitespace-nowrap font-medium text-zinc-800 dark:text-zinc-200">
                    {s.nickname}
                  </td>

                  {/* Den */}
                  <td className="py-3.5 px-3 whitespace-nowrap font-mono text-zinc-800 dark:text-zinc-200">
                    <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                      <Coins className="h-3 w-3 shrink-0" />
                      <span>{formatNumber(s.den)}</span>
                    </div>
                  </td>

                  {/* Queenbee */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      {s.queenbee}
                    </span>
                  </td>

                  {/* Gacha */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    {s.gacha ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        On ({s.gachaRefill})
                      </span>
                    ) : (
                      <span className="text-zinc-400">Off</span>
                    )}
                  </td>

                  {/* Golden Gacha */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    {s.goldenGacha ? (
                      <span className="text-amber-600 dark:text-amber-400 font-medium">
                        On ({s.goldenGachaRefill})
                      </span>
                    ) : (
                      <span className="text-zinc-400">Off</span>
                    )}
                  </td>

                  {/* Seed */}
                  <td className="py-3.5 px-3 whitespace-nowrap text-zinc-700 dark:text-zinc-300">
                    {seedObj ? seedObj.name.split(' (')[0] : s.seed}
                  </td>

                  {/* Secret Seed */}
                  <td className="py-3.5 px-3 whitespace-nowrap text-purple-700 dark:text-purple-400 font-medium">
                    {secretSeedObj ? secretSeedObj.name.split(' (')[0] : s.secretSeed}
                  </td>

                  {/* Growbooster */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <div className="space-y-0.5">
                      <span
                        className={`inline-block px-1.5 py-0.2 rounded-xs font-semibold text-[10px] ${
                          s.growbooster
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-zinc-200 text-zinc-500 dark:bg-zinc-800'
                        }`}
                      >
                        Potion {s.growbooster ? 'ON' : 'OFF'}
                      </span>
                      {s.mixingGrowbooster && (
                        <span className="block text-[10px] text-purple-600 dark:text-purple-400 font-medium">
                          Auto Mix: ON
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Addon */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    {hasHerb ? (
                      <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] font-semibold text-purple-600 dark:text-purple-400 border border-purple-500/20">
                        Auto Mix Herb
                      </span>
                    ) : (
                      <span className="text-[11px] text-zinc-400">-</span>
                    )}
                  </td>

                  {/* Love Point */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 font-mono font-semibold text-rose-600 dark:text-rose-400">
                        <Heart className="h-3 w-3 shrink-0" />
                        <span>{formatNumber(s.lovePoint)}</span>
                      </div>
                      {isLoveMaxed ? (
                        <span className="block text-[10px] font-bold text-rose-600 animate-pulse">
                          Love Point Maksimal!
                        </span>
                      ) : remaining <= 1000 ? (
                        <span className="block text-[10px] font-semibold text-amber-600">
                          {remaining} ke party
                        </span>
                      ) : null}
                    </div>
                  </td>

                  {/* Couple Title */}
                  <td className="py-3.5 px-3 whitespace-nowrap text-zinc-600 dark:text-zinc-400 text-[11px] max-w-[120px] truncate">
                    {s.coupleTitle || '-'}
                  </td>

                  {/* Status Login */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    {getStatusBadge(s.loginStatus)}
                  </td>

                  {/* Action Menu */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onOpenDetail(s)}
                        className="rounded-lg p-1.5 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                        title="Lihat detail"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>

                      <button
                        onClick={() => onOpenDropbox(s)}
                        className="rounded-lg p-1.5 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/30 transition-colors cursor-pointer"
                        title="Lihat Dropbox"
                      >
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7.054 2 1.5 5.567l4.032 3.238L11.087 5.24 7.054 2zm9.892 0-4.033 3.24 5.555 3.565 4.032-3.238L16.946 2zM1.5 12.043l5.554 3.567 4.033-3.24-5.555-3.565L1.5 12.043zm21 0-4.032-3.238-5.555 3.565 4.033 3.24 5.554-3.567zM7.054 16.486 11.087 19.7 12 19.117l.913.583 4.033-3.214-4.946-3.174-4.946 3.174z" />
                        </svg>
                      </button>

                      <button
                        onClick={() => onOpenEdit(s)}
                        className="rounded-lg p-1.5 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                        title="Ubah Konfigurasi"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>

                      <button
                        onClick={() => onOpenAddon(s)}
                        className="rounded-lg p-1.5 text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-950/30 transition-colors cursor-pointer"
                        title="Kelola Add-on"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                      </button>

                      <button
                        onClick={() => onOpenDelete(s)}
                        className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                        title="Hapus Layanan"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
