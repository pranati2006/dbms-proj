import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";

// Import your new Dashboard
import Index from "./pages/Index";

import PatientsPage from "./pages/PatientsPage";
import DoctorsPage from "./pages/DoctorsPage";
import WardsPage from "./pages/WardsPage";
import StaffPage from "./pages/StaffPage";
import AdmissionsPage from "./pages/AdmissionsPage";
import DiagnosesPage from "./pages/DiagnosesPage";
import TreatmentsPage from "./pages/TreatmentsPage";
import MedicationsPage from "./pages/MedicationsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            {/* Set the Dashboard as the landing page */}
            <Route path="/" element={<Index />} />

            {/* Move Patients to its own dedicated path */}
            <Route path="/patients" element={<PatientsPage />} />

            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/wards" element={<WardsPage />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/diagnoses" element={<DiagnosesPage />} />
            <Route path="/treatments" element={<TreatmentsPage />} />
            <Route path="/medications" element={<MedicationsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;