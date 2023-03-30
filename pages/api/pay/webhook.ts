import type { NextApiRequest, NextApiResponse } from 'next'
import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "../../../types/supabase";

export default async function  handler(req: NextApiRequest, res: NextApiResponse) {

    const supabase = createServerSupabaseClient<Database>({
        req,
        res,
    })

    const { data:{attributes:{data : resBody}}} = req.body;

    const { data, error } = await supabase.from('links').upsert([{
        id: resBody.id,
        type: resBody.type,
        attributes: resBody.attributes,
    }]).select();

    if(error) {
        return res.status(500).json({message: error})
    }

    res.status(200).json(data)
}