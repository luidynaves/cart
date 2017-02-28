'use strict';
const sinon = require('sinon');
const chain = require('chai');
const sinonChai = require('sinon-chai');

before(() => chai.use(sinonChai));

beforeEach(() => this.sandbox = sinon.sandbox.create() );

afterEach(() => this.sandbox.restore() );