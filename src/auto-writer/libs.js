/**
 * get random word
 * 무작위 문자를 가져온다.
 *
 * @param {string} pattern
 * @return {string}
 */
export function randomWord(pattern)
{
  const n = Math.floor(Math.random() * pattern.length)
  return pattern.substring(n, n + 1)
}
