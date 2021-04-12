import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import TextArea from './TextArea';

describe('Form Text Area', () => {
    afterEach(cleanup);
    it('render the component', () => {
            const props = {
                valid: false,
                touched: false,
                loginError: false,
            };
    
        const { container } = render(
            <TextArea {...props} />
        );

        expect(container).toMatchSnapshot();
    });

    it('render the component', () => {
        const props = {
            valid: true,
            touched: true,
            loginError: true,
            label: 'test label'
        };

        const { container } = render(
            <TextArea {...props} />
        );

        expect(container).toMatchSnapshot();
    });

    it('should render the component', () => {
        const props = {
            valid: true,
            touched: true,
            loginError: true,
            label: 'test label',
            onChange: jest.fn(),
        };
        const { getByTestId } = render(
            <TextArea {...props} />
        );

        const textArea = getByTestId('form-text-area');
        fireEvent.change(textArea, { target: { value: 'Good Day' } });
        expect(props.onChange).toBeCalled();
        expect(textArea.value).toBe('Good Day');
        
    })
});
