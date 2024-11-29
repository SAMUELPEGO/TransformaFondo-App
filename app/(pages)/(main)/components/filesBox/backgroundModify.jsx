"use client";
import "./backgroundModify.css";
import ModalPrompt from "../modals/modalPrompt/modalPrompt";
import { uploadHandler } from "@/app/services/uploadFile";
import { Toaster, toast } from "sonner";
import useControlModal from "@/app/hooks/useControlModal";
import { useRef, useState } from "react";
import { testUrl } from "@/app/helpers/helpers";
import remove_bg from "@/app/services/removeBG";

export default function BgModify() {
  const { isOpen, openModalPrompt, closeModalPrompt } = useControlModal();
  const [loading, setLoading] = useState(true);
  const [visibleLoading, setVisibleLoading] = useState(false);
  const image = useRef(null);
  const [btnDownload, btnRemove, btnReplace] = [
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  async function uploadFile(e) {
    setLoading(true);
    setVisibleLoading(true)
    uploadHandler(e).then((res) => {
      if (res.error) {
        toast(res.error);
      } else {
        image.current.src = res.url;
        image.current.hidden = false;
        setLoading(false)
        setVisibleLoading(false)

      }
    });
  }
  async function removeBgHandler() {
    setLoading(true);
    setVisibleLoading(true)
    const removeBg = await remove_bg();
    if (removeBg.error) {
      toast(removeBg.error);
    } else if (removeBg.url) {
      const url = await testUrl(removeBg.url);
      if (url.url) {
        image.current.src = url.url;
        image.current.hidden = false;
        btnDownload.current.href = url.url;
        setLoading(false);
        setVisibleLoading(false)

      }
      else {
        toast("tuvimos un error inténtelo de nuevo")
      }
    }
  }

  return (
    <div className="bg-modify">
      <div className="bg-modify-imagesContainer">
        <div>
          <div className={visibleLoading ? "visible" : "not-visible"}>
            <img src="/assets/icons/pulse-multiple.svg" alt="" />
          </div>
          <img src="" ref={image} hidden />
        </div>
      </div>
      <form action="">
        <label htmlFor="bg-modify-input" className="bg-modify-inputLabel">
          Elegir archivo
        </label>
        <input
          className="bg-modify-input"
          type="file"
          id="bg-modify-input"
          onChange={uploadFile}
        />
        <button
          type="button"
          onClick={removeBgHandler}
          ref={btnRemove}
          className={loading ? "disabled" : ""}
        >
          Remover
        </button>
        <button
          type="button"
          onClick={openModalPrompt}
          ref={btnReplace}
          className={loading ? "disabled" : ""}

        >
          Remplazar
        </button>
        <a href="" ref={btnDownload} download="archivo" className={loading ? "disabled" : ""}>
          Descargar
        </a>
      </form>
      <ModalPrompt
        isOpen={isOpen}
        setIsOpen={closeModalPrompt}
        img={image}
        btnDownload={btnDownload}
        loading={loading}
        setLoading={setLoading}
        visibleLoading={visibleLoading}
        setVisibleLoading={setVisibleLoading}
      />
      <Toaster />
    </div>
  );
}
