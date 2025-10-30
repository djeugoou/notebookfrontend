import { useState, useEffect } from "react"
import { NoteEditor } from "@/components/note-editor"
import { Button } from "@/components/ui/button"
import { PlusIcon, BookOpenIcon } from "lucide-react"

export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export default function NotebookApp() {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes")
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes))
    }
  }, [notes])

  const handleCreateNote = () => {
    setSelectedNote(null)
    setIsCreating(true)
    setIsEditing(false)
  }

  const handleSaveNote = (note: Omit<Note, "id" | "createdAt" | "updatedAt">) => {
    if (isCreating) {
      const newNote: Note = {
        ...note,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setNotes([newNote, ...notes])
      setSelectedNote(newNote)
      setIsCreating(false)
    } else if (selectedNote) {
      const updatedNote: Note = {
        ...selectedNote,
        ...note,
        updatedAt: new Date().toISOString(),
      }
      setNotes(notes.map((n) => (n.id === selectedNote.id ? updatedNote : n)))
      setSelectedNote(updatedNote)
      setIsEditing(false)
    }
  }

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id))
    if (selectedNote?.id === id) {
      setSelectedNote(null)
    }
  }

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note)
    setIsEditing(false)
    setIsCreating(false)
  }

  const handleEditNote = () => {
    setIsEditing(true)
    setIsCreating(false)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setIsCreating(false)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 mb-4">
            <BookOpenIcon className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-card-foreground">My Notebook</h1>
          </div>
          <Button onClick={handleCreateNote} className="w-full" size="sm">
            <PlusIcon className="h-4 w-4 mr-2" />
            New Note
          </Button>
        </div>
        {/* <NotebookList
          notes={notes}
          selectedNote={selectedNote}
          onSelectNote={handleSelectNote}
          onDeleteNote={handleDeleteNote}
        /> */}
      </div>

      {/* Main Content */}
      {/* <div className="flex-1 flex flex-col">
        {isEditing || isCreating ? (
          <NoteEditor note={selectedNote} onSave={handleSaveNote} onCancel={handleCancelEdit} isCreating={isCreating} />
        ) : selectedNote ? (
          <NoteView note={selectedNote} onEdit={handleEditNote} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <BookOpenIcon className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p className="text-lg">Select a note or create a new one</p>
            </div>
          </div>
        )}
      </div> */}
    </div>
  )
}
