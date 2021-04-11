import { loginHandler } from './AuthHelpers';
jest.setTimeout(30000);
jest.mock('../api/AuthQueries');

describe('AuthHelpers', () => {
    it('should send a login request to the api and set correct fields', async () => {
        const dispatch = jest.fn()
        const event = {
            preventDefault: jest.fn()
        }
        const authData = {
            email: 'test@test.com',
            password: 'qwerty'
        };

        await loginHandler(dispatch, event, authData)
        
        expect(dispatch).toHaveBeenCalledWith({
            type: "setUser",
            data: {
                isAuth: true,
                token: 123456789,
                userId: 123,
                username: "Steve Rogers"
            },
        })
        expect(dispatch).toHaveBeenCalledWith({
            type: "setLoginMenuVisible",
            data: false,
        });
    })

    it('should send a login request to the api and set correct fields', async () => {
        const dispatch = jest.fn();
        const event = {
            preventDefault: jest.fn()
        };
        const authData = {
            email: 'failme',
            password: 'qwerty'
        };

        jest.useFakeTimers();

        await loginHandler(dispatch, event, authData);
        
        jest.advanceTimersByTime(1000);
        
        expect(dispatch).toHaveBeenCalledWith({
            type: 'setLoginError',
            data: true
        });

        expect(dispatch).toHaveBeenCalledWith({
            type: 'setLoginError',
            data: false
        });
    })
    
});
