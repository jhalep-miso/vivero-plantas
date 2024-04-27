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

  constructor(private plantService: PlantService) {}

  getPlants(): void {
    this.plantService.getPlants().subscribe((plants) => {
      this.plants = plants;
    });
  }

  ngOnInit() {
    this.getPlants();
  }
}
