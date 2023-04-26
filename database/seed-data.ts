
interface SeedEntry{
    description:string;
    status:string;
    createdAt:number;
}

interface SeedData {
    entries:SeedEntry[]
}


export const seedData : SeedData = {
    entries:[
        {
            description: "Descargar certificado uas",
            status: "pending",
            createdAt: Date.now()
        },
        {
            description: "Pagar tramite certificado uas",
            status: "finished",
            createdAt: Date.now()
        },
        {
            description: "Ver john wick 4",
            status: "pending",
            createdAt: Date.now()
        },
        {
            description: "Terminar curso Next js",
            status: "in-progress",
            createdAt: Date.now()
        },
        {
            description: "Terminar la serie de operaciones del escamado en hunt",
            status: "in-progress",
            createdAt: Date.now()
        },
        {
            description: "Ir a arreglar la freidora de aire",
            status: "pending",
            createdAt: Date.now()
        },
        {
            description: "Desparacitar a los chihuahua",
            status: "pending",
            createdAt: Date.now()
        }
    ]
}