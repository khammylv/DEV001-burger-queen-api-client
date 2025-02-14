import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  
  loginForm: FormGroup = new FormGroup({})
 
  
  constructor(private authService: AuthService, public router: Router,private formBuilder: FormBuilder ) {
    localStorage.clear();
    sessionStorage.clear();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  
  login() {
    
    //console.log(this.loginForm.value)
    if(this.loginForm.valid){
      const userAuth = this.loginForm.value
      this.authService.login(userAuth).subscribe({
      next: (data: any) => {
       
      
        if(data.user.rol === "mesero"){
          sessionStorage.setItem('role', data.user.rol);
          this.authService.setToken(data.user.id)
          //this.authService.setToken(data.accessToken);
          this.router.navigateByUrl('/products');
         } 
         if(data.user.rol === "admin"){
          this.authService.setToken(data.user.id)
          sessionStorage.setItem('role', data.user.rol);
          this.router.navigateByUrl('/admin');
         }
         if(data.user.rol === "cocinero"){
          this.authService.setToken(data.user.id)
          sessionStorage.setItem('role', data.user.rol);
          this.router.navigateByUrl('/cocina');
         }
        
      },
      error: (error) => {
        if(error.name == 'HttpErrorResponse'){
          Swal.fire({
            confirmButtonColor: '#FFC900',
            icon: 'error',
            title: 'Oops...',
            text: 'Algo ha salido mal. Revisa tu correo y/o contraseña!',
            //text: 'Something went wrong!',
          })
        }
        
      }
    })
     
    }else{
      sessionStorage.clear();
      this.authService.deleteToken()
     
      Swal.fire({
        confirmButtonColor: '#FFC900',
        icon: 'error',
        title: 'Oops...',
        text: 'Formulario inválido!',
        
      })
    }
    
   
  }

  //Todo codigo para demo (cambiar en html para que funcione con api)
 loginDemo(){
  let uS: any = [];
  if(this.loginForm.valid){
    const userAuth = this.loginForm.value
    //console.log(userAuth)
    this.authService.getAllUsers2().subscribe({
      next: (data: any) => {
        //console.log(data.users)
        const user = this.authService.filterUser(data.users, userAuth)
        //console.log(user)
        if (user) {
          console.log(user.length)
          if(user.length == 1){
            //console.log(user)
            user.forEach((use: any)=>{
              //console.log(use)
              uS = use
            })
           // console.log(uS.rol)
           if(uS.rol === "mesero"){
            sessionStorage.setItem('role', uS.rol);
            this.authService.setToken(uS.id)
            //this.authService.setToken(data.accessToken);
            this.router.navigateByUrl('/products');
           } 
           if(uS.rol === "admin"){
            this.authService.setToken(uS.id)
            sessionStorage.setItem('role', uS.rol);
            this.router.navigateByUrl('/admin');
           }
           if(uS.rol === "cocinero"){
            this.authService.setToken(uS.id)
            sessionStorage.setItem('role', uS.rol);
            this.router.navigateByUrl('/cocina');
           }
          }else{
            Swal.fire({
              confirmButtonColor: '#FFC900',
              icon: 'error',
              title: 'Oops...',
              text: 'Algo ha salido mal. Revisa tu correo y/o contraseña!',
              //text: 'Something went wrong!',
            })
          }
        }
      }
    })
  } else{
    sessionStorage.clear();
    this.authService.deleteToken()
  
    Swal.fire({
      confirmButtonColor: '#FFC900',
      icon: 'error',
      title: 'Oops...',
      text: 'Formulario inválido!',
      
    })
  }
 }
  togglePasswordMode(input: any): any{
    input.type = input.type === 'password' ? 'text' : 'password';
     //console.log(this.elemento.type)
  
  }
 
}

