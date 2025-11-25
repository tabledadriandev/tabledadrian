# EmailJS Waitlist Template Setup

## Service Configuration
- **Service ID**: Configure this in your EmailJS dashboard and update the API route accordingly

## Template Variables

When creating your EmailJS template for the waitlist, use these template variables:

### Required Template Variables:
- `{{from_email}}` - The user's email address who signed up
- `{{to_email}}` - Recipient email address (configure in EmailJS template)
- `{{reply_to}}` - User's email address (for reply-to header)
- `{{subject}}` - Email subject line
- `{{message}}` - The email message content
- `{{user_email}}` - User's email address (same as from_email)

## Template Example

### Subject Line:
```
{{subject}}
```
Or hardcode it as: `New Waitlist Signup - Table d'Adrian Wellness App`

### Email Body Template:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #0F4C81;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .content {
      background-color: #FAF8F3;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .highlight {
      background-color: #D4C5B9;
      padding: 15px;
      border-radius: 5px;
      margin: 20px 0;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      color: #6B6560;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>New Waitlist Signup</h1>
  </div>
  
  <div class="content">
    <p>Hello,</p>
    
    <p>A new user has joined the waitlist for the <strong>Table d'Adrian Wellness App</strong>.</p>
    
    <div class="highlight">
      <strong>User Email:</strong> {{user_email}}
    </div>
    
    <p>{{message}}</p>
    
    <p>This user will be notified when the app launches.</p>
    
    <p>You can reply directly to this email to contact the user at: <a href="mailto:{{reply_to}}">{{reply_to}}</a></p>
  </div>
  
  <div class="footer">
    <p>Table d'Adrian Wellness App - Waitlist Management</p>
  </div>
</body>
</html>
```

## Simple Text Version (Alternative):

```
New Waitlist Signup - Table d'Adrian Wellness App

Hello,

A new user has joined the waitlist for the Table d'Adrian Wellness App.

User Email: {{user_email}}

{{message}}

This user will be notified when the app launches.

You can reply directly to this email to contact the user at: {{reply_to}}

---
Table d'Adrian Wellness App - Waitlist Management
```

## Template Settings in EmailJS

1. **To Email**: Set to your recipient email address (or use `{{to_email}}` variable)
2. **From Name**: "Table d'Adrian Waitlist" or "Table d'Adrian Wellness App"
3. **Reply To**: Use `{{reply_to}}` variable
4. **Subject**: Use `{{subject}}` or hardcode "New Waitlist Signup - Table d'Adrian Wellness App"

## Environment Variable

After creating the template in EmailJS, you'll get a Template ID. Add it to your environment variables:

**For Netlify:**
- `NEXT_PUBLIC_EMAILJS_WAITLIST_TEMPLATE_ID` = your_template_id_here

**Or use the existing template ID variable:**
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` = your_template_id_here

The code will check for `NEXT_PUBLIC_EMAILJS_WAITLIST_TEMPLATE_ID` first, then fall back to `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` if not set.

## Testing

After setting up the template:
1. Add the template ID to Netlify environment variables
2. Redeploy your site
3. Test the waitlist form on `/app-download`
4. Check your configured email address for the notification

