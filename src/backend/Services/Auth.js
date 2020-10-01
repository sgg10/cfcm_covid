import { auth } from 'firebase'

class Auth {
  async registrar (email, pass, displayName, router) {
    const resultado = await auth().createUserWithEmailAndPassword(email, pass)
    if (displayName) {
      await resultado.user.updateProfile({ displayName })
    }
    router.push({ name: 'Home' })
  }

  signInEmail = (email, pass) => auth().signInWithEmailAndPassword(email, pass)

  signInGoogle () {
    const provider = new auth.GoogleAuthProvider()
    auth().useDeviceLanguage()
    return auth().signInWithPopup(provider)
  }

  changePass = (email) => auth().sendPasswordResetEmail(email)

  signOut = () => auth().signOut()

  getUser = () => auth().currentUser
}

export default Auth
