import Image from "next/image";
import Sidebar from "./Sidebar";
import HeroCardsDao from "./src/dal/HeroCardDao";

export const dynamic = "force-dynamic";

function HeroCard({ story }) {
  const cardStyle = {
    "--hero-overlay-color": story.overlay_color,
  };

  return (
    <a className="heroCard dbHeroCard" href={story.link} style={cardStyle}>
      <Image
        src={story.background_image}
        alt="Background image of the hero card"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1180px) 50vw, 25vw"
        className="heroImage"
      />
      <span className="heroOverlay" aria-hidden="true" />
      <h2>{story.title}</h2>
    </a>
  );
}

async function getHeroCards() {
  try {
    const heroCardsDao = new HeroCardsDao();
    return await heroCardsDao.getHeroCardsWithoutId();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const heroCards = await getHeroCards();

  return (
    <main>
      <Sidebar />
      <section className="contentShell">
        <section className="heroGrid" aria-label="Matérias principais">
          {heroCards.map((story) => (
            <HeroCard story={story} key={`${story.link}-${story.title}`} />
          ))}
        </section>
      </section>
    </main>
  );
}
