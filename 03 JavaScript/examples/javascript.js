function addBackground() {
    let changeme = document.querySelector('#sectionTitle');
    changeme.className = "sectionStyle";
    changeme.classList.add("sectionStyle");
}


/* SLIDER */

window.onload = slideit();

function slideit() {
  showValue('slider','sliderValue');
  
  /*slider = document.querySelector('#slider');
  slider.addEventListener('oninput',showValue(sliderId,outputId));*/
}

function showValue(sliderId,outputId) {
  var x = document.getElementById(outputId);
  var y = document.getElementById(sliderId);
  x.value = y.value;
  
  
  
}

/*window.onload = loaded();

function loaded() {
    console.log("page loaded");
}*/

//window.onchange = changeBackgroundColor(this.value);

function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
    let output = document.querySelector("#theColour");
    output.innerHTML = "Colour " + color;
}

function smallify() {
    let sbox = document.querySelector("#floatingBox");
    sbox.style.width = "50px";
    sbox.style.height = "50px";
}

function bigify() {
    let sbox = document.querySelector("#floatingBox");
    sbox.style.width = "150px";
    sbox.style.height = "150px";
}

function orangify() {
    let obuttons = document.querySelectorAll("button");
    obuttons.forEach(function(button) {
        button.style.backgroundColor = "orange";
    });
}

// List

function newItem() {
    var newTask = document.createElement('input');
    newTask.style.margin = '10px 0 5px 45px';
    var addTaskButton = document.createElement('button');
    addTaskButton.textContent = "+";
    addTaskButton.addEventListener('click',function() {
        var addTask = document.createElement('input');
        alert("clicked me");
    });
    var holdTask = document.querySelector('#itemToAdd');
    holdTask.append(newTask);
    holdTask.append(addTaskButton);
}

function completed() {
var selectedItems = "";
var mainList = document.querySelector("#theList")
var checkedList = document.querySelectorAll("#theList input:checked");
checkedList.forEach(function(item) {
  selectedItems += item.value + ' ';
  var liParent = item.parentNode;
  liParent.classList.add("itemChecked");
  mainList.removeChild(liParent);
});
  let li = document.createElement('li');
  li.textContent = selectedItems;
  li.style.color = 'rgb(75,75,75)';
  let ul = document.querySelector('#completedList');
  ul.append(li);
}

function reset() {
    var list = document.querySelectorAll("#theList input");
    list.forEach(function(item) {
       item.checked = false;
        var liParent = item.parentNode;
        liParent.classList.remove("itemChecked");
    });
}

// CANVAS
/*
var canvas, ctx, w, h;
var xFace = 150;
var yFace = 150;
var faceSpeed = 1;

window.onload = function canvasing() {
    canvas = document.querySelector("#theCanvas");
    w = canvas.width;  // might be useful
    h = canvas.height; // might be useful
    ctx = canvas.getContext('2d');
    mainLoop();
}

function mainLoop() {
    ctx.clearRect(0,0,w,h);     // clears canvas
    drawHappyFace(xFace,yFace); // draws face
    yFace += faceSpeed;         // changes y position
    if (((yFace + 100)>w)||(yFace<100)) { // changes direction when at wall
        faceSpeed = -faceSpeed;
    }
    requestAnimationFrame(mainLoop); // returns at 60 FPS
}

function drawHappyFace(x,y) {
    ctx.save();
    ctx.translate(x,y); // changes origin
    // face
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(0,0,100,0,2*Math.PI);
    ctx.fill();
    // eyes
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(-35,-20,20,0,2*Math.PI);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(35,-20,20,0,2*Math.PI);
    ctx.fill();
    // mouth
    ctx.fillRect(-20,25,40,20);
    ctx.restore();
}
*/

function buildTable() {
    addLineToTable("Suki","happy");
    addLineToTable("Hello Kitty","excited");
    addLineToTable("Pusheen","sleepy");
    addLineToTable("Cuddles","Happy");
}

function newRow() {
    var table = document.querySelector("#contentCats");
    var aNewRow = document.createElement("row");
    table.append(aNewRow);
}

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

// CONTACT LIST

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

// CANVAS

window.onload = inits;

function inits() {
  aCanvas = document.querySelector("#barPlotCanvas");
  ctx = aCanvas.getContext('2d');
  width = 400;
  height = 400;
  x = 50;
  y = 450;
  values = [1,10,2,30,50,80,20,9,40,30];
  var list = document.querySelector("#sliders");
  var max = getMax(values);
  for (i=0;i<values.length;i++) {
    var input = document.createElement('input');
    var li = document.createElement('li');
    var label = document.createElement('label');
    label.setAttribute('for','id' + i);
    label.textContent = 'value' + i + ' ';
    li.appendChild(label);
    input.setAttribute('type','range');
    input.setAttribute('id','id' + i);
    input.setAttribute('max',max);
    input.value = values[i];
    input.setAttribute('oninput','changeValue(' + i + ') ');
    li.appendChild(input);
    list.appendChild(li);
  }
  makePlot(x,y,width,height,values);
  makePieChart(300,100,90,values);
  makeBrokenLines(40,370,width,height,values);
}

function changeValue(index) {
  var value = document.getElementById("id" + index).value;
  values[parseInt(index)] = parseInt(value);
  ctx.clearRect(0,0,aCanvas.width,aCanvas.height);
  makePlot(x,y,width,height,values);
  makePieChart(300,100,90,values);
  makeBrokenLines(40,370,width,height,values);
}

function getMax(values) {
  var maxValue = 0;
  for (i=0;i<values.length;i++) {
    if (maxValue < values[i])
      maxValue = values[i];
  }
  return maxValue;
}

function drawAxis(width,height,values,maxValue) {
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'black';
  var unit = 1;
  while (maxValue/(unit*10)>1) {
    unit *= 10;
  }
  var yMaxOnAxis = parseInt(maxValue)/unit;
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(0,-height);
  ctx.moveTo(0,0);
  ctx.lineTo(width,0);
  ctx.textAlign = 'left';
  for (i=0;i<=yMaxOnAxis;i++) { // tick marks
    ctx.moveTo(0,-height/yMaxOnAxis*i);
    ctx.lineTo(-5,-height/yMaxOnAxis*i);
    ctx.fillText(i*unit,-25,-height/yMaxOnAxis*i);
  }
  var counter = 0;
  ctx.textAlign = 'center';
  var rectanglesWidth = width/values.length;
  for (i=0;i<=values.length;i++) {
    ctx.moveTo(i*rectanglesWidth,0);
    ctx.lineTo(i*rectanglesWidth,5);
    ctx.fillText(i,i*rectanglesWidth,15);
    counter++;
  }
  ctx.stroke();
}

function makePlot(x,y,width,height,values) {
  ctx.save();
  ctx.translate(x,y); // changes origin to bottom left
  var maxValue = getMax(values);
  var rectWidth = width/parseFloat(values.length);
  var vStep = -height/parseFloat(maxValue);
  ctx.fillStyle = 'green';
  ctx.strokeStyle = 'black';
  for (i = 0; i < values.length; i++) {
    ctx.fillRect(i * rectWidth,0,rectWidth,vStep * values[i]);
    ctx.strokeRect(i * rectWidth,0,rectWidth,vStep * values[i])
  }
  drawAxis(width,height,values,maxValue);
}

function makePieChart(cx,cy,radius,values) {
  ctx.save();
  var sum=0;
  for (var n=0;n<values.length;n++) {
    sum += values[n];
  }
  var red = 0;
  var green = 0;
  var blue = 0;
  var startAngle = 0;
  var endAngle = 0;
  var percent;
  ctx.strokeStyle = 'grey';
  for (var i=0;i<values.length;i++) {
    ctx.beginPath();
    switch (i % 3) {
      case 0:
        red += 80;
        break;
      case 1:
        green += 80;
        break;
      case 2:
        blue += 80;
        break;
      default:
        alert("something went wrong");
        return;
    }
    ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
    percent = values[i]/parseFloat(sum);
    endAngle = startAngle + Math.PI*2*percent;
    ctx.arc(cx,cy,radius,startAngle,endAngle);
    ctx.lineTo(cx,cy);
    startAngle = endAngle;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}

function makeBrokenLines(x,y,width,height,values) {
  ctx.save();
  ctx.translate(x,y);
  var maxValue = getMax(values);
  var hStep = width/parseFloat(values.length);
  var vStep = -height/parseFloat(maxValue);
  ctx.fillStyle = 'black';
  ctx.lineWidth = 1;
  ctx.moveTo(0,0);
  ctx.beginPath();
  for(i=0;i<values.length;i++) {
    ctx.lineTo(i*hStep,vStep*values[i]);
  }
  ctx.stroke();
  for(i=0;i<values.length;i++) {
    ctx.beginPath();
    ctx.arc(i*hStep,vStep*values[i],3,0,2*Math.PI);
    ctx.fill();
  }
  drawAxis(width,height,values,maxValue);
  ctx.restore();
}

var changeColourChoice = document.querySelector("#colourChoice");
var divChangeColour = document.querySelector("#divToColour");
changeColourChoice.addEventListener('input',function(evt) {
  divChangeColour.style.backgroundColor = this.value;
},false);

localStorage.firstName = "Hello";
localStorage.lastName = "Kitty";

var firstname = localStorage.firstName;
var lastname = localStorage.lastName;

console.log(firstname,lastname);

/*  */


