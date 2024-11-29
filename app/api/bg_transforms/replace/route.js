import { NextRequest, NextResponse as response } from "next/server";
import { Utilitys_ns } from "@/app/utilitys/utilitys_cloudinary";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const cookie = cookies().get("public_id");
    const data = await request.json();
    const prompt = data.prompt
    const transformation = "replace";

    const transformationUrl = Utilitys_ns.transformBg(
      cookie.value,
      transformation,
      prompt || "una playa"
    );
    return response.json({ url: transformationUrl.url });
  } catch (err) {
    return response.json({ error: "ocurrio un error vuelva a intentarlo" });
  }
}
