export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      links: {
        Row: {
          attributes: Json | null
          created_at: string | null
          id: string
          type: string | null
        }
        Insert: {
          attributes?: Json | null
          created_at?: string | null
          id: string
          type?: string | null
        }
        Update: {
          attributes?: Json | null
          created_at?: string | null
          id?: string
          type?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
