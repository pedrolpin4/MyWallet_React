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
    let status;
    let serverError;

    const response = await API.get("/cash-flow", BearerToken(token))

    .catch(err => {
        if(err.response){
            status = err.response.status;
            return status
        }

        serverError = {
            success: false,
            message: "Looks like our server is not okay, we'll fix it ASAP"
        }     
    })

    if(status === 401) return {
            success: false,
            message: "Please login with a valid user"    
    }
        
    if(response?.status === 204) return {
        success: true,
        message: "Looks like you don't have any transactions"
    }
        

    if(response?.data) return {
        success: true,
        data: response.data
    }

    return serverError
}

const postTransaction = async (forms, token, type) => {
    const response = await API.post(`/${type}`, forms, BearerToken(token))
    .catch(e =>{
        if(e.response){
            if(e.response.status === 400) return{
                success: false,
                message: "Please follow the form's instructions"
            }

            if(e.response.status === 401) return{
                success: false,
                message: "Please signIn with a registered user"
            }
        }

        return{
            success: false,
            message: "The server is not okay now, but we'll fix it ASAP"
        }
    })

    if(response.status === 201) return {
        success: true,
    }

    return response

}

const postIncomes = async (forms, token) => {
   const result = await postTransaction(forms, token, "incomes")
   return result;
}

const postExpenses = async (forms, token) => {
   const result = await postTransaction(forms, token, "expenses")
   return result;
}

const service = {
    postSignUp,
    postSignIn,
    getCashFlow,
    postIncomes,
    postExpenses
};

export default service