Technical Report
================

This report is intended to detail and explain what languages, frameworks and features have been used for the server and client-side domains of the FreeCycle website. 

Firstly, the report will detail why the prototype server and client are not appropriate for this project and why, followed by a discussion of what different features of the chosen frameworks and languages there are

Critique of Server/Client prototype
---------------------

### Overview

Frameworks were developed as a time saving method for developers, they offer consistency within the codebase itself as well as security and scalability. 
 
https://www.linkedin.com/pulse/exploring-advantages-disadvantages-incorporating-frameworks-juste/  

However, if the project is small enough, developers may be able to get away without using a framework. But this can create issues down the line if the project is passed to a different development team as the codebase may not be consistent; which creates more work and takes time to learn, and therefore it is harder to maintain. 

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
                    data = conn.recv(65535)  # If the request does not come through in a single recv/packet then this server will fail and will not composit multiple TCP packets. Sometimes the head and the body are sent in sequential packets. This happens when the system switches task under load.
                    #if not data: break
                    try:
                        request = parse_request(data)
                    except InvalidHTTPRequest as ex:
                        log.exception("InvalidHTTPRequest")
                        continue

```
If a packet is larger than 64k, this function will not work. This code can only manage one instruction at a time, as no asynchronous functions have been set up and will likely cause a crash. 

Python applications have built-in functions that handles HTTP requests, so this whole code snippet is unnecessary.

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

The ExpressJS Framework has been chosen for the sever, VueJs has been selected for the client and Skeleton has been used for the layout Framework.

Server Framework Features
-------------------------

### CORS / Middleware 

Most frameworks offer some form of middleware as it is modular and reusable. CORS is a middleware used by Express that allows for cross origin resource sharing.(Cross-origin resource sharing.no dateD )

```JavaScript
const cors = require('cors')

app.use(cors())
```
Once installed, only two lines of code is required for CORS to run in Express, which can be seen in the provided snippet. 

CORS is a browser friendly security feature that allows access to the APIs, without it, access to the site may be blocked as some default browser behaviours follow a same origin policy - meaning requests to different domains will fail. CORS allows for cross domain requests to occur. (Amazon, no date) (Haney, 2018)

### Routing 

Routing is how an application responds to a request from the client to a particular endpoint using a request method, for example GET or DELETE. 
In Express routing is done via HTTP methods -  allowing the app to listen for a request and when a match is found the function is called. (Express, 2017)

```JavaScript
// function that returns all the items
app.get('/items', (req, res) => {
  res.status(200).json(Object.values(ITEM))
  console.log(ITEM)
})
```
Routing sets out to create a direct path of communication between the server and client, selecting the best path according to predetermined rules. This keeps communication paths simple and efficient, allowing for less latency for the user. Network communication failures happen when sites take a long time to load, routing helps limit these failures. (Amazon, no date)

### Error Handling 

Express comes with a default error handler built in. The handler catches and processes errors that occur both synchronously and asynchronously. This is another middleware function of Express which can be added to the end of the  function stack. (ExpressJS, 2017)

```JavaScript
app.get('/', (req, res) => {
  throw new Error('BROKEN') // Express will catch this on its own.
})
```

Having a built-in default error handling system allows errors to be detected and reported allowing for more efficient debugging. Having this as a built-in feature means less lines of code are needed. 

Server Language Features
-----------------------

### Dynamic Typing

JavaScript’s dynamic typing allows variables to be declared without a variable type(String, int etc). At runtime, the program will assign a non-type declared variable a type according to the value of it at the time. (Mdn Web Docs, no date)

```JavaScript
ITEM = {}
```

Not needing to explicitly state a variable type offers an ease of use to developers, who in turn can then write more concise code. Dynamic typing also allows a different value to be assigned to a variable and can change it to a different type. 

### Const

Const is a keyword used in JavaScript to not allow the reassignment of a variable. It should be used when the value of a variable will not change to help prevent reassignment by the program. 

```JavaScript
const app = express()
const port = 8000
```

Using the keyword Const makes code more predictable and less likely to succumb to bugs. Const also saves the program some time when it compiles as it does not have to figure out whether the value is to be changed. (Athena AI, 2023) (Mortensen, 2021)

Client Framework Features
-------------------------

### Virtual DOM (Document object model)

VueJs uses a virtual DOM which creates a replica of the DOM when changes are made. These changes are made to the JavaScript data structures, which is then compared to the original. With only the final changes getting sent to the real DOM. This means changes can be made at a faster rate and allows for good optimization.(Tutorials Point, no date )

The concept of a virtual DOM is to help with standard performance issues in a browser  as it only applies necessary changes and leaves the rest the same. This means faster updates to the user and therefore better user experience. 

In VueJs a virtual DOM is based on a pattern that can look like this:

```JavaScript
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
(Vue Js, no date)

Within this client a virtual DOM could be considered as this:

```JavaScript
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

Vue has an inbuilt directive called V-Model. This model allows developers to bind a value of an input element to a data property. Any changes made to the input will be immediately update the data - and this works in reverse too. (W3Schools, no date)

```JavaScript
input v-model="item.user_id"  name ="user_id" placeholder="Enter your User Id"/>
```

By using *v-model = "name"* any changes made will update the name property and vice versa.

The data binding features in Vue simplifies the process of keeping the UI in sync with the underlying data by automating the process, as well as providing a way of developing dynamic and responsive applications, whilst also maintaining the code readability for the developer. 

### List Rendering (V-For Directive)

Vue uses a specific directive 'v-For' to render lists based on arrays. This directive uses a special syntax (item in items) where *items* is the source of the data for the array and *item* is an Alias for the list being iterated on. (Vue Js, no date)

```JavaScript
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

V-for is a convenient way to dynamically generate elements, and has the ability to iterate over each item and render it multiple times which reduces the need for manual DOM manipulation. It simplifies the process of rendering/updating lists in Vue applications. This improves development efficiency 

Client Language Features
------------------------

### Automatic Semicolons

There are some Javascript statements that require a semicolon (;) in the syntax. To streamline coding in JavaScript it automatically inserts semicolons. There are three incidents when this occurs:  
1) When a token not allowed is encountered  
2)  When the end of the input stream is reached  
3) When there are forbidden line terminators  

For example:

```Javascript
a = b
++c

// is transformed by Automatic semicolon into

a = b;
++c;
```
(MDN Web Docs, No date)

This feature aids development by making it more streamlined and stops syntax error bugs from appearing  in the code. Meaning again the developers can focus more on the features they are trying to implement. 

### addEventListener 

An addEventListener creates a function that will be called whenever a specific event happens. The function only takes up a line or two of code and does not have to be repeated for every event of that type that happens in the page. In the code snippet seen below, this creates an event for any button that has been implemented on the page. (MDN Web Docs, no date)

```Javascript
const buttons = document.querySelectorAll("button");

for (const button of buttons) {
  button.addEventListener("click", createParagraph);
}
```

This feature stops a developer from polluting their html sections with lines of Javascript. Again, this allows for a more streamlined development period and creates clearer code that can be understood. 

Conclusions
-----------

There are many benefits to using Frameworks when developing. Firstly, frameworks provide an infrastructure, meaning developers can focus on features that are unique to that project without having to be concerned with the basics of the code. Meaning less code is required which saves on development time, money and has less chance for bugs to occur.

Frameworks provide a consistency that is easy to understand and can be picked up if the project is then given to another team of developers to update and/or maintain. They are also highly recommended as they offer solutions on how a piece of code is laid out and which type case is followed, meaning these discussions do not need to take place within the development team. (O'Grady, 2023)

Good Frameworks are simple, consistent, and easy to implement with default behaviour -  like the directive models in Vue -  built in. 

JavaScript is a dynamic language making it ideal for client and server development as web pages tend to be interactive, having a language that can update the page in real time is needed. 
JavaScript is an extremely popular language to use for this form of development because it has a variety of inbuilt functions and features that are easy to interpret as well as making use of a whole library of middleware components. Another reason JavaScript is popular is that it is compatible with all web browsers. 
Both the frameworks chosen for the client & server of this project are JavaScript based frameworks. These frameworks are lightweight, allowing for fast compile time and with the use of inbuilt directives and keywords leads to fast & simple development. ExpressJS follows the above stated guidelines for a good framework. 

The chosen layout framework, Skeleton was also chosen for being lightweight and quick to compile. The inbuilt style choices are clean and modern allowing for a clean looking webpage. 

References
--------------

Cross-origin resource sharing. Available at: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing (Accessed: 22/12/2023).

Amazon (no date) What is routing? Available at: https://aws.amazon.com/what-is/routing/#:~:text=A%20computer%20network%20is%20made,path%20using%20some%20predetermined%20rules (Accessed: Dec 22,2023).

Amazon Configuring CORS for an HTTP API. Amazon. Available at: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html (Accessed: .

Athena, A.I. (2023) [JavaScript] - Why are we using let and not const? Available at: https://www.shecodes.io/athena/124459-why-are-we-using-let-and-not-const#:~:text=It (Accessed: Dec 22,2023).

Express, J.S. (2017) Routing, Express JS Guide. Available at: https://expressjs.com/en/guide/routing.html (Accessed: Dec 22,2023).

Express, J.S. (2017) Error Handling. Available at: https://expressjs.com/en/guide/error-handling.html (Accessed: Dec 22,2023).

Haney, D. (2018) What is the issue CORS is trying to solve? . Available at: https://stackoverflow.com/questions/27365303/what-is-the-issue-cors-is-trying-to-solve (Accessed: 22/12/2023).

MDN Docs (no date) EventTarget: addEventListener() method. Available at: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener (Accessed: Dec 22,2023).

MDN Web Docs (No date) Lexical Grammar. Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#automatic_semicolon_insertion (Accessed: Dec 22,2023).

MDN Web Docs (no date) What is JavaScript? Available at: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript#using_addeventlistener_instead (Accessed: Dec 22,2023).

Mdn Web Docs Dynamic Typing. Available at: https://developer.mozilla.org/en-US/docs/Glossary/Dynamic_typing (Accessed: Dec 22,2023).

Mortensen, P. (2021) Const in JavaScript: when to use it and is it necessary? Available at: https://stackoverflow.com/questions/21237105/const-in-javascript-when-to-use-it-and-is-it-necessary (Accessed: Dec 22,2023).

O'Grady, B. (2023) 'What is a Framework? Why we use Software Frameworks', Code institute, 10 Feb. Available at: https://codeinstitute.net/blog/what-is-a-framework/#:~:text=Frameworks%20are%20a%20huge%20help,has%20to%20write%20less%20code (Accessed: .

Tutorials Point Vue Js - overview. Available at: https://www.tutorialspoint.com/vuejs/vuejs_overview.htm (Accessed: Dec 22,2023).

Vue Js (no date) List Rendering. Available at: https://v1.vuejs.org/guide/list.html#v-for (Accessed: Dec 22,2023).

Vue Js Rendering Mechanism. Available at: https://vuejs.org/guide/extras/rendering-mechanism.html#virtual-dom (Accessed: Dec 22,2023).

W3Schools Vue v-model Directive. Available at: https://www.w3schools.com/vue/ref_v-model.php (Accessed: Dec 22,2023).