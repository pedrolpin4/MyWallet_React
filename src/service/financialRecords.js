import API from "./api";
import BearerToken from "./bearer";

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
   const { value, description, categoryId } = forms
   const result = await postTransaction({value, description, categoryId}, token, "incomes")
   return result;
}

const postExpenses = async (forms, token) => {
   const { value, description, categoryId } = forms
   const result = await postTransaction({value, description, categoryId}, token, "expenses")
   return result;
}

const financialRecords = {
    postIncomes,
    postExpenses,
    getCashFlow
}

export default financialRecords