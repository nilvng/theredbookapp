/**
 * Firebase Helper.
 * 
 * This file contains helper functions for accessing the Firebase services.
 */

// Project Imports
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

/**
 * Creates a new user on firebase including the user profile data.
 *
 * This function returns the a object containing `firebaseUser` (Firebase User) and `userData` (User Profile Data).
 *  
 * @param {string} email 
 * @param {string} password 
 * @param {string} name 
 * @param {(result: object) => void} callback 
 */
export const createUser = async (email, password, name, callback) => {
    await auth.createUserWithEmailAndPassword(email, password)
        .catch((error) => {
            callback(error);
        }).then((response) => {
            const user = {
                name: name,
                email: email,
                image: null
            }
            db.collection("users").doc(response.user.uid).set(user).then(() => {
                if (!response || !response.user) {
                    return;
                }
                callback({ firebaseUser: response.user, userData: user });
            }).catch((error) => {
                callback(error);
            });
        });
}

/**
 * Gets the user profile data from firebase.
 * 
 * @param {string} uid 
 * @param {(result: object) => void} callback 
 */
export const getUser = async (uid, callback) => {
    await db.collection("users").doc(uid).get().then((doc) => {
        if (doc.exists) {
            callback(doc.data());
        } else {
            callback(null);
        }
    }).catch((error) => {
        callback(error);
    });
}

/**
 * Logs the user in using firebase's authentication service.
 * 
 * This function returns the a object containing `firebaseUser` (Firebase User) and `userData` (User Profile Data).
 * 
 * @param {string} email 
 * @param {string} password 
 * @param {(result: object) => void} callback 
 */
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