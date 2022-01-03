import { openDb } from "./dbConnexion"

export const CATEGORY_IN = 1
export const CATEGORY_OUT = 2
export const CATEGORY_DETTE = 1 //type_debt
export const CATEGORY_PRET = 2  // type_debt ou null si cest recette et depenses
export const CATEGORY_NO_OUSIDER= null

export  function createCategorieTable(){
    const db = openDb()
    db.transaction(txn=>{
        txn.executeSql(
            `CREATE TABLE IF NOT EXISTS "category" (
                "id"	INTEGER,
                "name"	TEXT NOT NULL UNIQUE,
                "category_type"	INTEGER,
                "type_debt" INTEGER,
                PRIMARY KEY("id")
            );
            
          
            `,
            [],
            (txn, results)=>{
                
            },

            (error)=>{
                //console.log(error,"creating results error")
            }
        )
    })
   
}


export function insertCategory(tabs, callback){
    // tabs = [name, category_type,type_debt]
    const db = openDb()

    db.transaction(trx=>{
        trx.executeSql(
            `INSERT INTO category (name, category_type,type_debt) VALUES (?,?,?);`,
            tabs,
            (trx, results)=>{
                if(results.rowsAffected>0){
                    callback(true)
                }else{
                    callback(false)
                }
            },
            (error)=>{
              console.log(error)
            }
        )
    })
}

export function getCategoryByID(id, callback){
    const db = openDb()
    db.transaction(trs=>{
        trs.executeSql(
            `SELECT * FROM CATEGORY WHERE id=?`,
            [id],
            (trs, results)=>{
                if(results.rows.length>0){

                    let category = {
                        'id':results.rows.item(0).id,
                        'categorie' :results.rows.item(0).name,
                        'type':results.rows.item(0).category_type,
                        'type_tiers':results.rows.item(0).type_debt
                        }

                    callback(category)
                }else{
                    callback(null)
                }
            },
            (error)=>{
                //console.log("error occured during selection, ", error)
            }
        )
    })
}



export function getAllCategory(callback){
    const db =  openDb()
    let categories = []

    db.transaction(trs=>{
        trs.executeSql(
            `SELECT 
            * FROM 
            CATEGORY 
            ORDER BY name ASC`,
            [],
            (trs, results)=>{

                if(results.rows.length>0){
                  
                    for(let i=0; i < results.rows.length; ++i){

                        categories.push(
                            {
                            'id':results.rows.item(i).id,
                            'categorie' :results.rows.item(i).name,
                            'type':results.rows.item(i).category_type,
                            'type_tiers':results.rows.item(i).type_debt
                            }
                        )

                    }
                    
                    callback(categories) 
                    
                }else{
                    callback([])
                }

                
            },
            (error)=>{
                //console.log("error during selection ", error)
            }
        )
    })

    
}


export function getAllCategoryByType(type,callback){
    const db =  openDb()
    let categories = []

    db.transaction(trs=>{
        trs.executeSql(
            `SELECT 
            * FROM 
            CATEGORY 
            WHERE category_type = ?
            ORDER BY name ASC`,
            [type],
            (trs, results)=>{

                if(results.rows.length>0){
                  
                    for(let i=0; i < results.rows.length; ++i){

                        categories.push(
                            {
                            'id':results.rows.item(i).id,
                            'categorie' :results.rows.item(i).name,
                            'type':results.rows.item(i).category_type,
                            'type_tiers':results.rows.item(i).type_debt
                            }
                        )

                    }
                    
                    callback(categories) 
                    
                }else{
                    callback([])
                }

                
            },
            (error)=>{
                //console.log("error during selection ", error)
            }
        )
    })

    
}
