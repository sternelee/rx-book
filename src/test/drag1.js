const box = document.getElementById('box')
const mouseDown$ = Rx.Observable.fromEvent(box, 'mousedown')
const mouseMove$ = Rx.Observable.fromEvent(document, 'mousemove')
const mouseUp$ = Rx.Observable.fromEvent(document, 'mouseup')

mouseDown$.switchMap((event) => {
  return Rx.Observable.of({
    pos: getTranslate(box),
    event,
  })
  .delay(200)
  .takeUntil(mouseMove$)
})
.switchMap((initialState) => {
  const initialPos = initialState.pos
  const { clientX, clientY } = initialState.event
  box.classList.add('blink')
  return mouseMove$.map((moveEvent) => ({
    x: moveEvent.clientX - clientX + initialPos.x,
    y: moveEvent.clientY - clientY + initialPos.y,
  }))
  .takeUntil(mouseUp$.do(() => box.classList.remove('blink')))
})
.subscribe((pos) => {
  setTranslate(box, pos)
})

function setTranslate (element, pos) {
  box.style.transform = `translate(${pos.x}px, ${pos.y}px)`
}

function getTranslate (element) {
  const style = getComputedStyle(element)
  const regExp = /matrix\((\d+,\s){4}(\d+),\s(\d+)/i
  const result = style.transform.match(regExp)
  if (result) {
    return {
      x: parseInt(result[2], 10),
      y: parseInt(result[3], 10)
    }
  } else {
    return {
      x: 0,
      y: 0
    }
  }
}
