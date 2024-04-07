import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CardService } from '../../../services/card.service';

@Component({
  selector: 'app-custom-file-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './custom-file-input.component.html',
})
export class CustomFileInputComponent {
  constructor(private cardService: CardService) {}
  @Input() withPreview: Boolean = true;
  @Input({ required: true }) control: FormControl = new FormControl('');
  @Input() fileURL: string = '';

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement;

    if (!target.files || !target.files.item(0)) return;

    const file = target.files.item(0)!;

    this.readURL(file);

    // const formData = new FormData();
    // formData.append('avatarFile', file);
    // this.cardService.patchCard(formData).subscribe();
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
