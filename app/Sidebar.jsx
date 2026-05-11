"use client";

import { useState } from "react";

const navItems = [
  ["home", "Início"],
];

export default function Sidebar() {
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
      </nav>
    </aside>
  );
}
