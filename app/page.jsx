"use client";

import { useState } from "react";

const navItems = [
  ["home", "Início"],
  ["ps5", "PS5"],
  ["xs", "Xbox Series X/S"],
  ["sw", "Switch"],
  ["rv", "Reviews"],
  ["tb", "Tabletop"],
  ["tv", "Cinema & TV"],
  ["an", "Anime"],
  ["tc", "Tech"],
  ["dc", "Descontos"],
  ["cd", "Codashop"],
  ["vd", "Vídeos"],
  ["gl", "Galerias"],
];

const heroStories = [
  {
    title: "LEGO Batman: O Legado do Cavaleiro das Trevas é um tributo para o homem-morcego",
    theme: "batman",
  },
  {
    title: "“Não existe nenhum jogo exatamente como esse por aí”: Control Resonant promete",
    theme: "resonant",
  },
  {
    title: "Yoshi and the Mysterious Book promete ser um game aconchegante | Preview",
    theme: "yoshi",
  },
  {
    title: "Drowned Lake mostra que o Brasil tem muitas histórias de terror para contar",
    theme: "terror",
  },
];

const featuredStories = [
  {
    title:
      "De jogador profissional a desenvolvedor de Invincible VS, Rip comenta sobre o novo jogo durante a gamescom latam 2026",
    theme: "invincible",
  },
  {
    title: "Remake de One Piece ganha janela de lançamento e tem quantidade de episódios confirmada",
    theme: "onepiece",
  },
  {
    title:
      "Há 27 anos, Anakin Skywalker era o melhor amigo deste personagem em Star Wars: A Ameaça Fantasma, mas o abandonou sem pensar duas vezes",
    theme: "starwars",
  },
  {
    title:
      "Aqui vamos nós de novo: fãs de Hollow Knight acreditam que DLC de Silksong pode ganhar notícias em breve após publicação da Team Cherry",
    theme: "silksong",
  },
];

const newsStories = [
  {
    title:
      "Após final dramático do episódio 6 da 5ª temporada de The Boys, fãs têm teoria definida sobre destino de Capitão Pátria",
    theme: "theboys",
  },
  {
    title:
      "Novo RPG de ação mistura fantasia urbana, combate estiloso e escolhas que mudam a cidade",
    theme: "rpg",
  },
  {
    title:
      "Clássico dos anos 2000 retorna com visual renovado e campanha cheia de segredos",
    theme: "retro",
  },
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={collapsed ? "sidebar collapsed" : "sidebar"} aria-label="Navegação principal">
      <div className="brand">
        <span className="brandMark">IGN</span>
        <span className="brandOrb" aria-hidden="true" />
        <strong>Brasil</strong>
      </div>
      <button
        className="collapseButton"
        type="button"
        aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
        aria-pressed={collapsed}
        onClick={() => setCollapsed((current) => !current)}
      >
        {collapsed ? "›" : "‹"}
      </button>

      <nav className="navList">
        {navItems.map(([icon, label], index) => (
          <a className={index === 0 ? "navItem active" : "navItem"} href="#" key={label}>
            <span className="navIcon">{icon}</span>
            <span>{label}</span>
          </a>
        ))}
        <a className="navItem more" href="#">
          <span className="navIcon">...</span>
          <span>Ver Mais</span>
          <span className="chevron">›</span>
        </a>
      </nav>

      <div className="sidebarTools">
        <div className="searchBox">
          <span aria-hidden="true">⌕</span>
          <input aria-label="Pesquisar no IGN Brasil" placeholder="Pesquisar no IGN Brasil" />
        </div>
      </div>

      <select className="countrySelect" aria-label="Selecionar país" defaultValue="United States">
        <option>United States</option>
        <option>Brasil</option>
        <option>Portugal</option>
      </select>
    </aside>
  );
}

function HeroCard({ story }) {
  return (
    <article className={`heroCard art ${story.theme}`}>
      <div className="heroArtShape" aria-hidden="true" />
      <h2>{story.title}</h2>
    </article>
  );
}

function StoryCard({ story }) {
  return (
    <article className="storyCard">
      <div className={`storyImage art ${story.theme}`} aria-hidden="true">
        <div className="miniMark" />
      </div>
      <h3>{story.title}</h3>
    </article>
  );
}

function NewsRow({ story }) {
  return (
    <article className="newsRow">
      <div className={`newsImage art ${story.theme}`} aria-hidden="true" />
      <h3>{story.title}</h3>
    </article>
  );
}

export default function Home() {
  return (
    <main>
      <Sidebar />
      <section className="contentShell">
        <section className="heroGrid" aria-label="Matérias principais">
          {heroStories.map((story) => (
            <HeroCard story={story} key={story.title} />
          ))}
        </section>

        <section className="sectionBlock">
          <h1>Mais destaques</h1>
          <div className="storyGrid">
            {featuredStories.map((story) => (
              <StoryCard story={story} key={story.title} />
            ))}
          </div>
        </section>

        <section className="sectionBlock newsBlock">
          <h1>Notícias</h1>
          <div className="newsList">
            {newsStories.map((story) => (
              <NewsRow story={story} key={story.title} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
