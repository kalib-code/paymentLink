import {Database} from "./supabase";

export interface ILink {
    row: Database['public']['Tables']['links']['Row'];
    insert: Database['public']['Tables']['links']['Insert'];
    update: Database['public']['Tables']['links']['Update'];
}
