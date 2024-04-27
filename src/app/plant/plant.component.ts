import { Component, OnInit } from '@angular/core';
import { PlantService } from './plant.service';
import { Plant } from './plant';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.css'],
})
export class PlantComponent implements OnInit {
  plants: Plant[] = [];
  plantsInterior: number = 0;
  plantsExterior: number = 0;

  constructor(private plantService: PlantService) {}

  getPlants(): void {
    this.plantService.getPlants().subscribe((plants) => {
      this.plants = plants;
      this.plantsInterior = this.plants.filter(
        (plant) => plant.tipo === 'Interior'
      ).length;
      this.plantsExterior = this.plants.length - this.plantsInterior;
    });
  }

  ngOnInit() {
    this.getPlants();
  }
}
