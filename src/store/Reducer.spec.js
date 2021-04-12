import Reducer from './Reducer';

describe('Reducer', () => {
    const state = {};

    it('should add filter selections to the array', () => {
        expect(Reducer(state, {
            type: 'setFilterSelection',
            data: ['testFilter'],
        })).toEqual({
            ...state, filterSelection: ['testFilter']
        });
    });

    it('should setLoginError with a boolean value', () => {
        expect(Reducer(state, {
            type: 'setLoginError',
            data: true,
        })).toEqual({
            ...state, loginError: true
        });
    });

    it('should setLoginMenuVisible with a boolean value', () => {
        expect(Reducer(state, {
            type: 'setLoginMenuVisible',
            data: true,
        })).toEqual({
            ...state, loginMenuVisible: true
        });
    });

    it('should setMobileMenuVisible with a boolean value', () => {
        expect(Reducer(state, {
            type: 'setMobileMenuVisible',
            data: true,
        })).toEqual({
            ...state, mobileMenuVisible: true
        });
    });

    it('should setSearchBarVisibility with a boolean value', () => {
        expect(Reducer(state, {
            type: 'setSearchBarVisibility',
            data: true,
        })).toEqual({
            ...state, searchBarVisible: true
        });
    });

    it('should setSearchBarVisibility with a boolean value', () => {
        expect(Reducer(state, {
            type: 'setSearchBarVisibility',
            data: true,
        })).toEqual({
            ...state, searchBarVisible: true
        });
    });

    it('should setSignUpSuccess with a boolean value', () => {
        expect(Reducer(state, {
            type: 'setSignUpSuccess',
            data: true,
        })).toEqual({
            ...state, signUpSuccess: true
        });
    });

    it('should set a single wall', () => {
        const wall = {
            name: 'test wall',
            details: 'test details'
        };

        expect(Reducer(state, {
            type: 'setSingleWall',
            data: wall,
        })).toEqual({
            ...state, singleWall: wall
        });
    });

    it('should set a user', () => {
        const user = {
            username: 'Old Captain Testy',
            userId: 123,
            isAuth: true,
            token: '123456789'
        };

        const updatedState = Reducer(state, {
            type: 'setUser',
            data: user
        });

        expect(updatedState.user.username).toEqual('Old Captain Testy');
        expect(updatedState.user.userId).toEqual(123);
        expect(updatedState.user.isAuth).toEqual(true);
        expect(updatedState.user.token).toEqual('123456789');
    });

    it('should use setPostcode to set a postcode', () => {
        expect(Reducer(state, {
            type: 'setPostcode',
            data: 'se1 1aa',
        })).toEqual({
            ...state, userPostcode: 'se1 1aa'
        });
    });

    it('should set an arra of walls', () => {
        const walls = [
            {
                name: 'test wall',
                details: 'test details'
            },
            {
                name: 'test wall2',
                details: 'test details'
            },
            {
                name: 'test wall3',
                details: 'test details'
            },
        ];

        expect(Reducer(state, {
            type: 'setWalls',
            data: walls,
        })).toEqual({
            ...state, walls
        });
    });

    it('should sign a user out', () => {
        localStorage.setItem('token', '123456789')
        localStorage.setItem('userName', 'Old Captain Testy')
        localStorage.setItem('userId', 123456)

        const updatedState = Reducer(state, {
            type: 'signOut'
        })

        const token = localStorage.removeItem('token')
        const userName = localStorage.removeItem('userName')
        const userId = localStorage.removeItem('userId')

        expect(updatedState.user.username).toEqual(null);
        expect(updatedState.user.userId).toEqual(null);
        expect(updatedState.user.isAuth).toEqual(false);
        expect(updatedState.user.token).toEqual('');
        expect(updatedState.mobileMenuVisible).toEqual(false);
        expect(updatedState.loginMenuVisible).toEqual(false);
        expect(token).toEqual(undefined);
        expect(userName).toEqual(undefined);
        expect(userId).toEqual(undefined);
    });

    it('should throw an error if the type is invalid', () => {
        expect(() => Reducer(state,{
            type: 'invalid'
        })).toThrow('Invalid action type dispatched')
    })
})




//     default: 
//         throw new Error('Invalid action type dispatched')
// }