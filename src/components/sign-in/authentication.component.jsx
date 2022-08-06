import { signInWithGooglePopup, getUserDocFromAuth } from "../../utils/firebase/firebase.utils";
import SignUp from "../sign-up-form/sign-up-form";

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup()
        const userDocRef =  await getUserDocFromAuth(user)
    }
    return (<div>
        <h1>SignIn</h1>
        <button onClick={logGoogleUser}>
            Sign In With Google Popup
        </button>
        <SignUp/>

    </div>)
}


export default SignIn;