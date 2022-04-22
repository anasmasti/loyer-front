import { NgModule ,LOCALE_ID} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClotureComponent } from './cloture.component';
import { ConfirmationModalModule } from 'src/app/shared/modals/confirmation-modal/confirmation-modal.module';
import { PipesModule } from 'src/app/core/pipes/pipes.module';

import { registerLocaleData } from '@angular/common';

import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

@NgModule({
  declarations: [ClotureComponent],
  imports: [CommonModule, ConfirmationModalModule, PipesModule],
  exports: [ClotureComponent],
  providers: [ {provide: LOCALE_ID, useValue: "fr-FR" } ]
})
export class ClotureModule {}
