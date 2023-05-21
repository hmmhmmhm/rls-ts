import type { Database } from "./supabase";

declare global {
  const createPolicy: <TableName extends keyof Database["public"]["Tables"]>(
    param: (some: {
      row: Database["public"]["Tables"][TableName]["Row"];
      function: Record<keyof Database["public"]["Functions"], Function>;
      auth: {
        uid: () => string;
        jwt: () => JWT;
      };
      plv8: {
        execute<T>(sql: string, ...params: any[]): T;
      };
    }) => boolean
  ) => boolean;
}

export type JWT = {
  aud: string;
  exp: number;
  sub: string;
  email: string;
  app_metadata: {
    provider: string;
  };
  user_metadata: any;
  role: string;
} & Record<string, any>;
