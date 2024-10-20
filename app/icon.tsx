import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 260,
  height: 260
};
export const contentType = "image/png";

const Logo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="100" fill="currentColor">
    <path d="M12 2a10 10 0 0 0-7 17.5V22a1 1 0 0 0 1.57.82L12 19.4l5.43 3.41A1 1 0 0 0 18 22v-2.5A10 10 0 0 0 12 2zm0 2a8 8 0 0 1 5.1 14.3L12 17.2l-5.1 1.1A8 8 0 0 1 12 4zm0 4a4 4 0 0 0-3.2 6.4l6.6-6.6A4 4 0 0 0 12 8zm0 2a2 2 0 0 1 1.4 3.4l-4.6 4.6A2 2 0 0 1 12 10z" />
  </svg>
);

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 220,
          backgroundColor: "#0000",
          backgroundImage: "linear-gradient(to top right, rgba(19,118,72,.8), rgba(19,118,72,1))",
          padding: 100,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Logo />
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size
    }
  );
}
