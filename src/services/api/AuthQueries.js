import post from './Request';

export const handleLogin = async (authData) => {
    const { email, password } = authData.submitData
    const graphqlQuery = {
        query: `
        query LoginUser($email: String!, $password: String!){
            login(
            email: $email,
            password: $password
            ) {
            token
            userId
            username
            }
        }
        `,
        variables: {
        email: email,
        password: password
        }
    }
        try {
        const res = await post(graphqlQuery);
        const resData = res.data;
        if (resData.errors && resData.errors.length > 0 && resData.errors[0].status === 422) {
            throw new Error('Validation failed.');
        }
        if (resData.errors && resData.errors.length > 0) {
            throw new Error('Could not authenticate you!');
        }

        localStorage.setItem('token', resData.data.login.token);
        localStorage.setItem('userId', resData.data.login.userId);
        localStorage.setItem('userName', resData.data.login.username);
        return {
            isAuth: true,
            token: resData.data.login.token,
            userId: resData.data.login.userId,
            username: resData.data.login.username
        };
    } catch (err) {
        console.log(err);
        return {
            isAuth: false,
            authLoading: false,
            error: err
        };
    }
}

//  export const handleSignup = async (authData) => {
//     const promise = new Promise( async (resolve, reject) => {
//     const { username, email, password, passwordConfirmation } = authData.submitData
//     const errors = []
//     try{
//         if (password !== passwordConfirmation) {
//             const error = new Error();
//             error.name = "Passwords do not match"
//             error.message = "Passwords do not match"
//             error.type = "passwordMatch"
//             errors.push(error)
//             throw error
//         }
//         const graphqlQuery = {
//           query: `
//               mutation UserSignUp($email: String!, $name: String!, $password: String!) {
//               createUser(userInput: {
//                   email: $email,
//                   name: $name,
//                   password: $password
//               }) {
//                   id
//                   email
//                   name
//               }
//               }
//           `,
//           variables: {
//               email: email,
//               name: username,
//               password: password
//           }
//         }

//         const resData = post(graphqlQuery).then(res => res.data)

//         if (resData.errors && resData.errors.length > 0 && resData.errors[0].data.includes(423)) {
//           const usernameError = new Error(
//               "Username exists. Please choose another username"
//           );
//           errors.push(usernameError)
//         }
//         if (resData.errors && resData.errors.length > 0 && resData.errors[0].data.includes(422)) {
//         const emailError = new Error(
//             "Email address already registered."
//         );
//         errors.push(emailError)
//         }
//         if (resData.errors && resData.errors.length > 0 && resData.errors[0].data.includes(424)) {
//           const invalidEmail = new Error(
//               "Invalid email address"
//           );
//           errors.push(invalidEmail)
//         }
//         if (resData.errors && resData.errors.length > 0 && resData.errors[0].data.includes(425)) {
//           const passwordLengthError = new Error(
//               "Password is to short (5 characters minimum)"
//           );
//           errors.push(passwordLengthError)
//         }
//         if (resData.errors && resData.errors.length > 0) {
//           const signupErrors = new Error('User creation failed!');
//           signupErrors.data = errors
//           throw signupErrors
//         }
//         resolve({
//           isAuth: false,
//           authLoading: false,
//           signupSuccess: true,
//           userID: resData.data.createUser.id,
//           username: resData.data.createUser.name
//         });
//     }
//       catch(err) {
//         console.log(err);
//         resolve({
//           isAuth: false,
//           authLoading: false,
//           error: errors,
//           signupSuccess: false
//         })
//       };
//   })
//   return promise
// }