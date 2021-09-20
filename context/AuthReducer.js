
const AuthReducer = (preState, action) => {
    switch (action.type) {
        case "RETRIEVE_TOKEN":
            return {
                ...preState,
                userToken: action.token,
                isLoading: false,
            }
        case "LOGIN":
            return {
                ...preState,
                phone: action.id,
                userToken: action.token,
                isLoading: false,
            }
        case "LOGOUT":
            return {
                ...preState,
                phone: null,
                userToken: null,
                isLoading: false,
            }
        case "REGISTER":
            return {
                ...preState,
                phone: action.id,
                userToken: action.token,
                isLoading: false,
            }
        default:
            break;
    }
}

export default AuthReducer