export type TIndexData = {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: {
    title: string;
    description?: string;
    authors?: string[];
    categories: string[];
    tags?: string[];
    meta_title?: string;
    image: string;
  };
  render: () => Promise<void>;
};
