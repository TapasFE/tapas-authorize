Tapas Authorize
===

Qiniu
---
``` javascript
const koa = require('koa');
const mount = require('koa-mount');
const authorize = require('tapas-authorize');

// Set your secret keys at first
authorize.qiniu.setKeys('ACCESS_KEY', 'SECRET_KEY');

// Build middleware with bucket only
const mw = authorize.qiniu('tapas-bucket');
// Build middleware with bucket and options
const mw = authorize.qiniu('tapas-bucket', {saveKey: 'tapas/images/$(etag)'});

// Mount
const app = koa();
app.use(mount('/auth/qiniu_token', mw));
app.listen(8080);
```
