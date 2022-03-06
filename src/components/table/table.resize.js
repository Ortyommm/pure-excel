import {$} from '../../core/dom'

export default function resizeHandler($root, event) {
  console.log({event})
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type=resizable]')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize
  let value

  $resizer.css({
    opacity: 1,
    bottom: '-100vh',
    right: '-100vw'
  })
  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = e.pageX - coords.x
      $resizer.css({
        right: `${-delta}px`
      })
    } else {
      const delta = e.pageY - coords.bottom
      value = e.pageY - coords.y
      $resizer.css({
        bottom: `${-delta}px`
      })
    }
  }
  document.onmouseup = () => {
    $resizer.css({
      opacity: '',
      bottom: '0',
      right: '0'
    })
    if (type === 'col') {
      $parent.css({width: `${value}px`})
      $root
        .findAll(`[data-col="${$parent.data.col}"]`)
        .forEach((el) => (el.style.width = `${value}px`))
    } else {
      $parent.css({height: `${value}px`})
      $root
        .findAll(`[data-col="${$parent.data.col}"]`)
        .forEach((el) => (el.style.height = `${value}px`))
    }

    document.onmouseup = document.onmousemove = null
  }
}
