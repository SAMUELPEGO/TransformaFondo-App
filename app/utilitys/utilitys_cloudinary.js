import cloudinary from "@/cloudinary.config";
import { nanoid } from "nanoid";

export const Utilitys_ns = {
  id: nanoid(4),
  folderName: function folderName() {
    return `images/${this.id}_folder`;
  },

  createFolder: async function createFolder() {
    try {
      const create = await cloudinary.v2.api.create_folder(this.folderName());

      return create;
    } catch (err) {
      return { location: "createFolder", error: err };
    }
  },
  uploadFile: async function uploadFile(file, folder = this.folderName()) {
    const upload = new Promise((resolve) => {
        cloudinary.v2.uploader
          .upload_stream({ folder: folder }, (err, result) => {       
            if (err) {
             resolve({error:{err,location:"uploadFolder"}})
            }
            else if (!result.secure_url) {
              resolve({error:{err:"secure url missing",location:"uploadFolder"}})
            }
            else if (result.secure_url) {
              resolve(result)
            }
          })
          .end(file);
    });
    const result = await upload;
    return result;
  },

    transformBg: function transformBg(public_id,transformation="remove",prompt="una playa") {
      if (transformation == "remove") {
      const transformationUrl = cloudinary.v2.url(public_id, {effect:"background_removal"})
      return {url:transformationUrl}
      }
    else if (transformation == "replace"){
      const transformationUrl = cloudinary.v2.url(public_id, {effect: `gen_background_replace:prompt_an ${prompt}`})
      return {url:transformationUrl}
    }
}}
