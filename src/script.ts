// basic setup
import './base';
//
import { fromEvent, map } from 'rxjs';

const scroll$ = fromEvent(document, 'scroll')

const exctractScrollData = (document: HTMLElement) => ({
    cur: document.scrollTop,
    max: document.scrollHeight - document.clientHeight
})

scroll$
    .pipe(
        map((e: Event & { target: Document }) => e.target.documentElement),
        map(exctractScrollData),
        map((scrollData: {cur: number, max: number}) => scrollData.cur / scrollData.max)
    )
    .subscribe((scrollPercentage: number) => {
        (document.querySelector('#scrollbar') as HTMLElement).style.width = `${100*scrollPercentage}vw`
    })