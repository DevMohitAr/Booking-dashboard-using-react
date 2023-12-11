import { supabase } from "./supabase";
export const getSettings = async () => {
  let { data, error } = await supabase.from("settings").select("*");
  if (error) {
    console.error(error);
    throw new Error("getting problem in settings data");
  }
  return data;
};


export const updateSetting =async (newSetting)=>{

const { data, error } = await supabase
  .from('settings')
  .update(newSetting)
  .eq('id',1)
  .select()
return data
}