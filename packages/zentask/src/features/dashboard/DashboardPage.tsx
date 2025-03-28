import { useTaskStore } from '../../store/taskStore';
import { Link } from 'react-router-dom';
import { FiCheckSquare, FiClock, FiFlag } from 'react-icons/fi';

const DashboardPage = () => {
  const { tasks, categories } = useTaskStore();
  
  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const todoTasks = tasks.filter(task => task.status === 'todo').length;
  const highPriorityTasks = tasks.filter(task => task.priority === 'high').length;
  
  // Calculate completion percentage
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;
  
  // Get recent tasks (last 5)
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);
  
  // Get tasks by category
  const tasksByCategory = categories.map(category => ({
    category,
    count: tasks.filter(task => task.categoryId === category.id).length,
  }));
  
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="stat bg-base-200 rounded-box shadow">
          <div className="stat-figure text-primary">
            <FiCheckSquare size={24} />
          </div>
          <div className="stat-title">Total Tasks</div>
          <div className="stat-value">{totalTasks}</div>
          <div className="stat-desc">{completedTasks} completed</div>
        </div>
        
        <div className="stat bg-base-200 rounded-box shadow">
          <div className="stat-figure text-warning">
            <FiClock size={24} />
          </div>
          <div className="stat-title">In Progress</div>
          <div className="stat-value">{inProgressTasks}</div>
          <div className="stat-desc">{todoTasks} remaining</div>
        </div>
        
        <div className="stat bg-base-200 rounded-box shadow">
          <div className="stat-figure text-error">
            <FiFlag size={24} />
          </div>
          <div className="stat-title">High Priority</div>
          <div className="stat-value">{highPriorityTasks}</div>
          <div className="stat-desc">Require immediate attention</div>
        </div>
        
        <div className="stat bg-base-200 rounded-box shadow">
          <div className="stat-title">Completion</div>
          <div className="stat-value">{completionPercentage}%</div>
          <progress 
            className="progress progress-primary w-full" 
            value={completionPercentage} 
            max="100"
          ></progress>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Recent Tasks</h2>
            {recentTasks.length === 0 ? (
              <p>No tasks yet. Create your first task to get started.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Status</th>
                      <th>Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTasks.map(task => (
                      <tr key={task.id}>
                        <td>{task.title}</td>
                        <td>
                          <div className="badge badge-outline">
                            {task.status === 'todo' && 'To Do'}
                            {task.status === 'in-progress' && 'In Progress'}
                            {task.status === 'completed' && 'Completed'}
                          </div>
                        </td>
                        <td>
                          <div 
                            className={`badge ${
                              task.priority === 'high' 
                                ? 'badge-error' 
                                : task.priority === 'medium' 
                                  ? 'badge-warning' 
                                  : 'badge-info'
                            }`}
                          >
                            {task.priority}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="card-actions justify-end mt-4">
              <Link to="/tasks" className="btn btn-primary btn-sm">
                View All Tasks
              </Link>
            </div>
          </div>
        </div>
        
        {/* Categories */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Tasks by Category</h2>
            {tasksByCategory.length === 0 ? (
              <p>No categories available.</p>
            ) : (
              <div className="space-y-4">
                {tasksByCategory.map(({ category, count }) => (
                  <div key={category.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span>{category.name}</span>
                    </div>
                    <div className="badge">{count} tasks</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 