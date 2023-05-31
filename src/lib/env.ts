import { z } from 'zod';

export interface IEnv {
  SPARK_RPC_URL: number;
}

const schema = z.object({
  SPARK_RPC_URL: z.string(),
});

export default schema.parse(process.env);
