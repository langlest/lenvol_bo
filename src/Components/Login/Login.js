import React, { useState } from 'react';

import { Formik } from "formik"; // Validation reprise sur ....
import * as EmailValidator from "email-validator"; //https://www.digitalocean.com/community/tutorials/how-to-validate-a-login-form-with-react-and-formik

import PropTypes from 'prop-types';
import { LoginDev } from "../../api/APIUtils";
import useToken from '../../App/useToken';
import '../../Styles/Login.css';
import {
    Link
  } from "react-router-dom";
import { render } from '@testing-library/react';



export default function Login({ setToken }){

  const validateToken = async (values) => {
    console.log('validateToken  ',values)
    const username = values.email;
    const password = values.password;
    const token = await LoginDev({
      username,
      password
    });
    setToken(token);
  };

  return(
    ValidatedLoginForm(validateToken)
  );
}


const ValidatedLoginForm = (validateToken) => (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
        validateToken(values)
        setSubmitting(false);
    }}
    validate={values => {
      let errors = {};
      if (!values.email) {
        errors.email = "Requis";
      } else if (!EmailValidator.validate(values.email)) {
        errors.email = "Identifiant invalide.";
      }

      const passwordRegex = /(?=.*[0-9])/;
      if (!values.password) {
        errors.password = "Requis";
      } else if (values.password.length < 8) {
        errors.password = "Doit avoir au mois 8 caractères.";
      } else if (!passwordRegex.test(values.password)) {
        errors.password = "Mot de passe invalide. Il doit contenir un chiffre.";
      }

      return errors;
    }}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;


      return(
        <div style={{height: "100vh", backgroundColor:"rgb(36,155,215)"}}>
          <div className="logo" />
          <div className="WhiteCircle" />
          <div className="YellowCircle " />
          <div className="form">
              <form style={{textAlign:"center"}} onSubmit={handleSubmit}>
                <div style={{color:'white',fontWeight: 'lighter'}}>Bienvenue dans l’administration l’Envol</div>
                <div>
                  <input 
                  id="email"
                  name="email"
                  type="text" 
                  placeholder="Identifiant" 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email && "error"}
                  />
                  {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email}</div>
                  )}
                </div>
                <div>
                  <input 
                  id="password"
                  name="password"
                  type="password" 
                  placeholder="Mot de passe" 
                  value={values.password}
                  //onChange={e => setPassword(e.target.value)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.password && touched.password && "error"}
                  />
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-item" style={{padding:'5px',marginLeft:'200px'}}>
                  <button type="submit" disabled={isSubmitting}>Connexion</button>
                </div>   
              </form>
              <div className="footer" >
              <div style={{width:"480px"}}>Association reconnue d’utilité publique habilitée à recevoir dons, legs et donations</div>
            </div>
          </div>
        </div>
      );
    }}
  </Formik>
)
Login.propTypes = {
  setToken: PropTypes.func.isRequired
};
