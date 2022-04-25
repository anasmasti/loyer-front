import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HelperService } from '@services/helpers/helper.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { AppState } from 'src/app/store/app.state';
import { getUserType } from 'src/app/store/shared/shared.selector';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss'],
})
export class SideNavbarComponent implements OnInit, AfterViewInit {
  isAdmin!: boolean;
  isDC!: boolean;
  isCDGSP!: boolean;
  isCSLA!: boolean;
  isDAJC!: boolean;

  dateNextCloture!: any;
  monthName!: string;
  role!: any;

  constructor(
    public authService: AuthService,
    private help: HelperService,
    private store: Store<AppState>,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.showAndHideMobileSideBarMenu(); // Launch toggeling side menu for mobile
    this.isAdmin = this.authService.checkUserRole('Admin');
    this.isDC = this.authService.checkUserRole('DC');
    this.isCDGSP = this.authService.checkUserRole('CDGSP');
    this.isCSLA = this.authService.checkUserRole('CSLA');
    this.isDAJC = this.authService.checkUserRole('DAJC');

    this.getNextClotureDate();
    this.getUserRole();
  }

  ngAfterViewInit(): void {
    this.putActiveLink(this.location.path().replace('/', '').split('/')[0]);
  }

  putActiveLink(pathName: string) {
    let targetLinks: string[] = ['lieux', 'foncier', 'proprietaire'];

    // Remove active from links active
    targetLinks.forEach((targetLink: string) => {
      let link = document.getElementById(`${targetLink}-link`);
      link?.classList.remove('router-link-active');
    });

    // Set active class to target link
    if (
      pathName === 'lieux' ||
      pathName === 'foncier' ||
      pathName === 'proprietaire'
    ) {
      let link = document.getElementById(`${pathName}-link`);
      link?.classList.add('router-link-active');
    }
  }

  // Toggel sub menu
  showSubMenu(targetId: string) {
    if (targetId == 'lieux') $('.sub-menu#lieux').toggleClass('active'); // Check if the sub menu is lieux
    if (targetId == 'entite') $('.sub-menu#entite').toggleClass('active'); // Check if the sub menu is entités organisationnelles
    if (targetId == 'proprietaire')
      $('.sub-menu#proprietaire').toggleClass('active'); // Check if the sub menu is proprietaire
    // Else return false
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

  getUserRole() {
    this.store.select(getUserType).subscribe((roles) => {
      this.checkRole(roles);
    });
  }

  checkRole(role: string[]) {
    role.forEach((item) => {
      switch (item) {
        case 'DC':
          this.isDC;
          break;
        case 'CDGSP':
          this.isCDGSP;
          break;
        case 'CSLA':
          this.isCSLA;
          break;
        case 'DAJC':
          this.isDAJC;
          break;

        default:
          break;
      }
    });
  }
}
