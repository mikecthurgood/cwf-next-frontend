import React from 'react';
import Styled from 'styled-components';

const TextArea = props => (
  <InputContainer>
    {props.label && <label htmlFor={props.id}>{props.label}</label>}
    <textarea
      className={[
        !props.valid ? 'invalid' : 'valid',
        props.touched ? 'touched' : 'untouched'
      ].join(' ')}
      id={props.id}
      rows={props.rows}
      required={props.required}
      value={props.value}
      onChange={e => props.onChange(props.id, e.target.value)}
      onBlur={props.onBlur}
      />
  </InputContainer>
);

export default TextArea;

const InputContainer = Styled.div`
    margin: 1rem 0;
    width: 100%;
    overflow: hidden;

  label {
    display: block;
    text-transform: uppercase;
    margin-bottom: 0.25rem;
    color: #282c34;
  }

  textarea {
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
`
