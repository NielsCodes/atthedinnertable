import {
  trigger,
  transition,
  style,
  query,
  group,
  stagger,
  animateChild,
  animate,
  keyframes,
  state
} from '@angular/animations';

const optional = { optional: true };
const routerTiming = 200;

// State 1: desktop
// Width: 40%, min-width: 40%, padding-right: 40px

// State 2: root
// Width: 100%, min-width: 100%, padding: 0

// State 3: detail
// Width: 0, min-width: 0, padding: 0

export const topicListAnimation =

  trigger('topicList', [

    // Desktop state
    state('desktop', style({
      width: '40%',
      minWidth: '40%',
      paddingRight: '40px',
      transform: 'translateX(0)'
    })),

    // Mobile state: list view
    state('root', style({
      opacity: 1,
      transform: 'translateX(0)'
    })),

    // Movile state: detail view
    state('detail', style({
      opacity: 0,
      transform: 'translateX(-100vw)'
    })),

    transition('root <=> detail', animate(`${routerTiming}ms linear`))

  ]);


// State 1: desktop
// Width: 60%, min-width: 60%

// State 2: root
// Width: 0, min-width: 0

// State 3: detail
// Width: 100%, min-width: 100%

export const topicDetailAnimation =

  trigger('topicDetail', [

    state('desktop', style({
      width: '60%',
      minWidth: '60%',
    })),

    state('root', style({
      transform: 'translateX(0)',
      opacity: 0,
      width: 0,
      minWidth: 0,
    })),

    state('detail', style({
      transform: 'translateX(calc(-100vw + 60px))',
      opacity: 1,
      width: '100%',
      minWidth: '100%'
    })),

    transition('root => detail', [

      style({
        width: '100%',
        minWidth: '100%'
      }),

      group([

        query(':leave', [
          animate(`.${routerTiming}s linear`, keyframes([
            style({
              opacity: 1,
              offset: 0
            }),
            style({
              opacity: 0,
              offset: 1
            })
          ]))
        ], optional),
        animate(routerTiming),
      ]),

      query(':leave', style({
        backgroundColor: 'pink',
        width: 0,
        minWidth: 0
      }), optional)

    ]),

    transition('detail => root', [

      group([

        query(':leave', [
          animate(`.${routerTiming}s linear`, keyframes([
            style({
              opacity: 1,
              offset: 0
            }),
            style({
              opacity: 0,
              offset: 1
            })
          ]))
        ], optional),
        animate(routerTiming),
      ]),

      query(':leave', style({
        backgroundColor: 'pink',
        width: 0,
        minWidth: 0
      }), optional),

      style({
        width: '0',
        minWidth: '0'
      }),

    ])


  ]);

export const contributeListAnimation =

  trigger('contributeList', [

    // Desktop state
    state('desktop', style({
      width: '40%',
      minWidth: '40%',
      paddingRight: '40px',
      transform: 'translateX(0)'
    })),

    // Mobile state: list view
    state('root', style({
      opacity: 1,
      transform: 'translateX(0)'
    })),

    // Movile state: detail view
    state('detail', style({
      opacity: 0,
      transform: 'translateX(-100vw)'
    })),

    transition('root <=> detail', animate(`${routerTiming}ms linear`))

  ]);

export const contributeDetailAnimation =

  trigger('contributeDetail', [

    state('desktop', style({
      width: '60%',
      minWidth: '60%',
    })),

    state('root', style({
      transform: 'translateX(0)',
      opacity: 0,
      width: 0,
      minWidth: 0,
    })),

    state('detail', style({
      transform: 'translateX(calc(-100vw + 60px))',
      opacity: 1,
      width: '100%',
      minWidth: '100%'
    })),

    transition('root => detail', [

      style({
        width: '100%',
        minWidth: '100%'
      }),

      group([

        query(':leave', [
          animate(`.${routerTiming}s linear`, keyframes([
            style({
              opacity: 1,
              offset: 0
            }),
            style({
              opacity: 0,
              offset: 1
            })
          ]))
        ], optional),
        animate(routerTiming),
      ]),

      query(':leave', style({
        backgroundColor: 'pink',
        width: 0,
        minWidth: 0
      }), optional)

    ]),

    transition('detail => root', [

      group([

        query(':leave', [
          animate(`.${routerTiming}s linear`, keyframes([
            style({
              opacity: 1,
              offset: 0
            }),
            style({
              opacity: 0,
              offset: 1
            })
          ]))
        ], optional),
        animate(routerTiming),
      ]),

      query(':leave', style({
        backgroundColor: 'pink',
        width: 0,
        minWidth: 0
      }), optional),

      style({
        width: '0',
        minWidth: '0'
      }),

    ])


  ]);
