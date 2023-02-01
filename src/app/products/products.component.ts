import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private authService: AuthService ){}
  ngOnInit() {
    this.getUserLogged();
   
  }
  getUserLogged() {
    console.log(this.authService.getUserLogged())
    this.authService.getUser().subscribe(user => {
      //console.log(user);
    });
  }
}
