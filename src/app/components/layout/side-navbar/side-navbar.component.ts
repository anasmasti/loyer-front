import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.showAndHideMobileSideBarMenu()
  }

  showSubMenu(targetId: string) {
    if (targetId == 'proprietaire') $('.sub-menu#proprietaire').toggleClass('active');
    if (targetId == 'contrat') $('.sub-menu#contrat').toggleClass('active');
    if (targetId == 'fournisseur') $('.sub-menu#fournisseur').toggleClass('active');
    return false
  }

  showAndHideMobileSideBarMenu() {
    $(function () {
      // Toggel side menu
      $('#sidebar-collapse-mobile').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
      });
    });
  }

}
