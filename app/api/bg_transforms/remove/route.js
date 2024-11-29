import { NextRequest as request,NextResponse as response } from "next/server";
import { Utilitys_ns } from "@/app/utilitys/utilitys_cloudinary";
import { cookies } from "next/headers";

export async function POST(request){
try {
    const cookie = cookies().get("public_id")
    console.log(cookie)
    const transformationUrl = Utilitys_ns.transformBg(cookie.value)
    console.log(transformationUrl.url)
    return response.json({url:transformationUrl.url})
   
}
    catch(err) {
        return response.json({error:"ocurrio un error vuelva a intentarlo"}) 
    }
    
}