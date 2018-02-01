Azure Function Mocker
====================

Service used to mock Azure Functions in testing environment.
Built to complement the Jest library, but should not be dependant on it.

## Installation

```
npm install --save-dev azure-function-mocker
```

## API-reference

### Request Mocker
Creates a mocked HttpRequest, which is accepted by `FunctionMocker.run`.

#### Parameters
|  name    |     type    | Null  |         description             |                  legal values                   |
| -------  | ----------- | ----- | --------------------------------| ----------------------------------------------- |
| method   | `string`    | Yes   | The HTTP method to mock         | `POST`, `GET`, `PUT`, `PATCH`, `HEAD`, `OPTION` |
| params   | `object`    | Yes   | The URL parameters to include   | All key-value objects                           |
| query    | `object`    | Yes   | The Query parameteres to include| All key-value objects                           |

#### Examples

##### Simple GET request
```js
const { mockRequest } = require('azure-function-mocker');

const req = mockRequest(); // GET, could also be explicitt and write it in.
```

##### Simple request with non-GET method
```js
const { mockRequest } = require('azure-function-mocker');

const req = mockRequest('POST'); // or 'PUT', 'PATCH', 'HEAD', 'OPTION', ...
```

### Function Mocker


### Context Mocker

Function which takes an callback-function,
that is called when the Azure Function completes by using `context.done()`

> Note: Azure Functions also supports the use of promises, thus an function can complete by calling
> `Promise.resolve()`, which won't trigger the callback-function

```js
const { mockContext } = require('azure-function-mocker');

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

### Submitting issues
Add a new issue in the issues tab, and write as detailed as you can

## Known issues
List of known issues, more details exists in the issues tab.

### mockContext()

1. Problem with `context.log()` and `context.log.info()`. Having issues with properly mocking `context.log`, as it
   can be both an function `context.log()` and an object `context.log = { info: ..., error: ..., warn: ..., verbose: ... }`. Have therefore only included support for the _"object"_ version of it, as it provides the most features.

### mockRequest()

### FunctionMocker
