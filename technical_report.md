Technical Report
================

(intro describing purpose of report - 200ish words)
This report is intended to detail and explain what languages, frameworks and features have been used for the server and client side domains of the FreeCycle website. 




Critique of Server/Client prototype
---------------------

### Overview

The prototypes were created without using any framweworks 

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
This routing code only allows to route from the URL path, which is currently global and in one place. Using regular expressions will struggle to chain them to others making this not expandable. Frameworks allow us to route on a variety of things.

### Recommendation
(why the existing implementation should not be used - 40ish words)
(suggested direction - frameworks 40ish words)

The existing implementation offers no structure to the code base. As well as not saving the data once created. The client.html document here has no structure, the layout, buttons & functions are all over the place making in incoherant and hard to understand.

Using a framework that has inbuilt functions allows for this structure and uniformity, making the code base far more readable and understandable. It allows for concise code. 

Server Framework Features
-------------------------

### CORS /Middleware 


(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)

What features are missing?
- middleware - can do pre processing on incoming requests, Can also do post processing on the response. Middleman between the server & application . 'Bridges gaps' between the server and application to provide a seamless user experience. Modular . Can be in a different lang. virtually all Framewokrs have middleware as a feature as it's modular & reusable. 
 CORS
CORS? 


Middleware is available in a number of frameworks as it is modular and reusable. There are many Middleware options for ExpressJS which help effectively manage tasks like request and response which is needed on the server side. 


### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 3)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


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

Within our client a virtual DOM could be considered as this:

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

### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 3)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


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


Notes
======================================

critique of example server
-----------------------------

https://github.com/IU14/frameworks_and_languages_module/blob/ac05f3d5a821fabf5a0852f9d04183fb752c349d/example_server/app/server.py#L9-L10  [where they are defined]

https://github.com/IU14/frameworks_and_languages_module/blob/ac05f3d5a821fabf5a0852f9d04183fb752c349d/example_server/app/web_utils.py#L30-L31   - [there is a dot test in python that looks like a comment in the code]

 - Link(s) to where the routing is handled. Is this expandable? - 
 - this only allows to route from the URL path, currently global and in one place. Using reg ex will struggle to chain them to others - so not expandable (all in one place)- framework (express) allows us to route on a variety of things.

CORS? 

https://github.com/IU14/frameworks_and_languages_module/blob/ac05f3d5a821fabf5a0852f9d04183fb752c349d/example_server/app/http_server.py#L71-L72 [default response]
https://github.com/IU14/frameworks_and_languages_module/blob/ac05f3d5a821fabf5a0852f9d04183fb752c349d/example_server/app/web_utils.py#L48-L49 

- they are spread over multiple locations and have insecure defaults. 




recording from 20/11/2023 @11:50ish  covering the markdown.md 
