import * as Rx from 'rxjs'
import { Observable, fromEvent, of } from 'rxjs'
import { switchMap, map, takeUntil, delay, tap } from 'rxjs/operators'

const box = document.getElementById('box') as HTMLElement
const mouseDown$ = fromEvent(box, 'mousedown')
const mouseMove$ = fromEvent(box, 'mousemove')
const mouseUp$ = fromEvent(box, 'mouseup')


mouseDown$.pipe(
  switchMap((event: any) => {
    return of({
      pos: getTranslate(box),
      event
    }).pipe(
      delay(200),
      takeUntil(mouseMove$)
    )
  }),
  switchMap((initialState: any) => {
    const initialPos = initialState.pos
    const { clientX, clientY } = initialState.event
    box.classList.add('blink')
    return mouseMove$.pipe(
      map((moveEvent: any) => ({
        x: moveEvent.clientX - clientX + initialPos.x,
        y: moveEvent.clientY - clientY + initialPos.y
      })),
      takeUntil(mouseUp$.pipe(
        tap(() => () => box.classList.remove('blink'))
      )),
    )
  })
)
.subscribe((pos: any) => {
  setTranslate(box, pos)
})

function getTranslate (element: HTMLElement) {
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

function setTranslate (element: HTMLElement, pos: any) {
  element.style.transform = `translate(${pos.x}px, ${pos.y}px)`
}