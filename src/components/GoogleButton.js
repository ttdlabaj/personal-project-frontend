import React from 'react'
import { Button } from 'react-bootstrap'
import { authentication } from '../firebase-config'
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

function GoogleButton({ isUserSignedIn, setIsUserSignedIn }) {

    const navigate = useNavigate()

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication, provider)
            .then((re) => {
                navigate('/dashboard')
                console.log(re)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const signOutWithGoogle = () => {
        signOut(authentication).then(() => {
            navigate("/");
        }).catch((error) => {
            console.log(error)
        });
    };

    return (
        <div>
            {isUserSignedIn ? (
                <div className="googleNav">
                    <button className="btn btn-primary" onClick={signOutWithGoogle}>
                        Sign Out
                    </button>
                </div>
            ) : (
                <button className="btn btn-primary" onClick={signInWithGoogle}>
                    Sign In To View Dashboard
                </button>
            )}
        </div>
    )
}

export default GoogleButton
