/**
 * Testing package to help developers test Azure Functions.
 *
 * @todo - Move test utilities to it's own npm package
 * @author Fredrik F. Lindhagen
 */
import { mockContext } from './azfun/contextMocker';
import FunctionMocker from './azfun/FunctionMocker';
import { mockRequest } from './azfun/requestMocker';

import MiddlewareMocker from './express/MiddlewareMocker';
import MockedResponse from './express/MockedResponse';

export const azfun = {
  FunctionMocker,
  mockContext,
  mockRequest,
};

export const express = {
  MiddlewareMocker,
  MockedResponse,
};
