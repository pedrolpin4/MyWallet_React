import API from "./api";
import BearerToken from "./bearer";

const postSignUp = async (forms) => {
    const response = await API.post("/sign-up", forms)
        .catch(e =>{
            if(e.response){
                if(e.response.status === 400) return{
                    success: false,
                    message: "Please follow the sign-up instructions"
                }

                if(e.response.status === 409) return{
                    success: false,
                    message: "Looks like this email is already in use"
                }
            }

            return{
                success: false,
                message: "The server is not okay now, but we'll fix it ASAP"
            }
        })

        if(response.data) return{
            success: true,
            data: response.data
        }

        return response
}

const postSignIn = async (forms) => {
    const response = await API.post("/sign-in", forms)
    .catch(e =>{
        if(e.response){
            if(e.response.status === 400) return{
                success: false,
                message: "Please follow the sign-up instructions"
            }

            if(e.response.status === 401) return{
                success: false,
                message: "Invalid email and/or password"
            }

            if(e.response.status === 404) return{
                success: false,
                message: "Looks like this email is not on our database, click below to sign-up"
            }
        }

        return{
            success: false,
            message: "The server is not okay now, but we'll fix it ASAP"
        }
    })

    if(response.data) return{
        success: true,
        data: response.data
    }

    return response
}

const getCashFlow = async (token) => {
    const response = await API.get("/cash-flow", BearerToken(token))
    .catch(e => {
        if(e.response.status === 404) return{
            success: false,
            message: "Looks like you don't have any transactions"
        }
        return{
            success: false,
            message: "Looks like our server is not okay, we'll fix it ASAP"
        }
    })
    if(response.data) return {
        success: true,
        data: response.data
    }
}

const service = {
    postSignUp,
    postSignIn,
    getCashFlow
};

export default service