const Cookienator = (function() {
  // New Error message.
  var error = new Error();
  /**
   * Get formated time.
   * @param  {integer}    days    Days, which will be transfered to full formated date.
   * @return {string}             String with formated date.
   */
  var getDays = function(days) {
    var d = new Date();
    d.setTime( d.getTime() + ( days*24*60*60*1000 ) );
    d.toUTCString();
    return d;
  }
  /**
   * Simple function for retrieving all cookies.
   * @return    {array}     Array of cookies set in browser.
   */
  var getCookies = function() {
    // Array of cookies
    var cookies = document.cookie.split('; ');
    return cookies;
  }
  /**
   * Set a new cookie to browser.
   * @param  {string}     name      Name of new cookie.
   * @param  {string}     value     Value for new cookie.
   * @param  {integer}    expire    Days to expire. Default expire in 10 years.
   * @param  {url}        page      URL, where cookie will be set.
   * @return {}                     No return, function just create new cookie.
   */
  var setCookie = function(name, value, expire, page) {
    this.name       = name;
    this.value      = value;
    this.expire     = expire;
    this.page       = page;
    if(!name && !value || !name || !value) {
      console.error( error.message = 'You didn\'t specified cookie name and value!' );
      return;
    }
    if(expire) {
      expire = expire;
    }
    else {
      expire = 3650;
      expire = getDays(expire);
    }
    // BUG: This is not tested, I have not been working with this kind of stuff yet.
    if(!page) {
      page = 'path=/';
    }
    document.cookie = name + '=' + value + ';expires=' + expire + ';' + page + ';';
  }
  /**
   * Remove existing cookie from browser.
   * @param     {string}    name    Name of cookie to delete.
   * @return    {}                  No return, function just delete existing cookie.
   */
  var destroyCookie = function(name) {
    this.name = name;
    // Param name is required. No name? No fun!
    if(!name) {
      console.error( error.message = 'You didn\'t specified cookie name!' );
      return;
    }
    else {
      // Retrieve cookies in arr
      var cookies   = getCookies(),
          loop      = true,
          i         = 0;
      // Loop trough them and find that right cookie.
      // Triple chocolate is the best one, btw.
      while(loop) {
        var cookie        = cookies[i],
            cookieName    = cookie.split('=')[0],
            cookieValue   = cookie.split('=')[1];
        // Got it? Kill it, Anakin.
        if(cookieName === name) {
          document.cookie = cookieName + '=' + cookieValue + ';expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          loop = false;
        }
        // Or just repeat.
        else {
          i++;
        }
      }
    }
  }
  /**
   * Function to change existing cookie.
   * @param  {string}       name      Name of cookie to change.
   * @param  {string}       value     New value for cookie.
   * @return {}                       Delete and create new cookie with new value.
   */
  var changeCookie = function(name, value) {
    this.name     = name;
    this.value    = value;
    if(!name && !value || !name || !value) {
      console.log( error.message = 'You didn\'t specified cookie name or new value!' );
      return;
    }
    else {
      var cookies = getCookies();
      for(var i in cookies) {
        var cookie = cookies[i],
            cookieName = cookie.split('=')[0],
            cookieValue = cookie.split('=')[1];
        if(cookieName === name) {
          destroyCookie(name);
          setCookie(name, value);
        }
      }
    }
  }
  /**
   * Get a single cookie with its value.
   * @param  {string}     name    Name of cookie to get.
   * @return {string}             String with cookie name and its value.
   */
  var getCookie = function(name) {
    this.name = name;
    if(!name) {
      console.log( error.message = 'You didn\'t specified cookie name!' );
      return;
    }
    else {
      var cookies = getCookies();
      for(var i in cookies) {
        var cookie = cookies[i],
            cookieName = cookie.split('=')[0],
            cookieValue = cookie.split('=')[1];
        if(cookieName === name) {
          return 'Cookie name: ' + cookieName + '\n Cookie value: ' + cookieValue;
        }
      }
    }
  }

  return {

    setCookie: setCookie,
    destroyCookie: destroyCookie,
    changeCookie: changeCookie,
    getCookie: getCookie

  }

}());
