import { Attributes } from '../models/push-notifications.models';

export interface PushNotificationsInterface {
  // ANDROID AND iOS FEATURES

  // Logging
  enableVerboseLogging(successCallback: () => void, errorCallback: () => void): void;
  disableVerboseLogging(successCallback: () => void, errorCallback: () => void): void;

  // Push
  isPushEnabled(successCallback: (enabled: boolean) => void, errorCallback: () => void): void;

  // Get system token.
  getSystemToken(successCallback: (systemToken: string) => void, errorCallback: () => void): void;

  // Attributes
  getAttributes(successCallback: (attributes: Attributes) => void, errorCallback: () => void): void;
  setAttribute(
    successCallback: (success: boolean) => void,
    errorCallback: () => void,
    key: string,
    value: string
  ): void;
  clearAttribute(
    successCallback: (attributeRemoved: string) => void,
    errorCallback: () => void,
    key: string
  ): void;

  // ContactKey
  setContactKey(contactKey: string, successCallback: () => void, errorCallback: () => void): void;
  getContactKey(successCallback: (contactKey: string) => void, errorCallback: () => void): void;

  // Tags
  addTag(successCallback: () => void, errorCallback: () => void, tag: string): void;
  removeTag(successCallback: () => void, errorCallback: () => void, tag: string): void;
  getTags(successCallback: (tags: Array<string>) => void, errorCallback: () => void): void;

  // ANDROID ONLY FEAURES

  // Push

  enablePush(successCallback: () => void, errorCallback: () => void): void;
  disablePush(successCallback: () => void, errorCallback: () => void): void;
}
