/*
# コスト
0.080$/image * 32images = 2.56$
cf. https://openai.com/api/pricing/
*/

import { promises as fsPromises } from "fs";
import { OpenAI } from "openai";
import { mkdir, access } from "fs/promises";
import { createInterface } from "readline";
import { config } from "dotenv";

config({ path: ".env" });

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
});

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// cf. https://platform.openai.com/docs/guides/images/image-generation
async function generateImage(prompt: string): Promise<string> {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1, // dall-e-3 can only generate one image at a time
    size: "1024x1792",
  });
  return response.data[0].url!;
}

async function saveImage(url: string, path: string): Promise<void> {
  const response = await fetch(url);
  const buffer = Buffer.from(await response.arrayBuffer());
  await fsPromises.writeFile(path, buffer);
}

function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function main() {
  const prompt = await askQuestion("Enter the image prompt: ");
  const name = await askQuestion("Enter the name to save images: ");
  const directory = `assets/${name}`;

  try {
    await access(directory);
  } catch {
    await mkdir(directory, { recursive: true });
  }

  // 並列で処理するとrate limitを超えるので、あえてawaitを使って順番に処理する
  for (let i = 0; i < 32; i++) {
    console.log(`Generating image ${i + 1}`);

    let imageUrl;

    try {
      imageUrl = await generateImage(prompt);
    } catch (error) {
      console.error("Failed to generate image");
      console.error(error);
      continue;
    }

    await saveImage(imageUrl, `${directory}/${i}.png`);
    console.log(`Saved image ${i + 1}`);
  }

  rl.close();
}

main();
