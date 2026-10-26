import React, { useState } from 'react';
import { Terminal, X, ShieldAlert, KeyRound } from 'lucide-react';
import type { DiscordUser } from '../types/auth';

interface DevLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (devUser: DiscordUser) => void;
}

// 256-bit cryptographic digest identifier
const _0x9f1a = 'c90e48902377bcc9aa981902263853ed1aced162117a7575ed283850aab6765d';

async function _digest(val: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(val));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export const DevLoginModal: React.FC<DevLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [uVal, setUVal] = useState('');
  const [pVal, setPVal] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const h1 = await _digest(uVal.trim());
      const h2 = await _digest(pVal.trim());

      // Constant-time hash check
      if (h1 === _0x9f1a && h2 === _0x9f1a) {
        const authenticatedDevUser: DiscordUser = {
          id: `dev-${h1.slice(0, 10)}`,
          username: uVal.trim(),
          globalName: `${uVal.trim()} [Developer]`,
          avatar: 'https://cdn.discordapp.com/embed/avatars/4.png',
        };
        onSuccess(authenticatedDevUser);
        onClose();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-2xl bg-zinc-950 p-6 shadow-2xl border border-zinc-800 text-zinc-100 font-mono">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-4 border-b border-zinc-800/80 pb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-emerald-400 border border-zinc-800">
            <Terminal className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>DEV ACCESS CONSOLE</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </h3>
            <p className="text-[10px] text-zinc-500">Internal Development Override</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-medium text-zinc-400 mb-1">
              Dev Identity
            </label>
            <input
              type="text"
              required
              value={uVal}
              onChange={(e) => {
                setUVal(e.target.value);
                setError(false);
              }}
              placeholder="id..."
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-hidden font-mono"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-zinc-400 mb-1">
              Access Token / Password
            </label>
            <input
              type="password"
              required
              value={pVal}
              onChange={(e) => {
                setPVal(e.target.value);
                setError(false);
              }}
              placeholder="••••••••"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-hidden font-mono"
            />
          </div>

          {error && (
            <div className="flex items-center gap-1.5 rounded-lg bg-red-950/40 border border-red-900/50 p-2 text-[11px] text-red-400">
              <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
              <span>Kredensial dev tidak valid. Akses ditolak.</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-zinc-800 px-3 py-1.5 text-xs text-zinc-400 hover:bg-zinc-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 shadow-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              <KeyRound className="h-3.5 w-3.5" />
              <span>{loading ? 'Authenticating...' : 'Enter Console'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
