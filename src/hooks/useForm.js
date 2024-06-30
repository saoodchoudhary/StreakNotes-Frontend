import { useState } from "react";
import { validations } from "../utils/validations";


const useForm = (submitCallback, initialValues) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("values", values);
        const validationsError = validations(values);
        setErrors(validationsError);
        if (Object.keys(validationsError).length === 0) {
            submitCallback();
        }
    }

    return { handleChange, handleSubmit, values, errors };
};

export default useForm;