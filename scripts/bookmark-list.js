'use strict';
/* global store, $, api */

const bookmarkList = (function(){

  function generateItemElement(item){
        
  }
  function generateBookmarkItemsString(bookmarkList) {
    const items = bookmarkList.map((item) => generateItemElement(item));
    return items.join('');
  }
   
}());