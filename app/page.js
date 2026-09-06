import NavBar from "../components/NavBar.js";
import Hero from "../components/Hero.js";

const colors = { paper: "#FAF6EC" };

export default function Home() {
  return (
    <div style={{ backgroundColor: colors.paper, minHeight: "100vh" }}>
      <NavBar brand="Rooted Khmer" />
      <Hero
        brand="Rooted Khmer"
        subtitle="Traditional Plant Knowledge & Home Practices"
        statement="Knowledge, rooted in home."
        supportCopy="Explore traditional Khmer plant knowledge, natural ingredients, and everyday practices passed down through generations."
        aboutCopy="Rooted Khmer is a living archive of traditional Khmer plant knowledge, natural ingredients, and everyday home practices passed down through families and generations."
      />
    </div>
  );
}
