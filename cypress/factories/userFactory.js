import faker from "faker"

const createUser = () => ({
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: '123456',
})

export default createUser;