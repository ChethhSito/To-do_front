'use client';

import { useEffect, useState } from "react";
import { Tarea } from "../../../../interfaces/tarea";
import { CrearTarea } from "@/api/CrudTareas";
import {  InputLabel, Select, MenuItem, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
interface AgregarTareaProps {
    onTareaAgregada?: (tarea: Tarea) => void;
}
export default function AgregarTarea({onTareaAgregada}:AgregarTareaProps) {
    const defaultFechaLimite = new Date();
    defaultFechaLimite.setDate(defaultFechaLimite.getDate() + 7);
    
    const[tareas, setTareas] = useState<Tarea>({
        _id: "",
        titulo: "",
        descripcion: "",
        completada: false,
        fechaCreacion: new Date(),
        fechaLimite:defaultFechaLimite,
        usuarioId: "",
    });
    useEffect(() => {
        const storedUserId = localStorage.getItem("userId") || "";
        console.log("Stored User ID:", storedUserId);
        if (!storedUserId) {
            console.error("No user ID found in localStorage");
            return;
        }
        setTareas(prevState => ({
            ...prevState,
            usuarioId: storedUserId
        }));
    }, []);

    const enviarTarea = async(tarea:Tarea)=>{
        const { _id, ...tareaSinId } = tarea; // Eliminar _id si existe
        try{
        const data = await CrearTarea(tareaSinId);
        setTareas(data);
        console.log("Tarea creada:", data);
        if(onTareaAgregada) {
            onTareaAgregada(data);
        }
        } catch(error){
            console.error("Error al enviar tarea:", error);
        }
    }
    return(
        <div className="w-full mx-auto p-4 text-white font-mono">
            {/* select para elegir seleccionar un tipo */}
            <div className="grid grid-cols-1 gap-4 font-mono">
                <label className=" block my-2">Titulo</label>
                <input className="bg-white text-black p-2 rounded-lg" required value={tareas.titulo} onChange={(e) => setTareas({ ...tareas, titulo: e.target.value })} />
                <label className="block my-2">Descripcion</label>
                <textarea className="bg-white text-black p-2 rounded-lg" required value={tareas.descripcion} onChange={(e) => setTareas({ ...tareas, descripcion: e.target.value })} />
                <label className="block my-2">Fecha Limite</label>
                <input
                    type="date"
                    className="bg-white text-black p-2 rounded-lg"
                    value={
                        tareas.fechaLimite
                            ? new Date(tareas.fechaLimite).toISOString().split('T')[0]
                            : ''
                    }
                    onChange={(e) => setTareas({ ...tareas, fechaLimite: new Date(e.target.value) })}
                />

                <button className="bg-green-700 text-black py-2 w-1/3 rounded-lg 
                    shadow-[0_8px_0_0_#000]
                    transition-all
                    duration-150
                    active:translate-y-2
                    active:shadow-[0_2px_0_0_#000]
                " onClick={()=>enviarTarea(tareas)}>agregar</button>
            </div>
        </div>


    );



}
            


    



