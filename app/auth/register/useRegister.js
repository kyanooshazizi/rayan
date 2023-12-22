"use client";
import { useMutation } from "@tanstack/react-query";
const useRegister = (user, password, confirm_password) => {
  var email="";
  var phone="";

  if (user.includes("@")) {
    email = user;
  } else {
    phone = user;
  }

  const mutation = useMutation(
    (phone, email, password, confirm_password) => {
      return fetch("https://mohaddesepkz.pythonanywhere.com/users/register/", {
        method: "POST",
        body: JSON.stringify({
          email:email,
          password:password,
          password2:confirm_password,
          phone:phone,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
    }
  );

  return mutation.mutate(phone, email, password, confirm_password);
};

export default useRegister;
