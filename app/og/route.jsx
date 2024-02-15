import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  const imageData = await fetch(new URL("/og-image.png", import.meta.url)).then(
    (res) => res.arrayBuffer()
  );
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          background: "#f6f6f6",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img width="100%" height="100%" src={imageData} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
