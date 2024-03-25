import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-page',
  standalone: true,
  imports: [],
  templateUrl: './card-page.component.html',
})
export class CardPageComponent {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    console.log(slug);
  }
}
