import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-file-input',
  standalone: true,
  imports: [],
  templateUrl: './custom-file-input.component.html',
})
export class CustomFileInputComponent {
  @Input() withPreview: Boolean = true;
  fileURL: string = '';

  readURL(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.item(0)) {
      const file = target.files.item(0)!;

      const reader = new FileReader();
      reader.onload = (e) => (this.fileURL = reader.result as string);

      reader.readAsDataURL(file);
    }
  }
}
