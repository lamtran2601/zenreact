import { useState } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskStats from './components/TaskStats';
import CategoryManager from './components/CategoryManager';
import TagManager from './components/TagManager';
import { Task } from '../../types/task';

type TabType = 'tasks' | 'categories' | 'tags' | 'settings';

const TaskPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<TabType>('tasks');
  
  const handleOpenForm = () => {
    setTaskToEdit(undefined);
    setIsFormOpen(true);
  };
  
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setTaskToEdit(undefined);
  };
  
  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsFormOpen(true);
  };
  
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Task Management</h1>
          {activeTab === 'tasks' && (
            <button 
              className="btn btn-primary" 
              onClick={handleOpenForm}
            >
              Add New Task
            </button>
          )}
        </div>
        
        <div className="tabs tabs-boxed mb-4">
          <button 
            className={`tab ${activeTab === 'tasks' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            Tasks
          </button>
          <button 
            className={`tab ${activeTab === 'categories' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            Categories
          </button>
          <button 
            className={`tab ${activeTab === 'tags' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('tags')}
          >
            Tags
          </button>
        </div>
        
        {activeTab === 'tasks' && (
          <>
            <TaskStats />
            
            {isFormOpen && (
              <div className="card bg-base-200 shadow-xl p-6">
                <h2 className="text-xl font-bold mb-4">
                  {taskToEdit ? 'Edit Task' : 'Add New Task'}
                </h2>
                <TaskForm 
                  taskToEdit={taskToEdit}
                  onClose={handleCloseForm}
                />
              </div>
            )}
            
            <TaskList onEditTask={handleEditTask} />
          </>
        )}
        
        {activeTab === 'categories' && (
          <CategoryManager />
        )}
        
        {activeTab === 'tags' && (
          <TagManager />
        )}
      </div>
    </div>
  );
};

export default TaskPage; 