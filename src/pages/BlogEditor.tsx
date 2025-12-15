// // // import { useState, useEffect } from 'react';
// // // import { useParams, useNavigate } from 'react-router-dom';
// // // import { AdminLayout } from '@/components/layout/AdminLayout';
// // // import { Button } from '@/components/ui/button';
// // // import { Input } from '@/components/ui/input';
// // // import { Label } from '@/components/ui/label';
// // // import { Textarea } from '@/components/ui/textarea';
// // // import { Switch } from '@/components/ui/switch';
// // // import { getBlog, addBlog, updateBlog, Blog } from '@/lib/mockData';
// // // import { toast } from '@/hooks/use-toast';
// // // import { ArrowLeft, Save, Eye, Loader2 } from 'lucide-react';

// // // export default function BlogEditor() {
// // //   const { id } = useParams<{ id: string }>();
// // //   const navigate = useNavigate();
// // //   const isEditing = !!id;
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [showPreview, setShowPreview] = useState(false);
  
// // //   const [formData, setFormData] = useState({
// // //     titleHindi: '',
// // //     titleEnglish: '',
// // //     content: '',
// // //     excerpt: '',
// // //     category: '',
// // //     readTime: 5,
// // //     isPublished: false,
// // //   });

// // //   useEffect(() => {
// // //     if (id) {
// // //       const blog = getBlog(id);
// // //       if (blog) {
// // //         setFormData({
// // //           titleHindi: blog.titleHindi,
// // //           titleEnglish: blog.titleEnglish,
// // //           content: blog.content,
// // //           excerpt: blog.excerpt,
// // //           category: blog.category,
// // //           readTime: blog.readTime,
// // //           isPublished: blog.isPublished,
// // //         });
// // //       } else {
// // //         navigate('/blogs');
// // //       }
// // //     }
// // //   }, [id, navigate]);

// // //   const handleChange = (field: string, value: string | number | boolean) => {
// // //     setFormData(prev => ({ ...prev, [field]: value }));
// // //   };

// // //   const handleSubmit = async (publish: boolean = false) => {
// // //     if (!formData.titleEnglish.trim()) {
// // //       toast({
// // //         title: 'Validation Error',
// // //         description: 'English title is required.',
// // //         variant: 'destructive',
// // //       });
// // //       return;
// // //     }

// // //     if (!formData.content.trim()) {
// // //       toast({
// // //         title: 'Validation Error',
// // //         description: 'Content is required.',
// // //         variant: 'destructive',
// // //       });
// // //       return;
// // //     }

// // //     setIsLoading(true);
    
// // //     try {
// // //       await new Promise(resolve => setTimeout(resolve, 500));
      
// // //       const dataToSave = {
// // //         ...formData,
// // //         isPublished: publish ? true : formData.isPublished,
// // //       };

// // //       if (isEditing && id) {
// // //         updateBlog(id, dataToSave);
// // //         toast({
// // //           title: 'Blog Updated',
// // //           description: 'Your blog post has been updated successfully.',
// // //         });
// // //       } else {
// // //         addBlog(dataToSave);
// // //         toast({
// // //           title: 'Blog Created',
// // //           description: publish ? 'Your blog post has been published.' : 'Your blog post has been saved as draft.',
// // //         });
// // //       }
      
// // //       navigate('/blogs');
// // //     } catch {
// // //       toast({
// // //         title: 'Error',
// // //         description: 'Failed to save blog post. Please try again.',
// // //         variant: 'destructive',
// // //       });
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   if (showPreview) {
// // //     return (
// // //       <AdminLayout>
// // //         <div className="max-w-3xl">
// // //           <div className="flex items-center justify-between mb-6">
// // //             <Button variant="ghost" onClick={() => setShowPreview(false)}>
// // //               <ArrowLeft className="w-4 h-4 mr-2" />
// // //               Back to Editor
// // //             </Button>
// // //           </div>
          
// // //           <article className="bg-card rounded-xl border border-border p-8 shadow-sm">
// // //             <div className="mb-6">
// // //               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
// // //                 {formData.category || 'Uncategorized'}
// // //               </span>
// // //               <h1 className="text-3xl font-bold text-foreground mb-2">{formData.titleEnglish || 'Untitled'}</h1>
// // //               <h2 className="text-xl text-muted-foreground mb-4">{formData.titleHindi}</h2>
// // //               <p className="text-sm text-muted-foreground">{formData.readTime} min read</p>
// // //             </div>
            
// // //             {formData.excerpt && (
// // //               <p className="text-lg text-muted-foreground mb-6 italic border-l-4 border-primary/30 pl-4">
// // //                 {formData.excerpt}
// // //               </p>
// // //             )}
            
// // //             <div className="prose prose-gray max-w-none">
// // //               <p className="whitespace-pre-wrap text-foreground">{formData.content}</p>
// // //             </div>
// // //           </article>
// // //         </div>
// // //       </AdminLayout>
// // //     );
// // //   }

// // //   return (
// // //     <AdminLayout>
// // //       <div className="max-w-3xl">
// // //         {/* Header */}
// // //         <div className="flex items-center gap-4 mb-6">
// // //           <Button variant="ghost" size="icon" onClick={() => navigate('/blogs')}>
// // //             <ArrowLeft className="w-5 h-5" />
// // //           </Button>
// // //           <div className="flex-1">
// // //             <h1 className="page-title">{isEditing ? 'Edit Blog Post' : 'Create New Blog'}</h1>
// // //             <p className="page-subtitle">Write and publish health awareness content</p>
// // //           </div>
// // //         </div>

// // //         {/* Form */}
// // //         <div className="space-y-6">
// // //           <div className="form-section">
// // //             <h2 className="form-section-title">Blog Details</h2>
            
// // //             <div className="space-y-4">
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="titleEnglish">
// // //                   Title (English) <span className="text-destructive">*</span>
// // //                 </Label>
// // //                 <Input
// // //                   id="titleEnglish"
// // //                   value={formData.titleEnglish}
// // //                   onChange={(e) => handleChange('titleEnglish', e.target.value)}
// // //                   placeholder="Enter blog title in English"
// // //                   disabled={isLoading}
// // //                 />
// // //               </div>

// // //               <div className="space-y-2">
// // //                 <Label htmlFor="titleHindi">Title (Hindi)</Label>
// // //                 <Input
// // //                   id="titleHindi"
// // //                   value={formData.titleHindi}
// // //                   onChange={(e) => handleChange('titleHindi', e.target.value)}
// // //                   placeholder="हिंदी में ब्लॉग शीर्षक दर्ज करें"
// // //                   disabled={isLoading}
// // //                 />
// // //               </div>

// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                 <div className="space-y-2">
// // //                   <Label htmlFor="category">Category</Label>
// // //                   <Input
// // //                     id="category"
// // //                     value={formData.category}
// // //                     onChange={(e) => handleChange('category', e.target.value)}
// // //                     placeholder="e.g., Wellness, Cardiology"
// // //                     disabled={isLoading}
// // //                   />
// // //                 </div>

// // //                 <div className="space-y-2">
// // //                   <Label htmlFor="readTime">Read Time (minutes)</Label>
// // //                   <Input
// // //                     id="readTime"
// // //                     type="number"
// // //                     min="1"
// // //                     max="60"
// // //                     value={formData.readTime}
// // //                     onChange={(e) => handleChange('readTime', parseInt(e.target.value) || 5)}
// // //                     disabled={isLoading}
// // //                   />
// // //                 </div>
// // //               </div>

// // //               <div className="space-y-2">
// // //                 <Label htmlFor="excerpt">Excerpt / Summary</Label>
// // //                 <Textarea
// // //                   id="excerpt"
// // //                   value={formData.excerpt}
// // //                   onChange={(e) => handleChange('excerpt', e.target.value)}
// // //                   placeholder="A brief summary of the blog post..."
// // //                   rows={2}
// // //                   disabled={isLoading}
// // //                 />
// // //               </div>
// // //             </div>
// // //           </div>

// // //           <div className="form-section">
// // //             <h2 className="form-section-title">Content</h2>
            
// // //             <div className="space-y-2">
// // //               <Label htmlFor="content">
// // //                 Blog Content <span className="text-destructive">*</span>
// // //               </Label>
// // //               <Textarea
// // //                 id="content"
// // //                 value={formData.content}
// // //                 onChange={(e) => handleChange('content', e.target.value)}
// // //                 placeholder="Write your blog content here..."
// // //                 rows={12}
// // //                 disabled={isLoading}
// // //                 className="font-mono text-sm"
// // //               />
// // //               <p className="text-xs text-muted-foreground">
// // //                 Write in plain text. Basic formatting will be preserved.
// // //               </p>
// // //             </div>
// // //           </div>

// // //           <div className="form-section">
// // //             <div className="flex items-center justify-between">
// // //               <div>
// // //                 <h2 className="font-semibold text-foreground">Publish Status</h2>
// // //                 <p className="text-sm text-muted-foreground">
// // //                   {formData.isPublished ? 'This post is publicly visible' : 'This post is saved as a draft'}
// // //                 </p>
// // //               </div>
// // //               <Switch
// // //                 checked={formData.isPublished}
// // //                 onCheckedChange={(checked) => handleChange('isPublished', checked)}
// // //                 disabled={isLoading}
// // //               />
// // //             </div>
// // //           </div>

// // //           {/* Actions */}
// // //           <div className="flex flex-wrap gap-3">
// // //             <Button
// // //               variant="outline"
// // //               onClick={() => setShowPreview(true)}
// // //               disabled={isLoading}
// // //             >
// // //               <Eye className="w-4 h-4 mr-2" />
// // //               Preview
// // //             </Button>
            
// // //             <div className="flex-1" />
            
// // //             <Button
// // //               variant="outline"
// // //               onClick={() => handleSubmit(false)}
// // //               disabled={isLoading}
// // //             >
// // //               {isLoading ? (
// // //                 <Loader2 className="w-4 h-4 mr-2 animate-spin" />
// // //               ) : (
// // //                 <Save className="w-4 h-4 mr-2" />
// // //               )}
// // //               Save as Draft
// // //             </Button>
            
// // //             <Button
// // //               onClick={() => handleSubmit(true)}
// // //               disabled={isLoading}
// // //             >
// // //               {isLoading ? (
// // //                 <Loader2 className="w-4 h-4 mr-2 animate-spin" />
// // //               ) : null}
// // //               {isEditing ? 'Update & Publish' : 'Publish Now'}
// // //             </Button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </AdminLayout>
// // //   );
// // // }


// // import { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { AdminLayout } from '@/components/layout/AdminLayout';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Textarea } from '@/components/ui/textarea';
// // import { Switch } from '@/components/ui/switch';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // import { blogService } from '@/api/blog.Service';
// // import { toast } from '@/hooks/use-toast';
// // import { ArrowLeft, Save, Eye, Loader2, Globe, Lock, Calendar } from 'lucide-react';

// // interface BlogFormData {
// //   titleHindi: string;
// //   titleEnglish: string;
// //   content: string;
// //   excerpt: string;
// //   category: string;
// //   readTime: number;
// //   isPublished: boolean;
// // }

// // interface Blog {
// //   _id: string;
// //   titleHindi: string;
// //   titleEnglish: string;
// //   content: string;
// //   excerpt: string;
// //   category: string;
// //   readTime: number;
// //   isPublished: boolean;
// //   slug: string;
// //   views: number;
// //   author: string;
// //   createdAt: string;
// //   updatedAt: string;
// // }

// // export default function BlogEditor() {
// //   const { id } = useParams<{ id: string }>();
// //   const navigate = useNavigate();
// //   const isEditing = !!id;
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [loadingBlog, setLoadingBlog] = useState(false);
// //   const [showPreview, setShowPreview] = useState(false);
  
// //   const [formData, setFormData] = useState<BlogFormData>({
// //     titleHindi: '',
// //     titleEnglish: '',
// //     content: '',
// //     excerpt: '',
// //     category: '',
// //     readTime: 5,
// //     isPublished: false,
// //   });

// //   // Common categories
// //   const categories = [
// //     'General Health',
// //     'Cardiology',
// //     'Dermatology',
// //     'Pediatrics',
// //     'Orthopedics',
// //     'Mental Health',
// //     'Nutrition',
// //     'Wellness',
// //     'Disease Prevention',
// //     'First Aid',
// //     'Women Health',
// //     'Men Health',
// //     'Senior Health'
// //   ];

// //   useEffect(() => {
// //     if (id) {
// //       fetchBlog();
// //     }
// //   }, [id]);

// //   const fetchBlog = async () => {
// //     try {
// //       setLoadingBlog(true);
// //       const response = await blogService.getBlogById(id!);
      
// //       if (response.success) {
// //         const blog = response.data;
// //         setFormData({
// //           titleHindi: blog.titleHindi || '',
// //           titleEnglish: blog.titleEnglish || '',
// //           content: blog.content || '',
// //           excerpt: blog.excerpt || '',
// //           category: blog.category || '',
// //           readTime: blog.readTime || 5,
// //           isPublished: blog.isPublished || false,
// //         });
// //       } else {
// //         toast({
// //           title: 'Error',
// //           description: response.message || 'Blog not found',
// //           variant: 'destructive',
// //         });
// //         navigate('/blogs');
// //       }
// //     } catch (error: any) {
// //       console.error('Fetch blog error:', error);
// //       toast({
// //         title: 'Error',
// //         description: error.response?.data?.message || 'Failed to load blog',
// //         variant: 'destructive',
// //       });
// //       navigate('/blogs');
// //     } finally {
// //       setLoadingBlog(false);
// //     }
// //   };

// //   const handleChange = (field: keyof BlogFormData, value: string | number | boolean) => {
// //     setFormData(prev => ({ ...prev, [field]: value }));
// //   };

// //   const validateForm = () => {
// //     const errors: string[] = [];
    
// //     if (!formData.titleEnglish.trim()) {
// //       errors.push('English title is required.');
// //     }
    
// //     if (formData.titleEnglish.trim().length < 5) {
// //       errors.push('English title should be at least 5 characters.');
// //     }
    
// //     if (!formData.content.trim()) {
// //       errors.push('Content is required.');
// //     }
    
// //     if (formData.content.trim().length < 100) {
// //       errors.push('Content should be at least 100 characters.');
// //     }
    
// //     if (!formData.category.trim()) {
// //       errors.push('Category is required.');
// //     }
    
// //     return errors;
// //   };

// //   const handleSubmit = async (publish: boolean = false) => {
// //     const validationErrors = validateForm();
// //     if (validationErrors.length > 0) {
// //       toast({
// //         title: 'Validation Error',
// //         description: validationErrors[0],
// //         variant: 'destructive',
// //       });
// //       return;
// //     }

// //     setIsLoading(true);
    
// //     try {
// //       const dataToSave = {
// //         ...formData,
// //         isPublished: publish ? true : formData.isPublished,
// //       };

// //       let response;
// //       if (isEditing && id) {
// //         response = await blogService.updateBlog(id, dataToSave);
// //       } else {
// //         response = await blogService.createBlog(dataToSave);
// //       }
      
// //       if (response.success) {
// //         toast({
// //           title: isEditing ? 'Blog Updated' : 'Blog Created',
// //           description: publish 
// //             ? 'Your blog post has been published successfully.' 
// //             : 'Your blog post has been saved as draft.',
// //         });
        
// //         // Navigate to the blog detail page or blogs list
// //         if (response.data?._id) {
// //           navigate(`/blogs/${response.data._id}`);
// //         } else {
// //           navigate('/blogs');
// //         }
// //       } else {
// //         throw new Error(response.message || 'Failed to save blog');
// //       }
// //     } catch (error: any) {
// //       console.error('Save blog error:', error);
// //       toast({
// //         title: 'Error',
// //         description: error.response?.data?.message || error.message || 'Failed to save blog post. Please try again.',
// //         variant: 'destructive',
// //       });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleSaveDraft = async () => {
// //     if (!formData.titleEnglish.trim()) {
// //       toast({
// //         title: 'Validation Error',
// //         description: 'Title is required to save as draft.',
// //         variant: 'destructive',
// //       });
// //       return;
// //     }

// //     await handleSubmit(false);
// //   };

// //   const formatDate = (dateString: string) => {
// //     try {
// //       const date = new Date(dateString);
// //       return date.toLocaleDateString('en-IN', {
// //         day: 'numeric',
// //         month: 'short',
// //         year: 'numeric',
// //         hour: '2-digit',
// //         minute: '2-digit'
// //       });
// //     } catch {
// //       return dateString;
// //     }
// //   };

// //   if (loadingBlog) {
// //     return (
// //       <AdminLayout>
// //         <div className="flex flex-col items-center justify-center min-h-[60vh]">
// //           <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
// //           <p className="text-muted-foreground">Loading blog...</p>
// //         </div>
// //       </AdminLayout>
// //     );
// //   }

// //   if (showPreview) {
// //     return (
// //       <AdminLayout>
// //         <div className="max-w-4xl mx-auto">
// //           <div className="flex items-center justify-between mb-6">
// //             <Button variant="ghost" onClick={() => setShowPreview(false)}>
// //               <ArrowLeft className="w-4 h-4 mr-2" />
// //               Back to Editor
// //             </Button>
// //             <div className="flex gap-2">
// //               <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${formData.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
// //                 {formData.isPublished ? (
// //                   <>
// //                     <Globe className="w-3 h-3 mr-1" />
// //                     Published
// //                   </>
// //                 ) : (
// //                   <>
// //                     <Lock className="w-3 h-3 mr-1" />
// //                     Draft
// //                   </>
// //                 )}
// //               </span>
// //             </div>
// //           </div>
          
// //           <article className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
// //             <div className="mb-8">
// //               <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
// //                 {formData.category || 'Uncategorized'}
// //               </span>
// //               <h1 className="text-4xl font-bold text-gray-900 mb-3">{formData.titleEnglish || 'Untitled'}</h1>
// //               {formData.titleHindi && (
// //                 <h2 className="text-2xl text-gray-700 mb-6 font-medium">{formData.titleHindi}</h2>
// //               )}
// //               <div className="flex items-center gap-4 text-sm text-gray-500">
// //                 <span className="flex items-center gap-1">
// //                   <Calendar className="w-4 h-4" />
// //                   {formatDate(new Date().toISOString())}
// //                 </span>
// //                 <span>•</span>
// //                 <span>{formData.readTime} min read</span>
// //               </div>
// //             </div>
            
// //             {formData.excerpt && (
// //               <div className="mb-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
// //                 <p className="text-lg text-gray-700 italic">{formData.excerpt}</p>
// //               </div>
// //             )}
            
// //             <div className="prose prose-lg max-w-none">
// //               <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
// //                 {formData.content.split('\n').map((paragraph, index) => (
// //                   paragraph.trim() ? (
// //                     <p key={index} className="mb-6">{paragraph}</p>
// //                   ) : (
// //                     <br key={index} />
// //                   )
// //                 ))}
// //               </div>
// //             </div>
            
// //             <div className="mt-12 pt-8 border-t border-gray-200">
// //               <div className="flex items-center gap-4">
// //                 <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
// //                   <span className="font-semibold text-gray-700">A</span>
// //                 </div>
// //                 <div>
// //                   <p className="font-medium text-gray-900">Admin</p>
// //                   <p className="text-sm text-gray-500">Hospital Administrator</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </article>
// //         </div>
// //       </AdminLayout>
// //     );
// //   }

// //   return (
// //     <AdminLayout>
// //       <div className="max-w-4xl mx-auto">
// //         {/* Header */}
// //         <div className="flex items-center gap-4 mb-6">
// //           <Button variant="ghost" size="icon" onClick={() => navigate('/blogs')}>
// //             <ArrowLeft className="w-5 h-5" />
// //           </Button>
// //           <div className="flex-1">
// //             <h1 className="page-title">{isEditing ? 'Edit Blog Post' : 'Create New Blog'}</h1>
// //             <p className="page-subtitle">Write and publish health awareness content for your audience</p>
// //           </div>
// //           <div className="flex gap-2">
// //             <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${formData.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
// //               {formData.isPublished ? (
// //                 <>
// //                   <Globe className="w-3 h-3 mr-1" />
// //                   Published
// //                 </>
// //               ) : (
// //                 <>
// //                   <Lock className="w-3 h-3 mr-1" />
// //                   Draft
// //                 </>
// //               )}
// //             </span>
// //           </div>
// //         </div>

// //         {/* Form */}
// //         <div className="space-y-8">
// //           <div className="form-section">
// //             <h2 className="form-section-title">Blog Details</h2>
            
// //             <div className="space-y-6">
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 <div className="space-y-3">
// //                   <Label htmlFor="titleEnglish">
// //                     Title (English) <span className="text-destructive">*</span>
// //                   </Label>
// //                   <Input
// //                     id="titleEnglish"
// //                     value={formData.titleEnglish}
// //                     onChange={(e) => handleChange('titleEnglish', e.target.value)}
// //                     placeholder="Enter blog title in English"
// //                     disabled={isLoading}
// //                     className="text-lg"
// //                   />
// //                   <p className="text-xs text-muted-foreground">
// //                     Catchy and descriptive title that attracts readers
// //                   </p>
// //                 </div>

// //                 <div className="space-y-3">
// //                   <Label htmlFor="titleHindi">Title (Hindi)</Label>
// //                   <Input
// //                     id="titleHindi"
// //                     value={formData.titleHindi}
// //                     onChange={(e) => handleChange('titleHindi', e.target.value)}
// //                     placeholder="हिंदी में ब्लॉग शीर्षक दर्ज करें"
// //                     disabled={isLoading}
// //                     className="text-lg"
// //                   />
// //                   <p className="text-xs text-muted-foreground">
// //                     Optional Hindi title for better reach
// //                   </p>
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 <div className="space-y-3">
// //                   <Label htmlFor="category">
// //                     Category <span className="text-destructive">*</span>
// //                   </Label>
// //                   <Select
// //                     value={formData.category}
// //                     onValueChange={(value) => handleChange('category', value)}
// //                     disabled={isLoading}
// //                   >
// //                     <SelectTrigger>
// //                       <SelectValue placeholder="Select a category" />
// //                     </SelectTrigger>
// //                     <SelectContent>
// //                       {categories.map(cat => (
// //                         <SelectItem key={cat} value={cat}>{cat}</SelectItem>
// //                       ))}
// //                       <SelectItem value="Other">Other (specify below)</SelectItem>
// //                     </SelectContent>
// //                   </Select>
// //                   {formData.category === 'Other' && (
// //                     <Input
// //                       placeholder="Enter custom category"
// //                       value={formData.category}
// //                       onChange={(e) => handleChange('category', e.target.value)}
// //                       disabled={isLoading}
// //                       className="mt-2"
// //                     />
// //                   )}
// //                 </div>

// //                 <div className="space-y-3">
// //                   <Label htmlFor="readTime">Estimated Read Time</Label>
// //                   <div className="flex items-center gap-4">
// //                     <Input
// //                       id="readTime"
// //                       type="number"
// //                       min="1"
// //                       max="60"
// //                       value={formData.readTime}
// //                       onChange={(e) => handleChange('readTime', parseInt(e.target.value) || 5)}
// //                       disabled={isLoading}
// //                       className="w-24"
// //                     />
// //                     <span className="text-sm text-muted-foreground">minutes</span>
// //                   </div>
// //                   <p className="text-xs text-muted-foreground">
// //                     Estimated time to read the entire article
// //                   </p>
// //                 </div>
// //               </div>

// //               <div className="space-y-3">
// //                 <Label htmlFor="excerpt">Excerpt / Summary</Label>
// //                 <Textarea
// //                   id="excerpt"
// //                   value={formData.excerpt}
// //                   onChange={(e) => handleChange('excerpt', e.target.value)}
// //                   placeholder="Write a compelling summary that appears on blog listings..."
// //                   rows={3}
// //                   disabled={isLoading}
// //                 />
// //                 <p className="text-xs text-muted-foreground">
// //                   Keep it brief (1-2 sentences) to hook readers
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="form-section">
// //             <h2 className="form-section-title mb-4">Content</h2>
            
// //             <div className="space-y-4">
// //               <div className="flex justify-between items-center">
// //                 <Label htmlFor="content">
// //                   Blog Content <span className="text-destructive">*</span>
// //                 </Label>
// //                 <span className="text-sm text-muted-foreground">
// //                   {formData.content.length} characters
// //                 </span>
// //               </div>
// //               <Textarea
// //                 id="content"
// //                 value={formData.content}
// //                 onChange={(e) => handleChange('content', e.target.value)}
// //                 placeholder={`Start writing your blog content here...

// // • Use clear, simple language
// // • Break content into paragraphs
// // • Add relevant information
// // • Include actionable tips
// // • End with a conclusion

// // Write in a friendly, informative tone that helps readers understand health topics better.`}
// //                 rows={20}
// //                 disabled={isLoading}
// //                 className="font-sans text-base leading-relaxed min-h-[400px] resize-y"
// //               />
// //               <div className="text-xs text-muted-foreground space-y-1">
// //                 <p>• Minimum 100 characters required</p>
// //                 <p>• Use paragraphs for better readability</p>
// //                 <p>• Simple language helps reach wider audience</p>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="form-section">
// //             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
// //               <div className="space-y-1">
// //                 <div className="flex items-center gap-2">
// //                   <h2 className="font-semibold text-foreground">Publish Status</h2>
// //                   <span className={`text-xs px-2 py-1 rounded ${formData.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
// //                     {formData.isPublished ? 'PUBLIC' : 'DRAFT'}
// //                   </span>
// //                 </div>
// //                 <p className="text-sm text-muted-foreground">
// //                   {formData.isPublished 
// //                     ? 'This post is visible to all website visitors' 
// //                     : 'Only administrators can view this draft'
// //                   }
// //                 </p>
// //               </div>
// //               <div className="flex items-center gap-3">
// //                 <span className="text-sm text-muted-foreground">
// //                   {formData.isPublished ? 'Published' : 'Draft'}
// //                 </span>
// //                 <Switch
// //                   checked={formData.isPublished}
// //                   onCheckedChange={(checked) => handleChange('isPublished', checked)}
// //                   disabled={isLoading}
// //                 />
// //               </div>
// //             </div>
// //           </div>

// //           {/* Actions */}
// //           <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
// //             <div className="flex gap-3">
// //               <Button
// //                 variant="outline"
// //                 onClick={() => setShowPreview(true)}
// //                 disabled={isLoading || !formData.titleEnglish || !formData.content}
// //               >
// //                 <Eye className="w-4 h-4 mr-2" />
// //                 Preview
// //               </Button>
              
// //               <Button
// //                 variant="outline"
// //                 onClick={handleSaveDraft}
// //                 disabled={isLoading || !formData.titleEnglish}
// //               >
// //                 {isLoading ? (
// //                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
// //                 ) : (
// //                   <Save className="w-4 h-4 mr-2" />
// //                 )}
// //                 Save as Draft
// //               </Button>
// //             </div>
            
// //             <div className="flex-1" />
            
// //             <div className="flex gap-3">
// //               <Button
// //                 variant="outline"
// //                 onClick={() => navigate('/blogs')}
// //                 disabled={isLoading}
// //               >
// //                 Cancel
// //               </Button>
              
// //               <Button
// //                 onClick={() => handleSubmit(true)}
// //                 disabled={isLoading || !formData.titleEnglish || !formData.content}
// //                 className="min-w-[140px]"
// //               >
// //                 {isLoading ? (
// //                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
// //                 ) : null}
// //                 {isEditing 
// //                   ? (formData.isPublished ? 'Update' : 'Update & Publish')
// //                   : 'Publish Now'
// //                 }
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </AdminLayout>
// //   );
// // }  


// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { AdminLayout } from '@/components/layout/AdminLayout';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Switch } from '@/components/ui/switch';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { blogService } from '@/api/blog.Service';
// import { toast } from '@/hooks/use-toast';
// import { ArrowLeft, Save, Eye, Loader2, Globe, Lock, Calendar } from 'lucide-react';

// interface BlogFormData {
//   title: string;
//   titleEnglish: string;
//   content: string;
//   excerpt: string;
//   category: string;
//   readTime: number;
//   isPublished: boolean;
// }

// interface Blog {
//   _id: string;
//   title: string;
//   titleEnglish: string;
//   content: string;
//   excerpt: string;
//   category: string;
//   readTime: number;
//   isPublished: boolean;
//   slug: string;
//   views: number;
//   author: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export default function BlogEditor() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const isEditing = !!id;
//   const [isLoading, setIsLoading] = useState(false);
//   const [loadingBlog, setLoadingBlog] = useState(false);
//   const [showPreview, setShowPreview] = useState(false);
  
//   const [formData, setFormData] = useState<BlogFormData>({
//     title: '',
//     titleEnglish: '',
//     content: '',
//     excerpt: '',
//     category: '',
//     readTime: 5,
//     isPublished: false,
//   });

//   // Common categories
//   const categories = [
//     'General Health',
//     'Cardiology',
//     'Dermatology',
//     'Pediatrics',
//     'Orthopedics',
//     'Mental Health',
//     'Nutrition',
//     'Wellness',
//     'Disease Prevention',
//     'First Aid',
//     'Women Health',
//     'Men Health',
//     'Senior Health'
//   ];

//   useEffect(() => {
//     if (id) {
//       fetchBlog();
//     }
//   }, [id]);

//   const fetchBlog = async () => {
//     try {
//       setLoadingBlog(true);
//       const response = await blogService.getBlogById(id!);
      
//       if (response.success) {
//         const blog = response.data;
//         setFormData({
//           title: blog.title || blog.titleHindi || '', // Backend returns 'title' as Hindi title
//           titleEnglish: blog.titleEnglish || '',
//           content: blog.content || '',
//           excerpt: blog.excerpt || '',
//           category: blog.category || '',
//           readTime: typeof blog.readTime === 'string' ? parseInt(blog.readTime) || 5 : blog.readTime || 5,
//           isPublished: blog.isPublished || false,
//         });
//       } else {
//         toast({
//           title: 'Error',
//           description: response.message || 'Blog not found',
//           variant: 'destructive',
//         });
//         navigate('/blogs');
//       }
//     } catch (error: any) {
//       console.error('Fetch blog error:', error);
//       toast({
//         title: 'Error',
//         description: error.response?.data?.message || 'Failed to load blog',
//         variant: 'destructive',
//       });
//       navigate('/blogs');
//     } finally {
//       setLoadingBlog(false);
//     }
//   };

//   const handleChange = (field: keyof BlogFormData, value: string | number | boolean) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const validateForm = () => {
//     const errors: string[] = [];
    
//     if (!formData.titleEnglish.trim()) {
//       errors.push('English title is required.');
//     }
    
//     if (formData.titleEnglish.trim().length < 5) {
//       errors.push('English title should be at least 5 characters.');
//     }
    
//     if (!formData.content.trim()) {
//       errors.push('Content is required.');
//     }
    
//     if (formData.content.trim().length < 100) {
//       errors.push('Content should be at least 100 characters.');
//     }
    
//     if (!formData.category.trim()) {
//       errors.push('Category is required.');
//     }
    
//     return errors;
//   };

//   const handleSubmit = async (publish: boolean = false) => {
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
//       // Transform data to match backend schema
//       const dataToSave = {
//         title: formData.title || formData.titleEnglish, // Map titleHindi to title (required field)
//         titleEnglish: formData.titleEnglish,
//         content: formData.content,
//         excerpt: formData.excerpt,
//         category: formData.category,
//         readTime: formData.readTime.toString(), // Convert number to string
//         isPublished: publish ? true : formData.isPublished,
//       };

//       console.log('Sending data to backend:', dataToSave); // For debugging

//       let response;
//       if (isEditing && id) {
//         response = await blogService.updateBlog(id, dataToSave);
//       } else {
//         response = await blogService.createBlog(dataToSave);
//       }
      
//       if (response.success) {
//         toast({
//           title: isEditing ? 'Blog Updated' : 'Blog Created',
//           description: publish 
//             ? 'Your blog post has been published successfully.' 
//             : 'Your blog post has been saved as draft.',
//         });
        
//         // Navigate to the blog detail page or blogs list
//         if (response.data?._id) {
//           navigate(`/blogs/${response.data._id}`);
//         } else {
//           navigate('/blogs');
//         }
//       } else {
//         throw new Error(response.message || 'Failed to save blog');
//       }
//     } catch (error: any) {
//       console.error('Save blog error:', error);
//       console.error('Error response:', error.response?.data);
      
//       // Show detailed error message
//       let errorMessage = error.response?.data?.message || error.message || 'Failed to save blog post.';
      
//       // If there are validation errors from backend, show them
//       if (error.response?.data?.errors) {
//         errorMessage = Array.isArray(error.response.data.errors) 
//           ? error.response.data.errors.join(', ')
//           : error.response.data.errors;
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

//   const handleSaveDraft = async () => {
//     if (!formData.titleEnglish.trim()) {
//       toast({
//         title: 'Validation Error',
//         description: 'Title is required to save as draft.',
//         variant: 'destructive',
//       });
//       return;
//     }

//     await handleSubmit(false);
//   };

//   const formatDate = (dateString: string) => {
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-IN', {
//         day: 'numeric',
//         month: 'short',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return dateString;
//     }
//   };

//   if (loadingBlog) {
//     return (
//       <AdminLayout>
//         <div className="flex flex-col items-center justify-center min-h-[60vh]">
//           <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
//           <p className="text-muted-foreground">Loading blog...</p>
//         </div>
//       </AdminLayout>
//     );
//   }

//   if (showPreview) {
//     return (
//       <AdminLayout>
//         <div className="max-w-4xl mx-auto">
//           <div className="flex items-center justify-between mb-6">
//             <Button variant="ghost" onClick={() => setShowPreview(false)}>
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back to Editor
//             </Button>
//             <div className="flex gap-2">
//               <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${formData.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
//                 {formData.isPublished ? (
//                   <>
//                     <Globe className="w-3 h-3 mr-1" />
//                     Published
//                   </>
//                 ) : (
//                   <>
//                     <Lock className="w-3 h-3 mr-1" />
//                     Draft
//                   </>
//                 )}
//               </span>
//             </div>
//           </div>
          
//           <article className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
//             <div className="mb-8">
//               <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
//                 {formData.category || 'Uncategorized'}
//               </span>
//               <h1 className="text-4xl font-bold text-gray-900 mb-3">{formData.titleEnglish || 'Untitled'}</h1>
//               {formData.title && (
//                 <h2 className="text-2xl text-gray-700 mb-6 font-medium">{formData.title}</h2>
//               )}
//               <div className="flex items-center gap-4 text-sm text-gray-500">
//                 <span className="flex items-center gap-1">
//                   <Calendar className="w-4 h-4" />
//                   {formatDate(new Date().toISOString())}
//                 </span>
//                 <span>•</span>
//                 <span>{formData.readTime} min read</span>
//               </div>
//             </div>
            
//             {formData.excerpt && (
//               <div className="mb-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
//                 <p className="text-lg text-gray-700 italic">{formData.excerpt}</p>
//               </div>
//             )}
            
//             <div className="prose prose-lg max-w-none">
//               <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
//                 {formData.content.split('\n').map((paragraph, index) => (
//                   paragraph.trim() ? (
//                     <p key={index} className="mb-6">{paragraph}</p>
//                   ) : (
//                     <br key={index} />
//                   )
//                 ))}
//               </div>
//             </div>
            
//             <div className="mt-12 pt-8 border-t border-gray-200">
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
//                   <span className="font-semibold text-gray-700">A</span>
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-900">Admin</p>
//                   <p className="text-sm text-gray-500">Hospital Administrator</p>
//                 </div>
//               </div>
//             </div>
//           </article>
//         </div>
//       </AdminLayout>
//     );
//   }

//   return (
//     <AdminLayout>
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center gap-4 mb-6">
//           <Button variant="ghost" size="icon" onClick={() => navigate('/blogs')}>
//             <ArrowLeft className="w-5 h-5" />
//           </Button>
//           <div className="flex-1">
//             <h1 className="page-title">{isEditing ? 'Edit Blog Post' : 'Create New Blog'}</h1>
//             <p className="page-subtitle">Write and publish health awareness content for your audience</p>
//           </div>
//           <div className="flex gap-2">
//             <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${formData.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
//               {formData.isPublished ? (
//                 <>
//                   <Globe className="w-3 h-3 mr-1" />
//                   Published
//                 </>
//               ) : (
//                 <>
//                   <Lock className="w-3 h-3 mr-1" />
//                   Draft
//                 </>
//               )}
//             </span>
//           </div>
//         </div>

//         {/* Form */}
//         <div className="space-y-8">
//           <div className="form-section">
//             <h2 className="form-section-title">Blog Details</h2>
            
//             <div className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-3">
//                   <Label htmlFor="titleEnglish">
//                     Title (English) <span className="text-destructive">*</span>
//                   </Label>
//                   <Input
//                     id="titleEnglish"
//                     value={formData.titleEnglish}
//                     onChange={(e) => handleChange('titleEnglish', e.target.value)}
//                     placeholder="Enter blog title in English"
//                     disabled={isLoading}
//                     className="text-lg"
//                   />
//                   <p className="text-xs text-muted-foreground">
//                     Catchy and descriptive title that attracts readers
//                   </p>
//                 </div>

//                 <div className="space-y-3">
//                   <Label htmlFor="titleHindi">Title (Hindi)</Label>
//                   <Input
//                     id="titleHindi"
//                     value={formData.title}
//                     onChange={(e) => handleChange('title', e.target.value)}
//                     placeholder="हिंदी में ब्लॉग शीर्षक दर्ज करें"
//                     disabled={isLoading}
//                     className="text-lg"
//                   />
//                   <p className="text-xs text-muted-foreground">
//                     Optional Hindi title for better reach
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-3">
//                   <Label htmlFor="category">
//                     Category <span className="text-destructive">*</span>
//                   </Label>
//                   <Select
//                     value={formData.category}
//                     onValueChange={(value) => handleChange('category', value)}
//                     disabled={isLoading}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {categories.map(cat => (
//                         <SelectItem key={cat} value={cat}>{cat}</SelectItem>
//                       ))}
//                       <SelectItem value="Other">Other (specify below)</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   {formData.category === 'Other' && (
//                     <Input
//                       placeholder="Enter custom category"
//                       value={formData.category}
//                       onChange={(e) => handleChange('category', e.target.value)}
//                       disabled={isLoading}
//                       className="mt-2"
//                     />
//                   )}
//                 </div>

//                 <div className="space-y-3">
//                   <Label htmlFor="readTime">Estimated Read Time</Label>
//                   <div className="flex items-center gap-4">
//                     <Input
//                       id="readTime"
//                       type="number"
//                       min="1"
//                       max="60"
//                       value={formData.readTime}
//                       onChange={(e) => handleChange('readTime', parseInt(e.target.value) || 5)}
//                       disabled={isLoading}
//                       className="w-24"
//                     />
//                     <span className="text-sm text-muted-foreground">minutes</span>
//                   </div>
//                   <p className="text-xs text-muted-foreground">
//                     Estimated time to read the entire article
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <Label htmlFor="excerpt">Excerpt / Summary</Label>
//                 <Textarea
//                   id="excerpt"
//                   value={formData.excerpt}
//                   onChange={(e) => handleChange('excerpt', e.target.value)}
//                   placeholder="Write a compelling summary that appears on blog listings..."
//                   rows={3}
//                   disabled={isLoading}
//                 />
//                 <p className="text-xs text-muted-foreground">
//                   Keep it brief (1-2 sentences) to hook readers
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="form-section">
//             <h2 className="form-section-title mb-4">Content</h2>
            
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <Label htmlFor="content">
//                   Blog Content <span className="text-destructive">*</span>
//                 </Label>
//                 <span className="text-sm text-muted-foreground">
//                   {formData.content.length} characters
//                 </span>
//               </div>
//               <Textarea
//                 id="content"
//                 value={formData.content}
//                 onChange={(e) => handleChange('content', e.target.value)}
//                 placeholder={`Start writing your blog content here...

// • Use clear, simple language
// • Break content into paragraphs
// • Add relevant information
// • Include actionable tips
// • End with a conclusion

// Write in a friendly, informative tone that helps readers understand health topics better.`}
//                 rows={20}
//                 disabled={isLoading}
//                 className="font-sans text-base leading-relaxed min-h-[400px] resize-y"
//               />
//               <div className="text-xs text-muted-foreground space-y-1">
//                 <p>• Minimum 100 characters required</p>
//                 <p>• Use paragraphs for better readability</p>
//                 <p>• Simple language helps reach wider audience</p>
//               </div>
//             </div>
//           </div>

//           <div className="form-section">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//               <div className="space-y-1">
//                 <div className="flex items-center gap-2">
//                   <h2 className="font-semibold text-foreground">Publish Status</h2>
//                   <span className={`text-xs px-2 py-1 rounded ${formData.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
//                     {formData.isPublished ? 'PUBLIC' : 'DRAFT'}
//                   </span>
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   {formData.isPublished 
//                     ? 'This post is visible to all website visitors' 
//                     : 'Only administrators can view this draft'
//                   }
//                 </p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <span className="text-sm text-muted-foreground">
//                   {formData.isPublished ? 'Published' : 'Draft'}
//                 </span>
//                 <Switch
//                   checked={formData.isPublished}
//                   onCheckedChange={(checked) => handleChange('isPublished', checked)}
//                   disabled={isLoading}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
//             <div className="flex gap-3">
//               <Button
//                 variant="outline"
//                 onClick={() => setShowPreview(true)}
//                 disabled={isLoading || !formData.titleEnglish || !formData.content}
//               >
//                 <Eye className="w-4 h-4 mr-2" />
//                 Preview
//               </Button>
              
//               <Button
//                 variant="outline"
//                 onClick={handleSaveDraft}
//                 disabled={isLoading || !formData.titleEnglish}
//               >
//                 {isLoading ? (
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                 ) : (
//                   <Save className="w-4 h-4 mr-2" />
//                 )}
//                 Save as Draft
//               </Button>
//             </div>
            
//             <div className="flex-1" />
            
//             <div className="flex gap-3">
//               <Button
//                 variant="outline"
//                 onClick={() => navigate('/blogs')}
//                 disabled={isLoading}
//               >
//                 Cancel
//               </Button>
              
//               <Button
//                 onClick={() => handleSubmit(true)}
//                 disabled={isLoading || !formData.titleEnglish || !formData.content}
//                 className="min-w-[140px]"
//               >
//                 {isLoading ? (
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                 ) : null}
//                 {isEditing 
//                   ? (formData.isPublished ? 'Update' : 'Update & Publish')
//                   : 'Publish Now'
//                 }
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }

// ✅ Fully rewritten BlogEditor.tsx
// Backend-aligned: title -> Hindi title, titleEnglish -> English title
// Slug handled ONLY by backend (prevents 409 slug conflict)

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { blogService } from '@/api/blog.Service';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Eye, Save, Loader2, Globe, Lock } from 'lucide-react';

interface BlogForm {
  title: string;            // Hindi title (used for slug)
  titleEnglish: string;
  content: string;
  excerpt: string;
  category: string;
  readTime: number;
  isPublished: boolean;
}

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [loadingBlog, setLoadingBlog] = useState(false);
  const [preview, setPreview] = useState(false);

  const [form, setForm] = useState<BlogForm>({
    title: '',
    titleEnglish: '',
    content: '',
    excerpt: '',
    category: '',
    readTime: 5,
    isPublished: false,
  });

  const categories = [
    'General Health','Cardiology','Dermatology','Pediatrics','Orthopedics',
    'Mental Health','Nutrition','Wellness','Disease Prevention','First Aid',
    'Women Health','Men Health','Senior Health'
  ];

  // ================= FETCH BLOG =================
  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        setLoadingBlog(true);
        const res = await blogService.getBlogById(id!);
        if (!res.success) throw new Error(res.message);

        const b = res.data;
        setForm({
          title: b.title || '',
          titleEnglish: b.titleEnglish || '',
          content: b.content || '',
          excerpt: b.excerpt || '',
          category: b.category || '',
          readTime: Number(b.readTime) || 5,
          isPublished: Boolean(b.isPublished),
        });
      } catch (e: any) {
        toast({ title: 'Error', description: e.message, variant: 'destructive' });
        navigate('/blogs');
      } finally {
        setLoadingBlog(false);
      }
    })();
  }, [id]);

  const update = (k: keyof BlogForm, v: any) => setForm(p => ({ ...p, [k]: v }));

  // ================= VALIDATION =================
  const validate = () => {
    if (!form.titleEnglish.trim()) return 'English title required';
    if (!form.content.trim() || form.content.length < 100) return 'Content min 100 chars';
    if (!form.category) return 'Category required';
    return null;
  };

  // ================= SUBMIT =================
  const submit = async (publish: boolean) => {
    const error = validate();
    if (error) return toast({ title: 'Validation', description: error, variant: 'destructive' });

    setLoading(true);
    try {
      const payload = {
        title: form.title || form.titleEnglish, // 🔑 slug source
        titleEnglish: form.titleEnglish,
        content: form.content,
        excerpt: form.excerpt,
        category: form.category,
        readTime: String(form.readTime),
        isPublished: publish ? true : form.isPublished,
      };

      const res = isEdit
        ? await blogService.updateBlog(id!, payload)
        : await blogService.createBlog(payload);

      if (!res.success) throw new Error(res.message);

      toast({ title: 'Success', description: isEdit ? 'Blog updated' : 'Blog created' });
      navigate('/blogs');
    } catch (e: any) {
      toast({ title: 'Error', description: e.message || 'Slug already exists', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  if (loadingBlog) {
    return <AdminLayout><div className='flex justify-center p-20'><Loader2 className='animate-spin' /></div></AdminLayout>;
  }

  // ================= UI =================
  return (
    <AdminLayout>
      <div className='max-w-4xl mx-auto space-y-6'>
        <div className='flex items-center gap-3'>
          <Button variant='ghost' onClick={() => navigate('/blogs')}><ArrowLeft /></Button>
          <h1 className='text-xl font-semibold'>{isEdit ? 'Edit Blog' : 'Create Blog'}</h1>
          <span className={`ml-auto px-3 py-1 rounded text-sm ${form.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {form.isPublished ? <Globe className='inline w-4 mr-1' /> : <Lock className='inline w-4 mr-1' />}
            {form.isPublished ? 'Published' : 'Draft'}
          </span>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <Label>Title (English)</Label>
            <Input value={form.titleEnglish} onChange={e => update('titleEnglish', e.target.value)} />
          </div>
          <div>
            <Label>Title (Hindi)</Label>
            <Input value={form.title} onChange={e => update('title', e.target.value)} />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <Label>Category</Label>
            <Select value={form.category} onValueChange={v => update('category', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Read Time (min)</Label>
            <Input type='number' value={form.readTime} onChange={e => update('readTime', Number(e.target.value))} />
          </div>
        </div>

        <div>
          <Label>Excerpt</Label>
          <Textarea rows={3} value={form.excerpt} onChange={e => update('excerpt', e.target.value)} />
        </div>

        <div>
          <Label>Content</Label>
          <Textarea rows={14} value={form.content} onChange={e => update('content', e.target.value)} />
        </div>

        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <Switch checked={form.isPublished} onCheckedChange={v => update('isPublished', v)} />
            <span>{form.isPublished ? 'Published' : 'Draft'}</span>
          </div>
          <div className='flex gap-3'>
            <Button variant='outline' onClick={() => setPreview(true)} disabled={loading}><Eye /></Button>
            <Button variant='outline' onClick={() => submit(false)} disabled={loading}><Save /></Button>
            <Button onClick={() => submit(true)} disabled={loading}>{loading && <Loader2 className='mr-2 animate-spin' />}Publish</Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
