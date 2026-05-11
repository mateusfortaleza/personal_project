import Sidebar from "./Sidebar";
import HeroCardsDao from "./src/dal/HeroCardDao";

export const dynamic = "force-dynamic";

function HeroCard({ story }) {
  const cardStyle = {
    backgroundImage: `linear-gradient(180deg, transparent 42%, ${story.overlay_color}cc 74%, ${story.overlay_color} 100%), url("${story.background_image}")`,
  };

  return (
    <a className="heroCard dbHeroCard" href={story.link} style={cardStyle}>
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
