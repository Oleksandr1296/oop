class Item {
  constructor(nameItem, _place, _price, _weigh) {
    this.name = nameItem;
    this.place = _place;
    this.price = _price;
    this.weigh = _weigh;
  }

  getPrice (){
    return this.price;
  }
  getWeigh (){
    return  this.weigh;
  }
  
  getBillForItem() {
    return (this.price * this.weigh);
  }
  static addToBasket (arr){
    let visibelTable = document.getElementById('basket');
    visibelTable.classList.remove('visibil-of');
    visibelTable.classList.add('visibil-on');
    let numberItem=0;
    let weighItem = document.getElementById(event.target.id + "-weight").value;
    for(let i=0;i< arr.length;i++){
      if (!items[i].name.toLowerCase().indexOf(event.target.id.toLowerCase())){
        numberItem = i;
      }
    }
    var table = document.querySelector('tbody');
    var newRow = document.createElement('tr');
    console.log(event.target.id.toLowerCase());
    newRow.innerHTML += `<td>${event.target.id.toLowerCase()}</td>`;
    newRow.innerHTML += `<td>${items[numberItem].getPrice()}</td>`;
    newRow.innerHTML += `<td>${weighItem *items[numberItem].getWeigh() }</td>`;
    newRow.innerHTML += `<td>${weighItem *items[numberItem].getBillForItem() }</td>`;
    table.appendChild(newRow);
  }
  static serchItem() {
    let searchItem = document.getElementById('input-serch');
    var searchRes = false;
    for (var i = 0; i < items.length; i++) {
      if (!items[i].name.toLowerCase().indexOf(searchItem.value.toLowerCase())) {
        if (window.localStorage.getItem('element') !== null) {
          let element = document.getElementById(window.localStorage.getItem('element'));
          element.classList.remove('visibil-on');
          element.classList.add('visibil-of');
        }
        let element = document.getElementById(items[i].place);
        window.localStorage.setItem('element', items[i].place);
        element.classList.add('visibil-on');
        element.classList.remove('visibil-of');      
        searchRes = true;
      }
    }
    if (!searchRes) {
      alert('Sorry,' + searchItem.value + ' not found!');
    }
  }
}

var items = [new Item('Potato', 'Department-of-Vegetables', 3, 7),
new Item('Tomato', 'Department-of-Vegetables', 5, 6),
new Item('Carrot', 'Department-of-Vegetables', 7, 7),
new Item('Kale', 'Department-of-Vegetables', 17, 7),
new Item('Onion', 'Department-of-Vegetables', 12, 7),
new Item('Apple', 'Department-of-Fruit', 23, 7),
new Item('Orange', 'Department-of-Fruit', 43, 7),
new Item('Cherry', 'Department-of-Fruit', 11, 7),
new Item('Pear', 'Department-of-Fruit', 15, 7),
new Item('Lemon', 'Department-of-Fruit', 17, 7),
new Item('Candy', 'Department-of-Sweets', 18, 7),
new Item('Muffin', 'Department-of-Sweets', 26, 7),
new Item('Crepe', 'Department-of-Sweets', 30, 7),
new Item('Doughnut', 'Department-of-Sweets', 45, 7),
new Item('Croissant', 'Department-of-Sweets', 7, 7),
];
function createMarcet(arr) {
  for (var i = 0; i < arr.length; i++) {
    var departmen = document.getElementById(arr[i].place);

    if (!document.getElementById(arr[i].place)) {
      let newDepartmen = document.createElement('div');
      newDepartmen.setAttribute('id', arr[i].place);
      newDepartmen.setAttribute('class', 'visibil-of items');

      let parent = document.getElementById("market");
      parent.insertAdjacentElement('beforeend', newDepartmen);
      let newElementDepartmen = document.createElement("button");
      newElementDepartmen.setAttribute('class', 'button-departmen');
      newElementDepartmen.setAttribute('name', arr[i].place);
      newElementDepartmen.setAttribute('onclick', 'visibel(event)');

      newElementDepartmen.innerText = arr[i].place;
      parent = document.getElementById('department');
      parent.insertAdjacentElement('beforeend', newElementDepartmen);
    }

    let newItems = document.createElement('div');
    newItems.innerHTML = arr[i].name;
    newItems.setAttribute('class', 'item ' + arr[i].name.toLowerCase());
    let parent1 = document.getElementById(arr[i].place);
    parent1.appendChild(newItems);
    let divItem = document.createElement("div");
    divItem.setAttribute('class', arr[i].name.toLowerCase() + '-img');
    divItem.classList.add('imags');
    newItems.insertAdjacentElement('beforeend', divItem);
    let divAtribut = document.createElement('div');
    divAtribut.setAttribute('id', 'atribut');
    divAtribut.setAttribute('class', 'atribut');
    newItems.insertAdjacentElement('beforeend', divAtribut);
    var elementPrice = document.createElement('h5');
    elementPrice.innerText = arr[i].price + ' $';
    divAtribut.insertAdjacentElement('beforeend', elementPrice);
    var elementInput = document.createElement('input');
    elementInput.setAttribute('class', 'input');
    elementInput.setAttribute ('id',arr[i].name + "-weight")
    elementInput.setAttribute('type', 'number');
    elementInput.setAttribute('value', '5');
    elementInput.setAttribute('min', '1');
    elementInput.setAttribute('max', '100');
    divAtribut.insertAdjacentElement('beforeend', elementInput);

    var elementButton = document.createElement('button');
    elementButton.setAttribute('id', arr[i].name);
    elementButton.setAttribute('class', 'button-item');
    elementButton.setAttribute('onclick', 'Item.addToBasket(items)');
    divAtribut.insertAdjacentElement('beforeend', elementButton);
  }

}
function visibel(event) {
  if (window.localStorage.getItem('element') !== null) {
    let element = document.getElementById(window.localStorage.getItem('element'));
    element.classList.remove('visibil-on');
    element.classList.add('visibil-of');
  }
  let element = document.getElementById(event.target.name);
  window.localStorage.setItem('element', event.target.name);
  element.classList.remove('visibil-of');
  element.classList.add('visibil-on');
}
createMarcet(items);


