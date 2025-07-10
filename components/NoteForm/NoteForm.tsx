//noteForm.tsx
"use client";

import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import { useId } from "react";
import css from "./NoteForm.module.css";
import type { NewNote } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { FormSchema } from "@/YupSchemes/FormSchema";
import { useNoteStore } from "@/lib/store/noteStore";
import { useRouter } from "next/navigation";
interface NoteFormProps {
  onClose?: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const fieldId = useId();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const addNote = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allNotes"] });
      clearDraft();
      onClose?.();
      router.back();
    },
  });

  function handleSubmit(values: NewNote, actions: FormikHelpers<NewNote>) {
    addNote.mutate(values);
    actions.resetForm();
  }

  return (
    <Formik
      initialValues={draft}
      onSubmit={handleSubmit}
      validationSchema={FormSchema}
      enableReinitialize
    >
      {({ values, handleChange }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-title`}>Title</label>
            <Field
              id={`${fieldId}-title`}
              type="text"
              name="title"
              className={css.input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                setDraft({ ...values, title: e.target.value });
              }}
            />
            <ErrorMessage component="span" name="title" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-content`}>Content</label>
            <Field
              id={`${fieldId}-content`}
              name="content"
              as="textarea"
              rows={8}
              className={css.textarea}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                handleChange(e);
                setDraft({ ...values, content: e.target.value });
              }}
            />
            <ErrorMessage
              component="span"
              name="content"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-tag`}>Tag</label>
            <Field
              as="select"
              id={`${fieldId}-tag`}
              name="tag"
              className={css.select}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                handleChange(e);
                setDraft({ ...values, tag: e.target.value as NewNote["tag"] });
              }}
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage component="span" name="tag" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => {
                onClose?.();
                router.back();
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={addNote.isPending}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
