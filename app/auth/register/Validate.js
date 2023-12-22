"use client"
export const Validate =(data)=>{
    const error={};
    if(!data.user.trim()){
        error.user="شماره موبایل یا ایمیل معتبر وارد کنید!"
    }else if(!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(data.user))&&!(/^0[0-9]{10}$/.test(data.user))){
        error.user="شماره موبایل یا ایمیل معتبر وارد کنید!"
    }
    else{
        delete error.user; 
    }
    if(!data.password.trim()){
        error.password="لطفا یک پسورد معتبر وارد نمایید";
    }else if(!(/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(data.password))){
        error.password="پسورد باید حداقل 8 کاراکتر باشد و شامل حروف و اعداد شود";
    }else{
        delete error.password;
    }
    if(!data.confirm_password){
        error.confirm_password="پسورد خود را تکرارکنید";
    }else if(data.password!==data.confirm_password){
     error.confirm_password="پسورد ها برابر نیستند";
    }else{
        delete error.confirm_password;
    }

    return error;
}
