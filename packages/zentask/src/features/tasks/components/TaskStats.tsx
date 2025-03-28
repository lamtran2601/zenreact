import { useTaskStore } from '../../../store/taskStore';
import { Task, TaskStatus, TaskPriority } from '../../../types/task';

function TaskStats() {
  const { tasks } = useTaskStore();
  
  // Calculate task statistics
  const stats = {
    total: tasks.length,
    byStatus: {
      todo: tasks.filter(task => task.status === 'todo').length,
      inProgress: tasks.filter(task => task.status === 'in-progress').length,
      completed: tasks.filter(task => task.status === 'completed').length,
    },
    byPriority: {
      high: tasks.filter(task => task.priority === 'high').length,
      medium: tasks.filter(task => task.priority === 'medium').length,
      low: tasks.filter(task => task.priority === 'low').length,
    },
    completionPercentage: tasks.length > 0 
      ? Math.round((tasks.filter(task => task.status === 'completed').length / tasks.length) * 100) 
      : 0
  };
  
  // Function to get status color class
  const getStatusColorClass = (status: TaskStatus) => {
    switch (status) {
      case 'todo':
        return 'bg-primary';
      case 'in-progress':
        return 'bg-warning';
      case 'completed':
        return 'bg-success';
      default:
        return 'bg-neutral';
    }
  };
  
  // Function to get priority color class
  const getPriorityColorClass = (priority: TaskPriority) => {
    switch (priority) {
      case 'high':
        return 'bg-error';
      case 'medium':
        return 'bg-warning';
      case 'low':
        return 'bg-info';
      default:
        return 'bg-neutral';
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Task overview card */}
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h3 className="card-title">Task Overview</h3>
          
          <div className="stats stats-vertical shadow my-2">
            <div className="stat">
              <div className="stat-title">Total Tasks</div>
              <div className="stat-value">{stats.total}</div>
            </div>
            
            <div className="stat">
              <div className="stat-title">Completion Rate</div>
              <div className="stat-value">{stats.completionPercentage}%</div>
              <div className="stat-desc">
                <progress 
                  className="progress progress-success w-full" 
                  value={stats.completionPercentage} 
                  max="100"
                ></progress>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Task distribution card */}
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h3 className="card-title">Task Distribution</h3>
          
          <div className="my-4">
            <h4 className="font-medium mb-2">By Status</h4>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-24">To Do</div>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-2 rounded-full ${getStatusColorClass('todo')}`}
                    style={{ width: `${stats.total > 0 ? (stats.byStatus.todo / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-8 text-right">{stats.byStatus.todo}</div>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-24">In Progress</div>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-2 rounded-full ${getStatusColorClass('in-progress')}`}
                    style={{ width: `${stats.total > 0 ? (stats.byStatus.inProgress / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-8 text-right">{stats.byStatus.inProgress}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-24">Completed</div>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-2 rounded-full ${getStatusColorClass('completed')}`}
                    style={{ width: `${stats.total > 0 ? (stats.byStatus.completed / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-8 text-right">{stats.byStatus.completed}</div>
            </div>
          </div>
          
          <div className="my-4">
            <h4 className="font-medium mb-2">By Priority</h4>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-24">High</div>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-2 rounded-full ${getPriorityColorClass('high')}`}
                    style={{ width: `${stats.total > 0 ? (stats.byPriority.high / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-8 text-right">{stats.byPriority.high}</div>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-24">Medium</div>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-2 rounded-full ${getPriorityColorClass('medium')}`}
                    style={{ width: `${stats.total > 0 ? (stats.byPriority.medium / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-8 text-right">{stats.byPriority.medium}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-24">Low</div>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-2 rounded-full ${getPriorityColorClass('low')}`}
                    style={{ width: `${stats.total > 0 ? (stats.byPriority.low / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-8 text-right">{stats.byPriority.low}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskStats; 