importScripts("/swVersion.js");

import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';

const sw = self as unknown as
  & ServiceWorkerGlobalScope
  & { swVersion: string }
  & { files: { [key: string]: string }; fileCacheName: string };


const files = Object.keys(sw.files);

registerRoute(
  ({url}) =>!url.pathname.startsWith('/live/') &&
  files.indexOf(url.pathname.split("?")[0].slice(1))!==-1,
  new CacheFirst({
    cacheName: 'file-cache-'+sw.swVersion,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }
));

registerRoute(
  ({url}) =>!url.pathname.startsWith('/live/') &&
  files.indexOf(url.pathname.split("?")[0].slice(1))===-1,
  new CacheFirst({
    cacheName: 'esm-cache-124',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }
));
