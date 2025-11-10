import { fetchAPI } from "./api";
import { cache } from "react";

/**
 * Get all members
 * @returns {Promise<Array>} - List of members
 */
export const getMembers = cache(async () => {
  try {
    const fetchedMembers = await fetchAPI(
      "members?_fields=id,acf,slug&acf_format=standard",
      {
        next: { revalidate: 3600 },
      }
    );

    if (!fetchedMembers || !Array.isArray(fetchedMembers)) {
      console.error("API returned invalid members data:", fetchedMembers);
      return [];
    }

    return fetchedMembers.map((member) => ({
      id: member.id || 0,
      name: member.acf?.name || null,
      position: member.acf?.position || null,
      description: member.acf?.description || null,
      phonenumber: member.acf?.phonenumber || null,
      email: member.acf?.email || null,
      linkedin: {
        title: member.acf?.linkedin?.title || null,
        url: member.acf?.linkedin?.url || null,
        target: member.acf?.linkedin?.target || "_blank",
      },
      slug: member.slug || null,
      profilepicture: member.acf?.profilepicture || "/placeholder.webp",
    }));
  } catch (error) {
    console.error("Error fetching members:", error);
    return [];
  }
});

/**
 * Get single member by slug
 * @param {string} slug - Member slug
 * @returns {Promise<Object|null>} - Member data
 */
export const getMemberInfo = cache(async (slug) => {
  try {
    if (!slug) {
      console.error("No slug provided to getMemberInfo");
      return null;
    }

    // Fetch new data from API
    const data = await fetchAPI(
      `members?slug=${slug}&_fields=acf&acf_format=standard`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!data || !Array.isArray(data) || data.length === 0) {
      console.error("API returned invalid member data for slug:", slug, data);
      return null;
    }

    // Ensure all properties are defined and not empty strings
    const memberData = data[0]?.acf || null;

    if (!memberData) return null;

    return {
      name: memberData.name || null,
      position: memberData.position || null,
      description: memberData.description || null,
      phonenumber: memberData.phonenumber || null,
      email: memberData.email || null,
      linkedin: {
        title: memberData.linkedin?.title || null,
        url: memberData.linkedin?.url || null,
        target: memberData.linkedin?.target || "_blank",
      },
      profilepicture: memberData.profilepicture || "/placeholder.webp",
    };
  } catch (error) {
    console.error("Error fetching member info:", error);
    return null;
  }
});
