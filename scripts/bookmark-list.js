'use strict';
/* global store, $, api  */

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
  function generateBookmarkItemsString(bookmarks) {
      console.log(bookmarks);
    const items = bookmarks.map((item) => generateItemElement(item));
    return items.join('');
  }

  
  function generateExpandedView(item){
    return`
      <li class ="expand-bookmark-view js-expand-bookmark-view" data-item-id="${item.id}">
              <h2>${item.title}</h2>
              <form id="js-close-expanded" class="header-right js-header-right">
        <p class="expanded-stars js-expanded-stars">${item.rating} STAR</p>
          <button class="close-button js-close-button" type="submit">Close</button>
          </form>
          <p class="long-desc js-long-desc">${item.desc}</p>
        <a class="bookmark-link js-bookmark-link" href="${item.url}" target="_blank">${item.url}
        </a>
        <div> 
            <a class="bookmark-link js-bookmark-link" href="${item.url}" target="_blank">
            <button class="visit-site-button js-visit-site-button" >VISIT</button></a>
        </div>
        <form id="js-delete-bookmark">
          <button class="delete-bookmark-button js-item-delete" type="submit" >DELETE</button>
        </form>
      </li>`;
  }
  function generateCreateBookmarkView() {
    return `
    <li class="create-bookmark-view js-create-bookmark-view" aria-live="polite">
      <h2>Create a Bookmark</h2>
        <form for="close-button" id="js-close-expanded" class="close-header-right js-header-right" id="close-button">
          <button class="create-close-button js-close-button" type="submit" >Close</button>
        </form>
        <form id="js-add-bookmark">
          <label for="add-bookmark-title"></label>
          <input class="add-bookmark add-bookmark-title js-add-bookmark-title" id="add-bookmark-title" name="title" type="text" placeholder="title" required >
          <label for="add-bookmark-link"></label>
          <input class="add-bookmark add-bookmark-link js-add-bookmark-link" id="add-bookmark-link" name="url" type="url"  placeholder="http://url-address.com" required>
          <label for="add-bookmark-desc"></label>
          <input class="add-bookmark add-bookmark-desc js-add-bookmark-desc" id="add-bookmark-desc" name="desc" type="text" placeholder="Add long description here" align="top">
          <div id="add-star-rating js-add-star-rating">
            <div class="add-bookmark rate-radio-button js-rate-radio-buttons">
              <fieldset>
                <Legend required>STARS</Legend>
                <label >5</label>
                <input type="radio" id="5-stars"
                  name="rate" value="5" required>
                <label>4</label>
                <input type="radio" id="4-stars"
                  name="rate" value="4">
                <label>3</label>
                <input type="radio" id="3-stars"
                  name="rate" value="3">
                <label>2</label>
                <input type="radio" id="2-stars"
                  name="rate" value="2">
                <label>1</label>
                <input type="radio" id="1-star"
                  name="rate" value="1">
              </fieldset>
            </div>
          </div>
          <div>
            <button class="add-button-submit js-add-button-submit" type="submit">ADD</button>
          </div>
        </form>
      </li>`;
  }


  function handleCreateBookmarkClicked() {
    $('#js-create-bookmark-form').on('submit', (function(event) {
      event.preventDefault();
      store.adding = true;
      render();
    }));
  }
  function handleCloseBookmarkClicked() {
    $('#js-close-expanded').on('click', '.js-bookmark-list-button', event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      let item = store.findById(id);
      store.closing = true;
      if (store.closing && item.id === id) {
        render();
        store.closing = false;
      }
    });
  }

  function handleAddBookmarkClicked() {
    $('#js-add-bookmark').on('submit', (function(event) {
      event.preventDefault();
      const title = event.currentTarget.title.value;
      const url = event.currentTarget.url.value;
      const desc = event.currentTarget.desc.value;
      const rate = event.currentTarget.rate.value;

      api.createItem(title, url, desc, rate, function(response) {
        store.addItem(response);
        store.adding = false;
        render();
      });
    }));
  }

  function handleExpandViewClicked() {
    $('.js-bookmark-list').on('click', '.js-bookmark-list-items', event => {
      const id = getItemIdFromElement(event.currentTarget);
      let item = store.findById(id);
      $(event.currentTarget).remove();
      if(item.id === id) {
        const expandView = generateExpandedView(item);
        $('.js-bookmark-list').prepend(expandView);
        store.expanded = true;
      }
    });
  }
  function handleDeleteItemClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.js-bookmark-list').on('click', '.js-item-delete', event => {
      // get the index of the item in store.items
      const id = getItemIdFromElement(event.currentTarget);
      // delete the item
      api.deleteItem(id, store.findAndDelete(id));
      // render the updated shopping list
      render();
    });
  }
  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-bookmark-list-items')
      .data('item-id');
  }
  function handleFilterByRatingClicked() {
    $('.js-header-select').on('change', function(event) {
      event.preventDefault();
      const val = $(event.currentTarget).val();
      store.filterByRating(val);
      render();
    });
  }
  function render() {
    let items = store.items;
    $('.js-bookmark-list').empty();
   
    if(store.adding) {
      const bookmarkForm = generateCreateBookmarkView();
      $('.js-bookmark-list').prepend(bookmarkForm);
    }
    

    // render the shopping list in the DOM
    console.log('`render` ran');
    const bookmarkItemsString = generateBookmarkItemsString(items);
    // insert that HTML into the DOM
    $('.js-bookmark-list').html(bookmarkItemsString);
  }
  

  function bindEventListeners() {
    
    handleAddBookmarkClicked();
    handleDeleteItemClicked();
    handleExpandViewClicked();
    handleCreateBookmarkClicked();
    handleFilterByRatingClicked();
    handleCloseBookmarkClicked();
  }
  // This object contains the only exposed methods from this module:
  return {
    render,
    bindEventListeners
  };
}());