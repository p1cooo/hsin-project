import { b, type Bi, type Lang } from "./i18n";
import { media } from "./media";

/**
 * Central business details. Confirm the advertised WhatsApp recipient
 * with the agency before public launch.
 */
export const business = {
  name: "Hsin Travel & Tours Sdn. Bhd.",
  shortName: "Hsin Travel",
  chineseName: "欣旅游",
  addressLines: ["Lot G19, Ground Floor,", "Kompleks Desa, Jalan Kepong,", "52100 Kuala Lumpur, Malaysia."],
  phoneDisplay: "+60 3-6275 7615",
  phoneHref: "tel:+60362757615",
  whatsappContact: "Mr. Chin",
  whatsappDisplay: "+60 12-297 5187",
  whatsappNumber: "60122975187",
  facebook: "https://www.facebook.com/HsinTravelToursSdnBhd/",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Kompleks Desa, Jalan Kepong, 52100 Kuala Lumpur, Malaysia"),
  logoSrc: media.logo,
};

export const waLink = (text?: string) =>
  `https://wa.me/${business.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const waGreeting = (lang: Lang) => ({
  en: "Hello Hsin Travel! 👋\n\nI would like to enquire about your travel and transportation services.",
  zh: "你好，欣旅游！👋\n\n我想咨询有关旅游或包车接送的服务，谢谢！",
})[lang];

export const images = media;

/** Destination inspiration — NOT bookable packages. Replace with real packages when approved. */
export type Tour = {
  id: string;
  name: Bi;
  country: Bi;
  theme: Bi;
  text: Bi;
  img: string;
  alt: string;
  /** Fill these in only with confirmed package details. */
  duration?: Bi;
  priceFrom?: string;
  departure?: string;
  isPackage?: boolean;
};

export const tours: Tour[] = [
  { id: "langkawi", name: b("Langkawi", "浮罗交怡"), country: b("Malaysia", "马来西亚"), theme: b("Island Escapes", "海岛度假"), text: b("Tropical coastlines, scenic beaches and relaxing ocean views.", "热带海岸、迷人沙滩与宁静海景。"), img: media.langkawi, alt: "Longtail boat on a white-sand Langkawi beach beneath limestone cliffs" },
  { id: "penang", name: b("Penang", "槟城"), country: b("Malaysia", "马来西亚"), theme: b("Culture & Heritage", "文化古迹"), text: b("Historic streets, renowned food culture and local charm.", "历史老街、著名美食与独特风情。"), img: media.penang, alt: "Trishaw beside heritage shophouses in George Town, Penang" },
  { id: "singapore", name: b("Singapore", "新加坡"), country: b("Singapore", "新加坡"), theme: b("City Discoveries", "城市探索"), text: b("Iconic waterfront skylines, gardens and vibrant neighbourhoods.", "标志性海滨天际线、花园与缤纷街区。"), img: media.singapore, alt: "Marina Bay skyline and Gardens by the Bay at sunset" },
  { id: "thailand", name: b("Thailand", "泰国"), country: b("Thailand", "泰国"), theme: b("Temples & Rivers", "寺庙与河畔"), text: b("Golden temples, river life and colourful markets.", "金色寺庙、河畔风情与热闹市集。"), img: media.thailand, alt: "Golden temple roofs beside a river in Bangkok with a long-tail boat" },
  { id: "cameron", name: b("Cameron Highlands", "金马仑高原"), country: b("Malaysia", "马来西亚"), theme: b("Nature Retreats", "自然之旅"), text: b("Rolling tea plantations and cool mountain air.", "连绵茶园与清凉山风。"), img: media.cameron, alt: "Misty tea plantation hills in the Cameron Highlands" },
  { id: "sabah", name: b("Sabah", "沙巴"), country: b("Malaysia", "马来西亚"), theme: b("Natural Wonders", "自然奇观"), text: b("Dramatic landscapes and tropical adventures.", "壮丽山川与热带探险。"), img: media.sabah, alt: "Mount Kinabalu rising above rainforest in Sabah" },
];

export const destinationOptions: Bi[] = [
  ...tours.map((t) => t.name),
  b("Kuala Lumpur", "吉隆坡"),
  b("Other / Not sure yet", "其他 / 尚未决定"),
];

export type VanServiceId = "rental" | "airport" | "sightseeing" | "group" | "other";
export const vanServices: { id: VanServiceId; title: Bi; text: Bi }[] = [
  { id: "rental", title: b("Tourist Van Rental", "旅游包车服务"), text: b("For travel groups, families and passenger transportation enquiries.", "适合旅游团、家庭及各类载客出行咨询。") },
  { id: "airport", title: b("Airport Transfer", "机场接送"), text: b("For customers arranging pickup or drop-off at airports.", "为需要机场接机或送机的旅客安排。") },
  { id: "sightseeing", title: b("Sightseeing Transportation", "旅游观光接送"), text: b("For visiting destinations and attractions.", "前往各大景点与旅游目的地。") },
  { id: "group", title: b("Group Travel Transport", "团体交通服务"), text: b("For groups wanting to enquire about transportation arrangements.", "为团体出行咨询交通安排。") },
];
export const otherService = { id: "other" as const, title: b("Other transport enquiry", "其他交通咨询") };

/**
 * Fleet entries. Photos are from Hsin Travel's public Facebook posts.
 * Leave capacity fields undefined until the company confirms them.
 */
export type Vehicle = {
  id: string;
  name: Bi;
  description: Bi;
  passengers?: Bi;
  luggage?: Bi;
  photos: { src: string; alt: Bi }[];
};

export const fleet: Vehicle[] = [
  {
    id: "passenger-van",
    name: b("White & Green Passenger Vans", "白绿色旅游客车"),
    description: b(
      "Passenger vans used for tourist van rental, airport transfers and group transport. Seating and luggage space vary by vehicle — ask when you enquire.",
      "用于旅游包车、机场接送及团体交通的客车。座位与行李空间因车而异，咨询时可详细了解。",
    ),
    photos: [
      { src: media.fleetLineup, alt: b("A row of white-and-green passenger vans parked together", "一排停放整齐的白绿色客车") },
      { src: media.vanLuggage, alt: b("Open rear of a passenger van with suitcases ready to load", "打开后门的客车与待装载的行李箱") },
    ],
  },
  {
    id: "hyundai-mpv",
    name: b("White Hyundai Passenger Vehicle", "白色现代载客车"),
    description: b(
      "A white Hyundai passenger vehicle with beige interior seating, suited to smaller groups and families. Seating details to be confirmed.",
      "白色现代载客车，配备米色内饰座椅，适合小团体与家庭出行。座位详情待确认。",
    ),
    photos: [
      { src: media.hyFront, alt: b("Front view of the white Hyundai passenger vehicle", "白色现代载客车正面") },
      { src: media.hyRear, alt: b("Rear three-quarter view of the white Hyundai passenger vehicle", "白色现代载客车后侧面") },
      { src: media.hyPassengerSeats, alt: b("Beige Hyundai passenger seating", "现代载客车的米色乘客座椅") },
      { src: media.hyArmrests, alt: b("Hyundai passenger seats with armrests and cupholders", "现代载客车配有扶手与杯架的乘客座椅") },
      { src: media.hyFrontSeats, alt: b("Hyundai front driver and passenger seats", "现代载客车的前排驾驶员与乘客座椅") },
      { src: media.hyDashboard, alt: b("Hyundai dashboard and front cabin", "现代载客车的仪表台与前排驾驶舱") },
    ],
  },
];

export const navLinks: { label: Bi; href: string }[] = [
  { label: b("Home", "首页"), href: "#home" },
  { label: b("Tour Packages", "旅游配套"), href: "#tours" },
  { label: b("Van Rental", "旅游包车"), href: "#van" },
  { label: b("Our Fleet", "我们的车队"), href: "#fleet" },
  { label: b("Contact", "联系我们"), href: "#contact" },
];
