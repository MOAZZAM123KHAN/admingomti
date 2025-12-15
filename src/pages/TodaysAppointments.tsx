// // import { useState, useEffect, useMemo } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { AdminLayout } from '@/components/layout/AdminLayout';
// // import { Button } from '@/components/ui/button';
// // import { StatusBadge } from '@/components/ui/StatusBadge';
// // import { getAppointments, updateAppointment, Appointment } from '@/lib/mockData';
// // import { toast } from '@/hooks/use-toast';
// // import { Eye, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

// // export default function TodaysAppointments() {
// //   const navigate = useNavigate();
// //   const [appointments, setAppointments] = useState<Appointment[]>([]);
// //   const today = new Date().toISOString().split('T')[0];

// //   useEffect(() => {
// //     setAppointments(getAppointments());
// //   }, []);

// //   const todaysAppointments = useMemo(() => {
// //     return appointments
// //       .filter(a => a.date === today)
// //       .sort((a, b) => a.time.localeCompare(b.time));
// //   }, [appointments, today]);

// //   const isOverdue = (time: string, status: string) => {
// //     if (status === 'completed' || status === 'cancelled') return false;
// //     const [hours, minutes] = time.split(':').map(Number);
// //     const appointmentTime = new Date();
// //     appointmentTime.setHours(hours, minutes, 0);
// //     return new Date() > appointmentTime;
// //   };

// //   const handleQuickStatusUpdate = (appointment: Appointment, newStatus: Appointment['status']) => {
// //     const updated = updateAppointment(appointment.id, { status: newStatus });
// //     if (updated) {
// //       setAppointments(getAppointments());
// //       toast({
// //         title: 'Status Updated',
// //         description: `Appointment marked as ${newStatus}.`,
// //       });
// //     }
// //   };

// //   const pendingCount = todaysAppointments.filter(a => a.status === 'pending').length;
// //   const confirmedCount = todaysAppointments.filter(a => a.status === 'confirmed').length;
// //   const completedCount = todaysAppointments.filter(a => a.status === 'completed').length;

// //   return (
// //     <AdminLayout>
// //       <div className="space-y-6">
// //         {/* Header */}
// //         <div className="page-header">
// //           <h1 className="page-title">Today's Appointments</h1>
// //           <p className="page-subtitle">
// //             {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
// //           </p>
// //         </div>

// //         {/* Summary Cards */}
// //         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
// //           <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
// //             <p className="text-sm text-muted-foreground">Total Today</p>
// //             <p className="text-2xl font-bold text-foreground">{todaysAppointments.length}</p>
// //           </div>
// //           <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
// //             <p className="text-sm text-warning">Pending</p>
// //             <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
// //           </div>
// //           <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
// //             <p className="text-sm text-info">Confirmed</p>
// //             <p className="text-2xl font-bold text-foreground">{confirmedCount}</p>
// //           </div>
// //           <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
// //             <p className="text-sm text-success">Completed</p>
// //             <p className="text-2xl font-bold text-foreground">{completedCount}</p>
// //           </div>
// //         </div>

// //         {/* Appointments List */}
// //         <div className="space-y-4">
// //           {todaysAppointments.length === 0 ? (
// //             <div className="bg-card rounded-xl p-12 border border-border text-center">
// //               <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
// //               <p className="text-muted-foreground">No appointments scheduled for today.</p>
// //             </div>
// //           ) : (
// //             todaysAppointments.map((appointment) => {
// //               const overdue = isOverdue(appointment.time, appointment.status);
// //               return (
// //                 <div
// //                   key={appointment.id}
// //                   className={`bg-card rounded-xl p-4 md:p-6 border shadow-sm transition-all ${
// //                     overdue ? 'border-destructive/50 bg-destructive/5' : 'border-border'
// //                   }`}
// //                 >
// //                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
// //                     <div className="flex items-start gap-4">
// //                       <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
// //                         overdue ? 'bg-destructive/10' : 'bg-primary/10'
// //                       }`}>
// //                         {overdue ? (
// //                           <AlertTriangle className="w-6 h-6 text-destructive" />
// //                         ) : (
// //                           <Clock className="w-6 h-6 text-primary" />
// //                         )}
// //                       </div>
// //                       <div>
// //                         <div className="flex items-center gap-2 flex-wrap">
// //                           <h3 className="font-semibold text-foreground">{appointment.patientName}</h3>
// //                           <StatusBadge status={appointment.status} />
// //                           {overdue && (
// //                             <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
// //                               Overdue
// //                             </span>
// //                           )}
// //                         </div>
// //                         <p className="text-sm text-muted-foreground mt-1">
// //                           {appointment.patientPhone} • {appointment.time}
// //                         </p>
// //                       </div>
// //                     </div>
                    
// //                     <div className="flex items-center gap-2 flex-wrap">
// //                       {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
// //                         <>
// //                           {appointment.status === 'pending' && (
// //                             <Button
// //                               size="sm"
// //                               variant="outline"
// //                               className="text-info border-info/30 hover:bg-info/10"
// //                               onClick={() => handleQuickStatusUpdate(appointment, 'confirmed')}
// //                             >
// //                               <CheckCircle className="w-4 h-4 mr-1" />
// //                               Confirm
// //                             </Button>
// //                           )}
// //                           <Button
// //                             size="sm"
// //                             variant="outline"
// //                             className="text-success border-success/30 hover:bg-success/10"
// //                             onClick={() => handleQuickStatusUpdate(appointment, 'completed')}
// //                           >
// //                             <CheckCircle className="w-4 h-4 mr-1" />
// //                             Complete
// //                           </Button>
// //                           <Button
// //                             size="sm"
// //                             variant="outline"
// //                             className="text-destructive border-destructive/30 hover:bg-destructive/10"
// //                             onClick={() => handleQuickStatusUpdate(appointment, 'cancelled')}
// //                           >
// //                             <XCircle className="w-4 h-4 mr-1" />
// //                             Cancel
// //                           </Button>
// //                         </>
// //                       )}
// //                       <Button
// //                         size="sm"
// //                         variant="ghost"
// //                         onClick={() => navigate(`/patients/${appointment.patientId}`)}
// //                       >
// //                         <Eye className="w-4 h-4 mr-1" />
// //                         View
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               );
// //             })
// //           )}
// //         </div>
// //       </div>
// //     </AdminLayout>
// //   );
// // }


// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AdminLayout } from '@/components/layout/AdminLayout';
// import { Button } from '@/components/ui/button';
// import { StatusBadge } from '@/components/ui/StatusBadge';
// import { appointmentService } from '@/api/appointmentService';
// import { toast } from '@/hooks/use-toast';
// import { Eye, CheckCircle, XCircle, Clock, AlertTriangle, Loader2, RefreshCw } from 'lucide-react';

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

// export default function TodaysAppointments() {
//   const navigate = useNavigate();
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState<string | null>(null); // Track which appointment is being updated

//   useEffect(() => {
//     fetchTodayAppointments();
//   }, []);

//   const fetchTodayAppointments = async () => {
//     try {
//       setLoading(true);
//       const response = await appointmentService.getTodayAppointments();
      
//       if (response.success) {
//         setAppointments(response.data?.appointments || []);
//       } else {
//         toast({
//           title: 'Error',
//           description: response.message || 'Failed to fetch today\'s appointments',
//           variant: 'destructive',
//         });
//       }
//     } catch (error: any) {
//       console.error('Fetch today appointments error:', error);
//       toast({
//         title: 'Error',
//         description: error.response?.data?.message || 'Network error',
//         variant: 'destructive',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isOverdue = (time: string, status: string) => {
//     if (status === 'completed' || status === 'cancelled') return false;
    
//     try {
//       const [hours, minutes] = time.split(':').map(Number);
//       const now = new Date();
//       const appointmentTime = new Date();
//       appointmentTime.setHours(hours, minutes, 0, 0);
      
//       return now > appointmentTime;
//     } catch {
//       return false;
//     }
//   };

//   const handleQuickStatusUpdate = async (appointment: Appointment, newStatus: Appointment['status']) => {
//     try {
//       setUpdating(appointment._id);
      
//       const response = await appointmentService.updateStatus(appointment._id, {
//         status: newStatus,
//         notes: `Status changed to ${newStatus} from today's appointments page`
//       });
      
//       if (response.success) {
//         // Update local state
//         setAppointments(prev => prev.map(app => 
//           app._id === appointment._id 
//             ? { ...app, status: newStatus }
//             : app
//         ));
        
//         toast({
//           title: 'Status Updated',
//           description: `Appointment marked as ${newStatus}.`,
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
//       setUpdating(null);
//     }
//   };

//   // Calculate counts
//   const pendingCount = appointments.filter(a => a.status === 'pending').length;
//   const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;
//   const completedCount = appointments.filter(a => a.status === 'completed').length;

//   // Format today's date
//   const today = new Date();
//   const formattedDate = today.toLocaleDateString('en-IN', { 
//     weekday: 'long', 
//     year: 'numeric', 
//     month: 'long', 
//     day: 'numeric' 
//   });

//   return (
//     <AdminLayout>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="page-title">Today's Appointments</h1>
//             <p className="page-subtitle">{formattedDate}</p>
//           </div>
//           <Button 
//             variant="outline" 
//             onClick={fetchTodayAppointments}
//             disabled={loading}
//           >
//             {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
//             <span className="ml-2">Refresh</span>
//           </Button>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
//             <p className="text-sm text-muted-foreground">Total Today</p>
//             <p className="text-2xl font-bold text-foreground">{appointments.length}</p>
//           </div>
//           <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
//             <p className="text-sm text-warning">Pending</p>
//             <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
//           </div>
//           <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
//             <p className="text-sm text-info">Confirmed</p>
//             <p className="text-2xl font-bold text-foreground">{confirmedCount}</p>
//           </div>
//           <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
//             <p className="text-sm text-success">Completed</p>
//             <p className="text-2xl font-bold text-foreground">{completedCount}</p>
//           </div>
//         </div>

//         {/* Appointments List */}
//         <div className="space-y-4">
//           {loading ? (
//             <div className="bg-card rounded-xl p-12 border border-border text-center">
//               <Loader2 className="w-12 h-12 mx-auto text-primary animate-spin mb-4" />
//               <p className="text-muted-foreground">Loading today's appointments...</p>
//             </div>
//           ) : appointments.length === 0 ? (
//             <div className="bg-card rounded-xl p-12 border border-border text-center">
//               <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
//               <p className="text-muted-foreground">No appointments scheduled for today.</p>
//               <Button 
//                 variant="outline" 
//                 className="mt-4"
//                 onClick={fetchTodayAppointments}
//               >
//                 <RefreshCw className="w-4 h-4 mr-2" />
//                 Refresh
//               </Button>
//             </div>
//           ) : (
//             appointments
//               .sort((a, b) => a.appointmentTime.localeCompare(b.appointmentTime))
//               .map((appointment) => {
//                 const overdue = isOverdue(appointment.appointmentTime, appointment.status);
//                 const isUpdating = updating === appointment._id;
                
//                 return (
//                   <div
//                     key={appointment._id}
//                     className={`bg-card rounded-xl p-4 md:p-6 border shadow-sm transition-all ${
//                       overdue ? 'border-destructive/50 bg-destructive/5' : 'border-border'
//                     } ${isUpdating ? 'opacity-70' : ''}`}
//                   >
//                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                       <div className="flex items-start gap-4">
//                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
//                           overdue ? 'bg-destructive/10' : 'bg-primary/10'
//                         }`}>
//                           {overdue ? (
//                             <AlertTriangle className="w-6 h-6 text-destructive" />
//                           ) : (
//                             <Clock className="w-6 h-6 text-primary" />
//                           )}
//                         </div>
//                         <div>
//                           <div className="flex items-center gap-2 flex-wrap">
//                             <h3 className="font-semibold text-foreground">{appointment.patientName}</h3>
//                             <StatusBadge status={appointment.status} />
//                             {overdue && (
//                               <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
//                                 Overdue
//                               </span>
//                             )}
//                           </div>
//                           <p className="text-sm text-muted-foreground mt-1">
//                             {appointment.patientPhone} • {appointment.appointmentTime}
//                           </p>
//                           {appointment.patientEmail && (
//                             <p className="text-sm text-muted-foreground mt-1">{appointment.patientEmail}</p>
//                           )}
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-2 flex-wrap">
//                         {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
//                           <>
//                             {appointment.status === 'pending' && (
//                               <Button
//                                 size="sm"
//                                 variant="outline"
//                                 className="text-info border-info/30 hover:bg-info/10"
//                                 onClick={() => handleQuickStatusUpdate(appointment, 'confirmed')}
//                                 disabled={isUpdating}
//                               >
//                                 {isUpdating ? (
//                                   <Loader2 className="w-4 h-4 mr-1 animate-spin" />
//                                 ) : (
//                                   <CheckCircle className="w-4 h-4 mr-1" />
//                                 )}
//                                 Confirm
//                               </Button>
//                             )}
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               className="text-success border-success/30 hover:bg-success/10"
//                               onClick={() => handleQuickStatusUpdate(appointment, 'completed')}
//                               disabled={isUpdating}
//                             >
//                               {isUpdating ? (
//                                 <Loader2 className="w-4 h-4 mr-1 animate-spin" />
//                               ) : (
//                                 <CheckCircle className="w-4 h-4 mr-1" />
//                               )}
//                               Complete
//                             </Button>
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               className="text-destructive border-destructive/30 hover:bg-destructive/10"
//                               onClick={() => handleQuickStatusUpdate(appointment, 'cancelled')}
//                               disabled={isUpdating}
//                             >
//                               {isUpdating ? (
//                                 <Loader2 className="w-4 h-4 mr-1 animate-spin" />
//                               ) : (
//                                 <XCircle className="w-4 h-4 mr-1" />
//                               )}
//                               Cancel
//                             </Button>
//                           </>
//                         )}
//                         <Button
//                           size="sm"
//                           variant="ghost"
//                           onClick={() => navigate(`/patients/${appointment.patientId}`)}
//                           disabled={isUpdating}
//                         >
//                           <Eye className="w-4 h-4 mr-1" />
//                           View
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })
//           )}
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { appointmentService } from '@/api/appointmentService';
import { toast } from '@/hooks/use-toast';
import { Eye, CheckCircle, XCircle, Clock, AlertTriangle, Loader2, RefreshCw, User, Phone, CalendarDays, Calendar } from 'lucide-react';

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

export default function TodaysAppointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null); // Track which appointment is being updated

  useEffect(() => {
    fetchTodayAppointments();
  }, []);

  const fetchTodayAppointments = async () => {
    try {
      setLoading(true);
      const response = await appointmentService.getTodayAppointments();
      
      console.log('Today appointments response:', response); // Debug log
      
      if (response.success) {
        setAppointments(response.data || []);
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to fetch today\'s appointments',
          variant: 'destructive',
        });
        setAppointments([]);
      }
    } catch (error: any) {
      console.error('Fetch today appointments error:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Network error',
        variant: 'destructive',
      });
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const isOverdue = (time: string, status: string) => {
    if (status === 'completed' || status === 'cancelled') return false;
    
    try {
      const [hours, minutes] = time.split(':').map(Number);
      const now = new Date();
      const appointmentTime = new Date();
      appointmentTime.setHours(hours, minutes, 0, 0);
      
      return now > appointmentTime;
    } catch {
      return false;
    }
  };

  const handleQuickStatusUpdate = async (appointment: Appointment, newStatus: Appointment['status']) => {
    try {
      setUpdating(appointment._id);
      
      const response = await appointmentService.updateAppointmentStatus(appointment._id, {
        status: newStatus,
        notes: `Status changed to ${newStatus} from today's appointments page`
      });
      
      console.log('Update status response:', response); // Debug log
      
      if (response.success) {
        // Update local state
        setAppointments(prev => prev.map(app => 
          app._id === appointment._id 
            ? { ...app, status: newStatus }
            : app
        ));
        
        toast({
          title: 'Status Updated',
          description: `Appointment marked as ${newStatus}.`,
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
      setUpdating(null);
    }
  };

  // Calculate counts
  const pendingCount = appointments.filter(a => a.status === 'pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;
  const completedCount = appointments.filter(a => a.status === 'completed').length;
  const cancelledCount = appointments.filter(a => a.status === 'cancelled').length;
  const walkInCount = appointments.filter(a => a.isWalkIn).length;

  // Format today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-IN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Format time for display
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">Today's Appointments</h1>
            <p className="page-subtitle">{formattedDate}</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate('/appointments')}
            >
              <Calendar className="w-4 h-4 mr-2" />
              All Appointments
            </Button>
            <Button 
              variant="outline" 
              onClick={fetchTodayAppointments}
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              <span className="ml-2">Refresh</span>
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
            <p className="text-2xl font-bold text-foreground mt-2">{appointments.length}</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-600" />
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
            <p className="text-2xl font-bold text-foreground mt-2">{pendingCount}</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <p className="text-sm text-muted-foreground">Confirmed</p>
            </div>
            <p className="text-2xl font-bold text-foreground mt-2">{confirmedCount}</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <p className="text-2xl font-bold text-foreground mt-2">{completedCount}</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-600" />
              <p className="text-sm text-muted-foreground">Cancelled</p>
            </div>
            <p className="text-2xl font-bold text-foreground mt-2">{cancelledCount}</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-purple-600" />
              <p className="text-sm text-muted-foreground">Walk-in</p>
            </div>
            <p className="text-2xl font-bold text-foreground mt-2">{walkInCount}</p>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {loading ? (
            <div className="bg-card rounded-xl p-12 border border-border text-center">
              <Loader2 className="w-12 h-12 mx-auto text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Loading today's appointments...</p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="bg-card rounded-xl p-12 border border-border text-center">
              <CalendarDays className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-lg mb-2">No appointments for today</p>
              <p className="text-sm text-muted-foreground mb-6">
                All appointments for {formattedDate} have been completed or none are scheduled.
              </p>
              <div className="flex gap-3 justify-center">
                <Button 
                  variant="outline" 
                  onClick={fetchTodayAppointments}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                <Button 
                  onClick={() => navigate('/walkin')}
                >
                  <User className="w-4 h-4 mr-2" />
                  Register Walk-in
                </Button>
              </div>
            </div>
          ) : (
            appointments
              .sort((a, b) => a.appointmentTime.localeCompare(b.appointmentTime))
              .map((appointment) => {
                const overdue = isOverdue(appointment.appointmentTime, appointment.status);
                const isUpdating = updating === appointment._id;
                
                return (
                  <div
                    key={appointment._id}
                    className={`bg-card rounded-xl p-4 md:p-5 border shadow-sm transition-all ${
                      overdue ? 'border-destructive/50 bg-destructive/5' : 'border-border'
                    } ${isUpdating ? 'opacity-70' : ''}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          overdue ? 'bg-destructive/10' : appointment.isWalkIn ? 'bg-blue-100' : 'bg-primary/10'
                        }`}>
                          {overdue ? (
                            <AlertTriangle className="w-6 h-6 text-destructive" />
                          ) : appointment.isWalkIn ? (
                            <User className="w-6 h-6 text-blue-600" />
                          ) : (
                            <CalendarDays className="w-6 h-6 text-primary" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-semibold text-foreground truncate">{appointment.name}</h3>
                            <StatusBadge status={appointment.status} />
                            {appointment.isWalkIn && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                Walk-in
                              </span>
                            )}
                            {overdue && (
                              <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
                                Overdue
                              </span>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3 text-muted-foreground" />
                              <span className="text-muted-foreground">{appointment.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span className="text-muted-foreground font-medium">{formatTime(appointment.appointmentTime)}</span>
                            </div>
                            <div className="text-muted-foreground">
                              {appointment.age} yrs • {appointment.gender}
                            </div>
                            {appointment.email && (
                              <div className="text-muted-foreground truncate">
                                {appointment.email}
                              </div>
                            )}
                          </div>
                          
                          {appointment.disease && (
                            <div className="mt-2">
                              <p className="text-sm text-muted-foreground">
                                <span className="font-medium">Reason:</span> {appointment.disease}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center gap-2 flex-shrink-0">
                        {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                          <div className="flex flex-wrap gap-2">
                            {appointment.status === 'pending' && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                onClick={() => handleQuickStatusUpdate(appointment, 'confirmed')}
                                disabled={isUpdating}
                              >
                                {isUpdating ? (
                                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                ) : (
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                )}
                                Confirm
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 border-green-200 hover:bg-green-50"
                              onClick={() => handleQuickStatusUpdate(appointment, 'completed')}
                              disabled={isUpdating}
                            >
                              {isUpdating ? (
                                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                              ) : (
                                <CheckCircle className="w-3 h-3 mr-1" />
                              )}
                              Complete
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => handleQuickStatusUpdate(appointment, 'cancelled')}
                              disabled={isUpdating}
                            >
                              {isUpdating ? (
                                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                              ) : (
                                <XCircle className="w-3 h-3 mr-1" />
                              )}
                              Cancel
                            </Button>
                          </div>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigate(`/patients/${appointment._id}`)}
                          disabled={isUpdating}
                          className="mt-2 sm:mt-0 md:mt-2 lg:mt-0"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View Patient
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </AdminLayout>
  );
}