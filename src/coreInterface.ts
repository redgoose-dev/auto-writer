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

export default coreInterface;