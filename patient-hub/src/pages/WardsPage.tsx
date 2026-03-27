import { CrudTable } from '@/components/CrudTable';
import { useApi } from '@/hooks/useApi';
import { wardFields } from '@/config/entityFields';
import { Ward } from '@/types/hospital';

export default function WardsPage() {
  const { items, create, update, remove } = useApi<Ward>('WARD_24BDS1097', 'Ward_ID');
  return <CrudTable title="Ward" idField="Ward_ID" fields={wardFields} items={items} onCreate={create} onUpdate={update} onDelete={remove} />;
}
