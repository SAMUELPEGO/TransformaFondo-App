import { BG_REMOVE_URL } from "../constants/apiEndPoints"
export default async function remove_bg(){
    try {
            
            const req = await fetch(BG_REMOVE_URL,{method:"post",cache:"no-cache"}) 
            const res = await req.json()
            return res
            
      
    }
catch(err) {
    return ({error:"tuvimos un problema vuelva a intentarlo"})
}
}