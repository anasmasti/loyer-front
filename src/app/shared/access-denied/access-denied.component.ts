import { AuthService } from 'src/app/services/auth-service/auth.service';
import { MainModalService } from './../../services/main-modal/main-modal.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss'],
})
export class AccessDeniedComponent implements OnInit, AfterViewInit {
  role!: string;

  constructor(
    private actRoute: ActivatedRoute,
    private mainModalService: MainModalService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.role = this.actRoute.snapshot.paramMap.get('role') || '';
  }

  ngAfterViewInit(): void {
    this.mainModalService.open();
  }

  logout() {
    this.authService.logOut();
  }

  backToHome() {
    this.router.navigate(['']);
  }
}
