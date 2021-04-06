import React, {useState, useEffect, useContext} from 'react';
import { useRouter } from 'next/router'
import { Link } from 'next/link';

import Styled from 'styled-components';
import Input from './Inputs/Input';
import { required, length, email } from '../../util/validators';
import { State } from '../../store/Store';



const AuthForm = ({ loginToggle, signupHandler, signup, hideRegisterButton, loginHandler, topNav }) => {
  const { user, loginError } = useContext(State)
  const router = useRouter();

  useEffect(() => {
    if (user && user.userId) {
      return router.push("/")
    }
  }, []);

  const [ userEmail, setUserEmail ] = useState({
    value: '',
    valid: false,
    touched: false,
  })

  const [password, setPassword ] = useState({
    value: '',
    valid: false,
    touched: false,
  })

  const [passwordConfirmation, setPasswordConfirmation ] = useState({
    value: '',
    valid: false,
    touched: false,
  })

  const [username, setUsername] = useState({
    value: '',
    confirmation: '',
    valid: false,
    touched: false,
  })

  const validators = {
    userEmail: [required, email],
    password: [required, length({ min: 5 })],
    passwordConfirmation: [required, length({ min: 5 })],
    username: [required]
  }

  const [errorMessages, setErrorMessages] = useState([])

  function inputChangeHandler (input, value) {

    let isValid = true;
    
    for (const validator of validators[input]) {
      isValid = isValid && validator(value);
    }

    switch (input) {
      case 'username': setUsername({...username, value, valid: isValid})
      break;
      case 'userEmail': setUserEmail({...userEmail, value, valid: isValid})
      break;
      case 'password': setPassword({...password, value, valid: isValid})
      break;
      case 'passwordConfirmation': setPasswordConfirmation({...passwordConfirmation, value, valid: isValid})
      break;
    }
  };

  function inputBlurHandler (e) {
    const {value, id} = e.target
    let isValid = true;
    for (const validator of validators[id]) {
      isValid = isValid && validator(value);
    }

    switch (id) {
      case 'username': setUsername({...username, valid: isValid, touched: true })
      break;
      case 'userEmail': setUserEmail({...userEmail, valid: isValid, touched: true})
      break;
      case 'password': setPassword({...password, valid: isValid, touched: true})
      break;
      case 'passwordConfirmation': setPasswordConfirmation({...passwordConfirmation, valid: isValid, touched: true})
      break;
    }
  };

  async function submitHandler (e) {
    e.preventDefault()
    const submitData = signup ? 
        {
          username: username.value, 
          email: userEmail.value,
          password: password.value,
          passwordConfirmation: passwordConfirmation.value,
        }
        :
        {
          email: userEmail.value,
          password: password.value
        }

    const response = signup ? await signupHandler(e, { submitData }) : await loginHandler(e, { submitData })
    if (response && response.error) {
      return setErrorMessages(response.error)
    }
  }

  function closeMobileMenu () {
    loginToggle()
  }
  
  const disabled = password.value.length < 3 || userEmail.value.length < 3 ? true : false
      
  return (
    <>
      <AuthFormOuterContainer>
        <AuthFormInnerContainer>
          <AuthFormComponents topNav={topNav}>
            {!signup && !hideRegisterButton && <button className='login_logout register'>Register</button>}
            <form className={`${loginError ? 'error' : ''}`}
                onSubmit={e => submitHandler(e)}
            >
                {signup && <Input
                id="username"
                label="username"
                type="text"
                control="input"
                placeholder="Choose a username"
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                value={username.value}
                valid={username.valid}
                touched={username.touched}
                />}
                <Input
                id="userEmail"
                label={`${signup ? 'Your Email' : ''}`}
                type="email"
                control="input"
                placeholder={`${signup ? 'Enter your email' : 'Email'}`}
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                value={userEmail.value}
                valid={userEmail.valid}
                touched={signup ? userEmail.touched : null}
                />
                <Input
                id="password"
                label={`${signup ? 'Password' : ''}`}
                type="password"
                control="input"
                placeholder={`${signup ? 'Choose your password' : 'Password'}`}
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                value={password.value}
                valid={password.valid}
                touched={signup ? password.touched : null}
                />
                {signup && <Input
                id="passwordConfirmation"
                label="Confirm Password"
                type="password"
                control="input"
                placeholder="Confirm your password"
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                value={passwordConfirmation.confirmation}
                valid={passwordConfirmation.valid}
                touched={passwordConfirmation.touched}
                />}
                {signup && errorMessages.length > 0 ? (
                  <><div className='signup-errors'>
                  <h6>THERE WERE SOME ERRORS</h6>
                    {errorMessages.map(error => {
                      return (
                          <h6 key={error.message}>- {error.message}</h6>
                      )
                    })}
                    </div>
                  </>)
                  :
                  <>
                  </>
                }
                <div className='submit-button'>
                  <button onClick={closeMobileMenu} disabled={disabled} className={`login_logout ${disabled ? 'disabled' : 'active'}`}>{signup ? 'Signup' : 'Login'}</button>
                </div>
            </form>
            </AuthFormComponents>
        </AuthFormInnerContainer>
    </AuthFormOuterContainer>
    </>
  )
}

export default AuthForm

const AuthFormOuterContainer = Styled.div`
  justify-content: center;
  width: 100%;
  display: flex;
`

const AuthFormInnerContainer = Styled.div`
  padding-top: 60px;
  width: 60%;
  color: white;
`

const AuthFormComponents = Styled.div`
  flex-direction: ${({topNav}) => topNav ? 'row' : 'column' };
  
  .login_logout {
    display: flex;
    height: 24px;
    margin: 0; 
    background-color: #0f59c7;
    border-radius: 4px;
    border-width: 1px;
    color: white;
    outline: none;
    font-family: 'Muli', sans-serif;
    &:hover {
      filter: brightness(115%);
    }
      &.disabled{
        filter: brightness(80%);
      }
    &:active {
      background-color: #136cf1;
      transform: translateY(0.5px);
    }
    @media only screen and (max-width: 480px) {
      margin: 0;
      height: 30px;
      font-size: 16px;
    }
  }

  h6 {
    padding: 0;
    margin: 5px 0 10px 0 ;
    font-family: 'Muli', sans-serif;
    font-size: 16px;
    color: red
  }


`