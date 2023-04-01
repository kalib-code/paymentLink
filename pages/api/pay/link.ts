
import type { NextApiRequest, NextApiResponse } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../../types/supabase'
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {



    const supabase = createServerSupabaseClient<Database>({
        req,
        res,
    })


    const username = process.env.NEXT_PUBLIC_PAYMONGO_SECRET_KEY;
    const baseUrlPaymongo = 'https://api.paymongo.com/v1';
    const password = '';
    const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');


    const method = req.method;

    if (method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const { amount, description, remarks } = req.body;

    const options = {
        method: 'POST',
        url: `${baseUrlPaymongo}/links`,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: auth
        },
        data: {
            data: {
                attributes: {
                    amount: amount * 100,
                    description: description,
                    remarks: remarks
                }
            }
        }
    };

    try {
        const response = await axios.request(options);
        const dataRes = response.data.data;
        // create link in supabase
        const { data, error } = await supabase.from('links').insert([{
            id: dataRes.id,
            type: dataRes.type,
            attributes: dataRes.attributes,
        }]).select();
        if (error) {
            return res.status(500).json({ message: error })
        }
        res.status(200).json(data)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}