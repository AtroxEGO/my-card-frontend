import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEditFormComponent } from './card-edit-form.component';

describe('CardEditFormComponent', () => {
  let component: CardEditFormComponent;
  let fixture: ComponentFixture<CardEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEditFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
