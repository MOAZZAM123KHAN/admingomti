// // import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { AdminLayout } from '@/components/layout/AdminLayout';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Textarea } from '@/components/ui/textarea';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // import { addPatient, addAppointment } from '@/lib/mockData';
// // import { toast } from '@/hooks/use-toast';
// // import { UserPlus, Loader2 } from 'lucide-react';

// // export default function WalkInPatient() {
// //   const navigate = useNavigate();
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     phone: '',
// //     email: '',
// //     address: '',
// //     age: '',
// //     gender: '' as 'Male' | 'Female' | 'Other' | '',
// //     disease: '',
// //     medicalHistory: '',
// //   });

// //   const handleChange = (field: string, value: string) => {
// //     setFormData(prev => ({ ...prev, [field]: value }));
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
    
// //     if (!formData.name.trim()) {
// //       toast({
// //         title: 'Validation Error',
// //         description: 'Patient name is required.',
// //         variant: 'destructive',
// //       });
// //       return;
// //     }
    
// //     if (!formData.phone.trim()) {
// //       toast({
// //         title: 'Validation Error',
// //         description: 'Phone number is required.',
// //         variant: 'destructive',
// //       });
// //       return;
// //     }

// //     setIsLoading(true);
    
// //     try {
// //       // Simulate API delay
// //       await new Promise(resolve => setTimeout(resolve, 500));
      
// //       // Add patient
// //       const newPatient = addPatient({
// //         name: formData.name.trim(),
// //         phone: formData.phone.trim(),
// //         email: formData.email.trim(),
// //         address: formData.address.trim(),
// //         age: parseInt(formData.age) || 0,
// //         gender: (formData.gender || 'Other') as 'Male' | 'Female' | 'Other',
// //         disease: formData.disease.trim(),
// //         medicalHistory: formData.medicalHistory.trim(),
// //       });
      
// //       // Create immediate appointment
// //       const now = new Date();
// //       addAppointment({
// //         patientId: newPatient.id,
// //         patientName: newPatient.name,
// //         patientPhone: newPatient.phone,
// //         date: now.toISOString().split('T')[0],
// //         time: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`,
// //         status: 'confirmed',
// //         notes: 'Walk-in patient',
// //       });
      
// //       toast({
// //         title: 'Patient Registered',
// //         description: `${formData.name} has been registered and an appointment has been created.`,
// //       });
      
// //       // Reset form
// //       setFormData({
// //         name: '',
// //         phone: '',
// //         email: '',
// //         address: '',
// //         age: '',
// //         gender: '',
// //         disease: '',
// //         medicalHistory: '',
// //       });
      
// //       // Optionally navigate to patient detail
// //       navigate(`/patients/${newPatient.id}`);
// //     } catch {
// //       toast({
// //         title: 'Error',
// //         description: 'Failed to register patient. Please try again.',
// //         variant: 'destructive',
// //       });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <AdminLayout>
// //       <div className="max-w-2xl">
// //         {/* Header */}
// //         <div className="page-header">
// //           <h1 className="page-title flex items-center gap-3">
// //             <UserPlus className="w-7 h-7 text-primary" />
// //             Walk-in Patient Registration
// //           </h1>
// //           <p className="page-subtitle">Quickly register a new walk-in patient and create an immediate appointment</p>
// //         </div>

// //         {/* Form */}
// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           <div className="form-section">
// //             <h2 className="form-section-title">Basic Information</h2>
            
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <div className="space-y-2">
// //                 <Label htmlFor="name">
// //                   Full Name <span className="text-destructive">*</span>
// //                 </Label>
// //                 <Input
// //                   id="name"
// //                   value={formData.name}
// //                   onChange={(e) => handleChange('name', e.target.value)}
// //                   placeholder="Enter patient name"
// //                   disabled={isLoading}
// //                 />
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="phone">
// //                   Phone Number <span className="text-destructive">*</span>
// //                 </Label>
// //                 <Input
// //                   id="phone"
// //                   value={formData.phone}
// //                   onChange={(e) => handleChange('phone', e.target.value)}
// //                   placeholder="+91 9876543210"
// //                   disabled={isLoading}
// //                 />
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="age">Age</Label>
// //                 <Input
// //                   id="age"
// //                   type="number"
// //                   value={formData.age}
// //                   onChange={(e) => handleChange('age', e.target.value)}
// //                   placeholder="Enter age"
// //                   min="0"
// //                   max="150"
// //                   disabled={isLoading}
// //                 />
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="gender">Gender</Label>
// //                 <Select
// //                   value={formData.gender}
// //                   onValueChange={(value) => handleChange('gender', value)}
// //                   disabled={isLoading}
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
// //               </div>

// //               <div className="space-y-2 md:col-span-2">
// //                 <Label htmlFor="email">Email (Optional)</Label>
// //                 <Input
// //                   id="email"
// //                   type="email"
// //                   value={formData.email}
// //                   onChange={(e) => handleChange('email', e.target.value)}
// //                   placeholder="patient@email.com"
// //                   disabled={isLoading}
// //                 />
// //               </div>

// //               <div className="space-y-2 md:col-span-2">
// //                 <Label htmlFor="address">Address (Optional)</Label>
// //                 <Input
// //                   id="address"
// //                   value={formData.address}
// //                   onChange={(e) => handleChange('address', e.target.value)}
// //                   placeholder="Enter address"
// //                   disabled={isLoading}
// //                 />
// //               </div>
// //             </div>
// //           </div>

// //           <div className="form-section">
// //             <h2 className="form-section-title">Medical Information</h2>
            
// //             <div className="space-y-4">
// //               <div className="space-y-2">
// //                 <Label htmlFor="disease">Chief Complaint / Disease</Label>
// //                 <Textarea
// //                   id="disease"
// //                   value={formData.disease}
// //                   onChange={(e) => handleChange('disease', e.target.value)}
// //                   placeholder="Describe the patient's symptoms or reason for visit..."
// //                   rows={3}
// //                   disabled={isLoading}
// //                 />
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="medicalHistory">Medical History (Optional)</Label>
// //                 <Textarea
// //                   id="medicalHistory"
// //                   value={formData.medicalHistory}
// //                   onChange={(e) => handleChange('medicalHistory', e.target.value)}
// //                   placeholder="Any relevant medical history, allergies, or ongoing medications..."
// //                   rows={3}
// //                   disabled={isLoading}
// //                 />
// //               </div>
// //             </div>
// //           </div>

// //           <div className="flex gap-4">
// //             <Button type="submit" disabled={isLoading} className="flex-1 sm:flex-none">
// //               {isLoading ? (
// //                 <>
// //                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
// //                   Registering...
// //                 </>
// //               ) : (
// //                 <>
// //                   <UserPlus className="w-4 h-4 mr-2" />
// //                   Register Patient
// //                 </>
// //               )}
// //             </Button>
// //             <Button
// //               type="button"
// //               variant="outline"
// //               onClick={() => navigate('/')}
// //               disabled={isLoading}
// //             >
// //               Cancel
// //             </Button>
// //           </div>
// //         </form>
// //       </div>
// //     </AdminLayout>
// //   );
// // }


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AdminLayout } from '@/components/layout/AdminLayout';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { patientService } from '@/api/patientService';
// import { toast } from '@/hooks/use-toast';
// import { UserPlus, Loader2 } from 'lucide-react';

// export default function WalkInPatient() {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     address: '',
//     age: '',
//     gender: '' as 'male' | 'female' | 'other' | '',
//     disease: '',
//     medicalHistory: '',
//   });

//   const handleChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const validateForm = () => {
//     const errors: string[] = [];
    
//     if (!formData.name.trim()) {
//       errors.push('Patient name is required.');
//     }
    
//     if (formData.name.trim().length < 3) {
//       errors.push('Name must be at least 3 characters long.');
//     }
    
//     if (!formData.phone.trim()) {
//       errors.push('Phone number is required.');
//     }
    
//     // Match backend validation: 10-digit Indian phone number starting with 6-9
//     const phoneRegex = /^[6-9]\d{9}$/;
//     const cleanPhone = formData.phone.trim().replace(/\D/g, '');
    
//     if (!phoneRegex.test(cleanPhone)) {
//       errors.push('Please enter a valid 10-digit Indian phone number starting with 6-9.');
//     }
    
//     if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.push('Please enter a valid email address.');
//     }
    
//     if (formData.age) {
//       const ageNum = parseInt(formData.age);
//       if (isNaN(ageNum) || ageNum < 0 || ageNum > 150) {
//         errors.push('Age must be between 0 and 150.');
//       }
//     }
    
//     if (!formData.gender) {
//       errors.push('Please select gender.');
//     }
    
//     return errors;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const validationErrors = validateForm();
//     if (validationErrors.length > 0) {
//       toast({
//         title: 'Validation Error',
//         description: validationErrors[0],
//         variant: 'destructive',
//       });
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       // Clean phone number (remove all non-digits)
//       const cleanPhone = formData.phone.trim().replace(/\D/g, '');
      
//       // Get current date and time
//       const now = new Date();
//       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
//       // Prepare patient data according to backend schema
//       const patientData = {
//         name: formData.name.trim(),
//         phone: cleanPhone,
//         email: formData.email.trim() || '',
//         address: formData.address.trim() || '',
//         age: formData.age ? parseInt(formData.age) : undefined,
//         gender: formData.gender as 'male' | 'female' | 'other',
//         disease: formData.disease.trim() || '',
//         medicalHistory: formData.medicalHistory.trim() || '',
//         appointmentDate: today, // Current date
//         appointmentTime: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`,
//         status: 'confirmed',
//         isWalkIn: true
//       };

//       console.log('Sending patient data:', patientData);

//       // Create walk-in patient using your service
//       const patientResponse = await patientService.createWalkInPatient(patientData);
      
//       console.log('API Response:', patientResponse);
      
//       if (!patientResponse.success) {
//         // Check for specific errors
//         if (patientResponse.message?.includes('Phone number already exists')) {
//           throw new Error('This phone number is already registered. Please use a different number.');
//         }
//         throw new Error(patientResponse.message || 'Failed to create patient');
//       }

//       const newPatient = patientResponse.data;
      
//       toast({
//         title: 'Patient Registered Successfully!',
//         description: `${formData.name} has been registered as a walk-in patient.`,
//       });
      
//       // Reset form
//       setFormData({
//         name: '',
//         phone: '',
//         email: '',
//         address: '',
//         age: '',
//         gender: '',
//         disease: '',
//         medicalHistory: '',
//       });
      
//       // Navigate to patient detail page
//       if (newPatient._id) {
//         navigate(`/patients/${newPatient._id}`);
//       } else {
//         navigate('/patients');
//       }
//     } catch (error: any) {
//       console.error('Registration error:', error);
      
//       let errorMessage = 'Failed to register patient. Please try again.';
      
//       if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       } else if (error.message) {
//         errorMessage = error.message;
//       } else if (typeof error === 'string') {
//         errorMessage = error;
//       }
      
//       toast({
//         title: 'Error',
//         description: errorMessage,
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="max-w-2xl">
//         {/* Header */}
//         <div className="page-header">
//           <h1 className="page-title flex items-center gap-3">
//             <UserPlus className="w-7 h-7 text-primary" />
//             Walk-in Patient Registration
//           </h1>
//           <p className="page-subtitle">Quickly register a new walk-in patient and create an immediate appointment</p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="form-section">
//             <h2 className="form-section-title">Basic Information</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name">
//                   Full Name <span className="text-destructive">*</span>
//                 </Label>
//                 <Input
//                   id="name"
//                   value={formData.name}
//                   onChange={(e) => handleChange('name', e.target.value)}
//                   placeholder="Enter patient name (min. 3 characters)"
//                   disabled={isLoading}
//                   required
//                   minLength={3}
//                 />
//                 <p className="text-xs text-muted-foreground">Minimum 3 characters required</p>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="phone">
//                   Phone Number <span className="text-destructive">*</span>
//                 </Label>
//                 <Input
//                   id="phone"
//                   value={formData.phone}
//                   onChange={(e) => handleChange('phone', e.target.value)}
//                   placeholder="9876543210"
//                   disabled={isLoading}
//                   required
//                   pattern="[6-9]\d{9}"
//                   title="10-digit Indian number starting with 6-9"
//                 />
//                 <p className="text-xs text-muted-foreground">10-digit Indian number starting with 6-9</p>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="age">Age</Label>
//                 <Input
//                   id="age"
//                   type="number"
//                   value={formData.age}
//                   onChange={(e) => handleChange('age', e.target.value)}
//                   placeholder="Enter age"
//                   min="0"
//                   max="150"
//                   disabled={isLoading}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="gender">
//                   Gender <span className="text-destructive">*</span>
//                 </Label>
//                 <Select
//                   value={formData.gender}
//                   onValueChange={(value) => handleChange('gender', value)}
//                   disabled={isLoading}
//                   required
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select gender" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="male">Male</SelectItem>
//                     <SelectItem value="female">Female</SelectItem>
//                     <SelectItem value="other">Other</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2 md:col-span-2">
//                 <Label htmlFor="email">Email (Optional)</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => handleChange('email', e.target.value)}
//                   placeholder="patient@email.com"
//                   disabled={isLoading}
//                 />
//               </div>

//               <div className="space-y-2 md:col-span-2">
//                 <Label htmlFor="address">Address (Optional)</Label>
//                 <Textarea
//                   id="address"
//                   value={formData.address}
//                   onChange={(e) => handleChange('address', e.target.value)}
//                   placeholder="Enter full address"
//                   rows={2}
//                   disabled={isLoading}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="form-section">
//             <h2 className="form-section-title">Medical Information</h2>
            
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="disease">Chief Complaint / Disease</Label>
//                 <Textarea
//                   id="disease"
//                   value={formData.disease}
//                   onChange={(e) => handleChange('disease', e.target.value)}
//                   placeholder="Describe the patient's symptoms or reason for visit..."
//                   rows={3}
//                   disabled={isLoading}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="medicalHistory">Medical History (Optional)</Label>
//                 <Textarea
//                   id="medicalHistory"
//                   value={formData.medicalHistory}
//                   onChange={(e) => handleChange('medicalHistory', e.target.value)}
//                   placeholder="Any relevant medical history, allergies, or ongoing medications..."
//                   rows={3}
//                   disabled={isLoading}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="flex gap-4">
//             <Button type="submit" disabled={isLoading} className="flex-1 sm:flex-none">
//               {isLoading ? (
//                 <>
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                   Registering...
//                 </>
//               ) : (
//                 <>
//                   <UserPlus className="w-4 h-4 mr-2" />
//                   Register Patient
//                 </>
//               )}
//             </Button>
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => navigate('/patients')}
//               disabled={isLoading}
//             >
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </div>
//     </AdminLayout>
//   );
// }  

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { patientService } from '@/api/patientService';
import { toast } from '@/hooks/use-toast';
import { UserPlus, Loader2 } from 'lucide-react';

export default function WalkInPatient() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    age: '',
    gender: '' as 'male' | 'female' | 'other' | '',
    disease: '',
    medicalHistory: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const errors: string[] = [];
    
    if (!formData.name.trim()) {
      errors.push('Patient name is required.');
    }
    
    if (formData.name.trim().length < 3) {
      errors.push('Name must be at least 3 characters long.');
    }
    
    if (!formData.phone.trim()) {
      errors.push('Phone number is required.');
    }
    
    // Match backend validation: 10-digit Indian phone number starting with 6-9
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = formData.phone.trim().replace(/\D/g, '');
    
    if (!phoneRegex.test(cleanPhone)) {
      errors.push('Please enter a valid 10-digit Indian phone number starting with 6-9.');
    }
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.push('Please enter a valid email address.');
    }
    
    if (formData.age) {
      const ageNum = parseInt(formData.age);
      if (isNaN(ageNum) || ageNum < 0 || ageNum > 150) {
        errors.push('Age must be between 0 and 150.');
      }
    }
    
    if (!formData.gender) {
      errors.push('Please select gender.');
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      toast({
        title: 'Validation Error',
        description: validationErrors[0],
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Clean phone number (remove all non-digits)
      const cleanPhone = formData.phone.trim().replace(/\D/g, '');
      
      // Get current time
      const now = new Date();
      const appointmentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      // Prepare patient data according to your EXACT backend createWalkInPatient parameters
      const patientData: any = {
        name: formData.name.trim(),
        phone: cleanPhone,
        gender: formData.gender as 'male' | 'female' | 'other',
        appointmentTime: appointmentTime,
      };

      // Add optional fields only if they have values
      if (formData.email.trim()) {
        patientData.email = formData.email.trim();
      }
      
      if (formData.address.trim()) {
        patientData.address = formData.address.trim();
      }
      
      if (formData.age) {
        const ageNum = parseInt(formData.age);
        if (!isNaN(ageNum) && ageNum > 0) {
          patientData.age = ageNum;
        }
      }
      
      if (formData.disease.trim()) {
        patientData.disease = formData.disease.trim();
      }
      
      if (formData.medicalHistory.trim()) {
        patientData.medicalHistory = formData.medicalHistory.trim();
      }

      console.log('Sending walk-in patient data:', patientData);

      // Create walk-in patient using your service
      const patientResponse = await patientService.createWalkInPatient(patientData);
      
      console.log('API Response:', patientResponse);
      
      if (!patientResponse.success) {
        // Check for specific errors
        if (patientResponse.message?.toLowerCase().includes('phone') || 
            patientResponse.message?.toLowerCase().includes('already')) {
          throw new Error('This phone number is already registered. Please use a different number.');
        }
        if (patientResponse.message?.toLowerCase().includes('validation')) {
          throw new Error(patientResponse.message);
        }
        throw new Error(patientResponse.message || 'Failed to register patient');
      }

      const newPatient = patientResponse.data;
      
      toast({
        title: 'Patient Registered Successfully!',
        description: `${formData.name} has been registered as a walk-in patient.`,
      });
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        age: '',
        gender: '',
        disease: '',
        medicalHistory: '',
      });
      
      // Navigate to patient detail page
      if (newPatient._id) {
        navigate(`/patients/${newPatient._id}`);
      } else {
        navigate('/patients');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Failed to register patient. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error.error?.errors) {
        // Handle Mongoose validation errors
        const validationErrors = Object.values(error.error.errors).map((err: any) => err.message).join(', ');
        errorMessage = validationErrors;
      }
      
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title flex items-center gap-3">
            <UserPlus className="w-7 h-7 text-primary" />
            Walk-in Patient Registration
          </h1>
          <p className="page-subtitle">Quickly register a new walk-in patient and create an immediate appointment</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-section">
            <h2 className="form-section-title">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter patient name (min. 3 characters)"
                  disabled={isLoading}
                  required
                  minLength={3}
                />
                <p className="text-xs text-muted-foreground">Minimum 3 characters required</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="9876543210"
                  disabled={isLoading}
                  required
                />
                <p className="text-xs text-muted-foreground">10-digit Indian number starting with 6-9</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  placeholder="Enter age"
                  min="0"
                  max="150"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">
                  Gender <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleChange('gender', value)}
                  disabled={isLoading}
                  required
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
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="patient@email.com"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address (Optional)</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Enter full address"
                  rows={2}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-section-title">Medical Information</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="disease">Chief Complaint / Disease (Optional)</Label>
                <Textarea
                  id="disease"
                  value={formData.disease}
                  onChange={(e) => handleChange('disease', e.target.value)}
                  placeholder="Describe the patient's symptoms or reason for visit..."
                  rows={3}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicalHistory">Medical History (Optional)</Label>
                <Textarea
                  id="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={(e) => handleChange('medicalHistory', e.target.value)}
                  placeholder="Any relevant medical history, allergies, or ongoing medications..."
                  rows={3}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading} className="flex-1 sm:flex-none">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Registering...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register Patient
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/patients')}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}