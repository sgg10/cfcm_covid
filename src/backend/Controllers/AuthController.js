import Auth from '../Services/Auth'

const auth = new Auth()

const signInEmail = (email, pass) => auth.signInEmail(email, pass)

const changePass = (email) => auth.changePass(email)

const signOut = () => auth.signOut()

const getUser = () => auth.getUser()

export { signInEmail, changePass, signOut, getUser }
