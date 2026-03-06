import { z } from "zod";

const envSchema = z.object({
	API_URL: z.string().url(),
});

export const env = envSchema.parse({
	API_URL: process.env.API_URL,
});
