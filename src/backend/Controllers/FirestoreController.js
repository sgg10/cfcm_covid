import Firestore from '../Services/Firestore'

const db = new Firestore()

const getAll = (collection) => db.getAll(collection)

const getById = (collection, id) => db.getById(collection, id)

const create = (collection, data) => db.create(collection, data)

const update = (collection, id, data) => db.update(collection, id, data)

const deleted = (collection, id) => db.delete(collection, id)

export { getAll, getById, create, update, deleted }
