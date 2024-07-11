# Tables

**Elements**

`<table>` table element
`thead` table header
`tbody` table body
`<tr>` row
`<th>` header
`<td>` data
`<caption>` table description for accessibility

**Properties**

`rows` returns collection of `<tr>` elements
`caption` returns caption
`tFoot` returns reference to `<tFoot>` element
`tHead` returns reference to `<tHead>` element

**Methods**

`createTHead()`
`deleteTHead()`
`insertRow()` inserts row at given index , 0 = at beginning , no index given = at end
`deleteRow()` deletes row at given index , 0 = header , no index given = at end
`createTFoot()`
`deleteTFoot()`
`createCaption()`
`deleteCaption()`

```html
<!--html-->
<section>
  <button onClick="buildTable()">Build Table</button>
  <table id="tableCats">
    <caption>A cute cat table.</caption>
    <thead>
      <tr>
        <th>Name</th>
        <th>Mood</th>
      </tr>
    </thead>
    <tbody id="contentCats">
      <tr>
        <td>Suki</td>
        <td>happy</td>
      </tr>
      <tr>
        <td>Pusheen</td>
        <td>sleepy</td>
      </tr>
    </tbody>
  </table>
</section>
```
```css
//css
caption {
    caption-side: bottom;
}

table {
    margin: 20px auto;
    width: 80%;
    border-spacing: 2px;
    border-radius: 4px;
    border: 1px solid gray;
}

thead {
    color: rgb(100,150,250);
    background: rgb(20,20,20);
}

th {
    line-height: 25px;
}

tbody {
    text-align: center;
}

tbody tr:nth-of-type(odd) {
    background: rgb(100,100,100);
}

tbody tr:nth-of-type(even) {
    background: rgb(80,80,80);
}

tbody tr:hover {
    background: orange;
}
```
```javascript
// javascript

// this append method is not completely working right
function newRow() {
    var table = document.querySelector("#contentCats");
    var aNewRow = document.createElement("row");
    table.append(aNewRow);
}

// these insert and delete are working, but pose a security risk due to innerHTML
function insertRow() {
    var table = document.querySelector("#contentCats");
    var row = table.insertRow(0);
    row.innerHTML = "<td>Hello Kitty</td><td>happy</td>";
}

function deleteRow() {
    var table = document.querySelector("#tableCats");
    console.log(table.rows.length);
    if (table.rows.length > 1) {
        table.deleteRow(-1);
    } else {
        alert("no more rows to delete");
    }
}
```

# Forms

**Structure**

`<form>` element for containing a form
`<label>` contains `for` which matches input `id`
`<input>` contains `type` such as text,number,date,radio,checkbox,email,submit,cancel `id` `name` `value` and `required`
`<fieldset>` for encapsulating labels and inputs as a distinct group
`<legend>` used with `fieldset` to describe the grouped inputs

`<button type="submit">` same as `<input type="submit" value="Submit">`
`<button type="button">` same as `<input type="button value="Cancel">`

**Input Types**

`button`
`checkbox`
`radio`
`password` 
`hidden`
file,image
reset,submit
`color` displays a colour picker
`url`
`email` validates an entered address adds pseudoclasses `:valid` or `:invalid` based on input
`number` mobile gives keyboard , desktop gives arrows , use min max step
`range` same as `number` but uses a slider

`datetime`
`datetime-local`
`date`
`time`

**Attributes**

`autocomplete` on or off
`pattern` use for restricting valid text in an input field `pattern="[A-Za-z]{3}"` only 3 alpha allowed
`placeholder` light value used as an example or to indicate required
`multiple` allows multiple emails to be entered , allows multiple files to be selected

**Tags**

`<output>` displays result passed by `oninput` takes attributes `for` and `name`
`<meter>` displays different colours for given ranges
`<progress>` displays a coloured bar to indicate its value between 0 to 100
`<datalist>` used with `<input>` and `<option>` to give a selection of entries


```html
<!--html-->
<section>
  <form id="theForm">
    <h1>Controls</h1>
      <section id="controls">
      <fieldset>
        <legend>Frequency</legend>
        <ul>
          <li><label for="highF"><input type="radio" id="highF" name="frequency" value="high">High</label></li>
          <li><label for="lowF"><input type="radio" id="lowF" name="frequency" value="low">Low</label></li>
        </ul>
      </fieldset>
      <fieldset>
        <legend>Amplitude</legend>
        <ul>
          <li><label for="highA"><input type="radio" id="highA" name="amplitude" value="high">High</label></li>
          <li><label for="lowA"><input type="radio" id="lowA" name="amplitude" value="low">Low</label></li>
        </ul>
      </fieldset>
      </section>
      <section id="userNameSection">
        <label for="username">User Name <input type="text" id="username" name="name" placeholder="my username is . . ." autocomplete="off" required></label>
      </section>
      <section id="cookiesSection">
        <label for="cookies">How many cookies do you want <input type="number" id="cookies" name="cookies" min="0" max="12" step="2" required></label>
      </section>
      <section id="dateSection">
        <label for="date">Date <input type="date" id="date" name="date" required></label>
      </section>
      <input type="submit" value="Launch">
  </form>
</section>
```

**Validation**

Native Validations
`<input required>` user must fill this field , otherwise submit displays an alert modal

**Submit**

# JSON

JavaScript Object Notation
JSON is a string representation of an object. Represented as key value pairs.
Used for data transmission over the web.

**Methods**

`JSON.stringify(someObj);` turns passed object into a string
`JSON.parse(someJSONstring)`  turns passed JSON string into an object

```javascript
let x1 = 3;
console.log(typeof x1); // number , this is an object
let x2 = JSON.stringify(x1);
console.log(typeof x2); // string , this is a string
let x3 = JSON.parse(x2);
console.log(typeof x3); // number , this is an object
```

JSON strings are not parseable as objects. `.` notation does not work since they are no longer objects.
This means you cannot access their internals since they are simply a string representation.

In order to parse a JSON string it must be turned into a JSON object with `JSON.parse();`.
Then you can access its internal methods objects and other properties.

**Remote Data**

REST API , Application Program Interface where JSON is a common format for data transmission.

Retrieving a JSON File Using Xhr2 API
```html
<section>
  <button onclick="search();">Get JSON info</button>
  <div id="user"></div>
</section>
```
```javascript
function search() {
    var queryURL = "https://rubenasanchez.com"; // need a file location ending in .json
    var xhr = new XMLHttpRequest();
    xhr.open('GET',queryURL,true);
    xhr.onload = function(e) {
        var jsonResponse = this.response;
        var user = JSON.parse(jsonResponse);
        displayUserAsATable(user);
    }
    xhr.onerror = function(err) {
        console.log("Error " + err);
    }
    xhr.send();
}

function displayUserAsATable(user) {
    var userDiv = document.querySelector("#user");
    userDiv.innerHTML = "";
    var table = document.createElement("table");
    user.forEach(function(currentUser) {
      var row = table.insertRow();
      var nameCell = row.insertCell();
      nameCell.innerHTML = currentUser.name;
      var genderCell = row.insertCell();
      genderCell.innerHTML = currentUser.gender;
    });
    userDiv.appendChild(table);
}
```

Retrieving a JSON File Using Fetch API
newer and more flexible
```html
<section>
  <button onclick="search();">Get JSON info</button>
  <div id="user"></div>
</section>
```
```javascript
function search() {
    var queryURL = "https://rubenasanchez.com"; // need a file location ending in .json
    fetch(queryURL)
      .then(function (response) {
        return response.json(); // converts to js object
    })
    .then(function (user) {
      displayUserAsTable(user); // js object
    })
    .catch(function (error) {
      console.log("Error Fetching " + error.message);
    });
}

function displayUserAsATable(user) {
    var userDiv = document.querySelector("#user");
    userDiv.innerHTML = "";
    var table = document.createElement("table");
    user.forEach(function(currentUser) {
      var row = table.insertRow();
      var nameCell = row.insertCell();
      nameCell.innerHTML = currentUser.name;
      var genderCell = row.insertCell();
      genderCell.innerHTML = currentUser.gender;
    });
    userDiv.appendChild(table);
}
```

# Local Storage

`sessionStorage` deleted when the browser closes
`localStorage` deleted when the user deletes it

```javascript
localStorage.name = "Suki";
localStorage.mood = "happy";
localStorage.age = 5;

var catName = localStorage.name;
var catMood = localStorage.mood;
var catAge = localStorage.age;

var location = localStorage.location;

console.log(name);
```

Basic Contact Construction
```javascript
class Contact {
    constructor(name,email) {
        this.name = name;
        this.email = email;
    }
}

var c1 = new Contact("Suki","suki@cutecats.com");
var c2 = new Contact("Pusheen","pusheen@fatcats.com");

console.log(c1.name);  // Suki
console.log(c2.email); // pusheen@fatcats.com
```

Contact List - Displays to Console
```html
<!--html-->

<section>
  <button onclick="search();">Get list of cats</button>
  <div id="contacts"></div>
</section>
```

```javascript
// javascript

class Contact {
    constructor(name,email) {
        this.name = name;
        this.email = email;
    }
}

class ContactManager {
    constructor() {
        this.listOfContacts = []; // property , instantiates an empty list
    }
    empty() {
        this.listOfContacts = []; // method , empties list when called
    }
    add(contact) {
        this.listOfContacts.push(contact); // method , adds new contact to list
    }
    remove(contact) {
        for(let i = 0; i < this.listOfContacts.length; i++) { // method , removes contact
            var c = this.listOfContacts[i];
            if(c.email === contact.email) {
                this.listOfContacts.splice(i,i);
                break;
            }
        }
    }
    
    sort() {  //method needed since the array contains objects and we need to access them
    this.listOfContacts.sort(ContactManager.compareByName);
    }

    static compareByName(c1,c2) { // js compares automatically based on alphabetical order
        if (c1.name < c2.name)    // static makes this a class method that does not depend on instance of ContactManager
            return -1;
        if (c1.name > c2.name)
            return 1;
        return 0;
    }

    displayContactsToConsole() { // utility , displays contact list to console
        if(this.listOfContacts.length === 0) {
            console.log("List is empty");
            return;
        }
        this.listOfContacts.forEach(function(c) {
            console.log(c.name);
        });
    }
    
    load() {
        if(localStorage.contacts !== undefined) { // converts JSON to an object
            this.listOfContacts = JSON.parse(localStorage.contacts);
        }
    }
    
    save() { // converts listOfContacts array into JSON named contacts
        localStorage.contacts = JSON.stringify(this.listOfContacts);
    }
    
    displayContactsAsATable(idOfContainer) {
        let container = document.querySelector("#" + idOfContainer);
        container.innherHTML = "";
        if (this.listOfContacts.length === 0) {
            container.innherHTML = "<p>No contacts to display</p>";
            return;
        }
        let table = document.createElement("table");
        this.listOfContacts.forEach(function(currentContact) {
            let row = table.insertRow();
            row.innerHTML = "<td>" + currentContact.name + "</td>" + "<td>" + currentContact.email + "</td>"
        });
        container.appendChild(table);
    }
}

var cm = new ContactManager();
var c1 = new Contact("Suki","suki@cutecats.com");
var c2 = new Contact("Pusheen","pusheen@fatcats.com");
var c3 = new Contact("Hello Kitty","hellokitty@cutecats.com");
var c4 = new Contact("Miuw Miuw","miuw@cutecats.com");

console.log("--- adding contacts ---");
cm.add(c1);
cm.add(c2);
cm.add(c3);
cm.add(c4);
cm.displayContactsToConsole();
// --- adding contacts ---
// Suki
// Pusheen
// Hello Kitty
// Miuw Miuw

console.log("--- removing last one ---");
cm.remove(c4);
cm.displayContactsToConsole();
// --- removing last one ---
// Suki
// Pusheen
// Hello Kitty

console.log("--- sorting list ---");
cm.sort();
cm.displayContactsToConsole();
// --- sorting list ---
// Hello Kitty
// Pusheen
// Suki

console.log("--- saving contacts to local storage ---");
cm.save();
// --- saving contacts to local storage ---

console.log("--- emptying contact list ---");
cm.empty();
cm.displayContactsToConsole();
// --- emptying contact list ---
// List is empty

console.log("--- loading contacts from local storage ---");
cm.load();
cm.displayContactsToConsole();
// --- loading contacts from local storage ---
// Hello Kitty
// Pusheen
// Suki
```

Contact List - Displays to Table
```html
<!--html-->

<section>
  <button onclick="search();">Get list of cats</button>
  <div id="contacts"></div>
</section>
```
```javascript
// javascript
window.onload = init;

let cm;  // cm as global variable

function init() {
    cm = new ContactManager();
    cm.addTestData();
    cm.displayContactsToConsole();
    cm.displayContactsAsATable("contacts");
}

class Contact {
    constructor(name,email) {
        this.name = name;
        this.email = email;
    }
}

class ContactManager {
    constructor() {
        this.listOfContacts = []; // property , instantiates an empty list
    }
    addTestData() {
        let c1 = new Contact("Suki","suki@cutecats.com");
        let c2 = new Contact("Pusheen","pusheen@fatcats.com");
        let c3 = new Contact("Hello Kitty","hellokitty@cutecats.com");
        let c4 = new Contact("Miuw Miuw","miuw@cutecats.com");
        this.add(c1);
        this.add(c2);
        this.add(c3);
        this.add(c4);
        this.sort();
    }
    empty() {
        this.listOfContacts = []; // method , empties list when called
    }
    add(contact) {
        this.listOfContacts.push(contact); // method , adds new contact to list
    }
    remove(contact) {
        for(let i = 0; i < this.listOfContacts.length; i++) { // method , removes contact
            let c = this.listOfContacts[i];
            if(c.email === contact.email) {
                this.listOfContacts.splice(i,i);
                break;
            }
        }
    }
    
    sort() {  //method needed since the array contains objects and we need to access them
    this.listOfContacts.sort(ContactManager.compareByName);
    }
    
    static compareByName(c1,c2) { // js compares automatically based on alphabetical order
        if (c1.name < c2.name)    // static makes this a class method that does not depend on instance of ContactManager
            return -1;
        if (c1.name > c2.name)
            return 1;
        return 0;
    }

    displayContactsToConsole() { // utility , displays contact list to console
        if(this.listOfContacts.length === 0) {
            console.log("List is empty");
            return;
        }
        this.listOfContacts.forEach(function(c) {
            console.log(c.name);
        });
    }
    
    load() {
        if(localStorage.contacts !== undefined) { // converts JSON to an object
            this.listOfContacts = JSON.parse(localStorage.contacts);
        }
    }
    
    save() { // converts listOfContacts array into JSON named contacts
        localStorage.contacts = JSON.stringify(this.listOfContacts);
    }
    
    displayContactsAsATable(idOfContainer) {
        let container = document.querySelector("#" + idOfContainer);
        container.innherHTML = "";
        if (this.listOfContacts.length === 0) {
            container.innherHTML = "<p>No contacts to display</p>";
            return;
        }
        let table = document.createElement("table");
        this.listOfContacts.forEach(function(currentContact) {
            let row = table.insertRow();
            row.innerHTML = "<td>" + currentContact.name + "</td>" + "<td>" + currentContact.email + "</td>"
        });
        container.appendChild(table);
    }
}
```

Contact List With Buttons
```html
<!--html-->
<section>
  <form onsubmit="return formSubmitted();">
    <fieldset>
      <legend>Contact Cats</legend>
      <label>Name: <input type="text" id="name" ></label>
      <label>Email: <input type="email" id="email" ></label>
      <input type="submit" value="Add new contact">
    </fieldset>
    <button onclick="emptyList();">Empty</button>
    <button onclick="cm.save();">Save</button>
    <button onclick="loadList();">Load</button>
  </form>
</section>
<section>
  <button onclick="search();">Get list of cats</button>
  <div id="contacts"></div>
</section>
```
```javascript
// javascript
window.onload = init;

let cm;  // cm as global variable

function init() {
    cm = new ContactManager();
    cm.addTestData();
    cm.displayContactsToConsole();
    cm.displayContactsAsATable("contacts");
}

class Contact {
    constructor(name,email) {
        this.name = name;
        this.email = email;
    }
}

class ContactManager {
    constructor() {
        this.listOfContacts = []; // property , instantiates an empty list
    }
    addTestData() {
        let c1 = new Contact("Suki","suki@cutecats.com");
        let c2 = new Contact("Pusheen","pusheen@fatcats.com");
        let c3 = new Contact("Hello Kitty","hellokitty@cutecats.com");
        let c4 = new Contact("Miuw Miuw","miuw@cutecats.com");
        this.add(c1);
        this.add(c2);
        this.add(c3);
        this.add(c4);
        this.sort();
    }
    empty() {
        this.listOfContacts = []; // method , empties list when called
    }
    add(contact) {
        this.listOfContacts.push(contact); // method , adds new contact to list
    }
    remove(contact) {
        for(let i = 0; i < this.listOfContacts.length; i++) { // method , removes contact
            let c = this.listOfContacts[i];
            if(c.email === contact.email) {
                this.listOfContacts.splice(i,i);
                break;
            }
        }
    }
    
    sort() {  //method needed since the array contains objects and we need to access them
    this.listOfContacts.sort(ContactManager.compareByName);
    }
    
    static compareByName(c1,c2) { // js compares automatically based on alphabetical order
        if (c1.name < c2.name)    // static makes this a class method that does not depend on instance of ContactManager
            return -1;
        if (c1.name > c2.name)
            return 1;
        return 0;
    }

    displayContactsToConsole() { // utility , displays contact list to console
        if(this.listOfContacts.length === 0) {
            console.log("List is empty");
            return;
        }
        this.listOfContacts.forEach(function(c) {
            console.log(c.name);
        });
    }
    
    load() {
        if(localStorage.contacts !== undefined) { // converts JSON to an object
            this.listOfContacts = JSON.parse(localStorage.contacts);
        }
    }
    
    save() { // converts listOfContacts array into JSON named contacts
        localStorage.contacts = JSON.stringify(this.listOfContacts);
    }
    
    displayContactsAsATable(idOfContainer) {
        let container = document.querySelector("#" + idOfContainer);
        container.innherHTML = "";
        if (this.listOfContacts.length === 0) {
            container.innherHTML = "<p>No contacts to display</p>";
            return;
        }
        let table = document.createElement("table");
        this.listOfContacts.forEach(function(currentContact) {
            let row = table.insertRow();
            row.innerHTML = "<td>" + currentContact.name + "</td>" + "<td>" + currentContact.email + "</td>"
        });
        container.appendChild(table);
    }
}

function formSubmitted() {
    let name = document.querySelector("#name");
    let email = document.querySelector("#email");
    let newContact = new Contact(name.value,email.value); // get values from input fields
    cm.add(newContact);
    name.value = ""; // empties input fields
    email.value = "";
    cm.displayContactsAsATable("contacts"); // display table with new content
    return false; // does not let the browser submit form nor refresh page
}

function emptyList() {
    cm.empty();
    cm.displayContactsAsATable("contacts");
}

function loadList() {
    cm.load();
    cm.displayContactsAsATable("contacts");
}
```

# Files

**Downloding A Sound File**

Example Code

```html
<!DOCTYPE html>
<html lang="en">
 <head>
   <title>XHR2 and binary files + Web Audio API</title>
 </head>
<body>
 <p>Example of using XHR2 and <code>xhr.responseType = 'arraybuffer';</code> to download a binary sound file
and start playing it on user-click using the Web Audio API.</p>
 <p>
 <h2>Load file using Ajax/XHR2 and the arrayBuffer response type</h2>
 <button onclick="downloadSoundFile('http://myserver.com/song.mp3');">
     Download and play example song.
 </button>
 <button onclick="playSound()" disabled>Start</button>
 <button onclick="stopSound()" disabled>Stop</button>
<script>
  // WebAudio context
  var context = new window.AudioContext();
  var source = null;
  var audioBuffer = null;
 
  function stopSound() {
    if (source) {
       source.stop();
    }
  }
 
  function playSound() {
    // Build a source node for the audio graph
    source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = false;
    // connect to the speakers
    source.connect(context.destination);
    source.start(0); // Play immediately.
  }
 
  function initSound(audioFile) {
    // The audio file may be an mp3 - we must decode it before playing it from memory
    context.decodeAudioData(audioFile, function(buffer) {
      console.log("Song decoded!");
      // audioBuffer the decoded audio file we're going to work with
      audioBuffer = buffer;
      // Enable all buttons once the audio file is
      // decoded
      var buttons = document.querySelectorAll('button');
      buttons[1].disabled = false; // play
      buttons[2].disabled = false; // stop
      alert("Binary file has been loaded and decoded, use play / stop buttons!")
    }, function(e) {
       console.log('Error decoding file', e);
    });
  }
 
  // Load a binary file from a URL as an ArrayBuffer.
  function downloadSoundFile(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
 
    xhr.responseType = 'arraybuffer'; // THIS IS NEW WITH HTML5!
    xhr.onload = function(e) {
       console.log("Song downloaded, decoding...");
       initSound(this.response); // this.response is an ArrayBuffer.
    };
    xhr.onerror = function(e) {
      console.log("error downloading file");
    }
 
    xhr.send();
       console.log("Ajax request sent... wait until it downloads completely");
  }
</script>
</body>
</html>
```
Adding a progress bar
```javascript
// progress element
var progress = document.querySelector('#downloadProgress');
 
function downloadSoundFile(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
 
  ...
  xhr.onprogress = function(e) {
    progress.value = e.loaded;
    progress.max = e.total;
  }
  xhr.send();
}
```
There is a `<progress id="someId" value="someValue">` element which is easier to use than an input type element.

**Fetch API**
This may replace the methods above for download and progress requests.

# Drag Items

Adding `draggable='true'` to any visible div makes it draggable.
Adding `ondragstart='dragStartHandler(event)'` to a container div makes any of its contained divs marked draggable fire the event when any of them are dragged.

**Dragging items from one div to another makes use of the clipboard.**
```html
<!--html-->
<section>
  <div id="draggableItems" ondragstart="dragStartHandler(event)" ondragend="dragEndHandler(event)">
    Items:
    <div draggable="true" data-value="items-bat">bat</div>
    <div draggable="true" data-value="items-vampire">vampire</div>
  </div>
  <div id="droppableZone" ondragenter="dragEnterHandler(event)" ondrop="dropHandler(event)" ondragover="dragOverHandler(event)" ondragleave="dragLeaveHandler(event);">Drop Here</div>
    <div id="droppedItems"></div>
</section>
```

```javascript
// javascript
function dragStartHandler(event) {
  event.target.style.opacity = '0.5';
  event.target.classList.add('dragged');
  event.dataTransfer.setData("items",event.target.dataset.value);
  event.dataTransfer.effectAllowed = 'copy';
  console.log('drag start');
}

function dragEndHandler(event) {
  event.target.style.opacity = '1';
  event.target.classList.remove('dragged');
  console.log('drag end');
}

function dragEnterHandler(event) {
  event.target.classList.add('draggedOver');
  event.dataTransfer.dropEffect = 'copy'; // supposed to add a plus sign
  console.log('drag enter');
}

function dragLeaveHandler(event) {
  event.target.classList.remove('draggedOver');
  console.log('drag leave');
}

function dragOverHandler(event) {
  event.preventDefault(); // allows to drop item
  console.log('drag over');
}

function dropHandler(event) {
  event.target.classList.remove('draggedOver');
  console.log('drop');
  var movedItem = document.createElement('div');
  var data = event.dataTransfer.getData("items");
  if (data == 'items-bat') {
    movedItem.textContent = "bat";
  } else if (data == 'items-vampire') {
    movedItem.textContent = "vampire";
  } else {
    movedItem.textContent = "unknown item";
  }
  document.querySelector("#droppedItems").appendChild(movedItem);
}
```

An example code
```javascript
/*<html lang="en">
<head>
 <style>
   .box {
      border: silver solid;
      width: 256px;
      height: 128px;
      margin: 10px;
      padding: 5px;
      float: left;
   }
 </style>
 <script>*/
    function drag(target, evt) {
        evt.dataTransfer.setData("Text", target.id);
    }
    function drop(target, evt) {
        var id = evt.dataTransfer.getData("Text");
        target.appendChild(document.getElementById(id));
        // prevent default behavior
        evt.preventDefault();
    }
/* </script>
</head>
<body>
Drag and drop browser images in a zone:<br/>
   <img src="http://html5demo.braincracking.org/img/logos/chrome1.png" id="cr"      
        ondragstart="drag(this, event)" alt="Logo Chrome">
   <img src="http://html5demo.braincracking.org/img/logos/firefox1.png" id="ff"
        ondragstart="drag(this, event)" alt="Logo Firefox">
   <img src="http://html5demo.braincracking.org/img/logos/ie1.png" id="ie"
        ondragstart="drag(this, event)" alt="Logo IE">
   <img src="http://html5demo.braincracking.org/img/logos/opera1.png" id="op"
        ondragstart="drag(this, event)" alt="Logo Opera">
   <img src="http://html5demo.braincracking.org/img/logos/safari1.png" id="sf"
        ondragstart="drag(this, event)" alt="Logo Safari"><br/>
   <div class="box" ondragover="return false" ondrop="drop(this, event)">
        <p>Good web browsers</p>
   </div>
   <div class="box" ondragover="return false" ondrop="drop(this, event)">
        <p>Bad web browsers</p>
   </div>
</body>
</html>*/
```

**Dragging Files**

No drag start function needed for files since they are normally draggable just like images and text.

Example Code
```
<!DOCTYPE html>
<html lang="en">
 <head>
   <style>
      div {
         height: 150px;
         width: 350px;
         float: left;
         border: 2px solid #666666;
         background-color: #ccc;
         margin-right: 5px;
         border-radius: 10px;
         box-shadow: inset 0 0 3px #000;
         text-align: center;
         cursor: move;
      }
      .dragged {
         border: 2px dashed #000;
         background-color: green;
      }
      .draggedOver {
         border: 2px dashed #000;
         background-color: green;
      }
 
    </style>
    <script>
      function dragLeaveHandler(event) {
          console.log("drag leave");
          // Set style of drop zone to default
          event.target.classList.remove('draggedOver');
      }
      function dragEnterHandler(event) {
          console.log("Drag enter");
          // Show some visual feedback
          event.target.classList.add('draggedOver');
      }
      function dragOverHandler(event) {
          //console.log("Drag over a droppable zone");
          // Do not propagate the event
          event.stopPropagation();
          // Prevent default behavior, in particular when we drop images or links
          event.preventDefault();
      }
      function dropHandler(event) {
          console.log('drop event');
          // Do not propagate the event
          event.stopPropagation();
          // Prevent default behavior, in particular when we drop images or links
          event.preventDefault();
          // reset the visual look of the drop zone to default
          event.target.classList.remove('draggedOver');
          // get the files from the clipboard
          var files = event.dataTransfer.files;
          var filesLen = files.length;
          var filenames = "";
          // iterate on the files, get details using the file API
          // Display file names in a list.
          for(var i = 0 ; i < filesLen ; i++) {
              filenames += '\n' + files[i].name;
              // Create a li, set its value to a file name, add it to the ol
              var li = document.createElement('li');
              li.textContent = files[i].name; document.querySelector("#droppedFiles").appendChild(li);
          }
          console.log(files.length + ' file(s) have been dropped:\n' + filenames);
      }
  </script>
 </head>
<body>
  <h2>Drop your files here!</h2>
  <div id="droppableZone" ondragenter="dragEnterHandler(event)" ondrop="dropHandler(event)"     
                          ondragover="dragOverHandler(event)"   ondragleave="dragLeaveHandler(event)">
     Drop zone
     <ol id="droppedFiles"></ol>
  </div>
 <body>
 <html>
```

# Indexed Database

Client side database that works online and offline. This is a NoSQL database.
Used for cataloging items such as movies, to do lists, notepads, game data such as high scores and levels.

**database** has a name and version
**object store** has a unique name , holds objects as key value pairs
**objects** sorted by keys in ascending order
**cursor** mechanism for iterating over objects within a key range

Example code is at jsbin . com/lawaju/edit?html,css,js,output


