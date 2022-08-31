package com.notes.demo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {
    @Autowired
    private NoteRepository repository;

    public Note saveNote(Note note) {
        return repository.save(note);
    }

    public List<Note> saveNotes(List<Note> notes) {
        return repository.saveAll(notes);
    }

    public List<Note> getNotes() {
        return repository.findAll();
    }

    public Note getNoteById(int id) {
        return repository.findById(id);
    }

    public String deleteNote(int id) {
        repository.deleteById(id);
        return "note removed !! " + id;
    }

    public Note updateNote(Note note) {
        Note existingNote = repository.findById(note.getId());
        existingNote.setTitle(note.getTitle());
        existingNote.setContent(note.getContent());
        existingNote.setArchived(note.getArchived());
        return repository.save(existingNote);
    }
}
