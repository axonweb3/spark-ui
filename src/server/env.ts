import { z } from 'zod';

export interface IEnv {
  NEXT_PUBLIC_SPARK_RPC_URL: number;
  NEXT_PROD_LOGGER_LEVEL?: string;
}

const schema = z.object({
  NEXT_PUBLIC_SPARK_RPC_URL: z.string(),
  NEXT_PROD_LOGGER_LEVEL: z.string().optional(),
});

export default schema.parse(process.env);
