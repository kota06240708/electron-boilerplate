declare var env: string
declare module 'electron-connect'

interface Document {
  createStyleSheet: any
  cssText: string
}

interface EventTarget {
  getAttribute: any
  parentNode: HTMLElement
  nextElementSibling: HTMLElement
  currentTarget: any
}

interface Element {
  style: any
  parentNode: any
  nextElementSibling: any
}
1
