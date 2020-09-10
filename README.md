# Auto Writer

글이 쓰여지는 애니메이션 툴입니다.


## installation

__npm__

```shell script
npm install auto-writer
```

__yarn__

```shell script
yarn add auto-writer
```


## using

`AutoWriter` 사용방법은 다음과 같습니다.

클래스 인스턴스를 만들어서 사용합니다.

```javascript
import * as AutoWriter from 'auto-writer';

const autoWriter = AutoWriter.core({
  speed: 2,
  // ...options
});
autoWriter.run('message text', (res) => {
  console.log(res);
});
```

함수로 바로 사용합니다.
```javascript
import * as AutoWriter from 'auto-writer';

let instance = AutoWriter.wrap('message text', {
  speed: 2,
  // ...options
}, function(res) {
  console.log(res);
});
```


## options

옵션을 다음과 같이 사용하며 형식은 `object`입니다.

```javascript
// instance
const autoWriter = AutoWriter.core({ speed: 2 });

// function
AutoWriter.wrap(message, { speed: 2 }, function(res) {}, null);
```

옵션의 목록은 다음과 같습니다.

| Name | Type | Value | Description |
| ---- | ---- | ------- | ----------- |
| engine | `string` | `requestAnimationFrame,setInterval` | 매 실행되는 도구의 종류 |
| speed | `number` | `2` | 매번 실행되는 콜백함수의 속도. 수치가 높을수록 느려집니다. |
| speedNext | `number` | `4` | 랜덤문자가 변하는 횟수 |
| offset | `number` | `2` | 변하는 랜덤문자의 갯수 |
| shuffle | `boolean` | `false` | 변하는 글자 위치의 순서 |
| pattern | `string` | `abcdefghijklmnopqrstuvwxyz0123456789-_!@#$%^&*()+~<>` | 랜덤문자의 패턴 |
| firstChar | `string` | `-` | 변하기 시작할때의 문자 |
| firstCharOffset | `number` | `4` | 변하기 시작할때의 문자의 갯수 |
| exclude | `Array<string>` | `[]` | 제외할 문자의 목록 |
| colors | `Array<string>` | `[ ...colors ]` | 랜덤문자로 변하고 있을때의 변하는 색상의 목록 |
| output | `string` | `string,output` | 매번 실행할때마다 실행되는 콜백함수의 값의 타입 |


## methods

### updateOptions

중간에 옵션을 변경할때 사용합니다.

```javascript
const autoWriter = new AutoWriter();
autoWriter.updateOptions(options);
```

- @param {object} options

### run

실제로 글자 애니메이션을 실행합니다.

```javascript
const autoWriter = new AutoWriter();
autoWriter.run(message, callback);
```

- @param {string} message 사용할 텍스트 메시지
- @param {Function} callback 매번 실행되는 콜백함수  
  콜백함수의 파라메터는 다음과 같습니다.  
  - @param {string|object} res 출력되는 값

### wrap

객체를 생성하지 않고 바로 애니메이션을 실행합니다.

```javascript
let instance = AutoWriter.wrap(message, options, callback, instance);
```

- @param {string} message
- @param {object} options
- @param {Function} callback
- @param {AutoWriter.core} instance 먼저 만들어진 인스턴스 객체
- @return {AutoWriter.core} `wrap()`메서드 내부에서 만들어진 인스턴스 객체를 그대로 리턴한다.


## examples

### random colors

글자가 변하는 부분에서 랜덤으로 색을 바꾸는 예제입니다.

```javascript
const $demo = document.querySelector('p');
const message = 'message text';

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

AutoWriter.wrap(message, {
  offset: 6,
  firstCharOffset: 12,
  output: 'object',
  firstChar: '~',
}, append);

append(Array.from(message).map((text) => ({ label: text })));
```

### another pattern text

다른 문자패턴으로 변경하는 예제입니다.

```javascript
const $demo = document.querySelector('p');

AutoWriter.wrap('가끔씩 여우비가 내리를 날에는 문득 기분이 설레인다.', {
  pattern: 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㄲㄸㅃㅆㅉ',
  firstChar: '♨',
  exclude: [' '],
}, function(res) {
  $demo.innerHTML = res;
});
```

### with button

버튼을 누르면 애니메이션을 실행하는 예제입니다.  
이 예제에서 중요한점은 인스턴스 객체를 그대로 사용하여 `play`버튼을 여러번 눌렀을때 중복으로 애니메이션 실행을 방지하는 점입니다.

```html
<p>message text</p>
<button type="button">play</button>
```

```javascript
const $message = document.querySelector('p');
let instance = null;
document.querySelector('button').addEventListener('click', function() {
  instance = AutoWriter.wrap($message.innerHTML, {}, function(res) {
    $message.innerHTML = res;
  }, instance);
});
```


## text shuffle

다른 방식으로 만들어진 애니메이션 함수입니다.  
제이쿼리 플러그인을 포팅했습니다.

기초적인 사용법은 다음과 같습니다.

```javascript
import * as AutoWriter from 'auto-writer';
AutoWriter.shuffle(document.querySelector('p'), {
  text: 'message', // 최종적으로 표시되는 메시지
  waitChar: '-', // 변경되기전에 표시되는 텍스트
  charSpeed: 1, // 한번에 바뀌는 글자의 갯수
  moveFix: 25, // 텍스트가 바뀌는 딜레이 시간
  moveRange: 10, // 랜덤으로 글자가 바뀌고 있을때의 시간관련
  moveTrigger: 25, // 랜덤으로 글자가 바뀌고 있을때의 시간관련
  fps: 60, // speed
  callback: null, // 애니메이션이 끝나고 실행되는 함수
});
```

npm(yarn) 패키지로 설치되었을때 다음과 같이 함수만 따로 불러와서 사용할 수 있습니다.

```javascript
import textShuffle from 'auto-writer/src/shuffle';
textShuffle(document.querySelector('p'), {
  text: 'message',
});
```
