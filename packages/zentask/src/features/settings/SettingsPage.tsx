import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FiSun, FiMoon, FiMonitor, FiPlus, FiX, FiEdit } from 'react-icons/fi';
import useTheme from '../../hooks/useTheme';
import { useTaskStore } from '../../store/taskStore';
import { TaskCategory } from '../../types/task';
import { toast } from 'sonner';

// Form validation schema for category
const categorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters'),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Must be a valid hex color (e.g. #FF5733)'),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

const SettingsPage = () => {
  const { theme, setTheme } = useTheme();
  const { categories, addCategory, updateCategory, deleteCategory } = useTaskStore();
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      color: '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase(),
    },
  });
  
  const handleCategorySubmit = (data: CategoryFormValues) => {
    try {
      if (editingCategoryId) {
        updateCategory(editingCategoryId, data);
        toast.success('Category updated successfully!');
      } else {
        addCategory(data);
        toast.success('Category added successfully!');
      }
      
      setIsAddingCategory(false);
      setEditingCategoryId(null);
      reset();
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error(error);
    }
  };
  
  const handleEditCategory = (category: TaskCategory) => {
    setValue('name', category.name);
    setValue('color', category.color);
    setEditingCategoryId(category.id);
    setIsAddingCategory(true);
  };
  
  const handleDeleteCategory = (id: string) => {
    const categoryToDelete = categories.find(cat => cat.id === id);
    if (categoryToDelete) {
      const confirmDelete = window.confirm(`Are you sure you want to delete ${categoryToDelete.name}? Any tasks using this category will need to be reassigned.`);
      
      if (confirmDelete) {
        deleteCategory(id);
        toast.success('Category deleted successfully!');
      }
    }
  };
  
  const handleCancelCategoryForm = () => {
    setIsAddingCategory(false);
    setEditingCategoryId(null);
    reset();
  };
  
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Theme Settings */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Application Theme</h2>
            
            <div className="space-y-3">
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-4">
                  <input 
                    type="radio" 
                    name="theme" 
                    className="radio radio-primary" 
                    checked={theme === 'light'}
                    onChange={() => setTheme('light')}
                  />
                  <div className="flex items-center gap-2">
                    <FiSun className="text-primary" size={20} />
                    <span className="label-text">Light Theme</span>
                  </div>
                </label>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-4">
                  <input 
                    type="radio" 
                    name="theme" 
                    className="radio radio-primary" 
                    checked={theme === 'dark'}
                    onChange={() => setTheme('dark')}
                  />
                  <div className="flex items-center gap-2">
                    <FiMoon className="text-primary" size={20} />
                    <span className="label-text">Dark Theme</span>
                  </div>
                </label>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-4">
                  <input 
                    type="radio" 
                    name="theme" 
                    className="radio radio-primary" 
                    checked={theme === 'system'}
                    onChange={() => setTheme('system')}
                  />
                  <div className="flex items-center gap-2">
                    <FiMonitor className="text-primary" size={20} />
                    <span className="label-text">System Preference</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Category Management */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title">Task Categories</h2>
              {!isAddingCategory && (
                <button 
                  className="btn btn-primary btn-sm" 
                  onClick={() => setIsAddingCategory(true)}
                >
                  <FiPlus size={16} />
                  Add Category
                </button>
              )}
            </div>
            
            {isAddingCategory ? (
              <form onSubmit={handleSubmit(handleCategorySubmit)} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Category Name</span>
                  </label>
                  <input 
                    type="text" 
                    className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`} 
                    placeholder="Enter category name"
                    {...register('name')}
                  />
                  {errors.name && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.name.message}</span>
                    </label>
                  )}
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Color</span>
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      className={`input input-bordered h-12 w-24 p-1 ${errors.color ? 'input-error' : ''}`} 
                      {...register('color')}
                    />
                    <input 
                      type="text" 
                      className={`input input-bordered flex-1 ${errors.color ? 'input-error' : ''}`} 
                      placeholder="#FF5733"
                      {...register('color')}
                    />
                  </div>
                  {errors.color && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.color.message}</span>
                    </label>
                  )}
                </div>
                
                <div className="flex justify-end space-x-2 pt-2">
                  <button 
                    type="button" 
                    className="btn btn-ghost btn-sm" 
                    onClick={handleCancelCategoryForm}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    {editingCategoryId ? 'Update' : 'Add'} Category
                  </button>
                </div>
              </form>
            ) : (
              <div className="overflow-x-auto">
                {categories.length === 0 ? (
                  <p className="text-center py-4">No categories available. Create your first category.</p>
                ) : (
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>Color</th>
                        <th>Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category.id}>
                          <td>
                            <div 
                              className="w-6 h-6 rounded-full" 
                              style={{ backgroundColor: category.color }}
                            ></div>
                          </td>
                          <td>{category.name}</td>
                          <td>
                            <div className="flex gap-2">
                              <button 
                                className="btn btn-ghost btn-xs" 
                                onClick={() => handleEditCategory(category)}
                              >
                                <FiEdit size={16} />
                              </button>
                              <button 
                                className="btn btn-ghost btn-xs text-error" 
                                onClick={() => handleDeleteCategory(category.id)}
                              >
                                <FiX size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 