'use strict';

const isEmpty = (text) => {
  if (!text) {
    console.warn('\nPlease enter value');
    return true;
  }
  return false;
};

const hasSpaces = (text = '') => {
  if (/\s/.test(text)) {
    console.warn('\nSpaces not allowed');
    return true;
  }
  return false;
}

const notEmptyNoSpaces = (text = '') => {
  if (isEmpty(text) || hasSpaces(text)) {
    return Promise.resolve(false);
  }
  return Promise.resolve(true);
}

module.exports = { notEmptyNoSpaces };