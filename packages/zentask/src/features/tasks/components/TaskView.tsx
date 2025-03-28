import { Task } from '../../../types/task';
import { useTaskStore } from '../../../store/taskStore';
import { format } from 'date-fns';

interface TaskViewProps {
  task: Task;
  onEdit: (task: Task) => void;
  onClose: () => void;
}

function TaskView({ task, onEdit, onClose }: TaskViewProps) {
  const { categories, tags, deleteTask } = useTaskStore();
  
  const category = categories.find(cat => cat.id === task.categoryId);
  const taskTags = tags.filter(tag => task.tags.includes(tag.id));
  
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
      onClose();
    }
  };
  
  const getStatusBadgeClass = () => {
    switch (task.status) {
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
  
  const getPriorityBadgeClass = () => {
    switch (task.priority) {
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
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h2 className="card-title text-2xl">{task.title}</h2>
          <div className="flex gap-2">
            <button 
              className="btn btn-sm btn-ghost" 
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
        
        <div className="divider my-2"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="whitespace-pre-wrap">{task.description || 'No description provided.'}</p>
            
            {taskTags.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {taskTags.map(tag => (
                    <div 
                      key={tag.id} 
                      className="badge p-3"
                      style={{ backgroundColor: tag.color }}
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Details</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="font-medium">Status:</div>
                <div><span className={`badge ${getStatusBadgeClass()}`}>{task.status}</span></div>
                
                <div className="font-medium">Priority:</div>
                <div><span className={`badge ${getPriorityBadgeClass()}`}>{task.priority}</span></div>
                
                <div className="font-medium">Category:</div>
                <div>
                  {category ? (
                    <span 
                      className="badge" 
                      style={{ backgroundColor: category.color }}
                    >
                      {category.name}
                    </span>
                  ) : 'None'}
                </div>
                
                <div className="font-medium">Due Date:</div>
                <div>{task.dueDate ? format(new Date(task.dueDate), 'MMM dd, yyyy') : 'No due date'}</div>
                
                <div className="font-medium">Created:</div>
                <div>{format(new Date(task.createdAt), 'MMM dd, yyyy')}</div>
                
                <div className="font-medium">Last Updated:</div>
                <div>{format(new Date(task.updatedAt), 'MMM dd, yyyy')}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card-actions justify-end mt-6">
          <button 
            className="btn btn-primary" 
            onClick={() => onEdit(task)}
          >
            Edit Task
          </button>
          <button 
            className="btn btn-error" 
            onClick={handleDelete}
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskView; 