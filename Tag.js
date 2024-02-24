export default class Tag {
  constructor(markdownOpener, markdownCloser, htmlOpener, htmlCloser) {
    this.markdownOpener = markdownOpener
    this.markdownCloser = markdownCloser
    this.htmlOpener = htmlOpener
    this.htmlCloser = htmlCloser
  }
}