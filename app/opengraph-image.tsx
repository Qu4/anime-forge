import { ImageResponse } from "next/og";

export const alt = "Anime Forge - Forge your anime destiny";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 50% 20%, rgba(168,85,247,0.42), transparent 34%), linear-gradient(135deg, #05020d 0%, #12051f 45%, #03020a 100%)",
          color: "white",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "42px",
            border: "2px solid rgba(216,180,254,0.42)",
            boxShadow:
              "0 0 36px rgba(168,85,247,0.35), inset 0 0 44px rgba(168,85,247,0.16)",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "520px",
            height: "520px",
            borderRadius: "999px",
            background:
              "radial-gradient(circle, rgba(236,72,153,0.26), rgba(168,85,247,0.12), transparent 68%)",
            right: "-120px",
            bottom: "-140px",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "420px",
            height: "420px",
            borderRadius: "999px",
            background:
              "radial-gradient(circle, rgba(34,211,238,0.16), rgba(168,85,247,0.08), transparent 70%)",
            left: "-90px",
            top: "-110px",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "0 90px",
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontSize: "25px",
              letterSpacing: "18px",
              textTransform: "uppercase",
              color: "rgb(216,180,254)",
              marginBottom: "28px",
              fontWeight: 900,
            }}
          >
            Anime Character Generator
          </div>

          <div
            style={{
              fontSize: "104px",
              lineHeight: 1,
              letterSpacing: "8px",
              textTransform: "uppercase",
              fontWeight: 900,
              textShadow:
                "0 0 24px rgba(216,180,254,0.9), 0 0 58px rgba(168,85,247,0.65)",
            }}
          >
            Anime Forge
          </div>

          <div
            style={{
              width: "360px",
              height: "2px",
              marginTop: "34px",
              marginBottom: "34px",
              background:
                "linear-gradient(90deg, transparent, rgba(216,180,254,0.9), transparent)",
            }}
          />

          <div
            style={{
              maxWidth: "780px",
              fontSize: "34px",
              lineHeight: 1.32,
              color: "rgba(255,255,255,0.82)",
              fontWeight: 700,
            }}
          >
            Forge your destiny through rarity choices, AI narration, and original character artwork.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}