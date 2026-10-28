export type AccessoryCategory = "Hats" | "Face" | "Body" | "Extras";

export interface Accessory {
  id: string;
  name: string;
  file: string;
  category: AccessoryCategory;
}

export const accessoryCategories: AccessoryCategory[] = [
  "Hats",
  "Face",
  "Body",
  "Extras",
];

// Accessories are drawn at the scale of a 128px bufo, so their natural size
// is a good starting size on a 128px canvas.
export const accessories: Accessory[] = [
  { id: "top-hat", name: "Top Hat", file: "/accessories/top-hat.png", category: "Hats" },
  { id: "baseball-cap", name: "Baseball Cap", file: "/accessories/baseball-cap.png", category: "Hats" },
  { id: "detective-hat", name: "Fedora", file: "/accessories/detective-hat.png", category: "Hats" },
  { id: "hard-hat", name: "Hard Hat", file: "/accessories/hard-hat.png", category: "Hats" },
  { id: "fire-helmet", name: "Fire Helmet", file: "/accessories/fire-helmet.png", category: "Hats" },
  { id: "party-hat", name: "Party Hat", file: "/accessories/party-hat.png", category: "Hats" },
  { id: "gold-crown", name: "Gold Crown", file: "/accessories/gold-crown.png", category: "Hats" },
  { id: "paper-crown", name: "Paper Crown", file: "/accessories/paper-crown.png", category: "Hats" },
  {
    id: "deal-with-it-glasses",
    name: "Deal With It Glasses",
    file: "/accessories/deal-with-it-glasses.png",
    category: "Face",
  },
  { id: "mustache", name: "Mustache", file: "/accessories/mustache.png", category: "Face" },
  { id: "clown-nose", name: "Clown Nose", file: "/accessories/clown-nose.png", category: "Face" },
  { id: "face-mask", name: "Face Mask", file: "/accessories/face-mask.png", category: "Face" },
  { id: "eyes", name: "Bufo Eyes", file: "/accessories/eyes.png", category: "Face" },
  { id: "emoji-eyes", name: "Big Eyes", file: "/accessories/emoji-eyes.png", category: "Face" },
  { id: "bloodshot-eyes", name: "Bloodshot Eyes", file: "/accessories/bloodshot-eyes.png", category: "Face" },
  { id: "sweat-drop", name: "Sweat Drop", file: "/accessories/sweat-drop.png", category: "Face" },
  { id: "offering-arm", name: "Offering Arm", file: "/accessories/offering-arm.png", category: "Body" },
  { id: "grabbing-hand", name: "Grabbing Hand", file: "/accessories/grabbing-hand.png", category: "Body" },
  { id: "pointing-hand", name: "Finger Gun", file: "/accessories/pointing-hand.png", category: "Body" },
  { id: "raised-hand", name: "Raised Hand", file: "/accessories/raised-hand.png", category: "Body" },
  { id: "praying-hands", name: "Praying Hands", file: "/accessories/praying-hands.png", category: "Body" },
  { id: "foot", name: "Foot", file: "/accessories/foot.png", category: "Body" },
  { id: "bow-tie", name: "Bow Tie", file: "/accessories/bow-tie.png", category: "Extras" },
  { id: "heart", name: "Heart", file: "/accessories/heart.png", category: "Extras" },
  { id: "party-horn", name: "Party Horn", file: "/accessories/party-horn.png", category: "Extras" },
  { id: "thinking-bubble", name: "Thought Bubble", file: "/bufos/thinking-bubble.png", category: "Extras" },
];
