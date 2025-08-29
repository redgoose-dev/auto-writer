import autoWriter from '../auto-writer/index.js'

const $src = {
  english: document.getElementById('src-english'),
  korean: document.getElementById('src-korean'),
  color: document.getElementById('src-color'),
}
const $target = {
  title: document.getElementById('title'),
  english: document.getElementById('demo-english'),
  korean: document.getElementById('demo-korean'),
  color: document.getElementById('demo-color'),
}

function playTitle()
{
  const $title = document.getElementById('title')
  const text = $title.textContent
  function run()
  {
    autoWriter(document.getElementById('title'), {
      text,
      waitChar: '-',
      fps: 30,
      charSpeed: .5,
      moveFix: 25,
      moveRange: 5,
      moveTrigger: 25,
    }).then(() => setTimeout(() => run(), 5000))
  }
  setTimeout(() => run(), 2000)
}

function playEnglish()
{
  autoWriter($target.english, {
    text: $src.english.value,
  }).then()
}

function playKorean()
{
  autoWriter($target.korean, {
    text: $src.korean.value,
    // pattern: 'abcdefghijklmnopqrstuvwxyz0123456789-_!@#$%^&*()+~<>ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㄲㄸㅃㅆㅉ',
    pattern: 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㄲㄸㅃㅆㅉ',
    randomTextType: 'pattern',
    fps: 30,
  }).then()
}

function playColor()
{
  const colors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
    '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
    '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800',
    '#ff5722', '#795548', '#9e9e9e', '#607d8b',
  ]
  autoWriter(null, {
    text: $src.color.value,
    waitChar: '#',
    fps: 20,
    stream: arr => {
      $target.color.innerHTML = ''
      for (let i = 0; i < arr.length; i++) {
        let tag = document.createElement('span')
        tag.append(arr[i].t)
        switch (arr[i].m)
        {
          case 'new':
            tag.style.color = colors[Math.floor(Math.random() * colors.length)]
            break
          case 'wait':
            tag.style.color = 'silver'
            break
          case 'done':
          default:
            tag.style.color = ''
            break
        }
        $target.color.append(tag)
      }
    },
  }).then()
}

// set events
document.getElementById('button-english').addEventListener('click', playEnglish)
document.getElementById('button-korean').addEventListener('click', playKorean)
document.getElementById('button-color').addEventListener('click', playColor)
$src.english.addEventListener('keypress', e => {
  if (e.key === 'Enter') playEnglish()
})
$src.korean.addEventListener('keypress', e => {
  if (e.key === 'Enter') playKorean()
})
$src.color.addEventListener('keypress', e => {
  if (e.key === 'Enter') playColor()
})

// play title animation
playTitle()
