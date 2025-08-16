export class Usuario{


    constructor (email,clave){
        this.email=email;
        this.clave=clave;
    }

     toString(){
        return `Usuario: ${this.email}, Clave: ${this.clave}`;
     }
}