export function generateSlutprint() {
  // Create temporary visual trace of interaction
  const slutprint = document.createElement("div")
  slutprint.style.cssText = `
    position: fixed;
    width: 4px;
    height: 4px;
    background: var(--red-hanky);
    border-radius: 50%;
    top: ${Math.random() * window.innerHeight}px;
    left: ${Math.random() * window.innerWidth}px;
    pointer-events: none;
    z-index: 1000;
    animation: slutprint-fade 3s ease-out forwards;
  `

  const keyframes = `
    @keyframes slutprint-fade {
      0% { opacity: 1; transform: scale(1); }
      100% { opacity: 0; transform: scale(0.5); }
    }
  `

  if (!document.querySelector("#slutprint-styles")) {
    const style = document.createElement("style")
    style.id = "slutprint-styles"
    style.textContent = keyframes
    document.head.appendChild(style)
  }

  document.body.appendChild(slutprint)
  setTimeout(() => slutprint.remove(), 3000)
}
