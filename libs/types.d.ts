declare module 'auto-writer' {

  type Stream = (src: object[]|string) => void

  // types
  type typeOptions = {
    text: string
    waitChar?: string
    charSpeed?: number
    moveFix?: number
    moveRange?: number
    moveTrigger?: number
    fps?: number
    pattern?: string
    randomTextType?: 'unicode'|'pattern'|null
    stream?: Stream
  }

  // function
  export default function autoWriter(element: HTMLElement, options?: typeOptions): Promise<void>

}
