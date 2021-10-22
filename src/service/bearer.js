const BearerToken = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${userData.token}`
        }
    }
}

export default BearerToken;