import CryptoJS from 'crypto-js';
const SECRET_KEY = 'mysecretkey'; 
export const encryptData =(name,data)=> {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    localStorage.setItem(name, encrypted);
  }
  export  const decryptData = (name) => {
    const encrypted = localStorage.getItem(name);
    if (!encrypted) {
        // Handle the case when the item is not found in local storage
        return null; // or throw an error, depending on your use case
      }
    const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  }