Technical Report
================

This report is intended to detail and explain what languages, frameworks and features have been used for the server and client side domains of the FreeCycle website.  

Firstly, the report will detail why the prototype server and client are not appropriate for this project and why, and will then discuss what features of the frameworks and languages have been used and why. 


Critique of Server/Client prototype
---------------------

### Overview

Frameworks were developed as a time saving method for developers, they offer consistency within the codebase itself as well as security and scalability. https://www.linkedin.com/pulse/exploring-advantages-disadvantages-incorporating-frameworks-juste/  

However, if the project is small enough, the developers may be able to get away without using a framework at all. But, this can create issues down the line if the project is passed to a different development team as the codebase may not be consistent; which creates more work and takes time to learn, and therefore it is harder to maintain.   

The prototypes for this project were created without using a framework. 

### Socket / Network Handling

```Python
def serve_app(func_app, port, host=''):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind((host, port))
        while True:
            s.listen()
            try:
                conn, addr = s.accept()
            except KeyboardInterrupt as ex:
                break
            with conn:
                #log.debug(f'Connected by ')
                #while True:
                    data = conn.recv(65535)  # If the request does not come though in a single recv/packet then this server will fail and will not composit multiple TCP packets. Sometimes the head and the body are sent in sequential packets. This happens when the system switches task under load.
                    #if not data: break
                    try:
                        request = parse_request(data)
                    except InvalidHTTPRequest as ex:
                        log.exception("InvalidHTTPRequest")
                        continue

```
If a packet is larger than 64k, this function will not work. This code can also only handle one instruction at a time, as no asynchronous functions have been set up and will likely cause a crash. 

Python applications have built-in functions that handles HTTP requests, so this is unnecessary.

### Routing

```python
from .views import get_index, get_item, post_item, delete_item, get_items
ROUTES = (
    ('OPTIONS', r'.*', options_response),
    ('GET', r'/$', get_index),
    ('POST', r'/item$', post_item),
    ('GET', r'/item/(?P<id>\d+)$', get_item),
    ('DELETE', r'/item/(?P<id>\d+)$', delete_item),
    ('GET', r'/items$', get_items),
)
```
This routing code only allows to route from the URL path, which is currently global and in one place. Using regular expressions will struggle to chain them to others making this non-expandable. Frameworks allow developers to route on a variety of things.

### Recommendation

The prototypes implementation offers no structure to the code base. As well as not saving the data once created. The client.html document here has no structure, the layout, buttons & functions have been placed haphazardly in the codebase, making it incoherent and hard to understand.

Using a framework that has inbuilt functions allows for structure and uniformity, making the code base far more readable and understandable. It allows for concise code which is important for maintenance and stability. 

The Express JS Framework has been chosen for the sever, VueJs has been selected for the client and Skeleton has been used for the layout Framework.

Server Framework Features
-------------------------

### CORS / Middleware 

(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)

Most frameworks offer some form of middleware as it is modular and reusable. CORS is a middleware used by Express that allows for cross origin resource sharing allowing restricted resources to be accessed from another domain. 
https://en.wikipedia.org/wiki/Cross-origin_resource_sharing

```javascript
const cors = require('cors')

app.use(cors())
```
Once installed only two lines of code is required for CORS to run in Express. 

CORS is a browser friendly security feature that allows access to the API's, without it access to the site may be blocked. It is needed to authorize third-party access. 

https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html


### Routing 

(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)

Routing is how an application responds to a request from the client to a particular endpoint using a request method, for example GET or DELETE.  
In Express routing is done via HTTP methods -  allowing the app to listen for a request and when a match is found the function is called.  

https://expressjs.com/en/guide/routing.html

```Javascript
// function that returns all of the items
app.get('/items', (req, res) => {
  res.status(200).json(Object.values(ITEM))
  console.log(ITEM)
})
```
Routing sets out to create a direct path of communication between the server and client, selecting the best path according to predetermined rules. This keeps communication paths simple and efficient, allowing for less latency for the user. 

### Error Handling 

Express comes with a default error handler built in. The handler catches and processes errors that occur both synchronously and asynchronously. This is another middleware function of Express which can be added to the end of the  function stack. 

https://expressjs.com/en/guide/error-handling.html

```javascript
app.get('/', (req, res) => {
  throw new Error('BROKEN') // Express will catch this on its own.
})
```

Having a built-in default error handling system allows errors to be detected and reported allowing for more efficient debugging. Having this as a built in feature means less lines of code are needed. 


Server Language Features
-----------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)



Client Framework Features
-------------------------

### Virtual DOM (Document object model)

VUeJs uses a virtual DOM which creates a replica of the DOM when changes are made.  These changes are made to the JS data structures, which is then compared to the original. With only the final changes get submitted to the real DOM. This means changes can be made at a faster rate and allows for good optimisation.

https://www.tutorialspoint.com/vuejs/vuejs_overview.htm 

The concept of a virtual DOM is to help with standard performance issues in a browser  as it only applies necessary changes and leaves the rest the same. This means faster updates to the user and therefore better user experience. 

In VueJS a virtual DOM is based on a pattern that can look like this:

```Javascript
const vnode = {
  type: 'div',
  props: {
    id: 'hello'
  },
  children: [
    /* more vnodes */
  ]
}
```
https://vuejs.org/guide/extras/rendering-mechanism.html

Within this client a virtual DOM could be considered as this:

```Javascript
     item: {
            user_id: "", 
            keywords: [""], 
            description: "", 
            image: "", 
            lat: "", 
            lon: "", 
          list: [1,2,3],
        }
```

### Two-Way data binding (V-model directive)

Vue has an inbuilt directive called V-Model. This model allows developers to bind a value of a input element to a data property. Any changes made to the input will be immediately update the data - and this works in reverse too. 

https://www.w3schools.com/vue/ref_v-model.php

```Javascript
input v-model="item.user_id"  name ="user_id" placeholder="Enter your User Id"/>
```

By using *v-model = "name"* any changes made will update the name property and vice versa.

The data binding features in Vue simplifies the process of keeping the UI in sync with the underlying data by automating the process, as well as providing a way of developing dynamic and responsive applications, whilst also maintaining the code readability for the developer. 

### List Rendering (V-For Directive)

Vue uses a specific directive 'v-For' to render lists based on arrays. This directive uses a special syntax (item in items) where *items* is the source of the data for the array and *item* is an Alias for the list being iterated on. 

https://v1.vuejs.org/guide/list.html#v-for

```Javascript
<ul>
    <li v-for="item in list">
        <span data-field="user_id">{{item.user_id}} &nbsp; </span>
        <span data-field ="description">{{item.description}} &nbsp;</span>
        <span data-field="keywords">{{item.keywords}} &nbsp;</span>
        <span data-field="image">{{item.image}} &nbsp;</span>
        <span data-field="lat">{{item.lat}} &nbsp;</span>
        <span data-field="lon">{{item.lon}} &nbsp;</span>
        <span data-field="id">{{item.id}} </span>
        <button class="button-primary" data-action="delete" @click="deleteItem(item.id)">Delete</button>
   </li>
```

V-for is a convenient way to dynamically generate elements generates the ability to iterate over each item and render it multiple times which reduces the need for manual DOM manipulation. It simplifies the process of rendering/updating lists in Vue applications. This improves development efficiency 

Client Language Features
------------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)

### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)



Conclusions
-----------

(justify why frameworks are recommended - 120ish words)
(justify which frameworks should be used and why 180ish words)

There are many benefits to using Frameworks when developing. Frameworks provide an infrastructure so that the developers can focus on features that are unique to that project without having to be concerned with the basics of the code. Therefore, they have to write less code which saves on development time, money and has less chance for bugs in the code. 

https://codeinstitute.net/blog/what-is-a-framework/#:~:text=Frameworks%20are%20a%20huge%20help,has%20to%20write%20less%20code.

Good Frameworks are simple, consistent and easy to implement with default behavior -  like the directive models in vue -  built in. Frameworks are recommended as they provide solutions to how a piece of code is laid out and which type case is followed, meaning these discussions do not need to take place within the development team. They provide consistency that is easy to understand and be picked up if the code is then given to another team of developers. STOPS 


WHY THESE FRAMEWORKS FOR THIS PROJECT

Same language 
