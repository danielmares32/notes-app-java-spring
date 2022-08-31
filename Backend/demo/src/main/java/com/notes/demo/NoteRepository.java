package com.notes.demo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note,Integer> {
    Note findById(int id);
    //Note findByTitle(String title);
}