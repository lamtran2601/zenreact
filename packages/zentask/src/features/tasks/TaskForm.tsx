import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTaskStore } from '../../store/taskStore';
import { Task, TaskPriority, TaskStatus } from '../../types/task';
import { toast } from 'sonner';

// Form validation schema
const taskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  status: z.enum(['todo', 'in-progress', 'completed'] as const),
  priority: z.enum(['low', 'medium', 'high'] as const),
  categoryId: z.string().min(1, 'Please select a category'),
  dueDate: z.string().nullable().optional(),
});

type TaskFormValues = z.infer<typeof taskSchema>;

type TaskFormProps = {
  taskToEdit?: Task;
  onClose: () => void;
};

const TaskForm = ({ taskToEdit, onClose }: TaskFormProps) => {
  const { addTask, updateTask, categories, tags } = useTaskStore();
  const isEditing = !!taskToEdit;
  const [selectedTags, setSelectedTags] = useState<string[]>(taskToEdit?.tags || []);
  
  // Format the date for the form
  const formatDateForInput = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };
  
  // Default values for the form
  const defaultValues: TaskFormValues = {
    title: taskToEdit?.title || '',
    description: taskToEdit?.description || '',
    status: taskToEdit?.status || 'todo',
    priority: taskToEdit?.priority || 'medium',
    categoryId: taskToEdit?.categoryId || categories[0]?.id || '',
    dueDate: taskToEdit?.dueDate ? formatDateForInput(taskToEdit.dueDate) : '',
  };
  
  const { 
    register, 
    handleSubmit, 
    control,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues,
  });
  
  // Toggle tag selection
  const toggleTag = (tagId: string) => {
    setSelectedTags(prevTags => 
      prevTags.includes(tagId)
        ? prevTags.filter(id => id !== tagId)
        : [...prevTags, tagId]
    );
  };
  
  // Handle form submission
  const onSubmit = (data: TaskFormValues) => {
    try {
      if (isEditing && taskToEdit) {
        updateTask(taskToEdit.id, {
          ...data,
          tags: selectedTags,
          dueDate: data.dueDate || null,
        });
        toast.success('Task updated successfully!');
      } else {
        addTask({
          ...data,
          tags: selectedTags,
          dueDate: data.dueDate || null,
        });
        toast.success('Task added successfully!');
      }
      onClose();
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error(error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Task Title</span>
        </label>
        <input
          type="text"
          className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
          placeholder="Enter task title"
          {...register('title')}
        />
        {errors.title && (
          <label className="label">
            <span className="label-text-alt text-error">{errors.title.message}</span>
          </label>
        )}
      </div>
      
      <div className="form-control">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          className={`textarea textarea-bordered h-24 ${errors.description ? 'textarea-error' : ''}`}
          placeholder="Enter task description"
          {...register('description')}
        />
        {errors.description && (
          <label className="label">
            <span className="label-text-alt text-error">{errors.description.message}</span>
          </label>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            className={`select select-bordered w-full ${errors.categoryId ? 'select-error' : ''}`}
            {...register('categoryId')}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.categoryId.message}</span>
            </label>
          )}
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Due Date</span>
          </label>
          <input
            type="date"
            className={`input input-bordered w-full ${errors.dueDate ? 'input-error' : ''}`}
            {...register('dueDate')}
          />
          {errors.dueDate && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.dueDate.message}</span>
            </label>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Priority</span>
          </label>
          <Controller
            control={control}
            name="priority"
            render={({ field }) => (
              <div className="join">
                <button
                  type="button"
                  className={`btn join-item ${field.value === 'low' ? 'btn-info' : 'btn-outline'}`}
                  onClick={() => field.onChange('low')}
                >
                  Low
                </button>
                <button
                  type="button"
                  className={`btn join-item ${field.value === 'medium' ? 'btn-warning' : 'btn-outline'}`}
                  onClick={() => field.onChange('medium')}
                >
                  Medium
                </button>
                <button
                  type="button"
                  className={`btn join-item ${field.value === 'high' ? 'btn-error' : 'btn-outline'}`}
                  onClick={() => field.onChange('high')}
                >
                  High
                </button>
              </div>
            )}
          />
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Status</span>
          </label>
          <select
            className={`select select-bordered w-full ${errors.status ? 'select-error' : ''}`}
            {...register('status')}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.status.message}</span>
            </label>
          )}
        </div>
      </div>
      
      <div className="form-control">
        <label className="label">
          <span className="label-text">Tags</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {tags.length === 0 ? (
            <div className="text-sm text-base-content/60">No tags available. Create tags in the Tags tab.</div>
          ) : (
            tags.map(tag => (
              <button
                key={tag.id}
                type="button"
                className={`badge p-3 cursor-pointer hover:opacity-80 ${
                  selectedTags.includes(tag.id) ? 'border-2 border-primary' : ''
                }`}
                style={{ backgroundColor: tag.color }}
                onClick={() => toggleTag(tag.id)}
              >
                {tag.name}
              </button>
            ))
          )}
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <button 
          type="button" 
          className="btn btn-ghost" 
          onClick={onClose}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm; 