import { CommonModule } from '@angular/common';
import { Component, inject, input, Input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { UserService } from '../../_services/user.service';
import { User } from '../../models/user';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ThankYous } from '../../models/thankyous';

@Component({
  selector: 'app-adminpage',
  standalone: true,
  imports: [RouterLink,TableModule, TagModule, RatingModule, ButtonModule, CommonModule, CardModule],
  templateUrl: './adminpage.component.html',
  styleUrl: './adminpage.component.css'
})
export class AdminpageComponent implements OnInit{

  userService = inject(UserService);
  shiningStar: User[] = [];
  thankYous: ThankYous[] = [];
  
  ngOnInit(): void {
    this.loadShiningStars()
    this.loadThankYouData()
  }

  loadShiningStars() {
    this.userService.getUsers().subscribe({
      next: (users) => { 
        this.shiningStar = users;
        this.shiningStar.sort((a,b) => b.stVoteCount - a.stVoteCount)
      }
    });
  }

  loadThankYouData() {
    this.userService.getThankYouData().subscribe({
      next: (thankyous) => {
        this.thankYous = thankyous;
        console.log(thankyous);
      }
    })
  }

  trackByUserId(user: User) {
    return user.id
  }


}
