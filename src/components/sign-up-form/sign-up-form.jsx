import { useState } from "react"

import FormInput from "../form-input/form-input.component"

import { createAuthUserWithEmailandPassword, getUserDocFromAuth } from "../../utils/firebase/firebase.utils"


import './sign-up-form.scss'
import Button from "../button/button.component"

const SignUp = () => {
    const defaultfields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword:''
    }

    const resetFormFields =() => {
        setFormFields(defaultfields)
    }

    const[formFileds,setFormFields] = useState(defaultfields)

    const {displayName,email,password,confirmPassword} = formFileds


    const handleSubmit = async (event) => {
        event.preventDefault()

        if(password !== confirmPassword)
        {
            alert('Password do not match')
            return
        }
        else{
            try{
                const {user} =await createAuthUserWithEmailandPassword(email,password)
                await getUserDocFromAuth(user,{displayName})
                resetFormFields()
            }
            catch(error){
                if(error.code === 'auth/email-already-in-use')
                {
                    alert('email already in use')
                }
                console.log('user created error: ', console.log(error))
            }
        }
    }

    const handleChange = (event) =>{
        const {name, value} = event.target

        setFormFields({...formFileds,[name]: value})
    }

    return(
        <div className="sign-up-container">
            <h2>Don't have an Account?</h2>
            <span>
                Sign Up with Email and Password
            </span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Name" type='text' onChange={handleChange} name="displayName" value={displayName} required></FormInput>

                <FormInput label="Email" type='email' onChange={handleChange} name="email" value={email} required></FormInput>

                <FormInput label="Password" type='password' onChange={handleChange} name="password" value={password} required></FormInput>

                <FormInput label="Confirm Password"  type='password' onChange={handleChange} name="confirmPassword" value={confirmPassword} required></FormInput>
                <Button  buttonType='inverted' type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUp