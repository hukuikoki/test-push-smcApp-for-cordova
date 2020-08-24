import { Attributes } from '..';
import { Injectable } from '@angular/core';
// import { MCCordovaPlugin } from '../../../../../../plugins/cordova-plugin-marketingcloudsdk/www/MCCordovaPlugin';
import { PushNotificationsInterface } from '../interfaces/push-notifications.interface';

declare const MCCordovaPlugin: PushNotificationsInterface;

@Injectable({
  providedIn: 'root',
})
export class PushNotificationsService {
  constructor() {}

  // ANDROID AND iOS FEATURES

  public isPushEnabled(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      MCCordovaPlugin.isPushEnabled(
        (enabled: boolean) => resolve(enabled),
        () => reject('Can Not Determinate If Is Enabled')
      );
    });
  }

  public getContactKey(): Promise<string> {
    return new Promise((resolve, reject) => {
      MCCordovaPlugin.getContactKey(
        (key: string) => resolve(key),
        () => reject(new Error('Can Not Get Contact Key'))
      );
    });
  }

  public setContactKey(contactKey: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      MCCordovaPlugin.setContactKey(
        contactKey,
        () => resolve(true),
        () => reject('Can Not Set Contact Key')
      );
    });
  }

  public getSystemToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      MCCordovaPlugin.getSystemToken(
        (systemToken: string) => resolve(systemToken),
        () => reject(new Error('Can Not Get System Token'))
      );
    });
  }

  public getAttributes(): Promise<Attributes> {
    return new Promise((resolve, reject) => {
      MCCordovaPlugin.getAttributes(
        (attributes: Attributes) => resolve(attributes),
        () => reject(new Error('Can Not Get Attributes'))
      );
    });
  }

  public setAttribute(key: string, value: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      MCCordovaPlugin.setAttribute(
        (success: boolean) => resolve(success),
        () => reject(new Error('Can Not Set Attribute')),
        key,
        value
      );
    });
  }

  public clearAttribute(attribute: string): Promise<string> {
    return new Promise((resolve, reject) => {
      MCCordovaPlugin.clearAttribute(
        (attributeRemoved: string) => resolve(attributeRemoved),
        () => reject(new Error('Can Not Remove Attribute')),
        attribute
      );
    });
  }

  public getTags(): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      MCCordovaPlugin.getTags(
        (tags: Array<string>) => resolve(tags),
        () => reject(new Error('Can Not Get Tags'))
      );
    });
  }

  public addTag(tag: string): Promise<any> {
    return new Promise((resolve, reject) => {
      MCCordovaPlugin.addTag(
        () => resolve(),
        () => reject(new Error('Can Not Add Tag')),
        tag
      );
    });
  }

  public removeTag(tag: string): Promise<any> {
    return new Promise((resolve, reject) => {
      MCCordovaPlugin.removeTag(
        () => resolve(),
        () => reject(new Error('Can Not Remove Tag')),
        tag
      );
    });
  }
}
