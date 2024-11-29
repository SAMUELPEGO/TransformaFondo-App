"use client"
import Link from "next/link";
import "./navbar.css"
import { useState } from "react";
export default function NavbarComponent({ pageSelected }) {
  const [visibility, setVisibility] = useState(false)
  function linksVisibilityHandler() {
    if (visibility) {
      setVisibility(false)
    }
    else {
      setVisibility(true)
    }
  }
  return (
    <nav className="navbar"><div className="navbar-brand"><p>fotoEdit</p></div><div className={`navbar-links ${visibility ? "hidden" : "visible"}`}>
      <Link href="/" className={pageSelected == "Modificar fondo" ? "selected-style" : ""}>Modificar fondo</Link>
    </div><div className="btn-link" onClick={linksVisibilityHandler}><img src="/assets/icons/list.svg" alt="" width={30} /></div>
    </nav>
  );
}
