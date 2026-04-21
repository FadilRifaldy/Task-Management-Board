import React, { useState } from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { grid, chevronDownOutline as chevronDown, add, filter, download, search } from 'ionicons/icons';
import { TEAM } from '../../constants';
import useBoardStore from '../../store/useBoardStore';
import FilterBar from '../filter/FilterBar';

const Navbar: React.FC = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { setFilter } = useBoardStore();

  return (
    <>
      <nav className="flex items-center gap-3 px-6 py-3 bg-white border-b border-gray-200 sticky top-0 z-10 flex-wrap">
        {/* Logo */}
        <div className="font-bold text-lg text-gray-900 tracking-tight">
          Task<span className="text-blue-600">Board</span>
        </div>
        <div className="text-xs text-gray-500 ml-2">Kanban Management</div>

        {/* Workspace Badge & Avatars */}
        <div className="flex items-center gap-2 ml-4">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-gray-200 text-sm font-medium cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-500">
            <IonIcon icon={grid} className="w-3.5 h-3.5 text-gray-500" />
            Adhivasindo
            <IonIcon icon={chevronDown} className="w-3 h-3 text-gray-400" />
          </div>
          <div className="flex ml-1">
            {TEAM.slice(0, 3).map((member) => (
              <div
                key={member.id}
                className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white -ml-1.5 first:ml-0"
                style={{ backgroundColor: member.color }}
              >
                {member.name[0]}
              </div>
            ))}
            {TEAM.length > 3 && (
              <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[8px] text-gray-600 -ml-1.5">
                +{TEAM.length - 3}
              </div>
            )}
          </div>
          <IonButton
            fill="clear"
            size="small"
            className="!bg-gray-100 !border !border-gray-300 !text-gray-700 hover:!bg-gray-200 !rounded-md"
          >
            <IonIcon icon={add} slot="start" />
            Invite
          </IonButton>
        </div>

        {/* Separator */}
        <div className="w-px h-5 bg-gray-200 mx-2"></div>

        {/* Filter & Export */}
        <div className="flex items-center gap-2">
          <IonButton
            fill="clear"
            size="small"
            className="!bg-gray-100 !border !border-gray-300 !text-gray-700 hover:!bg-gray-200 !rounded-md"
            onClick={() => setShowFilter(!showFilter)}
          >
            <IonIcon icon={filter} slot="start" />
            Filter
          </IonButton>
          <IonButton
            fill="clear"
            size="small"
            className="!bg-gray-100 !border !border-gray-300 !text-gray-700 hover:!bg-gray-200 !rounded-md"
          >
            <IonIcon icon={download} slot="start" />
            Export / Import
          </IonButton>
        </div>

        {/* Search */}
        <div className="relative">
          <IonIcon icon={search} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Tasks"
            className="pl-9 pr-3 py-1.5 rounded-md border border-gray-200 text-sm bg-gray-100 w-64 outline-none focus:border-blue-600 focus:bg-white hover:bg-gray-50"
            onChange={(e) => setFilter({ search: e.target.value })}
          />
        </div>
      </nav>
      {showFilter && <FilterBar />}
    </>
  );
};

export default Navbar;
