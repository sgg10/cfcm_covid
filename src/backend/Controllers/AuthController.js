import Auth from '../Services/Auth'

const auth = new Auth()

const registrar = (email, pass, displayName, router) => auth.registrar(email, pass, displayName, router)

const signInEmail = (email, pass) => auth.signInEmail(email, pass)

const signInGoogle = () => auth.signInGoogle()

const changePass = (email) => auth.changePass(email)

const signOut = () => auth.signOut()

const getUser = () => auth.getUser()

export { registrar, signInEmail, signInGoogle, changePass, signOut, getUser }
