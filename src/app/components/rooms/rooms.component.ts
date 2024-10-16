import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  checkInDate: Date;
  checkOutDate: Date;
  rooms: any[] = [];  // Almacena todas las habitaciones
  availableRooms: any[] = [];  // Filtrará según disponibilidad

  constructor(
    private hotelService: HotelService,
    private router: Router) { }

  ngOnInit(): void {
    console.log("Rooms component loaded");
    this.getAllRooms();  // Llamamos al método para obtener todas las habitaciones
  }

  // Obtener todas las habitaciones del hotel
  getAllRooms() {
    this.hotelService.getRooms().subscribe(
      (response) => {
        if (response.status) {  // Verifica que el estado es true
          this.rooms = response.response;  // Accede a las habitaciones en el campo 'response'
          this.availableRooms = this.rooms;  // Mostrar todas las habitaciones inicialmente
        } else {
          console.error('Error al obtener habitaciones:', response.detail);
        }
      },
      (error) => {
        console.error('Error al obtener habitaciones:', error);
      }
    );
  }

  // Filtrar habitaciones por disponibilidad
  checkAvailability() {
    if (this.checkInDate && this.checkOutDate) {
      this.hotelService.checkRoomAvailability(this.checkInDate, this.checkOutDate).subscribe(
        (response) => {
          if (response.status) {  // Verifica si el status es true (éxito)
            this.availableRooms = response.data;  // Actualiza solo las habitaciones disponibles
          } else {
            console.error('No hay habitaciones disponibles:', response.detail);
          }
        },
        (error) => {
          console.error('Error al consultar disponibilidad:', error);
        }
      );
    }
  }

  // Acciones al reservar
  onReserve(roomId: number) {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/reserve', roomId]);
    }
  }
}
