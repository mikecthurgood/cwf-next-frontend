import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { handleLogin } from './AuthQueries';

describe('AuthQueries', () => {
    let mock;
    const url = 'https://clambr-api.herokuapp.com/graphql';

    beforeEach(() => {
        mock = new MockAdapter(axios);
        localStorage.clear();
    });

    const authData = {
        submitData: {
            email: 'test@test.com',
            password: 'qwerty',
        },
    };

    it('successfully log a user in and set local storage', async () => {
        const responseData = {
            login: {
                token: '123456789',
                userId: '123',
                username: 'Old Captain Testy',
            },
        };

        mock.onPost(url).reply(200, { data: responseData })
        const response = await handleLogin(authData)

        expect(response.isAuth).toEqual(true);
        expect(response.token).toEqual('123456789');
        expect(response.userId).toEqual('123');
        expect(response.username).toEqual('Old Captain Testy');
        expect(localStorage.getItem('token')).toEqual('123456789')
        expect(localStorage.getItem('userId')).toEqual('123')
        expect(localStorage.getItem('userName')).toEqual('Old Captain Testy')
    })

    it('return errors on a failed login and not log a user in', async () => {
        const responseData = {
            errors: [{status: 422}],
        };
        mock.onPost(url).reply(200, { ...responseData })
        const response = await handleLogin(authData)
        expect(response.isAuth).toEqual(false);
        expect(response.authLoading).toEqual(false);
        expect(response.error).toEqual(new Error('Validation failed.'))
    });

    it('return errors on a failed login and not log a user in', async () => {
        const responseData = {
            errors: [{status: 403}],
        };
        mock.onPost(url).reply(200, { ...responseData })
        const response = await handleLogin(authData)
        expect(response.isAuth).toEqual(false);
        expect(response.authLoading).toEqual(false);
        expect(response.error).toEqual(new Error('Could not authenticate you!'))
    })
})