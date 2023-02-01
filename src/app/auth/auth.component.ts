import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  email!: string;
  password!: string;

  constructor(private authService: AuthService , public router: Router) {
   
  }

  login() {
    const userAuth = {email: this.email, password: this.password}
    this.authService.login(userAuth).subscribe({
      next: (data: any) => {
        console.log(data.user.id)
        this.authService.setToken(data.user.id)
        //this.authService.setToken(data.accessToken);
        //this.router.navigateByUrl('/products');
      },
      error: (error) => {
         console.log(error.error)
      }
    })
    
    
  }
}
