import supabase, { supabaseUrl } from "./supabase";

export async function signup({ full_name, email, password }) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullName: full_name,
				avatar: "",
			},
		},
	});

	if (error) throw new Error(error.message);

	return data;
}

export async function login({ email, password }) {
	let { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw new Error(error.message);

	return data;
}

export async function getCurrentUser() {
	const { data: session } = await supabase.auth.getSession();

	if (!session.session) return null;

	const { data, error } = await supabase.auth.getUser();

	if (error) throw new Error(error.message);

	return data?.user;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();

	if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ avatar, password, fullName }) {
	// 1. Update the password or full name.
	// We can never update both at the same time since they're in different forms.
	let updateData;

	if (fullName) updateData = { data: { fullName } };

	if (password) updateData = { password };

	const { data, error } = await supabase.auth.updateUser(updateData);

	if (error) throw new Error(error.message);

	if (!avatar) return data;

	// 2. Upload the avatar image.
	const fileName = `avatar-${data.user.id}-${Math.random()}`;

	const { error: storageError } = await supabase.storage
		.from("avatars")
		.upload(fileName, avatar);

	if (storageError) throw new Error(storageError.message);

	// 3. Update the user's avatar.
	const { data: updatedUser, error: avatarError } =
		await supabase.auth.updateUser({
			data: {
				avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
			},
		});

	if (avatarError) throw new Error(avatarError.message);

	return updatedUser;
}
