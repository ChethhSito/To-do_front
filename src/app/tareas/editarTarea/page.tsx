'use client';

import { useEffect, useState } from "react";
import { Tarea } from "../../../../interfaces/tarea";
import { EditTarea,obtenerTareaId } from "@/api/CrudTareas";
interface EditarTareaProps {
    onTareaEditada?: (tarea: Tarea) => void;
    tareaId?: string;
}
export default function EditarTarea({tareaId, onTareaEditada}:EditarTareaProps) {
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
        if(!tareaId)return;
        const fetchTarea = async () => {
            // console.log("Stored User ID:", storedUserId); // Remove or define storedUserId if needed
            const response = await obtenerTareaId(tareaId || "");
            setTareas(response);
        };
        fetchTarea();
    }, [tareaId]);

    const editarTarea = async(tarea:Tarea)=>{
        
        try{
        const data = await EditTarea(tareaId || "",tarea);
        setTareas(data);
        console.log("Tarea editada:", data);
        if(onTareaEditada) {
            onTareaEditada(data);
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
                " onClick={()=>editarTarea(tareas)}>agregar</button>
            </div>
        </div>


    );



}
            


    



