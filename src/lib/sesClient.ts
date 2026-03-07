import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

let client: SESClient | null = null;

function getSESClient() {
  if (!client) {
    const region = process.env.AWS_SES_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error('Missing AWS SES environment variables');
    }

    client = new SESClient({
      region,
      credentials: { accessKeyId, secretAccessKey },
    });
  }
  return client;
}

export interface EnquiryEmailData {
  name: string;
  email: string;
  phone: string;
  message: string;
  enquiry_type: string;
}

const enquiryTypeLabels: Record<string, string> = {
  general: 'General Enquiry',
  sell: 'Sell Your Car',
  financing: 'Financing Options',
  warranty: 'Warranty Information',
  transport: 'Interstate Transport',
};

export async function sendEnquiryEmail(data: EnquiryEmailData): Promise<void> {
  const sesClient = getSESClient();
  const fromEmail = process.env.SES_FROM_EMAIL;
  const toEmail = process.env.SES_TO_EMAIL;

  if (!fromEmail || !toEmail) {
    throw new Error('Missing SES_FROM_EMAIL or SES_TO_EMAIL environment variables');
  }

  const typeLabel = enquiryTypeLabels[data.enquiry_type] || data.enquiry_type;

  const htmlBody = `
    <h2>New Enquiry from Australian Motors</h2>
    <hr />
    <h3>Enquiry Type: ${typeLabel}</h3>
    <h3>Contact Details</h3>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
    <hr />
    <h3>Message</h3>
    <p>${data.message}</p>
  `;

  const command = new SendEmailCommand({
    Source: fromEmail,
    Destination: {
      ToAddresses: [toEmail],
    },
    Message: {
      Subject: {
        Data: `New ${typeLabel} from ${data.name}`,
        Charset: 'UTF-8',
      },
      Body: {
        Html: {
          Data: htmlBody,
          Charset: 'UTF-8',
        },
      },
    },
  });

  await sesClient.send(command);
}
