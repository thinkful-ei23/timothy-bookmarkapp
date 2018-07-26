'use strict';
/* global store, $, api */

const bookmarkList = (function(){

  function generateItemElement(item){
       return`
       <li class ="book-list-items js-bookmark-list-items" data-item-id="${item.id}">
       <h3 class="list-title js-list-title">${item.title}</h3>
       <a class="list-link js-list-link" href="${item.url}" target="_blank">${item.url}</a>
       <section class="star-rating js-star-rating">
       <p class="star-number js-star-number">{item.rating} STAR</p>
       </section>
       </li>`;
       
  }
  function generateBookmarkItemsString(bookmarkList) {
    const items = bookmarkList.map((item) => generateItemElement(item));
    return items.join('');
  }
  
  function handleCreateBookmarkClicked() {
    $('#js-create-bookmark-form').on('submit', (function(event) {
      event.preventDefault();
      store.adding = true;
      render();
    }));
  }

}());