import * as webPush from 'web-push';
import { Config } from '../../config';
import VapidKeys = Config.VapidKeys;
export function webPushInit() {
    webPush.setVapidDetails(
      VapidKeys.subject,
    VapidKeys.publicKey,
    VapidKeys.privateKey,
  );
}
