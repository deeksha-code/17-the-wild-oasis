import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log("create Edit function", newCabin, id);

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);


  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  // const imagePath =
  //  `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1.Create/edit cabin
  let query = supabase.from("cabins");

  // A)CREATE
  if (!id) query=query.insert([{ ...newCabin, image: imagePath }]);

  //B)Edit
  if (id) query=query.update({ ...newCabin, image: imagePath }).eq("id", id).select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error("error", error);
    throw new Error("cabins could not be created");
  }

  //2.upload image

  if(hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3.Delete the cabin If there was an error uploading error
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "cabin image could not be uploaded and the cabin was not created"
    );
  }
  return data;
}

export async function deleteCabin(id) {
  console.log("entered delete cabin function");
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error("error", error);
    throw new Error("cabins could not be deleted");
  }
  console.log("data", data);

  return data;
}
