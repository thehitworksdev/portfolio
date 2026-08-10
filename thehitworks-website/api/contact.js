export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const {
      name,
      email,
      countryCode,
      phone,
      service,
      message,
    } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required.",
      });
    }

    if (!process.env.ZEPTOMAIL_TOKEN) {
      throw new Error("Missing ZEPTOMAIL_TOKEN environment variable.");
    }

    const contactEmail =
      process.env.CONTACT_EMAIL || "hello@thehitworks.com";

    const phoneDisplay = phone
      ? `${countryCode || ""} ${phone}`.trim()
      : "Not provided";

    const zeptoRes = await fetch("https://api.zeptomail.in/v1.1/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: process.env.ZEPTOMAIL_TOKEN,
        Connection: "close",
      },
      body: JSON.stringify({
        from: {
          address: contactEmail,
          name: "THE HIT WORKS",
        },
        to: [
          {
            email_address: {
              address: contactEmail,
              name: "THE HIT WORKS",
            },
          },
        ],
        reply_to: [
          {
            address: email,
            name: name,
          },
        ],

        subject: `New Project Enquiry  ${
          service || "General Enquiry"
        }`,

        htmlbody: `
          <!DOCTYPE html>
          <html>
          <body style="
            margin: 0;
            padding: 30px;
            background: #f4f6ff;
            font-family: Arial, sans-serif;
          ">

            <div style="
              max-width: 650px;
              margin: auto;
              background: white;
              border: 2px solid #17205c;
              padding: 30px;
            ">

              <h2 style="
                margin-top: 0;
                color: #3048d8;
              ">
                NEW PROJECT ENQUIRY
              </h2>

              <p>
                Someone submitted the contact form on
                <strong>thehitworks.com</strong>.
              </p>

              <hr />

              <h3>Contact Details</h3>

              <p>
                <strong>Name:</strong><br>
                ${escapeHtml(name)}
              </p>

              <p>
                <strong>Email:</strong><br>
                ${escapeHtml(email)}
              </p>

              <p>
                <strong>Phone:</strong><br>
                ${escapeHtml(phoneDisplay)}
              </p>

              <p>
                <strong>Service:</strong><br>
                ${escapeHtml(service || "Not specified")}
              </p>

              <h3>Message</h3>

              <div style="
                background: #f4f6ff;
                padding: 15px;
                white-space: pre-wrap;
              ">
                ${escapeHtml(message)}
              </div>

              <hr />

              <p style="
                color: #777;
                font-size: 12px;
              ">
                This message was submitted through
                the THE HIT WORKS website contact form.
              </p>

            </div>

          </body>
          </html>
        `,
      }),
    });

    const data = await zeptoRes.json();

    if (!zeptoRes.ok) {
      console.error("ZEPTOMAIL API ERROR:", data);
      return res.status(500).json({
        success: false,
        message: data?.message || "Unable to send email.",
      });
    }

    console.log("Contact email sent successfully");

    return res.status(200).json({
      success: true,
      message: "Message sent successfully.",
    });

  } catch (error) {
    console.error("ZEPTOMAIL ERROR:", error);

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Unable to send email.",
    });
  }
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}