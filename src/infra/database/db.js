import { PrismaClient } from "@prisma/client";
import { databaseConfig } from "../../config/configuration.js";

export const db = new PrismaClient({
    datasourceUrl: databaseConfig.databaseUrl,
})
