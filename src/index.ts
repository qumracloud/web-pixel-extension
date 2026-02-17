import { register } from "@qumra/web-pixels-extension";

register(({ analytics, browser, settings }) => {

    const FACEBOOK_PIXEL_ID = settings.facebook_pixel_id;
    console.log("🚀 ~ FACEBOOK_PIXEL_ID:", FACEBOOK_PIXEL_ID)
    console.log("🚀 ~ FACEBOOK_PIXEL_ID:", FACEBOOK_PIXEL_ID)
    console.log("🚀 ~ FACEBOOK_PIXEL_ID:", FACEBOOK_PIXEL_ID)

    if (!FACEBOOK_PIXEL_ID) {
        console.warn("Facebook Pixel ID not found");
        return;
    }

    analytics.subscribe("all_events", async (event) => {
        try {
            await fetch(
                `https://www.facebook.com/tr/?id=${FACEBOOK_PIXEL_ID}&ev=PageView`,
                {
                    method: "GET",
                    mode: "no-cors"
                }
            );

            console.log("✅ Facebook PageView sent", event);
        } catch (err) {
            console.error("❌ Facebook Pixel error", err);
        }
    });

});
