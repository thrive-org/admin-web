import authHandler from "./auth.handler";

export const loginAction = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const data = { email, password };
    const response = await authHandler.login(data);
    return response;
}

