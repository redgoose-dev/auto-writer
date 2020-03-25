# Auto Writer

글이 쓰여지는 애니메이션 툴입니다.

## installation

npm

```shell script
npm install auto-writer
```

yarn

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
autoWriter.run('message text', (res, id) => {
  console.log(res, id);
});
```

함수로 바로 사용합니다.
```javascript
import * as AutoWriter from 'auto-writer';

AutoWriter.wrap('message text', {
  speed: 2,
  // ...options
}, function(res, id) {
  console.log(res, id);
});
```

## options

## callback parameter

## methods
