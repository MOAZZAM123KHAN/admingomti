// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AdminLayout } from '@/components/layout/AdminLayout';
// import { StatCard } from '@/components/ui/StatCard';
// import { getDashboardStats, initializeMockData } from '@/lib/mockData';
// import { Users, CalendarClock, Clock, CheckCircle } from 'lucide-react';

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const [stats, setStats] = useState({
//     totalPatients: 0,
//     todaysPatients: 0,
//     pendingAppointments: 0,
//     confirmedAppointments: 0,
//   });

//   useEffect(() => {
//     initializeMockData();
//     setStats(getDashboardStats());
//   }, []);

//   return (
//     <AdminLayout>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="page-header">
//           <h1 className="page-title">Dashboard</h1>
//           <p className="page-subtitle">Welcome back! Here's an overview of your hospital today.</p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//           <StatCard
//             title="Total Patients"
//             value={stats.totalPatients}
//             icon={Users}
//             iconColor="text-primary"
//             iconBgColor="bg-primary/10"
//             onClick={() => navigate('/patients')}
//           />
//           <StatCard
//             title="Today's Appointments"
//             value={stats.todaysPatients}
//             icon={CalendarClock}
//             iconColor="text-info"
//             iconBgColor="bg-info/10"
//             onClick={() => navigate('/appointments/today')}
//           />
//           <StatCard
//             title="Pending Appointments"
//             value={stats.pendingAppointments}
//             icon={Clock}
//             iconColor="text-warning"
//             iconBgColor="bg-warning/10"
//           />
//           <StatCard
//             title="Confirmed Appointments"
//             value={stats.confirmedAppointments}
//             icon={CheckCircle}
//             iconColor="text-success"
//             iconBgColor="bg-success/10"
//           />
//         </div>

//         {/* Quick Actions */}
//         <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
//           <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             <button
//               onClick={() => navigate('/walk-in')}
//               className="p-4 rounded-lg border border-border bg-background hover:bg-muted transition-colors text-left group"
//             >
//               <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
//                 <Users className="w-5 h-5 text-accent" />
//               </div>
//               <h3 className="font-medium text-foreground">Add Walk-in Patient</h3>
//               <p className="text-sm text-muted-foreground mt-1">Register a new walk-in patient quickly</p>
//             </button>
            
//             <button
//               onClick={() => navigate('/appointments/today')}
//               className="p-4 rounded-lg border border-border bg-background hover:bg-muted transition-colors text-left group"
//             >
//               <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center mb-3 group-hover:bg-info/20 transition-colors">
//                 <CalendarClock className="w-5 h-5 text-info" />
//               </div>
//               <h3 className="font-medium text-foreground">Today's Schedule</h3>
//               <p className="text-sm text-muted-foreground mt-1">View and manage today's appointments</p>
//             </button>
            
//             <button
//               onClick={() => navigate('/blogs/new')}
//               className="p-4 rounded-lg border border-border bg-background hover:bg-muted transition-colors text-left group"
//             >
//               <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
//                 <CalendarClock className="w-5 h-5 text-primary" />
//               </div>
//               <h3 className="font-medium text-foreground">Write Blog Post</h3>
//               <p className="text-sm text-muted-foreground mt-1">Create new health awareness content</p>
//             </button>
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { StatCard } from '@/components/ui/StatCard';
import { dashboardService } from '@/api/dashboardService';
import { toast } from '@/hooks/use-toast';
import { Users, CalendarClock, Clock, CheckCircle, Calendar, UserPlus, Activity, FileText, Loader2, RefreshCw, BookOpen, Eye } from 'lucide-react';

interface DashboardData {
  overview: {
    totalPatients: number;
    todayPatients: number;
    pendingAppointments: number;
    confirmedAppointments: number;
    completedAppointments: number;
    cancelledAppointments: number;
    totalBlogs: number;
    publishedBlogs: number;
  };
  recentAppointments: Array<{
    _id: string;
    name: string;
    phone: string;
    appointmentDate: string;
    appointmentTime: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  }>;
  upcomingAppointments: Array<{
    _id: string;
    name: string;
    phone: string;
    appointmentDate: string;
    appointmentTime: string;
    status: 'pending' | 'confirmed';
  }>;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getDashboardStats();
      
      if (response.success) {
        setDashboardData(response.data);
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to fetch dashboard stats',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Fetch dashboard stats error:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Network error',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchQuickStats = async () => {
    try {
      const response = await dashboardService.getQuickStats();
      if (response.success && dashboardData) {
        const data = response.data;
        setDashboardData(prev => prev ? {
          ...prev,
          overview: {
            ...prev.overview,
            totalPatients: data.totalPatients || 0,
            todayPatients: data.todayPatients || 0,
            pendingAppointments: data.pendingAppointments || 0,
            confirmedAppointments: data.confirmedAppointments || 0,
          }
        } : prev);
      }
    } catch (error) {
      console.error('Fetch quick stats error:', error);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short'
      });
    } catch {
      return dateString;
    }
  };

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

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Format today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-IN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  const overview = dashboardData?.overview || {
    totalPatients: 0,
    todayPatients: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0,
    totalBlogs: 0,
    publishedBlogs: 0
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="page-title">{getGreeting()}!</h1>
            <p className="page-subtitle">{formattedDate} • Here's your hospital overview</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={fetchQuickStats}
              disabled={loading}
              className="px-4 py-2 text-sm bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              Quick Refresh
            </button>
            <button
              onClick={fetchDashboardStats}
              disabled={loading}
              className="px-4 py-2 text-sm bg-secondary/10 text-secondary-foreground rounded-lg hover:bg-secondary/20 transition-colors flex items-center gap-2"
            >
              <Activity className="w-4 h-4" />
              Full Refresh
            </button>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard
            title="Total Patients"
            value={overview.totalPatients}
            icon={Users}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
            onClick={() => navigate('/patients')}
          />
          <StatCard
            title="Today's Appointments"
            value={overview.todayPatients}
            icon={CalendarClock}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
            onClick={() => navigate('/appointments/today')}
          />
          <StatCard
            title="Pending Appointments"
            value={overview.pendingAppointments}
            icon={Clock}
            iconColor="text-yellow-600"
            iconBgColor="bg-yellow-100"
            onClick={() => navigate('/appointments?status=pending')}
          />
          <StatCard
            title="Confirmed Appointments"
            value={overview.confirmedAppointments}
            icon={CheckCircle}
            iconColor="text-indigo-600"
            iconBgColor="bg-indigo-100"
            onClick={() => navigate('/appointments?status=confirmed')}
          />
        </div>

        {/* Second Row Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard
            title="Completed Appointments"
            value={overview.completedAppointments}
            icon={CheckCircle}
            iconColor="text-emerald-600"
            iconBgColor="bg-emerald-100"
            onClick={() => navigate('/appointments?status=completed')}
          />
          <StatCard
            title="Cancelled Appointments"
            value={overview.cancelledAppointments}
            icon={Clock}
            iconColor="text-red-600"
            iconBgColor="bg-red-100"
            onClick={() => navigate('/appointments?status=cancelled')}
          />
          <StatCard
            title="Total Blogs"
            value={overview.totalBlogs}
            icon={BookOpen}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
            onClick={() => navigate('/blogs')}
          />
          <StatCard
            title="Published Blogs"
            value={overview.publishedBlogs}
            icon={Eye}
            iconColor="text-cyan-600"
            iconBgColor="bg-cyan-100"
            onClick={() => navigate('/blogs?status=published')}
          />
        </div>

        {/* Two Column Layout for Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Appointments */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Appointments
              </h2>
              <button
                onClick={() => navigate('/appointments')}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                View All
              </button>
            </div>
            
            {dashboardData?.recentAppointments?.length ? (
              <div className="space-y-3">
                {dashboardData.recentAppointments.slice(0, 5).map((appointment) => (
                  <div
                    key={appointment._id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => navigate(`/patients/${appointment._id}`)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        appointment.status === 'completed' ? 'bg-emerald-100' :
                        appointment.status === 'confirmed' ? 'bg-indigo-100' :
                        appointment.status === 'pending' ? 'bg-yellow-100' :
                        'bg-red-100'
                      }`}>
                        <CalendarClock className={`w-4 h-4 ${
                          appointment.status === 'completed' ? 'text-emerald-600' :
                          appointment.status === 'confirmed' ? 'text-indigo-600' :
                          appointment.status === 'pending' ? 'text-yellow-600' :
                          'text-red-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">{appointment.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(appointment.appointmentDate)} • {formatTime(appointment.appointmentTime)}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      appointment.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                      appointment.status === 'confirmed' ? 'bg-indigo-100 text-indigo-800' :
                      appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarClock className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No recent appointments</p>
              </div>
            )}
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Appointments
              </h2>
              <button
                onClick={() => navigate('/appointments/today')}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                View Today
              </button>
            </div>
            
            {dashboardData?.upcomingAppointments?.length ? (
              <div className="space-y-3">
                {dashboardData.upcomingAppointments.slice(0, 5).map((appointment) => (
                  <div
                    key={appointment._id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => navigate(`/patients/${appointment._id}`)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        appointment.status === 'confirmed' ? 'bg-indigo-100' : 'bg-yellow-100'
                      }`}>
                        <Calendar className={`w-4 h-4 ${
                          appointment.status === 'confirmed' ? 'text-indigo-600' : 'text-yellow-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">{appointment.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(appointment.appointmentDate)} • {formatTime(appointment.appointmentTime)}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      appointment.status === 'confirmed' ? 'bg-indigo-100 text-indigo-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No upcoming appointments</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/walkin')}
              className="p-4 rounded-lg border border-border bg-background hover:bg-muted/50 transition-all text-left group hover:border-blue-300 hover:shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                <UserPlus className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-medium text-foreground">Add Walk-in Patient</h3>
              <p className="text-sm text-muted-foreground mt-1">Register a new walk-in patient quickly</p>
              <div className="mt-3 text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Quick registration →
              </div>
            </button>
            
            <button
              onClick={() => navigate('/appointments/today')}
              className="p-4 rounded-lg border border-border bg-background hover:bg-muted/50 transition-all text-left group hover:border-green-300 hover:shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
                <CalendarClock className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-medium text-foreground">Today's Schedule</h3>
              <p className="text-sm text-muted-foreground mt-1">View and manage today's appointments</p>
              <div className="mt-3 text-xs text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
                {overview.todayPatients} appointments today →
              </div>
            </button>
            
            <button
              onClick={() => navigate('/blogs/new')}
              className="p-4 rounded-lg border border-border bg-background hover:bg-muted/50 transition-all text-left group hover:border-purple-300 hover:shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-medium text-foreground">Write Blog Post</h3>
              <p className="text-sm text-muted-foreground mt-1">Create new health awareness content</p>
              <div className="mt-3 text-xs text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                {overview.totalBlogs} total blogs →
              </div>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}