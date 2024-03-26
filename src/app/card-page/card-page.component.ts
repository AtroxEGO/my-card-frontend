import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-page',
  standalone: true,
  imports: [],
  templateUrl: './card-page.component.html',
})
export class CardPageComponent {
  user: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    const slugParts = slug.split('-');
    this.user = slugParts[slugParts.length - 1];
    console.log(slug);
  }
}
