/**
 * Testing package to help developers test Azure Functions.
 *
 * @todo - Move test utilities to it's own npm package
 * @author Fredrik F. Lindhagen
 */
import { mockContext } from './azfun/context.mocker';
import FunctionMocker from './azfun/function.mocker';
import { mockRequest } from './azfun/request.mocker';

import MiddlewareMocker from './express/middlewareMocker';
import MockedResponse from './express/mockedResponse';

export const azfun = {
  FunctionMocker,
  mockContext,
  mockRequest,
};

export const express = {
  MiddlewareMocker,
  MockedResponse,
};
