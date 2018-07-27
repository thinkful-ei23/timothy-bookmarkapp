'use strict';
/* global $, */
const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/timothy';
  
  const getItems = function(callback){
    $.getJSON(`${BASE_URL}/bookmarks`,callback);
  };
  
  const createItem = (data, onSuccess, onError) => {
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: onSuccess,
      error: onError
    });
  };

  const findAndDelete = (id, onSuccess) => {
    $.ajax({
     url: `${BASE_URL}/bookmarks/${id}`,
        method: 'DELETE',
        success: onSuccess
    });
};


  return {getItems , createItem, findAndDelete };
}() );
