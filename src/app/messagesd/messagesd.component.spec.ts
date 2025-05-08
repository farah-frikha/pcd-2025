import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesdComponent } from './messagesd.component';

describe('MessagesdComponent', () => {
  let component: MessagesdComponent;
  let fixture: ComponentFixture<MessagesdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessagesdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
