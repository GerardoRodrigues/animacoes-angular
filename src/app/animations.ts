import { animate, state, style, transition, trigger } from '@angular/animations';

export const highlightedStatedTrigger = trigger('highlightedStated', [
    state('default', style({
      border: '2px solid #B2B6FF'
    })),
    state('highlighted', style({
      border: '4px solid #B2B6FF',
      filter: 'brightness(92%)'
    })),
    transition('default => highlighted', [
      animate('200ms ease-out', style({
        transform: 'scale(1.01)'
      })),
      animate(200)
    ])
  ])

export const shownStateTrigger = trigger('shownState', [
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate(320, style({
            opacity: 1
        }))
    ]),
    transition(':leave', [
        animate(320, style({
            opacity: 0
        }))
    ])
])

export const buttonCheckTrigger = trigger('buttonCheck', [
    transition('* => checked',[
        animate(300, style({
            transform: 'scale(1.4)'
        }))
    ])
])

export const buttonCriarTrigger = trigger('creatButton', [
    state('normal', style({
        transform: 'scale(1)'
    })),
    state('elevado', style({
        transform: 'scale(1.3)'
    })),
    transition('normal => elevado',[
        animate(300)
    ]),
    transition('elevado => normal', [
        animate(300)
    ])
])