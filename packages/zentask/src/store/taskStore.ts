import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskPriority, TaskStatus, TaskCategory, TaskTag } from '../types/task';

interface TaskStore {
  tasks: Task[];
  categories: TaskCategory[];
  tags: TaskTag[];
  // Task Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  // Category Actions
  addCategory: (category: Omit<TaskCategory, 'id'>) => void;
  updateCategory: (id: string, updatedCategory: Partial<TaskCategory>) => void;
  deleteCategory: (id: string) => void;
  // Tag Actions
  addTag: (tag: Omit<TaskTag, 'id'>) => void;
  updateTag: (id: string, updatedTag: Partial<TaskTag>) => void;
  deleteTag: (id: string) => void;
}

// Initial categories
const defaultCategories: TaskCategory[] = [
  { id: '1', name: 'Work', color: '#FF5733' },
  { id: '2', name: 'Personal', color: '#33FF57' },
  { id: '3', name: 'Shopping', color: '#3357FF' },
];

// Initial tags
const defaultTags: TaskTag[] = [
  { id: '1', name: 'Urgent', color: '#FF5733' },
  { id: '2', name: 'Important', color: '#3357FF' },
  { id: '3', name: 'Long-term', color: '#33FF57' },
];

// Initial demo tasks
const defaultTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write detailed documentation for the current project',
    status: 'todo',
    priority: 'high',
    categoryId: '1',
    tags: ['1', '2'],
    dueDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Go grocery shopping',
    description: 'Buy vegetables, fruits, and other essentials',
    status: 'todo',
    priority: 'medium',
    categoryId: '3',
    tags: ['3'],
    dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: defaultTasks,
  categories: defaultCategories,
  tags: defaultTags,
  
  // Task Actions
  addTask: (task) => set((state) => ({
    tasks: [
      ...state.tasks,
      {
        ...task,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  })),
  
  updateTask: (id, updatedTask) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id
        ? { ...task, ...updatedTask, updatedAt: new Date().toISOString() }
        : task
    ),
  })),
  
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id),
  })),
  
  // Category Actions
  addCategory: (category) => set((state) => ({
    categories: [...state.categories, { ...category, id: uuidv4() }],
  })),
  
  updateCategory: (id, updatedCategory) => set((state) => ({
    categories: state.categories.map((category) =>
      category.id === id ? { ...category, ...updatedCategory } : category
    ),
  })),
  
  deleteCategory: (id) => set((state) => ({
    categories: state.categories.filter((category) => category.id !== id),
    // Update tasks that had this category
    tasks: state.tasks.map((task) => 
      task.categoryId === id 
        ? { ...task, categoryId: '', updatedAt: new Date().toISOString() }
        : task
    ),
  })),
  
  // Tag Actions
  addTag: (tag) => set((state) => ({
    tags: [...state.tags, { ...tag, id: uuidv4() }],
  })),
  
  updateTag: (id, updatedTag) => set((state) => ({
    tags: state.tags.map((tag) =>
      tag.id === id ? { ...tag, ...updatedTag } : tag
    ),
  })),
  
  deleteTag: (id) => set((state) => ({
    tags: state.tags.filter((tag) => tag.id !== id),
    // Remove this tag from any tasks that have it
    tasks: state.tasks.map((task) => 
      task.tags.includes(id)
        ? { 
            ...task, 
            tags: task.tags.filter(tagId => tagId !== id),
            updatedAt: new Date().toISOString() 
          }
        : task
    ),
  })),
})); 