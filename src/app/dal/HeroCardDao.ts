import "dotenv/config";

type CmsHeroCard = {
  id: number;
  contentTypeId: string;
  fields: {
    Title?: string;
    Image?: string;
    Color?: string;
    Link?: string;
  };
};

type CmsResponse = {
  content?: CmsHeroCard[];
};

export default class HeroCardsDao {
  public async getHeroCardsWithoutId(_languageCode: string) {
    const token = process.env.CONTENT_API_KEY;

    if (!token) {
      throw new Error(
        "CONTENT_API_KEY is not set. Add it to .env before querying hero cards.",
      );
    }

    const response = await fetch(
      "https://basic-cms-blackstar-citadel.vercel.app/api/content",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch hero cards: ${response.status} ${response.statusText}`,
      );
    }

    const data = (await response.json()) as CmsResponse;

    return (data.content ?? [])
      .filter((item) => item.contentTypeId === "hero_card")
      .map((item) => ({
        background_image: item.fields.Image ?? "",
        overlay_color: item.fields.Color ?? "#111111",
        title: item.fields.Title ?? "",
        link: item.fields.Link ?? "#",
      }));
  }
}