"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CREATE_USER_MUTATION = void 0;

var _client = require("@apollo/client");

var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const Inputfield = [{
  name: "username",
  placeholder: "Username",
  type: "text",
  character: 4,
  require: true
}, {
  name: "email",
  placeholder: "Email",
  type: "text",
  require: true
}, {
  name: "phone",
  placeholder: "Phone",
  type: "number",
  require: true,
  character: 10
}, {
  name: "password",
  placeholder: "Password",
  type: "password",
  character: 8,
  require: true
}];
const CREATE_USER_MUTATION = (0, _client.gql)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  mutation createUser(", ") {\n    createUser(", ") {\n      id\n    }\n  }\n"])), Inputfield.map(idata => "$".concat(idata.name, ": String!,")), Inputfield.map(idata => "".concat(idata.name, ": $").concat(idata.name)));
exports.CREATE_USER_MUTATION = CREATE_USER_MUTATION;