import type { NextApiRequest, NextApiResponse } from 'next'
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../types/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const supabase = createServerSupabaseClient<Database>({
        req,
        res,
    })

    const { data: { attributes: { data: resBody } } } = req.body;

    // find paid payments in array 
    const paidPayments = resBody.attributes.payments.filter((payment: any) => payment.data.attributes.status === "paid");

    console.log(paidPayments[0].data)

    const { data, error } = await supabase.from('payments').upsert([{
        id: paidPayments[0].data.id,
        grossAmount: paidPayments[0].data.attributes.amount,
        netAmount: paidPayments[0].data.attributes.net_amount,
        fees: paidPayments[0].data.attributes.fee,
        source: paidPayments[0].data.attributes.source.type,
        billing: paidPayments[0].data.attributes.billing,
        reference_number: paidPayments[0].data.attributes.external_reference_number,
        link: resBody.id,
    }]).select();

    if (error) {
        return res.status(500).json({ message: error })
    }

    res.status(200).json(data)
}