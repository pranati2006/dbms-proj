import { CrudTable } from '@/components/CrudTable';
import { useApi } from '@/hooks/useApi';
import { doctorFields } from '@/config/entityFields';
import { Doctor } from '@/types/hospital';

export default function DoctorsPage() {
  const { items, create, update, remove } = useApi<Doctor>('DOCTOR_24BDS1097', 'Doctor_ID');
  return <CrudTable title="Doctor" idField="Doctor_ID" fields={doctorFields} items={items} onCreate={create} onUpdate={update} onDelete={remove} />;
}
