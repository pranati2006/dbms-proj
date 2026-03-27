import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export function useApi<T extends Record<string, unknown>>(tableName: string, idField: string) {
  const [items, setItems] = useState<T[]>([]);
  const API_URL = `http://localhost:5000/api/${tableName}`;

  // Helper to ensure numbers are sent as INTs to MySQL
  const sanitize = (data: T) => {
    const clean: any = { ...data };
    Object.keys(clean).forEach((key) => {
      if (key.endsWith('_ID') || key === 'Age' || key === 'Capacity') {
        if (clean[key] === '' || clean[key] === null) {
          delete clean[key];
        } else {
          clean[key] = Number(clean[key]);
        }
      }
    });
    return clean;
  };

  const refresh = useCallback(async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (err: any) {
      console.error("Fetch Error:", err.response?.data?.message || err.message);
    }
  }, [API_URL]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = async (item: T) => {
    try {
      const cleanItem = sanitize(item);
      await axios.post(API_URL, cleanItem);
      await refresh();
    } catch (err: any) {
      const msg = err.response?.data?.message || "Constraint Violation";
      alert("❌ Database Error: " + msg);
      throw err; // CRITICAL: Tells CrudTable to stop and not show 'Success'
    }
  };

  const update = async (id: string | number, updated: T) => {
    try {
      const cleanItem = sanitize(updated);
      await axios.put(`${API_URL}/${id}`, cleanItem);
      await refresh();
    } catch (err: any) {
      const msg = err.response?.data?.message || "Update Failed";
      alert("❌ Update Error: " + msg);
      throw err; // Stop execution here
    }
  };

  const remove = async (id: string | number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await refresh();
    } catch (err: any) {
      const msg = err.response?.data?.message || "Delete Failed";
      alert("❌ Cannot delete: " + msg);
      throw err;
    }
  };

  return { items, create, update, remove, refresh };
}