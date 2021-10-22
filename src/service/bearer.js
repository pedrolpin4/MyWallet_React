const BearerToken = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export default BearerToken;