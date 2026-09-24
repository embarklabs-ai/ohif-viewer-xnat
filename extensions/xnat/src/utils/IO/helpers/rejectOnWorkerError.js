/**
 * rejectOnWorkerError - Races a worker's result promise against the worker's
 * `error` event, so a worker that fails to load (e.g. its script 404s or a
 * Content-Security-Policy refuses it) rejects instead of hanging forever.
 *
 * @param  {Worker} worker    The web worker.
 * @param  {Promise} promise  The promise for the worker's result.
 * @returns {Promise}
 */
export default function rejectOnWorkerError(worker, promise) {
  return Promise.race([
    promise,
    new Promise((resolve, reject) => {
      worker.addEventListener('error', evt => {
        reject(
          new Error(
            `Web worker failed: ${(evt && evt.message) || 'script error'}`
          )
        );
      });
    }),
  ]);
}
