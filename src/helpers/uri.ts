/**
 * Try to parse an HTTP url to check wether the resource URI is valid or not
 *
 * @param uri
 * @publicApi
 */
export function isValidHttpUrl(uri: string) {
  try {
    const url = new URL(uri);
    return url.protocol === 'http:' || url.protocol === 'https:';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return false;
  }
}

/**
 * Custom URI provides an alternative to full HTTP url
 * It allow form builders to configure custom resources uri.
 *
 * Customer resources URI must be in form of uri:/path or url:/path where
 * uri: or `url:` will be replaced by the host path configured by the
 * client application.
 *
 * @example
 * uri:/users
 * url:/posts/1/comments
 *
 * @param uri
 * @publicApi
 */
export function isCustomURL(uri: string) {
  return /^uri:\//i.test(uri) || /^url:\//.test(uri);
}

/**
 * Query for the host part of a resource URI
 * 
 * @internal
 *
 * @param uri
 */
export function urlHost(uri: string) {
  try {
    if (uri) {
      const url = new URL(uri);
      uri = `${url.protocol}//${url.host}`;
      return `${`${uri.endsWith('/') ? uri.slice(0, -1) : uri}`}`;
    }
    return uri ?? '';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return '';
  }
}

/**
 * Convert a cutom uri to a valid resource URL.
 *
 * @example
 * customToResourceURL('uri:api/v1/users', "http://127.0.0.1"); // http://127.0.0.1/api/v1/users
 *
 * customToResourceURL('uri:api/v1/users', "api/v1"); // api/v1/users because `api/v1` is not a valid
 * resource URI
 *
 * @param uri
 * @param host
 * 
 * @publicApi
 */
export function customToResourceURL(uri: string, host: string) {
  let path = uri.replace(/^uri:\//, '').replace(/^url:\//, '');
  path = path[0] === '/' ? path.substring(1) : path;
  return `${urlHost(host)}/${path}`;
}
