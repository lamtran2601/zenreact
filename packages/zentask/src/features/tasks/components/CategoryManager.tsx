import { useState } from 'react';
import { useTaskStore } from '../../../store/taskStore';
import { TaskCategory } from '../../../types/task';

function CategoryManager() {
  const { categories, addCategory, updateCategory, deleteCategory } = useTaskStore();
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState<Omit<TaskCategory, 'id'>>({
    name: '',
    color: '#CCCCCC'
  });
  
  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      addCategory(newCategory);
      setNewCategory({ name: '', color: '#CCCCCC' });
      setIsAddingCategory(false);
    }
  };
  
  const handleUpdateCategory = (id: string) => {
    if (newCategory.name.trim()) {
      updateCategory(id, newCategory);
      setNewCategory({ name: '', color: '#CCCCCC' });
      setEditingCategoryId(null);
    }
  };
  
  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category? Tasks with this category will not be deleted, but will no longer have a category assigned.')) {
      deleteCategory(id);
    }
  };
  
  const startEditing = (category: TaskCategory) => {
    setEditingCategoryId(category.id);
    setNewCategory({ name: category.name, color: category.color });
  };
  
  const cancelEditing = () => {
    setEditingCategoryId(null);
    setNewCategory({ name: '', color: '#CCCCCC' });
  };
  
  const startAddingCategory = () => {
    setIsAddingCategory(true);
    setEditingCategoryId(null);
    setNewCategory({ name: '', color: '#CCCCCC' });
  };
  
  const categoryColors = [
    '#FF5733', // red
    '#33FF57', // green
    '#3357FF', // blue
    '#FF33F0', // pink
    '#F0FF33', // yellow
    '#33FFF0', // cyan
    '#9933FF', // purple
    '#FF9933', // orange
  ];
  
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h3 className="card-title">Categories</h3>
          {!isAddingCategory && (
            <button 
              className="btn btn-sm btn-primary"
              onClick={startAddingCategory}
            >
              Add Category
            </button>
          )}
        </div>
        
        {/* Category List */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Color</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Add Category Row */}
              {isAddingCategory && (
                <tr>
                  <td>
                    <input 
                      type="text" 
                      className="input input-bordered w-full"
                      placeholder="Category name"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({
                        ...newCategory,
                        name: e.target.value
                      })}
                    />
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      {categoryColors.map(color => (
                        <button 
                          key={color}
                          className={`w-6 h-6 rounded-full border-2 ${
                            newCategory.color === color ? 'border-primary' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setNewCategory({
                            ...newCategory,
                            color
                          })}
                        ></button>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button 
                        className="btn btn-sm btn-success"
                        onClick={handleAddCategory}
                      >
                        Save
                      </button>
                      <button 
                        className="btn btn-sm btn-ghost"
                        onClick={() => setIsAddingCategory(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              )}
              
              {/* Category Rows */}
              {categories.map(category => (
                <tr key={category.id}>
                  <td>
                    {editingCategoryId === category.id ? (
                      <input 
                        type="text" 
                        className="input input-bordered w-full"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({
                          ...newCategory,
                          name: e.target.value
                        })}
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span>{category.name}</span>
                      </div>
                    )}
                  </td>
                  <td>
                    {editingCategoryId === category.id ? (
                      <div className="flex flex-wrap gap-2">
                        {categoryColors.map(color => (
                          <button 
                            key={color}
                            className={`w-6 h-6 rounded-full border-2 ${
                              newCategory.color === color ? 'border-primary' : 'border-transparent'
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => setNewCategory({
                              ...newCategory,
                              color
                            })}
                          ></button>
                        ))}
                      </div>
                    ) : (
                      <div 
                        className="badge w-8 h-4" 
                        style={{ backgroundColor: category.color }}
                      ></div>
                    )}
                  </td>
                  <td>
                    {editingCategoryId === category.id ? (
                      <div className="flex gap-2">
                        <button 
                          className="btn btn-sm btn-success"
                          onClick={() => handleUpdateCategory(category.id)}
                        >
                          Save
                        </button>
                        <button 
                          className="btn btn-sm btn-ghost"
                          onClick={cancelEditing}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button 
                          className="btn btn-sm btn-ghost"
                          onClick={() => startEditing(category)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-sm btn-ghost text-error"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              
              {categories.length === 0 && !isAddingCategory && (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    No categories found. Add a category to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CategoryManager; 