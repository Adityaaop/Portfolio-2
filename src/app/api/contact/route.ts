import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    const trimmedName = (name || "").trim();
    const trimmedEmail = (email || "").trim();
    const trimmedSubject = (subject || "").trim();
    const trimmedMessage = (message || "").trim();

    // 1. Server-side Validation
    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      return NextResponse.json({
        success: false,
        message: "All fields are required."
      }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json({
        success: false,
        message: "Please enter a valid email address."
      }, { status: 400 });
    }

    if (trimmedName.length > 50) {
      return NextResponse.json({
        success: false,
        message: "Name must not exceed 50 characters."
      }, { status: 400 });
    }

    if (trimmedSubject.length > 100) {
      return NextResponse.json({
        success: false,
        message: "Subject must not exceed 100 characters."
      }, { status: 400 });
    }

    if (trimmedMessage.length > 2000) {
      return NextResponse.json({
        success: false,
        message: "Message must not exceed 2000 characters."
      }, { status: 400 });
    }

    // 2. Priority 1: Web3Forms (simplest & zero-domain requirement)
    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY || "";
    if (web3formsKey && web3formsKey !== "your_web3forms_access_key_here") {
      const web3Res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          name: trimmedName,
          email: trimmedEmail,
          subject: `[Portfolio Contact] ${trimmedSubject}`,
          message: trimmedMessage,
          from_name: `${trimmedName} (Portfolio Contact)`
        })
      });

      const web3Data = await web3Res.json();

      if (!web3Data.success) {
        console.error("Web3Forms error response:", web3Data);
        return NextResponse.json({
          success: false,
          message: web3Data.message || "Failed to send message via Web3Forms."
        }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: "Message sent successfully! Aditya will get back to you shortly."
      }, { status: 200 });
    }

    // 3. Priority 2: Resend (if configured)
    const resendApiKey = process.env.RESEND_API_KEY || "";
    const toEmail = process.env.RESEND_TO_EMAIL || "";

    if (resendApiKey && resendApiKey !== "re_your_api_key_here" && toEmail && toEmail !== "your_receive_email_here@gmail.com") {
      const resend = new Resend(resendApiKey);

      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Portfolio Message</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 20px; background-color: #fafafa; }
              .container { max-width: 600px; margin: 20px auto; background: #ffffff; border: 1px solid #eef0f2; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
              h2 { color: #0f0f0f; margin-top: 0; border-bottom: 1px solid #eaeaea; padding-bottom: 12px; font-size: 20px; font-weight: 700; letter-spacing: -0.5px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: 700; font-size: 11px; text-transform: uppercase; color: #888888; margin-bottom: 6px; letter-spacing: 0.5px; }
              .value { font-size: 15px; color: #2d2d2d; }
              .message-box { background: #f8f9fa; border-left: 4px solid #1a1a1a; padding: 16px; border-radius: 6px; font-style: italic; white-space: pre-wrap; font-size: 14px; color: #333333; line-height: 1.5; }
              .footer { font-size: 11px; color: #aaaaaa; text-align: center; margin-top: 30px; border-top: 1px solid #eaeaea; padding-top: 15px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>New Contact Form Message</h2>
              
              <div class="field">
                <div class="label">Sender Name</div>
                <div class="value">${trimmedName}</div>
              </div>
              
              <div class="field">
                <div class="label">Sender Email</div>
                <div class="value"><a href="mailto:${trimmedEmail}">${trimmedEmail}</a></div>
              </div>
              
              <div class="field">
                <div class="label">Subject</div>
                <div class="value">${trimmedSubject}</div>
              </div>
              
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${trimmedMessage}</div>
              </div>
              
              <div class="footer">
                This message was generated dynamically from your Portfolio Contact Form.
              </div>
            </div>
          </body>
        </html>
      `;

      const { error } = await resend.emails.send({
        from: "Portfolio Contact Form <onboarding@resend.dev>",
        to: toEmail,
        subject: `[Portfolio Contact] ${trimmedSubject}`,
        replyTo: trimmedEmail,
        html: htmlContent,
      });

      if (error) {
        console.error("Resend API Error details:", error);
        return NextResponse.json({
          success: false,
          message: error.message || "Failed to send email."
        }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: "Message sent successfully! Aditya will get back to you shortly."
      }, { status: 200 });
    }

    // 4. Graceful Fallback if neither Web3Forms nor Resend is set
    console.warn("No active email service key configured. Simulating dispatch.");
    return NextResponse.json({
      success: true,
      message: "Message simulation successful! (Set WEB3FORMS_ACCESS_KEY in .env.local to receive live emails)."
    }, { status: 200 });

  } catch (error: any) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong while processing your message."
    }, { status: 500 });
  }
}
