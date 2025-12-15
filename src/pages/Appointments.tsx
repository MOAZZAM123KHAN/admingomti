// // import { useState, useEffect, useMemo } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { AdminLayout } from '@/components/layout/AdminLayout';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// // import { Label } from '@/components/ui/label';
// // import { Textarea } from '@/components/ui/textarea';
// // import { StatusBadge } from '@/components/ui/StatusBadge';
// // import { getAppointments, updateAppointment, Appointment } from '@/lib/mockData';
// // import { toast } from '@/hooks/use-toast';
// // import { Search, Eye, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

// // const ITEMS_PER_PAGE = 10;

// // export default function Appointments() {
// //   const navigate = useNavigate();
// //   const [appointments, setAppointments] = useState<Appointment[]>([]);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [statusFilter, setStatusFilter] = useState<string>('all');
// //   const [dateFrom, setDateFrom] = useState('');
// //   const [dateTo, setDateTo] = useState('');
// //   const [currentPage, setCurrentPage] = useState(1);
  
// //   const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
// //   const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
// //   const [newStatus, setNewStatus] = useState<Appointment['status']>('pending');
// //   const [statusNotes, setStatusNotes] = useState('');

// //   useEffect(() => {
// //     setAppointments(getAppointments());
// //   }, []);

// //   const filteredAppointments = useMemo(() => {
// //     return appointments.filter(appointment => {
// //       const matchesSearch = 
// //         appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         appointment.patientPhone.includes(searchQuery);
      
// //       if (!matchesSearch) return false;
      
// //       if (statusFilter !== 'all' && appointment.status !== statusFilter) return false;
      
// //       if (dateFrom && appointment.date < dateFrom) return false;
// //       if (dateTo && appointment.date > dateTo) return false;
      
// //       return true;
// //     }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
// //   }, [appointments, searchQuery, statusFilter, dateFrom, dateTo]);

// //   const totalPages = Math.ceil(filteredAppointments.length / ITEMS_PER_PAGE);
// //   const paginatedAppointments = filteredAppointments.slice(
// //     (currentPage - 1) * ITEMS_PER_PAGE,
// //     currentPage * ITEMS_PER_PAGE
// //   );

// //   useEffect(() => {
// //     setCurrentPage(1);
// //   }, [searchQuery, statusFilter, dateFrom, dateTo]);

// //   const handleOpenStatusModal = (appointment: Appointment) => {
// //     setSelectedAppointment(appointment);
// //     setNewStatus(appointment.status);
// //     setStatusNotes(appointment.notes);
// //     setIsStatusModalOpen(true);
// //   };

// //   const handleUpdateStatus = () => {
// //     if (!selectedAppointment) return;
    
// //     const updated = updateAppointment(selectedAppointment.id, {
// //       status: newStatus,
// //       notes: statusNotes,
// //     });
    
// //     if (updated) {
// //       setAppointments(getAppointments());
// //       setIsStatusModalOpen(false);
// //       toast({
// //         title: 'Success',
// //         description: 'Appointment status updated successfully.',
// //       });
// //     }
// //   };

// //   return (
// //     <AdminLayout>
// //       <div className="space-y-6">
// //         {/* Header */}
// //         <div className="page-header">
// //           <h1 className="page-title">All Appointments</h1>
// //           <p className="page-subtitle">View and manage all scheduled appointments</p>
// //         </div>

// //         {/* Filters */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// //           <div className="relative">
// //             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
// //             <Input
// //               placeholder="Search patient..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               className="pl-10"
// //             />
// //           </div>
          
// //           <Select value={statusFilter} onValueChange={setStatusFilter}>
// //             <SelectTrigger>
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
          
// //           <Input
// //             type="date"
// //             placeholder="From date"
// //             value={dateFrom}
// //             onChange={(e) => setDateFrom(e.target.value)}
// //           />
          
// //           <Input
// //             type="date"
// //             placeholder="To date"
// //             value={dateTo}
// //             onChange={(e) => setDateTo(e.target.value)}
// //           />
// //         </div>

// //         {/* Table */}
// //         <div className="data-table overflow-x-auto">
// //           <table className="w-full">
// //             <thead>
// //               <tr className="border-b border-border bg-muted/50">
// //                 <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Patient</th>
// //                 <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Phone</th>
// //                 <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date & Time</th>
// //                 <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
// //                 <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-border">
// //               {paginatedAppointments.map((appointment) => (
// //                 <tr key={appointment.id} className="hover:bg-muted/30 transition-colors">
// //                   <td className="py-3 px-4">
// //                     <p className="font-medium text-foreground">{appointment.patientName}</p>
// //                     <p className="text-sm text-muted-foreground md:hidden">{appointment.patientPhone}</p>
// //                   </td>
// //                   <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">
// //                     {appointment.patientPhone}
// //                   </td>
// //                   <td className="py-3 px-4">
// //                     <p className="text-foreground">{new Date(appointment.date).toLocaleDateString()}</p>
// //                     <p className="text-sm text-muted-foreground">{appointment.time}</p>
// //                   </td>
// //                   <td className="py-3 px-4">
// //                     <StatusBadge status={appointment.status} />
// //                   </td>
// //                   <td className="py-3 px-4">
// //                     <div className="flex items-center justify-end gap-2">
// //                       <Button
// //                         variant="ghost"
// //                         size="sm"
// //                         onClick={() => handleOpenStatusModal(appointment)}
// //                       >
// //                         <RefreshCw className="w-4 h-4" />
// //                         <span className="ml-1 hidden sm:inline">Status</span>
// //                       </Button>
// //                       <Button
// //                         variant="ghost"
// //                         size="sm"
// //                         onClick={() => navigate(`/patients/${appointment.patientId}`)}
// //                       >
// //                         <Eye className="w-4 h-4" />
// //                         <span className="ml-1 hidden sm:inline">View</span>
// //                       </Button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>

// //           {paginatedAppointments.length === 0 && (
// //             <div className="py-12 text-center">
// //               <p className="text-muted-foreground">No appointments found matching your criteria.</p>
// //             </div>
// //           )}
// //         </div>

// //         {/* Pagination */}
// //         {totalPages > 1 && (
// //           <div className="flex items-center justify-between">
// //             <p className="text-sm text-muted-foreground">
// //               Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredAppointments.length)} of {filteredAppointments.length} appointments
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

// //       {/* Status Update Modal */}
// //       <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
// //         <DialogContent>
// //           <DialogHeader>
// //             <DialogTitle>Update Appointment Status</DialogTitle>
// //           </DialogHeader>
          
// //           <div className="space-y-4 py-4">
// //             <div className="space-y-2">
// //               <Label>Patient</Label>
// //               <p className="text-foreground font-medium">{selectedAppointment?.patientName}</p>
// //             </div>
            
// //             <div className="space-y-2">
// //               <Label>Current Status</Label>
// //               <div>
// //                 {selectedAppointment && <StatusBadge status={selectedAppointment.status} />}
// //               </div>
// //             </div>
            
// //             <div className="space-y-2">
// //               <Label htmlFor="newStatus">New Status</Label>
// //               <Select value={newStatus} onValueChange={(v: Appointment['status']) => setNewStatus(v)}>
// //                 <SelectTrigger>
// //                   <SelectValue placeholder="Select status" />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   <SelectItem value="pending">Pending</SelectItem>
// //                   <SelectItem value="confirmed">Confirmed</SelectItem>
// //                   <SelectItem value="completed">Completed</SelectItem>
// //                   <SelectItem value="cancelled">Cancelled</SelectItem>
// //                 </SelectContent>
// //               </Select>
// //             </div>
            
// //             <div className="space-y-2">
// //               <Label htmlFor="notes">Notes / Comments</Label>
// //               <Textarea
// //                 id="notes"
// //                 value={statusNotes}
// //                 onChange={(e) => setStatusNotes(e.target.value)}
// //                 placeholder="Add any notes about this status update..."
// //                 rows={3}
// //               />
// //             </div>
// //           </div>
          
// //           <DialogFooter>
// //             <Button variant="outline" onClick={() => setIsStatusModalOpen(false)}>
// //               Cancel
// //             </Button>
// //             <Button onClick={handleUpdateStatus}>
// //               Update Status
// //             </Button>
// //           </DialogFooter>
// //         </DialogContent>
// //       </Dialog>
// //     </AdminLayout>
// //   );
// // }


// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AdminLayout } from '@/components/layout/AdminLayout';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { StatusBadge } from '@/components/ui/StatusBadge';
// import { appointmentService } from '@/api/appointmentService';
// import { toast } from '@/hooks/use-toast';
// import { Search, Eye, RefreshCw, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

// const ITEMS_PER_PAGE = 10;

// interface Appointment {
//   _id: string;
//   patientName: string;
//   patientPhone: string;
//   patientEmail?: string;
//   appointmentDate: string;
//   appointmentTime: string;
//   status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
//   notes?: string;
//   createdAt: string;
//   updatedAt: string;
//   patientId: string;
// }

// export default function Appointments() {
//   const navigate = useNavigate();
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState<string>('all');
//   const [dateFrom, setDateFrom] = useState('');
//   const [dateTo, setDateTo] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
  
//   const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
//   const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
//   const [newStatus, setNewStatus] = useState<Appointment['status']>('pending');
//   const [statusNotes, setStatusNotes] = useState('');
//   const [updating, setUpdating] = useState(false);

//   useEffect(() => {
//     fetchAppointments();
//   }, [currentPage, statusFilter, dateFrom, dateTo]);

//   const fetchAppointments = async () => {
//     try {
//       setLoading(true);
//       const response = await appointmentService.getAppointments({
//         page: currentPage,
//         limit: ITEMS_PER_PAGE,
//         search: searchQuery,
//         status: statusFilter,
//         dateFrom,
//         dateTo
//       });
      
//       if (response.success) {
//         setAppointments(response.data?.appointments || []);
//         setTotal(response.data?.total || 0);
//       } else {
//         toast({
//           title: 'Error',
//           description: response.message || 'Failed to fetch appointments',
//           variant: 'destructive',
//         });
//       }
//     } catch (error: any) {
//       console.error('Fetch appointments error:', error);
//       toast({
//         title: 'Error',
//         description: error.response?.data?.message || 'Network error',
//         variant: 'destructive',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = () => {
//     setCurrentPage(1);
//     fetchAppointments();
//   };

//   const handleOpenStatusModal = (appointment: Appointment) => {
//     setSelectedAppointment(appointment);
//     setNewStatus(appointment.status);
//     setStatusNotes(appointment.notes || '');
//     setIsStatusModalOpen(true);
//   };

//   const handleUpdateStatus = async () => {
//     if (!selectedAppointment) return;
    
//     try {
//       setUpdating(true);
//       const response = await appointmentService.updateStatus(selectedAppointment._id, {
//         status: newStatus,
//         notes: statusNotes
//       });
      
//       if (response.success) {
//         // Update local state
//         setAppointments(prev => prev.map(app => 
//           app._id === selectedAppointment._id 
//             ? { ...app, status: newStatus, notes: statusNotes }
//             : app
//         ));
        
//         setIsStatusModalOpen(false);
//         toast({
//           title: 'Success',
//           description: 'Appointment status updated successfully.',
//         });
//       } else {
//         toast({
//           title: 'Error',
//           description: response.message || 'Failed to update status',
//           variant: 'destructive',
//         });
//       }
//     } catch (error: any) {
//       console.error('Update status error:', error);
//       toast({
//         title: 'Error',
//         description: error.response?.data?.message || 'Failed to update status',
//         variant: 'destructive',
//       });
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

//   return (
//     <AdminLayout>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="page-title">All Appointments</h1>
//             <p className="page-subtitle">View and manage all scheduled appointments</p>
//           </div>
//           <Button 
//             variant="outline" 
//             onClick={fetchAppointments}
//             disabled={loading}
//           >
//             {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
//             <span className="ml-2">Refresh</span>
//           </Button>
//         </div>

//         {/* Filters */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//             <Input
//               placeholder="Search patient..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//               className="pl-10"
//             />
//           </div>
          
//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger>
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
          
//           <Input
//             type="date"
//             placeholder="From date"
//             value={dateFrom}
//             onChange={(e) => setDateFrom(e.target.value)}
//           />
          
//           <Input
//             type="date"
//             placeholder="To date"
//             value={dateTo}
//             onChange={(e) => setDateTo(e.target.value)}
//           />
          
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
//                 <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Patient</th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Phone</th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date & Time</th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
//                 <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-border">
//               {loading ? (
//                 <tr>
//                   <td colSpan={5} className="py-12 text-center">
//                     <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
//                     <p className="mt-2 text-muted-foreground">Loading appointments...</p>
//                   </td>
//                 </tr>
//               ) : appointments.length === 0 ? (
//                 <tr>
//                   <td colSpan={5} className="py-12 text-center">
//                     <p className="text-muted-foreground">No appointments found.</p>
//                   </td>
//                 </tr>
//               ) : (
//                 appointments.map((appointment) => (
//                   <tr key={appointment._id} className="hover:bg-muted/30 transition-colors">
//                     <td className="py-3 px-4">
//                       <p className="font-medium text-foreground">{appointment.patientName}</p>
//                       <p className="text-sm text-muted-foreground md:hidden">{appointment.patientPhone}</p>
//                     </td>
//                     <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">
//                       {appointment.patientPhone}
//                     </td>
//                     <td className="py-3 px-4">
//                       <p className="text-foreground">
//                         {new Date(appointment.appointmentDate).toLocaleDateString('en-IN', {
//                           day: 'numeric',
//                           month: 'short',
//                           year: 'numeric'
//                         })}
//                       </p>
//                       <p className="text-sm text-muted-foreground">{appointment.appointmentTime}</p>
//                     </td>
//                     <td className="py-3 px-4">
//                       <StatusBadge status={appointment.status} />
//                     </td>
//                     <td className="py-3 px-4">
//                       <div className="flex items-center justify-end gap-2">
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => handleOpenStatusModal(appointment)}
//                         >
//                           <RefreshCw className="w-4 h-4" />
//                           <span className="ml-1 hidden sm:inline">Status</span>
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => navigate(`/patients/${appointment.patientId}`)}
//                         >
//                           <Eye className="w-4 h-4" />
//                           <span className="ml-1 hidden sm:inline">View</span>
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {!loading && total > 0 && (
//           <div className="flex items-center justify-between">
//             <p className="text-sm text-muted-foreground">
//               Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
//               {Math.min(currentPage * ITEMS_PER_PAGE, total)} of {total} appointments
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

//       {/* Status Update Modal */}
//       <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Update Appointment Status</DialogTitle>
//           </DialogHeader>
          
//           <div className="space-y-4 py-4">
//             <div className="space-y-2">
//               <Label>Patient</Label>
//               <p className="text-foreground font-medium">{selectedAppointment?.patientName}</p>
//             </div>
            
//             <div className="space-y-2">
//               <Label>Current Status</Label>
//               <div>
//                 {selectedAppointment && <StatusBadge status={selectedAppointment.status} />}
//               </div>
//             </div>
            
//             <div className="space-y-2">
//               <Label htmlFor="newStatus">New Status</Label>
//               <Select 
//                 value={newStatus} 
//                 onValueChange={(v: Appointment['status']) => setNewStatus(v)}
//                 disabled={updating}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="pending">Pending</SelectItem>
//                   <SelectItem value="confirmed">Confirmed</SelectItem>
//                   <SelectItem value="completed">Completed</SelectItem>
//                   <SelectItem value="cancelled">Cancelled</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
            
//             <div className="space-y-2">
//               <Label htmlFor="notes">Notes / Comments</Label>
//               <Textarea
//                 id="notes"
//                 value={statusNotes}
//                 onChange={(e) => setStatusNotes(e.target.value)}
//                 placeholder="Add any notes about this status update..."
//                 rows={3}
//                 disabled={updating}
//               />
//             </div>
//           </div>
          
//           <DialogFooter>
//             <Button 
//               variant="outline" 
//               onClick={() => setIsStatusModalOpen(false)}
//               disabled={updating}
//             >
//               Cancel
//             </Button>
//             <Button 
//               onClick={handleUpdateStatus}
//               disabled={updating}
//             >
//               {updating ? (
//                 <>
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                   Updating...
//                 </>
//               ) : (
//                 'Update Status'
//               )}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </AdminLayout>
//   );
// }

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { patientService } from '@/api/patientService';
import { appointmentService } from '@/api/appointmentService';
import { toast } from '@/hooks/use-toast';
import { Search, Eye, RefreshCw, ChevronLeft, ChevronRight, Loader2, Calendar, Phone, User, Clock, CalendarDays } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

interface Appointment {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  address?: string;
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

export default function Appointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [newStatus, setNewStatus] = useState<Appointment['status']>('pending');
  const [statusNotes, setStatusNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, [currentPage, statusFilter, dateFrom, dateTo]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      
      // If a specific date is selected, use the appointments by date endpoint
      if (dateFrom) {
        const response = await appointmentService.getAppointmentsByDate(
          dateFrom,
          statusFilter !== 'all' ? statusFilter : undefined
        );
        
        if (response.success) {
          setAppointments(response.data || []);
          setTotal(response.total || response.data?.length || 0);
        } else {
          toast({
            title: 'Error',
            description: response.message || 'Failed to fetch appointments',
            variant: 'destructive',
          });
          setAppointments([]);
          setTotal(0);
        }
      } else {
        // Otherwise, use patient service with filters
        const response = await patientService.getPatients({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          search: searchQuery,
          status: statusFilter !== 'all' ? statusFilter : undefined,
          startDate: dateFrom || undefined,
          endDate: dateTo || undefined
        });
        
        if (response.success) {
          // Filter patients who have appointmentDate (appointments)
          const patientsWithAppointments = (response.data || []).filter(
            (patient: any) => patient.appointmentDate
          );
          
          setAppointments(patientsWithAppointments);
          setTotal(response.pagination?.total || patientsWithAppointments.length || 0);
        } else {
          toast({
            title: 'Error',
            description: response.message || 'Failed to fetch appointments',
            variant: 'destructive',
          });
          setAppointments([]);
          setTotal(0);
        }
      }
    } catch (error: any) {
      console.error('Fetch appointments error:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Network error',
        variant: 'destructive',
      });
      setAppointments([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchAppointments();
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setDateFrom('');
    setDateTo('');
    setCurrentPage(1);
    setTimeout(() => fetchAppointments(), 100);
  };

  const handleOpenStatusModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setNewStatus(appointment.status);
    setStatusNotes(appointment.notes || '');
    setIsStatusModalOpen(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedAppointment) return;
    
    try {
      setUpdating(true);
      const response = await appointmentService.updateAppointmentStatus(selectedAppointment._id, {
        status: newStatus,
        notes: statusNotes
      });
      
      if (response.success) {
        // Update local state
        setAppointments(prev => prev.map(app => 
          app._id === selectedAppointment._id 
            ? { ...app, status: newStatus, notes: statusNotes }
            : app
        ));
        
        setIsStatusModalOpen(false);
        toast({
          title: 'Success',
          description: 'Appointment status updated successfully.',
        });
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to update status',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Update status error:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update status',
        variant: 'destructive',
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleViewPatient = (appointment: Appointment) => {
    if (appointment._id) {
      navigate(`/patients/${appointment._id}`);
    } else {
      toast({
        title: 'Error',
        description: 'Patient ID not found',
        variant: 'destructive',
      });
    }
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

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">Appointments</h1>
            <p className="page-subtitle">Manage patient appointments and schedules</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={fetchAppointments}
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              <span className="ml-2">Refresh</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => setDateFrom(getTodayDate())}
              disabled={loading}
            >
              <CalendarDays className="w-4 h-4 mr-2" />
              Today
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search patient..."
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
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          
          <Input
            type="date"
            placeholder="From date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            disabled={loading}
          />
          
          <Input
            type="date"
            placeholder="To date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            disabled={loading}
            min={dateFrom}
          />
          
          <div className="flex gap-2">
            <Button 
              onClick={handleSearch}
              disabled={loading}
              className="flex-1"
            >
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
        {!loading && appointments.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">{appointments.length}</p>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {appointments.filter(a => a.status === 'pending').length}
              </p>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">Confirmed</p>
              <p className="text-2xl font-bold text-blue-600">
                {appointments.filter(a => a.status === 'confirmed').length}
              </p>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {appointments.filter(a => a.status === 'completed').length}
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
                    <span>Patient</span>
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>Contact</span>
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Appointment</span>
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
                    <p className="mt-2 text-muted-foreground">Loading appointments...</p>
                  </td>
                </tr>
              ) : appointments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Calendar className="w-12 h-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-2">No appointments found</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {searchQuery || statusFilter !== 'all' || dateFrom || dateTo 
                          ? 'Try changing your filters' 
                          : 'No appointments scheduled yet'}
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={handleClearFilters}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : (
                appointments.map((appointment) => (
                  <tr key={appointment._id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-foreground">{appointment.name}</p>
                        <div className="text-sm text-muted-foreground">
                          <span className="md:hidden">{appointment.phone}</span>
                          <span className="hidden md:inline">
                            {appointment.age} yrs • {appointment.gender}
                          </span>
                        </div>
                        {appointment.isWalkIn && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                            Walk-in
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">
                      <div>
                        <p className="mb-1">{appointment.phone}</p>
                        {appointment.email && (
                          <p className="text-sm truncate max-w-[200px]">{appointment.email}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-foreground font-medium">
                          {formatDate(appointment.appointmentDate)}
                        </p>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(appointment.appointmentTime)}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={appointment.status} />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenStatusModal(appointment)}
                          title="Update Status"
                          disabled={loading}
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span className="ml-1 hidden sm:inline">Status</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewPatient(appointment)}
                          title="View Patient"
                          disabled={loading}
                        >
                          <Eye className="w-4 h-4" />
                          <span className="ml-1 hidden sm:inline">View</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination - Only show when using patient service (not date filter) */}
        {!dateFrom && !loading && total > 0 && totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
              {Math.min(currentPage * ITEMS_PER_PAGE, total)} of {total} appointments
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

        {/* Info message for date filter */}
        {dateFrom && !loading && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Showing appointments for {formatDate(dateFrom)}. To see all appointments, clear the date filter.
            </p>
          </div>
        )}
      </div>

      {/* Status Update Modal */}
      <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Appointment Status</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Patient Information</Label>
              <div className="space-y-1 p-3 bg-muted/30 rounded-lg">
                <p className="text-foreground font-medium">{selectedAppointment?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedAppointment?.phone} • {selectedAppointment?.age} yrs • {selectedAppointment?.gender}
                </p>
                {selectedAppointment?.isWalkIn && (
                  <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                    Walk-in Patient
                  </span>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Appointment Details</Label>
              <div className="space-y-1 p-3 bg-muted/30 rounded-lg">
                <p className="text-foreground">
                  {selectedAppointment && formatDate(selectedAppointment.appointmentDate)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedAppointment && formatTime(selectedAppointment.appointmentTime)}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Current Status</Label>
              <div>
                {selectedAppointment && <StatusBadge status={selectedAppointment.status} />}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newStatus">New Status</Label>
              <Select 
                value={newStatus} 
                onValueChange={(v: Appointment['status']) => setNewStatus(v)}
                disabled={updating}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes / Comments (Optional)</Label>
              <Textarea
                id="notes"
                value={statusNotes}
                onChange={(e) => setStatusNotes(e.target.value)}
                placeholder="Add any notes about this status update..."
                rows={3}
                disabled={updating}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsStatusModalOpen(false)}
              disabled={updating}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateStatus}
              disabled={updating || newStatus === selectedAppointment?.status}
            >
              {updating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Status'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}