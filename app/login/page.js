import NavBar from "../../components/NavBar.js";
import Footer from "../../components/Footer.js";
import LoginForm from "../../components/auth/LoginForm.js";

export default function LoginPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <NavBar />
      <LoginForm />
      <Footer />
    </div>
  );
}
