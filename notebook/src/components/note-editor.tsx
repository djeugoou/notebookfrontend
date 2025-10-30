import { useState, useEffect } from "react"
import type { Note } from "@/App"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SaveIcon, XIcon } from "lucide-react"

interface NoteEditorProps {
  note: Note | null
  onSave: (note: { title: string; content: string }) => void
  onCancel: () => void
  isCreating: boolean
}

export function NoteEditor({ note, onSave, onCancel, isCreating }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || "")
  const [content, setContent] = useState(note?.content || "")

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
    } else {
      setTitle("")
      setContent("")
    }
  }, [note])

  const handleSave = () => {
    if (title.trim() || content.trim()) {
      onSave({ title: title.trim(), content: content.trim() })
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-border p-4 flex items-center justify-between bg-card">
        <h2 className="text-lg font-semibold text-card-foreground">{isCreating ? "New Note" : "Edit Note"}</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onCancel}>
            <XIcon className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave}>
            <SaveIcon className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-4">
          <Input
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-semibold border-0 px-0 focus-visible:ring-0 bg-transparent"
          />
          <Textarea
            placeholder="Start writing your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[500px] resize-none border-0 px-0 focus-visible:ring-0 text-base leading-relaxed bg-transparent"
          />
        </div>
      </div>
    </div>
  )
}
