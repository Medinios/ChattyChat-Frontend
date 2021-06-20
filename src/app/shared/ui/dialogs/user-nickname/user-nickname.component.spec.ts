import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNicknameComponent } from './user-nickname.component';

describe('UserNicknameComponent', () => {
  let component: UserNicknameComponent;
  let fixture: ComponentFixture<UserNicknameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNicknameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNicknameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
