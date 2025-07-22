"use client"

import { useEffect, useState } from "react";
import { Tarea } from "../../../../interfaces/tarea";
import { obtenerTareaId } from "@/api/CrudTareas";


export default function ObtenerUnaTarea({id}:{id:string}){
    const [tarea, setTarea] = useState<Tarea>();
    useEffect(() => {
        if(!id)return;
        const fetchTarea = async () => {
            try{
            const response = await obtenerTareaId(id);
            setTarea(response);
            }catch (error) {
                console.error("Error al obtener la tarea:", error);
                return;
            }
        };
        fetchTarea();
    }, [id]);
    return (
        <div className="w-full mx-auto p-4 text-white font-mono">
            <div className="flex flex-col gap-4 " >
                {tarea ? (
                    <>
                    <div className=" bg-orange-200 text-black p-4 rounded-lg">
                        <span className="font-semibold">Titulo </span>
                        <h1>{tarea.titulo}</h1>
                    </div>
                    <div className=" bg-blue-200 text-black p-4 rounded-lg">
                        <span className="font-semibold" id="">Descripcion </span>
                        <p >{tarea.descripcion}</p>
                    </div>
                    <div className=" bg-emerald-200 text-black p-4 rounded-lg">
                        <span className="font-semibold">Completado? </span>
                        <span>{tarea.completada ? "Si" : "No"}</span>
                    </div>
                    <div className=" bg-fuchsia-200 text-black p-4 rounded-lg">
                        <span className="font-semibold">Fecha Creacion: </span>
                        <span>{tarea.fechaCreacion ? new Date(tarea.fechaCreacion).toLocaleDateString() : "Sin definir"}</span>
                    </div>
                    <div className=" bg-indigo-200 text-black p-4 rounded-lg">
                        <span className="font-semibold">Fecha Limite: </span>
                        <span>{tarea.fechaLimite ? new Date(tarea.fechaLimite).toLocaleDateString() : null}</span   >
                    </div>
                    </>
                ) : (
                    <p>No se encontró la tarea o ocurrió un error.</p>
                )}
            </div>
        </div>
    );




}