import { CrudTable } from '@/components/CrudTable';
import { useApi } from '@/hooks/useApi';
import { diagnosisFields } from '@/config/entityFields';
import { Diagnosis } from '@/types/hospital';

export default function DiagnosesPage() {
  const { items, create, update, remove } = useApi<Diagnosis>('DIAGNOSIS_24BDS1097', 'Diagnosis_ID');
  return <CrudTable title="Diagnosis" idField="Diagnosis_ID" fields={diagnosisFields} items={items} onCreate={create} onUpdate={update} onDelete={remove} />;
}
