import { supabase } from "./supabase";
export const login = async ({ email, password }) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error("error");
  }
  return { data };
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
};

export const logOutApi = async () => {
  let { error } = await supabase.auth.signOut();
};

export const signUpApi = async ({
  email,
  password,
  name,
  twitter,
  phoneNumber,
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        twitter,
        phoneNumber,
        avatar: "",
      },
    },
  });
  if (error) {
    if (error.message.includes("unique")) {
      throw new Error("user with this email already exists");
    }
    console.log("erroraaya");
    throw new Error(error.message);
  }
  return data;
};

export const updateUserApi = async ({ name, avatar, password }) => {
  let updateData;
  if (password) updateData = { password };
  if (name) updateData = { data: { name: name } };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    throw new Error(error.message);
  }

  if (password) {
    await supabase.auth.updateUser({ password });
  }
  if (!avatar) return data;

  if (avatar) {
    let imageName = `avatar${data.user.id}-${Math.random()}`;
    const { error: imageError } = await supabase.storage
      .from("avatars")
      .upload(imageName, avatar);
    if (imageError) {
      throw new Error("error");
    }

    const { data: imageUpdate, error: imageUpdateError } =
      await supabase.auth.updateUser({
        data: {
          avatar: `https://frguzzvckafsjnivlmug.supabase.co/storage/v1/object/public/avatars/${imageName}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL21vaGl0LmpwZWciLCJpYXQiOjE3MDE2NzQ5MzIsImV4cCI6MTczMzIxMDkzMn0.hOPJcOKPluYGGF4CCT-aqDfoZiQZplTT_EJa8KauAcQ&t=2023-12-04T07%3A28%3A53.117Z`,
        },
      });
    if (imageUpdateError) {
      throw new Error("error");
    }
    return imageUpdate;
  }
};
