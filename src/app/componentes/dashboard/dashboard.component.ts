import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Veiculo, VeiculoModel, VeiculoData } from '../models/VeiculoModel';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class DashboardComponent implements OnInit {
  vehicles: Veiculo[] = [];
  selectedVehicle: Veiculo & Partial<VeiculoData> = {} as any;
  vinDigitado: string = '';
  selectCarForms!: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.selectCarForms = this.fb.group({
      carId: ['']
    });

    this.carregarVeiculos();

    // Quando o usuário muda o select
    this.selectCarForms.get('carId')?.valueChanges.subscribe((idSelecionado) => {
      const veiculo = this.vehicles.find(v => v.id == idSelecionado);
      if (veiculo) {
        this.selectedVehicle = veiculo;
      }
    });
  }

  carregarVeiculos(): void {
    this.http.get<{ vehicles: VeiculoModel }>('http://localhost:3001/vehicles')
      .subscribe({
        next: (res) => {
          this.vehicles = res.vehicles;
          this.selectedVehicle = this.vehicles[0];
          this.selectCarForms.patchValue({ carId: this.vehicles[0].id });
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
          this.selectedVehicle = {
            ...this.selectedVehicle,
            ...data
          };
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
}
