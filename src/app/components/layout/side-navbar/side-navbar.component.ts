import { Component, OnInit } from '@angular/core';
import { HelperService } from '@services/helpers/helper.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss'],
})
export class SideNavbarComponent implements OnInit {
  isAdmin!: boolean;
  isCmptbl!: boolean;

  dateNextCloture!: any;
  monthName!: string;

  constructor(public authService: AuthService, private help: HelperService) {}

  ngOnInit(): void {
    this.showAndHideMobileSideBarMenu(); // Launch toggeling side menu for mobile
    this.isAdmin = this.authService.checkUserRole('Admin');
    this.isCmptbl = this.authService.checkUserRole('DC');
    this.getNextClotureDate();
  }

  // Toggel sub menu
  showSubMenu(targetId: string) {
    if (targetId == 'lieux') $('.sub-menu#lieux').toggleClass('active'); // Check if the sub menu is lieux
    if (targetId == 'entite') $('.sub-menu#entite').toggleClass('active'); // Check if the sub menu is entités organisationnelles
    return false;
  }

  // Toggel side menu for mobile
  showAndHideMobileSideBarMenu() {
    $('#sidebar-collapse-mobile').on('click', function () {
      $('#sidebar, #content').toggleClass('active');
    });
  }

  getNextClotureDate() {
    this.help.getNextClotureDate().subscribe((data) => {
      this.dateNextCloture = data;

      let months: any = this.help.getMounths();
      months.forEach((month: any) => {
        if (month.number == this.dateNextCloture.mois) {
          this.monthName = month.name;
        }
      });
    });
  }
}
