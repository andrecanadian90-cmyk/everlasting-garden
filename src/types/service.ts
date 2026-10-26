export type LoginStatus = 
  | 'Berhasil' 
  | 'Diblokir' 
  | 'ID salah' 
  | 'Password salah' 
  | 'Tidak dikenali' 
  | 'Server bermasalah';

export type QueenbeeMode = 'Semua' | 'Den' | 'Love' | 'Item';

export interface ServiceAddon {
  id: string;
  name: string;
  code: string; // e.g. 'AUTO_MIX_HERB'
  expiresAt: string; // ISO date
  isActive: boolean;
}

export interface GardenService {
  id: string;
  discordUserId: string; // Relasi 1-to-1 dengan Discord User ID
  megaxusId: string;
  nickname: string;
  password?: string;
  trustedNickname?: string;
  
  // Konfigurasi Bibit & Panen
  seed: string;
  secretSeed: string;
  queenbee: QueenbeeMode;
  
  // Booster
  growbooster: boolean;
  mixingGrowbooster: boolean; // Butuh add-on Auto Mix Herb
  
  // Gacha
  gacha: boolean;
  gachaRefill: number;
  goldenGacha: boolean;
  goldenGachaRefill: number;
  
  // Catatan
  notes?: string;
  
  // Telemetri Live Sync
  den: number;
  cash: number;
  lovePoint: number;
  targetLovePoint: number;
  coupleTitle?: string;
  loginStatus: LoginStatus;
  lastHarvestAt: string;
  lastUpdatedAt: string;
  validUntil: string;
  dropboxUrl: string;
  
  // Addons
  addons: ServiceAddon[];
  
  // Status
  isMine: boolean;
}
