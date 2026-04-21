import React from 'react';
import type { Column as ColumnType } from '../../types';
import { IonButton, IonIcon } from '@ionic/react';
import { ellipsisHorizontal } from 'ionicons/icons';
import useBoardStore from '../../store/useBoardStore';
import TaskCard from '../task/TaskCard';

interface ColumnProps {
  column: ColumnType;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const { getFilteredTasks } = useBoardStore();
  const tasks = getFilteredTasks(column.id);

  return (
    <div className="min-w-[290px] w-[290px] flex flex-col gap-2.5 flex-shrink-0">
      <div className="flex items-center gap-1.5 px-1.5 py-1.5">
        <h3 className="font-semibold text-sm flex-1">{column.name}</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-full px-1.5 py-0.5 text-[10px] text-gray-500 font-medium">
          {tasks.length}
        </div>
        <IonButton fill="clear" size="small" className="w-6 h-6">
          <IonIcon icon={ellipsisHorizontal} className="w-4 h-4" />
        </IonButton>
      </div>
      <div className="flex flex-col gap-2.5 rounded-xl p-1 min-h-16 border-2 border-dashed border-transparent">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
