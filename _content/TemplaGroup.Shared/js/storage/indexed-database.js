// noinspection JSCheckFunctionSignatures,JSUnusedAssignment,JSUnusedGlobalSymbols

let CURRENT_VERSION = 1;
let DATABASE_NAME = "templa-group";

export function initialize()
{
    let indexedDb = indexedDB.open(DATABASE_NAME, CURRENT_VERSION);
    indexedDb.onupgradeneeded = function ()
    {
        let db = indexedDb.result;
        db.createObjectStore("settings", { keyPath: "id" });
        db.createObjectStore("user", { keyPath: "id" });
    }
}

export function set(collectionName, value)
{
    let blazorSchoolIndexedDb = indexedDB.open(DATABASE_NAME, CURRENT_VERSION);

    blazorSchoolIndexedDb.onsuccess = function ()
    {
        let transaction = blazorSchoolIndexedDb.result.transaction(collectionName, "readwrite");
        let collection = transaction.objectStore(collectionName)
        collection.put(value);
    }
}

export async function get(collectionName, id)
{
    let request = new Promise((resolve) =>
    {
        let blazorSchoolIndexedDb = indexedDB.open(DATABASE_NAME, CURRENT_VERSION);
        blazorSchoolIndexedDb.onsuccess = function ()
        {
            let transaction = blazorSchoolIndexedDb.result.transaction(collectionName, "readonly");
            let collection = transaction.objectStore(collectionName);
            let result = collection.get(id);

            result.onsuccess = function (e)
            {
                resolve(result.result);
            }
        }
    });
    
    return await request;
}