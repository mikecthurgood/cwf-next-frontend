import React from 'react';
import Styled from 'styled-components';

const input = props => (
  <InputContainer compact={props.compact} >
    {props.label && <label htmlFor={props.id}>{props.label}</label>}
    <input
      className={[
        !props.valid ? 'invalid' : 'valid',
        props.touched ? 'touched' : 'untouched',
        props.loginError ? 'errorFlash' : ''
      ].join(' ')}
      type={props.type}
      id={props.id}
      required={props.required}
      value={props.value}
      placeholder={props.placeholder}
      onChange={e => props.onChange(props.id, e.target.value, e.target.files)}
      onBlur={props.onBlur}
    />
  </InputContainer>
);

export default input;

const InputContainer = Styled.div`
    margin: ${({compact}) => compact ? '0.4rem 0' : '1rem 0'};
    width: 100%;
    overflow: hidden;

  label {
    display: block;
    text-transform: uppercase;
    margin-bottom: 0.25rem;
    color: #282c34;
  }

  input {
    display: block;
    font: inherit;
    padding: 0.25rem 0.5rem;
    width: 100%;
    border-radius: 3px;
    border: 1px solid #ccc;
  }

  .touched.invalid {
      border-color: red;
      background: #ffc2c2;
  }

  textarea:focus {
    outline: none;
    border-color: #3b0062;
    color: #3b0062;
  }
  
  .errorFlash {
    position: relative;
    animation: shake .1s linear;
    animation-iteration-count: 3;
    background-color: rgba(255, 44, 44, 0.629);
    
    @keyframes shake {
      0% { left: 0 }
      100% { right: -5px; }
    }
  }
`
