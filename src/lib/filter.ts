import type { Breed, Origin, Puppy } from "@/data/site";

export type PuppyFilters = { origin?: Origin | undefined; breed?: Breed | undefined; sex?: "boy" | "girl" | undefined };

export function filterPuppies(list: Puppy[], f: PuppyFilters) {
  return list.filter(
    (p) =>
      (!f.origin || p.origin === f.origin) &&
      (!f.breed || p.breeds.includes(f.breed)) &&
      (!f.sex || p.sex === f.sex || p.sex === "boy & girl"),
  );
}
