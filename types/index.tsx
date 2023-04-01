import { types } from "util";
import {Database} from "./supabase";

export interface ILink {
    row: Database['public']['Tables']['links']['Row'];
    insert: Database['public']['Tables']['links']['Insert'];
    update: Database['public']['Tables']['links']['Update'];
}

// export ts types for use in other files
export type ILinkRow = Database['public']['Tables']['links']['Row'] ;
export type ILinkInsert = Database['public']['Tables']['links']['Insert'] ;
export type ILinkUpdate = Database['public']['Tables']['links']['Update'] ;

export type IPaymentRow = Database['public']['Tables']['payments']['Row'] ;
export type IPaymentInsert = Database['public']['Tables']['payments']['Insert'] ;
export type IPaymentUpdate = Database['public']['Tables']['payments']['Update'] ;