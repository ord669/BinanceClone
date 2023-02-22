import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    updateBalance
}

window.userService = userService

function getUsers() {
    return storageService.query('user')
    // return httpService.get(`user`)
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    // const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

// async function update({ _id ,balance}) {
//     const user = await storageService.get('user', _id)
//     await storageService.put('user', user)
//     user.balance = balance

//     // const user = await httpService.put(`user/${_id}`, {_id})
//     // Handle case in which admin updates other user's details
//     if (getLoggedinUser()._id === user._id) saveLocalUser(user)
//     return user
// }

async function update({ _id, balance }) {
    console.log('balance: ', balance);
    console.log('_id: ', _id);
    const user = await storageService.get('user', _id)
    console.log('user: ', user);
    user.balance = balance
    await storageService.put('user', user)

    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    // const user = await httpService.post('auth/login', userCred)
    if (user) {
        // socketService.login(user._id)
        return saveLocalUser(user)
    }
}
async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post('user', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    return saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return null
    // socketService.logout()
    // return await httpService.post('auth/logout')
}

async function changeBalance(amount) {
    user.balance = user.balance - amount
    return await update(user)
}

async function updateBalance(amount) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    if (user.balance + amount < 0) return Promise.reject('Not enough balance')
    user.balance = user.balance - amount
    await storageService.put('user', user)
    await saveLocalUser(user)
    return Promise.resolve(user)
}

function _saveUserToStorage(user) {
    localStorage.setItem('user', JSON.stringify(user))
}

function saveLocalUser(user) {
    user = { _id: user._id, name: user.name, imgUrl: user.imgUrl, balance: user.balance, contacts: user.contacts }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

; (async () => {
    await userService.signup(
        {
            name: 'Puki Norma', email: "olliechristian@renovize.com", phone: "+1 (977) 419-3550", username: 'puki', password: '123', balance: 10000, isAdmin: false,
            contacts: ["5a56640269f443a5d64b32ca",
                "5a5664025f6ae9aa24a99fde",
                "5a56640252d6acddd183d319",
                "5a566402ed1cf349f0b47b4d",
                "5a566402abce24c6bfe4699d",
                "5a566402a6499c1d4da9220a",]
        })
    await userService.signup(
        {
            name: 'Master Adminov', email: "olliechristian@renovize.com", phone: "+1 (977) 419-3550", username: 'admin', password: '123', balance: 10000, isAdmin: true,
            contacts: [
                "5a56640269f443a5d64b32ca",
                "5a5664025f6ae9aa24a99fde",
                "5a56640252d6acddd183d319",
                "5a566402ed1cf349f0b47b4d",
                "5a566402abce24c6bfe4699d",
                "5a566402a6499c1d4da9220a",
                "5a566402f90ae30e97f990db",
                "5a5664027bae84ef280ffbdf",
                "5a566402e3b846c5f6aec652",
                "5a56640272c7dcdf59c3d411",
                "5a5664029a8dd82a6178b15f",
                "5a5664028c096d08eeb13a8a",
                "5a5664026c53582bb9ebe9d1",
                "5a56640298ab77236845b82b",
                "5a56640208fba3e8ecb97305",
                "5a566402abb3146207bc4ec5",
                "5a56640298500fead8cb1ee5",
                "5a56640243427b8f8445231e",
                "5a5664025c3abdad6f5e098c"
            ]
        })
    await userService.signup(
        {
            name: 'Muki G', email: "olliechristian@renovize.com", phone: "+1 (977) 419-3550", username: 'muki', password: '123', balance: 10000, isAdmin: false,
            contacts: ["5a5664028c096d08eeb13a8a",
                "5a5664026c53582bb9ebe9d1",
                "5a56640298ab77236845b82b",
                "5a56640208fba3e8ecb97305",
                "5a566402abb3146207bc4ec5",
                "5a56640298500fead8cb1ee5",
                "5a56640243427b8f8445231e",
                "5a5664025c3abdad6f5e098c"]
        })
})()
