/**
 * This allows us to include web workers in our bundle, and VTK.js
 * web workers in our bundle.
 *
 * Workers are emitted as separate same-origin files, not inlined. Inlined
 * workers are spawned from blob: URLs, which a Content-Security-Policy
 * without `worker-src` (falling back to `script-src 'self'`, as XNAT 1.10.1+
 * sends) refuses -- the RTSTRUCT import then hangs at "Downloading 100%".
 * A file next to the bundles is covered by 'self'.
 */
const loadWebWorkers = {
  test: /\.worker\.js$/,
  // include: /vtk\.js[\/\\]Sources/,
  use: [
    {
      loader: 'worker-loader',
      options: { name: '[name].[hash].js' },
    },
  ],
};

module.exports = loadWebWorkers;
