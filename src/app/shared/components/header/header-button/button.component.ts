import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

type HeaderButtonStyles = 'default' | 'primary' | 'logo';

@Component({
  selector: 'app-header-button',
  templateUrl: './button.component.html',
  standalone: true,
  imports: [RouterLink],
})
export class HeaderButtonComponent {
  constructor(private router: Router) {}

  @Input() customStyle: HeaderButtonStyles = 'default';
  @Input() link?: string;

  buttonStyles = {
    default:
      'hover:text-gray-400 active:text-gray-500 cursor-pointer select-none whitespace-nowrap',
    primary:
      'rounded-md bg-primary px-12 py-2 text-2xl text-white hover:bg-blue-800 active:bg-blue-600 cursor-pointer select-none whitespace-nowrap',
    logo: `flex select-none items-center justify-center gap-2 text-5xl font-thin hover:cursor-pointer whitespace-nowrap`,
  };

  navigateToLink() {
    if (this.link) {
      this.router.navigateByUrl(this.link);
    }
  }

  getStyles() {
    return this.buttonStyles[this.customStyle];
  }
}
