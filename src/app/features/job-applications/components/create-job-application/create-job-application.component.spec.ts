import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJobApplicationComponent } from './create-job-application.component';

describe('CreateJobApplicationComponent', () => {
  let component: CreateJobApplicationComponent;
  let fixture: ComponentFixture<CreateJobApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateJobApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateJobApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
