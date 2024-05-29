import { config } from "dotenv";

config({ path: ".env" });

export const EXPO_PUBLIC_OPENAI_API_KEY: string =
  process.env.EXPO_PUBLIC_OPENAI_API_KEY!;
