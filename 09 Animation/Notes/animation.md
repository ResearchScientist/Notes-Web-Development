# User Experience

Animation is an intrinsic part of the user experience.
It is not added on for visual effect. Instead it is purposeful and designed as such.

# Animation System

Have a unified experience across the animations and brand.
Do this by making a system for cataloging the different timing functions.
Group timing functions based on their purpose and use these consistently across the design.

# Context Switching

Have a transition from one action to the next. Use this to indicate changes in context for the user.

Clicking on small contact me scales up and moves upwards revealing a section with more buttons inside of it to different social media accounts.

# Isolation

Viewing many divs all at once is difficult for the user to focus on.
When they click on one, have the rest dim so they can more easily read its content without distraction from the rest.

# Micro Interactions

Short animations used for the following.

Perceived Performance
- loading bars
- progress indicators

Process Updates
- task completed successfully

State Change
- coloured icons to indicate data entry errors

Draw Attention
- guide user during onboarding
- indicate another user is typing

Form Habits
- clicking like
- consistent interactions

# Duration

**s vs ms**

100ms seems instantaneous to a user.
Up to 1s is slower but still appears connected to a user.

Older people may perceive changes occurring faster at around 700ms while younger people may perceive changes at around 70ms.

> 10s is perceived as disconnected by all.

250ms to 300ms is a good range for most animations.

# Purpose

Use animation to show direction, solidity, momentum.

**State Transitions**

Used for showing changes in states. That is a transition of one state into another.

- navigation between pages
- movement between fields in a form
- task flow location
- visited locations
- current location

**Supplemental Animations**

Accentuates secondary information of main state.

- alerts
- notifications
- updates

**Causal Animations**

Indicates when something has caused something else to happen.
Best for user interactions.

- hover effects
- loaders , spinners

**Decorative Animations**

Do not contribute to conveying any additional information.
Best to leave these out.
Unless there is a compelling reason to use them, such as differentiation.

**Jump Cut**

Changing states without a transition effect.

Cinema has trained viewers by showing an establishing shot and then up close shots of the characters.
Similarly drop down menus can be made to appear instantly but this carries a cognitive load on the user. Better to use in between shots to show the flow of the change. In other words a transition.

**In Betweening**

The addition of all poses between an initial pose and an ending pose. Poses are same as states.

By animating the states the user can continue to focus on their task domain without having to consider the interface domain.

**Animacy**

How alive something seems is due to its colour and movement.

Bright colours and sudden movements capture viewers attention.
Use these sparingly and with intent.

# Animation Types

**Static**
A declared animation which does not require user input while it is running.
- Comprised of predefined sequences.
- Lacks logic rules.

It has a start and a finish.

`start -> finish`

**Stateful**
A declared animation which is triggered upon a user event.
- Operates on boolean input.

Events such as hovers and page changes trigger the animation.
Animation is used to indicate a change of state.
States such as a search state, a pick a picture state, a writing state.

`default state -> event -> predefined state`

**Dynamic**
A new state is generated based on rules and variables.

- No predefined states.
- All states are generated based on input and rules.
- Requires JS.

`current state -> event + factors -> new state`

# Triggering States

**Events**

*browser*
load
scroll

*user*
hover
click

*timed*
timeout
choreography

# Managing States

need to look into this

# Chained Animations

Multiple chained animations can be ran on the same element.
Space second animation to begin after first has completed.

```css
.someElement {
  animation: 
    sequence1 1s 2,
    sequence2 3s 2s infinite;
}
```

# Ease

Rate of change over time.

**Built In Curves**
`linear` constant no change in acceleration
`ease-in` for element exits , animation accelerates
`ease-out` for element entrances , animation decelerates
`ease-in-out` slow at beginning and end , fast in the middle
`steps(n)` n is the number of frames to cut a block of keyframes into, good for spritesheet animations

**Custom Curves**
`cubic-bezier(n1,n2,n3,n4)` 

**User Interaction Response Speed**
Have elements respond quickly to a user's input. Do not add a delay.

If it is a system generated animation such as a pop up alert, have it animate slowly in. This is to not jar the user but to bring their attention to it.

**Attention**
To bring attention to one element vary its ease in relation to the other elements.
If all elements have a sine ease give a bounce ease to the one you want to draw attention to.

# FPS

**Film**
Cinema uses 24 FPS.
Within the frames blur is utilized to convey motion.
A spinning dancer in one frame is drawn with multiple arms at various positions around the dancer to convey motion.
Due to the nature of visual perception this is interpreted not as multiple arms but instead as a fast movement.

**Computer**
Laptops and phones use 60 FPS.
Since blur is not used in these frames in order to convey motion more frames are required.

**VR**
Headsets require at least 90 FPS to maintain fluid motion perception.

**Large Displays**
Huge home monitors will require more than 60 FPS.
Movement that traverses such a large screen area will have many empty spaces between frames that will be noticed by the visual system.


# Transitions

Used for changes of state in one direction. These do not repeat.
If not supported the animation does not happen. But the change to the second state does. Good for backwards compatibility.

`transition: color 2s;`  minimum required attributes are property and duration
`transition-property`
`transition-duration`
`transition-timing-function` ease
`transition-delay`

# CSS Animations

```css
.someElement {
  animation: name duration ease iterationCount delay;
}

@keyframes name {
  to {attribute: value;}
}

@keyframes name {
  0%,100% {color:white;} /* % can share the same attribute changes */
  50% {color:black;}
}
```

`animation-fill-mode: ;` forwards, backwards, both, none
`animation-play-state: ;` running, paused , useful for click events and hover pseudo class

# JS Event Listeners

These fire an event
`animationstart` when animation starts
`animationend` when animation ends
`animationiteration` when animation completes one cycle
`transitionend` when transition ends

Do not use set timeout since the user can change the duration of an animation and set timemout is a constant. It will break.

# Performance

**Layers**

*layout* calculations
*composite* placement
*paint* rendering

# Developer Tools

**Firefox Dev Tools**

*Duration*
Animation tab shows timing durations.
You can slow down and speed up animations.

*Bezier Curve*
Rules tab within the elements attribute transition there is a small icon.
Clicking on it reveals a panel of bezier curve presets and a curve with handles for customizing a curve.

*FPS*
Performance tab , record , reload page , fps graph in green

**Chrome Dev Tools**

*FPS*
Rendering tab , show FPS meter.

*Paint Flashing*
Shows areas of repaints as they happen in real time.
Rendering tab , enable paint flashing.

*Timeline*
Timeline tab , record.
Shows screenshots.
A seesaw patterns indicates a memory issue.

*Animation*
Animation tab shows grouped animations as a screenshot and each includes a bar to move between different points in the animation.

# Libraries

**skrollr**
for animations based on scroll position
works on attributes

**waypoint**
triggers events based on scroll position
exchanges css properties

# Tips

**Timing**
Use ms instead of s since JS uses ms and none of the animations run for s anyways.

**Viewport**
Only animate what is visible. Animations off screen still take up resources.

# Some Useful Example Codes

### Random Function

Helper function for returning random values.

```js
function randomize(min,max) {
  return Math.floor(Math.random() * (1 + max - min) + min);
}
```

### Day to Night Scene

**Overlay**
Use a div to cover the whole scene and change its opacity.
This works as long as user interaction is not needed since the div will cover any divs underneath making them unclickable.

**HSL**
Change the hue of all divs.

### Local Time

`toLocalTimeString();`
Returns local time.
You can use it to make day and night transition animations.

### Gooey Filter

Makes blobs.

```html
<defs>
  <filter id="Blur">
    <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur"></feGaussianBlur>
    <feColorMatrix in="blur" mode="matrix"
    values="1 0 0 0 0 0 0 0 0 1 0 0 0 20 -5" result="goo"></feColorMatrix>
  </filter>
</defs>
```

