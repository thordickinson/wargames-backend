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
        {key: "ursavia", name: "Ursavia", description: "Un equipo que debe destruir todos los aliados", color: "#FF0000"},
        {key: "ukriv", name: "Ukriv", description: "Todos están en contra de ellos", color: "#00FF00"},
        {key: "islive", name: "Islive", description: "Una nación rica y neutral", color: "#0000FF"},
        {key: "frankia", name: "Frankia", description: "Un neutro que siempre ha estado en contra de ursavia", color: "#FFFF00"},
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
        gameId: oid("maling"), /* ref to Games Collection */
        players: [
        ],
        planningSessions: []
    },
    {
        _id: oid("session_2"),
        createdAt: "2024-08-29T16:34:21Z",
        status: "started", /* created, started, ended */
        gameId: oid("maling"), /* ref to Games Collection */
        players: [
            { name: "MG Martin Hernandez", role: "fuegos", team: "ursavia" },
            { name: "MG Martin Hernandez", role: "proteccion", team: "ursavia" },
            { name: "MG Martin Hernandez", role: "comando_control", team: "ursavia" },
            { name: "MG Martin Hernandez", role: "fuegos", team: "ukriv" },
            { name: "MG Martin Hernandez", role: "proteccion", team: "ukriv" },
            { name: "MG Martin Hernandez", role: "comando_control", team: "ukriv" }
        ],
        planinng: {
            configuration: {
                sessionDuration: "15m",
            },
            sessions: [
                {_id: oid("planning_1"), startedAt: "2024-08-28T16:34:21Z", endedAt: "2024-08-29T16:49:21Z", endTrigger: "manual", plannedLenght: "15m"},
                {_id: oid("planning_2"), startedAt: "2024-08-28T16:59:00Z", endedAt: "2024-08-29T17:00:0Z", endTrigger: "automatic", plannedLenght: "15m"},
                {_id: oid("planning_3"), startedAt: "2024-08-28T17:05:02Z", endedAt: undefined, endTrigger: undefined, plannedLenght: "15m"} /* Ongoing */
            ]
        }
    }
]

