"use client";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import SvgIcon from "@mui/material/SvgIcon";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useState } from "react";

const drawerWidth = "var(--sidebar)";

type NavigationItem = {
  id: number;
  icon: string;
  text: string;
  link: string;
};

type Language = {
  language: string;
  langCode: string;
};

type SidebarProps = {
  menuItems: NavigationItem[];
  languages: Language[];
  currentLanguage: string;
};

export default function Sidebar({
  menuItems,
  languages,
  currentLanguage,
}: SidebarProps) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      aria-label="Navegação principal"
      sx={{
        display: "block",
        flexShrink: 0,
        width: { xs: "100%", md: drawerWidth },
        "& .MuiDrawer-paper": {
          position: { xs: "static", md: "fixed" },
          inset: { md: "0 auto 0 0" },
          boxSizing: "border-box",
          width: { xs: "100%", md: drawerWidth },
          minHeight: { xs: "auto", md: "100vh" },
          px: { xs: 2.25, md: 3 },
          py: { xs: 2.25, md: 4.75 },
          bgcolor: "var(--paper)",
          borderRight: { xs: 0, md: "1px solid #edf0f2" },
          transform: {
            xs: "none",
            md: collapsed ? "translateX(calc(-100% + 20px))" : "none",
          },
          transition: "transform 180ms ease",
          overflowX: "visible",
          zIndex: 10,
        },
      }}
    >
      <IconButton
        type="button"
        aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
        aria-pressed={collapsed}
        onClick={() => setCollapsed((current) => !current)}
        size="small"
        sx={{
          display: { xs: "none", md: "inline-flex" },
          position: "absolute",
          top: 0,
          right: "0px",
          width: 28,
          height: 58,
          bgcolor: "var(--paper)",
          border: "1px solid var(--line)",
          borderLeft: 0,
          borderRadius: "0 999px 999px 0",
          color: "#343b48",
          fontSize: 28,
          lineHeight: 1,
          boxShadow: "8px 8px 18px rgba(20, 26, 35, 0.08)",
          "&:hover": {
            bgcolor: "#f2f4f5",
          },
        }}
      >
        {collapsed ? "›" : "‹"}
      </IconButton>
      <Box
        component="nav"
        sx={{
          position: "relative",
          minHeight: { md: "calc(100vh - 76px)" },
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2.25, md: 4.75 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: "#394150" }}>
          <Typography
            component="span"
            sx={{
              color: "var(--ign)",
              fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
              fontSize: 29,
              lineHeight: 1,
            }}
          >
            IGN
          </Typography>
          <Box
            aria-hidden="true"
            sx={{
              width: 23,
              height: 23,
              border: "5px dotted var(--ign)",
              borderRadius: "50%",
              transform: "rotate(20deg)",
            }}
          />
          <Typography component="strong" sx={{ fontSize: 16, fontWeight: 700 }}>
            Brasil
          </Typography>
        </Box>


        <List
          disablePadding
          sx={{
            display: "grid",
            gap: 0.125,
            gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: "1fr" },
          }}
        >
          {menuItems.map((item, index) => (
            <Tooltip
              title={collapsed ? item.text : ""}
              placement="right"
              key={item.id}
            >
              <ListItemButton
                component="a"
                href={item.link}
                selected={index === 0}
                sx={{
                  minHeight: 41,
                  borderRadius: "var(--radius)",
                  px: 1.5,
                  py: 1,
                  gap: 1.75,
                  color: "#4b5568",
                  transition: "background 160ms ease, color 160ms ease, transform 160ms ease",
                  "&:hover": {
                    bgcolor: "#dfe2e5",
                    transform: "translateX(2px)",
                  },
                  "&.Mui-selected": {
                    bgcolor: "#dfe2e5",
                    color: "#404858",
                  },
                  "&.Mui-selected:hover": {
                    bgcolor: "#dfe2e5",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 17, width: 17, color: "inherit" }}>
                  <MenuGlyph path={item.icon} active={index === 0} />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: 16,
                        fontWeight: 500,
                        color: "inherit",
                      },
                    },
                  }}
                />
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
        <Select
          aria-label="Selecionar idioma"
          value={currentLanguage}
          onChange={(event) => {
            router.push(`/${encodeURIComponent(event.target.value)}`);
          }}
          size="small"
          sx={{
            // mt: "auto",
            width: "100%",
            bgcolor: "var(--paper)",
            color: "#3f4655",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#6c737f",
            },
          }}
        >
          {languages.map((language) => (
            <MenuItem value={language.langCode} key={language.langCode}>
              {language.language}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Drawer>
  );
}

function MenuGlyph({ path, active }: { path: string; active: boolean }) {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      sx={{
        width: 17,
        height: 17,
        color: active ? "#4b5568" : "#495265",
      }}
    >
      <path d={path} />
    </SvgIcon>
  );
}
