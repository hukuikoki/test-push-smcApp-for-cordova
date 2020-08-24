import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PushNotificationsService } from '.';

@NgModule({
  // declarations: [],
  // imports: [CommonModule],
  // 必要ないかも
  providers: [PushNotificationsService],
})
export class PushNotificationsModule {}
