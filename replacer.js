'use strict'

const initialOpeners = [
  new RegExp('(?<=^|\s)_(?=\w)'),
  new RegExp('(?<=^|\s)\*\*(?=\w)'),
  new RegExp('(?<=^|\s)`(?=\w)'),
]

const initialClosers = [
  new RegExp('(?<=\w)_+(?=\s|$)'),
  new RegExp('(?<=\w)\*\*(?=\s|$)'),
  new RegExp('(?<=\w)`(?=\s|$)'),
]

const openers = [
  '<i>',
  '<b>',
  '<tt>',
]

const closers = [
  '</i>',
  '</b>',
  '</tt>',
]

const paragraphOpener = '<p>'
const paragraphCloser = '</p>'
const preformatedInitial = '```'
const preformatedOpener = '<pre>'
const preformatedCloser = '</pre>'


export default (text) => {
  const strings = text.split('\n').split('\r')
  let preFormated = false

  strings.unshift(paragraphOpener)
  strings.push(paragraphCloser)
  for (let i = 0; i < strings.length; i++) {
    const string = strings[i]
    if (string === preformatedInitial) {
      preFormated = !preFormated
      string = preFormated ? preformatedOpener : preformatedCloser
    }
    if (preFormated) continue
    if (string === '') string = paragraphOpener + '\n' + paragraphCloser

    const newString = markdownReplacer(string, initialOpeners, initialClosers, openers, closers)
    if (testForMultiple(newString, initialClosers)) throw new Error('Closing tag before opening tag')
    strings[i] = newString
  }
}

// this function expects four arrays: two of regexps and two of strings
const markdownReplacer = (string, initialOpeners, initialClosers, openers, closers) => {
  // we try to find each tag
  for (let i = 0; i <initialOpeners.length; i++) {
    // each type of tag might be present multiple times in the same string
    openerSearch: while (true) {
      const openerIndex = string.search(initialOpeners[i])
      if (openerIndex === -1) break openerSearch // no opener — no tag of this type present
      const closerIndex = string.search(initialClosers[i])
      if (closerIndex === -1) throw new Error('No closer found')
      if (closerIndex < openerIndex) throw new Error('Closer before opener')
      const stringBetween = stringFromOpener.slice(openerIndex, closerIndex)

      for (let j = i; j < initialOpeners.length; j++) {
        if (initialOpeners[j].test(stringBetween)) throw new Error('Nested tags are not allowed')
      }

      string = string.replace(stringBetween, openers[i])
      string = string.replace(initialClosers[i], closers[i])
    }
  }

  return string
}

const testForMultiple = (string, regexps) => {
  for (let i = 0; i < regexps.length; i++) {
    if (regexps[i].test(string)) return true
  }
  return false
}