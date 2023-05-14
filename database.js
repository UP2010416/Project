import sqlite from 'sqlite';

const dbConn = init();

async function init() {
    const db = await sqlite.open('.database.sqlite', {verbose: true});
    await db.migrate({migrationsPath: './migrations-sqlite' });
    return db
}

export async function getTable(){
    const db = await dbConn;
    return db.get('')
}

