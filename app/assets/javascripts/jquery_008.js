/*
 * Instagram jQuery plugin
 * v0.2.1
 * http://potomak.github.com/jquery-instagram/
 * Copyright (c) 2012 Giovanni Cappellotto
 * Licensed MIT
 */

(function ($){
  $.fn.instagram = function (options) {
    var that = this,
        apiEndpoint = "https://api.instagram.com/v1",
        settings = {
            hash: null
          , userId: null
          , locationId: null
          , search: null
          , accessToken: null
          , clientId: null
          , show: null
          , onLoad: null
          , onComplete: null
          , maxId: null
          , minId: null
          , next_url: null
          , image_size: null
          , photoLink: true
          , template : '<a href="{url}">{img}<span>{likes}</span></a>'
          , reset : false
        };
        
    options && $.extend(settings, options);
    
    function createPhotoElement(photo) {
      var image_url = photo.images.thumbnail.url;
      
      if (settings.image_size == 'low_resolution') {
        image_url = photo.images.low_resolution.url;
      }
      else if (settings.image_size == 'thumbnail') {
        image_url = photo.images.thumbnail.url;
      }
      else if (settings.image_size == 'standard_resolution') {
        image_url = photo.images.standard_resolution.url;
      }

      /*
      var innerHtml = $('<img>')
        .addClass('instagram-image')
        .attr('src', image_url);
       
      if (settings.photoLink) {
        innerHtml = $('<a>')
          .attr('target', '_blank')
          .attr('data-url', photo.link)
          .attr('href', photo.images.standard_resolution.url)
          .append(innerHtml);
      }
      */
      
      var template = settings.template
      					.replace('{likes}',photo.likes.count)
      					.replace('{comments}',photo.comments.count)
      					.replace('{url}',photo.images.standard_resolution.url)
      					.replace('{img}','<img class="instagram-image" src="'+image_url+'">')

      return  $(template)
        .attr('id', photo.id)
        .data('insta_url',photo.link)
        .data('text',photo.caption.text)
        .data('likes',photo.likes.count)
        .data('comments',photo.likes.comments)

      /*
      return $('<div>')
        .addClass('instagram-placeholder')
        .attr('id', photo.id)
        .data('insta_url',photo.link)
        .data('text',photo.caption.text)
        .data('likes',photo.likes.count)
        .append(innerHtml)
        .append('<span>'+(photo.likes.count)+'</span>');
       */
    }
    
    function createEmptyElement() {
      return $('<div>')
        .addClass('instagram-placeholder')
        .attr('id', 'empty')
        .append($('<p>').html('No photos for this query'));
    }
    
    function composeRequestURL() {

      var url = apiEndpoint,
          params = {};
      
      if (settings.next_url != null) {
        return settings.next_url;
      }

      if (settings.hash != null) {
        url += "/tags/" + settings.hash + "/media/recent";
      }
      else if (settings.search != null) {
        url += "/media/search";
        params.lat = settings.search.lat;
        params.lng = settings.search.lng;
        settings.search.max_timestamp != null && (params.max_timestamp = settings.search.max_timestamp);
        settings.search.min_timestamp != null && (params.min_timestamp = settings.search.min_timestamp);
        settings.search.distance != null && (params.distance = settings.search.distance);
      }
      else if (settings.userId != null) {
        url += "/users/" + settings.userId + "/media/recent";
      }
      else if (settings.locationId != null) {
        url += "/locations/" + settings.locationId + "/media/recent";
      }
      else {
        url += "/media/popular";
      }
      
      settings.accessToken != null && (params.access_token = settings.accessToken);
      settings.clientId != null && (params.client_id = settings.clientId);
      settings.minId != null && (params.min_id = settings.minId);
      settings.maxId != null && (params.max_id = settings.maxId);
      settings.show != null && (params.count = settings.show);
      params.count = params.count + 5
      

      url += "?" + $.param(params)
      
      console.log(url)
      
      return url;
    }
    
    settings.onLoad != null && typeof settings.onLoad == 'function' && settings.onLoad();
    
    $.ajax({
      type: "GET",
      dataType: "jsonp",
      cache: false,
      url: composeRequestURL(),
      success: function (res) {
      
        var length = typeof res.data != 'undefined' ? res.data.length : 0;
        var limit = settings.show != null && settings.show < length ? settings.show : length;
        
        if (limit > 0) {
          if(settings.reset)
        		that.html('')
          for (var i = 0; i < limit; i++) {
          	if(i <= settings.show)
	            that.append(createPhotoElement(res.data[i]));
          }
        }
        else {
          that.append(createEmptyElement());
        }

        settings.onComplete != null && typeof settings.onComplete == 'function' && settings.onComplete(res.data, res);
      }
    });
    
    return this;
  };
})(jQuery);
