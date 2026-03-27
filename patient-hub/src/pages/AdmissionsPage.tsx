import { CrudTable } from '@/components/CrudTable';
import { useApi } from '@/hooks/useApi';
import { admissionFields } from '@/config/entityFields';
import { Admission } from '@/types/hospital';

export default function AdmissionsPage() {
  const { items, create, update, remove } = useApi<Admission>('ADMISSION_24BDS1097', 'Admission_ID');
  return <CrudTable title="Admission" idField="Admission_ID" fields={admissionFields} items={items} onCreate={create} onUpdate={update} onDelete={remove} />;
}
