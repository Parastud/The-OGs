export interface DashboardDataTypes {
  id: number;
  user_id: number;
  site_id: number;

  total_income: number | null;
  total_collection: number | null;
  due_amount: number | null;
  total_expenses: number | null;
  total_recharges: number | null;
  total_number_of_recharges: number | null;
  total_number_of_successfull_recharges: number | null;
  total_settlement: number | null;
  total_cam: number | null;

  sites: number | null;
  tenants: number | null;
  rooms: number | null;
  occupancy: number | null;
  vacant: number | null;

  total_devices: number | null;
  total_online_devices: number | null;
  total_offline_devices: number | null;

  anomalies_detected: number | null;
  pending_checks: number | null;
  today_anomalies: number | null;

  grid_total_consumption: number | null;
  dg_total_consumption: number | null;
  solar_total_consumption?:number | null;
  wtm_p_total_consumption: number | null;
  wtm_total_consumption: number | null;

  wtm_p_online_devices: number | null;
  elm_online_devices: number | null;
  elm_offline_devices: number | null;
  wtm_p_offline_devices: number | null;

  current_bill: number | null;
  elm_dg_forecasted_unit: number | null;
  elm_grid_forecasted_unit: number | null;

  report_scope: string | null;
  created_at: string; // ISO Date string
}
