import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'CopterJet International Group - Aviation Excellence';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#0a1e35',
          backgroundImage: 'radial-gradient(circle at 85% 20%, #164878 0%, #0a1e35 70%)',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '12px',
              height: '40px',
              backgroundColor: '#C40E14',
              borderRadius: '2px',
            }}
          />
          <span
            style={{
              fontSize: '28px',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}
          >
            CopterJet International Group
          </span>
        </div>

        {/* Center Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h1
            style={{
              fontSize: '62px',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.15,
              margin: 0,
              maxWidth: '1000px',
            }}
          >
            Aviation Excellence &amp; Aerospace Solutions
          </h1>
          <p
            style={{
              fontSize: '26px',
              color: '#cbd5e1',
              margin: 0,
              maxWidth: '900px',
              lineHeight: 1.4,
            }}
          >
            Bridging Africa&apos;s aerospace supply chain, aircraft brokerage, spares &amp; components, GSE, and leasing operations.
          </p>
        </div>

        {/* Footer Bar */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '2px solid rgba(255, 255, 255, 0.15)',
            paddingTop: '28px',
          }}
        >
          <span
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#C40E14',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            ...together we RISE towards aviation excellence
          </span>
          <span
            style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#94a3b8',
            }}
          >
            www.copterjetgroup.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
