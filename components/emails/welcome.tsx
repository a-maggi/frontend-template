import React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Img,
  Hr,
  Link
} from "@react-email/components";
import { config } from "../../config";

interface WelcomeEmailProps {
  name: string | null | undefined;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        Welcome to {config.name}, {name!}!
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src={`${baseUrl}/static/logo-32.png`} width="32" height="32" alt="Club del Ahorro" />
          <Heading style={heading}>Welcome to {config.name}</Heading>
          <Text style={paragraph}>Hello {name},</Text>
          <Text style={paragraph}>!Congratulations! You have successfully created an account with {config.name}.</Text>
          <Text style={paragraph}>You can now go to the website and sign in to your account.</Text>
          <Section className="my-[32px]">
            <Button style={button} href={`${baseUrl}/auth/signin`}>
              Sign in
            </Button>
          </Section>
          <Hr style={hr} />
          <Link href={baseUrl} style={link}>
            {config.name}
          </Link>
        </Container>
      </Body>
    </Html>
  );
};

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

const button = {
  backgroundColor: "#513cc8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px"
};
