import { CrudTable } from '@/components/CrudTable';
import { useApi } from '@/hooks/useApi';
import { treatmentFields } from '@/config/entityFields';
import { Treatment } from '@/types/hospital';

export default function TreatmentsPage() {
  const { items, create, update, remove } = useApi<Treatment>('TREATMENT_24BDS1097', 'Treatment_ID');
  return <CrudTable title="Treatment" idField="Treatment_ID" fields={treatmentFields} items={items} onCreate={create} onUpdate={update} onDelete={remove} />;
}
