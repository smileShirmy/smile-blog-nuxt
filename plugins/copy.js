if (process.env.NODE_ENV === 'production') {
  const copyText = () => {
    return `

---------------------
作者：shirmy
链接：${location.href}
来源：https://shirmy.me
商业转载请联系作者获得授权，非商业转载请注明出处。`
  }

  const buildText = content => {
    return content + copyText()
  }

  const buildHtml = content => {
    return content + copyText()
  }

  document.addEventListener('copy', e => {
    if (!window.getSelection) {
      return
    }
    const content = window.getSelection().toString()
    e.clipboardData.setData('text/plain', buildText(content))
    e.clipboardData.setData('text/html', buildHtml(content))
    e.preventDefault()
  })
}
