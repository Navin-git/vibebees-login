import { gql } from "@apollo/client";

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

export const CREATE_USER_MUTATION = gql`
  mutation createUser(${Inputfield.map(
    (idata) => `$${idata.name}: String!,`
  )}) {
    createUser(${Inputfield.map((idata) => `${idata.name}: $${idata.name}`)}) {
      id
    }
  }
`;
