import React from "react";
import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Text, Img } from "@react-email/components";
import { config } from "../../config";

interface LinearLoginCodeEmailProps {
  validationCode?: number;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const OtpCodeEmail = ({ validationCode }: LinearLoginCodeEmailProps) => (
  <Html>
    <Head />
    <Preview>Your login code</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src={`${baseUrl}/static/logo-32.png`} width="32" height="32" alt="Club del Ahorro" />
        <Heading style={heading}>Your login code</Heading>
        <Text style={paragraph}>
          Use the following code to log in to your account. This code will expire in 10 minutes.
        </Text>
        <code style={code}>{validationCode}</code>
        <Hr style={hr} />
        <Link href={baseUrl} style={link}>
          {config.name}
        </Link>
      </Container>
    </Body>
  </Html>
);

OtpCodeEmail.PreviewProps = {
  validationCode: 123456
} as LinearLoginCodeEmailProps;

export default OtpCodeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px"
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0"
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149"
};

const link = {
  fontSize: "14px",
  color: "#b4becc"
};

const hr = {
  borderColor: "#dfe1e4",
  margin: "42px 0 26px"
};

const code = {
  fontFamily: "monospace",
  fontWeight: "700",
  padding: "1px 4px",
  backgroundColor: "#dfe1e4",
  letterSpacing: "-0.3px",
  fontSize: "21px",
  borderRadius: "4px",
  color: "#3c4149"
};
