export interface Tarea {
    _id: string;
    titulo: string;
    descripcion: string;
    completada: boolean;
    fechaCreacion: Date;
    fechaLimite: Date | null;
    usuarioId: string;
}