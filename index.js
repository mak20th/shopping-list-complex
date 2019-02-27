/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable no-console */
/*global $ */
'use strict';

const STORE = [//cuid() is a unique identifier for each item to create a link between DOM and actual object
  {id: cuid(), name: "apples", checked: false},
  {id: cuid(), name: "oranges", checked: false},
  {id: cuid(), name: "milk", checked: true},
  {id: cuid(), name: "bread", checked: false}
];


function generateItemElement(item) { //5th, this is used to map over the items in STORE ti generate th item string and .join() them
// in here we set the name, the checked class, and the data attribute for the item's index in STORE. This function takes an element
//from store and add all the html elements and displays the butttons and RETURN it to the calling function
  return `
    <li data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) { //3rd, generate a string representing shopping list items. ShoppingList is the STORE
//we target the element for cloning in this function
  //console.log("Generating shopping list element");
  const items = shoppingList.map((item) => generateItemElement(item));  // 4th  each index element of array represent an item. and we get
  //in return an items array. which we join below whereever there is a space
  return items.join("");
}


function renderShoppingList() { // 1st 
  // render the shopping list in the DOM
  //console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE); // 2nd, generate a string 

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString); //6th, target shoppinglist and set its inner html to the value of shoppinglistitemstring
}


function addItemToShoppingList(itemName) { //9th,  function responsible for updating the store with the new Item
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({id: cuid(), name: itemName, checked: false}); // push new object literal to the store
}

function handleNewItemSubmit() { //7th 
  $('#js-shopping-list-form').submit(function(event) { // listen for new item submission
    event.preventDefault();
    //console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val(); // get the item name
    $('.js-shopping-list-entry').val(''); // clear the text from the input element
    addItemToShoppingList(newItemName); //  8th, add new item to the store 
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemId) { //13th,  responsible for toggling the checked property of an item in the STORE
  console.log("Toggling checked property for item with id " + itemId); // logs the value to the console
  const item = STORE.find(item => item.id === itemId); // use the ID to FIND the right item in STORE and save it in item variable
  item.checked = !item.checked; // whatever the value is of CHECKED key, set the opposite of it.
}


function getItemIdFromElement(item) { // 11th, function to get the item ID
  return $(item) // similar to writing $(event.currentTarget), TURN the ITEM to Jquery object to be able to use the below methods
    .closest('li')
    .data('item-id'); // using the DATA attribute on the DOM element.to FETCH the value from the data-item-id attribute
}

function handleItemCheckClicked() { // 9th, listen for users click on the element
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => { // listen for click event on .js shoppingList, filter the events by
    // .js-item-toggle 
    //console.log('`handleItemCheckClicked` ran');
    const id = getItemIdFromElement(event.currentTarget); //10th, to retreive the items ID in STORE 
    toggleCheckedForListItem(id); //12th, 
    renderShoppingList();
  });
}


function deleteItem(idOfItem){
  let indexOfItem = STORE.findIndex(item => item.id ===idOfItem);
  console.log('item index to be delete is', indexOfItem);
  console.log(' name of item to be deleted is ', STORE[indexOfItem].name);
  STORE.splice(indexOfItem, 1);// 1 specify how many items to be removed. A negative value will delete the last indexed element.
}
    
function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item      
  
  $('.js-shopping-list').on('click','.js-item-delete', function(event){
    const id = getItemIdFromElement(event.currentTarget);
    deleteItem(id);
    renderShoppingList();
  });
  console.log('`handleDeleteItemClicked` ran');         
        
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);