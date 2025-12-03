import Navigation from "./nav";
import { getServices } from "../services/services";

export default async function NavigationWrapper() {
  let therapeuticAreas = [];

  try {
    therapeuticAreas = await getServices();
  } catch (error) {
    console.error("Error fetching therapeutic areas for navigation:", error);
  }

  return <Navigation therapeuticAreas={therapeuticAreas} />;
}



