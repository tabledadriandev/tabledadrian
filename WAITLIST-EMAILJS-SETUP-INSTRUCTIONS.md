# EmailJS Waitlist Template Setup Instructions

## Step-by-Step Guide

### 1. Create New Template in EmailJS

1. Go to your EmailJS dashboard: https://dashboard.emailjs.com/
2. Navigate to **Email Templates** in the left sidebar
3. Click **Create New Template**
4. Select the service: **[Your Waitlist Service ID]** (configure this in your EmailJS dashboard)

### 2. Template Settings

**Template Name:** `Waitlist Signup Notification`

**To Email:** `your-email@example.com` (configure with your actual email address)

**From Name:** `Table d'Adrian Waitlist`

**Reply To:** `{{reply_to}}`

**Subject:** `New Waitlist Signup - Table d'Adrian Wellness App`

### 3. Email Content

Copy and paste the HTML content from `WAITLIST-EMAIL-TEMPLATE.html` into the EmailJS template editor.

**OR** use the simplified version below:

---

## Simplified HTML Template (Copy this into EmailJS):

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0F4C81 0%, #1A2332 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                🎉 New Waitlist Signup
              </h1>
              <p style="margin: 10px 0 0 0; color: #D4C5B9; font-size: 16px;">
                Table d'Adrian Wellness App
              </p>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px; background-color: #FAF8F3;">
              <p style="margin: 0 0 20px 0; color: #2B2520; font-size: 16px; line-height: 1.6;">
                Hello Adrian,
              </p>
              
              <p style="margin: 0 0 20px 0; color: #2B2520; font-size: 16px; line-height: 1.6;">
                Great news! Someone has joined the waitlist for the <strong style="color: #0F4C81;">Table d'Adrian Wellness App</strong>.
              </p>
              
              <!-- User Email Highlight Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0; background-color: #ffffff; border-left: 4px solid #0F4C81; border-radius: 8px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 8px 0; color: #6B6560; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      User Email Address
                    </p>
                    <p style="margin: 0; color: #0F4C81; font-size: 18px; font-weight: bold; word-break: break-all;">
                      {{user_email}}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Details Section -->
              <div style="background-color: #ffffff; border-radius: 8px; padding: 25px; margin: 25px 0; border: 1px solid #E8E3DC;">
                <p style="margin: 0 0 15px 0; color: #2B2520; font-size: 15px; font-weight: 600;">
                  📋 Signup Details:
                </p>
                <p style="margin: 0; color: #6B6560; font-size: 14px; line-height: 1.8;">
                  {{message}}
                </p>
              </div>
              
              <p style="margin: 25px 0 20px 0; color: #2B2520; font-size: 16px; line-height: 1.6;">
                This user will be automatically notified when the app launches. You can reach out to them directly by replying to this email.
              </p>
              
              <!-- Action Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 30px 0;">
                <tr>
                  <td align="center" style="background: linear-gradient(135deg, #0F4C81 0%, #1A2332 100%); border-radius: 8px;">
                    <a href="mailto:{{reply_to}}?subject=Re: Welcome to Table d'Adrian Wellness App Waitlist" style="display: inline-block; padding: 14px 30px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px;">
                      Reply to User
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 20px 0 0 0; color: #8B8580; font-size: 14px; line-height: 1.6;">
                <strong>Note:</strong> This is an automated notification from your website's waitlist system. The user's email address is: <a href="mailto:{{reply_to}}" style="color: #0F4C81; text-decoration: none;">{{reply_to}}</a>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #2B2520; padding: 30px; text-align: center;">
              <p style="margin: 0 0 10px 0; color: #D4C5B9; font-size: 14px; font-weight: 600;">
                Table d'Adrian
              </p>
              <p style="margin: 0 0 10px 0; color: #8B8580; font-size: 12px;">
                Luxury Private Chef Services | Wellness App
              </p>
              <p style="margin: 0; color: #6B6560; font-size: 11px;">
                This email was sent from your website's waitlist system.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

### 4. Template Variables to Use

Make sure these variables are in your template:
- `{{user_email}}` - The user's email address
- `{{from_email}}` - Same as user_email
- `{{reply_to}}` - User's email (for reply-to header)
- `{{to_email}}` - Your recipient email address (configure in EmailJS template)
- `{{subject}}` - Email subject
- `{{message}}` - The message content

### 5. Save and Get Template ID

1. Click **Save** in EmailJS
2. Copy the **Template ID** (it will look like `template_xxxxxxx`)

### 6. Add to Netlify

1. Go to Netlify Dashboard
2. Site Settings > Environment Variables
3. Add: `NEXT_PUBLIC_EMAILJS_WAITLIST_TEMPLATE_ID` = `your_template_id_here`
4. Save and redeploy

### 7. Test

1. Go to `/app-download` on your website
2. Click "Join the Waitlist"
3. Enter an email address
4. Submit
5. Check your configured email address for the notification

---

## Email Preview

The email will look like this:

**Header (Blue gradient):**
- 🎉 New Waitlist Signup
- Table d'Adrian Wellness App

**Content (Beige background):**
- Greeting: "Hello Adrian,"
- Message about new signup
- Highlighted box with user's email
- Details section with the message
- Reply button
- Footer with branding

**Colors Used:**
- Primary Blue: #0F4C81
- Dark Blue: #1A2332
- Beige Background: #FAF8F3
- Text Primary: #2B2520
- Text Secondary: #6B6560

