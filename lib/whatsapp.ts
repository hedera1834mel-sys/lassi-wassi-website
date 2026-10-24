export const OFFICIAL_WHATSAPP_NUMBER = "919860252911";
export const DISPLAY_WHATSAPP_NUMBER = "+91 98602 52911";

export interface OrderItem {
  id: string;
  name: string;
  price: number | null;
  quantity: number;
  category: string;
}

export function buildWhatsAppOrderLink(
  items: OrderItem[],
  outlet?: string,
  specialInstructions?: string
): string {
  if (!items || items.length === 0) {
    const generalText = `Hi Lassi Wassi! 👋 I'd like to place an order for delivery/takeaway${
      outlet ? ` at the ${outlet} outlet` : ""
    }. Could you share the latest availability?`;
    return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(
      generalText
    )}`;
  }

  let text = `🔥 *NEW ORDER — LASSI WASSI PUNE* 🔥\n`;
  if (outlet) {
    text += `📍 *Outlet:* ${outlet}\n`;
  }
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;

  let total = 0;
  let hasUnverifiedPrice = false;

  items.forEach((item, index) => {
    const itemTotal =
      item.price !== null ? item.price * item.quantity : null;
    if (itemTotal !== null) {
      total += itemTotal;
      text += `${index + 1}. *${item.name}* × ${item.quantity} = ₹${itemTotal}\n`;
    } else {
      hasUnverifiedPrice = true;
      text += `${index + 1}. *${item.name}* × ${item.quantity} (Price upon order)\n`;
    }
  });

  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  if (total > 0) {
    text += `💰 *Subtotal:* ₹${total}${
      hasUnverifiedPrice ? " (+ unverified items)" : ""
    }\n`;
  }
  if (specialInstructions && specialInstructions.trim()) {
    text += `📝 *Notes:* ${specialInstructions.trim()}\n`;
  }
  text += `\nPlease confirm availability and delivery time! 🙏`;

  return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    text
  )}`;
}

export function buildGeneralWhatsAppLink(message?: string): string {
  const defaultMsg =
    message ||
    "Hi Lassi Wassi! 👋 I'd like to know more about your menu, today's specials, and outlet timings.";
  return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    defaultMsg
  )}`;
}
