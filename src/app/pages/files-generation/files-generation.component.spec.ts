import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesGenerationComponent } from './files-generation.component';

describe('FilesGenerationComponent', () => {
  let component: FilesGenerationComponent;
  let fixture: ComponentFixture<FilesGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesGenerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
