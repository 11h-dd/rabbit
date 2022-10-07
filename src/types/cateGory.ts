import type { Goods } from "./Goods";
import type { Brands } from "./Brands";
export interface CateGory {
  id: string;
  name: string;
  picture: string;
  saleInfo: string;
  children: CateGory[] | undefined;
  goods: Goods[] | undefined;
  saleProperties: SaleProperty[];
  brands: Brands[];
}
interface SaleProperty {
  id: string;
  name: string;
  properties: Omit<SaleProperty, "properties">[];
}
