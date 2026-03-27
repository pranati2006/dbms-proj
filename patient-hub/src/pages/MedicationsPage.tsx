import { CrudTable } from '@/components/CrudTable';
import { useApi } from '@/hooks/useApi';
import { medicationFields } from '@/config/entityFields';
import { Medication } from '@/types/hospital';

export default function MedicationsPage() {
  const { items, create, update, remove } = useApi<Medication>('MEDICATION_24BDS1097', 'Medication_ID');
  return <CrudTable title="Medication" idField="Medication_ID" fields={medicationFields} items={items} onCreate={create} onUpdate={update} onDelete={remove} />;
}
