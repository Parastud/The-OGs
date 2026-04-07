export interface UserData {
  id: number;
  profile_image: string | null;
  name: string;
  phone_number: number;
  phone_number_status: string | null;
  reference_phone_number: number;
  address: string | null;
  state: string | null;
  city: string | null;
  pin: number | null;
  email_id: string;
  email_id_status: string | null;
  user_status: string;
  password_status: string;
  expiry_time: string | null;
  created_at: string; // ISO string
  updated_at: string; // ISO string
  solar_wallet_balance: number;
  wallet_balance: number;
  payout_status: string;
  razorpay_account_id: string | null;
  razorpay_contact_id: string | null;
  bank_added: number; // 0 | 1
  payment_gateway: string | null;
  charge_percentage: number | null;
}
