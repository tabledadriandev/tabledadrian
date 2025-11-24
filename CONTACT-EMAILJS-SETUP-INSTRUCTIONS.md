# EmailJS Contact Form Template Setup Instructions

## Step-by-Step Guide

### 1. Create New Template in EmailJS

1. Go to your EmailJS dashboard: https://dashboard.emailjs.com/
2. Navigate to **Email Templates** in the left sidebar
3. Click **Create New Template**
4. Select your contact form service (the one from lines 1-2 in your .env.local)

### 2. Template Settings

**Template Name:** `Contact Form - Booking Inquiry`

**To Email:** `adrian@tabledadrian.com`

**From Name:** `Table d'Adrian Contact Form`

**Reply To:** `{{from_email}}`

**Subject:** `New Booking Inquiry - Table d'Adrian`

### 3. Email Content

Copy and paste the HTML content from `CONTACT-EMAIL-TEMPLATE.html` into the EmailJS template editor.

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
                📋 New Booking Inquiry
              </h1>
              <p style="margin: 10px 0 0 0; color: #D4C5B9; font-size: 16px;">
                Table d'Adrian - Luxury Private Chef Services
              </p>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px; background-color: #FAF8F3;">
              <p style="margin: 0 0 20px 0; color: #2B2520; font-size: 16px; line-height: 1.6;">
                Hello Adrian,
              </p>
              
              <p style="margin: 0 0 30px 0; color: #2B2520; font-size: 16px; line-height: 1.6;">
                You have received a new booking inquiry through your website. Here are the details:
              </p>
              
              <!-- Contact Information Card -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 25px 0; background-color: #ffffff; border-radius: 8px; border: 1px solid #E8E3DC;">
                <tr>
                  <td style="padding: 25px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 0 0 15px 0; border-bottom: 1px solid #E8E3DC;">
                          <p style="margin: 0 0 8px 0; color: #6B6560; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                            👤 Name
                          </p>
                          <p style="margin: 0; color: #0F4C81; font-size: 18px; font-weight: bold;">
                            {{from_name}}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 15px 0; border-bottom: 1px solid #E8E3DC;">
                          <p style="margin: 0 0 8px 0; color: #6B6560; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                            ✉️ Email
                          </p>
                          <p style="margin: 0; color: #2B2520; font-size: 16px; word-break: break-all;">
                            <a href="mailto:{{from_email}}" style="color: #0F4C81; text-decoration: none;">{{from_email}}</a>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 15px 0; border-bottom: 1px solid #E8E3DC;">
                          <p style="margin: 0 0 8px 0; color: #6B6560; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                            📞 Phone
                          </p>
                          <p style="margin: 0; color: #2B2520; font-size: 16px;">
                            {{phone}}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Event Details Card -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 25px 0; background-color: #ffffff; border-radius: 8px; border: 1px solid #E8E3DC;">
                <tr>
                  <td style="padding: 25px;">
                    <p style="margin: 0 0 20px 0; color: #2B2520; font-size: 16px; font-weight: 600; border-bottom: 2px solid #0F4C81; padding-bottom: 10px;">
                      📅 Event Details
                    </p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 0 0 15px 0; width: 50%;">
                          <p style="margin: 0 0 5px 0; color: #6B6560; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                            📆 Event Date
                          </p>
                          <p style="margin: 0; color: #2B2520; font-size: 15px; font-weight: 500;">
                            {{event_date}}
                          </p>
                        </td>
                        <td style="padding: 0 0 15px 0; width: 50%;">
                          <p style="margin: 0 0 5px 0; color: #6B6560; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                            👥 Number of Guests
                          </p>
                          <p style="margin: 0; color: #2B2520; font-size: 15px; font-weight: 500;">
                            {{guests}}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding: 15px 0 0 0; border-top: 1px solid #E8E3DC;">
                          <p style="margin: 0 0 5px 0; color: #6B6560; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                            🍽️ Service Type
                          </p>
                          <p style="margin: 0; color: #0F4C81; font-size: 16px; font-weight: 600;">
                            {{service_type}}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Dietary Requirements Card -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 25px 0; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #D4C5B9;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 8px 0; color: #6B6560; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      🥗 Dietary Requirements
                    </p>
                    <p style="margin: 0; color: #2B2520; font-size: 15px; line-height: 1.6;">
                      {{dietary}}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Additional Information Card -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 30px 0; background-color: #ffffff; border-radius: 8px; border: 1px solid #E8E3DC;">
                <tr>
                  <td style="padding: 25px;">
                    <p style="margin: 0 0 15px 0; color: #2B2520; font-size: 15px; font-weight: 600; border-bottom: 2px solid #0F4C81; padding-bottom: 10px;">
                      💬 Additional Information
                    </p>
                    <p style="margin: 0; color: #6B6560; font-size: 14px; line-height: 1.8; white-space: pre-wrap;">
                      {{message}}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Action Buttons -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
                <tr>
                  <td align="center" style="padding: 0 10px 0 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td align="center" style="background: linear-gradient(135deg, #0F4C81 0%, #1A2332 100%); border-radius: 8px;">
                          <a href="mailto:{{from_email}}?subject=Re: Booking Inquiry - Table d'Adrian" style="display: inline-block; padding: 14px 30px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px;">
                            Reply to Client
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="center" style="padding: 0 0 0 10px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td align="center" style="background-color: #ffffff; border: 2px solid #0F4C81; border-radius: 8px;">
                          <a href="tel:{{phone}}" style="display: inline-block; padding: 12px 28px; color: #0F4C81; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px;">
                            📞 Call Client
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 20px 0 0 0; color: #8B8580; font-size: 14px; line-height: 1.6; padding-top: 20px; border-top: 1px solid #E8E3DC;">
                <strong>Note:</strong> This is an automated notification from your website's contact form. You can reply directly to this email to contact the client at: <a href="mailto:{{from_email}}" style="color: #0F4C81; text-decoration: none;">{{from_email}}</a>
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
                Luxury Private Chef Services | Personal Chef London
              </p>
              <p style="margin: 0; color: #6B6560; font-size: 11px;">
                This email was sent from your website's contact form system.
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
- `{{from_name}}` - Client's name
- `{{from_email}}` - Client's email address
- `{{phone}}` - Client's phone number
- `{{event_date}}` - Event date
- `{{guests}}` - Number of guests
- `{{service_type}}` - Type of service (Private Event, Meal Prep, etc.)
- `{{dietary}}` - Dietary requirements
- `{{message}}` - Additional message from client
- `{{to_email}}` - adrian@tabledadrian.com
- `{{reply_to}}` - Client's email (same as from_email)

### 5. Save and Get Template ID

1. Click **Save** in EmailJS
2. Copy the **Template ID** (it will look like `template_xxxxxxx`)

### 6. Add to .env.local

Add the template ID to your `.env.local` file (lines 1-2 for contact form):

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_contact_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_contact_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_WAITLIST_TEMPLATE_ID=your_waitlist_template_id
```

### 7. Add to Netlify

1. Go to Netlify Dashboard
2. Site Settings > Environment Variables
3. Add all the variables from your .env.local:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID` (for contact form)
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` (for contact form)
   - `NEXT_PUBLIC_EMAILJS_WAITLIST_TEMPLATE_ID` (for waitlist)
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` (shared for both)
4. Save and redeploy

### 8. Test

1. Go to your homepage
2. Fill out the contact form
3. Submit
4. Check `adrian@tabledadrian.com` for the notification

---

## Email Preview

The email will look like this:

**Header (Blue gradient):**
- 📋 New Booking Inquiry
- Table d'Adrian - Luxury Private Chef Services

**Content (Beige background):**
- Greeting: "Hello Adrian,"
- Contact Information Card with Name, Email, Phone
- Event Details Card with Date, Guests, Service Type
- Dietary Requirements Card
- Additional Information Card
- Action buttons: "Reply to Client" and "Call Client"
- Footer with branding

**Colors Used:**
- Primary Blue: #0F4C81
- Dark Blue: #1A2332
- Beige Background: #FAF8F3
- Text Primary: #2B2520
- Text Secondary: #6B6560

