# Auto Writer

자동으로 글이 작성되는 애니메이션 툴입니다.

## Installation

`CLI`에서 설치할 프로젝트에서 다음과 같은 명령으로 설치합니다.

```
npm install --save-dev auto-writer
bun add -d auto-writer
```


## Using

기초적인 사용법은 다음과 같습니다.
함수를 사용하는 코드는 `autoWriter(ELEMENT: HTMLElement, OPTIONS: object)`으로 구성되어 있습니다.

```javascript
import autoWriter from 'auto-writer'

autoWriter(document.getElementById('text'), {
  text: 'message text'
})
```

첫번째 파라메터값인 `ELEMENT`값을 `null`로 넣고, `stream` 콜백함수에서 직접 제어할 수 있습니다.


## Options

다음과 같이 옵션 파라메터로 사용할 수 있습니다.

| Name           | Type     | Value               | Description                      |
|----------------|----------|---------------------|----------------------------------|
| text           | string   | 'message text'      | 최종적으로 표시되는 텍스트                   |
| waitChar       | string   | '-'                 | 변경되기전에 표시되는 텍스트                  |
| charSpeed      | number   | 1                   | 한번에 바뀌는 글자의 갯수                   |
| moveFix        | number   | 25                  | `waitChar`문자에서 랜덤문자로 바뀔때의 딜레이 시간 |
| moveRange      | number   | 10                  | 대기문자에서 랜덤 글자로 바뀌는 시간             |
| moveTrigger    | number   | 25                  | 만들어지는 글자가 랜덤으로 바뀌는 횟수            |
| fps            | number   | 60                  | 속도                               |
| pattern        | string   | 'abcdefg0123456789' | 랜덤으로 표시되는 문자패턴                   |
| randomTextType | string   | 'unicode'           | 랜덤 텍스트 종류                        |
| stream         | function | null                | 글자가 바뀔때마다 호출되는 함수                |

### pattern

사용할만한 글자 패턴입니다.

기본값

```
abcdefghijklmnopqrstuvwxyz0123456789-_!@#$%^&*()+~<>
```

한글과 영문, 숫자, 특수문자

```
abcdefghijklmnopqrstuvwxyz0123456789-_!@#$%^&*()+~<>ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㄲㄸㅃㅆㅉ
```

한글만

```
ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㄲㄸㅃㅆㅉ
```


## Examples

`auto-writer` 함수 사용 예제들입니다.

### Another pattern text

다른 패턴으로 사용합니다.

```javascript
import autoWriter from 'auto-writer'

autoWriter(document.getElementById('text'), {
  text: '여우비가 내리는 날에는 기분이 설레인다.',
  pattern: 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㄲㄸㅃㅆㅉ',
  randomTextType: 'pattern',
})
```

### Random color

상태에 따라 다른 색상으로 표현할 수 있습니다.
하지만 애니메이션이 일어날때마다 엘리먼트를 만들기 때문에 성능에 영향을 줄 수 있습니다.

애니메이션 틱이 호출될때 `stream` 옵션 콜백함수로 직접 텍스트 엘리먼트를 만들고 타겟 엘리먼트에 집어넣습니다.

```javascript
const colors = [
  '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
  '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
  '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800',
  '#ff5722', '#795548', '#9e9e9e', '#607d8b',
]
const $target = document.getElementById('text')

autoWriter(null, {
  text: 'Random Color Text',
  stream: arr => {
    $target.innerHTML = ''
    for (let i = 0; i < arr.length; i++) {
      let tag = document.createElement('span')
      tag.append(arr[i].t)
      switch(arr[i].m) {
        case 'wait':
          // 애니메이션 전 대기 문자
          tag.style.color = 'silver'
          break
        case 'new':
          // 애니메이션 중 랜덤으로 바뀌는 문자
          tag.style.color = colors[Math.floor(Math.random() * colors.length)]
          break
        case 'done':
        default:
          // 애니메이션이 완료된 문자
          tag.style.color = 'black'
          break
      }
      $target.append(tag)
    }
  },
}).then((text) => {
  // 최종적으로 완성된 텍스트. 일반 글자로 교체해도 됩니다.
  $target.textContent = text
})
```
