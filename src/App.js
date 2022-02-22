import "./App.css";
import React from "react";
// import Login from "vibebees-dynamic-login/dist/components/Login";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import Login from "./lib/components/Login";

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
    name: "phone",
    placeholder: "Phone",
    type: "number",
    require: true,
    character: 10,
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
