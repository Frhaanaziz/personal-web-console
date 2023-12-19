interface Props {
  url: string;
}

const EmailVerificationResetPassword: React.FC<Readonly<Props>> = ({ url }) => (
  <div>
    <h1>Confirm Email</h1>
    <a href={url}>Click here to reset your password</a>
  </div>
);

export default EmailVerificationResetPassword;
