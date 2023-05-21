export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {};
    Views: {
      [_ in never]: never;
    };
    Functions: {};
    Enums: {};
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
