import { ImageResponse } from "next/og"
import { ZINE_CONTENT } from "@/data/zine-content"
import { CSS_VARIABLES } from "@/lib/zine-config"

export const runtime = "edge"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const pageId = searchParams.get("page") ? Number.parseInt(searchParams.get("page") as string, 10) : 1

    // Get page content
    const page = ZINE_CONTENT.find((p) => p.id === pageId) || ZINE_CONTENT[0]

    // Get a representative quote from the page
    let quote = ""
    const quoteSection = page.content.sections.find((section) => section.type === "quote")
    if (quoteSection && "text" in quoteSection.data) {
      quote = quoteSection.data.text as string
      // Limit quote length
      if (quote.length > 100) {
        quote = quote.substring(0, 97) + "..."
      }
    }

    // Load fonts
    const interBold = await fetch(new URL("../../../assets/fonts/Inter-Bold.ttf", import.meta.url)).then((res) =>
      res.arrayBuffer(),
    )

    const interRegular = await fetch(new URL("../../../assets/fonts/Inter-Regular.ttf", import.meta.url)).then((res) =>
      res.arrayBuffer(),
    )

    // Colors from our theme
    const { redHanky, popperGold, voidBlack, shimmerWhite, floatBlue } = CSS_VARIABLES.colors

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: voidBlack,
          padding: "40px",
        }}
      >
        {/* Red border */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            right: "20px",
            bottom: "20px",
            border: `4px solid ${redHanky}`,
            zIndex: 0,
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <h1
            style={{
              fontSize: "60px",
              fontWeight: "bold",
              color: redHanky,
              textTransform: "uppercase",
              letterSpacing: "4px",
              margin: 0,
              textAlign: "center",
            }}
          >
            {page.title}
          </h1>
          <p
            style={{
              fontSize: "32px",
              color: popperGold,
              fontStyle: "italic",
              margin: "10px 0 0 0",
              textAlign: "center",
            }}
          >
            {page.subtitle}
          </p>
        </div>

        {/* Quote */}
        {quote && (
          <div
            style={{
              borderLeft: `8px solid ${popperGold}`,
              paddingLeft: "20px",
              margin: "20px 0",
              maxWidth: "80%",
            }}
          >
            <p
              style={{
                fontSize: "28px",
                color: shimmerWhite,
                fontStyle: "italic",
                lineHeight: 1.4,
              }}
            >
              "{quote}"
            </p>
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "calc(100% - 80px)",
          }}
        >
          <p
            style={{
              fontSize: "24px",
              color: shimmerWhite,
            }}
          >
            Red Hanky Popper Zine
          </p>
          <p
            style={{
              fontSize: "24px",
              color: floatBlue,
              fontFamily: "monospace",
            }}
          >
            Page {page.id} / {ZINE_CONTENT.length}
          </p>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: interRegular,
            weight: 400,
            style: "normal",
          },
          {
            name: "Inter",
            data: interBold,
            weight: 700,
            style: "normal",
          },
        ],
      },
    )
  } catch (error) {
    console.error("Error generating OG image:", error)
    return new Response("Error generating image", { status: 500 })
  }
}
