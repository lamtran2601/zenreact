import { Task, TaskStatus } from '../../types/task';
import { useTaskStore } from '../../store/taskStore';
import { format } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

function TaskItem({ task, onEdit }: TaskItemProps) {
  const { updateTask, deleteTask, categories } = useTaskStore();
  
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
  
  const handleStatusChange = (newStatus: TaskStatus) => {
    updateTask(task.id, { status: newStatus });
  };
  
  const handleDelete = () => {
    deleteTask(task.id);
  };
  
  const category = categories.find(cat => cat.id === task.categoryId);
  
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
      <div className="card-body p-4">
        <div className="flex justify-between items-start">
          <h3 className="card-title text-lg">{task.title}</h3>
          <div className="flex gap-2">
            <button 
              className="btn btn-sm btn-ghost"
              onClick={() => onEdit(task)}
            >
              Edit
            </button>
            <button 
              className="btn btn-sm btn-ghost text-error"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
        
        <p className="text-sm mt-1 text-base-content/70">{task.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-3">
          <div 
            className="badge" 
            style={{ backgroundColor: getCategoryColor(task.categoryId) }}
          >
            {category?.name}
          </div>
          
          <div className={`badge ${getPriorityBadgeClass(task.priority)}`}>
            {task.priority}
          </div>
          
          {task.dueDate && (
            <div className="badge badge-outline">
              Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
            </div>
          )}
        </div>
        
        <div className="card-actions justify-between items-center mt-3">
          <div className="text-xs text-base-content/60">
            Created: {format(new Date(task.createdAt), 'MMM dd, yyyy')}
          </div>
          
          <select 
            className={`select select-sm ${getStatusBadgeClass(task.status)}`}
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default TaskItem; 