import { createStore } from 'vuex';
import { postStoreModule, PostStoreState } from '../post/post.store';
import { layoutStoreModule, LayoutStoreState } from './layout/layout.store';
import { localStorageStorePlugin } from './app.store.plugin';
import { authStoreModule, AuthStoreState } from '../auth/auth.store';
import {
  AppNotificationStoreState,
  appNotificationStoreModule,
} from './notification/app-notification.store';
import { UserStoreState, userStoreModule } from '../user/user.store';
import {
  AppToolbarStoreState,
  appToolbarStoreModule,
} from './toolbar/app-toolbar.store';
import { fileStoreModule, FileStoreState } from '../file/file.store';
import { ReplyStoreState, replyStoreModule } from '../reply/reply.store';

import {
  commentStoreModule,
  CommentStoreState,
} from '../comment/comment.store';

import { DiggStoreState, diggStoreModule } from '@/digg/digg.store';
import { ManageStoreState, manageStoreModule } from '@/manage/manage.store';

import {
  AppSearchStoreState,
  appSearchStoreModule,
} from '@/app/search/app-search.store';

import {
  AuditAuditStoreState,
  auditAuditStoreModule,
} from '@/audit/audit.store';
import {
  DashboardStoreState,
  dashboardStoreModule,
} from '@/dashboard/dashboard.store';
import { WeixinStoreState, weixinStoreModule } from '@/weixin/weixin.store';
import {
  DownloadStoreState,
  downloadStoreModule,
} from '@/download/download.store';
import { LicenseStoreState, licenseStoreModule } from '@/license/license.store';

import {
  PaymentStoreState,
  paymentStoreModule,
} from '../payment/payment.store';

import { ProductStoreState, productStoreModule } from '@/product/product.store';
import { OrderStoreState, orderStoreModule } from '@/order/order.store';
import {
  SubscriptionStoreState,
  subscriptionStoreModule,
} from '@/subscription/subscription.store';

export interface RootState {
  subscription: SubscriptionStoreState;
  order: OrderStoreState;
  product: ProductStoreState;
  payment: PaymentStoreState;
  license: LicenseStoreState;
  download: DownloadStoreState;
  weixin: WeixinStoreState;
  dashboard: DashboardStoreState;
  audit: AuditAuditStoreState;
  search: AppSearchStoreState;
  manage: ManageStoreState;
  digg: DiggStoreState;
  appName: string;
  post: PostStoreState;
  layout: LayoutStoreState;
  auth: AuthStoreState;
  notification: AppNotificationStoreState;
  user: UserStoreState;
  toolbar: AppToolbarStoreState;
  file: FileStoreState;
  comment: CommentStoreState;
  reply: ReplyStoreState;
}

/**
 * 创建 Store
 */
const store = createStore({
  state: {
    appName: '拾光者 | 照片分享平台',
  } as RootState,

  modules: {
    subscription: subscriptionStoreModule,
    order: orderStoreModule,
    product: productStoreModule,
    payment: paymentStoreModule,
    license: licenseStoreModule,
    download: downloadStoreModule,
    weixin: weixinStoreModule,
    dashboard: dashboardStoreModule,
    audit: auditAuditStoreModule,
    search: appSearchStoreModule,
    manage: manageStoreModule,
    digg: diggStoreModule,
    post: postStoreModule,
    layout: layoutStoreModule,
    auth: authStoreModule,
    notification: appNotificationStoreModule,
    user: userStoreModule,
    toolbar: appToolbarStoreModule,
    file: fileStoreModule,
    comment: commentStoreModule,
    reply: replyStoreModule,
  },
  plugins: [localStorageStorePlugin],
});

/**
 * 默认导出
 */
export default store;
