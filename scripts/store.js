'use strict';


const store = (function(){
  const addItem = function(item) {
    this.items.push(Object.assign(item, {expanded: false}));
  };
 

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  function filterByRating(val) {
    this.items = this.items.filter( item => {
      return item.rating >= val;
    });
  }


  /*const findAndUpdate = function(id, newData) {
    const itemIndex = this.items.findIndex(item => item.id === id);
    Object.assign(this.items[itemIndex], newData);
  };*/

  return {
    items: [],
    adding: false,


    addItem,
    findById,
    findAndDelete, 
    //findAndUpdate,
    filterByRating
  };







}());