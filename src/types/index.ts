export interface Member {
  id: string;
  name: string;
  color: string; 
}

export interface Subtask {
  id: string;
  text: string;
  done: boolean;
}

export interface Attachment {
  id: string;
  name: string; 
}

export type Label = 'Feature' | 'Bug' | 'Issue' | 'Undefined' | '';

export type Priority = 'Low' | 'Medium' | 'High' | '';

export interface Task {
  id: string;
  title: string;
  desc: string;
  column: string;        
  assignees: string[];   
  due: string;           
  label: Label;
  priority: Priority;
  checklist: Subtask[];
  attachments: Attachment[];
  cover: string;         
  done: boolean;         
  createdAt: string;     
}

export interface Column {
  id: string;
  name: string;
}

export interface BoardState {
  columns: Column[];
  tasks: Task[];
}

export interface FilterState {
  assignee: string;
  label: Label | '';
  priority: Priority | '';
  due: string;
  search: string;
}