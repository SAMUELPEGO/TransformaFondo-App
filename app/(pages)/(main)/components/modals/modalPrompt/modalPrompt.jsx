 import "./modalPrompt.css";
import { BG_REPLACE_URL } from "@/app/constants/apiEndPoints";
import { toast, Toaster } from "sonner";
import { createDownloadUrl, testUrl } from "@/app/helpers/helpers";
import replace_bg from "@/app/services/replaceBG";

export default function ModalPrompt({ isOpen, setIsOpen, img, btnDownload,loading,setLoading,visibleLoading,setVisibleLoading}) {
  async function replaceBgHandler(e) {
    e.preventDefault();
    setIsOpen();
    setLoading(true)
    setVisibleLoading(true)
    const prompt = e.target.children[0].value;
    try {
      const req = await replace_bg(prompt)
      
      if (req.error) {
        console.log("res.error:" + res.error )
        toast(req.error);
      } else if (req.url) {
        console.log("req.url:" + req.url )
        const url = await testUrl(req.url);
       if (url.url) {
        img.current.src = url.url;
        img.current.hidden = false;
        const href = await createDownloadUrl(req.url)
        btnDownload.current.href = href.url
        setLoading(false)
        setVisibleLoading(false)
        e.target.children[0].value = ""
      }else {
        toast("tuvimos un error vuelva a intentarlo")
      }
      }
    } catch (err) {
      toast("problemas de conexion vuelva a intentarlo");
    }
  }

  return (
    <div className={`modalPrompt-wrapper ${isOpen ? "visible" : "hidden"}`}>
      <div className="modalPrompt">
        <p>
          Describa el background para que la inteligencia artificial lo genere
        </p>
        <form onSubmit={replaceBgHandler}>
          <textarea name="prompt" id="" placeholder="prompt" />
          <button type="submit">Confirmar</button>
          <button type="button" onClick={setIsOpen}>
            Cerrar
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
