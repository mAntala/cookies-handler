const Cookies = {

  // New Error message.
  error: new Error(),

  /**
   * Get formated time.
   * @param  {integer}    days    Days, which will be transfered to full formated date.
   * @return {string}             String with formated date.
   */
  getDays: function(days) {
    var d = new Date();
    d.setTime( d.getTime() + ( days*24*60*60*1000 ) );
    d.toUTCString();
    return d;
  },
  /**
   * Simple function for retrieving all cookies.
   * @return    {array}     Array of cookies set in browser.
   */
  getCookies: function() {
    // Array of cookies
    var cookies = document.cookie.split('; ');
    return cookies;
  },
  /**
   * Set a new cookie to browser.
   * @param  {string}     name      Name of new cookie.
   * @param  {string}     value     Value for new cookie.
   * @param  {integer}    expire    Days to expire. Default expire in 10 years.
   * @param  {url}        page      URL, where cookie will be set.
   * @return {}                     No return, function just create new cookie.
   */
  setCookie: function(name, value, expire, page) {

    this.name       = name;
    this.value      = value;
    this.expire     = expire;
    this.page       = page;

    if(!name && !value) {
      console.error( this.error.message = 'You didn\'t specified cookie name or value!' );
      return;
    }

    if(expire) {
      expire = expire;
    }
    else {
      expire = 3650;
      expire = this.getDays(expire);
    }

    // BUG: This is not tested, I have not been working with this kind of stuff yet.
    if(!page) {
      page = 'path=/';
    }

    document.cookie = name + '=' + value + ';expires=' + expire + ';' + page + ';';

  },
  /**
   * Remove existing cookie from browser.
   * @param     {string}    name    Name of cookie to delete.
   * @return    {}                  No return, function just delete existing cookie.
   */
  destroyCookie: function(name) {

    this.name = name;

    // Param name is required. No name? No fun!
    if(!name) {
      console.error( this.error.message = 'You didn\'t specified cookie name!' );
      return;
    }
    else {
      // Retrieve cookies in arr
      var cookies   = this.getCookies(),
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

}
