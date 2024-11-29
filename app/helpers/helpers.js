export async function convertToBuffer(file) {
  const raw = await file.arrayBuffer();
  const buffer = Buffer.from(raw);
  return buffer;
}

export function cookieParser() {
  const cookies = document.cookie;
  if (cookies) {
    const splitAllCookies = cookies.trim().split(";");
    const splitIndividualCookies = splitAllCookies.map((cookie) => {
      return cookie.split("=");
    });
    const cookieObject = Object.fromEntries(splitIndividualCookies);
    return cookieObject;
  } else {
    return;
  }
}

export async function testUrl(url) { 
  try {
    const req = await fetch(url, { method: "HEAD", cache: "no-cache" });
    if (req.status >= 400 && req.status <= 499) {
      for (let count = 0; count < 15; count++) {
      
        let req = await fetch(url, { method: "HEAD", cache: "no-cache" });
        if (req.status >= 400 && req.status <= 499) {
          continue;
        } else if (req.ok) {
          return { url: url };
        }
      }
      return { error: "url no válida" };
    } else if(req.ok) {
      return { url: url };
    }
  } catch (err) {
    return { error: "ocurrio un error testeando la url" };
  }
}

export async function createDownloadUrl(url) {
  try {
    const req = await fetch(url);
    const res = await req.blob();
    
    const downloadUrl = URL.createObjectURL(res)
    return {url:downloadUrl}
  } catch (err) {
    return { error: "ocurrio un error vuelva a intentarlo" };
  }
}
