import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { User } from '../../models/user';

@Directive({
  selector: '[appCardClick]',
  standalone: true
})
export class CardClickDirective {
  private toggle: boolean = false;
  private static activeCardId: string | null = null; 

  @Input() cardId: string = ''; 
  @Output() cardIdOutput = new EventEmitter<string>(); 

  @HostBinding('style.border') get borderStyle(): string {
    return this.toggle ? '2px solid var(--bc-red, #e63946)' : '';
  }

  @HostListener('click') onClick() {
    if (this.toggle) {
      this.toggle = false;
      CardClickDirective.activeCardId = null;
    } else {
      if (CardClickDirective.activeCardId) {
        const previousCard = document.getElementById(CardClickDirective.activeCardId);
        if (previousCard) {
          previousCard.click();
        }
      }

      this.toggle = true;
      CardClickDirective.activeCardId = this.cardId; 
      this.cardIdOutput.emit(this.cardId);
    }
  }
}
