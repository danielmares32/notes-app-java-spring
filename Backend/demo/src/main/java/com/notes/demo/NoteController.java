package com.notes.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NoteController {

    @Autowired
    private NoteService service;
    @CrossOrigin
    @PostMapping("/addNote")
    public Note addNote(@RequestBody Note note) {
        return service.saveNote(note);
    }
    @CrossOrigin
    @PostMapping("/addNotes")
    public List<Note> addNotes(@RequestBody List<Note> notes) {
        return service.saveNotes(notes);
    }
    @CrossOrigin
    @GetMapping("/notes")
    public List<Note> findAllNotes() {
        return service.getNotes();
    }
    @CrossOrigin
    @GetMapping("/noteById/{id}")
    public Note findNoteById(@PathVariable int id) {
        return service.getNoteById(id);
    }

    @CrossOrigin
    @PutMapping("/update")
    public Note updateNote(@RequestBody Note note) {
        return service.updateNote(note);
    }
    @CrossOrigin
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/delete/{id}")
    public String deleteNote(@PathVariable int id) {
        return service.deleteNote(id);
    }
}