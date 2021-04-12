import React, {useState, useContext, useEffect} from 'react';
import Styled from 'styled-components';
import { Dispatch, State } from '../../../../store/Store';

const PostcodeSort = ({setFilterMenuVisibility}) => {

    const dispatch = useContext(Dispatch)
    const { userPostcode } = useContext(State)
    const [postcodeInput, setPostcodeInput] = useState(userPostcode)
    const [postcodeInputVisible, setPostcodeInputVisible] = useState(true)

    useEffect(() => {
        if (userPostcode) {
            setPostcodeInputVisible(false)
        }
    },[userPostcode])

    function handleSetPostcode (e) {
        e.preventDefault()
        setPostcodeInputVisible(false)
        let newPostcode
        const postcodeRegEx = /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i; 
        if (!postcodeInput) {
            newPostcode = ''
            localStorage.removeItem('userPostcode')
            setFilterMenuVisibility()
            dispatch({ type: 'setPostcode', data: newPostcode })
        }
        const validPostcode = postcodeRegEx.test(postcodeInput); 
        if (validPostcode) {
            newPostcode = postcodeInput
            localStorage.setItem('userPostcode', postcodeInput)
            setFilterMenuVisibility()
            dispatch({ type: 'setPostcode', data: newPostcode })
        }
    }

    function handlePostcodeChange (e) {
        setPostcodeInput(e.target.value)
    }

    function clearPostcode () {
        setPostcodeInput('')
        localStorage.removeItem('userPostcode')
        dispatch({ type: 'setPostcode', data: '' })
        setPostcodeInputVisible(true)
    }

    return (
        <PostcodeSortContainer>
            <label className='filter__menu-form-heading'>
                    <strong>Sort by distance</strong>
            </label>
                <>
                    <div className='change-post-code-container'>
                        {userPostcode && ( 
                            <p className='postcode-confirmation'>Sorted by distance from <strong>{userPostcode.toUpperCase()}</strong></p>
                        )}
                        {userPostcode && (
                            <span>
                                <p className='changePostcode' onClick={() => {
                                    setPostcodeInputVisible(!postcodeInputVisible)
                                }}>
                                    {postcodeInputVisible ? 'Cancel' : 'Change'}
                                </p>
                                {!postcodeInputVisible && (
                                    <p className='changePostcode' onClick={clearPostcode}>{`Clear`}</p>
                                )}
                            </span>
                        )}
                        <form className={`filter__menu-sort-form ${postcodeInputVisible ? 'visible' : ''}`}
                            onSubmit={handleSetPostcode} 
                            autoComplete="off"
                        >
                            <input
                                type="text" 
                                placeholder='Enter Postcode' 
                                name='searchInput' 
                                className={`filter__menu-sort-input`} 
                                value={postcodeInput}
                                onChange={handlePostcodeChange} 
                            />
                             <SubmitButton type="submit" value='Set' />
                        </form>
                    </div>
                </>
               
        </PostcodeSortContainer>
    )
}

export default PostcodeSort

const PostcodeSortContainer = Styled.div`
    .filter__menu-sort-form {
        display: none;
        margin-bottom: -45px;
        &.visible {
            display: flex;
        }
        .filter__menu-sort-input {
            position: relative;
            left: 10px;
            font-size: 16px;
            padding: 10px 2px 10px 10px;
            text-align: left;
            max-width: 200px;
            min-width: 180px;
            border: 1px solid black;
            border-radius: 3px;
            margin-top: 5px;
            transition: opacity 0.25s ease-out;
            font-family: 'Muli', sans-serif;
            color: #282c34;
            &:focus {
                outline: none;
            }
        }
    }
    .change-post-code-container {
        width: 70%;
        padding-left: 20px;
        .filter__menu-sort-input {
            left: 0;
        }
        span {
            display: flex;
            justify-content: space-between;
            p {
                margin: 10px 0 0 0;
                &:hover{
                    color: #ed5656;
                    cursor: pointer;
                }
            }
        }
        p {
            margin: 10px 0 0 0; 
        }
    }
`

const SubmitButton = Styled.input`
    position: relative;
    top: 4.5px;
    height: 42.5px;
    width: 44px;
    text-align: center;
    padding: 5px;
    border: 1px solid black;
    background-color: #ed5656;
    color: white;
    font-family: 'Muli', sans-serif;
    border-radius: 0 5px 5px 0;
    &:active, &:focus {
        outline: none;
    }
    &:hover {
        background-color: cf4b4b;
    }

`
                