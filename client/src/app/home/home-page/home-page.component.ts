import { Component, Input, OnInit, inject, input } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../_services/user.service';
import { SubmissionsService } from '../../_services/submissions.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/api';
import { CardTemplateComponent } from "../../cards/card-template/card-template.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  providers: [MessageService],
  imports: [CardTemplateComponent, CommonModule, ToastModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  userList: User[] = [];
  private userService = inject(UserService);
  private submissionService = inject(SubmissionsService);
  selectedUsername: string = ""
  ngOnInit(): void {
    this.loadUsers();
  }

  constructor(private messageService: MessageService) {}

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.userList = users;
      }
    });
  }

  getClickedUsername(username: string) {
    this.selectedUsername = username;
  }

  submitSelectedCard() {
    if (this.selectedUsername) {
      this.submissionService.submitShiningStar(this.selectedUsername).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `You've chosen ${this.selectedUsername} as your Shining Star!`, life: 3000})
        },
        error: error => console.log(error)
    });
    } 
}

}
