import { authConfig } from "@/app/config/auth";
import NextAuth from "next-auth/next";



//!1)конфигурация авторизации через библиотек NextAuth in config
//!2) создается страница по адрессу api/auth/callback/google, будет больше если в конфиге боле провайдеров а не только гугл
const handler=NextAuth(authConfig)

export {handler as GET, handler as POST}