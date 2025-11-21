export const metadata = {
  title: "Terms of Service - Doxbin",
  description: "Doxbin Terms of Service",
}

export default function TermsPage() {
  return (
    <>
      <div className="tos" style={{ marginTop: "7rem", padding: "20px" }}>
        <div className="container">
          <div
            className="col-md-8 col-md-offset-2"
            style={{ background: "white", padding: "30px", borderRadius: "4px" }}
          >
            <h1 style={{ color: "#444", marginBottom: "20px" }}>Terms of Service</h1>

            <div style={{ color: "#444", lineHeight: "1.6" }}>
              <section style={{ marginBottom: "30px" }}>
                <h2 style={{ fontSize: "20px", marginBottom: "15px", color: "#444" }}>1. Acceptance of Terms</h2>
                <p>
                  By accessing and using Doxbin, you accept and agree to be bound by the terms and provision of this
                  agreement.
                </p>
              </section>

              <section style={{ marginBottom: "30px" }}>
                <h2 style={{ fontSize: "20px", marginBottom: "15px", color: "#444" }}>2. Use License</h2>
                <p>
                  Permission is granted to temporarily use Doxbin for personal, non-commercial transitory viewing only.
                  This is the grant of a license, not a transfer of title.
                </p>
              </section>

              <section style={{ marginBottom: "30px" }}>
                <h2 style={{ fontSize: "20px", marginBottom: "15px", color: "#444" }}>3. Prohibited Content</h2>
                <p>You may not post content that:</p>
                <ul style={{ marginLeft: "20px", marginTop: "10px" }}>
                  <li>Is illegal, harmful, threatening, abusive, harassing, or defamatory</li>
                  <li>Infringes on intellectual property rights</li>
                  <li>Contains viruses or malicious code</li>
                  <li>Violates any applicable laws or regulations</li>
                </ul>
              </section>

              <section style={{ marginBottom: "30px" }}>
                <h2 style={{ fontSize: "20px", marginBottom: "15px", color: "#444" }}>4. Disclaimer</h2>
                <p>
                  The materials on Doxbin are provided on an 'as is' basis. Doxbin makes no warranties, expressed or
                  implied, and hereby disclaims and negates all other warranties including, without limitation, implied
                  warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
                  intellectual property or other violation of rights.
                </p>
              </section>

              <section style={{ marginBottom: "30px" }}>
                <h2 style={{ fontSize: "20px", marginBottom: "15px", color: "#444" }}>5. Limitations</h2>
                <p>
                  In no event shall Doxbin or its suppliers be liable for any damages (including, without limitation,
                  damages for loss of data or profit, or due to business interruption) arising out of the use or
                  inability to use the materials on Doxbin.
                </p>
              </section>

              <section style={{ marginBottom: "30px" }}>
                <h2 style={{ fontSize: "20px", marginBottom: "15px", color: "#444" }}>6. Content Removal</h2>
                <p>
                  We reserve the right to remove any content that violates these terms or is deemed inappropriate at our
                  sole discretion, without prior notice.
                </p>
              </section>

              <section style={{ marginBottom: "30px" }}>
                <h2 style={{ fontSize: "20px", marginBottom: "15px", color: "#444" }}>7. Privacy</h2>
                <p>
                  While we aim to provide anonymous paste sharing, we may log IP addresses and user agents for security
                  and abuse prevention purposes.
                </p>
              </section>

              <p style={{ fontSize: "12px", marginTop: "40px", paddingTop: "20px", borderTop: "1px solid #cdcdcd" }}>
                Last updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
