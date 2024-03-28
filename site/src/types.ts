import { Tag } from "../../data/pipeline/BufoData";

export type BufoDetails = {
  name: string;
  filename: string;
  tags: Set<Tag>;
  image: string;
};
