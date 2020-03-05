import { Inquilino } from './inquilino';

export class Usuario{
    id: number;
    nome: string;
    email: string;
    password: string;
    inquilino_id: Inquilino;
    profile: string;
}