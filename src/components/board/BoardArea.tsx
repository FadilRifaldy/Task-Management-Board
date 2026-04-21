import React from 'react';
import useBoardStore from '../../store/useBoardStore';  
import Column from './Column';
import { IonButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';
import type { Column as ColumnType } from '../../types';  

const BoardArea: React.FC = () => {
  const { columns } = useBoardStore();

  return (
    <div className="flex gap-4 px-6 py-5 overflow-x-auto items-start min-h-[calc(100vh-120px)]">
      {columns.map((column: ColumnType) => (  
        <Column key={column.id} column={column} />
      ))}
      <IonButton
        fill="clear"
        className="min-w-[290px] w-[290px] h-12 rounded-xl bg-blue-100 bg-transparent flex items-center justify-center gap-1.5 text-gray-500 hover:border-blue-600 hover:text-blue-600 transition-colors flex-shrink-0"
      >
        <IonIcon icon={add} />
        Add new List
      </IonButton>
    </div>
  );
};

export default BoardArea;
