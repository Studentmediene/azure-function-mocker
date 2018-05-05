/**
 * Testing package to help developers test Azure Functions.
 *
 * @todo - Move test utilities to it's own npm package
 * @author Fredrik F. Lindhagen
 */
import { mockContext } from './azfun/contextMocker';
import FunctionMocker from './azfun/functionMocker';
import { mockRequest } from './azfun/requestMocker';

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
