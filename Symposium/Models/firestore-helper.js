import { db } from "../../firebase.config";

const collectionName = "symposiums";

export const getSymposiums = async () => {
    const snapshot = await db.collection(collectionName).get();
    return snapshot.docs.map((doc) => doc.data());
}

export const getSymposium = async (id) => {
    const snapshot = await db.collection(collectionName).doc(id).get();
    return snapshot.data();
}

export const addSymposium = async (symposium) => {
    await db.collection(collectionName)
        .add(symposium)
        .then((snapshot) => {
            return snapshot.get();
        })
}
