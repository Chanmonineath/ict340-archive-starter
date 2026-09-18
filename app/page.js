import NavBar from "../components/NavBar.js";
import Hero from "../components/Hero.js";
import Footer from "../components/Footer.js";
import collection from "../collection.config.js";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <NavBar />
      <Hero
        eyebrow={`${collection.name} • ${collection.subtitle}`}
        statement="Knowledge, Preserved in the Home."
        supportCopy={collection.description}
      />
      <Footer />
    </div>
  );
}
