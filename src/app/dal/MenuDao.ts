import "dotenv/config";

type CmsMenuItem = {
  id: number;
  contentTypeId: string;
  fields: {
    SVG?: string;
    Title?: string;
    Link?: string;
  };
};

type CmsResponse = {
  content?: CmsMenuItem[];
};

export default class MenuDao {
  public async getMenuItems() {
    const token = process.env.CONTENT_API_KEY;

    if (!token) {
      throw new Error(
        "CONTENT_API_KEY is not set. Add it to .env before querying menu items.",
      );
    }

    const response = await fetch(
      "https://basic-cms-blackstar-citadel.vercel.app/api/menu",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch menu items: ${response.status} ${response.statusText}`,
      );
    }

    const data = (await response.json()) as CmsResponse;

    return (data.content ?? [])
      .filter((item) => item.contentTypeId === "menu")
      .map((item) => ({
        id: item.id,
        icon: item.fields.SVG ?? "",
        text: item.fields.Title ?? "",
        link: item.fields.Link ?? "#",
      }));
  }
}
