import { openDb } from "./dbConnexion"

export function insertOperation(tabs, callback){
    // tabs = [date, category_id, label, in_amount, out_amount, person]
    const db = openDb()
    db.transaction(trx=>{
        trx.executeSql(
            `INSERT INTO operations (date, category_id, label, in_amount, out_amount, person) 
            VALUES (?,?,?,?,?,?);`,
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

export function getAllOperations(callback){
    const db =  openDb()
    let operations = []

    db.transaction(trs=>{
        trs.executeSql(
            `SELECT 
            * FROM 
            OPERATIONS 
            ORDER BY datetime(date) DESC`,
            [],
            (trs, results)=>{

                if(results.rows.length>0){
                  
                    for(let i=0; i < results.rows.length; ++i){

                        operations.push(
                            {
                            'id':results.rows.item(i).id,
                            'date' :results.rows.item(i).date,
                            'categorie':results.rows.item(i).category_id,
                            'label':results.rows.item(i).label,
                            'in_amount':results.rows.item(i).in_amount,
                            'out_amount':results.rows.item(i).out_amount,
                            'tiers':results.rows.item(i).person
                            }
                        )

                    }
                    
                    callback(operations) 
                    
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
