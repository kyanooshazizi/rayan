export const Validate=(data)=>{
    const error={};
    if(!(/^0[0-9]{10}$/.test(data))){
        error.mobile="شماره موبایل معتبر وارد کنید"
        return error;
    }else{
        return null
    }
}