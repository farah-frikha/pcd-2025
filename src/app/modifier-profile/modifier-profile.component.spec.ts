import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifierProfileComponent } from './modifier-profile.component';

describe('ModifierProfileComponent', () => {
  let component: ModifierProfileComponent;
  let fixture: ComponentFixture<ModifierProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with required fields', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.querySelector('input[name="nom"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="specialite"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="email"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="telephone"]')).toBeTruthy();
  });
});
