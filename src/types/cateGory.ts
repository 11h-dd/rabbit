import type { Goods } from "./Goods";

export interface CateGory {
  id: string;
  name: string;
  picture: string;
  children: CateGory[] | undefined;
  goods: Goods | undefined;
}
