import React from 'react'
import AuthLayout from './AuthLayout'
import SignupCompnent from '../../strapi/components/auth/SignupComponent'

const Signup = () => {
    return (
        <AuthLayout heading='Signup to your account' url='signup'>
            <SignupCompnent/>
        </AuthLayout>
    )
}

export default Signup
