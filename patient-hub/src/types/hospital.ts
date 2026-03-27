export interface Patient {
  [key: string]: unknown;
  Patient_ID: string;
  Name: string;
  Age: number;
  Gender: string;
  Contact_Number: string;
  Address: string;
}

export interface Doctor {
  [key: string]: unknown;
  Doctor_ID: string;
  Name: string;
  Specialization: string;
  Phone: string;
}

export interface Ward {
  [key: string]: unknown;
  Ward_ID: string;
  Ward_Name: string;
  Capacity: number;
}

export interface Staff {
  [key: string]: unknown;
  Staff_ID: string;
  Name: string;
  Role: string;
  Ward_ID: string;
}

export interface Admission {
  [key: string]: unknown;
  Admission_ID: string;
  Admission_Date: string;
  Discharge_Date: string;
  Patient_ID: string;
  Ward_ID: string;
}

export interface Diagnosis {
  [key: string]: unknown;
  Diagnosis_ID: string;
  Diagnosis_Name: string;
  Description: string;
  Patient_ID: string;
  Doctor_ID: string;
}

export interface Treatment {
  [key: string]: unknown;
  Treatment_ID: string;
  Treatment_Type: string;
  Start_Date: string;
  End_Date: string;
  Diagnosis_ID: string;
}

export interface Medication {
  [key: string]: unknown;
  Medication_ID: string;
  Medicine_Name: string;
  Dosage: string;
  Treatment_ID: string;
}
