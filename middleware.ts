import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextFetchEvent } from "next/server";

// Créez un middleware d'authentification
const authenticationMiddleware = authMiddleware({});

// Votre fonction handler
export default function handler(req: NextRequest, res: NextFetchEvent) {
  // Appliquer le middleware d'authentification pour toutes les requêtes
  return authenticationMiddleware(req, res);
}
