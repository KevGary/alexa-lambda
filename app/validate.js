'use strict';

const notEmpty = (text = '') => {
  if (!text) {
    console.warn('\nPlease enter value');
    return false;
  }
  return true;
};

const noSpaces = (text = '') => {
  if (/\s/.test(text)) {
    console.warn('\nSpaces not allowed');
    return false;
  }
  return true;
}

const notEmptyNoSpaces = (text = '') => notEmpty(text) && noSpaces(text);

module.exports = {
  notEmpty,
  noSpaces,
  notEmptyNoSpaces
};