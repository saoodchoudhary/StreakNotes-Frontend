
export const validations = (values) =>{
    let errors = {};
    if(!values.fullName){
        errors.fullName = "Full Name is required"
    }
    if(!values.email){
        errors.email = "Email is required"
    }else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email = "Email is invalid"
    }
    if(!values.password){
        errors.password = "Password is required"
    }else if(values.password.length < 6){
        errors.password = "Password must be more than 6 characters"
    }
    if(!values.confirmPassword){
        errors.confirmPassword = "Confirm Password is required"
    }else if(values.confirmPassword !== values.password){
        errors.confirmPassword = "Confirm Password does not match"
    }

    return errors;

}


export const loginValidations = (values) =>{
   let errors = {};
    if(!values.email){
         errors.email = "Email is required"
    }else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email = "Email is invalid"
    }
    if(!values.password){
        errors.password = "Password is required"
    }
    return errors;
}
