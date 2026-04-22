import React, { useState } from "react";
import { IonButton, IonIcon, IonSearchbar, IonChip, IonAvatar, IonLabel } from "@ionic/react";
import { addOutline, filterOutline, downloadOutline, chevronDownOutline } from "ionicons/icons";
import { TEAM } from "../../constants";
import useBoardStore from "../../store/useBoardStore";
import FilterBar from "../filter/FilterBar";

const Navbar: React.FC = () => {
  const { filter, setFilter } = useBoardStore();
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 sticky top-0 z-50 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <IonChip outline className="!m-0">
            <IonLabel>Adhivasindo</IonLabel>
            <IonIcon icon={chevronDownOutline} />
          </IonChip>

          <div className="flex ml-1">
            {TEAM.slice(0, 4).map((member, i) => (
              <IonAvatar
                key={member.id}
                className="!w-7 !h-7 border-2 border-white"
                style={{ marginLeft: i === 0 ? 0 : -6 }}
              >
                <div
                  className="w-full h-full rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ backgroundColor: member.color }}
                  title={member.name}
                >
                  {member.name[0]}
                </div>
              </IonAvatar>
            ))}
            {TEAM.length > 4 && (
              <IonAvatar className="!w-7 !h-7 border-2 border-white" style={{ marginLeft: -6 }}>
                <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center text-[9px] font-semibold text-white">
                  +{TEAM.length - 4}
                </div>
              </IonAvatar>
            )}
          </div>

          <IonButton fill="outline" size="small" color="medium">
            <IonIcon icon={addOutline} slot="start" />
            Invite
          </IonButton>
        </div>

        <div className="flex items-center gap-1">
          <IonButton
            fill={filterOpen ? "solid" : "outline"}
            size="small"
            color={filterOpen ? "primary" : "medium"}
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <IonIcon icon={filterOutline} slot="start" />
            Filter
          </IonButton>

          <IonButton fill="outline" size="small" color="medium">
            <IonIcon icon={downloadOutline} slot="start" />
            Export / Import
          </IonButton>
          <IonSearchbar
            value={filter.search}
            onIonInput={(e) => setFilter({ search: e.detail.value ?? "" })}
            placeholder="Search Tasks"
            debounce={300}
            className="!w-52 !min-h-0 !py-0"
            mode="ios"
          />
        </div>
      </div>

      {filterOpen && <FilterBar />}
    </>
  );
};

export default Navbar;
