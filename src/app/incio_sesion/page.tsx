"use client"
import { useState } from "react";
import { LoginUser } from "@/api/Autentication";
import { useRouter } from "next/navigation";
export default function InciarSesion(){
    const[usuario, setUsuario] = useState({
        _id: "",
        nombre: "",
        email: "",
        contrasena: "",
        fechaCreacion: new Date()
    });
    const router = useRouter();
    const enviarInicio = async(dato:any)=>{
        const { _id, nombre, ...usuarioSinIdNiNombre } = dato;
        console.log("usuarioSinId", usuarioSinIdNiNombre);
        try {
            const response = await LoginUser(usuarioSinIdNiNombre);
            console.log("data",response);
            localStorage.setItem('userId', response.user.id);
            localStorage.setItem('token', response.token);
            router.push('/tareas'); // Redirigir a la página de tareas después del inicio de sesión
        } catch (error) {
            console.error("Error al registrar usuario:", error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black font-mono">
        <div className="max-w-2/5 w-full h-full p-8 bg-neutral-800 rounded-xl ">
            <h1 className="pb-2">Iniciar Sesion</h1>
            {/* Aquí puedes agregar un formulario para registrar al usuario */}
            <div className="grid grid-cols-1 gap-4 ">
                
                <div>
                <label className="block mb-2">Email</label>
                <input  className="bg-white text-black w-full py-2 px-4 rounded-xl" type="email" required value={usuario.email} onChange={(dato) => setUsuario({...usuario, email: dato.target.value})}/>
                </div>
                <div>
                <label className="block mb-2">Contraseña</label>
                <input  className="bg-white text-black w-full py-2 px-4 rounded-xl" type="password" required value={usuario.contrasena} onChange={(dato) => setUsuario({...usuario, contrasena: dato.target.value})}/>
                </div>
                <label htmlFor="">No tiene cuenta?</label>
                <div className="">
                <a className="flex justify-start text-rose-800  w-1/3 rounded-xl" href="/registrarse">Registrarse</a>
                </div>
                <button className="bg-blue-900 text-white py-2 px-4 w-1/3 rounded-xl"  onClick={() => enviarInicio(usuario)}>Iniciar Sesion</button>
            </div>
        </div>
        </div>
    );
}