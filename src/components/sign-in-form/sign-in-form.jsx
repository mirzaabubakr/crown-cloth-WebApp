import { useState} from "react"

import FormInput from "../form-input/form-input.component"

import { SignInAuthUserWithEmailandPassword,signInWithGooglePopup } from "../../utils/firebase/firebase.utils"


import './sign-in-form.scss'

import Button from "../button/button.component"

const SignIn = () => {
    const defaultfields = {
        email: '',
        password: '',
    }

    const resetFormFields =() => {
        setFormFields(defaultfields)
    }


    const[formFileds,setFormFields] = useState(defaultfields)

    const {email,password} = formFileds

//  const {setCurrentUser} = useContext(UserContext)

    const logGoogleUser = async () => {
        await signInWithGooglePopup()
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try{
            await SignInAuthUserWithEmailandPassword(email,password)
//      setCurrentUser(user)
            resetFormFields() 
        }
        catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('Incorrect Password!')
                    break;
                case 'auth/user-not-found':
                    alert('Account not Found!')
                    break;
                default:
                    console.log(error)
            }
            }
    }

    const handleChange = (event) =>{
        const {name, value} = event.target

        setFormFields({...formFileds,[name]: value})
    }

    return(
        <div className="sign-in-container">
            <h2>Already Have an Account?</h2>
            <span>
                Sign In with Email and Password
            </span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Email" type='email' onChange={handleChange} name="email" value={email} required></FormInput>

                <FormInput label="Password" type='password' onChange={handleChange} name="password" value={password} required></FormInput>

            <div className="buttons-container">
                <Button  type='submit'>Sign In</Button>
                <Button buttonType='google'  onClick={logGoogleUser}>Sign Up</Button>
            </div>
               
            </form>
        </div>
    )
}

export default SignIn