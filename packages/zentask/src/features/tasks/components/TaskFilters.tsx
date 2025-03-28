import { useState } from 'react';
import { TaskStatus, TaskPriority } from '../../../types/task';
import { useTaskStore } from '../../../store/taskStore';

interface TaskFiltersProps {
  onFilterChange: (filters: {
    status: TaskStatus | 'all';
    priority: TaskPriority | 'all';
    categoryId: string | 'all';
    search: string;
  }) => void;
}

function TaskFilters({ onFilterChange }: TaskFiltersProps) {
  const { categories } = useTaskStore();
  const [filters, setFilters] = useState({
    status: 'all' as TaskStatus | 'all',
    priority: 'all' as TaskPriority | 'all',
    categoryId: 'all' as string | 'all',
    search: ''
  });

  const handleFilterChange = <K extends keyof typeof filters>(
    key: K,
    value: typeof filters[K]
  ) => {
    const newFilters = {
      ...filters,
      [key]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const defaultFilters = {
      status: 'all' as TaskStatus | 'all',
      priority: 'all' as TaskPriority | 'all',
      categoryId: 'all' as string | 'all',
      search: ''
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const getStatusBadgeClass = (status: TaskStatus | 'all') => {
    switch (status) {
      case 'todo':
        return 'badge-primary';
      case 'in-progress':
        return 'badge-warning';
      case 'completed':
        return 'badge-success';
      default:
        return 'badge-ghost';
    }
  };

  const getPriorityBadgeClass = (priority: TaskPriority | 'all') => {
    switch (priority) {
      case 'high':
        return 'badge-error';
      case 'medium':
        return 'badge-warning';
      case 'low':
        return 'badge-info';
      default:
        return 'badge-ghost';
    }
  };

  return (
    <div className="bg-base-200 p-4 rounded-lg mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Filters</h3>
        <button 
          className="btn btn-sm btn-ghost"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Status Filter */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Status</span>
          </label>
          <select 
            className={`select select-bordered w-full ${getStatusBadgeClass(filters.status)}`}
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value as TaskStatus | 'all')}
          >
            <option value="all">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        {/* Priority Filter */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Priority</span>
          </label>
          <select 
            className={`select select-bordered w-full ${getPriorityBadgeClass(filters.priority)}`}
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value as TaskPriority | 'all')}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        {/* Category Filter */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select 
            className="select select-bordered w-full"
            value={filters.categoryId}
            onChange={(e) => handleFilterChange('categoryId', e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Search Filter */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Search</span>
          </label>
          <input 
            type="text" 
            placeholder="Search tasks..." 
            className="input input-bordered w-full"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskFilters; 