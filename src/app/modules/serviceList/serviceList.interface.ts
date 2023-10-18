import { Model } from "mongoose";

export type IServiceList = {
  title: string;
  description: string;
  images?: string;
  price: string;
  availability: "available" | "not available";
  rating: string;
  tag?: string[];
};

export type ServiceListModel = Model<IServiceList, Record<string, unknown>>;

export type IServiceListFilters = {
  searchTerm?: string;
};
