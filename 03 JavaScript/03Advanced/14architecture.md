# Object Oriented

**Object**

A primitive model that contains defined properties.

```js
const pet = {
  id: '1',
  firstName: 'suki',
  lastName: 'bell'
}
```

**Collection**

Array of objects.

```js
const pets = [
  {
    id: '1',
    firstName: 'suki',
    lastName: 'bell'
  },
  {
    id: '2',
    firstName: 'hello',
    lastName: 'kitty'
  },
] 
```

**Interface**

Describes an object.

```js
interface pet = {
  id: '1',
  firstName: 'suki',
  lastName: 'bell'
}
```

**Strong Collection**

```js
const pets:pet[] = [
  {
    id: '1',
    firstName: 'suki',
    lastName: 'bell'
  },
  {
    id: '2',
    firstName: 'hello',
    lastName: 'kitty'
  },
] 
```

**Classes**

Blueprint for an object.

```js
class vipPet implements pet {
  firstName;
  lastName;
  
  constructor(firstName,lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
```

**Concrete Instance**

```js
const superCat = new vipPet('suki','bell');
console.log(superCat.firstName);
console.log(superCat.lastName);
```

# State

**Initial State**

```js
// empty object
const newPet: pet = {
  id: null,
  firstName: '',
  lastName: ''
};

// empty initial state
const initialState: petState = {
  pets,
  currentPet: newPet
};
```

```js
const pets: pet[] = [
  pusheen,
  neko
]
```

