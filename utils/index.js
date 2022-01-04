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

	return {'date': dates, 'entree':sum_in_by_date,'sortie':sum_out_by_date}
}
