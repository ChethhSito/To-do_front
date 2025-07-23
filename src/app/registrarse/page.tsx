"use client"
import { useState } from "react";
import { RegistrarUser } from "@/api/Autentication";
import { useRouter } from "next/navigation";
import { Usuario } from "../../../interfaces/usuario";

export default function Registrarte(){
    const router = useRouter();
    const[usuario, setUsuario] = useState<Usuario>({
        _id: "",
        nombre: "",
        email: "",
        contrasena: "",
        fechaCreacion: new Date()
    });
    
    const enviarDato = async(dato:Usuario)=>{
        try {
            const response = await RegistrarUser(dato);
            console.log(response);
            router.push('/incio_sesion'); // Redirigir a la página de inicio de sesión después del registro
        } catch (error) {
            console.error("Error al registrar usuario:", error);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-black font-mono">
        <div className="max-w-2/5 w-full h-full p-8 bg-neutral-800 rounded-xl ">
            <h1 className="pb-2">Registrarse</h1>
            {/* Aquí puedes agregar un formulario para registrar al usuario */}
            <div className="grid grid-cols-1 gap-4 ">
                
                <div>
                <label className="block mb-2">Nombre</label>
                <input className="bg-white text-black w-full py-2 px-4 rounded-xl" type="text" required value={usuario.nombre} onChange={(dato) => setUsuario({...usuario, nombre: dato.target.value})}/>
                </div>
                <div>
                <label className="block mb-2">Email</label>
                <input  className="bg-white text-black w-full py-2 px-4 rounded-xl" type="email" required value={usuario.email} onChange={(dato) => setUsuario({...usuario, email: dato.target.value})}/>
                </div>
                <div>
                <label className="block mb-2">Contraseña</label>
                <input  className="bg-white text-black w-full py-2 px-4 rounded-xl" type="password" required value={usuario.contrasena} onChange={(dato) => setUsuario({...usuario, contrasena: dato.target.value})}/>
                </div>
                <button className="bg-gray-600 text-black py-2 px-4 w-1/4 rounded-xl"  onClick={() => enviarDato(usuario)}>Registrar</button>
            </div>
        </div></div>
    );
}