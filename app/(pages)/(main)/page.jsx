import NavbarComponent from "@/app/components/navbar/navbar"
import BgModify from "./components/filesBox/backgroundModify"

export default function Main() {

    return(<>
      <NavbarComponent pageSelected="Modificar fondo"/>
       <main><BgModify/></main>
       
       </>
    )
}