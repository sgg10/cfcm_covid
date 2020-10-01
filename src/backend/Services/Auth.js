import { auth } from 'firebase'

class Auth {
  signInEmail = (email, pass) => auth().signInWithEmailAndPassword(email, pass)

  changePass = (email) => auth().sendPasswordResetEmail(email)

  signOut = () => auth().signOut()

  getUser = () => auth().currentUser
}

export default Auth
