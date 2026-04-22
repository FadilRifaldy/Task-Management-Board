import React, { useState, useEffect } from "react";
import {
  IonModal,
  IonButton,
  IonIcon,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonLabel,
  IonAvatar,
  IonChip,
  IonAlert,
  useIonToast
} from "@ionic/react";
import {
  closeOutline,
  checkmarkOutline,
  trashOutline,
  addOutline,
  imageOutline,
  attachOutline,
  chatbubblesOutline,
  checkboxOutline,
  cloudUploadOutline,
} from "ionicons/icons";
import useBoardStore from "../../store/useBoardStore";
import { TEAM, LABEL_OPTIONS, PRIORITY_OPTIONS } from "../../constants";
import type { Task, Subtask, Attachment } from "../../types";

const TaskModal: React.FC = () => {
  const {
    selectedTask,
    showModal,
    setShowModal,
    columns,
    addTask,
    updateTask,
    deleteTask,
    setSelectedTask,
  } = useBoardStore();

  const [form, setForm] = useState<Partial<Task>>({});
  const [checklist, setChecklist] = useState<Subtask[]>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [newSubtaskText, setNewSubtaskText] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [present] = useIonToast();

  useEffect(() => {
    if (selectedTask) {
      setForm({ ...selectedTask });
      setChecklist([...selectedTask.checklist]);
      setAttachments([...selectedTask.attachments]);
    } else {
      setForm({
        title: "",
        desc: "",
        column: columns[0]?.id || "",
        assignees: [],
        due: "",
        label: "",
        priority: "",
        cover: "",
        done: false,
      });
      setChecklist([]);
      setAttachments([]);
    }
    setNewSubtaskText("");
    setShowDeleteConfirm(false);
  }, [selectedTask, showModal]);

  const handleSave = () => {
    const taskData = { ...form, checklist, attachments };
    if (selectedTask) {
      updateTask(selectedTask.id, taskData);
      present({ message: 'Task updated successfully', duration: 2000, color: 'success', position: 'bottom' });
    } else {
      addTask(taskData as Omit<Task, "id" | "createdAt">);
      present({ message: 'Task created successfully', duration: 2000, color: 'success', position: 'bottom' });
    }
    setShowModal(false);
    setSelectedTask(null);
  };

  const handleDelete = () => {
    if (selectedTask) {
      deleteTask(selectedTask.id);
      present({ message: 'Task deleted successfully', duration: 2000, color: 'dark', position: 'bottom' });
      setShowModal(false);
      setSelectedTask(null);
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm({ ...form, cover: url });
    }
  };

  const removeCover = () => setForm({ ...form, cover: "" });

  const addSubtask = () => {
    const text = newSubtaskText.trim();
    if (text) {
      setChecklist([...checklist, { id: "s" + Date.now(), text, done: false }]);
      setNewSubtaskText("");
    }
  };

  const toggleSubtask = (id: string) => {
    setChecklist(checklist.map((s) => (s.id === id ? { ...s, done: !s.done } : s)));
  };

  const deleteSubtask = (id: string) => {
    setChecklist(checklist.filter((s) => s.id !== id));
  };

  const addAttachment = () => {
    setAttachments([...attachments, { id: "a" + Date.now(), name: "dummy-file.pdf" }]);
  };

  const deleteAttachment = (id: string) => {
    setAttachments(attachments.filter((a) => a.id !== id));
  };

  const toggleAssignee = (memberId: string) => {
    const current = form.assignees || [];
    if (current.includes(memberId)) {
      setForm({ ...form, assignees: current.filter((id) => id !== memberId) });
    } else {
      setForm({ ...form, assignees: [...current, memberId] });
    }
  };

  const doneCount = checklist.filter((c) => c.done).length;
  const totalCount = checklist.length;
  const progressPct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <>
      <IonModal isOpen={showModal} onDidDismiss={() => { setShowModal(false); setSelectedTask(null); }}>
        <div className="bg-white rounded-2xl flex flex-col max-h-[90vh] overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50">
            <IonButton
              fill={form.done ? "solid" : "outline"}
              color={form.done ? "success" : "medium"}
              size="small"
              onClick={() => setForm({ ...form, done: !form.done })}
            >
              <IonIcon icon={checkmarkOutline} slot="start" />
              {form.done ? "Completed" : "Mark Complete"}
            </IonButton>

            {selectedTask && (
              <IonButton fill="outline" color="danger" size="small" onClick={() => setShowDeleteConfirm(true)}>
                <IonIcon icon={trashOutline} slot="start" />
                Delete
              </IonButton>
            )}

            <IonButton fill="clear" color="medium" size="small" className="ml-auto" onClick={() => { setShowModal(false); setSelectedTask(null); }}>
              <IonIcon icon={closeOutline} slot="icon-only" />
            </IonButton>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            <div
              className="border-2 border-dashed border-gray-200 rounded-xl h-[140px] flex flex-col items-center justify-center gap-1.5 cursor-pointer mb-4 transition-colors hover:border-[#5b8def] hover:text-[#5b8def] bg-gray-50 relative overflow-hidden"
              onClick={() => document.getElementById("modal-cover-input")?.click()}
            >
              {form.cover ? (
                <>
                  <img src={form.cover} alt="cover" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
                  <IonButton
                    fill="solid"
                    color="dark"
                    size="small"
                    className="absolute bottom-2 right-2 z-10 !opacity-80"
                    onClick={(e:any) => { e.stopPropagation(); removeCover(); }}
                  >
                    Remove
                  </IonButton>
                </>
              ) : (
                <>
                  <IonIcon icon={imageOutline} className="!text-3xl text-gray-400" />
                  <span className="text-[13px] text-[#5b8def]">Add Cover Image</span>
                </>
              )}
              <input id="modal-cover-input" type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
            </div>

            <IonInput
              value={form.title}
              placeholder="Task title..."
              onIonInput={(e) => setForm({ ...form, title: e.detail.value ?? "" })}
              className="!text-lg !font-semibold !mb-4"
            />

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <IonLabel className="!text-xs !font-semibold !text-gray-500 !uppercase !tracking-wider">Assignee</IonLabel>
                <div className="flex items-center gap-1.5 flex-wrap mt-1.5">
                  {(form.assignees || []).map((id) => {
                    const m = TEAM.find((t) => t.id === id);
                    return m ? (
                      <IonAvatar key={id} className="!w-7 !h-7 cursor-pointer" onClick={() => toggleAssignee(id)}>
                        <div className="w-full h-full rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: m.color }} title={`Remove ${m.name}`}>
                          {m.name[0]}
                        </div>
                      </IonAvatar>
                    ) : null;
                  })}
                  <div className="relative group">
                    <IonButton fill="outline" color="medium" size="small" className="!rounded-full !w-7 !h-7 !min-h-0 !--padding-start:0 !--padding-end:0">
                      <IonIcon icon={addOutline} slot="icon-only" />
                    </IonButton>
                    <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 hidden group-hover:block min-w-[140px]">
                      {TEAM.filter((m) => !(form.assignees || []).includes(m.id)).map((m) => (
                        <button
                          key={m.id}
                          className="flex items-center gap-2 px-3 py-1.5 text-[12px] text-gray-700 hover:bg-gray-50 w-full text-left cursor-pointer"
                          onClick={() => toggleAssignee(m.id)}
                        >
                          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ backgroundColor: m.color }}>{m.name[0]}</div>
                          {m.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <IonLabel className="!text-xs !font-semibold !text-gray-500 !uppercase !tracking-wider">Due Date</IonLabel>
                <IonInput
                  type="date"
                  value={form.due}
                  onIonInput={(e) => setForm({ ...form, due: (e.detail.value as string) ?? "" })}
                  className="mt-1.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <IonLabel className="!text-xs !font-semibold !text-gray-500 !uppercase !tracking-wider">Board</IonLabel>
                <IonSelect value="Adhivasindo" disabled interface="popover" className="mt-1.5">
                  <IonSelectOption value="Adhivasindo">Adhivasindo</IonSelectOption>
                </IonSelect>
              </div>
              <div>
                <IonLabel className="!text-xs !font-semibold !text-gray-500 !uppercase !tracking-wider">Column</IonLabel>
                <IonSelect value={form.column} interface="popover" className="mt-1.5" onIonChange={(e) => setForm({ ...form, column: e.detail.value })}>
                  {columns.map((col) => (
                    <IonSelectOption key={col.id} value={col.id}>{col.name}</IonSelectOption>
                  ))}
                </IonSelect>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <IonLabel className="!text-xs !font-semibold !text-gray-500 !uppercase !tracking-wider">Label</IonLabel>
                <IonSelect value={form.label} interface="popover" className="mt-1.5" onIonChange={(e) => setForm({ ...form, label: e.detail.value })}>
                  <IonSelectOption value="">None</IonSelectOption>
                  {LABEL_OPTIONS.map((l) => (
                    <IonSelectOption key={l.value} value={l.value}>{l.value}</IonSelectOption>
                  ))}
                </IonSelect>
              </div>
              <div>
                <IonLabel className="!text-xs !font-semibold !text-gray-500 !uppercase !tracking-wider">Priority</IonLabel>
                <IonSelect value={form.priority} interface="popover" className="mt-1.5" onIonChange={(e) => setForm({ ...form, priority: e.detail.value })}>
                  <IonSelectOption value="">None</IonSelectOption>
                  {PRIORITY_OPTIONS.map((p) => (
                    <IonSelectOption key={p.value} value={p.value}>{p.value}</IonSelectOption>
                  ))}
                </IonSelect>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-[15px] font-semibold text-gray-900 mb-3">Description</div>
              <IonTextarea
                value={form.desc}
                placeholder="Add a description..."
                rows={4}
                onIonInput={(e) => setForm({ ...form, desc: e.detail.value ?? "" })}
                className="!border !border-gray-200 !rounded-lg !bg-gray-50 !pl-5"
              />
            </div>

            <div className="mb-4">
              <div className="text-[15px] font-semibold text-gray-900 mb-3 flex items-center gap-1.5">
                <IonIcon icon={attachOutline} /> Attachments
              </div>
              <div
                className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center text-[13px] text-gray-500 cursor-pointer transition-colors hover:border-[#5b8def] hover:text-[#5b8def] flex flex-col items-center justify-center gap-2"
                onClick={addAttachment}
              >
                <IonIcon icon={cloudUploadOutline} className="text-2xl text-gray-400" />
                <div>
                  Drag & Drop files here <span className="text-gray-400">or</span> <span className="text-[#5b8def] cursor-pointer">browse</span>
                </div>
              </div>
              {attachments.map((att) => (
                <div key={att.id} className="flex items-center gap-2 p-1.5 bg-gray-50 rounded-md mt-1.5 text-xs border border-gray-100">
                  <IonIcon icon={attachOutline} className="text-gray-500" />
                  <span className="flex-1 font-medium text-gray-700">{att.name}</span>
                  <IonButton fill="clear" size="small" color="danger" onClick={() => deleteAttachment(att.id)}>
                    <IonIcon icon={trashOutline} slot="icon-only" />
                  </IonButton>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <div className="text-[15px] font-semibold text-gray-900 mb-3 flex items-center gap-1.5">
                <IonIcon icon={checkboxOutline} /> Check List
              </div>
              <div className="text-xs text-gray-500 mb-1.5">{doneCount} / {totalCount}</div>
              <div className="h-1 bg-gray-200 rounded-sm mb-2">
                <div className="h-full rounded-sm transition-all duration-300" style={{ width: `${progressPct}%`, backgroundColor: progressPct >= 100 ? "#34d399" : "#5b8def" }} />
              </div>
              {checklist.map((sub) => (
                <div key={sub.id} className="flex items-center gap-2 py-1.5 border-b border-gray-100 last:border-b-0">
                  <IonCheckbox checked={sub.done} onIonChange={() => toggleSubtask(sub.id)} />
                  <span className={`flex-1 text-[13px] ${sub.done ? "line-through text-gray-400" : "text-gray-700"}`}>{sub.text}</span>
                  <IonButton fill="clear" size="small" color="danger" onClick={() => deleteSubtask(sub.id)}>
                    <IonIcon icon={trashOutline} slot="icon-only" />
                  </IonButton>
                </div>
              ))}
              <div className="flex gap-1.5 mt-2">
                <IonInput
                  value={newSubtaskText}
                  placeholder="Add subtask..."
                  onIonInput={(e) => setNewSubtaskText(e.detail.value ?? "")}
                  onKeyDown={(e:any) => { if (e.key === "Enter") addSubtask(); }}
                  className="!text-xs"
                />
                <IonButton size="small" color="primary" onClick={addSubtask}>
                  <IonIcon icon={addOutline} slot="icon-only" />
                </IonButton>
              </div>
            </div>

            <div>
              <div className="text-[15px] font-semibold text-gray-900 mb-3 flex items-center gap-1.5">
                <IonIcon icon={chatbubblesOutline} /> Activity
              </div>
              <div className="flex gap-2 mb-2.5 text-xs text-gray-500">
                <IonAvatar className="!w-6 !h-6 flex-shrink-0">
                  <div className="w-full h-full rounded-full bg-[#5b8def] text-white flex items-center justify-center text-[10px] font-bold">A</div>
                </IonAvatar>
                <div><strong className="text-gray-700">Admin</strong> created this task</div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 px-4 py-3 border-t border-gray-200 bg-gray-50">
            <IonButton fill="outline" color="medium" onClick={() => { setShowModal(false); setSelectedTask(null); }}>
              Discard
            </IonButton>
            <IonButton color="primary" onClick={handleSave}>
              Save
            </IonButton>
          </div>
        </div>
      </IonModal>

      <IonAlert
        isOpen={showDeleteConfirm}
        onDidDismiss={() => setShowDeleteConfirm(false)}
        header="Delete Task?"
        message="This action cannot be undone. Are you sure you want to delete this task?"
        buttons={[
          { text: "Cancel", role: "cancel" },
          { text: "Delete", role: "destructive", handler: handleDelete },
        ]}
      />
    </>
  );
};

export default TaskModal;
