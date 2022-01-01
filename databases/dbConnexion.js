import SQLite from "react-native-sqlite-storage";

export  function  openDb(){
    //SQLite.enablePromise(true)
    //SQLite.enablePromise(true);
    return SQLite.openDatabase(
        {name: 'lissafiy_458.db', location: 'default'}, 
        (success)=>{
            //console.log("success ", success)
        }, 
        (error)=>{
            //console.log("error ", error)
        });
}

export  function createDBSchema(){
    const db = openDb()
    db.transaction(txn=>{
        txn.executeSql(
            `CREATE TABLE IF NOT EXISTS "category" (
                "id"	INTEGER,
                "name"	TEXT NOT NULL,
                "category_parent_id"	INTEGER,
                PRIMARY KEY("id")
            );

            INSERT INTO category (name, category_parent_id) VALUES ('in',null);
            INSERT INTO category (name, category_parent_id) VALUES ('out',null);
            
            CREATE TABLE IF NOT EXISTS "operations" (
                "id"	INTEGER,
                "date"	TEXT,
                "category_id"	INTEGER,
                "label"	TEXT,
                "in_amount"	INTEGER,
                "out_amount"	INTEGER,
                "person"	TEXT,
                PRIMARY KEY("id")
            );
            
            `,
            [],
            (txn, results)=>{
                //console.log(results,"creating results success")
                txn.executeSql(
                    `
                    
                    `,
                    [],
                    ()=>{
                        //console.log("merci")
                    }
                )
            },

            (error)=>{
                //console.log(error,"creating results error")
            }
        )
    })
   
}


