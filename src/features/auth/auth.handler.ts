import { AuthDtoType } from "./dto/auth.dto";
import authService from "./auth.service";
import { isValidRole } from "@/utils/role";
import { AuthDto } from "./dto/auth.dto";

type LoginData = {
	email: string;
	password: string;
};
const login = async (data: LoginData): Promise<AuthDtoType> => {
	const user = await authService.getUserWithRoleByEmail(data.email);

	console.log("user", user);

	if (!user) {
		throw new Error("User not found");
	};
	if (!isValidRole(user.accounts[0].role.name)) {
		throw new Error("Invalid role");
	};

	const ok = await authService.verifyPassword(data.email, data.password);
	if (!ok) {
		throw new Error("Invalid password");
	};

	const authUser = AuthDto.toAuthUser(user);
	if (!authUser) {
		throw new Error("Failed to map user to auth DTO");
	}

	return authUser;
};

const authHandler = {
	login,
};

export default authHandler;
