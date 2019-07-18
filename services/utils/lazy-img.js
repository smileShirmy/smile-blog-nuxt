/**
 * 图片懒加载
 */
function getImgs(el) {
  const imgs = Array.from(document.querySelectorAll(el))
  imgs.forEach(v => io.observe(v))
}

function loadImg(el) {
  if (!el.src) {
    el.src = el.dataset.src
  }
}

const io = new IntersectionObserver(entries => {
  entries.forEach(item => {
    const el = item.target
    const intersectionRatio = item.intersectionRatio
    if (intersectionRatio > 0 && intersectionRatio <= 1) {
      loadImg(el)
    }
    el.onload = () => {
      el.classList.add('loaded')
      el.previousElementSibling.classList.add('hidden');  // 图片加载后隐藏缩略图
      io.unobserve(el)
    }
    el.onerror = () => io.unobserve(el)
  })
})

export default getImgs
