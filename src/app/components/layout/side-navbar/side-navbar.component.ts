import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent implements OnInit {

  isAdmin!: boolean 

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.showAndHideMobileSideBarMenu() // Launch toggeling side menu for mobile
    this.isAdmin = this.authService.checkUserRole('Admin');

  }

  // Toggel sub menu
  showSubMenu(targetId: string) {
    if (targetId == 'proprietaire') $('.sub-menu#proprietaire').toggleClass('active'); // Check if the sub menu is proprietaire
    if (targetId == 'lieux') $('.sub-menu#lieux').toggleClass('active'); // Check if the sub menu is lieux
    if (targetId == 'contrat') $('.sub-menu#contrat').toggleClass('active'); // Check if the sub menu is contrat
    if (targetId == 'foncier') $('.sub-menu#foncier').toggleClass('active'); // Check if the sub menu is foncier
    if (targetId == 'versement') $('.sub-menu#versement').toggleClass('active'); // Check if the sub menu is versement
    return false
  }
  displayMe(){
    alert('in') ;
  }
  // Toggel side menu for mobile
  showAndHideMobileSideBarMenu() {
    $('#sidebar-collapse-mobile').on('click', function () {
      $('#sidebar, #content').toggleClass('active');
    });
  }

}
