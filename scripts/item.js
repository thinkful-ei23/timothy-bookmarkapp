'use strict';
/* global Item, */

const Item = (function() {
  const create = function(input) {
    return {
      id: input.id,
      title: input.title,
      url: input.url,
      desc: input.desc,
      rating: input.rating,
      expanded: false
    };
  };

  return {
    create
  };
}());