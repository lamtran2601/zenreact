import { useState } from 'react';

type SortField = 'title' | 'dueDate' | 'priority' | 'status' | 'createdAt';
type SortDirection = 'asc' | 'desc';

interface TaskSortProps {
  onSortChange: (sortConfig: { field: SortField; direction: SortDirection }) => void;
}

function TaskSort({ onSortChange }: TaskSortProps) {
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSortFieldChange = (field: SortField) => {
    const newDirection = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
    onSortChange({ field, direction: newDirection });
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <span className="text-sm font-medium my-auto">Sort by:</span>
      
      <div className="btn-group">
        <button 
          className={`btn btn-sm ${sortField === 'title' ? 'btn-active' : ''}`}
          onClick={() => handleSortFieldChange('title')}
        >
          Title {sortField === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          className={`btn btn-sm ${sortField === 'dueDate' ? 'btn-active' : ''}`}
          onClick={() => handleSortFieldChange('dueDate')}
        >
          Due Date {sortField === 'dueDate' && (sortDirection === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          className={`btn btn-sm ${sortField === 'priority' ? 'btn-active' : ''}`}
          onClick={() => handleSortFieldChange('priority')}
        >
          Priority {sortField === 'priority' && (sortDirection === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          className={`btn btn-sm ${sortField === 'status' ? 'btn-active' : ''}`}
          onClick={() => handleSortFieldChange('status')}
        >
          Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          className={`btn btn-sm ${sortField === 'createdAt' ? 'btn-active' : ''}`}
          onClick={() => handleSortFieldChange('createdAt')}
        >
          Created {sortField === 'createdAt' && (sortDirection === 'asc' ? '↑' : '↓')}
        </button>
      </div>
    </div>
  );
}

export default TaskSort; 