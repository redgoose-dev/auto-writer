/**  @var AutoWriter:object */

function basic()
{
  const $demo = document.querySelector('.basic .demo-text');
  const message = $demo.innerText;
  const autoWriter = new AutoWriter.core({
    speed: 2,
    speedNext: 4,
    offset: 6,
    firstCharOffset: 12,
    shuffle: false,
    firstChar: '-',
    exclude: [],
    output: 'object',
    //engine: 'setInterval', // requestAnimationFrame,setInterval
  });

  function append(res)
  {
    $demo.innerHTML = '';
    for (let i=0; i<res.length; i++)
    {
      let tag = document.createElement('span');
      tag.append(res[i].label);
      if (res[i].color) tag.style.color = res[i].color;
      if (res[i].label === ' ') tag.classList.add('space');
      $demo.append(tag);
    }
  }

  function run()
  {
    autoWriter.run(message, (res) => {
      append(res);
    });
  }

  append(Array.from($demo.innerText).map((text) => ({ label: text })));

  // button event
  document.querySelector('.basic .nav button[name=shuffle]').addEventListener('click', run);
}

function wrapper()
{
  const $demo = document.querySelector('.wrapper .demo-text');
  const message = $demo.innerText;

  function run()
  {
    AutoWriter.wrap(message, {
      speed: 2,
      speedNext: 4,
      offset: 6,
      firstCharOffset: 0,
      shuffle: false,
      firstChar: '~',
      exclude: [' '],
    }, (res) => {
      $demo.innerHTML = res;
    });
  }

  // button event
  document.querySelector('.wrapper .nav button[name=play]').addEventListener('click', run);
}

/**
 * playground
 */
function playground()
{
  basic();
  wrapper();
}

// init event
document.addEventListener('DOMContentLoaded', playground);
