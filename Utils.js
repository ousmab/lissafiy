function getSectionListDataStructure(sectionTitleCriteria, dataToFiltering){
	
    let structured_data = []
    
    for(let i=0; i< sectionTitleCriteria.length; i++){
          let result = dataToFiltering.filter((element)=>{
            return element.date == sectionTitleCriteria[i]
         })
  
         structured_data.push({'title':sectionTitleCriteria[i],'data':result})
  
    }
  
      return structured_data
  }
  
