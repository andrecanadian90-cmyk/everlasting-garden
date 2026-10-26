import type { GardenService } from '../types/service';
import { INITIAL_SERVICES } from '../constants/gardenData';

const STORAGE_KEY = 'ayodance_garden_services_data_v1';

export const loadServices = (): GardenService[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SERVICES));
      return INITIAL_SERVICES;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load services from localStorage:', err);
    return INITIAL_SERVICES;
  }
};

export const saveServices = (services: GardenService[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
  } catch (err) {
    console.error('Failed to save services to localStorage:', err);
  }
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('id-ID').format(num);
};

export const formatDate = (dateStr: string): string => {
  if (!dateStr || dateStr === 'PERMANENT') return 'Permanen (Unlimited)';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return 'Permanen (Unlimited)';
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const exportServicesToCSV = (services: GardenService[]) => {
  const headers = [
    'Megaxus ID',
    'Nickname',
    'Trusted Nickname',
    'Den',
    'Cash',
    'Love Point',
    'Target Love Point',
    'Couple Title',
    'Seed',
    'Secret Seed',
    'Queenbee',
    'Growbooster',
    'Auto Mix Herb',
    'Gacha (Refill)',
    'Golden Gacha (Refill)',
    'Status Login',
    'Terakhir Panen',
    'Masa Aktif Berakhir',
    'Catatan'
  ];

  const rows = services.map(s => [
    s.megaxusId,
    s.nickname,
    s.trustedNickname || '-',
    s.den,
    s.cash,
    s.lovePoint,
    s.targetLovePoint,
    s.coupleTitle || '-',
    s.seed,
    s.secretSeed,
    s.queenbee,
    s.growbooster ? 'Aktif' : 'Nonaktif',
    s.mixingGrowbooster ? 'Aktif' : 'Nonaktif',
    s.gacha ? `Aktif (${s.gachaRefill})` : 'Nonaktif',
    s.goldenGacha ? `Aktif (${s.goldenGachaRefill})` : 'Nonaktif',
    s.loginStatus,
    s.lastHarvestAt ? formatDate(s.lastHarvestAt) : '-',
    s.validUntil ? formatDate(s.validUntil) : '-',
    `"${(s.notes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + 
    [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `rekap_joki_garden_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
