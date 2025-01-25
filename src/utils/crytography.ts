"use server";

import * as crypto from "crypto";
import { encodePacked, keccak256 } from "viem";

const ALGORITHM = "aes-256-cbc";
const envKey = process.env.ENCRYPTION_KEY;
const envIV = process.env.ENCRYPTION_IV;

function generateKey(): Buffer {
  if (!envKey)
    throw new Error("ENCRYPTION_KEY not found in environment variables");
  return Buffer.from(envKey, "base64");
}

function generateIV(): Buffer {
  if (!envIV)
    throw new Error("ENCRYPTION_IV not found in environment variables");
  return Buffer.from(envIV, "base64");
}

const key = generateKey();
const iv = generateIV();

function encrypt(text: string): string {
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

export async function decrypt(encryptedText: string): Promise<string> {
  "use server";
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

function getRandomUInt256() {
  const randomBytes = crypto.randomBytes(32);
  return BigInt("0x" + randomBytes.toString("hex"));
}

export async function hashMove(move: number) {
  "use server";
  const salt = getRandomUInt256();
  const hashedMove = keccak256(
    encodePacked(["uint8", "uint256"], [move, salt])
  );

  const hashedSalt = encrypt(String(salt));
  return { salt: String(hashedSalt), hashedMove };
}
