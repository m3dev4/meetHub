"use server"

import { currentUser } from "@clerk/nextjs";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY_URL;
const secretKey = process.env.STREAM_SECRET_KEY

export const tokenProvider = async () => {
    const user = await currentUser()
    if (!user) throw new Error("L'utilisateur n'est pas trouvé");
    if (!apiKey) throw new Error("Clé API manquante")
    if (!secretKey) throw new Error("Clé secret manquante")

    const client = new StreamClient(apiKey, secretKey)

    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    const issued = Math.floor(Date.now() / 1000) - 60

    const token = client.createToken(user.id, exp, issued)

    return token
}