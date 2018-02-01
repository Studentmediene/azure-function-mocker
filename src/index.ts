/**
 * Testing package to help developers test Azure Functions.
 *
 * @todo - Move test utilities to it's own npm package
 * @author Fredrik F. Lindhagen
 */
import { mockContext } from './context.mocker';
import FunctionMocker from './function.mocker';
import { mockRequest } from './request.mocker';

export { mockContext, mockRequest, FunctionMocker };
