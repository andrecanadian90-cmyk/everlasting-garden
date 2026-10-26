import React, { useState } from 'react';
import { Copy, Check, AlertTriangle, X, ExternalLink, Trash2 } from 'lucide-react';
import type { GardenService } from '../types/service';

interface DropboxModalProps {
  service: GardenService | null;
  onClose: () => void;
  onDeleteFolder: (serviceId: string) => void;
}

export const DropboxModal: React.FC<DropboxModalProps> = ({ service, onClose, onDeleteFolder }) => {
  const [copied, setCopied] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!service) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(service.dropboxUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDelete = () => {
    onDeleteFolder(service.id);
    setShowDeleteConfirm(false);
    onClose();
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
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.054 2 1.5 5.567l4.032 3.238L11.087 5.24 7.054 2zm9.892 0-4.033 3.24 5.555 3.565 4.032-3.238L16.946 2zM1.5 12.043l5.554 3.567 4.033-3.24-5.555-3.565L1.5 12.043zm21 0-4.032-3.238-5.555 3.565 4.033 3.24 5.554-3.567zM7.054 16.486 11.087 19.7 12 19.117l.913.583 4.033-3.214-4.946-3.174-4.946 3.174z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Dropbox</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Ambil tautan folder Dropbox akun ini</p>
          </div>
        </div>

        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
          Klik ikon papan klip untuk menyalin tautan Dropbox milik <b className="text-zinc-900 dark:text-zinc-100">{service.megaxusId}</b>.
        </p>

        <div className="mt-4 flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              readOnly
              value={service.dropboxUrl}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-800 select-all dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 focus:outline-hidden font-mono"
            />
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors shadow-xs"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-500" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Salin</span>
              </>
            )}
          </button>
          <a
            href={service.dropboxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800"
            title="Buka langsung"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {copied && (
          <p className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            Tersalin ke papan klip.
          </p>
        )}

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 dark:border-amber-900/40 dark:bg-amber-950/20">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              Menghapus akan menghilangkan folder laporan milik <b>{service.megaxusId}</b> dari penyimpanan awan. Tindakan ini tidak bisa dibatalkan.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center border-t border-zinc-100 pt-4 dark:border-zinc-800">
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700 dark:text-red-400 hover:underline"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Hapus folder Dropbox</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-red-600 dark:text-red-400 font-semibold">Yakin hapus cloud folder?</span>
              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-red-700"
              >
                Ya, Hapus
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-lg border border-zinc-200 px-2.5 py-1 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
              >
                Batal
              </button>
            </div>
          )}

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
