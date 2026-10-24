export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

// Custom event dispatcher for GA4
export function trackEvent(action: string, params: Record<string, any> = {}) {
  if (typeof window !== "undefined" && (window as any).gtag && GA_TRACKING_ID) {
    (window as any).gtag("event", action, params);
  }
}

// Predefined conversion events
export const analyticsEvents = {
  orderNowClick: (source: string) =>
    trackEvent("order_now_click", { event_category: "Conversion", source }),
  whatsappClick: (source: string, itemCount?: number, orderTotal?: number) =>
    trackEvent("whatsapp_click", {
      event_category: "Conversion",
      source,
      items_count: itemCount ?? 0,
      order_total: orderTotal ?? 0,
    }),
  swiggyClick: (outlet?: string) =>
    trackEvent("swiggy_click", { event_category: "Outbound", outlet: outlet || "general" }),
  zomatoClick: (outlet?: string) =>
    trackEvent("zomato_click", { event_category: "Outbound", outlet: outlet || "general" }),
  outletClick: (outletName: string, actionType: "directions" | "select" | "order") =>
    trackEvent("outlet_interaction", {
      event_category: "Engagement",
      outlet_name: outletName,
      action_type: actionType,
    }),
  categoryChange: (categoryName: string) =>
    trackEvent("menu_category_select", {
      event_category: "Engagement",
      category_name: categoryName,
    }),
  addToTray: (itemName: string, category: string, price: number | null) =>
    trackEvent("add_to_order_tray", {
      event_category: "Ecommerce",
      item_name: itemName,
      item_category: category,
      price: price ?? 0,
    }),
};
