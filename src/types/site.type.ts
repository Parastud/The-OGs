export interface SiteEntry {
    site_id: number;
    id: number;
    status: string;
    user_id: number;
    site_name: string;
    address: string;
    district: string;
    state: string;
    country: string;
    pin: number;
    cam_mini_balance: number | null;
    cam_deduct_percentage: number | null;
    created_at: string;
    updated_at: string;
    is_solar_enabled: string;
    allow_cam_data_ui: string;
    cam_mode: string | null;
    cam_deduct_fixed_price_paisa: number | null;
    payment_gateway: string | null;
    charge_percentage: number | null;
}
