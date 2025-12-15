// // import { useState, useEffect, useMemo } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { AdminLayout } from '@/components/layout/AdminLayout';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // import { StatusBadge } from '@/components/ui/StatusBadge';
// // import { getPatients, getAppointments, Patient, Appointment } from '@/lib/mockData';
// // import { Search, Eye, Edit, ChevronLeft, ChevronRight } from 'lucide-react';

// // const ITEMS_PER_PAGE = 10;

// // export default function Patients() {
// //   const navigate = useNavigate();
// //   const [patients, setPatients] = useState<Patient[]>([]);
// //   const [appointments, setAppointments] = useState<Appointment[]>([]);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [statusFilter, setStatusFilter] = useState<string>('all');
// //   const [currentPage, setCurrentPage] = useState(1);

// //   useEffect(() => {
// //     setPatients(getPatients());
// //     setAppointments(getAppointments());
// //   }, []);

// //   const getPatientAppointment = (patientId: string) => {
// //     return appointments.find(a => a.patientId === patientId);
// //   };

// //   const filteredPatients = useMemo(() => {
// //     return patients.filter(patient => {
// //       const matchesSearch = 
// //         patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         patient.phone.includes(searchQuery);
      
// //       if (!matchesSearch) return false;
      
// //       if (statusFilter === 'all') return true;
      
// //       const appointment = getPatientAppointment(patient.id);
// //       return appointment?.status === statusFilter;
// //     });
// //   }, [patients, appointments, searchQuery, statusFilter]);

// //   const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE);
// //   const paginatedPatients = filteredPatients.slice(
// //     (currentPage - 1) * ITEMS_PER_PAGE,
// //     currentPage * ITEMS_PER_PAGE
// //   );

// //   useEffect(() => {
// //     setCurrentPage(1);
// //   }, [searchQuery, statusFilter]);

// //   return (
// //     <AdminLayout>
// //       <div className="space-y-6">
// //         {/* Header */}
// //         <div className="page-header">
// //           <h1 className="page-title">Patients</h1>
// //           <p className="page-subtitle">Manage all registered patients and their records</p>
// //         </div>

// //         {/* Filters */}
// //         <div className="flex flex-col sm:flex-row gap-4">
// //           <div className="relative flex-1 max-w-md">
// //             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
// //             <Input
// //               placeholder="Search by name or phone..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               className="pl-10"
// //             />
// //           </div>
// //           <Select value={statusFilter} onValueChange={setStatusFilter}>
// //             <SelectTrigger className="w-full sm:w-48">
// //               <SelectValue placeholder="Filter by status" />
// //             </SelectTrigger>
// //             <SelectContent>
// //               <SelectItem value="all">All Statuses</SelectItem>
// //               <SelectItem value="pending">Pending</SelectItem>
// //               <SelectItem value="confirmed">Confirmed</SelectItem>
// //               <SelectItem value="completed">Completed</SelectItem>
// //               <SelectItem value="cancelled">Cancelled</SelectItem>
// //             </SelectContent>
// //           </Select>
// //         </div>

// //         {/* Table */}
// //         <div className="data-table overflow-x-auto">
// //           <table className="w-full">
// //             <thead>
// //               <tr className="border-b border-border bg-muted/50">
// //                 <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
// //                 <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Phone</th>
// //                 <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Appointment Date</th>
// //                 <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
// //                 <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-border">
// //               {paginatedPatients.map((patient) => {
// //                 const appointment = getPatientAppointment(patient.id);
// //                 return (
// //                   <tr key={patient.id} className="hover:bg-muted/30 transition-colors">
// //                     <td className="py-3 px-4">
// //                       <div>
// //                         <p className="font-medium text-foreground">{patient.name}</p>
// //                         <p className="text-sm text-muted-foreground md:hidden">{patient.phone}</p>
// //                       </div>
// //                     </td>
// //                     <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{patient.phone}</td>
// //                     <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">
// //                       {appointment ? (
// //                         <span>{new Date(appointment.date).toLocaleDateString()} at {appointment.time}</span>
// //                       ) : (
// //                         <span className="text-muted-foreground/50">No appointment</span>
// //                       )}
// //                     </td>
// //                     <td className="py-3 px-4">
// //                       {appointment ? (
// //                         <StatusBadge status={appointment.status} />
// //                       ) : (
// //                         <span className="text-xs text-muted-foreground">—</span>
// //                       )}
// //                     </td>
// //                     <td className="py-3 px-4">
// //                       <div className="flex items-center justify-end gap-2">
// //                         <Button
// //                           variant="ghost"
// //                           size="sm"
// //                           onClick={() => navigate(`/patients/${patient.id}`)}
// //                         >
// //                           <Eye className="w-4 h-4" />
// //                           <span className="ml-1 hidden sm:inline">View</span>
// //                         </Button>
// //                         <Button
// //                           variant="ghost"
// //                           size="sm"
// //                           onClick={() => navigate(`/patients/${patient.id}?edit=true`)}
// //                         >
// //                           <Edit className="w-4 h-4" />
// //                           <span className="ml-1 hidden sm:inline">Edit</span>
// //                         </Button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 );
// //               })}
// //             </tbody>
// //           </table>

// //           {paginatedPatients.length === 0 && (
// //             <div className="py-12 text-center">
// //               <p className="text-muted-foreground">No patients found matching your criteria.</p>
// //             </div>
// //           )}
// //         </div>

// //         {/* Pagination */}
// //         {totalPages > 1 && (
// //           <div className="flex items-center justify-between">
// //             <p className="text-sm text-muted-foreground">
// //               Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredPatients.length)} of {filteredPatients.length} patients
// //             </p>
// //             <div className="flex items-center gap-2">
// //               <Button
// //                 variant="outline"
// //                 size="sm"
// //                 onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
// //                 disabled={currentPage === 1}
// //               >
// //                 <ChevronLeft className="w-4 h-4" />
// //               </Button>
// //               <span className="text-sm text-muted-foreground px-2">
// //                 Page {currentPage} of {totalPages}
// //               </span>
// //               <Button
// //                 variant="outline"
// //                 size="sm"
// //                 onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
// //                 disabled={currentPage === totalPages}
// //               >
// //                 <ChevronRight className="w-4 h-4" />
// //               </Button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </AdminLayout>
// //   );
// // }


// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AdminLayout } from '@/components/layout/AdminLayout';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { StatusBadge } from '@/components/ui/StatusBadge';
// import { patientService } from '@/api/patientService';
// import { appointmentService } from '@/api/appointmentService';
// import { toast } from '@/hooks/use-toast';
// import { Search, Eye, Edit, ChevronLeft, ChevronRight, Loader2, UserPlus } from 'lucide-react';

// const ITEMS_PER_PAGE = 10;

// interface Patient {
//   _id: string;
//   name: string;
//   phone: string;
//   email?: string;
//   address?: string;
//   age: number;
//   gender: 'Male' | 'Female' | 'Other';
//   disease?: string;
//   medicalHistory?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface Appointment {
//   _id: string;
//   patientName: string;
//   patientPhone: string;
//   appointmentDate: string;
//   appointmentTime: string;
//   status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
//   patientId: string;
// }

// export default function Patients() {
//   const navigate = useNavigate();
//   const [patients, setPatients] = useState<Patient[]>([]);
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState<string>('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [appointmentsLoading, setAppointmentsLoading] = useState(false);

//   useEffect(() => {
//     fetchPatients();
//     fetchAppointments();
//   }, []);

//   useEffect(() => {
//     if (statusFilter !== 'all') {
//       fetchPatients();
//     }
//   }, [statusFilter, currentPage]);

//   const fetchPatients = async () => {
//     try {
//       setLoading(true);
//       const response = await patientService.getPatients({
//         page: currentPage,
//         limit: ITEMS_PER_PAGE,
//         search: searchQuery,
//         status: statusFilter !== 'all' ? statusFilter : undefined
//       });
      
//       if (response.success) {
//         setPatients(response.data?.patients || []);
//         setTotal(response.data?.total || 0);
//       } else {
//         toast({
//           title: 'Error',
//           description: response.message || 'Failed to fetch patients',
//           variant: 'destructive',
//         });
//       }
//     } catch (error: any) {
//       console.error('Fetch patients error:', error);
//       toast({
//         title: 'Error',
//         description: error.response?.data?.message || 'Network error',
//         variant: 'destructive',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAppointments = async () => {
//     try {
//       setAppointmentsLoading(true);
//       const response = await appointmentService.getAppointments({
//         limit: 100 // Get more appointments to match with patients
//       });
      
//       if (response.success) {
//         setAppointments(response.data?.appointments || []);
//       }
//     } catch (error) {
//       console.error('Fetch appointments error:', error);
//     } finally {
//       setAppointmentsLoading(false);
//     }
//   };

//   const getPatientAppointment = (patientId: string): Appointment | undefined => {
//     return appointments.find(a => a.patientId === patientId);
//   };

//   const handleSearch = () => {
//     setCurrentPage(1);
//     fetchPatients();
//   };

//   const handleWalkInClick = () => {
//     navigate('/walkin');
//   };

//   const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

//   return (
//     <AdminLayout>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="page-title">Patients</h1>
//             <p className="page-subtitle">Manage all registered patients and their records</p>
//           </div>
//           <div className="flex gap-2">
//             <Button 
//               variant="outline" 
//               onClick={fetchPatients}
//               disabled={loading}
//             >
//               {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
//               <span className="ml-2">Refresh</span>
//             </Button>
//             <Button onClick={handleWalkInClick}>
//               <UserPlus className="w-4 h-4 mr-2" />
//               Walk-in Patient
//             </Button>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="relative flex-1 max-w-md">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//             <Input
//               placeholder="Search by name or phone..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//               className="pl-10"
//             />
//           </div>
//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger className="w-full sm:w-48">
//               <SelectValue placeholder="Filter by status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Statuses</SelectItem>
//               <SelectItem value="pending">Pending</SelectItem>
//               <SelectItem value="confirmed">Confirmed</SelectItem>
//               <SelectItem value="completed">Completed</SelectItem>
//               <SelectItem value="cancelled">Cancelled</SelectItem>
//             </SelectContent>
//           </Select>
//           <Button onClick={handleSearch}>
//             <Search className="w-4 h-4 mr-2" />
//             Search
//           </Button>
//         </div>

//         {/* Table */}
//         <div className="data-table overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-border bg-muted/50">
//                 <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Phone</th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Email</th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Age</th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Appointment Status</th>
//                 <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-border">
//               {loading ? (
//                 <tr>
//                   <td colSpan={6} className="py-12 text-center">
//                     <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
//                     <p className="mt-2 text-muted-foreground">Loading patients...</p>
//                   </td>
//                 </tr>
//               ) : patients.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="py-12 text-center">
//                     <p className="text-muted-foreground">No patients found.</p>
//                     <Button 
//                       variant="outline" 
//                       className="mt-4"
//                       onClick={handleWalkInClick}
//                     >
//                       <UserPlus className="w-4 h-4 mr-2" />
//                       Register First Patient
//                     </Button>
//                   </td>
//                 </tr>
//               ) : (
//                 patients.map((patient) => {
//                   const appointment = getPatientAppointment(patient._id);
                  
//                   return (
//                     <tr key={patient._id} className="hover:bg-muted/30 transition-colors">
//                       <td className="py-3 px-4">
//                         <div>
//                           <p className="font-medium text-foreground">{patient.name}</p>
//                           <p className="text-sm text-muted-foreground md:hidden">{patient.phone}</p>
//                           {patient.email && (
//                             <p className="text-xs text-muted-foreground md:hidden">{patient.email}</p>
//                           )}
//                         </div>
//                       </td>
//                       <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">
//                         {patient.phone}
//                       </td>
//                       <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">
//                         {patient.email || '—'}
//                       </td>
//                       <td className="py-3 px-4">
//                         <span className="text-foreground">{patient.age} yrs</span>
//                       </td>
//                       <td className="py-3 px-4">
//                         {appointment ? (
//                           <div className="flex flex-col gap-1">
//                             <StatusBadge status={appointment.status} />
//                             <p className="text-xs text-muted-foreground">
//                               {new Date(appointment.appointmentDate).toLocaleDateString()} at {appointment.appointmentTime}
//                             </p>
//                           </div>
//                         ) : (
//                           <span className="text-xs text-muted-foreground">No appointment</span>
//                         )}
//                       </td>
//                       <td className="py-3 px-4">
//                         <div className="flex items-center justify-end gap-2">
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => navigate(`/patients/${patient._id}`)}
//                           >
//                             <Eye className="w-4 h-4" />
//                             <span className="ml-1 hidden sm:inline">View</span>
//                           </Button>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => navigate(`/patients/${patient._id}?edit=true`)}
//                           >
//                             <Edit className="w-4 h-4" />
//                             <span className="ml-1 hidden sm:inline">Edit</span>
//                           </Button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {!loading && total > 0 && (
//           <div className="flex items-center justify-between">
//             <p className="text-sm text-muted-foreground">
//               Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
//               {Math.min(currentPage * ITEMS_PER_PAGE, total)} of {total} patients
//             </p>
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                 disabled={currentPage === 1 || loading}
//               >
//                 <ChevronLeft className="w-4 h-4" />
//               </Button>
//               <span className="text-sm text-muted-foreground px-2">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                 disabled={currentPage === totalPages || loading}
//               >
//                 <ChevronRight className="w-4 h-4" />
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </AdminLayout>
//   );
// }  


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { patientService } from '@/api/patientService';
import { toast } from '@/hooks/use-toast';
import { Search, Eye, Edit, ChevronLeft, ChevronRight, Loader2, UserPlus, Calendar, Phone, Mail, User, Clock } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

interface Patient {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  disease?: string;
  symptoms?: string[];
  medicalHistory?: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  isWalkIn: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Patients() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPatients();
  }, [currentPage]);

  useEffect(() => {
    // Reset to page 1 when filters change
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await patientService.getPatients({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        search: searchQuery,
        status: statusFilter !== 'all' ? statusFilter : undefined
      });
      
      console.log('Patients response:', response); // Debug log
      
      if (response.success) {
        setPatients(response.data || []);
        setTotal(response.pagination?.total || response.data?.length || 0);
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to fetch patients',
          variant: 'destructive',
        });
        setPatients([]);
        setTotal(0);
      }
    } catch (error: any) {
      console.error('Fetch patients error:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Network error',
        variant: 'destructive',
      });
      setPatients([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchPatients();
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCurrentPage(1);
    fetchPatients();
  };

  const handleWalkInClick = () => {
    navigate('/walkin');
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return 'N/A';
    
    try {
      if (timeString.includes(':')) {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes.padStart(2, '0')} ${ampm}`;
      }
      return timeString;
    } catch {
      return timeString;
    }
  };

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">Patients</h1>
            <p className="page-subtitle">Manage all registered patients and their appointments</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={fetchPatients}
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span className="ml-2">Refresh</span>
            </Button>
            <Button onClick={handleWalkInClick}>
              <UserPlus className="w-4 h-4 mr-2" />
              Walk-in Patient
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10"
              disabled={loading}
            />
          </div>
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
            disabled={loading}
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button onClick={handleSearch} disabled={loading}>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button 
              variant="outline" 
              onClick={handleClearFilters}
              disabled={loading}
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Stats */}
        {!loading && patients.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">Total Patients</p>
              <p className="text-2xl font-bold">{patients.length}</p>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {patients.filter(p => p.status === 'pending').length}
              </p>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">Confirmed</p>
              <p className="text-2xl font-bold text-blue-600">
                {patients.filter(p => p.status === 'confirmed').length}
              </p>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">Walk-in</p>
              <p className="text-2xl font-bold text-green-600">
                {patients.filter(p => p.isWalkIn).length}
              </p>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="data-table overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Patient
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Contact
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Appointment
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                    <p className="mt-2 text-muted-foreground">Loading patients...</p>
                  </td>
                </tr>
              ) : patients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <User className="w-12 h-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-2">No patients found</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {searchQuery || statusFilter !== 'all' 
                          ? 'Try changing your search or filters' 
                          : 'No patients registered yet'}
                      </p>
                      <Button 
                        variant="outline" 
                        className="mb-2"
                        onClick={handleWalkInClick}
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Register First Patient
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={handleClearFilters}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : (
                patients.map((patient) => (
                  <tr key={patient._id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-foreground">{patient.name}</p>
                        <div className="text-sm text-muted-foreground">
                          <span className="md:hidden">{patient.phone}</span>
                          <span className="hidden md:inline">
                            {patient.age} yrs • {patient.gender}
                          </span>
                        </div>
                        {patient.isWalkIn && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                            Walk-in
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">
                      <div>
                        <p className="mb-1">{patient.phone}</p>
                        {patient.email && (
                          <p className="text-sm truncate max-w-[200px]">{patient.email}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {patient.appointmentDate ? (
                        <div>
                          <p className="text-foreground font-medium">
                            {formatDate(patient.appointmentDate)}
                          </p>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(patient.appointmentTime)}
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">No appointment</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={patient.status} />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/patients/${patient._id}`)}
                          disabled={loading}
                        >
                          <Eye className="w-4 h-4" />
                          <span className="ml-1 hidden sm:inline">View</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/patients/${patient._id}?edit=true`)}
                          disabled={loading}
                        >
                          <Edit className="w-4 h-4" />
                          <span className="ml-1 hidden sm:inline">Edit</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && total > 0 && totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
              {Math.min(currentPage * ITEMS_PER_PAGE, total)} of {total} patients
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1 || loading}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground px-2">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || loading}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}