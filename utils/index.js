export function sumOperationsJour(date,datas){
   let entree = 0
   let sortie = 0
 
    let result = datas.filter(element=>{
     return element.title === date
   })
 
   let operations = result[0].data
    
      let tab_in = []
     let tab_out = []
    for (let i=0 ; i < operations.length ; i++){
        tab_in.push(operations[i].in_amount)
         tab_out.push(operations[i].out_amount)
     }
   
   entree = sum(tab_in)
   sortie = sum(tab_out)
   
 
   return {"entree": entree, "sortie":sortie}
 }



export function getSectionListDataStructure(criteria,sectionTitleCriteria, dataToFiltering){
	
    let structured_data = []
    
    for(let i=0; i< sectionTitleCriteria.length; i++){
          let result = dataToFiltering.filter((element)=>{
            return element[criteria] == sectionTitleCriteria[i]
         })
  
         structured_data.push({'title':sectionTitleCriteria[i],'data':result})
  
    }
  
      return structured_data
  }
  
  function sum(tab){
    return tab.reduce(function(accumulateur, valeurCourante){
      return accumulateur + valeurCourante;
    },0);
  }
    
 export function getDatasets(data, dates){
  
  	let sum_in_by_date = []
    let sum_out_by_date = []
  
	let tab_entree =data.filter(element=>{
  		return element['category_type'] == 1
    })
    
    let tab_sortie = data.filter(element=>{
  		return element['category_type'] == 2
    })
	
    
    for(let i = 0; i < dates.length ; i++){
      
        let elements_entree_by_date = tab_entree.filter( el=> el['date'] == dates[i])
        let elements_sortie_by_date = tab_sortie.filter( el=> el['date'] == dates[i])
        
        let montants_entree = elements_entree_by_date.map(element=>{
          return element['in_amount']
        })
        
        let montant_sortie = elements_sortie_by_date.map(element=>{
          return element['out_amount']
        })
        
        sum_in_by_date.push(sum(montants_entree))
        sum_out_by_date.push(sum(montant_sortie))
        
    }

	return {'dates': dates, 'in':sum_in_by_date,'out':sum_out_by_date}
}


/**
 * 
 * 
 * const data = [
    {
       "categorie":"nutrition",
       "category_type":2,
       "date":"2022-01-04",
       "id":3,
       "in_amount":0,
       "label":"Pain chocolat",
       "out_amount":250,
       "tiers":null,
       "type_debt":null
    },
 
    {
       "categorie":"nutrition",
       "category_type":2,
       "date":"2022-01-04",
       "id":1,
       "in_amount":0,
       "label":"Spaghetti matin",
       "out_amount":500,
       "tiers":null,
       "type_debt":null
    },
    {
       "categorie":"pourboires",
       "category_type":1,
       "date":"2022-01-03",
       "id":2,
       "in_amount":600,
       "label":"Colgate",
       "out_amount":0,
       "tiers":null,
       "type_debt":null
    },
    {
       "categorie":"emprunts",
       "category_type":1,
       "date":"2022-01-03",
       "id":4,
       "in_amount":500,
       "label":"Emprunts chez ouva",
       "out_amount":0,
       "tiers":"Ouba",
       "type_debt":1

},
 
{
   "categorie":"entrée",
   "category_type":2,
   "date":"2022-01-03",
   "id":1,
   "in_amount":0,
   "label":"Spaghetti matin",
   "out_amount":800,
   "tiers":null,
   "type_debt":null
},
 
{
   "categorie":"nutrition",
   "category_type":2,
   "date":"2022-01-01",
   "id":1,
   "in_amount":0,
   "label":"Spaghetti matin",
   "out_amount":500,
   "tiers":null,
   "type_debt":null
},
 
{
   "categorie":"nutrition",
   "category_type":2,
   "date":"2021-12-31",
   "id":1,
   "in_amount":0,
   "label":"Spaghetti matin",
   "out_amount":500,
   "tiers":null,
   "type_debt":null
},
 
{
   "categorie":"nutrition",
   "category_type":2,
   "date":"2021-12-30",
   "id":1,
   "in_amount":0,
   "label":"Spaghetti matin",
   "out_amount":500,
   "tiers":null,
   "type_debt":null
},
 
{
   "categorie":"entrée",
   "category_type":1,
   "date":"2021-12-29",
   "id":1,
   "in_amount":1500,
   "label":"Spaghetti matin",
   "out_amount":0,
   "tiers":null,
   "type_debt":null
},
 
{
   "categorie":"sortie",
   "category_type":2,
   "date":"2021-12-29",
   "id":1,
   "in_amount":0,
   "label":"Spaghetti matin",
   "out_amount":7000,
   "tiers":null,
   "type_debt":null
}

]



let dates = ["2022-01-04","2022-01-03","2022-01-02","2022-01-01"]
 */