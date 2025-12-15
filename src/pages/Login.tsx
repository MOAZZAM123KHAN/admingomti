// // import { useState } from 'react';
// // import { useNavigate, useLocation } from 'react-router-dom';
// // import { useAuth } from '@/contexts/AuthContext';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Stethoscope, Loader2, Eye, EyeOff } from 'lucide-react';
// // import { toast } from '@/hooks/use-toast';

// // export default function Login() {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const { login } = useAuth();
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const from = location.state?.from?.pathname || '/';

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
    
// //     if (!username || !password) {
// //       toast({
// //         title: 'Validation Error',
// //         description: 'Please enter both username and password.',
// //         variant: 'destructive',
// //       });
// //       return;
// //     }

// //     setIsLoading(true);
    
// //     try {
// //       const success = await login(username, password);
      
// //       if (success) {
// //         toast({
// //           title: 'Welcome back!',
// //           description: 'You have successfully logged in.',
// //         });
// //         navigate(from, { replace: true });
// //       } else {
// //         toast({
// //           title: 'Login Failed',
// //           description: 'Invalid username or password. Please try again.',
// //           variant: 'destructive',
// //         });
// //       }
// //     } catch {
// //       toast({
// //         title: 'Error',
// //         description: 'An unexpected error occurred. Please try again.',
// //         variant: 'destructive',
// //       });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-primary/5 p-4">
// //       <div className="w-full max-w-md animate-scale-in">
// //         {/* Logo */}
// //         <div className="flex flex-col items-center mb-8">
// //           <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-lg">
// //             <Stethoscope className="w-9 h-9 text-primary-foreground" />
// //           </div>
// //           <h1 className="text-2xl font-bold text-foreground">Gomati Hospital </h1>
// //           <p className="text-muted-foreground text-sm mt-1">Gomati Hospital Admin Management System</p>
// //         </div>

// //         <Card className="shadow-lg border-border/50">
// //           <CardHeader className="text-center pb-4">
// //             <CardTitle className="text-xl">Welcome Back</CardTitle>
// //             <CardDescription>Sign in to access the admin panel</CardDescription>
// //           </CardHeader>
// //           <CardContent>
// //             <form onSubmit={handleSubmit} className="space-y-4">
// //               <div className="space-y-2">
// //                 <Label htmlFor="username">Username</Label>
// //                 <Input
// //                   id="username"
// //                   type="text"
// //                   placeholder="Enter your username"
// //                   value={username}
// //                   onChange={(e) => setUsername(e.target.value)}
// //                   disabled={isLoading}
// //                   autoComplete="username"
// //                 />
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="password">Password</Label>
// //                 <div className="relative">
// //                   <Input
// //                     id="password"
// //                     type={showPassword ? 'text' : 'password'}
// //                     placeholder="Enter your password"
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     disabled={isLoading}
// //                     autoComplete="current-password"
// //                     className="pr-10"
// //                   />
// //                   <button
// //                     type="button"
// //                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
// //                     onClick={() => setShowPassword(!showPassword)}
// //                   >
// //                     {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //                   </button>
// //                 </div>
// //               </div>

// //               <Button type="submit" className="w-full" disabled={isLoading}>
// //                 {isLoading ? (
// //                   <>
// //                     <Loader2 className="w-4 h-4 mr-2 animate-spin" />
// //                     Signing in...
// //                   </>
// //                 ) : (
// //                   'Sign In'
// //                 )}
// //               </Button>
// //             </form>

// //             {/* Demo Credentials */}
// //             <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
// //               <p className="text-xs font-medium text-muted-foreground mb-2">Demo Credentials:</p>
// //               <div className="space-y-1 text-xs">
// //                 <p><span className="text-muted-foreground">Admin:</span> <code className="bg-background px-1.5 py-0.5 rounded">admin / admin123</code></p>
// //                 <p><span className="text-muted-foreground">Reception:</span> <code className="bg-background px-1.5 py-0.5 rounded">reception / reception123</code></p>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }


// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Stethoscope, Loader2, Eye, EyeOff } from 'lucide-react';
// import { toast } from '@/hooks/use-toast';

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const from = location.state?.from?.pathname || '/';

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!username || !password) {
//       toast({
//         title: 'Validation Error',
//         description: 'Please enter both username and password.',
//         variant: 'destructive',
//       });
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       const result = await login(username, password);
      
//       if (result.success) {
//         toast({
//           title: 'Welcome back!',
//           description: 'You have successfully logged in.',
//         });
//         navigate(from, { replace: true });
//       } else {
//         toast({
//           title: 'Login Failed',
//           description: result.message || 'Invalid username or password. Please try again.',
//           variant: 'destructive',
//         });
//       }
//     } catch (error: any) {
//       toast({
//         title: 'Error',
//         description: error.response?.data?.message || 'An unexpected error occurred. Please try again.',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-primary/5 p-4">
//       <div className="w-full max-w-md animate-scale-in">
//         {/* Logo */}
//         <div className="flex flex-col items-center mb-8">
//           <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-lg">
//             <Stethoscope className="w-9 h-9 text-primary-foreground" />
//           </div>
//           <h1 className="text-2xl font-bold text-foreground">Gomati Hospital</h1>
//           <p className="text-muted-foreground text-sm mt-1">Gomati Hospital Admin Management System</p>
//         </div>

//         <Card className="shadow-lg border-border/50">
//           <CardHeader className="text-center pb-4">
//             <CardTitle className="text-xl">Welcome Back</CardTitle>
//             <CardDescription>Sign in to access the admin panel</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="username">Username</Label>
//                 <Input
//                   id="username"
//                   type="text"
//                   placeholder="Enter your username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   disabled={isLoading}
//                   autoComplete="username"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Input
//                     id="password"
//                     type={showPassword ? 'text' : 'password'}
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     disabled={isLoading}
//                     autoComplete="current-password"
//                     className="pr-10"
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                   </button>
//                 </div>
//               </div>

//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                     Signing in...
//                   </>
//                 ) : (
//                   'Sign In'
//                 )}
//               </Button>
//             </form>

//             {/* Demo Credentials */}
//             <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
//               <p className="text-xs font-medium text-muted-foreground mb-2">Demo Credentials:</p>
//               <div className="space-y-1 text-xs">
//                 <p>
//                   <span className="text-muted-foreground">Admin:</span>{' '}
//                   <code className="bg-background px-1.5 py-0.5 rounded">admin / admin123</code>
//                 </p>
//                 <p>
//                   <span className="text-muted-foreground">Receptionist:</span>{' '}
//                   <code className="bg-background px-1.5 py-0.5 rounded">reception / reception123</code>
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }



import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, Loader2, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: 'Validation Error',
        description: 'Please enter both username and password.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await login(username, password);
      
      if (result.success) {
        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in.',
        });
        navigate(from, { replace: true });
      } else {
        toast({
          title: 'Login Failed',
          description: result.message || 'Invalid username or password.',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-primary/5 p-4">
      <div className="w-full max-w-md animate-scale-in">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-lg">
            <Stethoscope className="w-9 h-9 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Gomati Hospital</h1>
          <p className="text-muted-foreground text-sm mt-1">Gomati Hospital Admin Management System</p>
        </div>

        <Card className="shadow-lg border-border/50">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  autoComplete="username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    autoComplete="current-password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
              <p className="text-xs font-medium text-muted-foreground mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-xs">
                <p>
                  <span className="text-muted-foreground">Username:</span>{' '}
                  <code className="bg-background px-1.5 py-0.5 rounded">admin</code>
                </p>
                <p>
                  <span className="text-muted-foreground">Password:</span>{' '}
                  <code className="bg-background px-1.5 py-0.5 rounded">admin123</code>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}