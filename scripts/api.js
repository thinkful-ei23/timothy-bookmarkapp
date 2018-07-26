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

  const updateItem = function(id, updateData, callback){
    $.ajax({
      url: `${BASE_URL}/items/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data:JSON.stringify(updateData),
      success: callback
       
    });
  };

  const deleteItem = function(id, callback) {
    $.ajax({
      url: `${BASE_URL}/items/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback,
      
    });
  };


  return {getItems , createItem, updateItem, deleteItem };
}() );
