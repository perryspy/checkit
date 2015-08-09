# How PassportJS was used

> I've followed the example of the [Thinkster.io tutorial](https://thinkster.io/mean-stack-tutorial/), which uses passport to
lock down the API on the server, and then JSON WebTokens for auth on the client
side. Currently it only has passport local. Going to read through the [scotch.io tutorial](https://scotch.io/courses/easy-node-authentication) to figure out how to add oAuth from social networks

---

I'll link any links I found useful, plus any lessons learned.

### Links
- [Reddit - angularjs-authentication-with-passport](https://www.reddit.com/r/angularjs/comments/2fsh6b/angularjs_authentication_with_passport/)  

> #### The way that I do it with passport is this: ####
> - Express / Passport keeps track of the authenticated state on the server / datastore.  
- Once a user "logs in" Angular keeps track of the logged in state locally, via cookie / localstorage whichever.  
- While Angular has the logged in state (which, CAN be changed by the client) it will allow the user to receive logged in views and ATTEMPT API requests that require authentication.  
- When a user attempts the API request that requires auth, the server checks its own internal store to see if the user is ACTUALLY allowed to make that request.  

> So the server AND the client have to keep track of the authenticated state. However, even if someone changes the client's state, the most they'll do is receive empty templates with no data. That's the gotcha with client thick apps, is that you have to keep track of state on the client side too.  

- [VickeV - authentication-in-single-page-applications-node-js-passportjs-angularjs](https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs)

> Added auth middleware to the server routes that required it. This is standard  
> On the Angular side, they use a combo of  
> - $httpProvider.interceptors.push - checks if the response status is 401, if it is it routes to the login page  
```javascript
$httpProvider.interceptors.push(function($q, $location) {
      return {
            response: function(response) {
                  // do something on success
                  return response;
            },
            responseError: function(response) {
                  if (response.status === 401)
                        $location.url('/login');
                  return $q.reject(response);
            }
      };
});
```
> - created a function to checkLoggedin. Then to secure a URL, we simply add this new function to the configuration of the route.  
```javascript
$routeProvider  
      .when('/', {  
        templateUrl: '/views/main.html'  
      })  
      .when('/admin', {  
        templateUrl: 'views/admin.html',  
        controller: 'AdminCtrl',  
        resolve: {  
          loggedin: checkLoggedin  
        }  
      }
);
```  

- [scotch.io - easy-node-authentication (missing how to connect AngularJS with this)](https://scotch.io/courses/easy-node-authentication)
- [thinkster.io - mean-stack-tutorial (section on Passport)](https://thinkster.io/mean-stack-tutorial/)
