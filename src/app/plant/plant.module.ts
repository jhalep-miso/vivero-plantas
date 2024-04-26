import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantComponent } from './plant.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PlantComponent],
  exports: [PlantComponent],
})
export class PlantModule {}
