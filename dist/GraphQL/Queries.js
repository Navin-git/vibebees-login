"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOAD_USERS = void 0;

var _client = require("@apollo/client");

var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const LOAD_USERS = (0, _client.gql)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  query {\n    launchesPast(limit: 10) {\n      mission_name\n      launch_date_local\n      launch_site {\n        site_name_long\n      }\n    }\n  }\n"])));
exports.LOAD_USERS = LOAD_USERS;