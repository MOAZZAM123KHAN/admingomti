// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AdminLayout } from '@/components/layout/AdminLayout';
// import { Button } from '@/components/ui/button';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
// import { getBlogs, deleteBlog, updateBlog, Blog } from '@/lib/mockData';
// import { toast } from '@/hooks/use-toast';
// import { Plus, Edit, Trash2, Eye, EyeOff, FileText } from 'lucide-react';

// export default function Blogs() {
//   const navigate = useNavigate();
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);

//   useEffect(() => {
//     setBlogs(getBlogs());
//   }, []);

//   const handleTogglePublish = (blog: Blog) => {
//     const updated = updateBlog(blog.id, { isPublished: !blog.isPublished });
//     if (updated) {
//       setBlogs(getBlogs());
//       toast({
//         title: blog.isPublished ? 'Blog Unpublished' : 'Blog Published',
//         description: `"${blog.titleEnglish}" has been ${blog.isPublished ? 'unpublished' : 'published'}.`,
//       });
//     }
//   };

//   const handleDeleteClick = (blog: Blog) => {
//     setBlogToDelete(blog);
//     setDeleteDialogOpen(true);
//   };

//   const handleConfirmDelete = () => {
//     if (blogToDelete) {
//       const deleted = deleteBlog(blogToDelete.id);
//       if (deleted) {
//         setBlogs(getBlogs());
//         toast({
//           title: 'Blog Deleted',
//           description: `"${blogToDelete.titleEnglish}" has been deleted.`,
//         });
//       }
//     }
//     setDeleteDialogOpen(false);
//     setBlogToDelete(null);
//   };

//   return (
//     <AdminLayout>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div className="page-header mb-0">
//             <h1 className="page-title">Blog Management</h1>
//             <p className="page-subtitle">Create and manage health awareness articles</p>
//           </div>
//           <Button onClick={() => navigate('/blogs/new')}>
//             <Plus className="w-4 h-4 mr-2" />
//             Create New Blog
//           </Button>
//         </div>

//         {/* Blogs List */}
//         {blogs.length === 0 ? (
//           <div className="bg-card rounded-xl p-12 border border-border text-center">
//             <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
//             <p className="text-muted-foreground mb-4">No blog posts yet.</p>
//             <Button onClick={() => navigate('/blogs/new')}>
//               <Plus className="w-4 h-4 mr-2" />
//               Create Your First Blog
//             </Button>
//           </div>
//         ) : (
//           <div className="data-table overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-border bg-muted/50">
//                   <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Title</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Category</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">Published Date</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
//                   <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-border">
//                 {blogs.map((blog) => (
//                   <tr key={blog.id} className="hover:bg-muted/30 transition-colors">
//                     <td className="py-3 px-4">
//                       <div>
//                         <p className="font-medium text-foreground">{blog.titleEnglish}</p>
//                         <p className="text-sm text-muted-foreground">{blog.titleHindi}</p>
//                       </div>
//                     </td>
//                     <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">
//                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
//                         {blog.category}
//                       </span>
//                     </td>
//                     <td className="py-3 px-4 text-muted-foreground hidden lg:table-cell">
//                       {new Date(blog.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="py-3 px-4">
//                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                         blog.isPublished 
//                           ? 'bg-success/15 text-success' 
//                           : 'bg-muted text-muted-foreground'
//                       }`}>
//                         {blog.isPublished ? 'Published' : 'Draft'}
//                       </span>
//                     </td>
//                     <td className="py-3 px-4">
//                       <div className="flex items-center justify-end gap-1">
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => handleTogglePublish(blog)}
//                           title={blog.isPublished ? 'Unpublish' : 'Publish'}
//                         >
//                           {blog.isPublished ? (
//                             <EyeOff className="w-4 h-4" />
//                           ) : (
//                             <Eye className="w-4 h-4" />
//                           )}
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => navigate(`/blogs/${blog.id}/edit`)}
//                         >
//                           <Edit className="w-4 h-4" />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="text-destructive hover:text-destructive hover:bg-destructive/10"
//                           onClick={() => handleDeleteClick(blog)}
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Delete Blog Post</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete "{blogToDelete?.titleEnglish}"? This action cannot be undone.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleConfirmDelete}>
//               Delete
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { blogService } from '@/api/blog.Service';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Eye, EyeOff, FileText, Search, Calendar, User, Globe, Lock, Loader2, RefreshCw } from 'lucide-react';

interface Blog {
  _id: string;
  titleHindi: string;
  titleEnglish: string;
  content: string;
  excerpt: string;
  category: string;
  readTime: number;
  isPublished: boolean;
  slug: string;
  views: number;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export default function Blogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [publishLoading, setPublishLoading] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleting, setDeleting] = useState(false);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, statusFilter]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogService.getBlogs({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        search: searchQuery || undefined
      });
      
      if (response.success) {
        setBlogs(response.data || []);
        setTotal(response.pagination?.total || response.data?.length || 0);
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to fetch blogs',
          variant: 'destructive',
        });
        setBlogs([]);
        setTotal(0);
      }
    } catch (error: any) {
      console.error('Fetch blogs error:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Network error',
        variant: 'destructive',
      });
      setBlogs([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchBlogs();
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCurrentPage(1);
    fetchBlogs();
  };

  const handleTogglePublish = async (blog: Blog) => {
    try {
      setPublishLoading(blog._id);
      
      const response = await blogService.updateBlog(blog._id, {
        isPublished: !blog.isPublished
      });
      
      if (response.success) {
        setBlogs(prev => prev.map(b => 
          b._id === blog._id 
            ? { ...b, isPublished: !blog.isPublished }
            : b
        ));
        
        toast({
          title: blog.isPublished ? 'Blog Unpublished' : 'Blog Published',
          description: `"${blog.titleEnglish}" has been ${blog.isPublished ? 'unpublished' : 'published'}.`,
        });
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to update blog status',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Toggle publish error:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update blog status',
        variant: 'destructive',
      });
    } finally {
      setPublishLoading(null);
    }
  };

  const handleDeleteClick = (blog: Blog) => {
    setBlogToDelete(blog);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!blogToDelete) return;
    
    try {
      setDeleting(true);
      const response = await blogService.deleteBlog(blogToDelete._id);
      
      if (response.success) {
        setBlogs(prev => prev.filter(blog => blog._id !== blogToDelete._id));
        setTotal(prev => prev - 1);
        
        toast({
          title: 'Blog Deleted',
          description: `"${blogToDelete.titleEnglish}" has been deleted successfully.`,
        });
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to delete blog',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Delete blog error:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete blog',
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
      setBlogToDelete(null);
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

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="page-title">Blog Management</h1>
            <p className="page-subtitle">Create and manage health awareness articles</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={fetchBlogs}
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              <span className="ml-2">Refresh</span>
            </Button>
            <Button onClick={() => navigate('/blogs/new')}>
              <Plus className="w-4 h-4 mr-2" />
              Create New Blog
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or content..."
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
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex gap-2">
            <Button onClick={handleSearch} disabled={loading} className="flex-1">
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
        {!loading && blogs.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground">Total Blogs</p>
              <p className="text-2xl font-bold text-foreground">{total}</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Globe className="w-4 h-4 text-green-600" />
                Published
              </p>
              <p className="text-2xl font-bold text-green-600">
                {blogs.filter(b => b.isPublished).length}
              </p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Lock className="w-4 h-4 text-yellow-600" />
                Drafts
              </p>
              <p className="text-2xl font-bold text-yellow-600">
                {blogs.filter(b => !b.isPublished).length}
              </p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <User className="w-4 h-4 text-blue-600" />
                Author
              </p>
              <p className="text-2xl font-bold text-blue-600">Admin</p>
            </div>
          </div>
        )}

        {/* Blogs List */}
        {loading ? (
          <div className="bg-card rounded-xl p-12 border border-border text-center">
            <Loader2 className="w-12 h-12 mx-auto text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Loading blogs...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-card rounded-xl p-12 border border-border text-center">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg mb-2">
              {searchQuery || statusFilter !== 'all' ? 'No matching blogs found' : 'No blog posts yet'}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {searchQuery || statusFilter !== 'all' 
                ? 'Try changing your search or filters' 
                : 'Start creating health awareness content for your audience'
              }
            </p>
            <div className="flex gap-3 justify-center">
              <Button 
                variant="outline" 
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
              <Button onClick={() => navigate('/blogs/new')}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Blog
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="data-table overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Title</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Category</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Published Date</span>
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {blogs.map((blog) => (
                    <tr key={blog._id} className="hover:bg-muted/30 transition-colors group">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {blog.titleEnglish}
                          </p>
                          {blog.titleHindi && (
                            <p className="text-sm text-muted-foreground mt-1">{blog.titleHindi}</p>
                          )}
                          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                            <span>{blog.readTime} min read</span>
                            {blog.views > 0 && (
                              <>
                                <span>•</span>
                                <span>{blog.views} views</span>
                              </>
                            )}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground hidden md:table-cell">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {blog.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground hidden lg:table-cell">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(blog.createdAt)}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {blog.isPublished ? (
                            <Globe className="w-4 h-4 text-green-600" />
                          ) : (
                            <Lock className="w-4 h-4 text-yellow-600" />
                          )}
                          <span className={`text-sm font-medium ${
                            blog.isPublished ? 'text-green-700' : 'text-yellow-700'
                          }`}>
                            {blog.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTogglePublish(blog)}
                            disabled={publishLoading === blog._id}
                            title={blog.isPublished ? 'Unpublish' : 'Publish'}
                            className="h-8 w-8 p-0"
                          >
                            {publishLoading === blog._id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : blog.isPublished ? (
                              <EyeOff className="w-3 h-3" />
                            ) : (
                              <Eye className="w-3 h-3" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/blogs/${blog._id}/edit`)}
                            disabled={loading}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDeleteClick(blog)}
                            disabled={loading}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {total > 0 && totalPages > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
                  {Math.min(currentPage * ITEMS_PER_PAGE, total)} of {total} blogs
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1 || loading}
                  >
                    Previous
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
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-destructive" />
              Delete Blog Post
            </DialogTitle>
            <DialogDescription className="pt-2">
              <div className="space-y-4">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="font-medium text-foreground">{blogToDelete?.titleEnglish}</p>
                  {blogToDelete?.titleHindi && (
                    <p className="text-sm text-muted-foreground mt-1">{blogToDelete.titleHindi}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    Category: {blogToDelete?.category} • {blogToDelete?.readTime} min read
                  </p>
                </div>
                <p className="text-sm">
                  Are you sure you want to delete this blog post? This action cannot be undone and all content will be permanently removed.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleConfirmDelete}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Permanently'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
