import React from "react";
import { IonButton, IonIcon, IonSelect, IonSelectOption, IonLabel, IonInput } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { TEAM, LABEL_OPTIONS, PRIORITY_OPTIONS } from "../../constants";
import useBoardStore from "../../store/useBoardStore";

const FilterBar: React.FC = () => {
  const { filter, setFilter, clearFilter } = useBoardStore();

  return (
    <div className="flex items-center gap-4 px-6 py-2 bg-[#f8f9fb] border-b border-gray-200 flex-wrap">
      
      <div className="flex items-center gap-1">
        <IonLabel className="!text-xs !font-medium !text-gray-500">Assignee:</IonLabel>
        <IonSelect
          value={filter.assignee}
          placeholder="All"
          interface="popover"
          className="!text-xs !min-h-0 !py-0"
          onIonChange={(e) => setFilter({ assignee: e.detail.value })}
        >
          <IonSelectOption value="">All</IonSelectOption>
          {TEAM.map((member) => (
            <IonSelectOption key={member.id} value={member.id}>
              {member.name}
            </IonSelectOption>
          ))}
        </IonSelect>
      </div>

      <div className="flex items-center gap-1">
        <IonLabel className="!text-xs !font-medium !text-gray-500">Label:</IonLabel>
        <IonSelect
          value={filter.label}
          placeholder="All"
          interface="popover"
          className="!text-xs !min-h-0 !py-0"
          onIonChange={(e) => setFilter({ label: e.detail.value })}
        >
          <IonSelectOption value="">All</IonSelectOption>
          {LABEL_OPTIONS.map((label) => (
            <IonSelectOption key={label.value} value={label.value}>
              {label.value}
            </IonSelectOption>
          ))}
        </IonSelect>
      </div>

      <div className="flex items-center gap-1">
        <IonLabel className="!text-xs !font-medium !text-gray-500">Priority:</IonLabel>
        <IonSelect
          value={filter.priority}
          placeholder="All"
          interface="popover"
          className="!text-xs !min-h-0 !py-0"
          onIonChange={(e) => setFilter({ priority: e.detail.value })}
        >
          <IonSelectOption value="">All</IonSelectOption>
          {PRIORITY_OPTIONS.map((priority) => (
            <IonSelectOption key={priority.value} value={priority.value}>
              {priority.value}
            </IonSelectOption>
          ))}
        </IonSelect>
      </div>

      <div className="flex items-center gap-1">
        <IonLabel className="!text-xs !font-medium !text-gray-500">Due Date:</IonLabel>
        <IonInput
          type="date"
          value={filter.due}
          className="!text-xs !min-h-0 !py-0 !w-[140px]"
          onIonInput={(e) => setFilter({ due: (e.detail.value as string) ?? "" })}
        />
      </div>

      <IonButton fill="outline" size="small" color="medium" onClick={clearFilter} className="ml-auto">
        <IonIcon icon={closeOutline} slot="start" />
        Clear
      </IonButton>
    </div>
  );
};

export default FilterBar;
