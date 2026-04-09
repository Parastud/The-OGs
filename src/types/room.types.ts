export interface RoomListItem {
  id: number;
  user_id: number;
  site_id: number;
  group_id: number;
  group_name: string;
  bed_number:string

  is_cam_enable: number;
  total_tenant_counts: number;
  tenant_data: any | null;

  is_occupied: number;

  total_rent_bill: number;
  rent_bill_paid_amount: number;
  rent_bill_due_amount: number;
  rent_last_bill_paid_date: string | null;

  total_maintance_bill: number;
  maintance_bill_paid_amount: number;
  maintance_bill_due_amount: number;
  maintance_last_bill_paid_date: string | null;

  grid_total_consumption: number;
  dg_total_consumption: number;
  wtm_p_total_consumption: number;
  wtm_total_consumption: number;

  attatched_device_count: number;
  attatched_device_online_count: number;
  attatched_device_balance: number;

  cam_charges: number;
  latest_recharge_amount: number | null;

  report_scope: string; // e.g. "by-room"
  created_at: string; // ISO date string
}

export interface RoomGroup {
  group_id: number;
  group_name: string;
  site_id: number;
  cam_mini_balance: number | null;
  charge_percentage: number;
  cam_deduct_fixed_price_paisa: number | null;
  total_bed: number;
  maintenance_type: string | null;
  per_square_feet_charges: number;
  total_square_feet: number;
  maintenance_charge: number;
  group_created_at: string;
  group_updated_at: string;
  group_status: string;
  per_bed_amount?: number
  active_tenants?:any
}

export interface ActiveTenant {
  tenant_occupancy_id: number;
  tenant_id?: number;
  tenant_name: string;
  phone_number: number;
  bed_number: string;
  rent: number;
  bed_rate: number;
}

export interface EditableTenant {
  tenant_occupancy_id: number;
  tenant_id?: number;
  tenant_name: string;
  phone_number: number;
  bed_number: string;
  rent: string;
  bed_rate: string;
  maintance_amount: string;
}

export interface EditableGroup {
  group_name: string;
  charge_percentage: string;
  cam_deduct_fixed_price_paisa: string;
  total_bed: string;
  per_bed_amount: string;
  maintenance_type: 'fixed' | 'unit';
  per_square_feet_charges: string;
  total_square_feet: string;
  maintenance_charge: string;
}

export interface CreateRoomForm {
  group_name: string;
  charge_percentage: string;
  cam_deduct_fixed_price_paisa: string;
  total_bed: string;
  per_bed_amount: string;
  maintenance_type: 'fixed' | 'unit';
  per_square_feet_charges: string;
  total_square_feet: string;
  maintenance_charge: string;
}
