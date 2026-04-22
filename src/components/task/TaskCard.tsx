import React from "react";
import { IonCard, IonCardContent, IonChip, IonAvatar, IonIcon, IonLabel } from "@ionic/react";
import { timeOutline, checkmarkOutline, attachOutline } from "ionicons/icons";
import type { Task } from "../../types";
import { TEAM, LABEL_OPTIONS, PRIORITY_OPTIONS } from "../../constants";
import useBoardStore from "../../store/useBoardStore";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { setSelectedTask, setShowModal } = useBoardStore();
  const assignees = TEAM.filter((m) => task.assignees.includes(m.id));
  const labelOption = LABEL_OPTIONS.find((l) => l.value === task.label);
  const priorityOption = PRIORITY_OPTIONS.find((p) => p.value === task.priority);

  const totalChecklist = task.checklist.length;
  const doneChecklist = task.checklist.filter((c) => c.done).length;
  const progressPercent =
    totalChecklist > 0 ? (doneChecklist / totalChecklist) * 100 : 0;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { day: "numeric", month: "short" });
  };

  return (
    <IonCard
      className="!m-0 !rounded-xl !shadow-[0_1px_3px_rgba(0,0,0,.05),0_4px_12px_rgba(0,0,0,.04)] hover:!shadow-[0_8px_24px_rgba(0,0,0,.10)] hover:-translate-y-0.5 transition-all duration-200 cursor-grab overflow-hidden bg-white border border-gray-100"
      draggable
      onDragStart={(e: any) => {
        e.dataTransfer.setData("task-id", task.id);
        (e.currentTarget as HTMLElement).classList.add("dragging");
      }}
      onDragEnd={(e: any) => {
        (e.currentTarget as HTMLElement).classList.remove("dragging");
      }}
      onClick={() => {
        setSelectedTask(task);
        setShowModal(true);
      }}
    >
      {task.cover && (
        <div className="-mx-3.5 -mt-3.5 mb-3">
          <img
            src={task.cover}
            alt="cover"
            className="w-full h-[130px] object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}

      <IonCardContent className="!p-3.5">
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          <div className="flex-1">
          {task.label && labelOption && (
            <IonChip
              className="!m-0 !px-2 !py-0.5 !h-auto !text-[10px] !font-bold !rounded-full uppercase tracking-wide"
              style={{ "--background": labelOption.bg, "--color": labelOption.color } as any}
            >
              <IonLabel>{task.label}</IonLabel>
            </IonChip>
          )}
          </div>
          {task.priority && priorityOption && (
            <IonChip
              outline
              className="!m-0 !px-2 !py-0.5 !h-auto !text-[10px] !font-bold !rounded-full uppercase tracking-wide border"
              style={{ "--color": priorityOption.color, borderColor: priorityOption.color } as any}
            >
              <IonLabel>{task.priority}</IonLabel>
            </IonChip>
          )}
        </div>

        {totalChecklist > 0 && (
          <div className="h-[3px] bg-gray-200 rounded-sm mb-2.5">
            <div
              className="h-full rounded-sm transition-all duration-300"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: progressPercent >= 100 ? "#34d399" : "#5b8def",
              }}
            />
          </div>
        )}

        <h4 className="text-[13.5px] font-medium text-gray-900 leading-snug mb-2.5">
          {task.title}
        </h4>
        <div className="flex items-center justify-between mt-2.5">
          <div className="flex items-center gap-2 flex-wrap text-[11px] text-gray-500">
            {task.due && (
              <span className="inline-flex items-center gap-1">
                <IonIcon icon={timeOutline} className="!text-xs" />
                {formatDate(task.due)}
              </span>
            )}
            {totalChecklist > 0 && (
              <span className="inline-flex items-center gap-1">
                <IonIcon icon={checkmarkOutline} className="!text-xs" />
                {doneChecklist}/{totalChecklist}
              </span>
            )}
            {task.attachments.length > 0 && (
              <span className="inline-flex items-center gap-1">
                <IonIcon icon={attachOutline} className="!text-xs" />
                {task.attachments.length}
              </span>
            )}
          </div>

          <div className="flex items-center justify-end">
            <div className="flex">
              {assignees.slice(0, 3).map((member, i) => (
                <IonAvatar
                  key={member.id}
                  className="!w-[22px] !h-[22px] border-2 border-white"
                  style={{ marginLeft: i === 0 ? 0 : -5 }}
                >
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ backgroundColor: member.color }}
                    title={member.name}
                  >
                    {member.name[0]}
                  </div>
                </IonAvatar>
              ))}
            </div>
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default TaskCard;
