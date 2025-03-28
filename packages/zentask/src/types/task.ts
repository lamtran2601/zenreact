export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export type TaskCategory = {
  id: string;
  name: string;
  color: string;
};

export type TaskTag = {
  id: string;
  name: string;
  color: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  categoryId: string;
  tags: string[]; // Array of tag IDs
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}; 