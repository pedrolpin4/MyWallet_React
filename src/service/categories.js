import API from "./api";
import BearerToken from "./bearer";

const getCategoriesByType = async (type) => {
    let status;
    let serverError;

    const response = await API.get(`/category?type=${type}`)
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

    if(status === 400) return {
        success: false,
        message: response.message
    }

    if(response?.data) return {
        success: true,
        data: response.data
    }

    return serverError
}

const getCategoryStatsByType = async (token, type) => {
    let status;
    let serverError;

    const response = await API.get(`/category/stats?type=${type}`, BearerToken(token))
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

    console.log(response);

    if(response?.data) return {
        success: true,
        data: response.data
    }

    return serverError
}


const categoriesServices = {
    getCategoriesByType,
    getCategoryStatsByType,
}

export default categoriesServices