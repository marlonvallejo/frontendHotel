import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string = '';
  lastname: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private hotelService: HotelService, private router: Router) { }

  ngOnInit(): void { }

  register(): void {
    // Creamos el objeto con los datos del usuario
    const userDto = {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      username: this.username,
      password: this.password
    };

    // Llamada al servicio para registrar el usuario
    this.hotelService.register(userDto).subscribe(
      response => {
        this.successMessage = 'Usuario registrado con éxito';
        this.router.navigate(['/login']); // Redirigir al login tras registro exitoso
      },
      error => {
        this.errorMessage = 'Error en el registro: ' + error.error.message;
      }
    );
  }
}
