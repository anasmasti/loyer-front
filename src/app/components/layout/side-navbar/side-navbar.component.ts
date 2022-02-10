import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent implements OnInit {

  isAdmin!: boolean 
  isCmptbl!: boolean

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.showAndHideMobileSideBarMenu() // Launch toggeling side menu for mobile
    this.isAdmin = this.authService.checkUserRole('Admin');
    this.isCmptbl = this.authService.checkUserRole('DC')
  }

  // Toggel sub menu
  showSubMenu(targetId: string) {
    if (targetId == 'lieux') $('.sub-menu#lieux').toggleClass('active'); // Check if the sub menu is lieux
    if (targetId == 'entite') $('.sub-menu#entite').toggleClass('active'); // Check if the sub menu is entités organisationnelles
    return false
  }

  // Toggel side menu for mobile
  showAndHideMobileSideBarMenu() {
    $('#sidebar-collapse-mobile').on('click', function () {
      $('#sidebar, #content').toggleClass('active');
    });
  }

}
