'use client'
import { use, useEffect, useState } from "react";
import { ListarTareas,MarcarTareaCompletada, EliminarTarea } from "@/api/CrudTareas";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faPenToSquare,faTrash, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { Tarea } from "../../../interfaces/tarea";
import AgregarTarea from "./agregarTarea/page";
import { useRouter } from "next/navigation";
import ObtenerUnaTarea from "./obtenerTarea/page";
import EditarTarea from "./editarTarea/page";

export default function TareasPagina(){
    const [userId, setUserId] = useState<string>("");
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [unaTarea, setUnaTarea] = useState(false);
    const [tareaSelecta, setTareaSeleccionada] = useState<string>("");
    const [isEditando, setIsEditando] = useState(false);
    
    useEffect(() => {
        const storedUserId = localStorage.getItem("userId") || "";
        if (!storedUserId) {
            console.error("No user ID found in localStorage");
            return;
        }
        setUserId(storedUserId);

        ListarTareas(storedUserId)
            .then(data => { 
                setTareas(data) 
                console.log("Data de tareas:", data);
            }).catch(error => {
                console.error("Error al listar tareas:", error);
            });        
    }, []);
    
   const marcarListos = async (id: string) => {
        try {
            const updatedTarea = await MarcarTareaCompletada(id);
            setTareas(prev =>
            prev.map(t =>
                t._id === (updatedTarea._id || updatedTarea.id)
                    ? { ...t, ...updatedTarea }
                    : t
            )
        );
        } catch (error) {
            console.error("Error al marcar tarea como completada:", error);
        }
    }
    const eliminar = async (id: string) => {
    try {
        await EliminarTarea(id);
        setTareas(prev => prev.filter(t => t._id !== id));
    } catch (error) {
        console.error("Error al eliminar tarea:", error);
    }
    }
    return(
        <div >
            
           <div
            className={`fixed top-0 right-0 h-full w-full max-w-md bg-neutral-800 text-white p-8 z-40 transition-transform duration-2000 ease-in-out
                ${sidebarOpen? "translate-x-0" : "translate-x-full"} `}
            onClick={e => e.stopPropagation()}
            >
           
            <AgregarTarea onTareaAgregada={(tarea)=>{
                setTareas(prev => [...prev, tarea]);
            }} />
            <div className="w-full mx-auto p-4 ">
                <button className="font-mono py-2 px-4  mt-4 bg-sky-700 rounded-lg text-black font-bold cursor-pointer
                    shadow-[0_8px_0_0_#000]
                    transition-all
                    duration-150
                    active:translate-y-2
                    active:shadow-[0_2px_0_0_#000]" onClick={() => setSidebarOpen(false)}>
                    Cerrar
                </button>
            </div>
            </div>


           
            <main className="max-w-2/3 mx-auto p-4 font-mono bg-neutral-900 text-white rounded-lg mt-20">
            <div className="flex justify-between mb-2">
                <button className=" px-4 ml-4 mt-4 mb-2 bg-sky-700 rounded-2xl text-black font-bold cursor-pointer
                    shadow-[0_8px_0_0_#000]
                    transition-all
                    duration-150
                    active:translate-y-2
                    active:shadow-[0_2px_0_0_#000]
                    hover:bg-sky-400
                " onClick={() => setSidebarOpen(true) }>
                Agregar <FontAwesomeIcon icon={faPlus}/>
                </button>
                {/* falta implementar el icon del usuario :v */}
                <img className="mr-8 mt-4 h-12 rounded-3xl cursor-pointer" src="https://static.vecteezy.com/system/resources/previews/043/116/532/non_2x/man-silhouette-profile-picture-anime-style-free-vector.jpg" alt="no sale" />
            </div>
                { tareas.length === 0 ? (
                    <p className="text-center text-gray-400 mt-4">No hay tareas </p>
                ):(
                 tareas.map((Tarea, index) => (
                   
                <div className="flex gap-4 items-center text-white p-6 hover:bg-neutral-800 rounded-lg " key={index} >
                <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-neutral-800 text-white p-8 z-40 transition-transform duration-2000 ease-in-out
                ${unaTarea? "translate-x-0" : "translate-x-full"} `}
                onClick={e => e.stopPropagation()}
                >
                <ObtenerUnaTarea id={tareaSelecta}/> 
                 <div className="w-full mx-auto p-4">
                    <button className="font-mono py-2 px-4  mt-4 bg-sky-700 rounded-lg text-black font-bold cursor-pointer
                        shadow-[0_8px_0_0_#000]
                        transition-all
                        duration-150
                        active:translate-y-2
                        active:shadow-[0_2px_0_0_#000]" onClick={() => setUnaTarea(false)}>
                        Cerrar
                    </button>
                </div>
                </div>
                <p className="w-full cursor-pointer" onClick={()=>{setUnaTarea(true);setTareaSeleccionada(Tarea._id);console.log("Tarea seleccionada:", Tarea._id);}} >{Tarea.titulo}</p>
                <p>{Tarea.completada ? "Completada" : "Pendiente"}</p>
                <button onClick={() => { console.log("ID de tarea:", Tarea._id); marcarListos(Tarea._id); }} className="w-1/5 p-2 font-mono bg-green-600 rounded-2xl text-black font-bold cursor-pointer 
                    shadow-[0_8px_0_0_#000]
                    transition-all
                    duration-150
                    active:translate-y-2
                    active:shadow-[0_2px_0_0_#000]"
                    ><FontAwesomeIcon icon={faCheckDouble}  className="text-black px-2 " /></button>
                <button className="w-1/5 p-2 font-mono bg-yellow-600 rounded-2xl text-black font-bold cursor-pointer
                shadow-[0_8px_0_0_#000]
                    transition-all
                    duration-150
                    active:translate-y-2
                    active:shadow-[0_2px_0_0_#000]" 
                    ><FontAwesomeIcon icon={faPenToSquare} className="px-2 text-black" onClick={()=>{setIsEditando(true); setTareaSeleccionada(Tarea._id);}}/></button>

                <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-neutral-800 text-white p-8 z-40 transition-transform duration-2000 ease-in-out
                    ${isEditando? "translate-x-0" : "translate-x-full"} `}
                    onClick={e => e.stopPropagation()}>
                    <EditarTarea tareaId={tareaSelecta} onTareaEditada={(tarea) => {setTareas(prev =>
                                                                                        prev.map(t => t._id === tarea._id ? tarea : t)
                                                                                    ); }}/>
                    <div className="w-full mx-auto p-4 ">
                    <button className="font-mono py-2 px-4  mt-4 bg-sky-700 rounded-lg text-black font-bold cursor-pointer
                    shadow-[0_8px_0_0_#000]
                    transition-all
                    duration-150
                    active:translate-y-2
                    active:shadow-[0_2px_0_0_#000]" onClick={() => {setIsEditando(false);console.log("tarea",tareaSelecta)}}>
                    Cerrar
                </button>
            </div>
                </div>

                <button className="w-1/5 p-2 font-mono  bg-red-600 rounded-2xl text-black font-bold cursor-pointer
                shadow-[0_8px_0_0_#000]
                    transition-all
                    duration-150
                    active:translate-y-2
                    active:shadow-[0_2px_0_0_#000]"
                ><FontAwesomeIcon icon={faTrash} onClick={() => eliminar(Tarea._id)} className="px-2 text-black" /></button>
                </div>
            ))
            )}
            </main>
        </div>
    );
}