import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NewNote } from "@/types/note";

const initialDraft: NewNote = {
  title: "",
  content: "",
  tag: "Todo",
};

interface NoteStore {
  draft: NewNote;
  setDraft: (draft: NewNote) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (draft) => set({ draft }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft",
    }
  )
);
