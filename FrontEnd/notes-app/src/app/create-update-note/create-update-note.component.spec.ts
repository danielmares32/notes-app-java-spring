import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateNoteComponent } from './create-update-note.component';

describe('CreateUpdateNoteComponent', () => {
  let component: CreateUpdateNoteComponent;
  let fixture: ComponentFixture<CreateUpdateNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
