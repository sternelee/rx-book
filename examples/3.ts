import * as Rx from 'rxjs'
import { Observable, fromEvent, from, interval } from 'rxjs'
import { switchMap, map, takeUntil, zip, startWith, mergeMap, tap } from 'rxjs/operators'

const headBox = document.getElementById('head') as HTMLElement
const boxes = document.getElementsByClassName('box')


const mouseDown$ = fromEvent(headBox, 'mousedown')
const mouseMove$ = fromEvent(document, 'mousemove')
const mouseUp$ = fromEvent(document, 'mouseup')
const delayBoxes$ = from([].slice.call(boxes, 0))
  .pipe(
    zip(() => (interval(100)
      .pipe(
        startWith(0)
      )
    )),
    (box) => box
  )

mouseDown$.pipe(
  map((e: any) => {
    const pos = getTranslate(headBox)
    return {
      pos,
      event: e,
    }
  }),
  switchMap((initialState) => {
    const initialPos = initialState.pos
    const { clientX, clientY } = initialState.event
    return mouseMove$.pipe(
      map((moveEvent: any) => ({
        x: moveEvent.clientX - clientX + initialPos.x,
        y: moveEvent.clientY - clientY + initialPos.y,
      })),
      takeUntil(mouseUp$)
    )
  }),
  mergeMap((pos) => {
    return delayBoxes$.pipe(
      tap((box: any) => {
        setTranslate(box, pos)
      })
    )
  })
)
.subscribe()

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

function awaitWrap<T, U = any>(promise: Promise<T>): Promise<[U | null, T | null]> {
  return promise
      .then<[null, T]>((data: T) => [null, data])
      .catch<[U, null]>(err => [err, null])
}