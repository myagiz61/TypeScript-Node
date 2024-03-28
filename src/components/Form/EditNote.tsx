import { NoteData, Tag } from '../../types';
import { useNote } from '../NoteDetail/Layout';
import NoteForm from './NoteForm';

type EditProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const EditNote = ({
  onSubmit,
  onAddTag,
  availableTags,
}: EditProps) => {
  const note = useNote();
  return (
    <div>
      <h1>Not'u düzenle</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </div>
  );
};

export default EditNote;
