import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomInputComponent } from '../../../../shared/components/forms/custom-input/custom-input.component';
import { CardService } from '../../../../shared/services/card.service';

type Social = {
  socialName: string;
  value: string;
};

@Component({
  selector: 'app-card-edit-social',
  standalone: true,
  imports: [CommonModule, CustomInputComponent],
  templateUrl: './card-edit-social.component.html',
})
export class CardEditSocialComponent {
  constructor(
    private fb: FormBuilder,
    private cardService: CardService,
  ) {}
  allowedSocials = [
    'facebook',
    'youtube',
    'linkedin',
    'instagram',
    'email',
    'website',
    'phone',
  ];

  @Input() control!: FormArray;

  getAllowedSocials() {
    const takenSocials: string[] =
      this.control.value?.map((social: Social) => social.socialName) || [];

    const allowedSocials = this.allowedSocials.filter(
      (social) => !takenSocials.includes(social),
    );
    return allowedSocials;
  }

  handleCreateSocial(value: string) {
    const control = this.fb.group({
      socialName: [value, Validators.required],
      value: ['', this.cardService.getListOfSocialValidators(value)],
    });

    this.control.push(control);
  }

  handleDeleteSocial(value: any) {
    const array = this.control.value as Array<Social>;
    const index = array.findIndex((social) => social.socialName === value);

    this.control.removeAt(index);
  }

  getValueControl(name: string) {
    const socialControl = this.control.controls.find(
      (control) => control.value.socialName === name,
    ) as FormGroup;

    const valueControl = socialControl.controls['value'] as FormControl;

    return valueControl;
  }

  getPlaceholderText(socialName: string) {
    switch (socialName) {
      case 'email':
        return 'Email Address';
      case 'phone':
        return 'Phone Number';
      default:
        return `${socialName.charAt(0).toUpperCase()}${socialName.slice(1)} Link`;
    }
  }
}
