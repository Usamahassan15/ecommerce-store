import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Image as IImage } from 'sanity';
import { urlForImage } from '../../../../sanity/lib/image';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

type CartProduct = {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  image: IImage;
};

export async function POST(req: Request) {
  //const body = await req.json();

  let cartData: CartProduct[] = [];
  let billedItems: {
    price_data: {
      currency: string;
      product_data: { name: string; images: string[] };
      unit_amount: number;
    };
    quantity: number;
    adjustable_quantity: { enabled: boolean; minimum: number; maximum: number };
  }[] = [];

  const data = await req
    .json()
    .then((response) => {
      cartData = response;

      cartData.map((item) => {
        const transformedItem = {
          price_data: {
            currency: 'usd',
            //product: item._id,
            product_data: {
              //id: item._id,
              name: item.title,
              images: [urlForImage(item.image).url()],
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 10,
          },
        };
        billedItems.push(transformedItem);
      });
      const redirectURL =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/'
          : 'https://marketplace-woad-five.vercel.app/';

      const session = stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: billedItems,
        mode: 'payment',
        billing_address_collection: 'auto',
        invoice_creation: {
          enabled: true,
        },
        success_url: redirectURL + '/payment/success',
        cancel_url: redirectURL + '/payment/fail',
        metadata: {
          name: 'some additional info',
          task: 'created a task',
        },
      });

      const data = session
        .then((sessionData: Stripe.Response<Stripe.Checkout.Session>) => {
         console.log('sessionData: ', sessionData);

          return sessionData.url;
        })
        .catch((error) => {
          console.log('sessionData-error:', error);
          return null;
        });

      return data;
    })
    .catch((error) => {
      console.log('error: ', error);
      return NextResponse.error();
    });

    console.log('url:', data);

  return NextResponse.json({ data });
}