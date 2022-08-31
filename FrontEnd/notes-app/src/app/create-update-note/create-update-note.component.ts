import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Note } from '../shared/note';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-create-update-note',
  templateUrl: './create-update-note.component.html',
  styleUrls: ['./create-update-note.component.css']
})
export class CreateUpdateNoteComponent implements OnInit {
  note:Note={
    id: 0,
    title: '',
    content: '',
    archived: 'F'
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private api:RestApiService, public dialogRef: MatDialogRef<CreateUpdateNoteComponent>) {
    
  }
  
  ngOnInit(): void {
    console.log(this.data);
    if(this.data != undefined){
      this.note.id=this.data.id;
      this.note.title=this.data.title;
      this.note.content=this.data.content;
      console.log(this.note);
    }
  }

  save():void{
    if(this.note.id!=0){
      this.updateNote();
    } else {
      this.createNote();
    }
  }

  updateNote():void{
    this.api.updateNote(this.note).subscribe((data: {}) => {
      this.dialogRef.close();
    });
  }

  createNote():void{
    this.api.createNote(this.note).subscribe((data: {}) => {
      this.dialogRef.close();
    });
  }

}
