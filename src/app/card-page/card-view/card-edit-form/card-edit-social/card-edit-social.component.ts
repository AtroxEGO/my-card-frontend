import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../../../shared/services/card.service';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomInputComponent } from '../../../../shared/components/forms/custom-input/custom-input.component';
import { urlValidator } from '../../../../shared/validators/url.directive';

type Social = {
  socialName: string;
  value: string;
};

type Socials = Social[];

@Component({
  selector: 'app-card-edit-social',
  standalone: true,
  imports: [CommonModule, CustomInputComponent],
  templateUrl: './card-edit-social.component.html',
})
export class CardEditSocialComponent {
  constructor(private fb: FormBuilder) {}
  allowedSocials = [
    'facebook',
    'youtube',
    'linkedin',
    'instagram',
    'email',
    'website',
  ];

  @Input() socials!: Socials;
  @Input() control!: FormArray;

  // ngOnInit() {
  //   this.socials = this.card.socials || [
  //     { socialName: 'facebook', value: 'test' },
  //   ];
  // }

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
      value: ['', this.getListOfValidators(value)],
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
    let placeholderText = `${socialName.charAt(0).toUpperCase()}${socialName.slice(1)} link`;

    return placeholderText;
  }

  getListOfValidators(socialName: string) {
    const validators = [];
    validators.push(Validators.required);

    if (socialName === 'email') {
      validators.push(Validators.email);
    }

    if (socialName !== 'email') {
      validators.push(urlValidator());
    }

    return validators;
  }
}
