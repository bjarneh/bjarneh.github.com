// Copyright 2017 bjarneh@ifi.uio.no. All rights reserved. 
// Use of this source code is governed by a BSD-style 
// license that can be found in the LICENSE file. 


/********************************************************************
 
 * Returns all cookies as a map, with utility functions
 * to add and remove cookies [in map + document].
 *
 ********************************************************************/
function getCookieMap() {

    var m = {}, key_value, s, i, d;

    if (document.cookie) {
        s = document.cookie.split(/;\s*/);
        for (i = 0; i < s.length; i++) {
            key_value = s[i].split('=');
            m[key_value[0]] = key_value[1];
        }
    }

    // Add a cookie to map and document
    // @expires : Date (object) of expiration (default ~5 years)
    m.add = function (name, value, expires) {
        if (!expires) {
            d = new Date();
            d.setTime(d.getTime() + (5 * 365 * 1000 * 60 * 60 * 24));
            expires = d;
        }
        this[name] = value;
        document.cookie = name + '=' + value + '; expires=' + expires.toUTCString() + '; SameSite=Lax; path=/';
    };

    // Delete cookie from map and document
    m.remove = function (name) {
        delete (this[name]);
        document.cookie = name + '=undef; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax; path=/';
    };

    return m;
}
