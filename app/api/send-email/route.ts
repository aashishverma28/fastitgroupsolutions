import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, company, service } = await request.json()

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields: name and email" }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("RESEND_API_KEY is not defined in environment variables.")
      return NextResponse.json({ error: "Email provider is not configured" }, { status: 500 })
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || "Fastit Group <team@fastitgroup.in>"

    // Premium designed HTML template matching Fastit's aesthetic
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Thank You - Fastit Group</title>
        <style>
          body {
            background-color: #050505;
            color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #0c0c0c;
            border: 1px solid #1a1a1a;
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
          }
          .logo {
            font-size: 24px;
            font-weight: 900;
            letter-spacing: -1px;
            text-transform: uppercase;
            color: #ffffff;
            margin-bottom: 30px;
          }
          .logo span {
            color: #E8156D;
          }
          h1 {
            font-size: 28px;
            font-weight: 800;
            letter-spacing: -0.5px;
            text-transform: uppercase;
            margin-bottom: 20px;
            color: #ffffff;
            line-height: 1.2;
          }
          p {
            color: #a0a0a0;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 24px;
          }
          .details {
            background-color: #121212;
            border: 1px solid #1f1f1f;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 30px;
          }
          .details-title {
            font-size: 11px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #E8156D;
            margin-bottom: 15px;
          }
          .detail-item {
            margin-bottom: 12px;
            font-size: 14px;
            line-height: 1.4;
          }
          .detail-item:last-child {
            margin-bottom: 0;
          }
          .detail-label {
            color: #606060;
            text-transform: uppercase;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 1px;
            display: inline-block;
            width: 120px;
          }
          .detail-value {
            color: #ffffff;
            font-weight: 600;
          }
          .footer {
            border-top: 1px solid #1a1a1a;
            padding-top: 20px;
            margin-top: 40px;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #404040;
            text-align: center;
          }
          .accent {
            color: #FFD93D;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">Fastit<span>.</span></div>
          <h1>Let's build something <span class="accent">remarkable.</span></h1>
          <p>Hi ${name},</p>
          <p>Thank you for initiating the conversation. We have successfully received your inquiry and queued it in our Command Intelligence portal. Our architects are already analyzing your requirements and will reach out shortly.</p>
          
          <div class="details">
            <div class="details-title">Transmission Details</div>
            <div class="detail-item">
              <span class="detail-label">Client Name:</span>
              <span class="detail-value">${name}</span>
            </div>
            ${company ? `
            <div class="detail-item">
              <span class="detail-label">Company:</span>
              <span class="detail-value">${company}</span>
            </div>
            ` : ''}
            ${service ? `
            <div class="detail-item">
              <span class="detail-label">Service:</span>
              <span class="detail-value">${service}</span>
            </div>
            ` : ''}
            <div class="detail-item">
              <span class="detail-label">Email Address:</span>
              <span class="detail-value">${email}</span>
            </div>
          </div>
          
          <p>If you need to make any changes or append further requirements, feel free to reply directly to this transmission or contact hello@fastitgroup.in.</p>
          
          <div class="footer">
            &copy; ${new Date().getFullYear()} Fastit Group. Forged for humans.
          </div>
        </div>
      </body>
      </html>
    `

    // Call Resend REST API to deliver email
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [email],
        subject: "We received your inquiry - Fastit Group",
        html: htmlContent
      })
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error("Resend API Error details:", errorText)
      throw new Error(`Resend API failed with status ${res.status}: ${errorText}`)
    }

    const resData = await res.json()
    return NextResponse.json({ success: true, id: resData.id })
  } catch (err: any) {
    console.error("Error inside send-email route:", err)
    return NextResponse.json({ error: err.message || "Failed to dispatch email" }, { status: 500 })
  }
}