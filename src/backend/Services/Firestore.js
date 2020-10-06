import { firestore } from 'firebase'

class Firestore {
  getAll = (collection) => firestore().collection(collection)

  getById = (collection, id) => firestore().collection(collection).doc(id)

  create = (collection, data) => firestore().collection(collection).add(data)

  update = (collection, id, data) => firestore().collection(collection).doc(id).update(data)

  delete = (collection, id) => firestore().collection(collection).doc(id).delete()
}

export default Firestore
