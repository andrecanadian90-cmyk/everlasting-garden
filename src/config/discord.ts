const DISCORD_CLIENT_ID_STORAGE = 'everlasting_garden_discord_client_id';

// Default Client ID (Bisa diganti lewat UI atau environment)
export const DEFAULT_DISCORD_CLIENT_ID = '123456789012345678';

export const getDiscordClientId = (): string => {
  try {
    const customId = localStorage.getItem(DISCORD_CLIENT_ID_STORAGE);
    return customId ? customId.trim() : DEFAULT_DISCORD_CLIENT_ID;
  } catch {
    return DEFAULT_DISCORD_CLIENT_ID;
  }
};

export const setDiscordClientId = (clientId: string) => {
  try {
    localStorage.setItem(DISCORD_CLIENT_ID_STORAGE, clientId.trim());
  } catch (err) {
    console.error('Failed to save Discord Client ID:', err);
  }
};

export const getDiscordRedirectUri = (): string => {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/`;
  }
  return 'http://localhost:5173/';
};
