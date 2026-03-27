import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Pencil, Trash2, Search, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select';
  required?: boolean;
  options?: { value: string; label: string }[];
}

interface CrudTableProps<T extends Record<string, unknown>> {
  title: string;
  idField: string;
  fields: FieldConfig[];
  items: T[];
  onCreate: (item: T) => Promise<void>;
  onUpdate: (id: string, item: T) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function CrudTable<T extends Record<string, unknown>>({
  title, idField, fields, items, onCreate, onUpdate, onDelete
}: CrudTableProps<T>) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<T | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const openCreate = () => {
    setEditItem(null);
    const defaults: Record<string, unknown> = {};
    fields.forEach(f => { defaults[f.name] = f.type === 'number' ? 0 : ''; });
    setFormData(defaults);
    setDialogOpen(true);
  };

  const openEdit = (item: T) => {
    setEditItem(item);
    setFormData({ ...item });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    const missing = fields.filter(f => f.required !== false && !formData[f.name] && formData[f.name] !== 0);
    if (missing.length) {
      toast({ title: 'Missing fields', description: `Please fill: ${missing.map(f => f.label).join(', ')}`, variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    try {
      if (editItem) {
        // If onUpdate fails, it throws an error and the next line (toast) is skipped
        await onUpdate(String((editItem as Record<string, unknown>)[idField]), formData as T);
        toast({ title: 'Updated', description: `${title} record updated successfully.` });
      } else {
        await onCreate(formData as T);
        toast({ title: 'Created', description: `${title} record added to database.` });
      }
      setDialogOpen(false); // Only closes if no error occurred
    } catch (error) {
      // Logic comes here on MySQL error; Toast won't show
      console.error("Save process halted due to database error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsSubmitting(true);
    try {
      await onDelete(id);
      setDeleteConfirm(null);
      toast({ title: 'Deleted', description: `${title} record removed.` });
    } catch (error) {
      console.error("Delete process halted.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = items.filter(item =>
    !search || fields.some(f => String(item[f.name] ?? '').toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{title} Management</h2>
        <Button onClick={openCreate} className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> Add New {title}
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={`Search ${title}s...`}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-10 focus-visible:ring-blue-500"
        />
      </div>

      <div className="rounded-lg border bg-card overflow-auto shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              {fields.map(f => (
                <TableHead key={f.name} className="font-semibold">{f.label}</TableHead>
              ))}
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={fields.length + 1} className="text-center py-12 text-muted-foreground">
                  No records found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((item, i) => (
                <TableRow key={i} className="hover:bg-slate-50/50">
                  {fields.map(f => (
                    <TableCell key={f.name} className="py-3">
                      {f.type === 'date' && item[f.name]
                        ? new Date(String(item[f.name])).toLocaleDateString()
                        : String(item[f.name] ?? '')}
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(item)} className="hover:text-blue-600">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteConfirm(String(item[idField]))} className="hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editItem ? 'Update' : 'Register New'} {title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {fields.map(f => (
              <div key={f.name} className="grid gap-2">
                <Label htmlFor={f.name}>{f.label}</Label>
                {f.type === 'select' ? (
                  <Select
                    value={String(formData[f.name] ?? '')}
                    onValueChange={v => setFormData(prev => ({ ...prev, [f.name]: v }))}
                  >
                    <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>
                      {f.options?.map(o => (
                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={f.name}
                    type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}
                    value={String(formData[f.name] ?? '')}
                    disabled={editItem && f.name === idField}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      [f.name]: f.type === 'number' ? e.target.value : e.target.value
                    }))}
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Confirm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle className="text-red-600">Delete Permanently?</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">This will remove the record from HospitalDB_24BDS1097.</p>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteConfirm && handleDelete(deleteConfirm)} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Yes, Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}