import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Form Input', () => {
    afterEach(cleanup);
    it('should render the component', () => {
        const props = {
            valid: false,
            touched: false,
            loginError: false,
        }
        const { container } = render(
            <Input {...props} />
        );

        expect(container).toMatchSnapshot()
    });

    it('should render the component', () => {
        const props = {
            valid: true,
            touched: true,
            loginError: true,
            label: 'test label',
        }
        const { container } = render(
            <Input {...props} />
        );
        expect(container).toMatchSnapshot()
    });

    it('should render the component', () => {
        const props = {
            valid: true,
            touched: true,
            loginError: true,
            label: 'test label',
            onChange: jest.fn(),
        }
        const { getByTestId } = render(
            <Input {...props} />
        );

        fireEvent.change(getByTestId('form-input'), { target: { value: 'Good Day' } })
        expect(props.onChange).toBeCalled();
        
    })
});
