import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, Column, FilterState } from '../types';
import { DEFAULT_TASKS, DEFAULT_COLUMNS } from '../constants';

const genId = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

interface BoardStore {
  columns: Column[];
  tasks: Task[];
  filter: FilterState;

  addColumn: (name: string) => void;
  deleteColumn: (id: string) => void;

  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, data: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, toColumnId: string) => void;

  setFilter: (filter: Partial<FilterState>) => void;
  clearFilter: () => void;

  getFilteredTasks: (columnId: string) => Task[];
}

const DEFAULT_FILTER: FilterState = {
  assignee: '',
  label: '',
  priority: '',
  due: '',
  search: '',
};

const useBoardStore = create<BoardStore>()(
  persist(
    (set, get) => ({
      
      columns: DEFAULT_COLUMNS,
      tasks: DEFAULT_TASKS,
      filter: DEFAULT_FILTER,

      addColumn: (name) =>
        set((state) => ({
          columns: [...state.columns, { id: 'c' + genId(), name }],
        })),

      deleteColumn: (id) =>
        set((state) => ({
          columns: state.columns.filter((c) => c.id !== id),
          tasks: state.tasks.filter((t) => t.column !== id),
        })),

      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: 't' + genId(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      updateTask: (id, data) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, ...data } : t
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      moveTask: (taskId, toColumnId) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, column: toColumnId } : t
          ),
        })),

      setFilter: (filter) =>
        set((state) => ({
          filter: { ...state.filter, ...filter },
        })),

      clearFilter: () => set({ filter: DEFAULT_FILTER }),

      getFilteredTasks: (columnId) => {
        const { tasks, filter } = get();

        return tasks.filter((t) => {

          if (t.column !== columnId) return false;

          if (
            filter.search &&
            !t.title.toLowerCase().includes(filter.search.toLowerCase())
          ) return false;

          if (filter.assignee && !t.assignees.includes(filter.assignee))
            return false;

          if (filter.label && t.label !== filter.label) return false;

          if (filter.priority && t.priority !== filter.priority) return false;

          if (filter.due && t.due !== filter.due) return false;

          return true;
        });
      },
    }),

    {
      name: 'task-management-board', 
      partialize: (state) => ({
        columns: state.columns,
        tasks: state.tasks,
      }),
    }
  )
);

export default useBoardStore;