import { Component, OnInit } from '@angular/core';
import { Note } from '../shared/note';
import { RestApiService } from '../shared/rest-api.service';
import {MatDialog} from '@angular/material/dialog';
import { CreateUpdateNoteComponent } from '../create-update-note/create-update-note.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  notes:Note[]=[];
  archived:boolean=false;
  constructor(private api:RestApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getNotes();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateUpdateNoteComponent,{width: '80%', height:'70%'});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getNotes();
    });
  }

  openDialogEdit(note:Note){
    console.log(note);
    const dialogRef = this.dialog.open(CreateUpdateNoteComponent,{width: '80%', height:'70%',data:{
      id:note.id,
      title:note.title,
      content:note.content
    }});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getNotes();
    });
  }

  showhidearchived():void{
    if(this.archived){
      this.archived=false;
      this.getNotes();
    } else {
      this.archived=true;
      this.getNotes();
    }
  }

  getNotes(): void{
    this.notes=[];
    let condition='';
    if(this.archived){
      condition='T';
    } else {
      condition='F';
    }
    this.api.getNotes().subscribe((notesData:any)=>{
      console.log(notesData);
      for(let note of notesData){
        let tempNote:Note={
          id: note.id,
          title: note.title,
          content: note.content,
          archived: note.archived
        };
        if(tempNote.archived==condition)
          this.notes.push(tempNote);
      }
    });
  }

  

  deleteNote(id:number):void{
    if (window.confirm('Are you sure, you want to delete?')) {
      this.api.deleteNote(id).subscribe((data)=>{
        this.getNotes();
      })
    }
  }

  archiveNote(note:Note):void{
    if(window.confirm('Are you sure, you want to archive/unarchive?')){
      if(note.archived=='T'){
        note.archived='F';
      } else {
        note.archived='T';
      }
      console.log(note);
      this.api.updateNote(note).subscribe((data: {}) => {
        this.getNotes();
      });
    }
  }

}
