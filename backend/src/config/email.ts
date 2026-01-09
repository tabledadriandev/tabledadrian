import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
}

let emailTransporter: nodemailer.Transporter | null = null;
let sendGridConfigured = false;

export function initializeEmail() {
  if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sendGridConfigured = true;
    return;
  }

  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    emailTransporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
}

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text?: string
): Promise<boolean> {
  try {
    if (sendGridConfigured) {
      await sgMail.send({
        to,
        from: process.env.EMAIL_USER || 'noreply@tabledadrian.com',
        subject,
        text: text || html.replace(/<[^>]*>/g, ''),
        html,
      });
      return true;
    }

    if (emailTransporter) {
      await emailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: text || html.replace(/<[^>]*>/g, ''),
        html,
      });
      return true;
    }

    console.warn('Email not configured. Email would be sent to:', to);
    return false;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
}

initializeEmail();
