import Hero from "../components/Hero.js";
import ArchiveSection from "../components/ArchiveSection.js";
import collection from "../collection.config.js";

export default function Home() {
  return (
    <>
      <Hero
        eyebrow={`${collection.name} • ${collection.subtitle}`}
        statement="Knowledge, Preserved in the Home."
        supportCopy={collection.description}
      />
      <ArchiveSection />
    </>
  );
}
