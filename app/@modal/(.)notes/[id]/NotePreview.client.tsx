"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";
import { format, parseISO } from "date-fns";

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const noteId = id || params.id;

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(Number(noteId)),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  const label = note.updatedAt ? "Updated at: " : "Created at: ";
  const rawDate = note.updatedAt || note.createdAt;
  const formattedDate = rawDate
    ? format(parseISO(rawDate), "HH:mm, do 'of' MMMM yyyy")
    : "Date not available";

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <button onClick={() => router.back()} className={css.editBtn}>
              Close
            </button>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {label}
            {formattedDate}
          </p>
        </div>
      </div>
    </Modal>
  );
}
