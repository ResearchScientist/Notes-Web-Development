# Objects

Use dot notation `.` for dealing with strings.
Use bracket notation `[]` for dealing with strings, numbers, variables, expressions, strange characters.

**Declare**

`var cat = {}`

**Assign**

`cat.name = "cutie";`

```js
var cat = {
  "name" : "cutie"
};
```

**Access**

```js
var cat = {};
cat.name = "cutie";
var who = cat.name;
who; // cutie
```

# Arrays

**Declare**

```js
var cat = [];
var say = 'hi';
```

**Assign**

```js
cat.name = "cutie";
cat[say] = 'meow';
```

**Access**

```js
var cat = [];
var say = 'hi';

cat.name = "cutie";

cat[say] = 'meow';

cat.say // meow
```

```js
var cat = [];
cat.name = "cutie";
var who = cat.name;
cat[0]; // cutie
```

# Destructuring

**Declare**

```js
const [first,second] = [true,false];
let [first,second] = [true,false];
var [first,second] = [true,false];
```

```js
const {first,second} = {first: 0 , second: 1};
let {first,second} = {first: 0 , second: 1};
var {first,second} = {first: 0 , second: 1};
```

**Assign**

```js
[first,second] = [true,false];
```

```js
{first,second} = {first: 0 , second: 1};
```

# List Transformation

**Nest**

```js
// non nested
const game = {};

game['players'] = [];

game.players.push({
  name:"neko",
  colour:"black"
});

game.players[1] = {
  name:"gatto",
  colour:"white"
};
```

```js
// nested
const game = {
  'players': [
    {
      name: "neko",
      colour: "black"
    },
    {
      name: "gatto",
      colour: "white"
    }
  ]
}

game['players'] // [{name:"neko",colour:"black"},{name:"gatto",colour:"white"}]
```

**Loop**

FOR
```js
function makeCatObjects(name) {
  return {
    name: name,
    colour: name.split(' ')[1],
    say() {
      console.log("my name is ", name);
    }
  };
};

var cats = ['neko','gatto','suki'];
var catList = [];

for(var i = 0; i < cats.length; i++) {
  catList.push(makeCatObjects(cats[i]));
}
```
