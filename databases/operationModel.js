import { openDb } from "./dbConnexion"
import moment from "moment"
import { CATEGORY_DETTE, CATEGORY_IN, CATEGORY_PRET } from "./categoryModel"



export  function createOperationTable(){
    const db = openDb()
    db.transaction(txn=>{
        txn.executeSql(
           `
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
                
            },

            (error)=>{
                //console.log(error,"creating results error")
            }
        )
    })
   
}

export function getBalanceByTiers(type_debt,callback){
    const db =  openDb()
    
    let resultat = []

    let type_solde = type_debt == CATEGORY_PRET ? 'sum(out_amount)-sum(in_amount)':
    'sum(in_amount)-sum(out_amount)';

  
    
    let requete = ` 
    select ${ type_solde } as balance , person from 
    (   
        select * from operations 
        inner join category 
        on operations.category_id = category.id 
        where category.type_debt=?
    ) 
    group by person;
     `

    db.transaction(trs=>{ 
        trs.executeSql(
            requete
            ,
            [type_debt],
            (trs, results)=>{

                if(results.rows.length>0){
                    

                    for (let i =0; i < results.rows.length; i++ ){

                        resultat.push(
                            {
                                'tiers':results.rows.item(i).person,
                                'solde':results.rows.item(i).balance
                            }
                        )
                    }

                    callback(resultat)
                    
                }else{
                    callback([])
                }

                
            },
            (error)=>{
                console.log("error solde par tiers ", error)
            }
        )
    })

    
}


export function getTiersBalance(type,callback){
    const db =  openDb()
    
    

    let solde_type = type == CATEGORY_IN ? '(sum(operations.in_amount)-sum( operations.out_amount))':
    '(sum(operations.out_amount)-sum( operations.in_amount))';

  
    
    let requete = ` 
        SELECT ${ solde_type } as solde      
        FROM operations 
        INNER JOIN 
            category on operations.category_id=category.id
        WHERE category.type_debt =? 
         `

    db.transaction(trs=>{ 
        trs.executeSql(
            requete
            ,
            [type],
            (trs, results)=>{

                if(results.rows.length>0){
                  
                    
                    let solde = results.rows.item(0).solde
                    callback(solde) 
                    
                }else{
                    callback(0)
                }

                
            },
            (error)=>{
                console.log("error solde tiers ", error)
            }
        )
    })

    
}

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
                alert(error)
            }
        )
    })
}

export function getSumInOrOout(category_type,criteria,callback){

    //criteria = 'day' , 'week' ,'month' ,'all'
    let colum_to_sum = category_type == CATEGORY_IN ? 'operations.in_amount' : 'operations.out_amount'

    let critere = ''
    switch (criteria) {
        case 'day':
            critere = " WHERE operations.date = DATE('now','localtime') AND "
            break;
        case 'week':
            critere = " WHERE strftime('%W',operations.date) =  strftime('%W',DATE('now','localtime')) AND "
            break;
        case 'month':
            critere = " WHERE strftime('%m',operations.date) =  strftime('%m',DATE('now','localtime')) AND "
            break;
        case 'all':
            critere = " WHERE "
            break;
        default:
            break;
    }

    const db =  openDb()
    let requete = `
    SELECT 	 
    sum(${colum_to_sum}) as somme
    FROM operations 
    INNER JOIN 
    category on operations.category_id=category.id ${critere} category.category_type=? and (category.type_debt is null or category.type_debt= '') 
    `
    console.log(requete)

    db.transaction(trs=>{ //{'id','label','categorie','montant'}
        trs.executeSql(
            requete.toString(),
            [category_type],
            (trs, results)=>{

                if(results.rows.length>0){
                    
                    let somme =  results.rows.item(0).somme ? results.rows.item(0).somme : 0
                    callback(somme)
                    
                }else{
                    callback(0)
                }

                
            },
            (error)=>{
                console.log("error during selection ", error)
            }
        )
    })

    
}





export function getAllDays(callback){
    const db =  openDb()
    let operations_dates = []

    db.transaction(trs=>{
        trs.executeSql(
            `SELECT date  FROM operations  GROUP BY date ORDER BY date DESC ;`,
            [],
            (trs, results)=>{

                if(results.rows.length>0){
                  
                    for(let i=0; i < results.rows.length; ++i){
                        //let date_formated = String(moment(results.rows.item(i).date, 'YYYY-MM-DD').format('DD-MM-YYYY'));
                        operations_dates.push(results.rows.item(i).date)
                    }
                    
                    callback(operations_dates) 
                    
                }else{
                    callback([])
                }

                
            },
            (error)=>{
                console.log("error during selection ", error)
            }
        )
    })

    
}
export function getAllOperationsByDate(date,callback){
    const db =  openDb()
    let operations = []

    db.transaction(trs=>{ //{'id','label','categorie','montant'}
        trs.executeSql(
            `
            SELECT operations.id,
                    operations.date, 
                    operations.label, 
                    category.name, 
                    operations.in_amount, 
                    operations.out_amount, 
                    category.category_type,
                    operations.person,
                    category.type_debt  
            FROM operations 
            INNER JOIN 
                category on operations.category_id=category.id
            WHERE operations.date=?
            ORDER BY operations.date DESC;
            `,
            [date],
            (trs, results)=>{

                if(results.rows.length>0){
                  
                    for(let i=0; i < results.rows.length; ++i){

                        operations.push(
                            {
                            'id':results.rows.item(i).id,
                            'date':results.rows.item(i).date,
                            'label' :results.rows.item(i).label,
                            'categorie':results.rows.item(i).name,
                            'in_amount':results.rows.item(i).in_amount,
                            'out_amount':results.rows.item(i).out_amount,
                            'category_type':results.rows.item(i).category_type,
                            'tiers':results.rows.item(i).person,
                            'type_debt':results.rows.item(i).type_debt
                            }
                        )

                    }
                    
                    callback(operations) 
                    
                }else{
                    callback([])
                }

                
            },
            (error)=>{
                console.log("error during selection ", error)
            }
        )
    })

    
}


export function getAllLastNdaysOperations(nombre_jours,callback){
    const db =  openDb()
    let operations = []

    db.transaction(trs=>{ //{'id','label','categorie','montant'}
        trs.executeSql(
            `
            SELECT operations.id,
                    operations.date, 
                    operations.label, 
                    category.name, 
                    operations.in_amount, 
                    operations.out_amount, 
                    category.category_type,
                    operations.person,
                    category.type_debt  
            FROM operations 
            INNER JOIN 
                category on operations.category_id=category.id
            WHERE operations.date > (SELECT DATE('now','localtime', '-${nombre_jours} day'));
            ORDER BY operations.date DESC;
            `,
            [],
            (trs, results)=>{

                if(results.rows.length>0){
                  
                    for(let i=0; i < results.rows.length; ++i){

                        operations.push(
                            {
                            'id':results.rows.item(i).id,
                            'date':results.rows.item(i).date,
                            'label' :results.rows.item(i).label,
                            'categorie':results.rows.item(i).name,
                            'in_amount':results.rows.item(i).in_amount,
                            'out_amount':results.rows.item(i).out_amount,
                            'category_type':results.rows.item(i).category_type,
                            'tiers':results.rows.item(i).person,
                            'type_debt':results.rows.item(i).type_debt
                            }
                        )

                    }
                    
                    // je recupere les 7 derniers jours
                    let tab_jours = []
                    for(let i=0 ; i<=nombre_jours-1; i++){
                        let dateFrom = moment().subtract(i,'d').format('YYYY-MM-DD');
                        tab_jours.push(dateFrom)
                    }
                    
                    callback(operations,tab_jours) 
                    
                }else{
                    callback([])
                }

                
            },
            (error)=>{
                console.log("error during selection ", error)
            }
        )
    })

    
}


export function getAllOperationsTiers(callback){
    const db =  openDb()
    let operations = []

    db.transaction(trs=>{ //{'id','label','categorie','montant'}
        trs.executeSql(
            `
            SELECT operations.id,
                    operations.date, 
                    operations.label, 
                    category.name, 
                    operations.in_amount, 
                    operations.out_amount, 
                    category.category_type,
                    operations.person,
                    category.type_debt  
            FROM operations 
            INNER JOIN 
                category on operations.category_id=category.id
            WHERE category.type_debt =1 or category.type_debt =2
            ORDER BY operations.date DESC,operations.id DESC ;
            `,
            [],
            (trs, results)=>{

                if(results.rows.length>0){
                  
                    for(let i=0; i < results.rows.length; ++i){

                        operations.push(
                            {
                            'id':results.rows.item(i).id,
                            'date':results.rows.item(i).date,
                            'label' :results.rows.item(i).label,
                            'categorie':results.rows.item(i).name,
                            'in_amount':results.rows.item(i).in_amount,
                            'out_amount':results.rows.item(i).out_amount,
                            'category_type':results.rows.item(i).category_type,
                            'tiers':results.rows.item(i).person,
                            'type_debt':results.rows.item(i).type_debt
                            }
                        )

                    }
                    
                    callback(operations) 
                    
                }else{
                    callback([])
                }

                
            },
            (error)=>{
                console.log("error during selection ", error)
            }
        )
    })

    
}


export function getAllOperations(callback){
    const db =  openDb()
    let operations = []

    db.transaction(trs=>{ //{'id','label','categorie','montant'}
        trs.executeSql(
            `
            SELECT operations.id,
                    operations.date, 
                    operations.label, 
                    category.name, 
                    operations.in_amount, 
                    operations.out_amount, 
                    category.category_type,
                    operations.person,
                    category.type_debt  
            FROM operations 
            INNER JOIN 
                category on operations.category_id=category.id
            ORDER BY operations.date DESC, operations.id DESC;
            `,
            [],
            (trs, results)=>{

                if(results.rows.length>0){
                  
                    for(let i=0; i < results.rows.length; ++i){

                        operations.push(
                            {
                            'id':results.rows.item(i).id,
                            'date':results.rows.item(i).date,
                            'label' :results.rows.item(i).label,
                            'categorie':results.rows.item(i).name,
                            'in_amount':results.rows.item(i).in_amount,
                            'out_amount':results.rows.item(i).out_amount,
                            'category_type':results.rows.item(i).category_type,
                            'tiers':results.rows.item(i).person,
                            'type_debt':results.rows.item(i).type_debt
                            }
                        )

                    }
                    
                    callback(operations) 
                    
                }else{
                    callback([])
                }

                
            },
            (error)=>{
                console.log("error during selection ", error)
            }
        )
    })

    
}




