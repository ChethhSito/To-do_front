import axios from "axios";
const BASE_URL = "https://to-do-back-f1l3.onrender.com";

const ActionsTareas ={
    create: `${BASE_URL}/tareas/addTask`,
    edit: `${BASE_URL}/tareas/editTask`,
    list: `${BASE_URL}/tareas/listTasks`,
    delete: `${BASE_URL}/tareas/deleteTask`,
    get: `${BASE_URL}/tareas/getTask`,
    complete: `${BASE_URL}/tareas/completeTask`
};
export const CrearTarea = async(tarea:any )=>{
    try {
        const response = await axios.post(ActionsTareas.create, tarea);
        return response.data;
    } catch (error) {
        console.error("Error al crear tarea:", error);
        throw new Error('Error al crear tarea: ' + error);
    }
}
export const EditTarea = async(id:string, tarea:any)=>{
    try {
        const response = await axios.put(`${ActionsTareas.edit}/${id}`, tarea);
        return response.data;
    } catch (error) {
        console.error("Error al editar tarea:", error);
        throw new Error('Error al editar tarea: ' + error);
    }
}
export const ListarTareas = async(userId:string)=>{
    try {
        const response = await axios.get(`${ActionsTareas.list}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error al listar tareas:", error);
        throw new Error('Error al listar tareas: ' + error);
    }
}
export const obtenerTareaId = async(id:string)=>{
    try {
        const response = await axios.get(`${ActionsTareas.get}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener tarea por ID:", error);
        throw new Error('Error al obtener tarea por ID: ' + error);
    }
}
export const EliminarTarea = async(id:string)=>{
    try {
        const response = await axios.delete(`${ActionsTareas.delete}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar tarea:", error);
        throw new Error('Error al eliminar tarea: ' + error);
    }
}
export const MarcarTareaCompletada = async(id:string)=>{
    try {
        const response = await axios.put(`${ActionsTareas.complete}/${id}`);
        console.log("Tarea marcada como completada:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al marcar tarea como completada:", error);
        throw new Error('Error al marcar tarea como completada: ' + error);
    }
}