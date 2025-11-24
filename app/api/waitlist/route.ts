import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    // Check if EmailJS is configured
    // Use specific waitlist service ID
    const serviceId = 'service_8lfr95s';
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_WAITLIST_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!templateId || !publicKey) {
      console.error('EmailJS environment variables are not configured');
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    // Prepare template parameters for waitlist
    const templateParams = {
      from_email: email,
      to_email: 'badea.adrian.stefan1@gmail.com',
      reply_to: email,
      subject: 'New Waitlist Signup - Table d\'Adrian Wellness App',
      message: `A new user has joined the waitlist for the Table d'Adrian Wellness App.\n\nEmail: ${email}\n\nThey will be notified when the app launches.`,
      user_email: email,
    };

    // Send email using EmailJS REST API
    const emailjsApiUrl = `https://api.emailjs.com/api/v1.0/email/send`;
    
    const emailjsPayload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: templateParams,
    };

    const emailjsResponse = await fetch(emailjsApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailjsPayload),
    });

    if (!emailjsResponse.ok) {
      const errorText = await emailjsResponse.text();
      console.error('EmailJS API error:', errorText);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Thank you! You\'ve been added to the waitlist. We\'ll notify you when the app launches.' 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error processing waitlist signup:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}

// Handle GET requests (optional - for health check)
export async function GET() {
  return NextResponse.json(
    { 
      message: 'Waitlist API is running',
      endpoint: '/api/waitlist',
      method: 'POST',
      requiredFields: ['email']
    },
    { status: 200 }
  );
}

