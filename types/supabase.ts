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
      payments: {
        Row: {
          billing: Json | null
          created_at: string | null
          fees: string | null
          grossAmount: string | null
          id: string
          link: string | null
          netAmount: string | null
          paid: string | null
          reference_number: string | null
          source: string | null
        }
        Insert: {
          billing?: Json | null
          created_at?: string | null
          fees?: string | null
          grossAmount?: string | null
          id: string
          link?: string | null
          netAmount?: string | null
          paid?: string | null
          reference_number?: string | null
          source?: string | null
        }
        Update: {
          billing?: Json | null
          created_at?: string | null
          fees?: string | null
          grossAmount?: string | null
          id?: string
          link?: string | null
          netAmount?: string | null
          paid?: string | null
          reference_number?: string | null
          source?: string | null
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
