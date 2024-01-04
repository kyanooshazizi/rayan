export const getData=async(value_cooki)=>{
    const data=await fetch("https://mohaddesepkz.pythonanywhere.com/users/verify/",{
      cache:"no-store",
      headers:{Authorization:`Bearer ${value_cooki}`}
  });
  return data.json()
  }
 

  