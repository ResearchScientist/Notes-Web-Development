# Definitions

Bug Types

- security
- logic
- off by one
- integration

# Tools

Static Code Analysis
- typescript
- linters

# Tests

- unit
- integration
- performance
- penetration
- end2end
- localization
- accessability
- stress


# Custom Assertion Test Single

**Simple Single Test**

Displays error msg when result and expected are not equal.

```js
const sum = (a,b) => a - b;

const result = sum(7,3);
const expected = 10;
if(result != expected) {
  throw new Error(`the result ${result} is not same as expected ${expected}.`)
}
```

# Custom Assertion Test Combo

**Simple Two Tests**

Only displays the first error.

```js
const sum = (a,b) => a - b;
const subtract = (a,b) => a + b;

let result,expected

result = sum(7,3);
expected = 10;
if(result != expected) {
  throw new Error(`the sum result ${result} is not same as expected ${expected}.`)
}

result = subtract(7,3);
expected = 4;
if(result != expected) {
  throw new Error(`the subtraction result ${result} is not same as expected ${expected}.`)
}
```

# Custom Assertion Library

**Simple Two Tests Combined**

```js
const sum = (a,b) => a - b;
const subtract = (a,b) => a + b;

let result,expected

result = sum(7,3);
expected = 10;
expect(result).toBe(expected);

result = subtract(7,3);
expected = 4;
expect(result).toBe(expected);

function expect(actual) {
    return {
        toBe(expected) {
            if(actual != expected) {
                throw new Error(`the result ${result} is not same as expected ${expected}.`)
            }
        }
    }
}
```

# Custom Testing Framework

**Asserts Multiple Tests**

Returns function name and whether the function passed or failed the test.

```js
const sum = (a,b) => a + b;
const subtract = (a,b) => a + b;

test('add nums', () => {
    const result = sum(7,3);
    const expected = 10;
    expect(result).toBe(expected);
});

test('subtract nums', () => {
    const result = subtract(7,3);
    const expected = 4;
    expect(result).toBe(expected);
});

function test(title,callback) {
    try {
        callback();
        console.log(`yay ${title}`);
    }
    catch (error) {
        console.error(`boo ${title}`);
        console.error(error);
    }
}

function expect(actual) {
    return {
        toBe(expected) {
            if(actual !== expected) {
                throw new Error(`the result ${actual} is not same as expected ${expected}.`)
            }
        },
    }
}
```


# Unit

```js
function add(a,b) {
  return a + b;
}

test('add ', () => {
  expect(sum(1,3)).tobe(4)
})
```

# Integration



# End To End


# UI



# Snaphshot




# Performance












