import BigInt from 'bigint-polyfill'

const getTimedResolvingPromise = (resolveValue, time) =>
  new Promise((resolve) => setTimeout(() => resolve(resolveValue), time))

const getTimedRejectingPromise = (resolveValue, time) =>
  new Promise((_, reject) => setTimeout(() => reject(resolveValue), time))

Promise.race([
  getTimedRejectingPromise(1, 2e3),
  getTimedResolvingPromise(new BigInt(2n), 1e3),
]).then(alert)
