import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http'; // <-- Importamos HttpClient

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  title = 'Pedidos360';
  pedidos: any[] = []; // <-- Variable para guardar los datos del backend

  // Inyectamos también el HttpClient
  constructor(private authService: MsalService, private http: HttpClient) {}

  ngOnInit(): void {
    this.authService.handleRedirectObservable().subscribe();
  }

  isLoggedIn(): boolean {
    return this.authService.instance.getAllAccounts().length > 0;
  }

  login() {
    this.authService.loginRedirect();
  }

  logout() {
    this.authService.logoutRedirect();
  }

  // Función que llama a Spring Boot
  cargarPedidos() {
    // El interceptor de MSAL le pegará el JWT automáticamente a esta llamada
    this.http.get<any[]>('http://localhost:8080/api/pedidos').subscribe({
      next: (data) => {
        this.pedidos = data;
        console.log('Pedidos recibidos:', data);
      },
      error: (err) => {
        console.error('Error al llamar al backend:', err);
        alert('Error al conectar con el backend. ¿Está corriendo Spring Boot?');
      }
    });
  }
}