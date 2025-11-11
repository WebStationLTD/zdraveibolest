import mailchimp from "@mailchimp/mailchimp_marketing";

// Set up Mailchimp with environment variables (server-side)
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // Example: "us8"
});

/**
 * Subscribes a user to the Mailchimp list
 * @param {string} email - The user's email
 * @returns {Object} - { success: true/false, message: string }
 */
export async function subscribeUser(email) {
  try {
    const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: "subscribed",
    });

    return { success: true, message: "Successfully subscribed!" };
  } catch (error) {
    return { success: false, message: error.response?.text || "Subscription failed." };
  }
}