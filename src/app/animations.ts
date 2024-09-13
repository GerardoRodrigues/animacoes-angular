import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

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

export const filterTrigger = trigger('filterAnimation', [
    transition(':enter', [
        style({opacity: 0, with: 0}),
        animate('500ms ease-out', keyframes([
            style({offset: 0, opacity: 0, with: 0}),
            style({offset: 0.6, opacity: 0.5, with: '*', backgroundColor: 'lightgreen'}),
            style({offset: 1, opacity: 1, with: '*'})
        ]))
    ]),
    transition(':leave', [
        animate('500ms cubic-bezier(.17,.67,.93,.55)', keyframes([
            style({offset: 0, opacity: 1, with: '*'}),
            style({offset: 0.5, opacity: 0.5, with: '*'}),
            style({offset: 0.8, opacity: 0, with: 0, backgroundColor: 'rgb(252, 67, 67)'})
        ]))
    ])
])