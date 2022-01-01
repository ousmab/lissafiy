import { openDb } from "./dbConnexion"


export function insertCategory(tabs, callback){
    // tabs = [name, category_parent_id]
    const db = openDb()

    db.transaction(trx=>{
        trx.executeSql(
            `INSERT INTO category (name, category_parent_id) VALUES (?,?);`,
            tabs,
            (trx, results)=>{
                if(results.rowsAffected>0){
                    callback(true)
                }else{
                    callback(false)
                }
            },
            (error)=>{

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
                        'parent':results.rows.item(0).category_parent_id
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
            WHERE category_parent_id IS NOT NULL
            ORDER BY name ASC`,
            [],
            (trs, results)=>{

                if(results.rows.length>0){
                  
                    for(let i=0; i < results.rows.length; ++i){

                        categories.push(
                            {
                            'id':results.rows.item(i).id,
                            'categorie' :results.rows.item(i).name,
                            'parent':results.rows.item(i).category_parent_id
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


