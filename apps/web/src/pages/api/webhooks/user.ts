import type { UserJSON, WebhookEvent } from '@clerk/nextjs/server';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Webhook } from 'svix';
import graphqlRequest from '../../../axios';
import type { Account } from '../../../modules/accounts/accounts.entity';
import { CREATE_ACCOUNT_QUERY } from '../../../modules/accounts/graphql/create-account.mutation';
import { GET_ACCOUNT_QUERY } from '../../../modules/accounts/graphql/get-acoount.query';

export interface SignInUpFormData {
  email: string;
  firstName: string;
  lastName: string;
}

function getHeaderIgnoreCase(
  req: NextApiRequest,
  headerName: string,
): string | undefined {
  const lowerCaseHeaderName = headerName.toLowerCase();
  const headerKeys = Object.keys(req.headers);
  const foundKey = headerKeys.find(
    (key) => key.toLowerCase() === lowerCaseHeaderName,
  );
  return foundKey ? (req.headers[foundKey] as string) : undefined;
}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  req.headers;

  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local',
    );
  }

  const svix_id = getHeaderIgnoreCase(req, 'svix-id');
  const svix_timestamp = getHeaderIgnoreCase(req, 'svix-timestamp');
  const svix_signature = getHeaderIgnoreCase(req, 'svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.body;
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400,
    });
  }

  // Process the event
  const {
    id,
    first_name,
    last_name,
    email_addresses,
    primary_email_address_id,
  } = evt.data as UserJSON;
  const eventType = evt.type;

  const primaryEmail = email_addresses?.find(
    (address) => address.id === primary_email_address_id,
  );

  if (eventType === 'user.created' && primaryEmail) {
    const account = await graphqlRequest<
      { email: string },
      { getAccount: Account | null }
    >(GET_ACCOUNT_QUERY, {
      email: primaryEmail.email_address,
    });

    if (!account?.getAccount?.id && first_name && last_name) {
      const newAccount = await graphqlRequest<
        { data: SignInUpFormData },
        { createAccount: Account }
      >(CREATE_ACCOUNT_QUERY, {
        data: {
          email: primaryEmail.email_address,
          firstName: first_name,
          lastName: last_name,
        },
      });

      console.log(
        `Account was created at ${newAccount?.createAccount?.created}`,
      );
    } else {
      console.log(
        `Account was already created at ${account?.getAccount?.created}`,
      );
    }
  }

  res.status(400).json({});
}
