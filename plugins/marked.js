import marked from 'marked'
import highlight from './highlight'
import Config from '../config'
import DOMPurify from 'dompurify'

const languages = [
  'cpp',
  'xml',
  'bash',
  'coffeescript',
  'css',
  'markdown',
  'http',
  'java',
  'javascript',
  'json',
  'less',
  'makefile',
  'nginx',
  'php',
  'python',
  'scss',
  'sql',
  'stylus'
];

const renderer = new marked.Renderer();

marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: (code, lang) => {
    if (languages.includes(lang)) {
      return highlight.highlight(lang, code).value
    }
    return highlight.highlightAuto(code).value
  },
})

const imageParse = (src, title, alt) => {
  if (!src.includes(Config.staticPath)) {
    return `
      <figure class="image-wrapper">
        <div class="progress-image">
          <img
            src="${src}" title="${title || alt || 'shirmy'}" />
        </div>
        <div class="image-caption">
          <span>${title || alt || ''}</span>
        </div>
      </figure>
    `
  }
  return `
    <figure class="image-wrapper">
      <div class="progress-image">
        <img src="${src}-thumbnail" title="${title || alt || 'shirmy'}"
          class="thumbnail"/>
        <img
          data-origin="${src}"
          data-src="${src}-progressive" title="${title || alt || 'shirmy'}"
          class="image-popper real-image"/>
      </div>
      <div class="image-caption">
        <span>${title || alt || ''}</span>
      </div>
    </figure>
  `
}

const linkParser = (href, title, text) => {
  const self = href.substr(0, 1) === '#'
  return `<a href="${href}" target="${self ? '_self' : '_blank'}">${text}</a>`
}

renderer.image = imageParse
renderer.link = linkParser

export default (content) => {
  if (typeof content !== 'string') {
    return ''
  }
  const html = marked(content, { renderer })
  return DOMPurify.sanitize(html)
}
