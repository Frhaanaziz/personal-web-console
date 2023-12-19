interface EmailVerificationProps {
  url: string;
}

const EmailVerification: React.FC<Readonly<EmailVerificationProps>> = ({
  url,
}) => (
  <div>
    <h1>Confirm Email</h1>
    <a href={url}>Click here to verify your email address</a>
  </div>
);

export default EmailVerification;
