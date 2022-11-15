import { Field, useFormik } from 'formik';
import * as yup from 'yup';
import Cookie from "js-cookie";
import InputField from '../InputField';
import MaskedInput from "react-text-mask";
import { useState } from 'react';


const phoneNumberMask = [
    "(",
    /[1-9]/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/
];

const registerSchema = yup.object().shape({
    name: yup.string()
        .min(2, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
    phone: yup.string()
        .min(14, 'Too Short!')
        .max(17, 'Too Long!')
        .required(),
    password: yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.'),
    passwordConfirmation: yup.string()
        .required()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});


export default function RegisterForm({ setAuthType }) {
    const [phoneErr, setPhoneErr] = useState("")
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            passwordConfirmation: ""
        },
        onSubmit: values => {
            if(values.phone.split("").includes("_")){
                formik.setFieldTouched("phone")
                formik.setFieldError("phone", "invalid phone number")
                setPhoneErr("invalid phone number")
            }
            const users = JSON.parse(localStorage.getItem("users")) || [];
            if (users.length && users.some(user => user.email === values.email)) {
                formik.setErrors({ email: "user already registered" });
            } else {
                formik.resetForm()
                setTimeout(() => {
                    users.push({
                        name: values.name,
                        email: values.email,
                        phone: values.phone,
                        password: values.password,
                        passwordConfirmation: values.passwordConfirmation
                    });
                    localStorage.setItem("users", JSON.stringify(users));
                    setAuthType("login")
                }, 500)
            }
        },
        validationSchema: registerSchema
    });

    return (
        <form className='auth-form' onSubmit={formik.handleSubmit}>
            <InputField
                type="name"
                name="name"
                id="name"
                label="Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={formik.touched.name && formik.errors.name}
            />
            <InputField
                type="email"
                id="email"
                label="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && formik.errors.email}
            />
            <InputField
                error={(formik.touched.phone && formik.errors.phone) || phoneErr}
                label="Phone"
                element={
                    <MaskedInput
                        mask={phoneNumberMask}
                        id="phone"
                        placeholder="Enter your phone number"
                        type="text"
                        value={formik.values.phone}
                        onChange={(e)=> {
                            formik.handleChange(e)
                            if(e.target.value.split("").includes("_")){
                                formik.setFieldTouched("phone", true)
                                formik.setFieldError("phone", "invalid phone number")
                                setPhoneErr("invalid phone number")
                            }
                            else{
                                setPhoneErr("")
                            }
                        }}
                        onBlur={formik.handleBlur}
                        className={
                            formik.errors.phone && formik.touched.phone
                                ? "text-input error"
                                : "text-input"
                        }
                    />
                }
            />
            <InputField
                type="password"
                name="password"
                id="password"
                label="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                error={formik.touched.password && formik.errors.password}
            />
            <InputField
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                label="Confirm Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirmation}
                error={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
            />
            <button disabled={Object.keys(formik.errors).length} type="submit">Register</button>
        </form>
    );
};