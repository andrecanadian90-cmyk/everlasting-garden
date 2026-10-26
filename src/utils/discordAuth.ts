import type { DiscordUser } from '../types/auth';
import { getDiscordClientId, getDiscordRedirectUri } from '../config/discord';

export const getDiscordOAuthUrl = (clientId?: string): string => {
  const currentClientId = clientId || getDiscordClientId();
  const redirectUri = getDiscordRedirectUri();
  const scope = encodeURIComponent('identify');

  return `https://discord.com/oauth2/authorize?client_id=${currentClientId}&response_type=token&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${scope}`;
};

export const parseDiscordCallback = (): { accessToken: string | null; error: string | null } => {
  if (typeof window === 'undefined') return { accessToken: null, error: null };

  const hash = window.location.hash.substring(1);
  if (!hash) return { accessToken: null, error: null };

  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');
  const error = params.get('error');

  return { accessToken, error };
};

export const fetchDiscordProfile = async (accessToken: string): Promise<DiscordUser> => {
  const response = await fetch('https://discord.com/api/v10/users/@me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gagal mengambil profil Discord resmi: ${response.status} - ${errorText}`);
  }

  const data = await response.json();

  // URL avatar resmi Discord CDN
  let avatarUrl = 'https://cdn.discordapp.com/embed/avatars/0.png';
  if (data.avatar) {
    const isAnimated = data.avatar.startsWith('a_');
    const ext = isAnimated ? 'gif' : 'png';
    avatarUrl = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.${ext}?size=128`;
  } else {
    // Default avatar Discord berdasarkan discriminator/ID
    const defaultIndex = data.discriminator && data.discriminator !== '0'
      ? Number(data.discriminator) % 5
      : (BigInt(data.id) >> 22n) % 6n;
    avatarUrl = `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
  }

  return {
    id: data.id,
    username: data.username,
    globalName: data.global_name || data.username,
    avatar: avatarUrl,
    discriminator: data.discriminator,
  };
};

export const clearDiscordHash = () => {
  if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }
};
