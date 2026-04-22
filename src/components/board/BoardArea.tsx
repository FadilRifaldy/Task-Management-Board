import React, { useState } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import useBoardStore from "../../store/useBoardStore";
import Column from "./Column";
import type { Column as ColumnType } from "../../types";

const BoardArea: React.FC = () => {
  const { columns, addColumn } = useBoardStore();
  const [showColInput, setShowColInput] = useState(false);
  const [newColName, setNewColName] = useState("");

  const handleAddColumn = () => {
    const name = newColName.trim();
    if (name) {
      addColumn(name);
      setNewColName("");
      setShowColInput(false);
    }
  };

  return (
    <div className="board-scroll flex gap-3 sm:gap-4 px-3 sm:px-6 py-4 sm:py-5 overflow-x-auto items-start min-h-[calc(100vh-60px)]">
      {columns.map((column: ColumnType) => (
        <Column key={column.id} column={column} />
      ))}

      {showColInput ? (
        <div className="min-w-[260px] sm:min-w-[290px] w-[260px] sm:w-[290px] flex-shrink-0 bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-[15px] font-semibold mb-3">Add New Column</h3>
          <input
            type="text"
            value={newColName}
            onChange={(e) => setNewColName(e.target.value)}
            placeholder="e.g. In QA"
            className="w-full px-2.5 py-2 rounded-lg border border-gray-200 text-[13px] bg-gray-50 outline-none focus:border-[#5b8def] focus:bg-white transition-colors mb-3"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddColumn();
              if (e.key === "Escape") setShowColInput(false);
            }}
          />
          <div className="flex gap-2 justify-end">
            <IonButton fill="outline" size="small" color="medium" onClick={() => setShowColInput(false)}>
              Cancel
            </IonButton>
            <IonButton size="small" color="primary" onClick={handleAddColumn}>
              Add
            </IonButton>
          </div>
        </div>
      ) : (
        <IonButton
          fill="outline"
          color="medium"
          className="min-w-[260px] sm:min-w-[290px] w-[260px] sm:w-[290px] !h-[50px] !rounded-xl !border-2 !border-dashed flex-shrink-0"
          onClick={() => setShowColInput(true)}
        >
          <IonIcon icon={addOutline} slot="start" />
          Add new List
        </IonButton>
      )}
    </div>
  );
};

export default BoardArea;
