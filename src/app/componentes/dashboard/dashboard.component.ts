import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Veiculo, VeiculoData } from '../../models/veiculo.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { catchError, of } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  vehicles: Veiculo[] = [];
  selectedVehicle!: Veiculo;
  vehicleData!: VeiculoData;
  errorMessage?: string;

  selectCarForms = new FormGroup({
    carId: new FormControl(''),
  });


  
  @ViewChild('sidebar') sidebar!: ElementRef<HTMLDivElement>;
  @ViewChild('sidebarOverlay') overlay!: ElementRef<HTMLDivElement>;

  constructor(private dashboardService: DashboardService) {}
  ngOnInit(): void {
    this.dashboardService.getVehicles().subscribe((res) => {
      this.vehicles = res.vehicles;
      const firstId = this.vehicles[0]?.id;
      this.selectCarForms.controls.carId.setValue(firstId.toString());
      this.selectedVehicle = this.vehicles[0];
    });

    this.selectCarForms.controls.carId.valueChanges.subscribe((id) => {
      this.selectedVehicle = this.vehicles[Number(id) - 1];
      console.log(this.selectedVehicle);
    });
  }


  toggleSidebar(): void {
    const sidebarEl = this.sidebar.nativeElement;
    const overlayEl = this.overlay.nativeElement;

    const isActive = sidebarEl.classList.toggle('active');
    overlayEl.style.display = isActive ? 'block' : 'none';

    document.body.classList.toggle('offcanvas-open', isActive);
  }

  closeSidebar(): void {
    this.sidebar.nativeElement.classList.remove('active');
    this.overlay.nativeElement.style.display = 'none';
    document.body.classList.remove('offcanvas-open');
  }
}
