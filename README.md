SM JavaScript test utilities
============================

Package to help mock Endpoints, functions and middleware for _Express_ and _Azure Functions_,
without having to spin up a webserver.

> This package was previously named azure-function-mocker. However, because we have added utilities
> for Express applications as well, has the package been renamed to `sm-js-test-utils`.

This package is maintained by the organization [Studentmedia in Trondheim inc.](https://studentmediene.no), hence the `sm` prefix in the name. Any feedback, questions or change-requests can be issued on the projects [github page](https://github.com/Studentmediene/sm-js-test-utils/issues). However, feel free to open pull requests with the changes implemented.

## Installation

```
npm install --save-dev sm-js-test-utils
```

## API-reference
Since the module contains utilities for both express and azure functions,
are their respective features grouped together.

* Azure Functions utilities are located in `azfun`
* Express utilities are located in `express`.

### Request Mocker (azfun)
Creates a mocked HttpRequest, which is accepted as an argument by `FunctionMocker.run`.

#### Parameters
|  name    |     type    | Null  |         description             |                  legal values                   |
| -------  | ----------- | ----- | --------------------------------| ----------------------------------------------- |
| method   | `string`    | Yes   | The HTTP method to mock         | `POST`, `GET`, `PUT`, `PATCH`, `HEAD`, `OPTION` |
| params   | `object`    | Yes   | The URL parameters to include   | All key-value objects                           |
| query    | `object`    | Yes   | The Query parameteres to include| All key-value objects                           |

#### Examples

##### Simple GET request
```js
const { mockRequest } = require('sm-js-test-utils').azure;

const req = mockRequest(); // GET, could also be explicitt and write it in.
```

##### Simple request with non-GET method
```js
const { mockRequest } = require('sm-js-test-utils').azure;

const req = mockRequest('POST'); // or 'PUT', 'PATCH', 'HEAD', 'OPTION', ...
```

### Function Mocker (azfun)
Creates a mocked environment for which the function can run in.
Simply said appends a mocked context to the first function parameter, and returns the updated context when the function has completed.

#### Examples

##### Simple HttpTriggered function
The most simple use-case to mock a function.
`getHelloWorld` takes no other arguments than the required `context`-argument,
and returns a simple HTTP 200 response with the body `{ message: 'Hello world' }`

```js
const { FunctionMocker } = require('sm-js-test-utils').azure;

function getHelloWorld(context) {
    context.res = {
        status: 200,
        body: { message: 'Hello world' }
    };
    context.done();
}

const func = new FunctionMocker(getHelloWorld);

const ctx = await func.run();

console.log(ctx.res.status); // 200
console.log(ctx.res.body); // { message: 'Hello world' }
```

##### HttpTriggered function with request object
A more complex version of the previous example, but yet quite simple.

```js
const { FunctionMocker, mockRequest } = require('sm-js-test-utils').azure;

function postHelloWorld(context, req) {
    if (!req.params.name) {
        context.res = {
            status: 400,
            body: { error: 'Missing name!' }
        };
    } else {
        context.res = {
            status: 200,
            body: { message: `Hello ${req.params.name}`}
        };
    }

    context.done();
}

const req = mockRequest('POST', { name: 'Jon Snow' }); // Mocks a request with a POST-body

const func = new FunctionMocker(postHelloWorld);

const ctx = await func.run(req);

console.log(ctx.res.body); // { messsage: 'Hello Jon Snow' }
```

##### HttpTriggered function returning a Promise
An Azure Function also supports ending the function through `Promise.resolve()`.
We will in this example use `async/await`, as it saves us syntax-space, the function will
in reality return a promise (see ES2017 spec for more details).

```js
const { FunctionMocker } = require('sm-js-test-utils').azure;

async function getHelloWorld(context) {
    context.res = {
        status: 200,
        body: { message: 'Hello Async World' }
    };
}

const func = new FunctionMocker(getHelloWorld);

const ctx = await func.run();

console.log(ctx.res.body); // { message: 'Hello Async World' }
```

As we see, there is no practical difference for the `FunctionMocker`, and what your output after `func.run()` is.

### Context Mocker (azfun)

Function which takes an callback-function,
that is called when the Azure Function completes by using `context.done()`

> Note: Azure Functions also supports the use of promises, thus an function can complete by calling
> `Promise.resolve()`, which won't trigger the callback-function

```js
const { mockContext } = require('sm-js-test-utils').azure;

// Alternative 1
mockContext((updatedContext) => {
    // Do some operation with the context.
});

// Alternative 2
// Usefull when working with async/await
const context = mockContext((updatedContext) => {
    // Do some operation with the context.
});
```

The last alternative is usefull when working with `async/await`, as the constant `context` will also contain the updated values.

You will however, rarelly need to work directly with `mockContext()` as `FunctionMocker` does this for you.

## Contribution

1. Clone the repository
2. Run `npm install`
3. Write your code
4. Write tests to your changes
5. Lint your code
6. Open a pull request
7. Wait for feedback and QA
8. Merge and Glory!

### Submitting issues
Add a new issue in the issues tab. Write as detailed as you can

## Known issues
A list of known issues. More details can typically be found on github.

### mockContext()

1. Problem with `context.log()` and `context.log.info()`. Having issues with properly mocking `context.log`, as it can be both an function `context.log()` and an object `context.log = { info: ..., error: ..., warn: ..., verbose: ... }`. Have therefore only included support for the _"object"_ version of it, as it provides the most features.
