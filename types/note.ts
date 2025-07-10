export interface Note {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  id: number;
  createdAt: string;
  updatedAt: string;
}
export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface NewNote {
  title: string;
  content?: string;
  tag: NoteTag;
}
