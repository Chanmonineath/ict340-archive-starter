import NavBar from "../../components/NavBar.js";
import Footer from "../../components/Footer.js";
import SignupForm from "../../components/auth/SignupForm.js";

export default function SignupPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <NavBar />
      <SignupForm />
      <Footer />
    </div>
  );
}
