import { customToResourceURL, isCustomURL } from '../src/helpers';

describe('Test custom uri functions', () => {
    it('isCustomURL() should return true if uri=`uri:/users` or uri=`uri:/posts` and false for uri=`users` or uri=`posts`', () => {
        expect(isCustomURL('uri:/users')).toEqual(true);
        expect(isCustomURL('uri:/api/v1/posts')).toEqual(true);
        expect(isCustomURL('url:/users')).toEqual(true);
        expect(isCustomURL('url:/api/v1/posts')).toEqual(true);
        expect(isCustomURL('users')).toEqual(false);
    });

    it('isCustomURL() should return false if / is missing after uri or url', () => {
        expect(isCustomURL('uri:')).toEqual(false);
        expect(isCustomURL('url:')).toEqual(false);
    });

    it('customToResourceURL should create a resource uri', () => {
        expect(customToResourceURL('uri:/api/v1/users', 'http://127.0.0.1')).toEqual('http://127.0.0.1/api/v1/users');
        expect(customToResourceURL('uri:/api/v1/posts', 'http://127.0.0.1/api/v1')).toEqual('http://127.0.0.1/api/v1/posts');
    });

    it('customToResourceURL to return the path if host is invalid', () => {
        expect(customToResourceURL('uri:/api/v1/users', '/api/v1')).toEqual('/api/v1/users');
    });
});