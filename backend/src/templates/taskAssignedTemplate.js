export function taskAssignedTemplate({
  assignedToName,
  assignedByName,
  title,
  description,
  priority,
  dueDate,
}) {
  const formattedDate = dueDate
    ? new Date(dueDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not specified";

  return `
    <!DOCTYPE html>
    <html>
      <body style="
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
        font-family: Arial, Helvetica, sans-serif;
        color: #1f2937;
      ">

        <div style="
          width: 100%;
          padding: 40px 0;
          background-color: #f5f5f5;
        ">

          <div style="
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 18px rgba(0,0,0,0.08);
          ">

            <!-- Header -->
            <div style="
              background-color: #ef4444;
              padding: 28px 32px;
              text-align: center;
            ">
              <h1 style="
                margin: 0;
                color: #ffffff;
                font-size: 26px;
                font-weight: 700;
              ">
                Dashboard-X
              </h1>

              <p style="
                margin: 7px 0 0;
                color: #fee2e2;
                font-size: 14px;
              ">
                Task Management
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 32px;">

              <h2 style="
                margin: 0 0 10px;
                color: #111827;
                font-size: 22px;
              ">
                Hey ${assignedToName} 👋
              </h2>

              <p style="
                margin: 0 0 25px;
                color: #6b7280;
                font-size: 15px;
                line-height: 1.6;
              ">
                <strong style="color: #ef4444;">
                  ${assignedByName}
                </strong>
                has assigned you a new task on Dashboard-X.
              </p>

              <!-- Task Card -->
              <div style="
                border: 1px solid #fecaca;
                border-left: 5px solid #ef4444;
                border-radius: 12px;
                padding: 22px;
                background-color: #fffafa;
              ">

                <h3 style="
                  margin: 0 0 18px;
                  color: #111827;
                  font-size: 20px;
                ">
                  ${title}
                </h3>

                <div style="margin-bottom: 14px;">
                  <span style="
                    color: #6b7280;
                    font-size: 13px;
                    font-weight: 600;
                  ">
                    PRIORITY
                  </span>

                  <div style="
                    margin-top: 5px;
                    color: #ef4444;
                    font-weight: 700;
                    text-transform: uppercase;
                  ">
                    ${priority}
                  </div>
                </div>

                <div style="margin-bottom: 14px;">
                  <span style="
                    color: #6b7280;
                    font-size: 13px;
                    font-weight: 600;
                  ">
                    DUE DATE
                  </span>

                  <div style="
                    margin-top: 5px;
                    color: #111827;
                    font-weight: 600;
                  ">
                    ${formattedDate}
                  </div>
                </div>

                <div>
                  <span style="
                    color: #6b7280;
                    font-size: 13px;
                    font-weight: 600;
                  ">
                    DESCRIPTION
                  </span>

                  <p style="
                    margin: 6px 0 0;
                    color: #4b5563;
                    font-size: 14px;
                    line-height: 1.6;
                  ">
                    ${description || "No description provided."}
                  </p>
                </div>

              </div>

              <!-- CTA -->
              <div style="
                text-align: center;
                margin-top: 30px;
              ">

                <a
                  href="YOUR_DASHBOARD_URL"
                  style="
                    display: inline-block;
                    background-color: #ef4444;
                    color: #ffffff;
                    text-decoration: none;
                    padding: 13px 26px;
                    border-radius: 8px;
                    font-size: 15px;
                    font-weight: 700;
                  "
                >
                  View Task →
                </a>

              </div>

              <p style="
                margin: 30px 0 0;
                text-align: center;
                color: #9ca3af;
                font-size: 12px;
                line-height: 1.5;
              ">
                You received this email because a task was assigned
                to you on Dashboard-X.
              </p>

            </div>

            <!-- Footer -->
            <div style="
              border-top: 1px solid #f3f4f6;
              padding: 20px;
              text-align: center;
              background-color: #fafafa;
            ">
              <p style="
                margin: 0;
                color: #6b7280;
                font-size: 13px;
              ">
                Dashboard-X Team ❤️
              </p>
            </div>

          </div>
        </div>

      </body>
    </html>
  `;
}
