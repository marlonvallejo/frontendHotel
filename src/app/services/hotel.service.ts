import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, timeout } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private apiUrl = 'http://localhost:8080'; // URL del backend de Spring Boot

  constructor(private http: HttpClient) { }

  // Ejemplo de método para obtener todas las habitaciones
  getRooms(): Observable<any> {
    return this.http.get(`${this.apiUrl}/andino/room/v1/get/all`);
  }
  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/andino/user/v1/login`, credentials).pipe(
      map((response: any) => {
        // Aquí suponemos que el token está en el campo 'token'
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
        return response;
      })
    );
  }

  // Ejemplo de método para obtener la disponibilidad de una habitación
  /*checkRoomAvailability(roomId: number, checkIn: string, checkOut: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/andino/room/v1/${roomId}/availability?checkInDate=${checkIn}&checkOutDate=${checkOut}`);
  }*/

  // Verificar la disponibilidad de habitaciones para un rango de fechas
  checkRoomAvailability(checkInDate: Date, checkOutDate: Date): Observable<any> {
    const params = {
      checkInDate: checkInDate.toISOString().split('T')[0],  // Formato de fecha
      checkOutDate: checkOutDate.toISOString().split('T')[0]
    };
    return this.http.get(`${this.apiUrl}/rooms/available`, { params });
  }

  // Método para registrar un usuario
  register(userDto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/andino/user/v1/create`, userDto);
  }
}
