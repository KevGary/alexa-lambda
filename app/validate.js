'use strict';

const noSpaces = (text = '') => {
  return Promise.resolve(text && text.indexOf(' ') === -1)
    .then(hasSpaces => {
      if (!hasSpaces) {
        console.warn('\nSpaces not allowed');
      }
      return hasSpaces;
    });
}

module.exports = { noSpaces };