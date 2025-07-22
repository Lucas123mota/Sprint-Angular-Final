import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Veiculo, VeiculoData, VeiculosAPI } from '../../models/veiculo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ]
})
export class DashboardComponent implements OnInit {
  vehicles: Veiculo[] = [];
  selectedVehicle: Veiculo & Partial<VeiculoData> = {} as Veiculo & Partial<VeiculoData>;
  vinDigitado: string = '';
  selectCarForms!: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.selectCarForms = this.fb.group({
      carId: ['']
    });

    this.carregarVeiculos();

    this.selectCarForms.get('carId')?.valueChanges.subscribe((idSelecionado) => {
      const veiculo = this.vehicles.find(v => v.id === +idSelecionado);
      if (veiculo) {
        this.selectedVehicle = {
          ...veiculo,
          id: Number(veiculo.id)
        };
      }
    });
  }

  carregarVeiculos(): void {
    this.http.get<VeiculosAPI>('http://localhost:3001/vehicles')
      .subscribe({
        next: (res) => {
          console.log('Veículos recebidos:', res); 
          this.vehicles = res.vehicles;

          if (this.vehicles.length > 0) {
            this.selectedVehicle = {
              ...this.vehicles[0],
              id: Number(this.vehicles[0].id)
            };
            this.selectCarForms.patchValue({ carId: this.vehicles[0].id });
          }
        },
        error: (err) => {
          console.error('Erro ao carregar veículos:', err);
          alert('Erro ao carregar veículos!');
        }
      });
  }

  buscarVeiculoPorVIN(): void {
    const vin = this.vinDigitado.trim();
    if (!vin) return;

    this.http.post<VeiculoData>('http://localhost:3001/vehicleData', { vin })
      .subscribe({
        next: (data) => {
          Object.assign(this.selectedVehicle, data);
        },
        error: (err) => {
          console.error('Erro ao buscar VIN:', err);
          alert('Código VIN não encontrado!');
        }
      });
  }

  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    const overlay = document.querySelector('.sidebar-overlay') as HTMLElement;
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  }

  closeSidebar() {
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    const overlay = document.querySelector('.sidebar-overlay') as HTMLElement;
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  }



  get backgroundStyle() {
  return {
    'background-image': this.selectedVehicle?.img
      ? `url(${this.selectedVehicle.img})`
      : 'none',
    'background-size': 'cover',
    'background-position': 'center',
    'transition': 'background-image 0.3s ease-in-out'
  };
}


}
