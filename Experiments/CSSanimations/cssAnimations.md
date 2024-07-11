# Performance

Use `transform` for moving elements.

# Inspect

Use chrome developer tools, more tools, animations.
Use this to try out timing variations on multiple elements.

# Properties

`animation` shorthand name,duration,timing,delay,iteration,direction,fill,play
`animation-delay` in s or ms
`animation-direction` normal,reverse,alternate,alternate-reverse
`animation-duration` in s or ms
`animation-fill-mode` forwards,backwards,both
`animation-iteration-count` number of iterations or infinite
`animation-name` name of animation
`animation-play-state` paused , running
`animation-timing-function` ease,ease-in,ease-in-out,linear,cubic-bezier(),steps()

**animation-timing-function**
`ease` start slow, middle fast, end slow (default)
`ease-in` start slow
`ease-out` end slow
`linear` constant speed
`cubic-bezier(x1,y1,x2,y2)` custom speed
`steps(number,direction)` 

**animation-fill-mode**
`forwards` element retains animation style given at end of animation
`backwards` element retains animation style given at 1st keyframe
`both` element retains both styles

**animation-direction**
`normal` from beginning to end
`reverse` from end to beginning
`alternate` direction changes after each iteration (begins forwards)
`alternate-reverse` direction changes after each iteration (begins reverse)

# Keyframes

```html
@keyframes animationName {
    % {css styles}
}
```

# Multiple Animations

Elements can be assigned multiple animations. These are separated by commas.

```html
div {
    animation-name: grow, move;
    animation-duration: .5s, .4s;
    animation-delay: 0s, .5s;
}
```

Or shorthand.

```html
div {
    animation: grow .5s forwards, move .5s .8s forwards;
}
```

# For JavaScript

The following events can be captured with `addEventListener`.

`animationiteration` fires after each iteration
`animationend` fires after animation finishes
`animationstart` fires when animation begins