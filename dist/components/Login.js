"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.test.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

var _client = require("@apollo/client");

var _Queries = require("../GraphQL/Queries");

require("./styles/index.css");

var _templateObject;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const Register = _ref => {
  let {
    Inputfield,
    setApiCall,
    axios,
    path,
    SuccessResponse,
    ErrorResponse,
    type
  } = _ref;
  const {
    loading,
    data
  } = (0, _client.useQuery)(_Queries.LOAD_USERS);
  const [users, setUsers] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    if (data) {
      console.log(data.getAllUsers);
    }
  }, [data]);
  const CREATE_USER_MUTATION = (0, _client.gql)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  mutation createUser(", ") {\n    createUser(", ") {\n      id\n    }\n  }\n"])), Inputfield.map(idata => "$".concat(idata.name, ": String!,")), Inputfield.map(idata => "".concat(idata.name, ": $").concat(idata.name)));
  const [createUser] = (0, _client.useMutation)(CREATE_USER_MUTATION);
  let inputinitialState = {};

  for (let i = 0; i < Inputfield.length; i++) {
    inputinitialState[Inputfield[i].name] = "";
  }

  const [input, setinput] = (0, _react.useState)(inputinitialState);
  const [error, seterror] = (0, _react.useState)({});
  const [dataCheck, setDataCheck] = (0, _react.useState)(false);
  const [process, setprocess] = (0, _react.useState)(false);
  let errorinitialState = {};

  for (let i = 0; i < Inputfield.length; i++) {
    errorinitialState[Inputfield[i].name] = "";
  }

  const [backerror, setbackerror] = (0, _react.useState)(errorinitialState);
  const {
    username,
    email,
    password
  } = input;

  const Handelchange = e => {
    const {
      name,
      value
    } = e.target;
    setbackerror(errorinitialState);
    setinput(pre => {
      return _objectSpread(_objectSpread({}, pre), {}, {
        [name]: value
      });
    });
  };

  const Validation = data => {
    const errors = {};
    Inputfield.map(idata => {
      if (!data[idata.name] && idata.require) {
        errors[idata.name] = "".concat(idata.name, " Field is required");
      } else if (idata.name && data[idata.name].length < idata.character) {
        errors[idata.name] = "".concat(idata.name, " must be atleast ").concat(idata.character, " characters");
      } else if (idata.name === "email" && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data[idata.name])) {
        errors[idata.name] = "Invalid email address";
      }

      return errors;
    });
    return errors;
  };

  const Handelsubmit = e => {
    e.preventDefault();
    seterror(Validation(input));
    setDataCheck(true);
  };

  const CallRestApi = async () => {
    setprocess(true);
    await axios.post(path, input).then(res => {
      setinput(inputinitialState);
      SuccessResponse && SuccessResponse(res);
    }).catch(err => {
      if (err.response) {
        ErrorResponse && ErrorResponse(err);
      }
    });
    setprocess(false);
  };

  const CallGraphql = async () => {
    try {
      setprocess(true);
      const res = await createUser({
        variables: _objectSpread({}, input)
      });
      SuccessResponse && SuccessResponse(res);
    } catch (err) {
      ErrorResponse && ErrorResponse(err);
    }
  };

  (0, _react.useEffect)(() => {
    if (Object.keys(error).length === 0 && dataCheck) {
      // setApiCall(true);
      CallRestApi();
      CallGraphql(); // createUser({
      //   variables: {
      //     ...input,
      //   },
      // });
    }

    setDataCheck(false); // eslint-disable-next-line
  }, [dataCheck, email, username, password, error, process]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full bg-blue-100 min-h-screen  flex justify-center items-center"
  }, /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: Handelsubmit,
    className: "flex flex-col items-center bg-white p-10 rounded-lg border border-gray-100 shadow-lg gap-3 w-11/12 sm:w-8/12 md:w-4/12"
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "text-3xl font-medium text-gray-700"
  }, type), Array.isArray(Inputfield) && Inputfield.map((data, index) => {
    const {
      name,
      placeholder,
      type
    } = data;
    return /*#__PURE__*/_react.default.createElement("div", {
      key: index,
      className: "w-full"
    }, /*#__PURE__*/_react.default.createElement("input", {
      onChange: Handelchange,
      type: type,
      value: input[name],
      name: name,
      placeholder: placeholder,
      className: "h-10 border  border-gray-300 w-full focus:shadow text-gray-600 focus:outline-none px-2 rounded"
    }), error[name] && /*#__PURE__*/_react.default.createElement("div", {
      className: "bg-red-500 relative text-white rounded mt-1 text-sm text-center"
    }, /*#__PURE__*/_react.default.createElement("p", null, " ", error[name]), /*#__PURE__*/_react.default.createElement("div", {
      className: "h-2 w-2 left-3 transform rotate-45 -top-1 absolute bg-red-500"
    })), backerror[name] && /*#__PURE__*/_react.default.createElement("div", {
      className: "bg-red-500 relative text-white rounded mt-1 text-sm text-center"
    }, /*#__PURE__*/_react.default.createElement("p", null, " ", backerror[name]), /*#__PURE__*/_react.default.createElement("div", {
      className: "h-2 w-2 left-3 transform rotate-45 -top-1 absolute bg-red-500"
    })));
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full"
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "submit",
    disabled: process ? true : false,
    className: "bg-blue-500 flex items-center justify-center gap-2 h-10 w-36 hover:bg-blue-400 self-center transition duration-300 py-2 px-8 float-right rounded text-white font-medium text-sm ".concat(process ? "cursor-not-allowed" : "cursor-pointer")
  }, process ? /*#__PURE__*/_react.default.createElement("span", {
    className: "lds-ring mx-auto mb-3"
  }, /*#__PURE__*/_react.default.createElement("div", null), /*#__PURE__*/_react.default.createElement("div", null), /*#__PURE__*/_react.default.createElement("div", null), /*#__PURE__*/_react.default.createElement("div", null)) : /*#__PURE__*/_react.default.createElement("span", null, type)))));
};

var _default = Register;
exports.default = _default;