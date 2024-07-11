# CSS Grid

# Container

Setting up the container.
```css
.container {
    display: grid;
    grid-template-columns: 100px auto 100px; /*defines 3 columns where 2 are at 100px and one expands and shrinks according to available width*/
}
```
The above code makes 3 columns. The 10 divs inside the container are placed one div at a time in each column making a new row to accommodate each div.

|1|2|3|
|--|--|--|
|4|5|6|
|7|8|9|
|10|||

The below code makes 3 columns and gives sizing to 3 rows. Which means the 10th item is placed on its own row and that row takes a default size.
```css
.container {
    display: grid;
    grid-template-columns: 100px auto 100px;
    grid-template-rows: 100px 400px 100px;
}
```
`grid-auto-flow: column;` adds extra items to a new column , default is row
`grid-auto-rows: 100px;` defines default size for extra items
`grid-gap: 10px;` space between each item
`repeat(4, 1fr)` shorthand for writing 1fr four times

**FR** fractional units that take into account spacing such as border widths and gaps , use these instead of px

# Items

**Size**
`span` defines how many grids a particular element should take and bumps other elements over
```css
.item2 {
    grid-column: span 2;
    grid-row: span 2;
}
```
**Location and Size**
`start` and `end` define the placement of a particular item based on tracks
```css
/* gives the same result as grid-column: span2 */
.item2 {
    grid-column-start: 2;
    grid-column-end: 4;
}

/* shorthand */
.item2 {
    grid-column: 2/4;
    grid-row: 1/3;
}

/* using -1 spans to last track */
.item2 {
    grid-column: 1/-1;  /* start/end */
}
```

**Number of Rows or Columns**
Use `auto-fill` or `auto-fit` to increase or decrease the number of rows or columns depending on the size of the container.
`auto-fill` adds columns regardless of items as the space increases
`auto-fit` does not add columns when there are not enough items to fill them
```css
.container {
    display: grid;
    grid-template-columns: repeat(auto-fill,100px);
}

.item2 {
    grid-column-end: -1;  /*moves item to end of grid even if no items are in between them*/
}
```

**Responsive Rows or Columns**
Use `minmax()` and `auto-fit` to allow items to expand when there is enough room and wrap when there is not.
`minmax()` takes a min size and a maximum size
```css
.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px,1fr));
}
```

**Grid Template Areas**
Instead of using track numbers you can define names for certain areas and use the names for element placement.
```css
.container {
    display: grid;
    grid-template-columns: 1fr 500px 1fr;
    grid-template-rows: 150px 150px 100px;
    grid-template-areas:
        "sidebar-1 content-1 sidebar-2"
        "sidebar-1 content-1 sidebar-2"
        "footer    footer    footer"
}

.item1 {
    grid-area: sidebar-1;
}

.item2 {
    grid-area: content-1;
}

.item3 {
    grid-area: sidebar-2;
}

.footer {
    grid-area: footer;
}
```

You can add an empty section by using `...`.
```css
.container {
    display: grid;
    grid-template-columns: 1fr 500px 1fr;
    grid-template-rows: 150px 150px 100px;
    grid-template-areas:
        "sidebar-1 ...       sidebar-2"
        "sidebar-1 content-1 sidebar-2"
        "footer    footer    footer"
}
```

With media queries you can change the ordering of the elements.
```css
@media (max-width: 500px) {
.container {
    display: grid;
    grid-template-columns: 1fr 500px 1fr;
    grid-template-rows: 150px 150px 100px;
    grid-template-areas:
        "sidebar-1 sidebar-1 sidebar-1"
        "content-1 content-1 content-1"
        "sidebar-2 footer    footer"
}
```

**Naming Rows and Columns**
Use `[]` to name the rows and columns. You are actually naming the spaces between the rows and columns. Then you can place individual items based on those names.
```css
.container {
    display: grid;
    grid-gap: 20px;
    border: 1px solid black;
    grid-template-columns: [lefSide] 1fr [mainBegin] 10fr [mainEnd] 1fr [rightSide];
    grid-template-rows: [topSide] 150px [mainTop] 150px [mainBottom] 100px [bottomSide];
}

.item3 {
    background: pink;
    grid-column: mainBegin;
    grid-row: topSide / mainBottom;
}
```

`grid-auto-flow: dense;` takes any blank spaces and fills them with items small enough to fit

**Alignment of Items**
Use `justify` to affect items along horizontal axis , rows.
Use `align` to affect items along vertical axis , columns.

> Use `items` when you want to affect all items in a container.

`justify-items:` (stretch is default) start,end,center
`align-items:` (stretch is default) start,end,center

> Use `content` when container is larger than items can fill, for example when you use px for the items instead of fr.

`justify-content:` (start is default) end,center,stretch,space-around,space-between,space-evenly
`align-content:` (stretch is default) start,end,center,space-around,space-between,space-evenly

> Use `self` when you want an individual item to override any other alignment.

`justify-self:` start,end,center,stretch
`align-self:` start,end,center,stretch

Aligns items both vertically and horizontally.
```css
.container {
    display: grid;
    justify-items: center;
    align-items: center;
}
```

Aligns only this item overriding other alignments.
```css
.item2 {
    justify-self: end;
    align-self: end;
}
```

# Moz Dev Tools
Within inspector click on the element grid icon. Within styles select the element you want to inspect. Click on the circle to change the color of its lines. Select all the grid display settings.
