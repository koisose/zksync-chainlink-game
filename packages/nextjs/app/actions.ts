'use server'
import FormData from 'form-data';
import path from 'path';
import { Deta } from 'deta';
import {
  GoogleGenerativeAI, HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import fetch from 'node-fetch'
import fs from 'node:fs'
import { execSync } from 'child_process';
export async function createImage(prompt: string) {
  // export async function createImage() {

  const engineId = 'stable-diffusion-v1-6'
  const apiHost = process.env.API_HOST ?? 'https://api.stability.ai'
  const apiKey = process.env.STABILITY_API_KEY

  if (!apiKey) throw new Error('Missing Stability API key.')

  // NOTE: This example is using a NodeJS FormData library.
  // Browsers should use their native FormData class.
  // React Native apps should also use their native FormData class.
  const imagePath = path.join(process.cwd(), 'public', 'tshirt.jpg');

  // Read the image file
  const imageBuffer = fs.readFileSync(imagePath);
  const formData = new FormData()
  formData.append('init_image', imageBuffer)
  formData.append('init_image_mode', 'IMAGE_STRENGTH')
  formData.append('image_strength', 0.35)
  formData.append('text_prompts[0][text]', prompt)
  formData.append('cfg_scale', 7)
  formData.append('samples', 1)
  formData.append('steps', 30)

  const response = await fetch(
    `${apiHost}/v1/generation/${engineId}/image-to-image`,
    {
      method: 'POST',
      headers: {
        ...formData.getHeaders(),
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    }
  )

  if (!response.ok) {
    throw new Error(`Non-200 response: ${await response.text()}`)
  }


  const responseJSON = (await response.json())
  // console.log((responseJSON as any))
  const oneImage = (responseJSON as any).artifacts[0].base64
  // return "https://upload.wikimedia.org/wikipedia/commons/c/c6/Grey_Tshirt.jpg"
  return oneImage

}
export async function generateTshirt() {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
    systemInstruction: "you're a tshirt generator create a tshirt title and description return in json like `{\"title\":\"lycra tshirt\",\"description\":\"this tshirt is made with lycra fabric that is flexible and breathable\"}` "
  },
    { apiVersion: 'v1beta' });
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ];
  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: [
    ],
  });

  const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const result = await chatSession.sendMessage(`generate new random tshirt with unique identifier: ${randomString}`);
  return result.response.text();
}
export async function generateGuessingGame() {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "you're a word game creator only answer in this schema example response {\"word\":\"panda\",\"clue\":\"an animal with a black and white fur\"}"
  });
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ];
  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: [
    ],
  });

  const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const result = await chatSession.sendMessage(`generate new random word with unique identifier: ${randomString}`);
  return result.response.text();
}
export async function generateImageWithLilypad() {
  const lilypadPath = path.join(process.cwd(), 'public', 'lilypad');
  const web3PrivateKey=process.env.WEB3_API_KEY;
  return execSync(`export WEB3_PRIVATE_KEY=${web3PrivateKey} && ${lilypadPath} run cowsay:v0.0.3 -i Message="moo"`)
}


export async function getDetaData(databaseName: string) {
  // @ts-ignore
  const deta = new Deta(process.env.DETA_KEY);
  const db = deta.Base(databaseName);
  const data = await db.fetch({})
  return data;
}

export async function putData(databaseName: string, data: any) {
  // @ts-ignore
  const deta = new Deta(process.env.DETA_KEY);
  const db = deta.Base(databaseName);
  await db.put(data);
  return true
}
export async function deleteData(databaseName: string, key: any) {
  // @ts-ignore
  const deta = new Deta(process.env.DETA_KEY);
  const db = deta.Base(databaseName);
  await db.delete(key);
}