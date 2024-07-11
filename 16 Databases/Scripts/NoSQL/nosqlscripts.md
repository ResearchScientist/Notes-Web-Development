# Make Many Records

```js
db.pets.insertMany(
    Array.from({length:100}).map((_,index) => ({
        name: ["fluffy","hello kitty","pusheen","jennifer","karen","amber","jane","silly","sky","sea","fire"][index % 9],
        type: ["cat","dog","bird","person"][index % 4],
        age: (index % 18) + 1,
        colour: ["calico","gray","mixed"][index % 3],
        index: index,
    }))
);
```

# Aggregate

```js
db.pets.aggregate([
    {
        $bucket: {
            groupBy: "$age",
            boundaries: [0,3,9,15],
            default: "senior",
            output: {
                count: {$sum:1},
            },
        },
    },
]);
```
