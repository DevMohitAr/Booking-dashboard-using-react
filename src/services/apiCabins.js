import { supabase } from "./supabase";
import { supabaseUrl } from "./supabase";
export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  return data;
}

export async function createEditCabin(newCabin, id) {

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyZ3V6enZja2Fmc2puaXZsbXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5NDAzOTUsImV4cCI6MjAxNTUxNjM5NX0.d4rUhIoJc4Ak8xq74XrwgfBKtmg4KzW_kOhSSgp3jFc`;
  let query = supabase.from("cabins");
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]).select();
  }
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }
  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error(
      "cabin images cant  be uploaded and the cabin was not created"
    );
  }
  if (hasImagePath) return data;
  const {  error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(error);
    throw new Error("cabin cant be deleted");
  }
  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("cabin cant be deleted");
  }
  return data;
}
