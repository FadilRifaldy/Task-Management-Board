import React, { useState } from "react";
import type { Column as ColumnType } from "../../types";
import { IonButton, IonIcon, IonBadge } from "@ionic/react";
import { addOutline, ellipsisHorizontal, expandOutline } from "ionicons/icons";
import useBoardStore from "../../store/useBoardStore";
import TaskCard from "../task/TaskCard";

interface ColumnProps {
  column: ColumnType;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const { getFilteredTasks, setSelectedTask, setShowModal, moveTask, tasks } =
    useBoardStore();
  const filteredTasks = getFilteredTasks(column.id);
  const allColTasks = tasks.filter((t) => t.column === column.id);
  const [dragOver, setDragOver] = useState(false);

  return (
    <div className="min-w-[290px] w-[290px] flex flex-col gap-2.5 flex-shrink-0">
      <div className="flex items-center gap-1 px-0.5 py-1.5">
        <h3 className="font-semibold text-sm flex-1 text-gray-900">
          {column.name}
        </h3>

        <IonButton
          fill="clear"
          size="small"
          color="medium"
          className="!min-h-0 !h-7 !w-7"
          onClick={() => {
            setSelectedTask(null);
            setShowModal(true);
          }}
          title="Add task"
        >
          <IonIcon icon={addOutline} slot="icon-only" />
        </IonButton>

        <IonBadge color="light" className="!text-gray-500 !text-[11px] !font-medium">
          {allColTasks.length}
        </IonBadge>

        <IonButton fill="clear" size="small" color="medium" className="!min-h-0 !h-7 !w-7">
          <IonIcon icon={ellipsisHorizontal} slot="icon-only" />
        </IonButton>
        <IonButton fill="clear" size="small" color="medium" className="!min-h-0 !h-7 !w-7">
          <IonIcon icon={expandOutline} slot="icon-only" />
        </IonButton>
      </div>

      <div
        className={`flex flex-col gap-2.5 rounded-xl p-1 min-h-[60px] border-2 border-dashed transition-colors ${
          dragOver ? "border-blue-500 bg-blue-50/50" : "border-transparent"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const taskId = e.dataTransfer.getData("task-id");
          if (taskId) {
            moveTask(taskId, column.id);
          }
        }}
      >
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
