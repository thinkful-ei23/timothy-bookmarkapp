'use strict'
/* global Item */

const store = (function() {
    const items = [];
    const filterRating = 0;
    const addItemForm = false;
    const error = null;

    function findAndDelete(id) {
        this.items = this.items.filter(item => {
            return item.id !== id;
        });
    };

    function setError(error) {
        this.error = error.message;
    };

    function setFilterRating(val) {
        this.filterRating = val;
    };

    function toggleAddItemForm() {
        this.addItemForm = !this.addItemForm;
    };

    function toggleExpanded(id) {
        const currentItem = this.items.find(item => item.id === id);
        currentItem.expanded = !currentItem.expanded;
    };

    function addItem(input) {
        Item.create(input);
        this.items = [...this.items, {...input}];
    };

    function resetError(){
        this.error = null;
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