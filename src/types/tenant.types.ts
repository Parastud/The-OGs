export interface TenantCheckInPayload {
  group_id: number;
  tenant_profile_data: {
    name: string;
    phone_number?: number;
    reference_phone_number?: number;
    address?: string;
    city?: string;
    state?: string;
    pin?: number;
  };
  tenant_other_info: {
    bed_number?: string;
    father_name?: string;
    father_phone_number?: number;
    occupation?: string;
    emergency_contact_name?: string;
    emergency_contact_number?: number;
    aadhaar_number?: number;
    pan_number?: string;
  };
  rates: {
    bed_rate?: number;
  };
}

export interface UploadDocumentsPayload {
  tenant_occupancy_id: number;
  aadhaar_number?: number;
  pan_number?: string;
  aadhaar_img_front?: { uri: string; name: string; type: string };
  aadhaar_img_back?: { uri: string; name: string; type: string };
  pan_img?: { uri: string; name: string; type: string };
}