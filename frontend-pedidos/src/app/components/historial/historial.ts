import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialService } from '../../services/historial';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule], // Necesario para hacer el ciclo (loop) en el HTML
  templateUrl: './historial.html'
})
export class Historial implements OnInit {
  // Aquí guardaremos los datos que lleguen de tu base de datos
  pedidos: any[] = [];

  constructor(private historialService: HistorialService) {}

  ngOnInit(): void {
    // Por ahora ponemos un token falso de prueba.
    // Después lo reemplazaremos por el JWT real de tu login.
    const tokenJwt = "AQUI_IRA_TU_TOKEN_REAL";

    this.historialService.obtenerHistorial(tokenJwt).subscribe({
      next: (datos) => {
        this.pedidos = datos;
        console.log("¡Datos de AWS recibidos!", datos);
      },
      error: (error) => {
        console.error("Falló la conexión al backend:", error);
      }
    });
  }
}
