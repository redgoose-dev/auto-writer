interface coreInterface {
  engine?: string;
  speed?: number;
  speedNext?: number;
  offset?: number;
  shuffle?: boolean;
  pattern?: string;
  firstChar?: string;
  firstCharOffset?: number;
  exclude?: Array<string>;
  colors?: Array<string>;
  output?: string;
}

class core {

  private readonly name: string = 'AutoWriter';
  private readonly useRequestAnimation: boolean;
  private keyword: Array<string>; // 텍스트 원본
  private newKeyword: Array<string>; // 새로 만들어지는 텍스트
  private keywordAddress: Array<number>; // 플레이되는 키 순서목록
  private options: coreInterface; // 사용자 옵션들
  private frame: number = 0;
  private characterFrame: number = 0;
  private tickFrame: number = 0;
  private fn: Function;
  private requestId: any = undefined; // `requestAnimationFrame`, `setInterval`에서의 id값

  constructor(options: coreInterface)
  {
    // merge options
    this.updateOptions(options);
    // check environment
    this.useRequestAnimation = !(options.engine && options.engine === 'setInterval');
    this.useRequestAnimation = !!(window && window.requestAnimationFrame) ? this.useRequestAnimation : false;
  }

  /**
   * tick
   * 특정 타이밍에 문자를 변하게 하기위한 처리
   */
  private tick(): void
  {
    if (this.characterFrame >= this.keyword.length) return;
    if (this.frame > 0)
    {
      if (!(this.frame % (this.options.speed * this.options.speedNext)))
      {
        this.nextCharacter();
      }
      if (!(this.frame % this.options.speed))
      {
        this.tickFrame++;
        this.make();
      }
    }
    this.frame++;
    if (this.useRequestAnimation)
    {
      this.requestId = window.requestAnimationFrame(this.tick.bind(this));
    }
  }

  /**
   * make
   * 문자를 만드는 과정
   */
  private make(): void
  {
    let colors = Array(this.keyword.length).fill(undefined);
    let offset = this.options.offset <= 0 ? this.keyword.length : this.options.offset;
    let offsetChar = (this.options.firstCharOffset > this.options.offset) ? this.options.firstCharOffset - this.options.offset : 0;
    if (this.characterFrame + offset > this.keyword.length)
    {
      offset = offset + (this.keyword.length - (this.characterFrame + offset));
    }
    for (let i=0; i<offset; i++)
    {
      this.newKeyword[this.keywordAddress[i]] = this.randomWord();
      if (offsetChar > 0 && this.keywordAddress[i+offsetChar]) this.newKeyword[this.keywordAddress[i+offsetChar]] = this.options.firstChar;
      let ran = Math.floor(Math.random() * this.options.colors.length);
      colors[this.keywordAddress[i]] = this.options.colors[ran];
    }

    switch (this.options.output)
    {
      case 'object':
        this.fn(this.newKeyword.map((str: string, n: number) => ({
          label: str,
          color: colors[n],
        })));
        break;
      case 'string':
      default:
        this.fn(this.newKeyword.join(''));
        break;
    }
  }

  /**
   * next character
   *
   * 다음 문자로 넘어가기위한 준비작업
   */
  private nextCharacter()
  {
    this.newKeyword[this.keywordAddress[0]] = this.keyword[this.keywordAddress[0]];
    this.keywordAddress.shift();
    this.characterFrame++;
  }

  /**
   * get random word
   * 무작위 문자를 가져온다.
   *
   * @return {string}
   */
  private randomWord(): string
  {
    const randomNumber = Math.floor(Math.random() * this.options.pattern.length);
    return this.options.pattern.substring(randomNumber, randomNumber + 1);
  }

  /**
   * update options
   * 옵션을 업데이트한다.
   *
   * @param {coreInterface} options
   */
  public updateOptions(options: coreInterface = {})
  {
    this.options = Object.assign({
      speed: 2,
      speedNext: 4,
      shuffle: false,
      offset: 2,
      firstChar: '-',
      firstCharOffset: 4,
      exclude: [],
      pattern: 'abcdefghijklmnopqrstuvwxyz0123456789-_!@#$%^&*()+~<>', // 랜덤으로 반하는 문자의 목록
      colors: [
        '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
        '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
        '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800',
        '#ff5722', '#795548', '#9e9e9e', '#607d8b',
      ],
      output: 'string',
    }, options);
  }

  /**
   * run animation
   * 애니메이션 실행
   *
   * @param {string} keyword
   * @param {Function} callback 매번 실행되는 콜백함수
   */
  public run(keyword:string, callback:Function = null): void
  {
    if (this.requestId) this.stop(this.requestId);
    this.fn = callback;
    this.keyword = Array.from(keyword);
    if (this.options.firstCharOffset > 0)
    {
      // offset 적용
      this.newKeyword = new Array(this.keyword.length).fill('').map((o: string, idx: number) => {
        return idx < this.options.firstCharOffset ? this.options.firstChar : '';
      });
    }
    else
    {
      this.newKeyword = new Array(this.keyword.length).fill(this.options.firstChar);
    }
    this.keywordAddress = [];
    this.frame = 0;
    this.characterFrame = 0;
    this.tickFrame = 0;
    this.keyword.forEach((str: string, key: number) => {
      if (this.options.exclude && this.options.exclude.length && this.options.exclude.indexOf(str) >= 0)
      {
        this.newKeyword[key] = this.keyword[key];
      }
      else
      {
        this.keywordAddress.push(key);
      }
    });
    // set shuffle
    if (this.options.shuffle)
    {
      this.keywordAddress.sort(() => 0.5 - Math.random());
    }
    // play animation
    if (this.useRequestAnimation)
    {
      this.requestId = window.requestAnimationFrame(this.tick.bind(this));
    }
    else
    {
      this.requestId = setInterval(() => this.tick(), 1);
    }
  }

  /**
   * stop
   * 애니메이션 정지
   *
   * @param id
   */
  public stop(id: any)
  {
    if (!id) return;
    if (this.useRequestAnimation) window.cancelAnimationFrame(id);
    else clearInterval(id);
  }

  /**
   * update request id
   * 이전 애니메이션 취소를 위하여 `requestId`값을 업데이트 한다.
   *
   * @param {number} id
   */
  public updateRequestId(id: any):void
  {
    if (id) this.requestId = id;
  }

}

/**
 * auto writer wrapper
 * 함수로 바로 사용하기위한 래퍼
 *
 * @param {string} keyword
 * @param {object} options
 * @param {Function} callback
 * @param {core} instance
 * @return {core}
 */
function wrap(keyword?: string, options?: coreInterface, callback: Function = null, instance:any = null): core
{
  if (!instance) instance = new core(options);
  instance.run(keyword, callback);
  return instance;
}

export default {
  core,
  wrap,
};