import { useState } from "react";
import { loginValidations } from "../utils/validations";


const useForm = (submitCallback, initialValues  ) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("values", values);
        const validationsError = loginValidations
        (values);
        setErrors(validationsError);
        if (Object.keys(validationsError).length === 0) {
            submitCallback();
        }else{
            setIsLoading(false);
        }
    }

    return { handleChange, handleSubmit, values, errors, isLoading, setIsLoading };
};

export default useForm;