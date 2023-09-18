
// import React, { useEffect, useState } from 'react'
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as yup from 'yup';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// const SignupComponent = () => {

//   const [users, setUsers] = useState([]);
//   const [userError, setUserError] = useState('');
//   const navigate = useNavigate();
//   const [color, setColor] = useState('');

//   useEffect(() => {
//     axios({
//       method: "get",
//       url: "http://localhost:4500/users"
//     })
//       .then(response => {
//         setUsers(response.data);
//       })
//   }, [])

//   const verifyUserId = (e) => {
//     for (var user of users) {
//       if (user.UserId == e.target.value) {
//         setUserError("UserId Taken - Try anothor");
//         setColor("red");
//         break;
//       } else {
//         setUserError("UserId Available");
//         setColor("green");
//       }
//     }
//   }
//   return (
//     <div>
//       <h2>SignUp</h2>
//       <Formik

//         initialValues={{
//           UserId: "",
//           UserName: "",
//           Password: "",
//           Age: 0,
//           Email: "",
//           Mobile: ""
//         }}

//         validationSchema={
//           yup.object({
//             UserId: yup.string().required("UserId required"),
//             UserName: yup.string().required("UserName required"),
//             Password: yup.string().required("Password required").matches(/(?=.*[A-Z]\w{4,15})/, "Password 4 to 15 charactor with atleast one uppercase letter"),
//             Age: yup.number(),
//             Email: yup.string().required("Email required").email("Invalid Email"),
//             Mobile: yup.string().required("Mobile required").matches(/\+91\d{10}/, "Invalid Mobile +91 and 10 digit")
//           })
//         }

//         onSubmit={(values) => {
//           try {
//             axios({
//               method: "post",
//               url: "http://localhost:4500/signup",
//               data: values
//             }).then(() => {
//               alert("Signup Successfully...!");
//               navigate('/singin');
//             })
//           } catch(err){
//             console.error(err);
//           }
//         }}

//       >
//         {
//           <Form className="justify-content-center align-item-center">
//             <dl>
//               <dt>User Id</dt>
//               <dd> <Field type="text" onKeyUp={verifyUserId} name="UserId" className="form-control w-25" /> </dd>
//               <dd className="text-danger"> <ErrorMessage name="UserId" /> </dd>
//               <dd style={{ color: color }}>{userError}</dd>
//               <dt>User Name</dt>
//               <dd> <Field type="text" name="UserName" className="form-control w-25" /> </dd>
//               <dd className="text-danger"> <ErrorMessage name="UserName" /> </dd>

//               <dt>Password</dt>
//               <dd> <Field type="password" name="Password" className="form-control w-25" /> </dd>
//               <dd className="text-danger"> <ErrorMessage name="Password" /> </dd>

//               <dt>Age</dt>
//               <dd> <Field type="number" name="Age" className="form-control w-25" /> </dd>
//               <dd className="text-danger"> <ErrorMessage name="Age" /> </dd>

//               <dt>Email</dt>
//               <dd> <Field type="email" name="Email" className="form-control w-25" /> </dd>
//               <dd className="text-danger"> <ErrorMessage name="Email" /> </dd>

//               <dt>Mobile</dt>
//               <dd> <Field type="text" name="Mobile" className="form-control w-25" /> </dd>
//               <dd className="text-danger"> <ErrorMessage name="Mobile" /> </dd>
//             </dl>

//             <button type="submit" className="btn btn-primary">Register</button>
//             <div>
//               <Link to='/singin'>Existing User</Link>
//             </div>
//           </Form>
//         }

//       </Formik>
//     </div>

//   )
// }

// export default SignupComponent;

import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SignupComponent = () => {

  const [users, setUsers] = useState([]);
  const [userError, setUserError] = useState('');
  const navigate = useNavigate();
  const [color, setColor] = useState('');

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:4500/users"
    })
      .then(response => {
        setUsers(response.data);
      })
  }, [])

  const verifyUserId = (e) => {
    for (var user of users) {
      if (user.UserId == e.target.value) {
        setUserError("UserId Taken - Try anothor");
        setColor("red");
        break;
      } else {
        setUserError("UserId Available");
        setColor("green");
      }
    }
  }

  return (
    <div>
      <h2 className="text-center text-primary mt-4">User Register</h2>
      <Formik
        initialValues={{
          UserId: "",
          UserName: "",
          Password: "",
          Age: 0,
          Email: "",
          Mobile: ""
        }}

        validationSchema={
          yup.object({
            UserId: yup.string().required("UserId Required"),
            UserName: yup.string().required("UserName required"),
            Password: yup.string().required("Password Required").matches(/(?=.*[A-Z])\w{4,15}/, "Password 4 to 15 character with atleast one uppercase letter"),
            Age: yup.number().required("Age Required"),
            Email: yup.string().required("Email Required").email("Invalid Email"),
            Mobile: yup.string().required("Mobile number required").matches(/\+91\d{10}/, "Invalid Mobile +91 and 10 digit")
          })
        }

        onSubmit={(values) => {
          axios({
            method: "post",
            url: "http://localhost:4500/signup",
            data: values
          }).then(() => {
            alert(`SignUp Successfully...!`);
            navigate('/signin');
          })
        }}
      >

        <Form className="justify-content-center align-item-center">
          <dl>
            <dt>User Id</dt>
            <dd> <Field type="text" onKeyUp={verifyUserId} name="UserId" className="form-control w-25" /> </dd>
            <dd className="text-danger"> <ErrorMessage name="UserId" /> </dd>
            <dd style={{ color: color }}>{userError}</dd>
            <dt>User Name</dt>
            <dd> <Field type="text" name="UserName" className="form-control w-25" /> </dd>
            <dd className="text-danger"> <ErrorMessage name="UserName" /> </dd>

            <dt>Password</dt>
            <dd> <Field type="text" name="Password" className="form-control w-25" /> </dd>
            <dd className="text-danger"> <ErrorMessage name="Password" /> </dd>

            <dt>Age</dt>
            <dd> <Field type="number" name="Age" className="form-control w-25" /> </dd>
            <dd className="text-danger"> <ErrorMessage name="Age" /> </dd>

            <dt>Email</dt>
            <dd> <Field type="email" name="Email" className="form-control w-25" /> </dd>
            <dd className="text-danger"> <ErrorMessage name="Email" /> </dd>

            <dt>Mobile</dt>
            <dd> <Field type="text" name="Mobile" className="form-control w-25" /> </dd>
            <dd className="text-danger"> <ErrorMessage name="Mobile" /> </dd>
          </dl>

          <button type="submit" className="btn btn-primary">SignUp</button>
          <div>
            <Link to='/signin'>Existing User</Link>
          </div>
        </Form>

      </Formik>
    </div>
  )
}

export default SignupComponent;