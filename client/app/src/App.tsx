import { useState, useEffect } from "react";
import { Button, Modal, Textarea, Card } from "flowbite-react";

interface Note {
  id: number;
  noteContent: string;
}

const API_URL = "http://127.0.0.1:8000/api/notes/";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setContent("");
    setCurrentNote(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentNote(null);
  };

  const handleSave = async () => {
    if (!content.trim()) return;

    try {
      if (currentNote) {
        // Update existing note
        const response = await fetch(`${API_URL}${currentNote.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ noteContent: content }),
        });

        if (response.ok) {
          fetchNotes();
        }
      } else {
        // Create new note
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ noteContent: content }),
        });

        if (response.ok) {
          fetchNotes();
        }
      }
      handleClose();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleEdit = (note: Note) => {
    setCurrentNote(note);
    setContent(note.noteContent);
    setIsOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchNotes();
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-50">Notes Gallery by Kayne Rodrigo - BSCS 4-1</h1>
        <Button onClick={handleOpen}>Add New Note</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <Card key={note.id} className="flex h-[250px] flex-col justify-between">
            <div className="flex-1 overflow-auto">
              <p className="line-clamp-4 text-gray-700">{note.noteContent}</p>
            </div>
            <div className="mt-2 flex justify-end gap-2 border-t pt-4">
              <Button size="sm" onClick={() => handleEdit(note)}>
                Edit
              </Button>
              <Button
                size="sm"
                color="failure"
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {notes.length === 0 && (
        <div className="mt-8 text-center text-gray-500">
          <p>No notes yet. Add your first note!</p>
        </div>
      )}

      <Modal show={isOpen} onClose={handleClose} size="md">
        <Modal.Header>
          {currentNote ? "Edit Note" : "Add New Note"}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Content
              </label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add your note content..."
                rows={4}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSave} disabled={!content.trim()}>
            {currentNote ? "Update" : "Save"}
          </Button>
          <Button color="gray" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;