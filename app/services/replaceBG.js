import { BG_REPLACE_URL } from "../constants/apiEndPoints";
import { cookieParser } from "../helpers/helpers";
export default async function replace_bg(prompt) {
  try {

    const req = await fetch(BG_REPLACE_URL, {
      method: "post",
      body: JSON.stringify({ prompt: prompt }),
      cache: "no-cache",
    });
    const res = await req.json();
    console.log(res)
    return res;
  } catch (err) {
    return { error: "tuvimos un problema vuelva a intentarlo" };
  }
}
