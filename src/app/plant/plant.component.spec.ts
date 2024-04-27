import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantComponent } from './plant.component';
import { faker } from '@faker-js/faker';
import { Plant } from './plant';
import { HttpClientModule } from '@angular/common/http';
import { PlantService } from './plant.service';
import { By } from '@angular/platform-browser';

describe('PlantComponent', () => {
  let component: PlantComponent;
  let fixture: ComponentFixture<PlantComponent>;
  let debug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [PlantComponent],
      providers: [PlantService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantComponent);
    component = fixture.componentInstance;

    component.plants = ['Interior', 'Exterior', 'Interior'].map(
      (tipo) =>
        new Plant(
          faker.number.int({ min: 1, max: 100 }),
          faker.lorem.word(),
          tipo,
          faker.lorem.word(),
          faker.number.int({ min: 1, max: 100 }),
          faker.lorem.word(),
          faker.lorem.word()
        )
    );

    component.plantsInterior = 2;
    component.plantsExterior = 1;

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a table', () => {
    expect(debug.query(By.css('tbody')).childNodes.length).toBeGreaterThan(0);
  });

  it('should have a table with 3 rows', () => {
    expect(debug.queryAll(By.css('tbody tr')).length).toBe(3);
  });

  it('should have a table header with 4 columns', () => {
    expect(
      debug
        .queryAll(By.css('thead tr th'))
        .map((th) => th.nativeElement.textContent)
    ).toEqual(['#', 'Nombre común', 'Tipo', 'Clima']);
  });

  it('should have the plant id in the first column', () => {
    expect(
      debug
        .queryAll(By.css('tbody tr td:nth-child(1)'))
        .map((td) => td.nativeElement.textContent)
    ).toEqual(component.plants.map((plant) => plant.id.toString()));
  });

  it('should have the plant common name in the second column', () => {
    expect(
      debug
        .queryAll(By.css('tbody tr td:nth-child(2)'))
        .map((td) => td.nativeElement.textContent)
    ).toEqual(component.plants.map((plant) => plant.nombre_comun));
  });

  it('should have the plant type in the third column', () => {
    expect(
      debug
        .queryAll(By.css('tbody tr td:nth-child(3)'))
        .map((td) => td.nativeElement.textContent)
    ).toEqual(component.plants.map((plant) => plant.tipo));
  });

  it('should have the plant weather in the fourth column', () => {
    expect(
      debug
        .queryAll(By.css('tbody tr td:nth-child(4)'))
        .map((td) => td.nativeElement.textContent)
    ).toEqual(component.plants.map((plant) => plant.clima));
  });

  it('should have the total interior plants count', () => {
    expect(
      debug.query(By.css('#interior_total')).nativeElement.textContent
    ).toContain(component.plantsInterior.toString());
  });

  it('should have the total exterior plants count', () => {
    expect(
      debug.query(By.css('#exterior_total')).nativeElement.textContent
    ).toContain(component.plantsExterior.toString());
  });

  it('should have a footer with contact information', () => {
    expect(debug.query(By.css('.footer')).nativeElement.textContent).toContain(
      'Contact us'
    );
  });
});
