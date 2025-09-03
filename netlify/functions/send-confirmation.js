const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // Parse the form data - handle both JSON and form-encoded data
        let formData;
        const contentType = event.headers['content-type'] || '';
        
        console.log('Content-Type:', contentType);
        console.log('Body type:', typeof event.body);
        console.log('Body preview:', event.body ? event.body.substring(0, 100) : 'empty');
        
        if (contentType.includes('application/json')) {
            // Handle JSON data (from JavaScript fetch)
            try {
                formData = JSON.parse(event.body);
            } catch (parseError) {
                console.error('JSON parse error:', parseError);
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: 'Invalid JSON data' })
                };
            }
        } else {
            // Handle form-encoded data (from HTML form submission)
            const params = new URLSearchParams(event.body);
            formData = {
                email: params.get('email'),
                'form-name': params.get('form-name')
            };
        }
        
        const { email, 'form-name': formName } = formData;

        // Validate email
        if (!email || !isValidEmail(email)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Valid email is required' })
            };
        }

        // Send email via Brevo
        const emailResult = await sendWelcomeEmail(email, formName);

        if (emailResult.success) {
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS'
                },
                body: JSON.stringify({ 
                    message: 'Welcome email sent successfully!',
                    email: email
                })
            };
        } else {
            throw new Error(emailResult.error);
        }

    } catch (error) {
        console.error('Error in send-confirmation function:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                error: 'Failed to send welcome email',
                details: error.message
            })
        };
    }
};

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Send welcome email via Brevo API
async function sendWelcomeEmail(email, formName) {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    
    if (!BREVO_API_KEY) {
        throw new Error('Brevo API key not configured');
    }

    const emailContent = getWelcomeEmailContent(formName);

    const emailData = {
        sender: {
            name: "Team Sellmo",
            email: "hello@justsellmo.com"
        },
        to: [
            {
                email: email,
                name: email.split('@')[0] // Use email prefix as name
            }
        ],
        subject: "Welcome to Sellmo Beta! 🚀",
        htmlContent: emailContent.html,
        textContent: emailContent.text,
        tags: ["beta-signup", "welcome"]
    };

    try {
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': BREVO_API_KEY
            },
            body: JSON.stringify(emailData)
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Email sent successfully:', result);
            return { success: true, messageId: result.messageId };
        } else {
            console.error('Brevo API error:', result);
            return { success: false, error: result.message || 'Failed to send email' };
        }

    } catch (error) {
        console.error('Network error calling Brevo API:', error);
        return { success: false, error: 'Network error: ' + error.message };
    }
}

// Generate welcome email content
function getWelcomeEmailContent(formName) {
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Sellmo Beta</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #6366f1; font-size: 28px; margin-bottom: 10px;">Welcome to Sellmo! 🎉</h1>
                <p style="color: #666; font-size: 16px;">You're now part of our exclusive beta community</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
                <h2 style="color: #22223b; margin-bottom: 15px;">What happens next?</h2>
                <ul style="color: #555; padding-left: 20px;">
                    <li style="margin-bottom: 8px;">We'll notify you as soon as the beta launches</li>
                    <li style="margin-bottom: 8px;">You'll get early access to all new features</li>
                    <li style="margin-bottom: 8px;">Exclusive rewards and special pricing for beta users</li>
                    <li style="margin-bottom: 8px;">Direct feedback channel to help shape Sellmo</li>
                </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
                    <strong>Expected launch:</strong> Q1 2025
                </p>
                <p style="color: #888; font-size: 13px;">
                    Questions? Just reply to this email - we read every message!
                </p>
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
                <p style="color: #999; font-size: 12px; margin: 0;">
                    © 2025 Sellmo. Built with ❤️ for sellers everywhere.
                </p>
            </div>
        </body>
        </html>
    `;

    const textContent = `
Welcome to Sellmo! 🎉

You're now part of our exclusive beta community.

WHAT HAPPENS NEXT?
• We'll notify you as soon as the beta launches
• You'll get early access to all new features  
• Exclusive rewards and special pricing for beta users
• Direct feedback channel to help shape Sellmo

Expected launch: Q1 2025

Questions? Just reply to this email - we read every message!

© 2025 Sellmo. Built with ❤️ for sellers everywhere.
    `;

    return { html: htmlContent, text: textContent };
}
  