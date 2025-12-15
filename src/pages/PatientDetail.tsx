// // import { useState, useEffect } from 'react';
// // import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
// // import { AdminLayout } from '@/components/layout/AdminLayout';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Textarea } from '@/components/ui/textarea';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // import { StatusBadge } from '@/components/ui/StatusBadge';
// // import { getPatient, getAppointments, updatePatient, Patient, Appointment } from '@/lib/mockData';
// // import { toast } from '@/hooks/use-toast';
// // import { ArrowLeft, Edit, Save, X, User, Phone, Mail, MapPin, Calendar, Stethoscope } from 'lucide-react';

// // export default function PatientDetail() {
// //   const { id } = useParams<{ id: string }>();
// //   const navigate = useNavigate();
// //   const [searchParams] = useSearchParams();
// //   const [patient, setPatient] = useState<Patient | null>(null);
// //   const [appointment, setAppointment] = useState<Appointment | null>(null);
// //   const [isEditing, setIsEditing] = useState(searchParams.get('edit') === 'true');
// //   const [formData, setFormData] = useState<Partial<Patient>>({});

// //   useEffect(() => {
// //     if (id) {
// //       const patientData = getPatient(id);
// //       if (patientData) {
// //         setPatient(patientData);
// //         setFormData(patientData);
        
// //         const appointments = getAppointments();
// //         const patientAppointment = appointments.find(a => a.patientId === id);
// //         setAppointment(patientAppointment || null);
// //       }
// //     }
// //   }, [id]);

// //   const handleSave = () => {
// //     if (!id || !formData.name || !formData.phone) {
// //       toast({
// //         title: 'Validation Error',
// //         description: 'Name and phone are required fields.',
// //         variant: 'destructive',
// //       });
// //       return;
// //     }

// //     const updated = updatePatient(id, formData);
// //     if (updated) {
// //       setPatient(updated);
// //       setIsEditing(false);
// //       toast({
// //         title: 'Success',
// //         description: 'Patient information updated successfully.',
// //       });
// //     }
// //   };

// //   const handleCancel = () => {
// //     if (patient) {
// //       setFormData(patient);
// //     }
// //     setIsEditing(false);
// //   };

// //   if (!patient) {
// //     return (
// //       <AdminLayout>
// //         <div className="flex items-center justify-center py-12">
// //           <p className="text-muted-foreground">Patient not found.</p>
// //         </div>
// //       </AdminLayout>
// //     );
// //   }

// //   return (
// //     <AdminLayout>
// //       <div className="space-y-6 max-w-4xl">
// //         {/* Header */}
// //         <div className="flex items-center justify-between flex-wrap gap-4">
// //           <div className="flex items-center gap-4">
// //             <Button variant="ghost" size="icon" onClick={() => navigate('/patients')}>
// //               <ArrowLeft className="w-5 h-5" />
// //             </Button>
// //             <div>
// //               <h1 className="page-title">{patient.name}</h1>
// //               <p className="page-subtitle">Patient ID: {patient.id}</p>
// //             </div>
// //           </div>
// //           <div className="flex gap-2">
// //             {isEditing ? (
// //               <>
// //                 <Button variant="outline" onClick={handleCancel}>
// //                   <X className="w-4 h-4 mr-2" />
// //                   Cancel
// //                 </Button>
// //                 <Button onClick={handleSave}>
// //                   <Save className="w-4 h-4 mr-2" />
// //                   Save Changes
// //                 </Button>
// //               </>
// //             ) : (
// //               <Button onClick={() => setIsEditing(true)}>
// //                 <Edit className="w-4 h-4 mr-2" />
// //                 Edit Patient
// //               </Button>
// //             )}
// //           </div>
// //         </div>

// //         {/* Personal Information */}
// //         <div className="form-section">
// //           <h2 className="form-section-title flex items-center gap-2">
// //             <User className="w-5 h-5 text-primary" />
// //             Personal Information
// //           </h2>
          
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             <div className="space-y-2">
// //               <Label htmlFor="name">Full Name</Label>
// //               {isEditing ? (
// //                 <Input
// //                   id="name"
// //                   value={formData.name || ''}
// //                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //                 />
// //               ) : (
// //                 <p className="text-foreground flex items-center gap-2">
// //                   <User className="w-4 h-4 text-muted-foreground" />
// //                   {patient.name}
// //                 </p>
// //               )}
// //             </div>

// //             <div className="space-y-2">
// //               <Label htmlFor="phone">Phone Number</Label>
// //               {isEditing ? (
// //                 <Input
// //                   id="phone"
// //                   value={formData.phone || ''}
// //                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
// //                 />
// //               ) : (
// //                 <p className="text-foreground flex items-center gap-2">
// //                   <Phone className="w-4 h-4 text-muted-foreground" />
// //                   {patient.phone}
// //                 </p>
// //               )}
// //             </div>

// //             <div className="space-y-2">
// //               <Label htmlFor="email">Email</Label>
// //               {isEditing ? (
// //                 <Input
// //                   id="email"
// //                   type="email"
// //                   value={formData.email || ''}
// //                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// //                 />
// //               ) : (
// //                 <p className="text-foreground flex items-center gap-2">
// //                   <Mail className="w-4 h-4 text-muted-foreground" />
// //                   {patient.email || 'Not provided'}
// //                 </p>
// //               )}
// //             </div>

// //             <div className="space-y-2">
// //               <Label htmlFor="address">Address</Label>
// //               {isEditing ? (
// //                 <Input
// //                   id="address"
// //                   value={formData.address || ''}
// //                   onChange={(e) => setFormData({ ...formData, address: e.target.value })}
// //                 />
// //               ) : (
// //                 <p className="text-foreground flex items-center gap-2">
// //                   <MapPin className="w-4 h-4 text-muted-foreground" />
// //                   {patient.address || 'Not provided'}
// //                 </p>
// //               )}
// //             </div>

// //             <div className="space-y-2">
// //               <Label htmlFor="age">Age</Label>
// //               {isEditing ? (
// //                 <Input
// //                   id="age"
// //                   type="number"
// //                   value={formData.age || ''}
// //                   onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
// //                 />
// //               ) : (
// //                 <p className="text-foreground">{patient.age} years</p>
// //               )}
// //             </div>

// //             <div className="space-y-2">
// //               <Label htmlFor="gender">Gender</Label>
// //               {isEditing ? (
// //                 <Select
// //                   value={formData.gender}
// //                   onValueChange={(value: 'Male' | 'Female' | 'Other') => setFormData({ ...formData, gender: value })}
// //                 >
// //                   <SelectTrigger>
// //                     <SelectValue placeholder="Select gender" />
// //                   </SelectTrigger>
// //                   <SelectContent>
// //                     <SelectItem value="Male">Male</SelectItem>
// //                     <SelectItem value="Female">Female</SelectItem>
// //                     <SelectItem value="Other">Other</SelectItem>
// //                   </SelectContent>
// //                 </Select>
// //               ) : (
// //                 <p className="text-foreground">{patient.gender}</p>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Medical Information */}
// //         <div className="form-section">
// //           <h2 className="form-section-title flex items-center gap-2">
// //             <Stethoscope className="w-5 h-5 text-primary" />
// //             Medical Information
// //           </h2>
          
// //           <div className="space-y-6">
// //             <div className="space-y-2">
// //               <Label htmlFor="disease">Disease / Symptoms</Label>
// //               {isEditing ? (
// //                 <Textarea
// //                   id="disease"
// //                   value={formData.disease || ''}
// //                   onChange={(e) => setFormData({ ...formData, disease: e.target.value })}
// //                   rows={2}
// //                 />
// //               ) : (
// //                 <p className="text-foreground bg-muted/50 p-3 rounded-lg">{patient.disease || 'Not specified'}</p>
// //               )}
// //             </div>

// //             <div className="space-y-2">
// //               <Label htmlFor="medicalHistory">Medical History</Label>
// //               {isEditing ? (
// //                 <Textarea
// //                   id="medicalHistory"
// //                   value={formData.medicalHistory || ''}
// //                   onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
// //                   rows={4}
// //                 />
// //               ) : (
// //                 <p className="text-foreground bg-muted/50 p-3 rounded-lg">
// //                   {patient.medicalHistory || 'No medical history recorded'}
// //                 </p>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Appointment Details */}
// //         {appointment && (
// //           <div className="form-section">
// //             <h2 className="form-section-title flex items-center gap-2">
// //               <Calendar className="w-5 h-5 text-primary" />
// //               Appointment Details
// //             </h2>
            
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //               <div className="space-y-2">
// //                 <Label>Date</Label>
// //                 <p className="text-foreground">{new Date(appointment.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
// //               </div>

// //               <div className="space-y-2">
// //                 <Label>Time</Label>
// //                 <p className="text-foreground">{appointment.time}</p>
// //               </div>

// //               <div className="space-y-2">
// //                 <Label>Status</Label>
// //                 <div>
// //                   <StatusBadge status={appointment.status} />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Actions */}
// //         <div className="flex justify-start">
// //           <Button variant="outline" onClick={() => navigate('/patients')}>
// //             <ArrowLeft className="w-4 h-4 mr-2" />
// //             Back to Patients
// //           </Button>
// //         </div>
// //       </div>
// //     </AdminLayout>
// //   );
// // }


// import { useState, useEffect } from 'react';
// import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
// import { AdminLayout } from '@/components/layout/AdminLayout';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { StatusBadge } from '@/components/ui/StatusBadge';
// import { patientService } from '@/api/patientService';
// import { appointmentService } from '@/api/appointmentService';
// import { toast } from '@/hooks/use-toast';
// import { ArrowLeft, Edit, Save, X, User, Phone, Mail, MapPin, Calendar, Stethoscope, Loader2 } from 'lucide-react';

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
//   notes?: string;
//   patientId: string;
// }

// export default function PatientDetail() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const [patient, setPatient] = useState<Patient | null>(null);
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [isEditing, setIsEditing] = useState(searchParams.get('edit') === 'true');
//   const [formData, setFormData] = useState<Partial<Patient>>({});

//   useEffect(() => {
//     if (id) {
//       fetchPatient();
//       fetchPatientAppointments();
//     }
//   }, [id]);

//   const fetchPatient = async () => {
//     try {
//       setLoading(true);
//       const response = await patientService.getPatientById(id!);
      
//       if (response.success) {
//         setPatient(response.data);
//         setFormData(response.data);
//       } else {
//         toast({
//           title: 'Error',
//           description: response.message || 'Patient not found',
//           variant: 'destructive',
//         });
//         navigate('/patients');
//       }
//     } catch (error: any) {
//       console.error('Fetch patient error:', error);
//       toast({
//         title: 'Error',
//         description: error.response?.data?.message || 'Network error',
//         variant: 'destructive',
//       });
//       navigate('/patients');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPatientAppointments = async () => {
//     try {
//       const response = await appointmentService.getAppointments({
//         search: '', // We'll filter client-side
//         limit: 10
//       });
      
//       if (response.success) {
//         // Filter appointments for this patient
//         const patientAppointments = (response.data?.appointments || []).filter(
//           (app: Appointment) => app.patientId === id
//         );
//         setAppointments(patientAppointments);
//       }
//     } catch (error) {
//       console.error('Fetch appointments error:', error);
//     }
//   };

//   const handleSave = async () => {
//     if (!id || !formData.name || !formData.phone) {
//       toast({
//         title: 'Validation Error',
//         description: 'Name and phone are required fields.',
//         variant: 'destructive',
//       });
//       return;
//     }

//     try {
//       setSaving(true);
//       const response = await patientService.updatePatient(id, formData);
      
//       if (response.success) {
//         setPatient(response.data);
//         setIsEditing(false);
//         toast({
//           title: 'Success',
//           description: 'Patient information updated successfully.',
//         });
//       } else {
//         toast({
//           title: 'Error',
//           description: response.message || 'Failed to update patient',
//           variant: 'destructive',
//         });
//       }
//     } catch (error: any) {
//       console.error('Update patient error:', error);
//       toast({
//         title: 'Error',
//         description: error.response?.data?.message || 'Failed to update patient',
//         variant: 'destructive',
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleCancel = () => {
//     if (patient) {
//       setFormData(patient);
//     }
//     setIsEditing(false);
//   };

//   const handleChange = (field: keyof Patient, value: any) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   if (loading) {
//     return (
//       <AdminLayout>
//         <div className="flex items-center justify-center py-12">
//           <Loader2 className="w-8 h-8 animate-spin text-primary" />
//           <p className="ml-3 text-muted-foreground">Loading patient details...</p>
//         </div>
//       </AdminLayout>
//     );
//   }

//   if (!patient) {
//     return (
//       <AdminLayout>
//         <div className="flex flex-col items-center justify-center py-12">
//           <p className="text-muted-foreground mb-4">Patient not found.</p>
//           <Button variant="outline" onClick={() => navigate('/patients')}>
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Patients
//           </Button>
//         </div>
//       </AdminLayout>
//     );
//   }

//   // Get latest appointment
//   const latestAppointment = appointments.length > 0 
//     ? appointments.sort((a, b) => 
//         new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime()
//       )[0]
//     : null;

//   return (
//     <AdminLayout>
//       <div className="space-y-6 max-w-4xl">
//         {/* Header */}
//         <div className="flex items-center justify-between flex-wrap gap-4">
//           <div className="flex items-center gap-4">
//             <Button variant="ghost" size="icon" onClick={() => navigate('/patients')}>
//               <ArrowLeft className="w-5 h-5" />
//             </Button>
//             <div>
//               <h1 className="page-title">{patient.name}</h1>
//               <p className="page-subtitle">Patient ID: {patient._id.substring(0, 8)}...</p>
//             </div>
//           </div>
//           <div className="flex gap-2">
//             {isEditing ? (
//               <>
//                 <Button 
//                   variant="outline" 
//                   onClick={handleCancel}
//                   disabled={saving}
//                 >
//                   <X className="w-4 h-4 mr-2" />
//                   Cancel
//                 </Button>
//                 <Button 
//                   onClick={handleSave}
//                   disabled={saving}
//                 >
//                   {saving ? (
//                     <>
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       <Save className="w-4 h-4 mr-2" />
//                       Save Changes
//                     </>
//                   )}
//                 </Button>
//               </>
//             ) : (
//               <Button onClick={() => setIsEditing(true)}>
//                 <Edit className="w-4 h-4 mr-2" />
//                 Edit Patient
//               </Button>
//             )}
//           </div>
//         </div>

//         {/* Personal Information */}
//         <div className="form-section">
//           <h2 className="form-section-title flex items-center gap-2">
//             <User className="w-5 h-5 text-primary" />
//             Personal Information
//           </h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <Label htmlFor="name">Full Name *</Label>
//               {isEditing ? (
//                 <Input
//                   id="name"
//                   value={formData.name || ''}
//                   onChange={(e) => handleChange('name', e.target.value)}
//                   disabled={saving}
//                 />
//               ) : (
//                 <p className="text-foreground flex items-center gap-2">
//                   <User className="w-4 h-4 text-muted-foreground" />
//                   {patient.name}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="phone">Phone Number *</Label>
//               {isEditing ? (
//                 <Input
//                   id="phone"
//                   value={formData.phone || ''}
//                   onChange={(e) => handleChange('phone', e.target.value)}
//                   disabled={saving}
//                 />
//               ) : (
//                 <p className="text-foreground flex items-center gap-2">
//                   <Phone className="w-4 h-4 text-muted-foreground" />
//                   {patient.phone}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               {isEditing ? (
//                 <Input
//                   id="email"
//                   type="email"
//                   value={formData.email || ''}
//                   onChange={(e) => handleChange('email', e.target.value)}
//                   disabled={saving}
//                 />
//               ) : (
//                 <p className="text-foreground flex items-center gap-2">
//                   <Mail className="w-4 h-4 text-muted-foreground" />
//                   {patient.email || 'Not provided'}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="address">Address</Label>
//               {isEditing ? (
//                 <Input
//                   id="address"
//                   value={formData.address || ''}
//                   onChange={(e) => handleChange('address', e.target.value)}
//                   disabled={saving}
//                 />
//               ) : (
//                 <p className="text-foreground flex items-center gap-2">
//                   <MapPin className="w-4 h-4 text-muted-foreground" />
//                   {patient.address || 'Not provided'}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="age">Age</Label>
//               {isEditing ? (
//                 <Input
//                   id="age"
//                   type="number"
//                   min="0"
//                   max="150"
//                   value={formData.age || ''}
//                   onChange={(e) => handleChange('age', parseInt(e.target.value) || 0)}
//                   disabled={saving}
//                 />
//               ) : (
//                 <p className="text-foreground">{patient.age} years</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="gender">Gender</Label>
//               {isEditing ? (
//                 <Select
//                   value={formData.gender}
//                   onValueChange={(value: 'Male' | 'Female' | 'Other') => handleChange('gender', value)}
//                   disabled={saving}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select gender" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Male">Male</SelectItem>
//                     <SelectItem value="Female">Female</SelectItem>
//                     <SelectItem value="Other">Other</SelectItem>
//                   </SelectContent>
//                 </Select>
//               ) : (
//                 <p className="text-foreground">{patient.gender}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Medical Information */}
//         <div className="form-section">
//           <h2 className="form-section-title flex items-center gap-2">
//             <Stethoscope className="w-5 h-5 text-primary" />
//             Medical Information
//           </h2>
          
//           <div className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="disease">Disease / Symptoms</Label>
//               {isEditing ? (
//                 <Textarea
//                   id="disease"
//                   value={formData.disease || ''}
//                   onChange={(e) => handleChange('disease', e.target.value)}
//                   rows={2}
//                   disabled={saving}
//                   placeholder="Describe the patient's symptoms or condition..."
//                 />
//               ) : (
//                 <p className="text-foreground bg-muted/50 p-3 rounded-lg">
//                   {patient.disease || 'Not specified'}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="medicalHistory">Medical History</Label>
//               {isEditing ? (
//                 <Textarea
//                   id="medicalHistory"
//                   value={formData.medicalHistory || ''}
//                   onChange={(e) => handleChange('medicalHistory', e.target.value)}
//                   rows={4}
//                   disabled={saving}
//                   placeholder="Any relevant medical history, allergies, or ongoing medications..."
//                 />
//               ) : (
//                 <p className="text-foreground bg-muted/50 p-3 rounded-lg">
//                   {patient.medicalHistory || 'No medical history recorded'}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Appointment Details */}
//         {latestAppointment && (
//           <div className="form-section">
//             <h2 className="form-section-title flex items-center gap-2">
//               <Calendar className="w-5 h-5 text-primary" />
//               Latest Appointment
//             </h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="space-y-2">
//                 <Label>Date</Label>
//                 <p className="text-foreground">
//                   {new Date(latestAppointment.appointmentDate).toLocaleDateString('en-IN', { 
//                     weekday: 'long', 
//                     year: 'numeric', 
//                     month: 'long', 
//                     day: 'numeric' 
//                   })}
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 <Label>Time</Label>
//                 <p className="text-foreground">{latestAppointment.appointmentTime}</p>
//               </div>

//               <div className="space-y-2">
//                 <Label>Status</Label>
//                 <div>
//                   <StatusBadge status={latestAppointment.status} />
//                 </div>
//               </div>
//             </div>
            
//             {appointments.length > 1 && (
//               <div className="mt-4 p-3 bg-muted/30 rounded-lg">
//                 <p className="text-sm text-muted-foreground">
//                   This patient has {appointments.length} appointment(s) in total.
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Patient Metadata */}
//         <div className="form-section">
//           <h2 className="form-section-title">Metadata</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <Label>Created At</Label>
//               <p className="text-foreground">
//                 {new Date(patient.createdAt).toLocaleDateString('en-IN', {
//                   day: 'numeric',
//                   month: 'short',
//                   year: 'numeric',
//                   hour: '2-digit',
//                   minute: '2-digit'
//                 })}
//               </p>
//             </div>
//             <div className="space-y-2">
//               <Label>Last Updated</Label>
//               <p className="text-foreground">
//                 {new Date(patient.updatedAt).toLocaleDateString('en-IN', {
//                   day: 'numeric',
//                   month: 'short',
//                   year: 'numeric',
//                   hour: '2-digit',
//                   minute: '2-digit'
//                 })}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex justify-start gap-3">
//           <Button variant="outline" onClick={() => navigate('/patients')}>
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Patients
//           </Button>
//           {!isEditing && (
//             <Button onClick={() => setIsEditing(true)}>
//               <Edit className="w-4 h-4 mr-2" />
//               Edit Patient
//             </Button>
//           )}
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }  

import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { patientService } from '@/api/patientService';
import { appointmentService } from '@/api/appointmentService';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Edit, Save, X, User, Phone, Mail, MapPin, Calendar, Stethoscope, Loader2, Clock, CalendarDays } from 'lucide-react';

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

export default function PatientDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [previousAppointments, setPreviousAppointments] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(searchParams.get('edit') === 'true');
  const [formData, setFormData] = useState<Partial<Patient>>({});

  useEffect(() => {
    if (id) {
      fetchPatient();
      fetchPatientHistory();
    }
  }, [id]);

  const fetchPatient = async () => {
    try {
      setLoading(true);
      const response = await patientService.getPatientById(id!);
      
      console.log('Patient response:', response); // Debug log
      
      if (response.success) {
        setPatient(response.data);
        setFormData(response.data);
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Patient not found',
          variant: 'destructive',
        });
        navigate('/patients');
      }
    } catch (error: any) {
      console.error('Fetch patient error:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Network error',
        variant: 'destructive',
      });
      navigate('/patients');
    } finally {
      setLoading(false);
    }
  };

  const fetchPatientHistory = async () => {
    try {
      if (!patient?.phone) return;
      
      // Use appointment service to get all appointments for this patient's phone
      const response = await appointmentService.getAppointmentStatus(patient.phone);
      
      if (response.success) {
        // Filter out current appointment and get previous ones
        const previous = (response.data || []).filter(
          (app: Patient) => app._id !== id
        );
        setPreviousAppointments(previous);
      }
    } catch (error) {
      console.error('Fetch patient history error:', error);
      // Silent fail - this is optional data
    }
  };

  const handleSave = async () => {
    if (!id || !formData.name || !formData.phone) {
      toast({
        title: 'Validation Error',
        description: 'Name and phone are required fields.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setSaving(true);
      
      // Prepare update data
      const updateData: any = {};
      
      // Only include fields that have changed or are required
      if (formData.name && formData.name !== patient?.name) {
        updateData.name = formData.name;
      }
      if (formData.phone && formData.phone !== patient?.phone) {
        updateData.phone = formData.phone;
      }
      if (formData.email !== patient?.email) {
        updateData.email = formData.email || '';
      }
      if (formData.address !== patient?.address) {
        updateData.address = formData.address || '';
      }
      if (formData.age !== patient?.age) {
        updateData.age = formData.age || 0;
      }
      if (formData.gender && formData.gender !== patient?.gender) {
        updateData.gender = formData.gender;
      }
      if (formData.disease !== patient?.disease) {
        updateData.disease = formData.disease || '';
      }
      if (formData.medicalHistory !== patient?.medicalHistory) {
        updateData.medicalHistory = formData.medicalHistory || '';
      }
      
      // Update appointment fields if they exist in form
      if (formData.appointmentDate && formData.appointmentDate !== patient?.appointmentDate) {
        updateData.appointmentDate = formData.appointmentDate;
      }
      if (formData.appointmentTime && formData.appointmentTime !== patient?.appointmentTime) {
        updateData.appointmentTime = formData.appointmentTime;
      }
      if (formData.status && formData.status !== patient?.status) {
        updateData.status = formData.status;
      }

      const response = await patientService.updatePatient(id, updateData);
      
      if (response.success) {
        setPatient(response.data);
        setIsEditing(false);
        toast({
          title: 'Success',
          description: 'Patient information updated successfully.',
        });
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to update patient',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Update patient error:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update patient',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (patient) {
      setFormData(patient);
    }
    setIsEditing(false);
  };

  const handleChange = (field: keyof Patient, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
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

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="ml-3 text-muted-foreground">Loading patient details...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!patient) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-4">Patient not found.</p>
          <Button variant="outline" onClick={() => navigate('/patients')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Patients
          </Button>
        </div>
      </AdminLayout>
    );
  }

  // Format gender for display
  const displayGender = (gender: string) => {
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/patients')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="page-title">{patient.name}</h1>
              <div className="flex items-center gap-3 mt-1">
                <p className="page-subtitle">Patient ID: {patient._id.substring(0, 8)}...</p>
                {patient.isWalkIn && (
                  <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                    Walk-in Patient
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={handleCancel}
                  disabled={saving}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Patient
              </Button>
            )}
          </div>
        </div>

        {/* Personal Information */}
        <div className="form-section">
          <h2 className="form-section-title flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Personal Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  disabled={saving}
                />
              ) : (
                <p className="text-foreground flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  {patient.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={formData.phone || ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  disabled={saving}
                />
              ) : (
                <p className="text-foreground flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  {patient.phone}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  disabled={saving}
                />
              ) : (
                <p className="text-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  {patient.email || 'Not provided'}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              {isEditing ? (
                <Textarea
                  id="address"
                  value={formData.address || ''}
                  onChange={(e) => handleChange('address', e.target.value)}
                  rows={2}
                  disabled={saving}
                  placeholder="Enter address"
                />
              ) : (
                <p className="text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  {patient.address || 'Not provided'}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              {isEditing ? (
                <Input
                  id="age"
                  type="number"
                  min="0"
                  max="150"
                  value={formData.age || ''}
                  onChange={(e) => handleChange('age', parseInt(e.target.value) || 0)}
                  disabled={saving}
                />
              ) : (
                <p className="text-foreground">{patient.age} years</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              {isEditing ? (
                <Select
                  value={formData.gender}
                  onValueChange={(value: 'male' | 'female' | 'other') => handleChange('gender', value)}
                  disabled={saving}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-foreground">{displayGender(patient.gender)}</p>
              )}
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="form-section">
          <h2 className="form-section-title flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-primary" />
            Medical Information
          </h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="disease">Disease / Symptoms</Label>
              {isEditing ? (
                <Textarea
                  id="disease"
                  value={formData.disease || ''}
                  onChange={(e) => handleChange('disease', e.target.value)}
                  rows={2}
                  disabled={saving}
                  placeholder="Describe the patient's symptoms or condition..."
                />
              ) : (
                <p className="text-foreground bg-muted/50 p-3 rounded-lg">
                  {patient.disease || 'Not specified'}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalHistory">Medical History</Label>
              {isEditing ? (
                <Textarea
                  id="medicalHistory"
                  value={formData.medicalHistory || ''}
                  onChange={(e) => handleChange('medicalHistory', e.target.value)}
                  rows={4}
                  disabled={saving}
                  placeholder="Any relevant medical history, allergies, or ongoing medications..."
                />
              ) : (
                <p className="text-foreground bg-muted/50 p-3 rounded-lg">
                  {patient.medicalHistory || 'No medical history recorded'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Current Appointment */}
        {patient.appointmentDate && (
          <div className="form-section">
            <h2 className="form-section-title flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Current Appointment
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-muted-foreground" />
                    <p className="text-foreground">
                      {formatDate(patient.appointmentDate)}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Time</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <p className="text-foreground">{formatTime(patient.appointmentTime)}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <div>
                    <StatusBadge status={patient.status} />
                  </div>
                </div>
              </div>
              
              {isEditing && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="appointmentDate">Appointment Date</Label>
                      <Input
                        id="appointmentDate"
                        type="date"
                        value={formData.appointmentDate ? new Date(formData.appointmentDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => handleChange('appointmentDate', e.target.value)}
                        disabled={saving}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="appointmentTime">Appointment Time</Label>
                      <Input
                        id="appointmentTime"
                        type="time"
                        value={formData.appointmentTime || ''}
                        onChange={(e) => handleChange('appointmentTime', e.target.value)}
                        disabled={saving}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: 'pending' | 'confirmed' | 'completed' | 'cancelled') => 
                        handleChange('status', value)}
                      disabled={saving}
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
                </div>
              )}
            </div>
          </div>
        )}

        {/* Previous Appointments */}
        {previousAppointments.length > 0 && (
          <div className="form-section">
            <h2 className="form-section-title">Previous Appointments</h2>
            
            <div className="space-y-3">
              {previousAppointments.map((appointment) => (
                <div key={appointment._id} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <p className="text-foreground font-medium">
                        {formatDate(appointment.appointmentDate)} at {formatTime(appointment.appointmentTime)}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <StatusBadge status={appointment.status} />
                        {appointment.isWalkIn && (
                          <span className="text-xs text-blue-600">Walk-in</span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.disease && (
                        <p className="truncate max-w-[200px]">Reason: {appointment.disease}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Patient Metadata */}
        <div className="form-section">
          <h2 className="form-section-title">Metadata</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Created At</Label>
              <p className="text-foreground">
                {new Date(patient.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div className="space-y-2">
              <Label>Last Updated</Label>
              <p className="text-foreground">
                {new Date(patient.updatedAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-start gap-3">
          <Button variant="outline" onClick={() => navigate('/patients')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Patients
          </Button>
          {!isEditing && (
            <>
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Patient
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/appointments')}
              >
                <Calendar className="w-4 h-4 mr-2" />
                View Appointments
              </Button>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}