import { randomWord } from './libs.js'

/**
 * auto writer
 *
 * @param {HTMLElement} $el
 * @param {object} options
 * @return {Promise<void>}
 */
function autoWriter($el, options = {})
{
  return new Promise(resolve => {
    // merge options
    options = Object.assign({}, {
      text: 'shuffle text', // 최종적으로 표시되는 텍스트
      waitChar: '-', // 변경되기전에 표시되는 텍스트
      charSpeed: 1, // 한번에 바뀌는 글자의 갯수
      moveFix: 25, // `waitChar`문자에서 랜덤문자로 바뀔때의 딜레이 시간
      moveRange: 10, // 대기문자에서 랜덤 글자로 바뀌는 시간
      moveTrigger: 25, // 만들어지는 글자가 랜덤으로 바뀌는 횟수
      fps: 60, // speed
      pattern: 'abcdefghijklmnopqrstuvwxyz0123456789-_!@#$%^&*()+~<>', // random text pattern
      randomTextType: 'unicode', // unicode,pattern
      stream: null, // 실시간 콜백함수
    }, options)
    options.text = options.text.trim()

    // check play
    if (!options.text) return resolve()

    // set values
    let textKeys = []
    let frame
    let position
    let currentText
    let checkLast
    let checkPlay = false
    let intervalId

    function stack()
    {
      let str = currentText.split('').map(v => ({ t: v }))
      checkLast = true

      for (let tick = position; tick <= frame; tick++)
      {
        if (0 !== textKeys[tick] && null != textKeys[tick])
        {
          checkLast = false
          const selectKey = textKeys[tick]
          if (Math.abs(selectKey) <= options.moveTrigger)
          {
            let txt = ''
            switch(options.randomTextType)
            {
              case 'pattern':
                txt = randomWord(options.pattern)
                break
              case 'unicode':
              default:
                const unicode = Math.min(Math.max(options.text.charCodeAt(tick) + selectKey, 33), 126)
                txt = String.fromCharCode(unicode)
                break
            }
            str.push({ t: txt, m: 'new' })
          }
          else
          {
            str.push({ t: options.waitChar, m: 'wait' })
          }
          selectKey > 0 ? textKeys[tick] -= 1 : textKeys[tick] += 1
        }
        else
        {
          if (position === tick - 1)
          {
            position = tick
            currentText = options.text.substring(0, position)
          }
          str.push({ t: options.text.charAt(tick), m: 'done' })
        }
        output(str)
      }

      if (frame <= options.text.length)
      {
        frame += options.charSpeed
      }
      else
      {
        checkPlay = true
      }

      // last stack
      if (checkLast && checkPlay) complete()
    }

    function complete()
    {
      if (intervalId) clearInterval(intervalId)
      if ($el) delete $el.dataset.id
      output(currentText)
      resolve(options.text)
    }

    function output(src)
    {
      if ($el)
      {
        $el.textContent = Array.isArray(src) ? src.map(v => v.t).join('') : src
      }
      if (options.stream && typeof options.stream === 'function')
      {
        options.stream(Array.isArray(src) ? src : src.split('').map(v => ({ t: v })))
      }
    }

    // restore intervalId
    if ($el?.dataset.id)
    {
      intervalId = parseInt($el.dataset.id)
    }

    // setup before play
    output(options.waitChar)
    // set values
    for (let i=0; i<=options.text.length-1; i++)
    {
      if (' ' !== options.text.charAt(0))
      {
        textKeys[i] = (options.moveFix + Math.round(Math.random() * options.moveRange)) * (Math.round(Math.random()) - .5) * 2
      }
      else
      {
        textKeys[i] = 0
      }
    }
    // reset values
    frame = 0
    position = 0
    currentText = ''
    // set interval
    if (intervalId) clearInterval(intervalId)
    intervalId = setInterval(stack, 1e3 / options.fps)
    if ($el) $el.dataset.id = intervalId.toString()
  })
}

export default autoWriter
