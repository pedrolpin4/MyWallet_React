import API from "./api";

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

    if(response?.data) return {
        success: true,
        data: response.data
    }

    return serverError
}

const categoriesServices = {
    getCategoriesByType,
}

export default categoriesServices