import Dexie, { Table } from "dexie"; 

interface Todo {
    id?: number
    title: string
    completed: boolean
}

interface MaterialsCompute {
    id?: number,
    category: string,
    dimensions: object,
    materials: object,
    summaryBreakdown: object
}

class MyDatabase extends Dexie {
    todos!: Table<Todo>
    materialsCompute!: Table<MaterialsCompute>

    constructor() {
        super("MateryalesDatabase")
        this.version(1).stores({
            todos: '++id, title, completed',
            materialsCompute: '++id, category, dimensions, materials, summaryBreakdown'
        })
    }
}

export const db = new MyDatabase()