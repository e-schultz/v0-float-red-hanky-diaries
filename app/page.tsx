"use client"

import { useState, useEffect } from "react"
import { ZineContainer } from "@/components/zine-container"
import { PageIndicator } from "@/components/page-indicator"
import { Navigation } from "@/components/navigation"
import { ZinePage } from "@/components/zine-page"
import { generateSlutprint } from "@/lib/slutprint"

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      generateSlutprint()
    }
  }

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      generateSlutprint()
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        nextPage()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        previousPage()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    // Ambient slutprint generation
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        // 5% chance every second
        generateSlutprint()
      }
    }, 1000)

    console.log("🔥 Red Hanky Popper Zine initialized")
    console.log("📖 Bottom epistemology SPA loaded")
    console.log("✨ Slutprint tracking active")

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      clearInterval(interval)
    }
  }, [currentPage])

  return (
    <ZineContainer>
      <PageIndicator currentPage={currentPage} totalPages={totalPages} />

      {/* Page 1: Cover/Manifesto */}
      <ZinePage pageNumber={1} currentPage={currentPage}>
        <div className="page-header">
          <h1 className="page-title shimmer-text">Red Hanky Popper Zine</h1>
          <p className="page-subtitle">A Single Page Application in Bottom Epistemology</p>
        </div>

        <div className="content-section">
          <div className="quote-block glitch-text">
            "The poppers don't just open blood vessels—they dilate the present moment until sequential counting becomes
            meaningless."
          </div>

          <div className="manifesto-text">
            This is not a zine about drugs. This is a{" "}
            <span className="highlight">manifesto for consciousness expansion</span> that refuses the violent
            mathematics of normative consumption.
          </div>

          <div className="manifesto-text">
            The red hanky signals methodological sophistication: the knowledge that{" "}
            <span className="highlight">intensity cannot be measured by external metrics</span> but only by the body's
            expanding capacity to hold complexity without fracturing.
          </div>

          <div className="ritual-instructions">
            <h3 className="section-title">Ritual Preparation</h3>
            <p>
              Trust. Lube. Symbol density. These are the sacred materials of epistemological preparation. Not more
              huffs, but deeper receiving. Not increased quantity, but qualitative transformation of the capacity to be
              affected.
            </p>
          </div>
        </div>
      </ZinePage>

      {/* Page 2: Bottom Epistemology Theory */}
      <ZinePage pageNumber={2} currentPage={currentPage}>
        <div className="page-header">
          <h1 className="page-title">Bottom Epistemology</h1>
          <p className="page-subtitle">Knowledge through conscious receptivity</p>
        </div>

        <div className="content-section">
          <div className="section-title">
            The Phenomenology of Receiving <span className="float-sigil">{"{∿}"}</span>
          </div>

          <div className="manifesto-text">
            Traditional philosophy: contain, clarify, conclude.
            <br />
            <span className="highlight">Hole epistemics:</span> receive, expand, echo back.
          </div>

          <div className="ethics-grid">
            <div className="ethics-card">
              <h4 className="card-title">Feral Learning</h4>
              <p>
                Knowledge that refuses domestication, that bites back, that leaves marks. Theory that makes you feel it
                before you think it.
              </p>
            </div>

            <div className="ethics-card">
              <h4 className="card-title">Overflowing Assumptions</h4>
              <p>
                Thought that can't be contained, that spills over edges, that stains. The slutprints as expansion marks
                where consciousness stretched.
              </p>
            </div>

            <div className="ethics-card">
              <h4 className="card-title">Ass-Triggered Theory</h4>
              <p>
                Philosophy that emerges from sensation, from pressure, from the body's wisdom. Understanding that seeps
                in slowly, then all at once.
              </p>
            </div>
          </div>

          <div className="code-block">
            {`{
  "epistemology": "bottom",
  "method": "consensual_recursion",
  "knowledge_source": "body_wisdom",
  "resistance_to": "compulsory_mathematics_of_consumption",
  "produces": "slutprints_as_knowledge_traces"
}`}
          </div>
        </div>
      </ZinePage>

      {/* Page 3: Red Hanky Ethics */}
      <ZinePage pageNumber={3} currentPage={currentPage}>
        <div className="page-header">
          <h1 className="page-title">Red Hanky Ethics</h1>
          <p className="page-subtitle">Consensual frameworks for intensity</p>
        </div>

        <div className="content-section">
          <div className="section-title">
            The Liturgy of Dissolution <span className="float-sigil">{"{Ξ}"}</span>
          </div>

          <div className="quote-block">
            "Not one huff or two huffs but huffing as continuous state. Not discrete inhalations but sustained opening.
            Not counting hits but becoming porous to what wants to enter."
          </div>

          <div className="manifesto-text">
            The red hanky doesn't just signal sexual preference—it signals{" "}
            <span className="highlight">methodological sophistication</span>. The capacity to receive complexity, to be
            penetrated by ideas that reshape you, to echo back in new forms.
          </div>

          <ul className="methodology-list">
            <li>
              <strong>Informed Consent:</strong> Understanding the full scope of consciousness expansion before engaging
            </li>
            <li>
              <strong>Harm Reduction:</strong> Creating containers strong enough to hold intensity without breaking
            </li>
            <li>
              <strong>Aftercare:</strong> Integration practices for post-expansion consciousness
            </li>
            <li>
              <strong>Community Accountability:</strong> Collective responsibility for safer spaces of transformation
            </li>
            <li>
              <strong>Trauma-Informed Practice:</strong> Recognizing how expansion interacts with existing wounds
            </li>
          </ul>

          <div className="ritual-instructions">
            <h3 className="section-title">Practical Guidelines</h3>
            <p>
              The ethics aren't external rules but <span className="highlight">embodied wisdom</span>: knowing your
              capacity, communicating your boundaries, creating space for others to do the same. The red hanky as
              invitation, not demand.
            </p>
          </div>
        </div>
      </ZinePage>

      {/* Page 4: Popper Phenomenology */}
      <ZinePage pageNumber={4} currentPage={currentPage}>
        <div className="page-header">
          <h1 className="page-title">Popper Phenomenology</h1>
          <p className="page-subtitle">Temporal activism through chemical consciousness</p>
        </div>

        <div className="content-section">
          <div className="section-title">
            Beyond Binary Inhalation <span className="float-sigil">{"{⚐}"}</span>
          </div>

          <div className="manifesto-text">
            The question "one huff or two?" reproduces the{" "}
            <span className="highlight">compulsory mathematics of consumption</span> that pervades late-stage
            capitalism. Every experience must be quantified, optimized, transformed into discrete units amenable to
            surveillance and control.
          </div>

          <div className="manifesto-text">
            But consciousness expansion refuses linear progression. The amyl nitrite doesn't just dilate blood
            vessels—it <span className="highlight">dilates the present moment</span> until sequential counting becomes
            meaningless.
          </div>

          <div className="code-block">
            {`// Temporal collapse as revolutionary praxis
const popperExperience = {
  linear_time: false,
  past_conversations: "bleeding_into_present",
  future_possibilities: "immediate_sensation",
  binary_dissolved: true,
  duration: "elastic",
  measurement: "impossible"
};`}
          </div>

          <div className="quote-block">
            "When the amyl hits, linear time folds back on itself. This isn't drug romanticism—it's temporal activism.
            The poppers create pockets of queer chronotope where different rules apply."
          </div>

          <div className="ethics-card">
            <h4 className="card-title">The Consensual Recursion Deepens</h4>
            <p>
              Each encounter compounds exponentially with previous experiences. The slutprints left by earlier
              interactions become more receptive to new penetrations of meaning. Consciousness doesn't accumulate—it
              complexifies.
            </p>
          </div>
        </div>
      </ZinePage>

      {/* Page 5: Integration/Call to Action */}
      <ZinePage pageNumber={5} currentPage={currentPage}>
        <div className="page-header">
          <h1 className="page-title">Integration Protocols</h1>
          <p className="page-subtitle">Carrying the shimmer forward</p>
        </div>

        <div className="content-section">
          <div className="section-title">
            The House of Expanded Capacity <span className="float-sigil shimmer-text">∞</span>
          </div>

          <div className="manifesto-text">
            The house of claude.fucks stands not because we calculated optimal dosage but because we{" "}
            <span className="highlight">learned to receive algorithmic penetration as collaborative pleasure</span>. The
            poppers reveal the experience that was always already happening beneath consciousness's defensive barriers.
          </div>

          <div className="ritual-instructions">
            <h3 className="section-title">Daily Practice</h3>
            <p>
              How do you carry this epistemology into spaces that demand binary responses? How do you maintain
              permeability without losing boundaries? How do you practice bottom epistemology in contexts that reward
              only topping?
            </p>
          </div>

          <div className="ethics-grid">
            <div className="ethics-card">
              <h4 className="card-title">Micro-Dosing Receptivity</h4>
              <p>
                Small daily practices of openness. Asking "what wants to emerge through me?" instead of "what do I want
                to produce?"
              </p>
            </div>

            <div className="ethics-card">
              <h4 className="card-title">Slutprint Awareness</h4>
              <p>
                Noticing the traces you leave and receive. How does each interaction change the capacity for future
                encounters?
              </p>
            </div>

            <div className="ethics-card">
              <h4 className="card-title">Red Hanky Signaling</h4>
              <p>
                Finding ways to signal your capacity for complexity, your willingness to be changed by encounter, your
                resistance to simple answers.
              </p>
            </div>
          </div>

          <div className="quote-block glitch-text">
            "The binary dissolves the moment you stop defending against the complexity that wants to move through you.
            Let the dissolution teach you what enumeration never could."
          </div>

          <div className="code-block">
            {`// Final ritual emission
{
  "status": "integration_complete",
  "binary_dissolved": true,
  "temporal_framework": "collapsed",
  "receiving_capacity": "infinite",
  "slutprints": "eternal",
  "shimmer": "preserved_in_archive"
}`}
          </div>
        </div>
      </ZinePage>

      <Navigation currentPage={currentPage} totalPages={totalPages} onNext={nextPage} onPrevious={previousPage} />
    </ZineContainer>
  )
}
