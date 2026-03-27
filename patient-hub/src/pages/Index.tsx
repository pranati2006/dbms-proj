import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Stethoscope, ClipboardList, BedDouble, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    patients: 0,
    doctors: 0,
    admissions: 0,
    wards: 0
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [p, d, a, w] = await Promise.all([
          axios.get('http://localhost:5000/api/PATIENT_24BDS1097'),
          axios.get('http://localhost:5000/api/DOCTOR_24BDS1097'),
          axios.get('http://localhost:5000/api/ADMISSION_24BDS1097'),
          axios.get('http://localhost:5000/api/WARD_24BDS1097')
        ]);

        setCounts({
          patients: p.data.length,
          doctors: d.data.length,
          admissions: a.data.length,
          wards: w.data.length
        });
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
      }
    };
    fetchCounts();
  }, []);

  const stats = [
    { title: "Total Patients", value: counts.patients, icon: Users, color: "text-blue-600", path: "/patients" },
    { title: "Psychiatrists", value: counts.doctors, icon: Stethoscope, color: "text-green-600", path: "/doctors" },
    { title: "Current Admissions", value: counts.admissions, icon: ClipboardList, color: "text-purple-600", path: "/admissions" },
    { title: "Hospital Wards", value: counts.wards, icon: BedDouble, color: "text-orange-600", path: "/wards" },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-3">
              <Activity className="text-blue-600 h-10 w-10" />
              Patient-Hub Management
            </h1>
            <p className="text-slate-500 mt-2 font-mono">Academic ID: 24BDS1097 | VIT Chennai</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((item, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-blue-500" onClick={() => navigate(item.path)}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">{item.title}</CardTitle>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold tracking-tight">{item.value}</div>
                <p className="text-xs text-slate-400 mt-1">Live from MySQL</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Log Management Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button onClick={() => navigate('/patients')} className="w-full bg-blue-600 hover:bg-blue-700 h-12">New Patient Entry</Button>
            <Button onClick={() => navigate('/admissions')} variant="secondary" className="w-full h-12">Update Admission Logs</Button>
            <Button onClick={() => navigate('/diagnoses')} variant="outline" className="w-full h-12">Add Medical Diagnosis</Button>
            <Button onClick={() => navigate('/medications')} variant="outline" className="w-full h-12">Manage Pharmacy</Button>
          </div>
        </div>
      </div>
    </div>
  );
}