# EmailJS Setup Guide

## Environment Variables Required

The following environment variables need to be set in Netlify for EmailJS to work:

### For Contact Form:
1. `NEXT_PUBLIC_EMAILJS_SERVICE_ID` - Your EmailJS service ID (for contact form)
2. `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` - Your EmailJS template ID (for contact form)
3. `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` - Your EmailJS public key

### For Waitlist:
1. `NEXT_PUBLIC_EMAILJS_WAITLIST_TEMPLATE_ID` - Your EmailJS template ID for waitlist (optional, falls back to NEXT_PUBLIC_EMAILJS_TEMPLATE_ID)
2. `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` - Your EmailJS public key (same as contact form)

**Note:** The waitlist uses a dedicated service ID that's configured in the API route. See the API route file for the actual service ID.

## How to Set Up in Netlify

1. Go to your Netlify dashboard
2. Select your site (tabledadrian.com)
3. Go to **Site settings** > **Environment variables**
4. Click **Add variable** for each of the three variables above
5. Enter the variable name and value
6. Click **Save**
7. **Redeploy** your site for the changes to take effect

## Local Development

For local development, create a `.env.local` file in the `tabledadrian2.0` directory:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## EmailJS Template Setup

### For Waitlist Signups

Your EmailJS template should include these variables:
- `{{from_email}}` - User's email address
- `{{to_email}}` - Your recipient email address (set in template or use variable)
- `{{reply_to}}` - User's email address
- `{{subject}}` - Email subject
- `{{message}}` - Email message content
- `{{user_email}}` - User's email address

### For Contact Form

Your EmailJS template should include:
- `{{from_name}}` - User's name
- `{{from_email}}` - User's email address
- `{{phone}}` - User's phone number
- `{{event_date}}` - Event date
- `{{guests}}` - Number of guests
- `{{service_type}}` - Type of service
- `{{dietary}}` - Dietary requirements
- `{{message}}` - Additional message
- `{{to_email}}` - Your recipient email address
- `{{reply_to}}` - User's email address

## Testing

After setting up the environment variables:
1. Redeploy your site on Netlify
2. Test the waitlist form on `/app-download`
3. Test the contact form on the homepage
4. Check your configured email address for the notifications

