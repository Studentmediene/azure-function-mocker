const { FunctionMocker, mockRequest } = require('../dist'); // Replace with 'azure-function-mocker'

const mockedFunc = new FunctionMocker((context, req) => {
  if (req.headers['content-type'] !== 'application/json') {
    context.res = {
      status: 400,
      body: { error: 'Illegal Content-Type! Must be application/json' }
    };
  } else {
    // Do some saving operation

    context.res = {
      status: 201,
      body: { message: `User: ${req.params.name} created` }
    };
  }

  context.done();
});

const req = mockRequest('POST', { name: 'Jon Snow' }, {}, { 'content-type': 'application/json' });
mockedFunc.run(req)
  .then((ctx) => {
    console.log(ctx.res.body.message); // 'User: Jon Snow created'
  })
  .catch(console.error);
