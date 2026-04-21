import React from "react";
import {
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
  IonLabel,
} from "@ionic/react";
import { TEAM, LABEL_OPTIONS, PRIORITY_OPTIONS } from "../../constants";
import useBoardStore from "../../store/useBoardStore";

const FilterBar: React.FC = () => {
  const { filter, setFilter, clearFilter } = useBoardStore();

  return (
    <div className="flex items-center gap-2 px-6 py-2 bg-gray-100 border-b border-gray-200 flex-wrap">
      <IonLabel className="text-xs font-medium text-gray-500">
        Assignee:
      </IonLabel>
      <IonSelect
        value={filter.assignee}
        placeholder="All"
        className="w-auto text-xs"
        onIonChange={(e) => setFilter({ assignee: e.detail.value })}
      >
        <IonSelectOption value="">All</IonSelectOption>
        {TEAM.map((member) => (
          <IonSelectOption key={member.id} value={member.id}>
            {member.name}
          </IonSelectOption>
        ))}
      </IonSelect>

      <IonLabel className="text-xs font-medium text-gray-500">Label:</IonLabel>
      <IonSelect
        value={filter.label}
        placeholder="All"
        className="w-auto text-xs"
        onIonChange={(e) => setFilter({ label: e.detail.value })}
      >
        <IonSelectOption value="">All</IonSelectOption>
        {LABEL_OPTIONS.map((label) => (
          <IonSelectOption key={label.value} value={label.value}>
            {label.value}
          </IonSelectOption>
        ))}
      </IonSelect>

      <IonLabel className="text-xs font-medium text-gray-500">
        Priority:
      </IonLabel>
      <IonSelect
        value={filter.priority}
        placeholder="All"
        className="w-auto text-xs"
        onIonChange={(e) => setFilter({ priority: e.detail.value })}
      >
        <IonSelectOption value="">All</IonSelectOption>
        {PRIORITY_OPTIONS.map((priority) => (
          <IonSelectOption key={priority.value} value={priority.value}>
            {priority.value}
          </IonSelectOption>
        ))}
      </IonSelect>

      <IonLabel className="text-xs font-medium text-gray-500">
        Due Date:
      </IonLabel>
      <IonInput
        type="date"
        value={filter.due}
        className="w-auto text-xs"
        onIonChange={(e) => setFilter({ due: e.detail.value ?? "" })}
      />

      <IonButton
        fill="clear"
        color="medium"
        className="!bg-gray-100 !border !border-gray-300 !text-gray-700 hover:!bg-gray-200 !rounded-md"
        size="small"
        onClick={clearFilter}
      >
        Clear
      </IonButton>
    </div>
  );
};

export default FilterBar;
