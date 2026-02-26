//@ts-ignore
import mailchimp from '@mailchimp/mailchimp_marketing';
import type { APIRoute } from "astro";

const api = import.meta.env.MAILCHIMP_API ?? process.env.MAILCHIMP_API;
const server = import.meta.env.MAILCHIMP_SERVER ?? process.env.MAILCHIMP_SERVER;
const audienceID = import.meta.env.MAILCHIMP_AUDIENCEID ?? process.env.MAILCHIMP_AUDIENCEID;
const tag = import.meta.env.MAILCHIMP_TAG ?? process.env.MAILCHIMP_TAG;

mailchimp.setConfig({
  apiKey: api,
  server: server,
});

export const prerender = false; // Not needed in 'server' mode

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const email = data.get("newsletter-input");

    try {
        if (!email || typeof email !== "string") {
            console.error("Subscription unsuccessful. Invalid email input.");
            return new Response(null, { status: 400 });
        }

        await mailchimp.lists.setListMember(audienceID, email, {
            email_address: email,
            status_if_new: "subscribed",
            status: "subscribed",
            tags: [tag]
        });

        console.log("Email successfully subscribed to mailing list!");
        return new Response(null, { status: 200 });
    } catch (error) {
        console.error("Subscription unsuccessful. Mailchimp error.");
        return new Response(null, { status: 400 });
    }

};