import React, { useState } from 'react';
import { AlertOctagon, X } from 'lucide-react';
import type { GardenService } from '../types/service';

interface DeleteConfirmModalProps {
  service: GardenService | null;
  onClose: () => void;
  onConfirm: (serviceId: string) => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ service, onClose, onConfirm }) => {
  const [typedUsername, setTypedUsername] = useState('');
  const [error, setError] = useState(false);

  if (!service) return null;

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    if (typedUsername.trim() === service.megaxusId) {
      onConfirm(service.id);
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400">
            <AlertOctagon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Hapus layanan</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Hapus salah satu layananmu</p>
          </div>
        </div>

        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
          Yakin mau menghapus layanan dengan username <b className="text-zinc-900 dark:text-zinc-100">{service.megaxusId}</b>? Tindakan ini tidak bisa dibatalkan.
        </p>

        <form onSubmit={handleDelete} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Ketik ulang username-nya untuk konfirmasi.
            </label>
            <input
              type="text"
              value={typedUsername}
              onChange={(e) => {
                setTypedUsername(e.target.value);
                setError(false);
              }}
              placeholder="Ketik username untuk konfirmasi"
              className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 focus:border-red-500 focus:outline-hidden focus:ring-2 focus:ring-red-500/20"
              autoFocus
            />
            {error && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                Username yang diketik tidak cocok dengan {service.megaxusId}.
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-zinc-200 px-4 py-2.5 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={typedUsername.trim() !== service.megaxusId}
              className="rounded-xl bg-red-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Hapus Layanan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
