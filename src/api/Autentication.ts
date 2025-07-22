import axios from 'axios';
const BASE_URL = 'https://to-do-back-f1l3.onrender.com';

const AuthAPI = {
  login: `${BASE_URL}/auth/login`,
  register: `${BASE_URL}/auth/register`,
};
export const RegistrarUser = async(usuario: any) =>{
    try{
        const response = await axios.post(AuthAPI.register, usuario);
        return response.data;
    }catch (error) {
        console.error("Error al registrar usuario:", error);
        throw new Error('Error al registrar usuario: ' + error);
    }
}
export const LoginUser = async(usuario:any)=>{
    try{
        const response = await axios.post(AuthAPI.login, usuario);
        return response.data;
    }catch (error) {
        console.error("Error al iniciar sesión:", error);
        throw new Error('Error al iniciar sesión: ' + error);
    }
}
