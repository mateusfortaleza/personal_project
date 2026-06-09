import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import Sidebar from "../Sidebar";
import HeroCardsDao from "../dal/HeroCardDao";
import LanguageDao from "../dal/LanguageDao";
import MenuDao from "../dal/MenuDao";

export const dynamic = "force-dynamic";

type HeroCardStory = Awaited<
  ReturnType<HeroCardsDao["getHeroCardsWithoutId"]>
>[number];

type MenuItem = Awaited<ReturnType<MenuDao["getMenuItems"]>>[number];

type Language = Awaited<ReturnType<LanguageDao["getLanguages"]>>[number];

type HomeProps = {
  params: Promise<{ lang: string }>;
};

function HeroCard({ story }: { story: HeroCardStory }) {
  return (
    <Box
      component="a"
      href={story.link}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        minHeight: { xs: 360, md: 390, lg: 475 },
        overflow: "hidden",
        color: "inherit",
        textDecoration: "none",
        bgcolor: "#111",
        boxShadow: "0 1px 0 rgba(0, 0, 0, 0.05)",
        transition: "transform 180ms ease, box-shadow 180ms ease, filter 180ms ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 20px 42px rgba(24, 32, 44, 0.16)",
          filter: "saturate(1.05)",
        },
      }}
    >
      {story.background_image ? (
        <Image
          src={story.background_image}
          alt="Background image of the hero card"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1180px) 50vw, 25vw"
          style={{
            zIndex: 0,
            objectFit: "cover",
          }}
        />
      ) : null}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: `linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.16) 42%, ${story.overlay_color} 100%)`,
        }}
      />
      <Typography
        component="h2"
        sx={{
          position: "relative",
          zIndex: 2,
          m: 0,
          px: 2.875,
          pb: 3.125,
          color: "white",
          fontSize: 20,
          lineHeight: 1.2,
          fontWeight: 800,
          textShadow: "0 2px 10px rgba(0, 0, 0, 0.32)",
        }}
      >
        {story.title}
      </Typography>
    </Box>
  );
}

async function getHeroCards(languageCode: string): Promise<HeroCardStory[]> {
  try {
    const heroCardsDao = new HeroCardsDao();
    return await heroCardsDao.getHeroCardsWithoutId(languageCode);
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getMenuItems(): Promise<MenuItem[]> {
  try {
    return await new MenuDao().getMenuItems();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getLanguages(): Promise<Language[]> {
  try {
    return await new LanguageDao().getLanguages();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home({
  params,
}: HomeProps): Promise<ReactNode> {
  const { lang: currentLanguage } = await params;

  const [heroCards, menuItems, languages] = await Promise.all([
    getHeroCards(currentLanguage),
    getMenuItems(),
    getLanguages(),
  ]);

  if (!languages.some(({ langCode }) => langCode === currentLanguage)) {
    notFound();
  }

  return (
    <Box component="main">
      <Sidebar
        menuItems={menuItems}
        languages={languages}
        currentLanguage={currentLanguage}
      />
      <Box
        component="section"
        sx={{
          width: {
            xs: "auto",
            md: "calc(100vw - var(--sidebar) - 48px)",
            lg: "min(1200px, calc(100vw - var(--sidebar) - 110px))",
          },
          ml: {
            xs: 0,
            md: "calc(var(--sidebar) + 24px)",
            lg: "calc(var(--sidebar) + 202px)",
          },
          py: { xs: 3, md: 4.75 },
          px: { xs: 2.25, md: 0 },
          pb: { xs: 7, md: 10 },
        }}
      >
        <Box
          component="section"
          aria-label="Matérias principais"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {heroCards.map((story) => (
            <HeroCard story={story} key={`${story.link}-${story.title}`} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
