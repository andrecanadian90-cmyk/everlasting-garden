import type { GardenService } from '../types/service';

export const SEED_OPTIONS = [
  { id: 'sunflower', name: 'Sunflower (Bunga Matahari)', tier: 'Standard', duration: '1 Jam' },
  { id: 'rose', name: 'Rose (Mawar Merah)', tier: 'Standard', duration: '2 Jam' },
  { id: 'tulip', name: 'Tulip', tier: 'Standard', duration: '3 Jam' },
  { id: 'carnation', name: 'Carnation (Anyelir)', tier: 'Standard', duration: '4 Jam' },
  { id: 'morning_glory', name: 'Morning Glory', tier: 'Standard', duration: '4 Jam' },
  { id: 'daisy', name: 'Daisy', tier: 'Standard', duration: '6 Jam' },
  { id: 'lily', name: 'Lily', tier: 'Medium', duration: '8 Jam' },
  { id: 'hyacinth', name: 'Hyacinth', tier: 'Medium', duration: '10 Jam' },
  { id: 'peony', name: 'Peony', tier: 'Medium', duration: '12 Jam' },
  { id: 'edelweiss', name: 'Edelweiss', tier: 'High', duration: '16 Jam' },
  { id: 'orchid', name: 'Orchid (Anggrek)', tier: 'High', duration: '20 Jam' },
  { id: 'lavender', name: 'Lavender', tier: 'High', duration: '24 Jam' },
  { id: 'cherry_blossom', name: 'Cherry Blossom (Sakura)', tier: 'High', duration: '24 Jam' },
  { id: 'rosemary', name: 'Rosemary', tier: 'Special', duration: '18 Jam' },
  { id: 'chamomile', name: 'Chamomile', tier: 'Special', duration: '12 Jam' },
];

export const SECRET_SEED_OPTIONS = [
  { id: 'secret_magic', name: 'Secret Seed (Standard Magic)', effect: 'Random Rare Harvest' },
  { id: 'golden_apple', name: 'Golden Apple', effect: 'Bonus EXP & Den 200%' },
  { id: 'rainbow_rose', name: 'Rainbow Rose', effect: 'Super Rare Couple Ring Item' },
  { id: 'cupid_heart', name: 'Cupid Heart (Love Fruit)', effect: 'Love Point Max Boost' },
  { id: 'star_flower', name: 'Star Flower', effect: 'Rare Accessory Drop' },
  { id: 'moon_flower', name: 'Moon Flower', effect: 'Night Garden Glow' },
  { id: 'sun_tree', name: 'Sun Tree', effect: 'High Yield Den & Jewels' },
];

// Clean: Tidak ada akun mock orang lain. Setiap user Discord mendaftarkan akunnya sendiri secara privat.
export const INITIAL_SERVICES: GardenService[] = [];
