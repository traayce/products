import axios from 'axios';
import { Middleware } from 'redux';
import thunk from 'redux-thunk';
import crash from './crash';
import logging from './logging';
const request = axios.create({
  baseURL: 'http://localhost:3001/v1/'
});
const middleware: Middleware[] = [
  thunk.withExtraArgument(request),
  crash,
  logging
];

export default middleware;
