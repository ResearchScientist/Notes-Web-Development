# Flexbox

To use flexbox the container div is assigned `display: flex;`. This changes the default CSS layout from vertical to horizontal. That means all the divs within the container are stacked next to each other instead of on top of each other. All divs inside the container automatically become flex items.

**CONTAINER**

`display`
```css
display: flex;                   /*items stacked next to each other, container reaches full width*/
display: inline-flex;            /*items stacked next to each other, container collapses to only large enough to hold the divs inside it*/
```

`flex-direction`
```css
flex-direction: row;             /*main axis is horizontal from left to right*/
flex-direction: row-reverse;     /*main axis is horizontal from right to left*/
flex-direction: column;          /*main axis is vertical from top to bottom*/
flex-direction: column-reverse;  /*main axis is vertical from bottom to top*/
```

`flex-wrap`
```css
/*when flex items are explicitly given a width , they stretch or collapse to fill the whole width of the container*/

flex-wrap: nowrap; /*flex items do not wrap , default*/
flex-wrap: wrap;   /*flex items wrap to next line when they do not all fit*/
flex-wrap: wrap-reverse;   /*same as wrap but flex items order is reversed*/
```

`justify-content`
```css
/*justifies content along the main axis given by flex-direction*/

justify-content: flex-start; /*items aligned to beginning of container*/
justify-content: flex-end; /*items aligned to end of container*/
justify-content: flex-center; /*items aligned to middle of container*/
justify-content: space-between; /*even space between all items , first and last flush to beginning and end*/
justify-content: space-around; /*even space between all items first and last not flush to beginning and end*/
justify-content: space-even; /*even space between all items*/

/*if flex-direction is column then the container will need an explicit height*/
/*for example setting container {min-heigt: 100vh;} would work*/
```

`align-items`
```css
/*aligns content along the cross axis of the flex-direction*/
/*if flex-direction is row then you still need a height since the cross axis is a column*/
/*for example setting container {min-heigt: 100vh;} will make it work*/

align-items: stretch;      /*items stretch to fill height of container , default*/
align-items: flex-start;   /*items aligned to top*/
align-items: flex-end;     /*items aligned to bottom*/
align-items: center;       /*items centered vertically*/
align-items: baseline;     /*items positioned such that the text is aligned*/

/*also works when flex-direction is column*/

align-items: stretch;      /*items stretch to fill width of container , default*/
align-items: flex-start;   /*items aligned to left*/
align-items: flex-end;     /*items aligned to right*/
align-items: center;       /*items centered horizontally*/
align-items: baseline;     /*items positioned such that the text is aligned*/
```

`align-content`
```css
/*aligns content along the cross axis of the flex direction*/
/*if flex-direction is row then you still need a height since the cross axis is a column*/
/*for example setting container {heigt: 100vh;}*/
/*additionally you need to have multiple divs stacked such as with flex-wrap: wrap; to make it work*/

align-content: stretch;        /*all stacked items are stretched out horizontally and equally*/
align-content: flex-start;     /*all stacked items are positioned at top without stretching , additionaly height for each row is independent of the height of other rows*/
align-content: flex-end;       /*all stacked items are positioned at bottom without stretching , additionaly height for each row is independent of the height of other rows*/
align-content: space-between;  /*equal vertical space between items*/
align-content: space-around;   /*equal vertical space around items*/
align-content: center;         /*aligns stacked items in center vertically*/
```

**FLEX ITEMS**

`align-self`
```css
/*aligns item to given position overriding the global position given by container*/

align-self: center;
align-self: flex-start;
align-self: flex-end;
align-self: stretch;
align-self: space-between;
align-self: space-around;
```

`order`
```css
/*hierarchy system for changing position of items*/

order: 0;  /*no order , default position for all items*/
order: 1;  /*moves item to position after item with order 0*/
order: 2;  /*moves item to position after item with order 1*/
order: -1; /*moves item to position before item with order 0*/
```

`flex`

```css
/*any extra available space is given to items*/
/*space is given in terms of proportions*/

flex: 0; /*items size is set to their content size , default*/
flex: 1; /*items expand to fill container along primary axis*/

/*if each item is set to flex: 1; and one item is set to flex: 2;*/
/*then that item takes up twice as much space as the other items*/

flex: 2; /*this item takes up twice as much space as the others*/
```

```css
flex: 1;        /*this is shorthand , equal to both below*/
flex-grow: 1;   /*expands to fit*/
flex-shrink: 1; /*collapses itself to make room*/

flex-basis: 50%; /*suggested width for div, best to use relative units*/
```

```css
/*you can have items be a certain size which then expands or shrinks when screen is bigger or smaller*/

.container {
    display: flex;
}

.item1 {                /*size is 200px but increases when enough room and shrinks when too small*/
    flex-basis: 200px;
    flex: 1;
}

.item2 {                /*size is 200px but increases when enough room and shrinks when too small*/
    flex-basis: 200px;
    flex: 2;            /*additinaly it grows and shrinks twice as much as item1*/
}

.item3 {                /*size is based on its contents but grows and shrinks based on available space*/
    flex: 3;            /*grows 3 times as much and shrinks 3 times as much as item1*/
}
```

```css
/*shorthand*/

.item1 {
    flex: 1 1 200px;  /*flex-grow , flex-shrink , flex-basis*/
}

.item1 {
    flex: 1 1;  /*flex-grow , flex-shrink*/
}

.item1 {
    flex: 1;  /*flex-grow and flex-shrink*/
}
```

**Tips**
Using `padding` and `border` on flex items will work just fine inside the flexbox container. But using `margin` will not, so you will need to use `calc()` to subtract the margin as needed in width or height.

Using `align-content: center;` and `justify-content: center` centers all items vertically and horizontally. Make sure you are also using `flex-wrap: wrap;`.
