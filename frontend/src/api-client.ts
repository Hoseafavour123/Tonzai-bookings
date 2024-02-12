import { RegisterFormData } from "./pages/SignUp";
import { LoginForm } from "./pages/SignIn";
import { resolvePath } from "react-router-dom";

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`http://localhost:7000/api/users/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    const responseBody = await response.json()
    if (!response.ok) {
        throw new Error(responseBody.message)
    }
}

export const signIn = async (formData: LoginForm) => {
    const response = await fetch('http://localhost:7000/api/auth/login', {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    const body = await response.json()
    if (!response.ok) {
        throw new Error(body.message)
    }
    return body
}

export const validateToken = async () => {
    const response = await fetch('http://localhost:7000/api/auth/validate-token', {
        credentials: 'include'
    })
    if (!response.ok) {
        throw new Error('Token Invalid')
    }
    return response.json()
}

export const signOut = async () => {
    const response = await fetch('http://localhost:7000/api/auth/logout', {
        credentials: 'include',
        method: 'POST'
    });
    if (!response.ok) {
        throw new Error('Error during sign out')
    }

}