import { rename } from "node:fs/promises";

try {
  const filePath = new URL("message.txt", import.meta.url);
  const newFilePath = new URL("newMessage.txt", import.meta.url);
  const contents = await rename(filePath, newFilePath);
} catch (err) {
  console.log(err);
}
