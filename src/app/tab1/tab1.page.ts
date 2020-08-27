import { Component, OnInit } from '@angular/core';

import { Attributes } from '../modules/share/push-notifications/models/push-notifications.models';
import { Platform } from '@ionic/angular';
import { PushNotificationsService } from '../modules/share/push-notifications/services/push-notifications.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public pushEnabled: boolean;
  public contactKey: string;
  public systemToken: string;
  public attributes: Array<{ $key: string; value: string }>;
  public tags: Array<string>;
  private notificationOpenedSub: Subscription;

  constructor(private pushNotifications: PushNotificationsService, public platform: Platform) {
    this.iniciarPushNotifications();
  }

  iniciarPushNotifications() {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.isPushEnabled();
        this.setContactKey('fukui2222');
        this.setOnNotificationOpenedListener();
        this.getSettings();
      }
      this.notificationOpenedSub = this.platform.resume.subscribe(() => {
        console.log('****UserdashboardPage RESUMED****');
        this.setOnNotificationOpenedListener();
      });
    });
  }

  // ngOnInit() {
  //   this.notificationOpenedSub = this.pushNotifications.notificationOpened?.subscribe((data) => {
  //     console.log(data);
  //   });
  //   console.log(this.notificationOpenedSub);
  // }

  // ionViewWillEnter() {
  //   if (this.platform.is('cordova')) {
  //     console.log('finish');
  //     this.notificationOpenedSub.unsubscribe();
  //   }
  // }

  ionViewWillUnload() {
    console.log('finish');
    this.notificationOpenedSub.unsubscribe();
  }

  private getSettings(): void {
    this.getContactKey();
    this.getSystemToken();
    this.getAttributes();
    this.getTags();
  }

  // private async getSettings() {
  //   await Promise.all([
  //     this.getContactKey(),
  //     this.getSystemToken(),
  //     this.getAttributes(),
  //     this.getTags(),
  //   ]);
  // }

  // START MCCordovaPlugin Methods

  private isPushEnabled() {
    this.pushNotifications
      .isPushEnabled()
      .then((enabled: boolean) => {
        console.log('Push enabled ->' + enabled);
        alert('Push enabled ->' + enabled);
        this.pushEnabled = enabled;
      })
      .catch((error: Error) => console.log(error.message));
  }

  private getContactKey(): void {
    this.pushNotifications
      .getContactKey()
      .then((key: string) => {
        alert(key);
        this.contactKey = key;
      })
      .catch((error: Error) => console.log(error.message));
  }

  public setContactKey(contactKey): void {
    this.pushNotifications
      .setContactKey(contactKey)
      .then((success: boolean) => {
        if (success) {
          this.getSettings();
        } else {
          console.log('No se pudo asignar el Contact Key');
        }
      })
      .catch((error: Error) => console.log(error.message));
  }

  private getSystemToken(): void {
    this.pushNotifications
      .getSystemToken()
      .then((systemToken: string) => {
        alert(systemToken);
        this.systemToken = systemToken;
      })
      .catch((error: Error) => console.log(error.message));
  }

  private getAttributes(): void {
    this.attributes = new Array<{ $key: string; value: string }>();
    this.pushNotifications
      .getAttributes()
      .then((attributes: Attributes) => {
        Object.keys(attributes).map((key: string) =>
          this.attributes.push({
            $key: key,
            value: attributes[key],
          })
        );
      })
      .catch((error: Error) => console.log(error.message));
  }

  public setAttribute(): void {
    this.pushNotifications
      .setAttribute('test_id', '10293847')
      .then((success: boolean) => {
        if (success) {
          this.getAttributes();
        }
      })
      .catch((error: Error) => console.log(error.message));
  }

  public clearAttribute(attrKey: string) {
    this.pushNotifications
      .clearAttribute(attrKey)
      .then((attributeRemoved: string) => console.log(attributeRemoved))
      .catch((error: Error) => console.log(error.message));
  }

  private getTags(): void {
    this.tags = new Array<string>();
    this.pushNotifications
      .getTags()
      .then((tags: Array<string>) => {
        this.tags = tags;
      })
      .catch((error: Error) => console.log(error.message));
  }

  public addTag(inputTag: any): void {
    if (!this.tags.find((tag: string) => tag == inputTag.value) && inputTag.value != '') {
      this.pushNotifications
        .addTag(inputTag.value)
        .then(() => {
          inputTag.value = '';
          this.getTags();
        })
        .catch((error: Error) => console.log(error.message));
    }
  }

  public removeTag(tag: string): void {
    this.pushNotifications
      .removeTag(tag)
      .then(() => console.log(`Tag ${tag} Removed`))
      .catch((error: Error) => console.log(error.message));
  }

  // push通知を通じて送られてきたパラメータを取得
  public setOnNotificationOpenedListener() {
    console.log('ok');
    alert('ok');
    this.pushNotifications
      .setOnNotificationOpenedListener()
      .then((event) => {
        event.values.url ? (window.location.href = event.values.url) : console.log('no url');
      })
      // .then((event) => console.log('url', event.values.url))
      .catch((error: Error) => console.log(error.message));
  }
}
