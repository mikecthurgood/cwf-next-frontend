import React, {useContext} from 'react';
import Styled from 'styled-components';
import { State, Dispatch } from '../../../store/Store';

const WallFilter = () => {
    const { filterSelection } = useContext(State);
    const dispatch = useContext(Dispatch);

    function handleFilterChange (e) {
        const selection = e.target.name
        let updatedSelection;
        if (filterSelection.includes(selection)) {
            updatedSelection = filterSelection.filter(val => val !== selection)
        } else {
            updatedSelection = [...filterSelection, selection]
        }
        dispatch({ type: 'setFilterSelection', data: updatedSelection })
    }

    return (
        <WallFilterContainer>
            <label className='filter__menu-form-heading'>
                    <strong>Wall Type</strong>
            </label>
            <form>
                <label className='filter__menu-checkbox'>
                    Bouldering: 
                    <input
                        name="bouldering"
                        type="checkbox"
                        checked={filterSelection.includes('bouldering')}
                        onChange={handleFilterChange} 
                    />
                    <span className="checkbox"></span>
                </label>
                <label className='filter__menu-checkbox'>
                    Top Roping: 
                    <input
                        name="top"
                        type="checkbox"
                        checked={filterSelection.includes('top')}
                        onChange={handleFilterChange} 
                    />
                    <span className="checkbox"></span>
                </label>
                <label className='filter__menu-checkbox'>
                    Lead: 
                    <input
                        name="lead"
                        type="checkbox"
                        checked={filterSelection.includes('lead')}
                        onChange={handleFilterChange} 
                    />
                    <span className="checkbox"></span>
                </label>
                <label className='filter__menu-checkbox'>
                    Auto Belay: 
                    <input
                        name="auto"
                        type="checkbox"
                        checked={filterSelection.includes('auto')}
                        onChange={handleFilterChange} 
                    />
                    <span className="checkbox"></span>
                </label>
            </form>
        </WallFilterContainer>
    )}

export default WallFilter

const WallFilterContainer = Styled.div`
    form {
        display: flex;
        flex-direction: column;
        margin-top: 10px;

        input {
            padding-left: 20px;
        }
        .filter__menu-checkbox {
            padding-left: 20px;
            width: 70%;
            margin-bottom: 10px;
        }
    }

    input[type=checkbox] {
        visibility: hidden
    }
    .checkbox {
        float: right;
        position: relative; 
        top: 3px; 
        left: -15px; 
        height: 16px; 
        width: 16px; 
        background-color: #282c34;
        border-radius: 3px;
    }

    .filter__menu-checkbox input:checked ~ .checkbox { 
        background-color: #282c34; 
    } 
    
    
    .filter__menu-checkbox input:checked ~ .checkbox:after { 
        display: block; 
    } 
    
    .checkbox:after { 
        content: ""; 
        position: absolute; 
        display: none; 
        left: 2px; 
        bottom: 2px; 
        width: 6px; 
        height: 6px; 
        border: solid #ed5656; 
        border-width: 3px 3px 3px 3px;
        border-radius: 3px;

    }
`
                