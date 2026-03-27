import { CrudTable } from '@/components/CrudTable';
import { useApi } from '@/hooks/useApi';
import { patientFields } from '@/config/entityFields';
import { Patient } from '@/types/hospital';

export default function PatientsPage() {
  const { items, create, update, remove } = useApi<Patient>('PATIENT_24BDS1097', 'Patient_ID');
  return <CrudTable title="Patient" idField="Patient_ID" fields={patientFields} items={items} onCreate={create} onUpdate={update} onDelete={remove} />;
}
