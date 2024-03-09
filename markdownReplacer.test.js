import markdownReplacer from './markdownReplacer.js'

describe('markdownReplacer', () => {
    test('translates markdown to HTML (italic)', () => {
      const text = '_italic_'
      const expected = '<p><i>italic</i></p>'
      expect(markdownReplacer(text, 0)).toEqual(expected)
    })

    test('translates markdown to HTML (multiple)', () => {
        const text = '_italic_ **bold** `mono`'
        const expected = '<p><i>italic</i> <b>bold</b> <tt>mono</tt></p>'
        expect(markdownReplacer(text, 0)).toEqual(expected)
    })
    
    test('captures preformated text', () => {
        const text = '```\n_italic_\n```'
        const expected = '<p><pre>\n_italic_\n</pre></p>'
        expect(markdownReplacer(text, 0)).toEqual(expected)
    })

    test('splits paragraphs', () => {
        const text = 'text\n\nanother text'
        const expected = '<p>text</p>\n<p>another text</p>'
        expect(markdownReplacer(text, 0)).toEqual(expected)
    })
  
    test('throws error for nested tags', () => {
      const text = '_italic **bold** italic_'
      expect(() => markdownReplacer(text, 0)).toThrow('Nested tags are not allowed')
    })
  
    test('throws error if closing tag appears before opening tag', () => {
      const text = 'text** **bold _italic_'
      expect(() => markdownReplacer(text, 0)).toThrow('Closer before opener')
    })
  
    test('throws error if no closing tag is found', () => {
      const text = '_italic **bold**';
      expect(() => markdownReplacer(text, 0)).toThrow('No closer found')
    })
    
    test('check work with esc codes', () => {
      const text = '_italic_ **bold** `inverted`';
      expect(markdownReplacer(text, 1)).toEqual('Some text') //this will cause error
    })
})