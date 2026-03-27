import { CrudTable } from '@/components/CrudTable';
import { useApi } from '@/hooks/useApi';
import { staffFields } from '@/config/entityFields';
import { Staff } from '@/types/hospital';

export default function StaffPage() {
  const { items, create, update, remove } = useApi<Staff>('STAFF_24BDS1097', 'Staff_ID');
  return <CrudTable title="Staff" idField="Staff_ID" fields={staffFields} items={items} onCreate={create} onUpdate={update} onDelete={remove} />;
}
