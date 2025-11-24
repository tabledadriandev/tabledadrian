import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      date,
      guests,
      service,
      dietary,
      message,
    } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Check if EmailJS is configured
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS environment variables are not configured');
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    // Format service type for display
    const serviceTypes: { [key: string]: string } = {
      'private-event': 'Private Event / Dinner Party',
      'meal-prep': 'Weekly Meal Preparation',
      'corporate': 'Corporate Event',
      'special-occasion': 'Special Occasion',
    };

    const serviceTypeDisplay = serviceTypes[service] || service;

    // Prepare template parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      phone: phone || 'Not provided',
      event_date: date || 'Not specified',
      guests: guests || 'Not specified',
      service_type: serviceTypeDisplay,
      dietary: dietary || 'None',
      message: message || 'No additional information',
      to_email: 'adrian@tabledadrian.com',
      reply_to: email,
    };

    // Send email using EmailJS
    // Note: EmailJS browser SDK doesn't work server-side, so we'll use fetch to their API
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
        message: 'Your inquiry has been sent successfully. We will get back to you shortly.' 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error processing contact form:', error);
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
      message: 'Contact API is running',
      endpoint: '/api/contact',
      method: 'POST',
      requiredFields: ['name', 'email'],
      optionalFields: ['phone', 'date', 'guests', 'service', 'dietary', 'message']
    },
    { status: 200 }
  );
}

