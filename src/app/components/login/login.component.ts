import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';  // Variable para capturar el nombre de usuario
  password: string = '';  // Variable para capturar la contraseña
  errorMessage: string = '';  // Mensaje de error en caso de fallo

  constructor(
    private hotelService: HotelService,
    private router: Router) { }

  ngOnInit(): void {
  }

  // Método que se llama cuando el usuario hace clic en "Login"
  login(): void {
    const credentials = { username: this.username, password: this.password };

    this.hotelService.login(credentials).subscribe(
      (response: any) => {
        // Verificar si el token está presente en la respuesta
        if (response.token) {
          const token = response.token;
          localStorage.setItem('token', token);  // Guardar el token JWT

          // Redirigir a la página de habitaciones o donde corresponda
          this.router.navigate(['/rooms']);
        } else {
          console.error('Token no encontrado en la respuesta');
        }
      },
      (error) => {
        console.error('Error en el login:', error);
        this.errorMessage = 'Credenciales incorrectas. Intenta nuevamente.';
      }
    );
  }
}
