interface ShuffleInterface {
  text: string;
  waitChar?: string;
  charSpeed?: number;
  moveFix?: number;
  moveRange?: number;
  moveTrigger?: number;
  fps?: number;
  callback?;
}

/**
 * shuffle
 *
 * @param {HTMLElement} $el
 * @param {Object} options
 * @return {void}
 */
function shuffle($el:HTMLElement, options?:ShuffleInterface): void
{
  // merge options
  options = Object.assign({}, {
    text: '', // 최종적으로 표시되는 텍스트
    waitChar: '-', // 변경되기전에 표시되는 텍스트
    charSpeed: 1, // 한번에 바뀌는 글자의 갯수
    moveFix: 25, // 텍스트가 바뀌는 딜레이 시간
    moveRange: 10, // 랜덤으로 글자가 바뀌고 있을때의 시간관련
    moveTrigger: 25, // 랜덤으로 글자가 바뀌고 있을때의 시간관련
    fps: 60, // speed
    callback: null, // 애니메이션이 끝나고 실행되는 함수
  }, options);
  options.text = options.text.trim();

  // set values
  let textKeys = [];
  let frame;
  let position;
  let currentText;
  let checkLast;
  let checkPlay = false;

  /**
   * stack
   */
  function stack()
  {
    let str = currentText;
    checkLast = true;

    for (let tick = position; tick <= frame; tick++)
    {
      if (0 !== textKeys[tick] && null != textKeys[tick])
      {
        checkLast = false;
        const selectKey = textKeys[tick];
        if (Math.abs(selectKey) <= options.moveTrigger)
        {
          const unicode = Math.min(Math.max(options.text.charCodeAt(tick) + selectKey, 33), 126);
          str += String.fromCharCode(unicode);
        }
        else
        {
          str += options.waitChar;
        }
        selectKey > 0 ? textKeys[tick] -= 1 : textKeys[tick] += 1;
      }
      else
      {
        if (position === tick - 1)
        {
          position = tick;
          currentText = options.text.substring(0, position);
        }
        str += options.text.charAt(tick);
      }
      $el.textContent = str;
    }

    if (frame <= options.text.length)
    {
      frame += options.charSpeed;
    }
    else
    {
      checkPlay = true;
    }

    // last stack
    if (checkLast && checkPlay)
    {
      if ($el.dataset.id) clearInterval(parseInt($el.dataset.id));
      $el.textContent = currentText;
      $el.dataset.run = 'false';
      if (options.callback) options.callback();
    }
  }

  // play
  if (options.text && $el.dataset.run !== 'true')
  {
    $el.dataset.run = 'true';
    $el.textContent = options.waitChar;

    // set values
    for (let i=0; i<=options.text.length-1; i++)
    {
      if (' ' !== options.text.charAt(0))
      {
        textKeys[i] = (options.moveFix + Math.round(Math.random() * options.moveRange)) * (Math.round(Math.random()) - .5) * 2;
      }
      else
      {
        textKeys[i] = 0;
      }
    }

    // reset values
    frame = 0;
    position = 0;
    currentText = '';

    // set interval
    clearInterval(parseInt($el.dataset.id));
    const intervalId = setInterval(stack, 1e3 / options.fps);
    $el.dataset.id = intervalId.toString();
  }
}

export default shuffle;
