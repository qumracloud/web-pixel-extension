import { register } from "@qumra/web-pixels-extension";

// ───────────────────────────────────────────────────────────────
// Qumra Web Pixel Extension — Default Template
// ───────────────────────────────────────────────────────────────
//
// هذا القالب الافتراضي لإنشاء Web Pixel Extension على منصة قمرة.
//
// الـ Extension يعمل داخل sandbox معزول ويستقبل أحداث (Events)
// من المتجر مثل: مشاهدة صفحة، إضافة للسلة، إتمام الشراء... إلخ.
//
// يمكنك استخدام هذا القالب كنقطة بداية لربط أي منصة تحليلات
// أو تتبع (مثل Facebook Pixel, Google Analytics, TikTok... إلخ).
//
// ── الأحداث المتاحة (Available Events) ─────────────────────────
//
// Standard Events:
//   page_viewed                        — عند مشاهدة أي صفحة
//   product_viewed                     — عند مشاهدة منتج
//   product_added_to_cart              — عند إضافة منتج للسلة
//   product_removed_from_cart          — عند إزالة منتج من السلة
//   cart_viewed                        — عند مشاهدة السلة
//   cart_updated                       — عند تحديث السلة
//   checkout_started                   — عند بدء الدفع
//   checkout_completed                 — عند إتمام الشراء
//   checkout_address_info_submitted    — عند إدخال العنوان
//   checkout_contact_info_submitted    — عند إدخال بيانات التواصل
//   checkout_shipping_info_submitted   — عند إدخال بيانات الشحن
//   payment_info_submitted             — عند إدخال بيانات الدفع
//   collection_viewed                  — عند مشاهدة تصنيف
//   search_submitted                   — عند البحث
//
// Aggregate Events:
//   all_events                         — جميع الأحداث
//   all_standard_events                — جميع الأحداث القياسية
//   all_custom_events                  — جميع الأحداث المخصصة
//   all_dom_events                     — جميع أحداث DOM
//
// DOM Events:
//   clicked                            — عند النقر
//   form_submitted                     — عند إرسال نموذج
//   input_changed / input_focused / input_blurred
//
// ── الـ API المتاح ──────────────────────────────────────────────
//
//   api.on(eventName, callback)   — الاشتراك في حدث معين
//   browser.cookie                — الوصول للكوكيز
//   browser.localStorage          — الوصول للتخزين المحلي
//   browser.sessionStorage        — الوصول لتخزين الجلسة
//   browser.sendBeacon(url, body) — إرسال بيانات (deprecated, استخدم fetch)
//   browser.loadScript(src)       — تحميل سكريبت خارجي
//   init.data.shop                — بيانات المتجر
//   init.data.customer            — بيانات العميل (إن وُجد)
//   init.data.cart                — بيانات السلة (إن وُجدت)
//   init.context                  — بيانات المتصفح والصفحة
//   settings                      — الإعدادات المُعرَّفة في extension-manifest.json
//
// ───────────────────────────────────────────────────────────────

register(({ api, browser, settings, init }) => {

    // ── 1. التحقق من الإعدادات المطلوبة ──────────────────────────
    // قم باضافة pixelId الى ملف manifest.json
    const pixelId = settings.pixel_id;
    if (!pixelId) {
        console.warn("[WebPixel] Pixel ID is missing. Please configure it in the extension settings.");
        return;
    }

    // ── 2. تحميل سكريبت منصة التتبع (مثال) ───────────────────────
    // يمكنك تحميل أي سكريبت خارجي هنا، مثل Facebook Pixel أو غيره.
    // مثال:
    //   await browser.loadScript("https://example.com/pixel.js");

    // ── 3. الاشتراك في الأحداث ────────────────────────────────────

    // مشاهدة صفحة — PageView
    api.on("page_viewed", (event) => {
        console.log("[WebPixel] Page Viewed", {
            title: init.context.document.title,
            url: init.context.document.location.href,
            timestamp: event.timestamp,
        });

        // مثال: إرسال حدث PageView لمنصة التتبع
        // fbq("track", "PageView");
    });

    // مشاهدة منتج — ViewContent
    api.on("product_viewed", (event) => {
        console.log("[WebPixel] Product Viewed", event.data);

        // مثال: إرسال حدث ViewContent
        // fbq("track", "ViewContent", {
        //   content_ids: [event.data.productVariant?.id],
        //   content_name: event.data.productVariant?.product?.title,
        //   content_type: "product",
        //   value: event.data.productVariant?.price?.amount,
        //   currency: event.data.productVariant?.price?.currencyCode,
        // });
    });

    // إضافة منتج للسلة — AddToCart
    api.on("product_added_to_cart", (event) => {
        console.log("[WebPixel] Product Added to Cart", event.data);

        // مثال: إرسال حدث AddToCart
        // fbq("track", "AddToCart", {
        //   content_ids: [event.data.cartLine?.merchandise?.id],
        //   content_name: event.data.cartLine?.merchandise?.product?.title,
        //   content_type: "product",
        //   value: event.data.cartLine?.cost?.totalAmount?.amount,
        //   currency: event.data.cartLine?.cost?.totalAmount?.currencyCode,
        // });
    });

    // بدء عملية الدفع — InitiateCheckout
    api.on("checkout_started", (event) => {
        console.log("[WebPixel] Checkout Started", event.data);

        // مثال: إرسال حدث InitiateCheckout
        // fbq("track", "InitiateCheckout", {
        //   value: event.data.checkout?.totalPrice?.amount,
        //   currency: event.data.checkout?.currencyCode,
        //   num_items: event.data.checkout?.lineItems?.length,
        // });
    });

    // إدخال بيانات الدفع — AddPaymentInfo
    api.on("payment_info_submitted", (event) => {
        console.log("[WebPixel] Payment Info Submitted", event.data);

        // مثال:
        // fbq("track", "AddPaymentInfo");
    });

    // إتمام الشراء — Purchase
    api.on("checkout_completed", (event) => {
        console.log("[WebPixel] Checkout Completed", event.data);

        // مثال: إرسال حدث Purchase
        // fbq("track", "Purchase", {
        //   value: event.data.checkout?.totalPrice?.amount,
        //   currency: event.data.checkout?.currencyCode,
        //   content_ids: event.data.checkout?.lineItems?.map(
        //     (item) => item.variant?.id
        //   ),
        //   content_type: "product",
        //   num_items: event.data.checkout?.lineItems?.length,
        // });
    });

    // البحث — Search
    api.on("search_submitted", (event) => {
        console.log("[WebPixel] Search Submitted", event.data);

        // مثال:
        // fbq("track", "Search", {
        //   search_string: event.data.searchResult?.query,
        // });
    });

    // مشاهدة تصنيف — ViewCategory
    api.on("collection_viewed", (event) => {
        console.log("[WebPixel] Collection Viewed", event.data);
    });

    // إزالة منتج من السلة
    api.on("product_removed_from_cart", (event) => {
        console.log("[WebPixel] Product Removed from Cart", event.data);
    });
});
