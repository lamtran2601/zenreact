import { useState } from 'react';
import { useTaskStore } from '../../store/taskStore';
import { Task, TaskStatus, TaskPriority } from '../../types/task';
import { format } from 'date-fns';
import TaskFilters from './components/TaskFilters';
import TaskSort from './components/TaskSort';
import TaskView from './components/TaskView';

interface TaskListProps {
  onEditTask: (task: Task) => void;
}

type SortField = 'title' | 'dueDate' | 'priority' | 'status' | 'createdAt';
type SortDirection = 'asc' | 'desc';

const TaskList = ({ onEditTask }: TaskListProps) => {
  const { tasks, categories, updateTask, deleteTask } = useTaskStore();
  const [filters, setFilters] = useState({
    status: 'all' as TaskStatus | 'all',
    priority: 'all' as TaskPriority | 'all',
    categoryId: 'all' as string | 'all',
    search: ''
  });
  const [sortConfig, setSortConfig] = useState<{ field: SortField; direction: SortDirection }>({
    field: 'createdAt',
    direction: 'desc'
  });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  // Filter tasks based on filter criteria
  const filteredTasks = tasks.filter(task => {
    // Filter by status
    if (filters.status !== 'all' && task.status !== filters.status) {
      return false;
    }
    
    // Filter by priority
    if (filters.priority !== 'all' && task.priority !== filters.priority) {
      return false;
    }
    
    // Filter by category
    if (filters.categoryId !== 'all' && task.categoryId !== filters.categoryId) {
      return false;
    }
    
    // Filter by search text
    if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase()) && 
        !task.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Sort filtered tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const { field, direction } = sortConfig;
    const multiplier = direction === 'asc' ? 1 : -1;
    
    switch (field) {
      case 'title':
        return multiplier * a.title.localeCompare(b.title);
      case 'dueDate':
        if (!a.dueDate) return multiplier;
        if (!b.dueDate) return -multiplier;
        return multiplier * (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
      case 'priority': {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return multiplier * (priorityOrder[a.priority] - priorityOrder[b.priority]);
      }
      case 'status': {
        const statusOrder = { 'todo': 1, 'in-progress': 2, 'completed': 3 };
        return multiplier * (statusOrder[a.status] - statusOrder[b.status]);
      }
      case 'createdAt':
        return multiplier * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      default:
        return 0;
    }
  });
  
  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.color || '#CCCCCC';
  };
  
  const getStatusBadgeClass = (status: TaskStatus) => {
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
  
  const getPriorityBadgeClass = (priority: Task['priority']) => {
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
  
  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    updateTask(taskId, { status: newStatus });
  };
  
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };
  
  const handleSortChange = (newSortConfig: { field: SortField; direction: SortDirection }) => {
    setSortConfig(newSortConfig);
  };
  
  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
  };
  
  const handleCloseTaskView = () => {
    setSelectedTask(null);
  };
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tasks</h2>
      </div>
      
      <TaskFilters onFilterChange={handleFilterChange} />
      <TaskSort onSortChange={handleSortChange} />
      
      {selectedTask && (
        <div className="mb-6">
          <TaskView 
            task={selectedTask} 
            onEdit={onEditTask} 
            onClose={handleCloseTaskView} 
          />
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No tasks found. Create a new task to get started.
                </td>
              </tr>
            ) : (
              sortedTasks.map((task) => {
                const category = categories.find(cat => cat.id === task.categoryId);
                return (
                  <tr key={task.id} className="hover cursor-pointer" onClick={() => handleViewTask(task)}>
                    <td>
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm opacity-70">{task.description}</div>
                    </td>
                    <td>
                      <div 
                        className="badge" 
                        style={{ backgroundColor: getCategoryColor(task.categoryId) }}
                      >
                        {category?.name}
                      </div>
                    </td>
                    <td>
                      <div className={`badge ${getPriorityBadgeClass(task.priority)}`}>
                        {task.priority}
                      </div>
                    </td>
                    <td>
                      {task.dueDate ? format(new Date(task.dueDate), 'MMM dd, yyyy') : 'No date'}
                    </td>
                    <td>
                      <select 
                        className={`select select-sm ${getStatusBadgeClass(task.status)}`}
                        value={task.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleStatusChange(task.id, e.target.value as TaskStatus);
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <button 
                          className="btn btn-sm btn-ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditTask(task);
                          }}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-sm btn-ghost text-error"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Are you sure you want to delete this task?')) {
                              deleteTask(task.id);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList; 