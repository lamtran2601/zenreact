import { useState } from 'react';
import { useTaskStore } from '../../../store/taskStore';
import { TaskTag } from '../../../types/task';

function TagManager() {
  const { tags, addTag, updateTag, deleteTag } = useTaskStore();
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [newTag, setNewTag] = useState<Omit<TaskTag, 'id'>>({
    name: '',
    color: '#CCCCCC'
  });
  
  const handleAddTag = () => {
    if (newTag.name.trim()) {
      addTag(newTag);
      setNewTag({ name: '', color: '#CCCCCC' });
      setIsAddingTag(false);
    }
  };
  
  const handleUpdateTag = (id: string) => {
    if (newTag.name.trim()) {
      updateTag(id, newTag);
      setNewTag({ name: '', color: '#CCCCCC' });
      setEditingTagId(null);
    }
  };
  
  const handleDeleteTag = (id: string) => {
    if (confirm('Are you sure you want to delete this tag? It will be removed from all tasks that use it.')) {
      deleteTag(id);
    }
  };
  
  const startEditing = (tag: TaskTag) => {
    setEditingTagId(tag.id);
    setNewTag({ name: tag.name, color: tag.color });
  };
  
  const cancelEditing = () => {
    setEditingTagId(null);
    setNewTag({ name: '', color: '#CCCCCC' });
  };
  
  const startAddingTag = () => {
    setIsAddingTag(true);
    setEditingTagId(null);
    setNewTag({ name: '', color: '#CCCCCC' });
  };
  
  const tagColors = [
    '#FF5733', // red
    '#FF33F0', // pink
    '#9933FF', // purple
    '#3357FF', // blue
    '#33FFF0', // cyan
    '#33FF57', // green
    '#F0FF33', // yellow
    '#FF9933', // orange
  ];
  
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h3 className="card-title">Tags</h3>
          {!isAddingTag && (
            <button 
              className="btn btn-sm btn-primary"
              onClick={startAddingTag}
            >
              Add Tag
            </button>
          )}
        </div>
        
        {/* Tag List */}
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
              {/* Add Tag Row */}
              {isAddingTag && (
                <tr>
                  <td>
                    <input 
                      type="text" 
                      className="input input-bordered w-full"
                      placeholder="Tag name"
                      value={newTag.name}
                      onChange={(e) => setNewTag({
                        ...newTag,
                        name: e.target.value
                      })}
                    />
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      {tagColors.map(color => (
                        <button 
                          key={color}
                          className={`w-6 h-6 rounded-full border-2 ${
                            newTag.color === color ? 'border-primary' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setNewTag({
                            ...newTag,
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
                        onClick={handleAddTag}
                      >
                        Save
                      </button>
                      <button 
                        className="btn btn-sm btn-ghost"
                        onClick={() => setIsAddingTag(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              )}
              
              {/* Tag Rows */}
              {tags.map(tag => (
                <tr key={tag.id}>
                  <td>
                    {editingTagId === tag.id ? (
                      <input 
                        type="text" 
                        className="input input-bordered w-full"
                        value={newTag.name}
                        onChange={(e) => setNewTag({
                          ...newTag,
                          name: e.target.value
                        })}
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: tag.color }}
                        ></div>
                        <span>{tag.name}</span>
                      </div>
                    )}
                  </td>
                  <td>
                    {editingTagId === tag.id ? (
                      <div className="flex flex-wrap gap-2">
                        {tagColors.map(color => (
                          <button 
                            key={color}
                            className={`w-6 h-6 rounded-full border-2 ${
                              newTag.color === color ? 'border-primary' : 'border-transparent'
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => setNewTag({
                              ...newTag,
                              color
                            })}
                          ></button>
                        ))}
                      </div>
                    ) : (
                      <div 
                        className="badge w-8 h-4" 
                        style={{ backgroundColor: tag.color }}
                      ></div>
                    )}
                  </td>
                  <td>
                    {editingTagId === tag.id ? (
                      <div className="flex gap-2">
                        <button 
                          className="btn btn-sm btn-success"
                          onClick={() => handleUpdateTag(tag.id)}
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
                          onClick={() => startEditing(tag)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-sm btn-ghost text-error"
                          onClick={() => handleDeleteTag(tag.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              
              {tags.length === 0 && !isAddingTag && (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    No tags found. Add a tag to get started.
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

export default TagManager; 