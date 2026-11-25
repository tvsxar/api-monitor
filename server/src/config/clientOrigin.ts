const configuredOrigin = process.env.CLIENT_ORIGIN
  ?? (process.env.NODE_ENV === 'production' ? '' : 'http://127.0.0.1:5173');

const url = URL.parse(configuredOrigin);

if (!url || !['http:', 'https:'].includes(url.protocol)
  || (configuredOrigin !== url.origin && configuredOrigin !== `${url.origin}/`)) {
  throw new Error('CLIENT_ORIGIN must be an HTTP or HTTPS origin without a path');
}

export const clientOrigin = url.origin;
