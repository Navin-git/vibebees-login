import React, { useState } from "react";
import { useEffect } from "react";

import { useQuery, gql } from "@apollo/client";
import { LOAD_USERS } from "../GraphQL/Queries";

import { useMutation } from "@apollo/client";
// import "./styles/index.css";

const Register = ({
  Inputfield,
  setApiCall,
  axios,
  path,
  SuccessResponse,
  ErrorResponse,
  type,
}) => {
  const { loading, data } = useQuery(LOAD_USERS);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (data) {
      console.log(data.getAllUsers);
    }
  }, [data]);

  const CREATE_USER_MUTATION = gql`
  mutation createUser(${Inputfield.map(
    (idata) => `$${idata.name}: String!,`
  )}) {
    createUser(${Inputfield.map((idata) => `${idata.name}: $${idata.name}`)}) {
      id
    }
  }
`;

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  let inputinitialState = {};
  for (let i = 0; i < Inputfield.length; i++) {
    inputinitialState[Inputfield[i].name] = "";
  }
  const [input, setinput] = useState(inputinitialState);

  const [error, seterror] = useState({});

  const [dataCheck, setDataCheck] = useState(false);
  const [process, setprocess] = useState(false);

  let errorinitialState = {};
  for (let i = 0; i < Inputfield.length; i++) {
    errorinitialState[Inputfield[i].name] = "";
  }
  const [backerror, setbackerror] = useState(errorinitialState);

  const { username, email, password } = input;

  const Handelchange = (e) => {
    const { name, value } = e.target;
    setbackerror(errorinitialState);
    setinput((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const Validation = (data) => {
    const errors = {};
    Inputfield.map((idata) => {
      if (!data[idata.name] && idata.require) {
        errors[idata.name] = `${idata.name} Field is required`;
      } else if (idata.name && data[idata.name].length < idata.character) {
        errors[
          idata.name
        ] = `${idata.name} must be atleast ${idata.character} characters`;
      } else if (
        idata.name === "email" &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data[idata.name])
      ) {
        errors[idata.name] = "Invalid email address";
      }
      return errors;
    });

    return errors;
  };
  const Handelsubmit = (e) => {
    e.preventDefault();
    seterror(Validation(input));
    setDataCheck(true);
  };

  const CallRestApi = async () => {
    setprocess(true);
    await axios
      .post(path, input)
      .then((res) => {
        setinput(inputinitialState);
        SuccessResponse && SuccessResponse(res);
      })
      .catch((err) => {
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
        variables: {
          ...input,
        },
      });
      SuccessResponse && SuccessResponse(res);
    } catch (err) {
      ErrorResponse && ErrorResponse(err);
    }
  };
  useEffect(() => {
    if (Object.keys(error).length === 0 && dataCheck) {
      // setApiCall(true);
      CallRestApi();
      CallGraphql();
      // createUser({
      //   variables: {
      //     ...input,
      //   },
      // });
    }
    setDataCheck(false);
    // eslint-disable-next-line
  }, [dataCheck, email, username, password, error, process]);

  return (
    <div className="w-full bg-blue-100 min-h-screen  flex justify-center items-center">
      <form
        onSubmit={Handelsubmit}
        className="flex flex-col items-center bg-white p-10 rounded-lg border border-gray-100 shadow-lg gap-3 w-11/12 sm:w-8/12 md:w-4/12"
      >
        <h1 className="text-3xl font-medium text-gray-700">{type}</h1>
        {/* <Link to={"/signin"} className="text-blue-500 text-sm">
          Have an account?
        </Link> */}
        {Array.isArray(Inputfield) &&
          Inputfield.map((data, index) => {
            const { name, placeholder, type } = data;

            return (
              <div key={index} className="w-full">
                <input
                  onChange={Handelchange}
                  type={type}
                  value={input[name]}
                  name={name}
                  placeholder={placeholder}
                  className="h-10 border  border-gray-300 w-full focus:shadow text-gray-600 focus:outline-none px-2 rounded"
                />
                {error[name] && (
                  <div className="bg-red-500 relative text-white rounded mt-1 text-sm text-center">
                    <p> {error[name]}</p>
                    <div className="h-2 w-2 left-3 transform rotate-45 -top-1 absolute bg-red-500"></div>
                  </div>
                )}
                {backerror[name] && (
                  <div className="bg-red-500 relative text-white rounded mt-1 text-sm text-center">
                    <p> {backerror[name]}</p>
                    <div className="h-2 w-2 left-3 transform rotate-45 -top-1 absolute bg-red-500"></div>
                  </div>
                )}
              </div>
            );
          })}
        <div className="w-full">
          <button
            type="submit"
            disabled={process ? true : false}
            className={`bg-blue-500 flex items-center justify-center gap-2 h-10 w-36 hover:bg-blue-400 self-center transition duration-300 py-2 px-8 float-right rounded text-white font-medium text-sm ${
              process ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {process ? (
              <span className="lds-ring mx-auto mb-3">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </span>
            ) : (
              <span>{type}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Register;
