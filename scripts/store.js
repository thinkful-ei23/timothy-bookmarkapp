'use strict';


const store = (function(){
  const items = [];
    const filterRating = 0;
    const addItemForm = false;
    const error = null;

    unction addItem(input) {
      Item.create(input);
      this.items = [...this.items, {...input}];
  };
  
  function toggleAddItemForm() {
    this.addItemForm = !this.addItemForm;
};

function setFilterRating(val) {
  this.filterRating = val;
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
   
  function toggleExpanded(id) {
    const currentItem = this.items.find(item => item.id === id);
    currentItem.expanded = !currentItem.expanded;
};
  

  return {
    items,
    filterRating,
    addItemForm,
    error,   
    
    addItem,
    toggleExpanded,
    toggleAddItemForm,
    setFilterRating,
    findAndDelete,
    setError,
    resetError
  };







}());