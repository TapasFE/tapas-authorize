const qiniu = require('qiniu');

module.exports = tokenMiddleware;
tokenMiddleware.setKeys = setKeys;

/**
 * @desc Build a koa middleware to generate Qiniu put-tokens.
 * @param {String} bucket (Required) Bucket to upload images.
 * @param {Object} options (Optional)
 * @return {Function*} The middleware that generates Qiniu put-tokens.
 */
function tokenMiddleware(bucket, options) {
  options = Object.assign({
    scope: bucket,
    expires: 100,
    saveKey: 'images/$(etag)',
    returnBody: '{' + [
      // '"name":$(fname)',
      // '"size":$(fsize)',
      // '"w":$(imageInfo.width)',
      // '"h":$(imageInfo.height)',
      `"path":"${saveKey}"`,
      // '"key":$(key)',
      // '"hash":$(etag)',
    ].join(',') + '}',
  }, options);
  return function* () {
    const putPolicy = new qiniu.rs.PutPolicy2(options);
    const token = putPolicy.token();
    this.body = token;
  };
}

function setKeys(ACCESS_KEY, SECRET_KEY) {
  qiniu.conf.ACCESS_KEY = ACCESS_KEY;
  qiniu.conf.SECRET_KEY = SECRET_KEY;
}
