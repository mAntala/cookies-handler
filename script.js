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
   * Set a new cookie to browser.
   * @param  {string}     name      Name of new cookie.
   * @param  {string}     value     Value for new cookie.
   * @param  {integer}    expire    Days to expire. Default expire in 10 years.
   * @param  {url}        page      URL, where cookie will be set.
   * @return {}                     No return, function just create new cookie.
   */
  setCookie: function(name, value, expire, page) {

    this.name = name;
    this.value = value;
    this.expire = expire;
    this.page = page;

    if(!name && !value) {
      console.error( this.error.message = 'You didn\'t specified cookie name or value!' );
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

    document.cookie = name + '=' + value + ';' + 'expires=' + expire + ';' + page;

  }

}
