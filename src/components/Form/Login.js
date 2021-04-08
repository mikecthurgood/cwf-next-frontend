import React, {useState, useContext} from 'react';

import Styled from 'styled-components';
import Input from './Inputs/Input';
import { State, Dispatch } from '../../store/Store';
import { loginHandler } from '../../services/helpers/AuthHelpers'

const AuthForm = ({layout}) => {
  const { loginError } = useContext(State)
  const dispatch = useContext(Dispatch);

  const [userEmail, setUserEmail ] = useState('')
  const [password, setPassword ] = useState('')
  
  const compact = layout === 'compact';

  function inputChangeHandler (input, value) {
    if (input === 'userEmail') return setUserEmail(value)
    return setPassword(value)
  };

  async function submitHandler (e) {
    e.preventDefault()
    const submitData = {
      email: userEmail,
      password: password
    };
    const response = await loginHandler(dispatch, e, { submitData })

    if (response && response.error) {
      return setErrorMessages(response.error)
    }
  }
  
  const disabled = password.length < 5 || userEmail.length < 5
      
  return (
    <>
      <AuthFormContainer >
          <>
            <Form 
              layout={layout}
              onSubmit={e => submitHandler(e)}
            >
              {!compact && <AuthButton>Register</AuthButton>}
              <FormInput>
                <Input
                  id="userEmail"
                  loginError={loginError}
                  type="email"
                  placeholder='Email'
                  onChange={inputChangeHandler}
                  value={userEmail}
                  compact={compact}
                />
              </FormInput>
              <FormInput>
                <Input
                  id="password"
                  loginError={loginError}
                  type="password"
                  placeholder='Password'
                  onChange={inputChangeHandler}
                  value={password}
                  compact={compact}
                />
              </FormInput>
              <AuthButton compact={compact} disabled={disabled} className={disabled ? 'disabled' : 'active'}>Login</AuthButton>
            </Form>
          </>
      </AuthFormContainer>
    </>
  )
}

export default AuthForm

const AuthFormContainer = Styled.div`
  justify-content: center;
  width: 100%;
  display: flex;
`

const Form = Styled.form`
  display: flex;
  flex-direction: ${({ layout }) => layout === 'compact' ? 'column' : 'row' };
  font-weight: 400;

  h6 {
    padding: 0;
    margin: 5px 0 10px 0 ;
    font-family: 'Muli', sans-serif;
    font-size: 16px;
    color: red
  }
`
const FormInput = Styled.div`
  position: relative;
  top: -0.25rem;
  margin: ${({ layout }) => layout === 'compact' ? '0' : '0 0.3rem' };
  max-width: 9rem;
`
const AuthButton = Styled.button`
  height: 2rem;
  margin: ${({compact}) => compact ? '0 0.3rem' : '0.7rem 0.3rem'};
  background-color: #0f59c7;
  border-radius: 4px;
  border-width: 1px;
  color: white;
  outline: none;
  font-family: 'Muli', sans-serif;
  font-weight: 700;
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
`