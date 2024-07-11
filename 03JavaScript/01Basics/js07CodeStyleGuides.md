# Block Scope

Maintains variable within assigned scope.
Scope assigned with `{}`. And variable assigned with `let`.

```js
function someFunction(name) {
  {
    let initials;
      initials = name.slice(0,1);
    
  }
  return name, initials
}
```

# Closure

Allows a function to hold a variable even after the function has finished executing.

```js
function ask(question) {
  return function holdYourQuestion() {
    console.log(question);
  };
}

var myQuestion = ask("what is closure?");  // stores result from function ask()

myQuestion();                              // calls variable as function and displays "what is closure?"
```

# This

Implicit Binding
```js
var workshop {
  teacher: "Julie",
  ask(question) {
    console.log(this.teacher, question);
  },
};

workshop.ask("whats implicit binding");  // Julie whats implicit binding
```

Explicit Binding
```js
function ask(question) {
  console.log(this.teacher, question);
}

function otherClass() {
  var myContext = {
    teacher: "Julie"
  };
  ask.call(myContext, "why?");
}

otherClass();  // Julie why?
```

Class
```js
class Workshop {
  constructor(teacher) {
    this.teacher = teacher;
  }
  ask(question) {
    console.log(this.teacher,question);
  }
}

var Jquestion = new Workshop("Julie");
var Vquestion = new Workshop("Val");

Jquestion.ask("how are you?"); // Julie how are you?
Vquestion.ask("are you here?") // Val are you here?
```
