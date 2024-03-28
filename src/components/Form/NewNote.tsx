import { NoteData, Tag } from '../../types';
import NoteForm from './NoteForm';

export type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  addTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

const NewNote = ({
  onSubmit,
  addTag,
  availableTags,
}: NewNoteProps) => {
  return (
    <>
      <h1 className="mb-4">Yeni Not Ekle</h1>
      <NoteForm
        onSubmit={onSubmit}
        addTag={addTag}
        availableTags={availableTags}
      />
    </>
  );
};

export default NewNote;
