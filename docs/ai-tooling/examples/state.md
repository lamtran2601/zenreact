# State Management Examples

## Zustand Store Example

### Basic Store Implementation

```typescript
import { create } from 'zustand';
import { z } from 'zod';

// State schema
const todoStateSchema = z.object({
  todos: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
      completed: z.boolean(),
    })
  ),
});

type TodoState = z.infer<typeof todoStateSchema>;

interface TodoActions {
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
}

const useTodoStore = create<TodoState & TodoActions>((set) => ({
  todos: [],

  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: crypto.randomUUID(), text, completed: false }],
    })),

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),

  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));
```

### Performance Optimized Store

```typescript
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  tags: string[];
}

interface TaskState {
  tasks: Record<string, Task>;
  selectedTaskId: string | null;

  // Actions
  addTask: (text: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  removeTask: (id: string) => void;
  selectTask: (id: string | null) => void;

  // Computed
  getFilteredTasks: (filter: string) => Task[];
  getTasksByTag: (tag: string) => Task[];
}

const useTaskStore = create<TaskState>()(
  devtools(
    persist(
      immer((set, get) => ({
        tasks: {},
        selectedTaskId: null,

        addTask: (text) =>
          set((state) => {
            const id = crypto.randomUUID();
            state.tasks[id] = {
              id,
              text,
              completed: false,
              tags: [],
            };
          }),

        updateTask: (id, updates) =>
          set((state) => {
            if (state.tasks[id]) {
              Object.assign(state.tasks[id], updates);
            }
          }),

        removeTask: (id) =>
          set((state) => {
            delete state.tasks[id];
            if (state.selectedTaskId === id) {
              state.selectedTaskId = null;
            }
          }),

        selectTask: (id) =>
          set((state) => {
            state.selectedTaskId = id;
          }),

        getFilteredTasks: (filter) => {
          const state = get();
          const tasks = Object.values(state.tasks);

          return tasks.filter((task) => task.text.toLowerCase().includes(filter.toLowerCase()));
        },

        getTasksByTag: (tag) => {
          const state = get();
          const tasks = Object.values(state.tasks);

          return tasks.filter((task) => task.tags.includes(tag));
        },
      })),
      {
        name: 'task-store',
        partialize: (state) => ({
          tasks: state.tasks,
        }),
      }
    )
  )
);
```

### Component Integration

```typescript
const TaskList = () => {
  const { tasks, addTask, updateTask, removeTask } = useTaskStore();
  const [filter, setFilter] = useState('');

  const filteredTasks = useTaskStore(
    (state) => state.getFilteredTasks(filter)
  );

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter tasks..."
      />

      <button onClick={() => addTask('New task')}>
        Add Task
      </button>

      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={updateTask}
          onRemove={removeTask}
        />
      ))}
    </div>
  );
};
```

## Key Features

1. Type-safe state with Zod schemas
2. Immutable updates (optionally with Immer)
3. Middleware integration (devtools, persist)
4. Computed values
5. Performance optimizations
6. Component integration examples

## Best Practices

1. **Type Safety**

   - Use Zod for runtime validation
   - Define clear interfaces
   - Leverage TypeScript inference

2. **Performance**

   - Use selectors for derived state
   - Normalize data when needed
   - Implement proper memoization

3. **Organization**

   - Group related state
   - Separate actions
   - Include computed values

4. **Maintainability**
   - Clear naming conventions
   - Consistent patterns
   - Documentation for complex state

## Related Patterns

- Schema validation
- State normalization
- Selector optimization
- Middleware usage
- Component integration
