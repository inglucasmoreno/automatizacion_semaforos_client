interface semaforoUser {
    uid: string;
    dni: string;
    apellido: string;
    nombre: string;
    email: string;
}

export class Semaforo {
    constructor(
        public _id: string,
        public codigo: string,
        public descripcion?: string,
        public usuario?: semaforoUser,
        public intermitente?: boolean,
        public activo?: boolean
    ){}
}
