import {Types} from 'mongoose';
import {createHash} from 'crypto'
// This file describes the sample data used in the demo.

function oid(key: string) {
    const hash = createHash('sha256').update(key).digest('hex');
    return new Types.ObjectId(hash.slice(0, 24));
}

const GamesCollection = [
    {   
        _id: oid("maling"),
        key: "malign", 
        name: "Malign", description: "Un juego a cerca de guerra y comunicaciones", 
        teams: [
        {key: "ursavia", name: "Ursavia", description: "Un equipo que debe destruir todos los aliados"},
        {key: "ukriv", name: "Ukriv", description: "Todos están en contra de ellos"},
        {key: "islive", name: "Islive", description: "Una nación rica y neutral"},
        {key: "frankia", name: "Frankia", description: "Un neutro que siempre ha estado en contra de ursavia"}
        ],
        roles: [
            {key: "fuegos", name: "Fuegos", description: "Encargados de proteger la nación"},
            {key: "proteccion", name: "Protección", description: "Encargados de la protección de la nación"},
            {key: "comando_control", name: "Comando y Control", description: "Cabeza de operaciones"},
            {key: "movimiento_maniobra", name: "Movimiento y Maniobra", description: "Encargados de la movilidad de la nación"},
            {key: "sostenimiento", name: "Sostenimiento", description: "Encargados de la sostenibilidad de la nación"},
            {key: "informacion", name: "Información", description: "Inteligencia y manejo de sistemas de información"},
            {key: "inteligencia", name: "Inteligencia", description: "Espionaje y manejo de sistemas de información"},
        ]
    },
]


const GameSessionCollection = [
    {
        _id: oid("session_1"),
        createdAt: "2024-08-28T16:34:21Z",
        status: "created", /* created, started, ended */
        gameId: "", /* ref to Games Collection */

    }
]

