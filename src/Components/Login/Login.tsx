import React from 'react';

import { Formik } from "formik"; // Validation reprise sur ....
import * as EmailValidator from "email-validator"; //https://www.digitalocean.com/community/tutorials/how-to-validate-a-login-form-with-react-and-formik

import PropTypes from 'prop-types';
import { LoginDev } from "../../api/APIUtils";
import {ERREUR_PASSWORD, FOOTER_LOGIN, HEADER_LOGIN} from "../../App/constantes";
import '../../Styles/Login.css';


export default function Login({ setToken }:any){

  const validateToken = async (values:any) => {
    const username:string = values.email;
    const password:string = values.password;
    const token = await LoginDev(username, password);
    setToken(token);
  };

  return(
    ValidatedLoginForm(validateToken)
  );
}


const ValidatedLoginForm = (validateToken:any) => (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
        validateToken(values)
        setSubmitting(false);
    }}
    validate={values => {
      let errors : {password:string};
      errors = {password : ""};
      
      //!values.email || !EmailValidator.validate(values.email) || 
      const passwordRegex = /(?=.*[0-9])/;
      if (!values.email || !EmailValidator.validate(values.email) || !values.password || values.password.length < 8 || !passwordRegex.test(values.password)) {
        errors.password = ERREUR_PASSWORD;
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
                <div style={{color:'white',fontWeight: 'lighter'}}>{HEADER_LOGIN}</div>
                <div style={{marginBottom:"5px"}}>
                  <input 
                    id="email"
                    name="email"
                    type="text" 
                    placeholder="Identifiant" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={String(errors.email) && String(touched.email) && "error"}
                  />
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
                  className={String(errors.password) && String(touched.password) && "error"}
                  />
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-item" style={{padding:'5px',marginLeft:'200px'}}>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Connexion</button>
                </div>   
              </form>
              <div className="footer" >
              <div >{FOOTER_LOGIN}</div>
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
