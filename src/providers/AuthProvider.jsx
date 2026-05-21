import { createContext, useState, useEffect } from "react";
import {
    getAuth,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import axios from "axios";


export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logoutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const updateUserProfile = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                const userInfo = { email: currentUser.email };
                try {
                    await axios.post("http://localhost:5000/api/jwt", userInfo, { withCredentials: true });
                } catch (error) {
                    console.error("JWT handshake configuration error:", error);
                }
            } else {
                try {
                    await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });
                } catch (error) {
                    console.error("JWT context termination error:", error);
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        logoutUser, // This matches what MyProfile will now look for
        loginWithGoogle,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
}
