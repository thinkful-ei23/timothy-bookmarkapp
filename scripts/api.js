'use strict';
/* global $ */
const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/timothy';
  let getItems = function(callback){
    $.getJSON(`${BASE_URL}/bookmarks`,callback);
  };
  const createItem = function(title, url, desc, rating, callback){
    const newItem = JSON.stringify(
      {
        title:title,
        url:url,
        desc:desc,
        rating:rating
      });
  };
  return {getItems , createItem, updateItem, deleteItem };
}() );