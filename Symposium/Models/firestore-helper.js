import { auth, db } from "../../firebase.config";

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

export const createUser = async (email, password, name, callback) => {
    await auth.createUserWithEmailAndPassword(email, password)
        .catch((error) => {
            callback(error);
        }).then((response) => {
            db.collection("users").doc(response.user.uid).set({
                name: name,
            }).then(() => {
                if (!response || !response.user) {
                    return;
                }
                callback({ firebaseUser: response.user, userData: { name: name, image: null } });
            }).catch((error) => {
                callback(error);
            });
        });
}

export const loginUser = async (email, password, callback) => {
    await auth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
            callback(error);
            console.log(error);
        }).then((response) => {
            if (!response || !response.user) {
                return;
            }
            db.collection("users").doc(response.user.uid).get().then((doc) => {
                if (doc.exists) {
                    callback({ firebaseUser: response.user, userData: doc.data() });
                } else {
                    callback({ firebaseUser: response.user, userData: { name: email, image: null } });
                }
            }).catch((error) => {
                callback(error);
            });
        });
}