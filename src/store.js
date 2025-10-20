import { create } from "zustand";

import PocketBase from "pocketbase";

const pocketBaseUrl = import.meta.env.VITE_POCKETBASE_URL;
if (!pocketBaseUrl) {
  throw new Error("VITE_POCKETBASE_URL is required");
}

export const pb = new PocketBase(pocketBaseUrl);
pb.autoCancellation(false); 

export const useConfiguratorStore = create((set) => ({
  categories: [],
  currentCategory: null,
  assets: [],
  customization: {},
  fetchCategories: async () => {
    // you can also fetch all records at once via getFullList
    console.log("fetching categories and assets...");
    const categories = await pb.collection("CustomizationGroups").getFullList({
      sort: "created",
    });
    console.log("categories", categories);
    const assets = await pb.collection("CustomizationAssets").getFullList({
      sort: "created",
    });

    console.log("assets", assets);
    // categories.forEach((category) => {
    //   category.assets = assets.filter((asset) => asset.group === category.id);
    // });
    const customization = {};
    categories.forEach((category) => {
      category.assets = assets.filter((asset) => asset.group === category.id);
      customization[category.name] = {};
    });

    set({ categories, currentCategory: categories[0], assets, customization });
  },
  setCurrentCategory: (category) => set({ currentCategory: category }),
  changeAsset: (category, asset) => 
    set((state) => ({
      customization: {
        ...state.customization,
        [category]: {
          ...state.customization[category],
          asset,
        },
      },
    })),
}));