import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-custom-file-input',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './custom-file-input.component.html',
})
export class CustomFileInputComponent {
  @Input() withPreview: Boolean = true;
  @Input({ required: true }) control: FormControl = new FormControl('');
  @Input() fileURL: string = '';

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement;

    if (!target.files || !target.files.item(0)) return;

    const file = target.files.item(0)!;

    this.readURL(file);

    this.control.patchValue(file);
  }

  readURL(file: File): void {
    {
      const reader = new FileReader();
      reader.onload = () => (this.fileURL = reader.result as string);

      reader.readAsDataURL(file);
    }
  }
}
