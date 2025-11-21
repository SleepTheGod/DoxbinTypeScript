export const metadata = {
  title: "Terms of Service",
  description: "Doxbin Terms of Service and usage guidelines",
}

export default function TermsPage() {
  return (
    <div className="tos-container">
      <div className="tos-card">
        <h1>Terms of Service</h1>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Doxbin, you accept and agree to be bound by the terms and provisions of this
            agreement. If you do not agree to these terms, you should not access or use this service.
          </p>
        </section>

        <section>
          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily use Doxbin for personal, non-commercial transitory viewing only. This
            is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to reverse engineer any software contained on Doxbin</li>
            <li>Remove any copyright or proprietary notations from the materials</li>
          </ul>
        </section>

        <section>
          <h2>3. Prohibited Content</h2>
          <p>You agree not to post content that:</p>
          <ul>
            <li>Is illegal, harmful, threatening, abusive, harassing, tortious, or defamatory</li>
            <li>Infringes on intellectual property rights or violates privacy rights</li>
            <li>Contains software viruses or any other malicious code</li>
            <li>Violates any applicable local, state, national, or international laws</li>
            <li>Impersonates any person or entity or misrepresents your affiliation</li>
          </ul>
        </section>

        <section>
          <h2>4. Disclaimer</h2>
          <p>
            The materials on Doxbin are provided on an 'as is' basis. Doxbin makes no warranties, expressed or implied,
            and hereby disclaims and negates all other warranties including, without limitation, implied warranties or
            conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual
            property or other violation of rights.
          </p>
        </section>

        <section>
          <h2>5. Limitations</h2>
          <p>
            In no event shall Doxbin or its suppliers be liable for any damages (including, without limitation, damages
            for loss of data or profit, or due to business interruption) arising out of the use or inability to use the
            materials on Doxbin, even if Doxbin or a Doxbin authorized representative has been notified orally or in
            writing of the possibility of such damage.
          </p>
        </section>

        <section>
          <h2>6. Content Removal</h2>
          <p>
            We reserve the right to remove any content that violates these terms or is deemed inappropriate at our sole
            discretion, without prior notice. Repeated violations may result in permanent account suspension or IP
            banning.
          </p>
        </section>

        <section>
          <h2>7. Privacy and Data Collection</h2>
          <p>
            While we aim to provide anonymous paste sharing, we may log IP addresses, user agents, and other metadata
            for security and abuse prevention purposes. This information may be shared with law enforcement if required
            by applicable law.
          </p>
        </section>

        <section>
          <h2>8. User Responsibilities</h2>
          <p>
            You are solely responsible for the content you post on Doxbin. You acknowledge that all information posted
            is publicly accessible and permanent. We strongly recommend that you do not post any personally identifiable
            information or sensitive data.
          </p>
        </section>

        <section>
          <h2>9. Modifications to Terms</h2>
          <p>
            Doxbin may revise these terms of service at any time without notice. By using this website, you are agreeing
            to be bound by the then-current version of these terms of service.
          </p>
        </section>

        <section>
          <h2>10. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with applicable international laws,
            and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </section>

        <p
          style={{
            fontSize: "12px",
            marginTop: "50px",
            paddingTop: "25px",
            borderTop: "1px solid var(--border)",
            color: "var(--muted-foreground)",
          }}
        >
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  )
}
