'use strict';
/* global $, bookmarkList,store,api */

$(function() {
  bookmarkList.bindEventListeners();

  api.getItems(items => {
    items.forEach(item => store.addItem(item));
    bookmarkList.render();
  });
});
