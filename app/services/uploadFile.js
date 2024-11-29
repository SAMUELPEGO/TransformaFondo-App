import { UPLOADS_URL } from "../constants/apiEndPoints";
export const uploadHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const req = await fetch(UPLOADS_URL, {
      cache: "no-cache",
      method: "POST",
      body: formData,
    });
    const res = req.json()
    return res
  };