export interface InventoryItem {
  id: string;
  name: string;
  type: string;
  emoji: string;
  price: number;
  effect: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  quantity: number;
  available: boolean;
  stackable: boolean;
  description: string;
  inventory_id: string;
  purchased_at: string;
}

export interface Economy {
  id: string;
  username: string;
  cash: number;
  bank: number;
  total_earned: number;
  total_spent: number;
  inventory: InventoryItem[] | null;
  active_boosts: Record<string, unknown> | null;
  last_work: number | null;
  last_rob: number | null;
  created_at: string;
  updated_at: string;
}

export interface Prestamo {
  id: number;
  lender_id: string;
  borrower_id: string;
  loan_name: string;
  amount: number;
  interest_rate: number;
  daily_payment: number;
  total_amount: number;
  total_days: number;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
}

export type DashboardUser = {
  discord_id: string;
  discord_username: string;
  avatar: string | null;
  dpi: string | null;
};