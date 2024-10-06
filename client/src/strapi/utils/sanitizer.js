function convertObjectToArray(obj) {
  for (let key in obj) {
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
          // Check if the object has numeric keys
          const numericKeys = Object.keys(obj[key]).every(k => !isNaN(k));
          
          if (numericKeys) {
              obj[key] = Object.values(obj[key]); // Convert to array
          } else {
              // Recursively check deeper objects
              convertObjectToArray(obj[key]);
          }
      }
  }
  return obj;
}

export const sanitizer = (data) => {

	var arr = []

  if(data){
    Object.entries(data).map(([key, val]) => {
      if(val === "") return 0
      else if(val?.connect?.length === 0) return 0
      else if(Array.isArray(val?.connect) && typeof val?.connect[0].id === "undefined") return 0
      else if(val?.length === 0) return 0
      else if(typeof val === "object"){
        const sData =  sanitizer(val)
        if(sData) return arr.push([key, sData])
        else return 0
      }
      else{
        return arr.push([key, val])
      }
    })
    return convertObjectToArray(Object.fromEntries(arr))
  }
  else{
    return null
  }

	

}