export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  disease: string;
  medicalHistory: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes: string;
  createdAt: string;
}

export interface Blog {
  id: string;
  titleHindi: string;
  titleEnglish: string;
  content: string;
  excerpt: string;
  category: string;
  readTime: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// Generate mock patients
const generatePatients = (): Patient[] => {
  const names = ['Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sunita Devi', 'Vikram Singh', 'Anita Rao', 'Rajesh Gupta', 'Meera Joshi', 'Suresh Verma', 'Kavita Reddy', 'Deepak Yadav', 'Pooja Iyer', 'Manoj Nair', 'Lakshmi Menon', 'Arun Pillai'];
  const diseases = ['Fever', 'Cold & Cough', 'Headache', 'Diabetes Checkup', 'Blood Pressure', 'General Checkup', 'Stomach Pain', 'Back Pain', 'Skin Allergy', 'Eye Infection'];
  
  return names.map((name, index) => ({
    id: `patient_${index + 1}`,
    name,
    phone: `+91 ${9000000000 + Math.floor(Math.random() * 999999999)}`,
    email: `${name.toLowerCase().replace(' ', '.')}@email.com`,
    address: `${Math.floor(Math.random() * 500) + 1}, Sector ${Math.floor(Math.random() * 50) + 1}, New Delhi`,
    age: Math.floor(Math.random() * 60) + 18,
    gender: ['Male', 'Female', 'Other'][Math.floor(Math.random() * 3)] as 'Male' | 'Female' | 'Other',
    disease: diseases[Math.floor(Math.random() * diseases.length)],
    medicalHistory: Math.random() > 0.5 ? 'Previous history of hypertension. Regular medication ongoing.' : 'No significant medical history.',
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

// Generate mock appointments
const generateAppointments = (patients: Patient[]): Appointment[] => {
  const statuses: Appointment['status'][] = ['pending', 'confirmed', 'completed', 'cancelled'];
  const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00'];
  
  const appointments: Appointment[] = [];
  const today = new Date();
  
  patients.forEach((patient, index) => {
    const daysOffset = Math.floor(Math.random() * 7) - 2; // -2 to +4 days from today
    const appointmentDate = new Date(today);
    appointmentDate.setDate(appointmentDate.getDate() + daysOffset);
    
    appointments.push({
      id: `appointment_${index + 1}`,
      patientId: patient.id,
      patientName: patient.name,
      patientPhone: patient.phone,
      date: appointmentDate.toISOString().split('T')[0],
      time: times[Math.floor(Math.random() * times.length)],
      status: daysOffset < 0 ? 'completed' : statuses[Math.floor(Math.random() * 3)],
      notes: '',
      createdAt: patient.createdAt,
    });
  });
  
  return appointments;
};

// Generate mock blogs
const generateBlogs = (): Blog[] => {
  const blogs = [
    {
      titleHindi: 'स्वस्थ जीवन के लिए 10 टिप्स',
      titleEnglish: '10 Tips for a Healthy Life',
      content: 'Living a healthy life is not just about avoiding illness, but about thriving in all aspects of your well-being...',
      excerpt: 'Discover practical tips to improve your overall health and wellness.',
      category: 'Wellness',
      readTime: 5,
    },
    {
      titleHindi: 'मधुमेह को समझें और नियंत्रित करें',
      titleEnglish: 'Understanding and Managing Diabetes',
      content: 'Diabetes is a chronic condition that affects millions worldwide. Understanding its causes, symptoms, and management is crucial...',
      excerpt: 'Learn how to manage diabetes effectively with proper diet and lifestyle changes.',
      category: 'Disease Management',
      readTime: 8,
    },
    {
      titleHindi: 'हृदय स्वास्थ्य: जानें महत्वपूर्ण बातें',
      titleEnglish: 'Heart Health: Important Things to Know',
      content: 'Your heart is the most vital organ in your body. Taking care of it should be a priority...',
      excerpt: 'Essential information about maintaining a healthy heart.',
      category: 'Cardiology',
      readTime: 6,
    },
  ];
  
  return blogs.map((blog, index) => ({
    id: `blog_${index + 1}`,
    ...blog,
    isPublished: index < 2,
    createdAt: new Date(Date.now() - (index + 1) * 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

// Initialize mock data in localStorage
export const initializeMockData = () => {
  if (!localStorage.getItem('hospital_patients')) {
    const patients = generatePatients();
    localStorage.setItem('hospital_patients', JSON.stringify(patients));
  }
  
  if (!localStorage.getItem('hospital_appointments')) {
    const patients = JSON.parse(localStorage.getItem('hospital_patients') || '[]');
    const appointments = generateAppointments(patients);
    localStorage.setItem('hospital_appointments', JSON.stringify(appointments));
  }
  
  if (!localStorage.getItem('hospital_blogs')) {
    const blogs = generateBlogs();
    localStorage.setItem('hospital_blogs', JSON.stringify(blogs));
  }
};

// Data access functions
export const getPatients = (): Patient[] => {
  return JSON.parse(localStorage.getItem('hospital_patients') || '[]');
};

export const getPatient = (id: string): Patient | undefined => {
  const patients = getPatients();
  return patients.find(p => p.id === id);
};

export const updatePatient = (id: string, data: Partial<Patient>): Patient | undefined => {
  const patients = getPatients();
  const index = patients.findIndex(p => p.id === id);
  if (index !== -1) {
    patients[index] = { ...patients[index], ...data };
    localStorage.setItem('hospital_patients', JSON.stringify(patients));
    return patients[index];
  }
  return undefined;
};

export const addPatient = (data: Omit<Patient, 'id' | 'createdAt'>): Patient => {
  const patients = getPatients();
  const newPatient: Patient = {
    ...data,
    id: `patient_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  patients.unshift(newPatient);
  localStorage.setItem('hospital_patients', JSON.stringify(patients));
  return newPatient;
};

export const getAppointments = (): Appointment[] => {
  return JSON.parse(localStorage.getItem('hospital_appointments') || '[]');
};

export const getAppointment = (id: string): Appointment | undefined => {
  const appointments = getAppointments();
  return appointments.find(a => a.id === id);
};

export const updateAppointment = (id: string, data: Partial<Appointment>): Appointment | undefined => {
  const appointments = getAppointments();
  const index = appointments.findIndex(a => a.id === id);
  if (index !== -1) {
    appointments[index] = { ...appointments[index], ...data };
    localStorage.setItem('hospital_appointments', JSON.stringify(appointments));
    return appointments[index];
  }
  return undefined;
};

export const addAppointment = (data: Omit<Appointment, 'id' | 'createdAt'>): Appointment => {
  const appointments = getAppointments();
  const newAppointment: Appointment = {
    ...data,
    id: `appointment_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  appointments.unshift(newAppointment);
  localStorage.setItem('hospital_appointments', JSON.stringify(appointments));
  return newAppointment;
};

export const getBlogs = (): Blog[] => {
  return JSON.parse(localStorage.getItem('hospital_blogs') || '[]');
};

export const getBlog = (id: string): Blog | undefined => {
  const blogs = getBlogs();
  return blogs.find(b => b.id === id);
};

export const updateBlog = (id: string, data: Partial<Blog>): Blog | undefined => {
  const blogs = getBlogs();
  const index = blogs.findIndex(b => b.id === id);
  if (index !== -1) {
    blogs[index] = { ...blogs[index], ...data, updatedAt: new Date().toISOString() };
    localStorage.setItem('hospital_blogs', JSON.stringify(blogs));
    return blogs[index];
  }
  return undefined;
};

export const addBlog = (data: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>): Blog => {
  const blogs = getBlogs();
  const now = new Date().toISOString();
  const newBlog: Blog = {
    ...data,
    id: `blog_${Date.now()}`,
    createdAt: now,
    updatedAt: now,
  };
  blogs.unshift(newBlog);
  localStorage.setItem('hospital_blogs', JSON.stringify(blogs));
  return newBlog;
};

export const deleteBlog = (id: string): boolean => {
  const blogs = getBlogs();
  const filtered = blogs.filter(b => b.id !== id);
  if (filtered.length !== blogs.length) {
    localStorage.setItem('hospital_blogs', JSON.stringify(filtered));
    return true;
  }
  return false;
};

// Stats functions
export const getDashboardStats = () => {
  const patients = getPatients();
  const appointments = getAppointments();
  const today = new Date().toISOString().split('T')[0];
  
  const todaysAppointments = appointments.filter(a => a.date === today);
  const pendingAppointments = appointments.filter(a => a.status === 'pending');
  const confirmedAppointments = appointments.filter(a => a.status === 'confirmed');
  
  return {
    totalPatients: patients.length,
    todaysPatients: todaysAppointments.length,
    pendingAppointments: pendingAppointments.length,
    confirmedAppointments: confirmedAppointments.length,
  };
};
