import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.showAndHideMobileSideBarMenu() // Launch toggeling side menu for mobile
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
