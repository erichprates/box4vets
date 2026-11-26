import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Box4Vets: Medicina Preditiva e Medicina de Precisão no seu consultório";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagem de compartilhamento padrao (WhatsApp, LinkedIn, redes). */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#fff",
          background: "linear-gradient(135deg, #1b123d 0%, #3f2f80 55%, #5b48b0 100%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>
          box<span style={{ color: "#8fe3f2" }}>4</span>vets
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#8fe3f2" }}>
            GENÉTICA APLICADA À ROTINA CLÍNICA
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 68, lineHeight: 1.1, letterSpacing: -2 }}>
            Medicina Preditiva e Medicina de Precisão no seu consultório.
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 34, color: "#8fe3f2" }}>
            Em qualquer cidade do Brasil.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
