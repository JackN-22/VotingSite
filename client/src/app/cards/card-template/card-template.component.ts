import { Component, input } from '@angular/core';
import { User } from '../../models/user';
import { CardClickDirective } from './card-click.directive';

@Component({
  selector: 'app-card-template',
  standalone: true,
  imports: [CardClickDirective],
  templateUrl: './card-template.component.html',
  styleUrl: './card-template.component.css'
})
export class CardTemplateComponent {
  users = input.required<User>();
  

}
