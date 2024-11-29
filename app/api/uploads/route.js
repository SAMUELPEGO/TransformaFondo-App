import { NextRequest, NextResponse } from "next/server";
import { Utilitys_ns } from "../../utilitys/utilitys_cloudinary";
import { convertToBuffer } from "../../helpers/helpers";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const cookie = cookies().get("folder");
    if (!file) {
      return NextResponse.json("no files");
    } else if (file && !cookie) {
      const createFolder = await Utilitys_ns.createFolder();
      cookies().set("folder", `${createFolder.path}`);

      const buffer = await convertToBuffer(file);

      const uploadFile = await Utilitys_ns.uploadFile(buffer);
      cookies().set("public_id", `${uploadFile.public_id}`);
      console.log(uploadFile);
      return NextResponse.json({ url: uploadFile.secure_url });
    } else if (file && cookie) {
      const buffer = await convertToBuffer(file);
      const uploadFile = await Utilitys_ns.uploadFile(buffer, cookie.value);
      const error = JSON.stringify(uploadFile.error);
      if (error) {
        return NextResponse.json({
          error: "tuvimos un problema subiendo su archivo vuelva a intentarlo",
        });
      }
      console.log(uploadFile)
      cookies().set("public_id", `${uploadFile.public_id}`);
      cookies().set("folder", `${uploadFile.asset_folder}`);
      

      return NextResponse.json({ url: uploadFile.secure_url });
    }
  } catch (err) {
    return NextResponse.json({
      error: "tuvimos un problema subiendo su archivo vuelva a intentarlo",
    });
  }
}
