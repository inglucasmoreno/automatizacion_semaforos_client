export class Usuario {
    constructor(
        public uid: string,
        public dni: string,
        public apellido: string,
        public nombre: string,
        public role?: string,
        public activo?: boolean,
    ){}
}
