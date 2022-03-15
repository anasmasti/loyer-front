import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClotureComponent } from './cloture.component';
import { ConfirmationModalModule } from 'src/app/shared/modals/confirmation-modal/confirmation-modal.module';
import { PipesModule } from 'src/app/core/pipes/pipes.module';

@NgModule({
  declarations: [ClotureComponent],
  imports: [CommonModule, ConfirmationModalModule, PipesModule],
  exports: [ClotureComponent],
})
export class ClotureModule {}
