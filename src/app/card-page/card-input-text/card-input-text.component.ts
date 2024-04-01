import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card-input-text',
  standalone: true,
  imports: [],
  templateUrl: './card-input-text.component.html',
})
export class CardInputTextComponent {
  value: string = 'Full Name';
  editing: boolean = true;
  @ViewChild('input') input!: ElementRef;

  toggleEdit() {
    this.value = this.input.nativeElement.textContent.trim();
    if (this.editing) {
      if (this.value == '') {
        return;
      }
    }

    this.editing = !this.editing;
  }

  getStyles() {
    if (this.editing) {
      return 'border rounded-md px-2 outline-none';
    }
    return '';
  }
}
