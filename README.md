![Logo](https://media-exp1.licdn.com/dms/image/C4E0BAQEGRUqgFXnmEg/company-logo_200_200/0/1640233288401?e=1653523200&v=beta&t=ZTAjv2IvQcmTxwtVFceBMMah4_N5Rsby4_YQteVE2JM)

# vibebees-dynamic-login

vibebees-dynamic-login provides functional login and signup UI component for React App. It has ibbuilt validator for input validation.

## Installation

Install vibebees-dynamic-login with npm

```bash
  npm install vibebees-dynamic-login
```

Install vibebees-dynamic-login with yarn

```bash
  yarn add vibebees-dynamic-login
```

## Props

| Props           | Default |
| --------------- | ------- |
| Inputfield      | [ ]     |
| type            | null    |
| SuccessResponse | null    |
| ErrorResponse   | null    |

## Inputfield

Inputfield is must require props which define different properties of input feilds.

```bash
  const Inputfield = [
  {
    name: "username",
    placeholder: "Username",
    type: "text",
    character: 4,
    require: true,
  },
  {
    name: "email",
    placeholder: "Email",
    type: "text",
    require: true,
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
    character: 8,
    require: true,
  },
];
```

#### name

name is one of the key of an object which define name of input feilds.

```bash
  name:"username"
```

#### placeholder

placeholder is one of the key of an object which define placeholder of input feilds.

```bash
  placeholder:"username"
```

#### type

type is one of the key of an object which define type of input feilds.

```bash
  type:"text"
```

### require

require is one of the key of an object which define either the input feilds is require or not.

```bash
  require: true
```

### character

character is one of the key of an object which define number of require character of input feilds.

```bash
  character: 4
```

## type

type is props which define either the component is login or signup.

```bash
  type="register"
```

## SuccessResponse

SuccessResponse is a function which define all the activities done after successfull api call.

```bash
  SuccessResponse={SuccessResponse}
```

## ErrorResponse

ErrorResponse is a function which handle error after bad request.

```bash
  ErrorResponse={ErrorResponse}
```

## Example

```javascript
import "./App.css";
import React from "react";
import Login from "vibebees-dynamic-login/dist/components/Login";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
      return null;
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "https://api.spacex.land/graphql/" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

const Inputfield = [
  {
    name: "username",
    placeholder: "Username",
    type: "text",
    character: 4,
    require: true,
  },
  {
    name: "email",
    placeholder: "Email",
    type: "text",
    require: true,
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
    character: 8,
    require: true,
  },
];

function App() {
  const SuccessResponse = (res) => {
    window.location.href = "/home";
  };
  const ErrorResponse = (err) => {
    window.location.href = "/home";
  };

  return (
    <ApolloProvider client={client}>
      <div className="App ">
        <Login
          Inputfield={Inputfield}
          path={"https://warm-badlands-28984.herokuapp.com/api/user/register"}
          type="register"
          SuccessResponse={SuccessResponse}
          ErrorResponse={ErrorResponse}
        />
      </div>
    </ApolloProvider>
  );
}

export default App;
```

## Authors

- [@NabinKharel](https://github.com/Navin-git)
