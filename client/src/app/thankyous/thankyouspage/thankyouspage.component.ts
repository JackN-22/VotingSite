import { Component, inject, Input } from '@angular/core';
import { SubmissionsService } from '../../_services/submissions.service';
import { Toast, ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ThankYous } from '../../models/thankyous';

@Component({
  selector: 'app-thankyouspage',
  standalone: true,
  imports: [FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './thankyouspage.component.html',
  styleUrl: './thankyouspage.component.css'
})
export class ThankyouspageComponent {

  constructor(private messageService: MessageService) {}

  submissionService = inject(SubmissionsService)
  @Input() thankyou: ThankYous = {voter: "", nominee: "", reason: "" }

  submitThankYou() {
    return this.submissionService.submitThankYous(this.thankyou).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Thank You Submitted!', life: 3000})
      }, 
      error: error => console.log(error)
    })
  }
}
