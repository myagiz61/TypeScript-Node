import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import ReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../../types";
import { NewNoteProps } from "./NewNote";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

const NoteForm = ({
  onSubmit,
  addTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NewNoteProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });

    // kullanıcın geldiği sayfaya geri gönderiri
    // geçmişte 1 adım geri gider
    navigate(-1);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Başlık</Form.Label>
              <Form.Control
                ref={titleRef}
                required
                className="shadow"
                defaultValue={title}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Etiketler</Form.Label>
              <ReactSelect
                //sahip olucağı etiketler
                value={selectedTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                // onchange
                onChange={(tags) =>
                  setSelectedTags(
                    tags.map((tag) => ({
                      label: tag.label,
                      id: tag.value,
                    }))
                  )
                }
                // yebni etiket oluşturuldupunda
                onCreateOption={(label) => {
                  const newTag: Tag = { id: v4(), label };
                  addTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                // daha önceden eklenen etiketleri liste
                options={availableTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                isMulti
                className="shadow"
              />
            </Form.Group>
          </Col>
        </Row>
        {/* text içeriği */}
        <Form.Group controlId="markdown">
          <Form.Label>İçeirk</Form.Label>
          <Form.Control
            defaultValue={markdown}
            ref={markdownRef}
            as={"textarea"}
            rows={15}
            required
            className="shadow"
          />
        </Form.Group>
        {/* butonlar */}
        <Stack
          direction="horizontal"
          gap={2}
          className="justify-content-end"
        >
          <Button type="submit">Kaydet</Button>

          <Button
            onClick={() => navigate(-1)}
            type="button"
            variant="secondary"
          >
            İptal
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;
