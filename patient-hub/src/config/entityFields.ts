import { FieldConfig } from '@/components/CrudTable';

// --- PATIENT_24BDS1097 ---
export const patientFields: FieldConfig[] = [
  { name: 'Patient_ID', label: 'Patient ID (INT)', type: 'number' },
  { name: 'Name', label: 'Name', type: 'text' },
  { name: 'Age', label: 'Age', type: 'number' },
  {
    name: 'Gender', label: 'Gender', type: 'select', options: [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' },
      { value: 'Other', label: 'Other' },
    ]
  },
  { name: 'Contact_Number', label: 'Contact Number', type: 'text' },
  { name: 'Address', label: 'Address', type: 'text' },
];

// --- DOCTOR_24BDS1097 ---
export const doctorFields: FieldConfig[] = [
  { name: 'Doctor_ID', label: 'Doctor ID (INT)', type: 'number' },
  { name: 'Name', label: 'Name', type: 'text' },
  { name: 'Specialization', label: 'Specialization', type: 'text' },
  { name: 'Phone', label: 'Phone', type: 'text' },
];

// --- WARD_24BDS1097 ---
export const wardFields: FieldConfig[] = [
  { name: 'Ward_ID', label: 'Ward ID (INT)', type: 'number' },
  { name: 'Ward_Name', label: 'Ward Name', type: 'text' },
  { name: 'Capacity', label: 'Capacity', type: 'number' },
];

// --- STAFF_24BDS1097 ---
export const staffFields: FieldConfig[] = [
  { name: 'Staff_ID', label: 'Staff ID (INT)', type: 'number' },
  { name: 'Name', label: 'Name', type: 'text' },
  { name: 'Role', label: 'Role', type: 'text' },
  { name: 'Ward_ID', label: 'Ward ID (FK)', type: 'number' }, // Must be number to match INT
];

// --- ADMISSION_24BDS1097 ---
export const admissionFields: FieldConfig[] = [
  { name: 'Admission_ID', label: 'Admission ID (INT)', type: 'number' },
  { name: 'Admission_Date', label: 'Admission Date', type: 'date' },
  { name: 'Discharge_Date', label: 'Discharge Date', type: 'date', required: false },
  { name: 'Patient_ID', label: 'Patient ID (FK)', type: 'number' }, // FK must be number
  { name: 'Ward_ID', label: 'Ward ID (FK)', type: 'number' },       // FK must be number
];

// --- DIAGNOSIS_24BDS1097 ---
export const diagnosisFields: FieldConfig[] = [
  { name: 'Diagnosis_ID', label: 'Diagnosis ID (INT)', type: 'number' },
  { name: 'Diagnosis_Name', label: 'Diagnosis Name', type: 'text' },
  { name: 'Description', label: 'Description', type: 'text' },
  { name: 'Patient_ID', label: 'Patient ID (FK)', type: 'number' },
  { name: 'Doctor_ID', label: 'Doctor ID (FK)', type: 'number' },
];

// --- TREATMENT_24BDS1097 ---
export const treatmentFields: FieldConfig[] = [
  { name: 'Treatment_ID', label: 'Treatment ID (INT)', type: 'number' },
  { name: 'Treatment_Type', label: 'Treatment Type', type: 'text' },
  { name: 'Start_Date', label: 'Start Date', type: 'date' },
  { name: 'End_Date', label: 'End Date', type: 'date', required: false },
  { name: 'Diagnosis_ID', label: 'Diagnosis ID (FK)', type: 'number' },
];

// --- MEDICATION_24BDS1097 ---
export const medicationFields: FieldConfig[] = [
  { name: 'Medication_ID', label: 'Medication ID (INT)', type: 'number' },
  { name: 'Medicine_Name', label: 'Medicine Name', type: 'text' },
  { name: 'Dosage', label: 'Dosage', type: 'text' },
  { name: 'Treatment_ID', label: 'Treatment ID (FK)', type: 'number' },
];