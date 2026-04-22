import React, { useState } from "react";
import { IonButton, IonIcon, IonSearchbar, IonAvatar } from "@ionic/react";
import { addOutline, filterOutline, downloadOutline } from "ionicons/icons";
import { TEAM } from "../../constants";
import useBoardStore from "../../store/useBoardStore";
import FilterBar from "../filter/FilterBar";

const Navbar: React.FC = () => {
  const { filter, setFilter } = useBoardStore();
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 bg-[#1e3a5f] sticky top-0 z-50 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-[15px] tracking-wide">Adhivasindo</span>

          <div className="flex ml-1 hidden sm:flex">
            {TEAM.slice(0, 4).map((member, i) => (
              <IonAvatar
                key={member.id}
                className="!w-7 !h-7 border-2 border-[#1e3a5f]"
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
              <IonAvatar className="!w-7 !h-7 border-2 border-[#1e3a5f]" style={{ marginLeft: -6 }}>
                <div className="w-full h-full rounded-full bg-[#5b8def] flex items-center justify-center text-[9px] font-semibold text-white">
                  +{TEAM.length - 4}
                </div>
              </IonAvatar>
            )}
          </div>

          <button className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/20 text-white/80 text-[13px] font-medium hover:bg-white/10 transition-colors">
            <IonIcon icon={addOutline} className="text-sm" />
            Invite
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto mt-1 sm:mt-0">
          <button
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
              filterOpen
                ? "bg-[#5b8def] text-white"
                : "border border-white/20 text-white/80 hover:bg-white/10"
            }`}
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <IonIcon icon={filterOutline} className="text-sm" />
            Filter
          </button>

          <button className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/20 text-white/80 text-[13px] font-medium hover:bg-white/10 transition-colors">
            <IonIcon icon={downloadOutline} className="text-sm" />
            Export / Import
          </button>

          <IonSearchbar
            value={filter.search}
            onIonInput={(e) => setFilter({ search: e.detail.value ?? "" })}
            placeholder="Search Tasks"
            debounce={300}
            className="w-full min-w-0 sm:!w-48 !min-h-0 !py-0 flex-1 sm:flex-none navbar-search"
            mode="ios"
            style={{
              '--background': 'rgba(255,255,255,0.12)',
              '--color': '#ffffff',
              '--placeholder-color': 'rgba(255,255,255,0.5)',
              '--icon-color': 'rgba(255,255,255,0.5)',
              '--clear-button-color': 'rgba(255,255,255,0.5)',
            } as any}
          />
        </div>
      </div>

      {filterOpen && <FilterBar />}
    </>
  );
};

export default Navbar;
