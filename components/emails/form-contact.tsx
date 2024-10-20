import React from "react";
import { Body, Container, Head, Heading, Html, Preview, Text, Hr, Img, Link } from "@react-email/components";
import { config } from "../../config";

interface FormContactEmailProps {
  name: string | null | undefined;
  email: string | null | undefined;
  subject: string | null | undefined;
  message: string | null | undefined;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const FormContactEmail = (props: FormContactEmailProps) => {
  const { name, email, subject, message } = props;

  return (
    <Html>
      <Head />
      <Preview>
        Contact form from {name!} - {subject!}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src={`${baseUrl}/static/logo-32.png`} width="32" height="32" alt="Club del Ahorro" />
          <Heading style={heading}>Message from {name}</Heading>
          <Text style={paragraph}>Subject: {name}</Text>
          <Text style={paragraph}>Mail: {email}</Text>
          <Text style={paragraph}>Message: {message}</Text>
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
