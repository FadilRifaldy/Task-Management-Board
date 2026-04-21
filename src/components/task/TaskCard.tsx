import React from 'react';
import type { Task } from '../../types';
import { TEAM, LABEL_OPTIONS, PRIORITY_OPTIONS } from '../../constants';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const assignees = TEAM.filter(m => task.assignees.includes(m.id));
  const labelOption = LABEL_OPTIONS.find(l => l.value === task.label);
  const priorityOption = PRIORITY_OPTIONS.find(p => p.value === task.priority);

  const totalChecklist = task.checklist.length;
  const doneChecklist = task.checklist.filter(c => c.done).length;
  const progressPercent = totalChecklist > 0 ? (doneChecklist / totalChecklist) * 100 : 0;

  return (
    <div className="bg-white rounded-xl p-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-grab relative overflow-hidden">
      {task.cover ? (
        <img
          src={task.cover}
          alt="Cover"
          className="w-full h-32 object-cover rounded-t-xl -m-3.5 mb-3"
        />
      ) : (
        <div className="w-full h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-xl -m-3.5 mb-3 flex items-center justify-center">
          <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
            <span className="text-4xl text-gray-600">📷</span>
          </div>
        </div>
      )}

      {task.label && labelOption && (
        <div
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold mb-2"
          style={{ backgroundColor: labelOption.bg, color: labelOption.color }}
        >
          {task.label}
        </div>
      )}

      <h4 className="text-sm font-medium text-gray-900 leading-tight mb-2.5">{task.title}</h4>

      <div className="h-0.5 bg-gray-200 rounded mb-2.5">
        <div
          className="h-full bg-blue-600 rounded transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          {task.due && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>📅</span>
              {new Date(task.due).toLocaleDateString()}
            </div>
          )}
          {task.priority && priorityOption && (
            <div className="flex items-center gap-1 text-xs" style={{ color: priorityOption.color }}>
              <span>⚡</span>
              {task.priority}
            </div>
          )}
        </div>
        <div className="flex -space-x-1">
          {assignees.slice(0, 3).map((assignee) => (
            <div
              key={assignee.id}
              className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white"
              style={{ backgroundColor: assignee.color }}
            >
              {assignee.name[0]}
            </div>
          ))}
          {assignees.length > 3 && (
            <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[8px] text-gray-600">
              +{assignees.length - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
