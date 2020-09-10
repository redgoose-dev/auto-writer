import core from './core';
import coreInterface from './coreInterface';

/**
 * auto writer wrapper
 * 함수로 바로 사용하기위한 래퍼
 *
 * @param {string} keyword
 * @param {object} options
 * @param {Function} callback
 * @param {core} instance return object
 * @return {core}
 */
function wrap(keyword?: string, options?: coreInterface, callback: Function = null, instance:any = null): core
{
  if (!instance) instance = new core(options);
  instance.run(keyword, callback);
  return instance;
}

export default wrap;