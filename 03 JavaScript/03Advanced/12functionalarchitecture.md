# Semigroups



# Monoids

Semigroup + Identity

Empty
```js
const Product = x => ({
  x,
  concat: other => Product(x * other.x)
})
Product.empty = () => Product(1);

const res = Product.empty().concat(Product(10));
console.log(res);
```

```js
const Sum = x => ({
  x,
  concat: other => Sum(x + other.x)
})
Sum.empty = () => Sum(0);

const res = Sum.empty().concat(Sum(10));
console.log(res);
```


```js
const Any = x => ({
  x,
  concat: other => Any(x || other.x)
})

const res = Any(true).concat(Any(false));
console.log(res); // returns true

const res = Any(false).concat(Any(false));
console.log(res); // returns false
```



