import { expect } from 'chai';
import {
  isUndefined,
  isFunction,
  isObject,
  isString,
  isConstructor,
  validatePath,
  isNil,
  isEmpty,
  isPlainObject,
} from '../../utils/shared.utils';

function Foo(a) {
  this.a = 1;
}

describe('Shared utils', () => {
  describe('isUndefined', () => {
    it('should returns true when obj is undefined', () => {
      expect(isUndefined(undefined)).to.be.true;
    });
    it('should returns false when object is not undefined', () => {
      expect(isUndefined({})).to.be.false;
    });
  });
  describe('isFunction', () => {
    it('should returns true when obj is function', () => {
      expect(isFunction(() => ({}))).to.be.true;
    });
    it('should returns false when object is not function', () => {
      expect(isFunction(null)).to.be.false;
      expect(isFunction(undefined)).to.be.false;
    });
  });
  describe('isObject', () => {
    it('should returns true when obj is object', () => {
      expect(isObject({})).to.be.true;
    });
    it('should returns false when object is not object', () => {
      expect(isObject(3)).to.be.false;
      expect(isObject(null)).to.be.false;
      expect(isObject(undefined)).to.be.false;
    });
  });
  describe('isPlainObject', () => {
    it('should returns true when obj is plain object', () => {
      expect(isPlainObject({})).to.be.true;
      expect(isPlainObject({ prop: true })).to.be.true;
      expect(
        isPlainObject({
          constructor: Foo,
        }),
      ).to.be.true;
      expect(isPlainObject(Object.create(null))).to.be.true;
    });
    it('should returns false when object is not object', () => {
      expect(isPlainObject(3)).to.be.false;
      expect(isPlainObject(null)).to.be.false;
      expect(isPlainObject(undefined)).to.be.false;
      expect(isPlainObject([1, 2, 3])).to.be.false;
      expect(isPlainObject(new Date())).to.be.false;
      expect(isPlainObject(new Foo(1))).to.be.false;
    });
  });
  describe('isString', () => {
    it('should returns true when obj is string', () => {
      expect(isString('true')).to.be.true;
    });
    it('should returns false when object is not string', () => {
      expect(isString(false)).to.be.false;
      expect(isString(null)).to.be.false;
      expect(isString(undefined)).to.be.false;
    });
  });
  describe('isConstructor', () => {
    it('should returns true when string is equal constructor', () => {
      expect(isConstructor('constructor')).to.be.true;
    });
    it('should returns false when string is not equal constructor', () => {
      expect(isConstructor('nope')).to.be.false;
    });
  });
  describe('validatePath', () => {
    it('should returns validated path ("add / if not exists")', () => {
      expect(validatePath('nope')).to.be.eql('/nope');
    });
    it('should returns same path', () => {
      expect(validatePath('/nope')).to.be.eql('/nope');
    });
    it('should remove all trailing slashes at the end of the path', () => {
      expect(validatePath('path/')).to.be.eql('/path');
      expect(validatePath('path///')).to.be.eql('/path');
      expect(validatePath('/path/path///')).to.be.eql('/path/path');
    });
    it('should replace all slashes with only one slash', () => {
      expect(validatePath('////path/')).to.be.eql('/path');
      expect(validatePath('///')).to.be.eql('/');
      expect(validatePath('/path////path///')).to.be.eql('/path/path');
    });
    it('should returns / for empty path', () => {
      expect(validatePath('')).to.be.eql('/');
      expect(validatePath(null)).to.be.eql('/');
      expect(validatePath(undefined)).to.be.eql('/');
    });
  });
  describe('isNil', () => {
    it('should returns true when obj is undefined or null', () => {
      expect(isNil(undefined)).to.be.true;
      expect(isNil(null)).to.be.true;
    });
    it('should returns false when object is not undefined and null', () => {
      expect(isNil('3')).to.be.false;
    });
  });
  describe('isEmpty', () => {
    it('should returns true when array is empty or not exists', () => {
      expect(isEmpty([])).to.be.true;
      expect(isEmpty(null)).to.be.true;
      expect(isEmpty(undefined)).to.be.true;
    });
    it('should returns false when array is not empty', () => {
      expect(isEmpty([1, 2])).to.be.false;
    });
  });
});
