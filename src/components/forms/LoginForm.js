import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import InputField from '../InputField';
import * as yup from 'yup';
import Cookie from "js-cookie"

const loginSchema = yup.object({
    email: yup.string().email('Invalid email').required('required'),
    password: yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.'),
});


export default function LoginForm({setModal}) {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: values => {
                const users = JSON.parse(localStorage.getItem("users")) || [];
                const match = users.find(user => (user.email == values.email) && (user.password == values.password));

                if (match) {
                    formik.resetForm();
                    localStorage.setItem("user", JSON.stringify(match));
                    Cookie.set("auth", Math.random());
                    setTimeout(()=> {
                        setModal(false)
                    }, 500)

                } else {
                    formik.setErrors({ email: "wrong email or password" });
                }
        },
        validationSchema: loginSchema
    });

    return (
        <form className='auth-form' onSubmit={formik.handleSubmit}>
            <InputField
                id="email"
                name="email"
                label="emial"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && formik.errors.email}
            />

            <InputField
                id="password"
                name="password"
                type="password"
                label="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                error={formik.touched.password && formik.errors.password}

            />
            <button disabled={Object.keys(formik.errors).length || !Object.keys(formik.values).every(el => !!el === true)} type="submit">Submit</button>
        </form> 
    );
};