import { api } from "@/lib/apiBuilder";
import { z } from "zod";
import authHandler from "@/features/auth/auth.handler";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginData = z.infer<typeof loginSchema>;

export const POST = api()
  .validate(loginSchema)
  .post(async (req, ctx) => {
    const authDto = await authHandler.login(ctx.body as LoginData);
    return { message: "Login successful", data: authDto };
  })
  .build();
