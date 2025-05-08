import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientsComponent } from './patients.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('PatientsComponent', () => {
  let component: PatientsComponent;
  let fixture: ComponentFixture<PatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsComponent ],
      imports: [ ReactiveFormsModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter patients by name', () => {
    component.searchForm.setValue({ search: 'Sonia' });
    component.filteredPatients = component.filteredPatients.filter((patient: { name: string }) => patient.name.includes('Sonia'));
    expect(component.filteredPatients.length).toBe(1);
    expect(component.filteredPatients[0].name).toContain('Sonia');
  });
});
