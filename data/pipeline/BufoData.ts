export type Tag =
  | "accessories"
  | "acknowledgement"
  | "agree"
  | "all-the"
  | "amogus"
  | "anger"
  | "angry"
  | "animal"
  | "animated"
  | "anime"
  | "anthropomorphic"
  | "anxiety"
  | "approve"
  | "appreciation"
  | "arrival"
  | "astonishment"
  | "avoids-you"
  | "awkward"
  | "baby"
  | "back"
  | "bad"
  | "birthday"
  | "blank-stare"
  | "boba"
  | "bonk"
  | "bow"
  | "but-instead"
  | "but-you-can-see"
  | "cannibalism"
  | "celebration"
  | "chonker"
  | "christmas"
  | "clown"
  | "confused"
  | "cool"
  | "core"
  | "country"
  | "covid"
  | "cozy"
  | "cry"
  | "cursed"
  | "cute"
  | "dance"
  | "disagree"
  | "disbelief"
  | "discomfort"
  | "dislike"
  | "drink"
  | "drowning"
  | "emergency"
  | "encouragement"
  | "evil"
  | "excited"
  | "fancy"
  | "farewell"
  | "feel-better"
  | "fight"
  | "fire"
  | "food"
  | "found-something"
  | "fruit"
  | "gandalf"
  | "gratitude"
  | "greetings"
  | "hacker"
  | "happy"
  | "has-a"
  | "high-quality"
  | "holiday"
  | "horror"
  | "hotdog"
  | "ice"
  | "inspirational"
  | "je-ne-sais-quoi"
  | "jealous"
  | "judging"
  | "kills-you"
  | "laugh"
  | "like"
  | "love"
  | "low-fi"
  | "magic"
  | "mario"
  | "meme"
  | "meta"
  | "money"
  | "music"
  | "offers"
  | "outrage"
  | "pain"
  | "panic"
  | "plead"
  | "pout"
  | "pray"
  | "profession"
  | "punishment"
  | "rage"
  | "reference"
  | "religion"
  | "request"
  | "rubber-stamp"
  | "sad"
  | "sarcasam"
  | "shock"
  | "skepticism"
  | "smart"
  | "software-reference"
  | "space"
  | "sports"
  | "stab"
  | "star-wars"
  | "stonks"
  | "sus"
  | "sword"
  | "take-a-look"
  | "takes-your"
  | "tired"
  | "trapped"
  | "ui"
  | "unsure"
  | "unsure"
  | "upset"
  | "vegetable"
  | "void"
  | "worry"
  | "year";

export type BufoDetails = BufoMetadata & {
  image: string;
};

type BufoMetadata = {
  name: string;
  tags: Tag[];
  skip?: boolean;
};

export const BufoMetadata: BufoMetadata[] = [
  {
    name: "add-bufo.png",
    tags: ["request", "ui"],
  },
  {
    name: "all-the-bufo.png",
    tags: ["all-the", "reference"],
    skip: true,
  },
  {
    name: "angry-karen-bufo-would-like-to-speak-with-your-manager.png",
    tags: ["reference"],
    skip: true,
  },
  {
    name: "australian-bufo.png",
    tags: ["reference", "accessories"],
  },
  {
    name: "awesomebufo.png",
    tags: ["sarcasam"],
  },
  {
    name: "be-the-bufo-you-want-to-see.png",
    tags: ["inspirational", "encouragement"],
  },
  {
    name: "bigbufo_0_0.png",
    tags: [],
    skip: true,
  },
  {
    name: "bigbufo_0_1.png",
    tags: [],
    skip: true,
  },
  {
    name: "bigbufo_0_2.png",
    tags: [],
    skip: true,
  },
  {
    name: "bigbufo_0_3.png",
    tags: [],
    skip: true,
  },
  {
    name: "bigbufo_1_0.png",
    tags: [],
    skip: true,
  },
  {
    name: "bigbufo_1_1.png",
    tags: [],
    skip: true,
  },
  {
    name: "bigbufo_1_2.png",
    tags: [],
    skip: true,
  },
  {
    name: "bigbufo_1_3.png",
    tags: [],
    skip: true,
  },
  {
    name: "bigbufo_2_0.png",
    tags: [],
    skip: true,
  },
  {
    name: "bigbufo_2_1.png",
    tags: [],
    skip: true,
  },
  {
    name: "bigbufo_2_2.png",
    tags: [],
    skip: true,
  },
  {
    name: "bigbufo_2_3.png",
    tags: [],
    skip: true,
  },
  {
    name: "bigbufo_3_0.png",
    tags: [],
    skip: true,
  },
  {
    name: "bigbufo_3_1.png",
    tags: [],
    skip: true,
  },
  {
    name: "bigbufo_3_2.png",
    tags: [],
    skip: true,
  },
  {
    name: "bigbufo_3_3.png",
    tags: [],
    skip: true,
  },
  {
    name: "blockheads-bufo.png",
    tags: ["reference"],
    skip: true,
  },
  {
    name: "breaking-bufo.png",
    tags: ["reference"],
  },
  {
    name: "bufo+1.png",
    tags: ["encouragement", "agree", "core"],
  },
  {
    name: "bufo-0-10.png",
    tags: ["anger", "dislike"],
  },
  {
    name: "bufo-10.png",
    tags: ["encouragement", "approve", "like"],
  },
  {
    name: "bufo-2022.png",
    tags: ["reference", "year", "accessories"],
  },
  {
    name: "bufo-ack.png",
    tags: ["acknowledgement", "core"],
  },
  {
    name: "bufo-actually.png",
    tags: ["disagree"],
  },
  {
    name: "bufo-adidas.png",
    tags: ["reference"],
    skip: true,
  },
  {
    name: "bufo-ages-rapidly-in-the-void.png",
    tags: ["void", "disbelief", "shock"],
  },
  {
    name: "bufo-aight-imma-head-out.gif",
    tags: ["farewell", "animated", "avoids-you"],
  },
  {
    name: "bufo-airpods.png",
    tags: ["avoids-you"],
  },
  {
    name: "bufo-alarma.gif",
    tags: ["panic", "core", "emergency", "animated"],
  },
  {
    name: "bufo-all-good.png",
    tags: ["cry", "sad", "core", "acknowledgement"],
  },
  {
    name: "bufo-all-warm-and-fuzzy-inside.png",
    tags: ["love", "core", "happy"],
  },
  {
    name: "bufo-am-i.png",
    tags: ["reference", "star-wars"],
  },
  {
    name: "bufo-amaze.gif",
    tags: ["astonishment", "core", "animated"],
  },
  {
    name: "bufo-ambiently-existing.png",
    tags: ["high-quality", "anxiety", "blank-stare", "worry"],
  },
  {
    name: "bufo-american-football.png",
    tags: ["sports"],
  },
  {
    name: "bufo-angel.png",
    tags: ["plead", "religion"],
  },
  {
    name: "bufo-angrily-gives-you-a-birthday-gift.png",
    tags: ["anger", "jealous"],
  },
  {
    name: "bufo-angry-bullfrog-screech.gif",
    tags: ["anger", "animated", "outrage", "shock"],
  },
  {
    name: "bufo-angry.gif",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-angry.png",
    tags: ["anger", "rage"],
  },
  {
    name: "bufo-angryandfrozen.png",
    tags: ["trapped", "anger", "ice"],
  },
  {
    name: "bufo-anime-glasses.png",
    tags: ["anime", "reference", "accessories"],
  },
  {
    name: "bufo-appears.gif",
    tags: ["animated", "arrival"],
  },
  {
    name: "bufo-apple.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-approve.png",
    tags: ["approve", "rubber-stamp", "core", "encouragement", "agree"],
  },
  {
    name: "bufo-arabicus.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-are-you-seeing-this.gif",
    tags: ["shock", "disbelief", "animated"],
  },
  {
    name: "bufo-arr.png",
    tags: ["accessories", "profession"],
  },
  {
    name: "bufo-arrr.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-arrrrrr.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-arrrrrrr.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-arrrrrrrrr.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-arrrrrrrrrrrrrrr.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-artist.png",
    tags: ["profession"],
  },
  {
    name: "bufo-asks-politely-to-stop.png",
    tags: ["request", "dislike"],
  },
  {
    name: "bufo-assists-with-the-landing.gif",
    tags: ["encouragement", "cute", "animated"],
  },
  {
    name: "bufo-atc.png",
    tags: ["profession", "accessories"],
  },
  {
    name: "bufo-away.png",
    tags: ["ui", "avoids-you"],
  },
  {
    name: "bufo-awkward-smile-nod.gif",
    tags: ["awkward", "animated", "discomfort"],
  },
  {
    name: "bufo-awkward-smile.png",
    tags: ["awkward", "discomfort", "core"],
  },
  {
    name: "bufo-ayy.png",
    tags: ["cool", "accessories"],
  },
  {
    name: "bufo-baby.png",
    tags: ["cute", "baby"],
  },
  {
    name: "bufo-back-pat.png",
    tags: ["encouragement", "core", "feel-better"],
  },
  {
    name: "bufo-backpack.png",
    tags: ["accessories"],
  },
  {
    name: "bufo-backpat.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-bag-of-bufos.png",
    tags: ["found-something", "meta"],
  },
  {
    name: "bufo-bait.png",
    tags: ["sus"],
  },
  {
    name: "bufo-baker.png",
    tags: ["profession", "accessories", "food"],
  },
  {
    name: "bufo-baller.png",
    tags: ["cool", "accessories"],
  },
  {
    name: "bufo-bandana.png",
    tags: ["accessories"],
  },
  {
    name: "bufo-barbie.png",
    tags: ["reference"],
  },
  {
    name: "bufo-barrister.png",
    tags: ["profession", "accessories"],
  },
  {
    name: "bufo-baseball.png",
    tags: ["sports", "anthropomorphic"],
  },
  {
    name: "bufo-basketball.png",
    tags: ["sports", "anthropomorphic"],
  },
  {
    name: "bufo-batman.png",
    tags: ["reference"],
  },
  {
    name: "bufo-be-my-valentine.png",
    tags: ["love"],
  },
  {
    name: "bufo-bee-leaf.png",
    tags: ["animal"],
    skip: true,
  },
  {
    name: "bufo-bee-sad.png",
    tags: ["sad", "cry", "animal"],
    skip: true,
  },
  {
    name: "bufo-bee.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-beer.png",
    tags: ["drink"],
  },
  {
    name: "bufo-behind-bars.png",
    tags: ["trapped", "sad", "cry"],
  },
  {
    name: "bufo-bell-pepper.png",
    tags: ["food", "vegetable", "anthropomorphic"],
  },
  {
    name: "bufo-betray-but-its-a-hotdog.png",
    tags: ["hotdog", "stab"],
  },
  {
    name: "bufo-betray.png",
    tags: ["stab", "dislike"],
  },
  {
    name: "bufo-bigfoot.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-bill-pay.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-bird.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-birthday-but-not-particularly-happy.png",
    tags: ["sad", "birthday"],
  },
  {
    name: "bufo-blank-stare.png",
    tags: ["core", "disbelief", "anxiety", "shock"],
  },
  {
    name: "bufo-blanket.png",
    tags: ["anxiety", "cozy"],
  },
  {
    name: "bufo-blem.png",
    tags: ["je-ne-sais-quoi"],
  },
  {
    name: "bufo-blep.png",
    tags: ["cute"],
  },
  {
    name: "bufo-bless-back.png",
    tags: ["gratitude", "core"],
  },
  {
    name: "bufo-bless.png",
    tags: ["gratitude", "core"],
  },
  {
    name: "bufo-block.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-blogging.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-blows-the-magic-conch.png",
    tags: ["reference"],
  },
  {
    name: "bufo-blueberries.png",
    tags: ["fruit", "food", "anthropomorphic"],
  },
  {
    name: "bufo-blush.gif",
    tags: ["cute", "love", "animated"],
  },
  {
    name: "bufo-boba-army.png",
    tags: ["boba"],
  },
  {
    name: "bufo-boba.png",
    tags: ["boba", "drink"],
  },
  {
    name: "bufo-boi.gif",
    tags: ["animated", "disbelief"],
  },
  {
    name: "bufo-boiii.gif",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-bongo.gif",
    tags: ["animated", "core", "excited", "je-ne-sais-quoi"],
  },
  {
    name: "bufo-bonk.png",
    tags: ["dislike", "punishment"],
  },
  {
    name: "bufo-bops-you-on-the-head-with-a-rolled-up-newspaper.png",
    tags: ["punishment", "dislike"],
  },
  {
    name: "bufo-bouge.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-bouncer-says-its-time-to-go-now.png",
    tags: ["dislike", "cool", "punishment"],
  },
  {
    name: "bufo-bouquet.png",
    tags: ["love", "cute"],
  },
  {
    name: "bufo-bourgeoisie.png",
    tags: ["money"],
  },
  {
    name: "bufo-bowser.png",
    tags: ["reference", "mario"],
  },
  {
    name: "bufo-box-of-chocolates.png",
    tags: ["love", "food"],
  },
  {
    name: "bufo-brain.png",
    tags: ["high-quality", "smart", "core"],
  },
  {
    name: "bufo-breakdown.png",
    tags: ["cry", "sad", "core"],
  },
  {
    name: "bufo-breaks-tech-bros-heart.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-breaks-up-with-you.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-breaks-your-heart.png",
    tags: ["anger"],
  },
  {
    name: "bufo-brick.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-brings-a-new-meaning-to-brain-freeze-by-bopping-you-on-the-head-with-a-popsicle.gif",
    tags: ["food", "bonk"],
  },
  {
    name: "bufo-brings-a-new-meaning-to-gaveled-by-slamming-the-hammer-very-loud.gif",
    tags: ["bonk"],
  },
  {
    name: "bufo-brings-magic-to-the-riot.gif",
    tags: ["animated", "magic"],
  },
  {
    name: "bufo-broccoli.png",
    tags: ["vegetable", "food", "anthropomorphic"],
  },
  {
    name: "bufo-broom.png",
    tags: ["accessories"],
  },
  {
    name: "bufo-brought-a-taco.png",
    tags: ["food", "accessories"],
  },
  {
    name: "bufo-bufo.png",
    tags: ["mario", "reference"],
  },
  {
    name: "bufo-but-anatomically-correct.png",
    tags: ["meta"],
  },
  {
    name: "bufo-but-instead-of-green-its-hotdogs.png",
    tags: ["hotdog", "but-instead"],
  },
  {
    name: "bufo-but-instead-of-green-its-pizza.png",
    tags: ["but-instead"],
  },
  {
    name: "bufo-but-you-can-feel-the-electro-house-music-in-the-gif-and-oh-yea-theres-also-a-dapper-chicken.gif",
    tags: ["animated", "core", "happy", "dance", "animal"],
  },
  {
    name: "bufo-but-you-can-see-the-bufo-in-bufos-eyes.png",
    tags: ["but-you-can-see", "meta"],
  },
  {
    name: "bufo-but-you-can-see-the-hotdog-in-their-eyes.png",
    tags: ["but-you-can-see", "hotdog"],
  },
  {
    name: "bufo-buy-high-sell-low.png",
    tags: ["stonks", "sad"],
  },
  {
    name: "bufo-buy-low-sell-high.png",
    tags: ["stonks", "happy"],
  },
  {
    name: "bufo-cackle.gif",
    tags: ["animated", "laugh", "evil"],
  },
  {
    name: "bufo-call-for-help.png",
    tags: ["fire", "emergency"],
  },
  {
    name: "bufo-cant-believe-your-audacity.png",
    tags: ["disbelief"],
  },
  {
    name: "bufo-cantelope.png",
    tags: ["fruit", "food", "anthropomorphic"],
  },
  {
    name: "bufo-capri-sun.png",
    tags: ["baby", "drink"],
  },
  {
    name: "bufo-captain-obvious.png",
    tags: ["reference"],
  },
  {
    name: "bufo-caribou.png",
    tags: ["animal"],
  },
  {
    name: "bufo-carnage.png",
    tags: ["rage", "evil", "horror", "high-quality"],
  },
  {
    name: "bufo-carrot.png",
    tags: ["vegetable", "food", "anthropomorphic"],
  },
  {
    name: "bufo-cash-money.png",
    tags: ["money", "cool"],
  },
  {
    name: "bufo-casts-a-spell-on-you.gif",
    tags: ["magic", "animated"],
  },
  {
    name: "bufo-catch.png",
    tags: ["sports", "found-something"],
  },
  {
    name: "bufo-caught-a-radioactive-bufo.png",
    tags: ["found-something", "meta"],
  },
  {
    name: "bufo-caught-a-small-bufo.png",
    tags: ["found-something", "meta"],
  },
  {
    name: "bufo-caused-an-incident.png",
    tags: ["anxiety", "panic", "emergency", "software-reference"],
  },
  {
    name: "bufo-censored.png",
    tags: ["punishment"],
  },
  {
    name: "bufo-chatting.gif",
    tags: ["core", "animated"],
  },
  {
    name: "bufo-check.png",
    tags: ["approve"],
  },
  {
    name: "bufo-checks-out-the-vibe.png",
    tags: ["judging"],
  },
  {
    name: "bufo-cheese.png",
    tags: ["food"],
  },
  {
    name: "bufo-chefkiss.png",
    tags: ["core", "approve", "encouragement", "like", "agree"],
  },
  {
    name: "bufo-cherries.png",
    tags: ["fruit", "food", "anthropomorphic"],
  },
  {
    name: "bufo-chicken.png",
    tags: ["animal"],
  },
  {
    name: "bufo-chomp.gif",
    tags: ["animated"],
  },
  {
    name: "bufo-christmas.gif",
    tags: ["animated", "holiday", "christmas", "happy"],
  },
  {
    name: "bufo-chungus.png",
    tags: ["reference"],
  },
  {
    name: "bufo-churns-the-butter.gif",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-clap.gif",
    tags: ["approve", "happy", "encouragement", "animated"],
  },
  {
    name: "bufo-claus.png",
    tags: ["holiday", "christmas"],
  },
  {
    name: "bufo-clown.png",
    tags: ["clown", "reference"],
  },
  {
    name: "bufo-coconut.png",
    tags: ["food", "fruit", "anthropomorphic"],
  },
  {
    name: "bufo-code-freeze.png",
    tags: ["ice", "software-reference"],
  },
  {
    name: "bufo-coding.png",
    tags: ["software-reference", "profession", "angry"],
  },
  {
    name: "bufo-coffee-happy.png",
    tags: ["drink", "happy", "core"],
  },
  {
    name: "bufo-coin.gif",
    tags: ["animated", "money"],
  },
  {
    name: "bufo-come-to-the-dark-side.png",
    tags: ["evil", "reference", "star-wars", "core"],
  },
  {
    name: "bufo-comfy.gif",
    tags: ["animated", "cozy", "happy"],
  },
  {
    name: "bufo-commits-digital-piracy.png",
    tags: ["reference"],
  },
  {
    name: "bufo-concerned.png",
    tags: ["worry", "anxiety", "core"],
  },
  {
    name: "bufo-cone-of-shame.png",
    tags: ["punishment", "dislike"],
  },
  {
    name: "bufo-confused.gif",
    tags: ["animated", "disbelief", "confused"],
  },
  {
    name: "bufo-cookie.png",
    tags: ["food"],
  },
  {
    name: "bufo-cool-glasses.gif",
    tags: ["cool", "animated"],
  },
  {
    name: "bufo-corn.png",
    tags: ["food", "vegetable", "anthropomorphic"],
  },
  {
    name: "bufo-cornucopia.png",
    tags: ["food", "fruit", "vegetable", "anthropomorphic"],
  },
  {
    name: "bufo-covid.png",
    tags: ["covid"],
  },
  {
    name: "bufo-cowboy.png",
    tags: ["profession", "accessories"],
  },
  {
    name: "bufo-cozy-blanky.png",
    tags: ["cozy", "found-something"],
  },
  {
    name: "bufo-crewmate-blue-bounce.gif",
    tags: ["amogus", "animated", "sus"],
  },
  {
    name: "bufo-crewmate-blue.png",
    tags: ["amogus", "sus"],
  },
  {
    name: "bufo-crewmate-cyan-bounce.gif",
    tags: ["amogus", "animated", "sus"],
  },
  {
    name: "bufo-crewmate-cyan.png",
    tags: ["amogus", "sus"],
  },
  {
    name: "bufo-crewmate-green-bounce.gif",
    tags: ["amogus", "animated", "sus"],
  },
  {
    name: "bufo-crewmate-green.png",
    tags: ["amogus", "sus"],
  },
  {
    name: "bufo-crewmate-lime-bounce.gif",
    tags: ["amogus", "animated", "sus"],
  },
  {
    name: "bufo-crewmate-lime.png",
    tags: ["amogus", "sus"],
  },
  {
    name: "bufo-crewmate-orange-bounce.gif",
    tags: ["amogus", "animated", "sus"],
  },
  {
    name: "bufo-crewmate-orange.png",
    tags: ["amogus", "sus"],
  },
  {
    name: "bufo-crewmate-pink-bounce.gif",
    tags: ["amogus", "animated", "sus"],
  },
  {
    name: "bufo-crewmate-pink.png",
    tags: ["amogus", "sus"],
  },
  {
    name: "bufo-crewmate-purple-bounce.gif",
    tags: ["amogus", "animated", "sus"],
  },
  {
    name: "bufo-crewmate-purple.png",
    tags: ["amogus", "sus"],
  },
  {
    name: "bufo-crewmate-red-bounce.gif",
    tags: ["amogus", "animated", "sus"],
  },
  {
    name: "bufo-crewmate-red.png",
    tags: ["amogus", "sus"],
  },
  {
    name: "bufo-crewmate-yellow-bounce.gif",
    tags: ["amogus", "animated", "sus"],
  },
  {
    name: "bufo-crewmate-yellow.png",
    tags: ["amogus", "sus"],
  },
  {
    name: "bufo-crewmates.gif",
    tags: ["amogus", "animated", "sus"],
  },
  {
    name: "bufo-crikey.png",
    tags: ["reference", "accessories"],
  },
  {
    name: "bufo-crumbs.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-crustacean.png",
    tags: ["software-reference", "animal"],
  },
  {
    name: "bufo-cry-pray.png",
    tags: ["core", "cry", "pray", "bow"],
  },
  {
    name: "bufo-cry.png",
    tags: ["cry", "sad"],
  },
  {
    name: "bufo-crying-in-the-rain.png",
    tags: ["sad", "cry", "accessories"],
  },
  {
    name: "bufo-crying-jail.png",
    tags: ["sad", "cry", "punishment"],
  },
  {
    name: "bufo-crying-stop.gif",
    tags: ["cry", "animated", "anger"],
  },
  {
    name: "bufo-crying-tears-of-crying-tears-of-joy.png",
    tags: ["cry", "meta"],
  },
  {
    name: "bufo-crying-why.png",
    tags: ["cry", "sad"],
  },
  {
    name: "bufo-crying.gif",
    tags: ["cry", "sad", "animated"],
  },
  {
    name: "bufo-cubo.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-cucumber.png",
    tags: ["vegetable", "food", "anthropomorphic"],
  },
  {
    name: "bufo-cuddle.png",
    tags: ["love", "cute"],
  },
  {
    name: "bufo-cupcake.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-cuppa.png",
    tags: ["drink", "happy"],
  },
  {
    name: "bufo-cute-dance.gif",
    tags: ["animated", "cute", "dance"],
  },
  {
    name: "bufo-cute.png",
    tags: ["cute"],
  },
  {
    name: "bufo-dab.png",
    tags: ["reference"],
  },
  {
    name: "bufo-dancing.gif",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-dbz.png",
    tags: ["reference"],
  },
  {
    name: "bufo-deal-with-it.png",
    tags: ["cool", "accessories"],
  },
  {
    name: "bufo-deep-hmm.gif",
    tags: ["animated", "skepticism", "core", "disagree"],
  },
  {
    name: "bufo-defend.png",
    tags: ["fight", "sword"],
  },
  {
    name: "bufo-delurk.gif",
    tags: ["animated", "farewell", "avoids-you"],
  },
  {
    name: "bufo-demands-more-nom-noms.gif",
    tags: ["animated", "food", "chonker"],
  },
  {
    name: "bufo-detective.png",
    tags: ["profession", "accessories", "skepticism", "take-a-look"],
  },
  {
    name: "bufo-develops-clairvoyance-while-trapped-in-the-void.png",
    tags: ["void", "horror"],
  },
  {
    name: "bufo-devil.png",
    tags: ["evil", "religion"],
  },
  {
    name: "bufo-devouring-his-son.png",
    tags: ["reference", "cannibalism", "horror"],
  },
  {
    name: "bufo-di-beppo.png",
    tags: ["reference", "food", "accessories"],
  },
  {
    name: "bufo-did-not-make-it-through-the-heatwave.png",
    tags: ["reference"],
  },
  {
    name: "bufo-didnt-get-any-sleep.png",
    tags: ["tired"],
  },
  {
    name: "bufo-disappointed.png",
    tags: ["sad", "dislike"],
  },
  {
    name: "bufo-discombobulated.png",
    tags: ["confused"],
  },
  {
    name: "bufo-disguise.png",
    tags: ["clown", "accessories"],
  },
  {
    name: "bufo-ditto.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-dizzy.gif",
    tags: ["animated", "confused"],
  },
  {
    name: "bufo-do-not-panic.png",
    tags: ["anxiety", "panic", "emergency"],
  },
  {
    name: "bufo-dodge.png",
    tags: ["fight", "avoids-you"],
  },
  {
    name: "bufo-doesnt-believe-you.png",
    tags: ["disbelief", "skepticism"],
  },
  {
    name: "bufo-doesnt-wanna-get-out-of-the-bath-yet.png",
    tags: ["anger", "pout"],
  },
  {
    name: "bufo-dog.png",
    tags: ["hotdog"],
  },
  {
    name: "bufo-domo.png",
    tags: ["reference"],
  },
  {
    name: "bufo-dont-even-see-the-code-anymore.gif",
    tags: ["animated", "reference"],
  },
  {
    name: "bufo-dont-trust-whats-over-there.png",
    tags: ["disbelief", "anxiety", "skepticism"],
  },
  {
    name: "bufo-double-chin.png",
    tags: ["chonker"],
  },
  {
    name: "bufo-double-vaccinated.png",
    tags: ["covid"],
  },
  {
    name: "bufo-doubt.png",
    tags: ["skepticism", "reference"],
  },
  {
    name: "bufo-dough.png",
    tags: ["food", "anthropomorphic"],
  },
  {
    name: "bufo-downvote.png",
    tags: ["dislike"],
  },
  {
    name: "bufo-dr-depper.png",
    tags: ["drink"],
  },
  {
    name: "bufo-dragon.png",
    tags: ["animal", "high-quality"],
  },
  {
    name: "bufo-drags-knee.png",
    tags: ["sports"],
  },
  {
    name: "bufo-drake-no.png",
    tags: ["core", "meme", "disagree"],
  },
  {
    name: "bufo-drake-yes.png",
    tags: ["core", "meme", "agree"],
  },
  {
    name: "bufo-drifts-through-the-void.png",
    tags: ["void", "low-fi"],
  },
  {
    name: "bufo-drinking-coffee.gif",
    tags: ["animated", "drink"],
  },
  {
    name: "bufo-drinks-from-the-fire-hose.png",
    tags: ["software-reference"],
  },
  {
    name: "bufo-drowning-in-leeks.png",
    tags: ["je-ne-sais-quoi", "drowning"],
  },
  {
    name: "bufo-drowns-in-memories-of-ocean.png",
    tags: ["drowning"],
  },
  {
    name: "bufo-drowns-in-tickets-but-ok.png",
    tags: ["drowning", "software-reference", "cry"],
  },
  {
    name: "bufo-easter-bunny.png",
    tags: ["holiday"],
  },
  {
    name: "bufo-eating-hotdog.png",
    tags: ["hotdog", "food"],
  },
  {
    name: "bufo-eating-lollipop.png",
    tags: ["food"],
  },
  {
    name: "bufo-eats-a-bufo-taco.png",
    tags: ["cannibalism", "food"],
  },
  {
    name: "bufo-eats-all-your-honey.png",
    tags: ["food", "found-something"],
  },
  {
    name: "bufo-eats-bufo-taco.png",
    tags: ["food", "cannibalism"],
  },
  {
    name: "bufo-egg.png",
    tags: ["food", "offers"],
  },
  {
    name: "bufo-elite.png",
    tags: ["fancy"],
    skip: true,
  },
  {
    name: "bufo-emo.png",
    tags: ["reference"],
  },
  {
    name: "bufo-ends-the-holy-war-by-offering-the-objectively-best-programming-language.png",
    tags: ["software-reference"],
  },
  {
    name: "bufo-enraged.png",
    tags: ["rage", "angry"],
  },
  {
    name: "bufo-enter.gif",
    tags: ["arrival", "animated"],
  },
  {
    name: "bufo-enters-the-void.gif",
    tags: ["animated", "void"],
  },
  {
    name: "bufo-entrance.gif",
    tags: ["animated", "arrival"],
    skip: true,
  },
  {
    name: "bufo-ethereum.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-everything-is-on-fire.gif",
    tags: ["panic", "anxiety", "emergency", "animated"],
  },
  {
    name: "bufo-evil.png",
    tags: ["evil", "star-wars"],
  },
  {
    name: "bufo-excited-but-sad.png",
    tags: ["cry", "excited", "sad"],
  },
  {
    name: "bufo-excited.gif",
    tags: ["animated", "happy", "excited"],
  },
  {
    name: "bufo-existential-dread-sets-in.gif",
    tags: ["animated", "anxiety", "void", "worry"],
  },
  {
    name: "bufo-exit.gif",
    tags: ["animated", "farewell", "avoids-you"],
  },
  {
    name: "bufo-experiences-euneirophrenia.png",
    tags: ["happy", "cozy"],
  },
  {
    name: "bufo-extra-cool.gif",
    tags: ["cool", "animated"],
  },
  {
    name: "bufo-eye-twitch.gif",
    tags: ["animated", "dislike", "disbelief"],
  },
  {
    name: "bufo-eyes.png",
    tags: ["take-a-look"],
  },
  {
    name: "bufo-fab.png",
    tags: ["fancy", "accessories"],
  },
  {
    name: "bufo-facepalm.png",
    tags: ["disbelief"],
  },
  {
    name: "bufo-failed-the-load-test.png",
    tags: ["software-reference"],
  },
  {
    name: "bufo-fails-the-vibe-check.png",
    tags: ["avoids-you"],
  },
  {
    name: "bufo-fancy-tea.png",
    tags: ["drink", "fancy", "happy"],
  },
  {
    name: "bufo-fastest-rubber-stamp-in-the-west.png",
    tags: ["approve", "software-reference"],
  },
  {
    name: "bufo-fedora.png",
    tags: ["accessories", "farewell"],
  },
  {
    name: "bufo-feel-better.png",
    tags: ["encouragement", "feel-better"],
  },
  {
    name: "bufo-feeling-pretty-might-delete-later.png",
    tags: ["cute"],
  },
  {
    name: "bufo-feels-appreciated.png",
    tags: ["happy"],
  },
  {
    name: "bufo-feels-nothing.png",
    tags: ["blank-stare"],
  },
  {
    name: "bufo-fell-asleep.png",
    tags: ["tired"],
  },
  {
    name: "bufo-fellow-kids.png",
    tags: ["reference", "meme"],
  },
  {
    name: "bufo-fieri.png",
    tags: ["reference"],
  },
  {
    name: "bufo-fight.png",
    tags: ["fight", "anger"],
  },
  {
    name: "bufo-fine-art.png",
    tags: ["fancy", "meta"],
  },
  {
    name: "bufo-fingerguns-back.png",
    tags: ["cool"],
  },
  {
    name: "bufo-fire-engine.png",
    tags: ["accessories", "profession"],
  },
  {
    name: "bufo-fire.gif",
    tags: ["panic", "emergency", "animated", "fire"],
  },
  {
    name: "bufo-firefighter.png",
    tags: ["profession", "accessories"],
  },
  {
    name: "bufo-fish-bulb.png",
    tags: ["happy"],
  },
  {
    name: "bufo-fish.png",
    tags: ["disbelief"],
  },
  {
    name: "bufo-flex.gif",
    tags: ["animated"],
  },
  {
    name: "bufo-folder.png",
    tags: ["software-reference"],
  },
  {
    name: "bufo-fomo.png",
    tags: ["anxiety"],
  },
  {
    name: "bufo-food-please.png",
    tags: ["food"],
  },
  {
    name: "bufo-football.png",
    tags: ["sports"],
  },
  {
    name: "bufo-found-some-more-leeks.png",
    tags: ["je-ne-sais-quoi"],
  },
  {
    name: "bufo-found-the-leeks.png",
    tags: ["je-ne-sais-quoi"],
  },
  {
    name: "bufo-found-yet-another-juicebox.png",
    tags: ["drink"],
  },
  {
    name: "bufo-french.png",
    tags: ["reference"],
  },
  {
    name: "bufo-friends.png",
    tags: ["happy"],
  },
  {
    name: "bufo-fun-is-over.png",
    tags: ["sad", "farewell"],
  },
  {
    name: "bufo-furiously-writes-an-epic-update.gif",
    tags: ["software-reference", "animated", "anxiety"],
  },
  {
    name: "bufo-furiously-writes-you-a-peer-review.gif",
    tags: ["animated", "software-reference", "anxiety"],
  },
  {
    name: "bufo-gamer.png",
    tags: ["reference"],
  },
  {
    name: "bufo-gandalf-has-seen-things.png",
    tags: ["reference", "gandalf", "shock"],
  },
  {
    name: "bufo-gandalf-wat.png",
    tags: ["reference", "gandalf", "disbelief"],
  },
  {
    name: "bufo-gandalf.gif",
    tags: ["animated", "gandalf", "core"],
  },
  {
    name: "bufo-garlic.png",
    tags: ["food", "vegetable", "anthropomorphic"],
  },
  {
    name: "bufo-gavel-dual-wield.png",
    tags: ["software-reference"],
  },
  {
    name: "bufo-gavel.png",
    tags: ["software-reference"],
  },
  {
    name: "bufo-gentleman.png",
    tags: ["fancy"],
  },
  {
    name: "bufo-germany.gif",
    tags: ["animated", "reference"],
  },
  {
    name: "bufo-get-in-loser-were-going-shopping.png",
    tags: ["reference", "animal"],
  },
  {
    name: "bufo-gets-downloaded-from-the-cloud.gif",
    tags: ["animated"],
  },
  {
    name: "bufo-gets-hit-in-the-face-with-an-egg.png",
    tags: ["food"],
  },
  {
    name: "bufo-gets-uploaded-to-the-cloud.gif",
    tags: ["animated"],
  },
  {
    name: "bufo-gets-whiplash.png",
    tags: ["confused"],
  },
  {
    name: "bufo-ghost-costume.png",
    tags: ["avoids-you"],
  },
  {
    name: "bufo-ghost.png",
    tags: ["sad", "feel-better"],
  },
  {
    name: "bufo-giggling-in-a-cat-onesie.gif",
    tags: ["animated", "cute", "happy"],
  },
  {
    name: "bufo-give-money.png",
    tags: ["money"],
    skip: true,
  },
  {
    name: "bufo-give-pack-of-ice.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-give.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-gives-a-magic-number.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-gives-an-idea.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-gives-approval.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-gives-databricks.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-gives-you-a-hotdog.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-gives-you-some-extra-brain.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-glasses.png",
    tags: ["accessories", "disbelief", "skepticism"],
  },
  {
    name: "bufo-glitch.gif",
    tags: ["animated"],
  },
  {
    name: "bufo-goal.png",
    tags: ["sports"],
  },
  {
    name: "bufo-goes-super-saiyan.png",
    tags: ["reference"],
  },
  {
    name: "bufo-goes-to-space.png",
    tags: ["space"],
  },
  {
    name: "bufo-goggles-are-too-tight.png",
    tags: ["discomfort"],
  },
  {
    name: "bufo-good-morning.png",
    tags: ["happy", "greetings", "drink"],
  },
  {
    name: "bufo-good-vibe.gif",
    tags: ["animated", "happy"],
  },
  {
    name: "bufo-goose-hat-happy-dance.gif",
    tags: ["animated", "happy", "dance", "cute"],
  },
  {
    name: "bufo-got-a-tan.png",
    tags: ["discomfort"],
  },
  {
    name: "bufo-got-zapped.png",
    tags: ["shock", "confused"],
  },
  {
    name: "bufo-grapes.png",
    tags: ["food", "fruit", "anthropomorphic"],
  },
  {
    name: "bufo-grimaces-with-eyebrows.png",
    tags: ["discomfort"],
  },
  {
    name: "bufo-guitar.gif",
    tags: ["animated", "music"],
  },
  {
    name: "bufo-hacker.png",
    tags: ["reference", "hacker"],
  },
  {
    name: "bufo-haha-yes-haha-yes.png",
    tags: ["reference", "evil"],
  },
  {
    name: "bufo-halloween-pumpkin.png",
    tags: ["holiday"],
  },
  {
    name: "bufo-halloween.gif",
    tags: ["holiday", "animated"],
  },
  {
    name: "bufo-hands-on-hips-annoyed.png",
    tags: ["anger", "core", "upset"],
  },
  {
    name: "bufo-hands.png",
    tags: ["sad", "cry"],
  },
  {
    name: "bufo-hangs-ten.png",
    tags: ["cool"],
  },
  {
    name: "bufo-hangs-up.gif",
    tags: ["animated", "farewell", "avoids-you"],
  },
  {
    name: "bufo-hannibal-lecter.png",
    tags: ["reference", "cannibalism", "horror"],
  },
  {
    name: "bufo-hanson.png",
    tags: ["reference"],
  },
  {
    name: "bufo-happy-hour.gif",
    tags: ["animated", "happy", "drink"],
  },
  {
    name: "bufo-happy.png",
    tags: ["happy"],
  },
  {
    name: "bufo-hardhat.png",
    tags: ["accessories", "profession"],
  },
  {
    name: "bufo-has-a-5-dollar-footlong.png",
    tags: ["food"],
  },
  {
    name: "bufo-has-a-banana.png",
    tags: ["food", "has-a"],
  },
  {
    name: "bufo-has-a-bbq.png",
    tags: ["food", "has-a"],
  },
  {
    name: "bufo-has-a-big-wrench.png",
    tags: ["has-a"],
  },
  {
    name: "bufo-has-a-crush.png",
    tags: ["love", "cute"],
  },
  {
    name: "bufo-has-a-dr-pepper.png",
    tags: ["drink", "has-a"],
  },
  {
    name: "bufo-has-a-fresh-slice.png",
    tags: ["food", "has-a"],
  },
  {
    name: "bufo-has-a-headache.gif",
    tags: ["animated", "pain", "anger", "rage"],
  },
  {
    name: "bufo-has-a-hot-take.png",
    tags: ["has-a"],
  },
  {
    name: "bufo-has-a-question.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-has-a-spoon.png",
    tags: ["has-a"],
  },
  {
    name: "bufo-has-a-timtam.png",
    tags: ["food", "has-a"],
  },
  {
    name: "bufo-has-accepted-its-horrible-fate.png",
    tags: ["horror"],
  },
  {
    name: "bufo-has-activated.png",
    tags: [],
  },
  {
    name: "bufo-has-been-cleaning.png",
    tags: [],
  },
  {
    name: "bufo-has-infiltrated-your-secure-system.gif",
    tags: ["animated", "hacker"],
  },
  {
    name: "bufo-has-midas-touch.png",
    tags: ["money", "horror"],
  },
  {
    name: "bufo-has-read-enough-documentation-for-today.png",
    tags: ["software-reference", "confused"],
  },
  {
    name: "bufo-has-some-ketchup.png",
    tags: ["food", "has-a"],
  },
  {
    name: "bufo-has-thread-for-guts.png",
    tags: ["horror"],
  },
  {
    name: "bufo-hat.png",
    tags: ["accessories", "avoids-you"],
  },
  {
    name: "bufo-hazmat.png",
    tags: ["accessories", "profession"],
  },
  {
    name: "bufo-headbang.gif",
    tags: ["animated", "dance"],
  },
  {
    name: "bufo-headphones.png",
    tags: ["music", "accessories", "avoids-you"],
  },
  {
    name: "bufo-heart-but-its-anatomically-correct.png",
    tags: ["horror"],
  },
  {
    name: "bufo-heart.png",
    tags: ["love", "happy"],
  },
  {
    name: "bufo-hearts.png",
    tags: ["love", "happy", "core"],
  },
  {
    name: "bufo-hehe.gif",
    tags: ["animated", "laugh"],
  },
  {
    name: "bufo-hell.gif",
    tags: ["animated", "evil", "core"],
  },
  {
    name: "bufo-hello.gif",
    tags: ["animated", "greetings", "happy", "core"],
  },
  {
    name: "bufo-heralds-an-incident.png",
    tags: ["software-reference", "emergency"],
  },
  {
    name: "bufo-heralds-taco-taking.png",
    tags: ["food", "takes-your"],
  },
  {
    name: "bufo-heralds-your-success.png",
    tags: ["happy", "celebration"],
  },
  {
    name: "bufo-hides.png",
    tags: ["avoids-you", "anxiety"],
  },
  {
    name: "bufo-high-speed-train.png",
    tags: [],
  },
  {
    name: "bufo-highfive-1.png",
    tags: ["celebration", "happy"],
  },
  {
    name: "bufo-highfive-2.png",
    tags: ["celebration", "happy"],
  },
  {
    name: "bufo-hipster.png",
    tags: ["reference"],
  },
  {
    name: "bufo-hmm-no.gif",
    tags: ["disagree", "animated"],
  },
  {
    name: "bufo-hmm-yes.gif",
    tags: ["agree", "animated"],
  },
  {
    name: "bufo-hmm.png",
    tags: ["skepticism", "disbelief"],
  },
  {
    name: "bufo-holds-pumpkin.png",
    tags: ["holiday"],
  },
  {
    name: "bufo-hopes-you-also-are-having-a-good-day.png",
    tags: ["cute", "greetings"],
  },
  {
    name: "bufo-hopes-you-are-having-a-good-day.png",
    tags: ["cute", "greetings"],
  },
  {
    name: "bufo-howdy.png",
    tags: ["greetings"],
  },
  {
    name: "bufo-hug.png",
    tags: ["feel-better"],
  },
  {
    name: "bufo-i-just-love-it-so-much.png",
    tags: ["love", "happy", "cry"],
  },
  {
    name: "bufo-ice-cream.png",
    tags: ["food"],
  },
  {
    name: "bufo-idk.png",
    tags: ["unsure"],
  },
  {
    name: "bufo-im-in-danger.png",
    tags: ["anxiety"],
  },
  {
    name: "bufo-imposter.png",
    tags: ["sus", "amogus"],
  },
  {
    name: "bufo-in-a-pear-tree.png",
    tags: ["holiday"],
  },
  {
    name: "bufo-inception.png",
    tags: ["meta"],
  },
  {
    name: "bufo-increases-his-dimensionality-while-trapped-in-the-void.png",
    tags: ["void", "meta"],
  },
  {
    name: "bufo-innocent.gif",
    tags: ["animated", "cute"],
  },
  {
    name: "bufo-inspecting.png",
    tags: ["take-a-look", "unsure"],
  },
  {
    name: "bufo-inspired.png",
    tags: ["inspirational"],
  },
  {
    name: "bufo-instigates-a-dramatic-turn-of-events.png",
    tags: ["fight", "meme"],
  },
  {
    name: "bufo-intensifies.gif",
    tags: ["animated", "meta"],
  },
  {
    name: "bufo-investigates.png",
    tags: ["take-a-look"],
    skip: true,
  },
  {
    name: "bufo-iphone.png",
    tags: ["reference"],
  },
  {
    name: "bufo-irl.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-iron-throne.png",
    tags: ["reference", "baby"],
  },
  {
    name: "bufo-ironside.png",
    tags: ["reference"],
  },
  {
    name: "bufo-is-a-little-worried-but-still-trying-to-be-supportive.png",
    tags: ["anxiety", "encouragement", "love"],
  },
  {
    name: "bufo-is-about-to-zap-you.png",
    tags: ["fight", "anger"],
  },
  {
    name: "bufo-is-at-his-wits-end.png",
    tags: ["anger", "rage"],
  },
  {
    name: "bufo-is-flying-and-is-the-plane.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-is-getting-abducted.png",
    tags: [],
  },
  {
    name: "bufo-is-getting-paged-now.png",
    tags: ["horror", "software-reference", "anxiety"],
  },
  {
    name: "bufo-is-happy-youre-happy.png",
    tags: ["happy", "encouragement", "sarcasam"],
  },
  {
    name: "bufo-is-in-on-the-joke.png",
    tags: ["happy", "laugh"],
  },
  {
    name: "bufo-is-inhaling-this-popcorn.gif",
    tags: ["animated", "food"],
  },
  {
    name: "bufo-is-jealous-its-your-birthday.png",
    tags: ["birthday", "jealous"],
  },
  {
    name: "bufo-is-keeping-his-eye-on-you.gif",
    tags: ["animated", "cursed", "horror"],
  },
  {
    name: "bufo-is-lost-in-the-void.png",
    tags: ["void", "sad"],
  },
  {
    name: "bufo-is-lost.png",
    tags: ["anxiety"],
  },
  {
    name: "bufo-is-omniscient.png",
    tags: ["void"],
  },
  {
    name: "bufo-is-panicking.gif",
    tags: ["animated", "panic", "anxiety"],
  },
  {
    name: "bufo-is-proud-of-you.gif",
    tags: ["animated", "encouragement", "happy"],
  },
  {
    name: "bufo-is-ready-to-build-when-you-are.png",
    tags: ["software-reference"],
  },
  {
    name: "bufo-is-ready-to-consume-his-daily-sodium-intake-in-one-sitting.png",
    tags: ["food", "reference"],
  },
  {
    name: "bufo-is-ready-to-eat.png",
    tags: ["food"],
  },
  {
    name: "bufo-is-ready-to-riot.png",
    tags: ["fight", "anger", "fire"],
  },
  {
    name: "bufo-is-romantic.png",
    tags: ["love"],
  },
  {
    name: "bufo-is-safe-behind-bars.gif",
    tags: ["animated"],
  },
  {
    name: "bufo-is-so-happy-youre-here.png",
    tags: ["happy", "greetings", "excited"],
  },
  {
    name: "bufo-is-unconcerned.png",
    tags: ["cool"],
  },
  {
    name: "bufo-is-up-to-something.png",
    tags: ["evil"],
  },
  {
    name: "bufo-is-very-upset-now.png",
    tags: ["anger", "upset"],
  },
  {
    name: "bufo-is-watching-you.png",
    tags: ["take-a-look"],
  },
  {
    name: "bufo-is-working-too-much.png",
    tags: ["tired", "blank-stare"],
  },
  {
    name: "bufo-isnt-angry-just-disappointed.png",
    tags: ["anger", "disbelief", "upset"],
  },
  {
    name: "bufo-isnt-going-to-rewind-the-vhs-before-returning-it.png",
    tags: ["evil"],
  },
  {
    name: "bufo-italian.png",
    tags: ["reference"],
  },
  {
    name: "bufo-its-over-9000.png",
    tags: ["reference"],
  },
  {
    name: "bufo-its-too-early-for-this.png",
    tags: ["tired"],
  },
  {
    name: "bufo-jam.gif",
    tags: ["animated", "music"],
  },
  {
    name: "bufo-jammies.gif",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-jammin.gif",
    tags: ["animated", "music", "dance"],
  },
  {
    name: "bufo-jealous.png",
    tags: ["jealous"],
  },
  {
    name: "bufo-jomo.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-juice.png",
    tags: ["drink"],
  },
  {
    name: "bufo-juicebox.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-juicy.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-just-a-little-sad.png",
    tags: ["sad"],
  },
  {
    name: "bufo-just-a-little-salty.png",
    tags: ["upset"],
  },
  {
    name: "bufo-just-checking.gif",
    tags: ["animated", "take-a-look"],
  },
  {
    name: "bufo-just-finished-a-workout.png",
    tags: ["sports"],
  },
  {
    name: "bufo-just-got-back-from-the-dentist.png",
    tags: ["discomfort"],
  },
  {
    name: "bufo-just-ice.png",
    tags: ["ice"],
  },
  {
    name: "bufo-just-walked-into-an-awkward-conversation-and-is-now-trying-to-figure-out-how-to-leave.png",
    tags: ["awkward", "farewell"],
  },
  {
    name: "bufo-justice.png",
    tags: [],
  },
  {
    name: "bufo-keeps-his-password-written-on-a-post-it-note-stuck-to-his-monitor.png",
    tags: ["clown"],
  },
  {
    name: "bufo-king.png",
    tags: ["fancy", "encouragement"],
  },
  {
    name: "bufo-kiwi.png",
    tags: ["food", "fruit", "anthropomorphic"],
  },
  {
    name: "bufo-knife.png",
    tags: ["anger", "fight", "kills-you"],
  },
  {
    name: "bufo-knows-age-is-just-a-number.png",
    tags: [],
  },
  {
    name: "bufo-knows-this-is-a-total-bop.gif",
    tags: ["animated", "music", "happy", "dance"],
  },
  {
    name: "bufo-knuckle-sandwich.gif",
    tags: ["animated", "fight", "anger"],
  },
  {
    name: "bufo-knuckles.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-koi.png",
    tags: ["animal"],
  },
  {
    name: "bufo-kudo.png",
    tags: ["encouragement"],
  },
  {
    name: "bufo-kuzco-has-not-learned-his-lesson-yet.png",
    tags: ["reference"],
  },
  {
    name: "bufo-kuzco.png",
    tags: ["reference"],
  },
  {
    name: "bufo-late-to-the-convo.png",
    tags: ["software-reference"],
  },
  {
    name: "bufo-laugh-xd.png",
    tags: ["laugh"],
  },
  {
    name: "bufo-laughing-popcorn.png",
    tags: ["laugh"],
  },
  {
    name: "bufo-laughs-to-mask-the-pain.png",
    tags: ["laugh", "cry", "pain"],
  },
  {
    name: "bufo-leads-the-way-to-better-docs.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-leaves-you-on-seen.png",
    tags: ["avoids-you"],
  },
  {
    name: "bufo-left-a-comment.png",
    tags: [],
  },
  {
    name: "bufo-left-multiple-comments.png",
    tags: [],
  },
  {
    name: "bufo-legal-entities.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-lemon.png",
    tags: ["food", "fruit", "anthropomorphic"],
  },
  {
    name: "bufo-leprechaun.png",
    tags: ["holiday"],
  },
  {
    name: "bufo-lgtm.png",
    tags: ["software-reference", "approve"],
  },
  {
    name: "bufo-liberty-forgot-her-torch.png",
    tags: ["awkward"],
  },
  {
    name: "bufo-liberty.png",
    tags: ["country"],
  },
  {
    name: "bufo-librarian.png",
    tags: ["profession"],
  },
  {
    name: "bufo-lick.gif",
    tags: ["animated"],
  },
  {
    name: "bufo-lies-awake-in-panic.png",
    tags: ["anxiety", "panic"],
  },
  {
    name: "bufo-life-saver.png",
    tags: ["encouragement"],
  },
  {
    name: "bufo-likes-that-idea.png",
    tags: ["approve", "agree"],
  },
  {
    name: "bufo-link.png",
    tags: ["software-reference"],
  },
  {
    name: "bufo-listens-to-his-conscience.png",
    tags: ["evil"],
  },
  {
    name: "bufo-lit.gif",
    tags: ["animated", "fire"],
  },
  {
    name: "bufo-littlefoot-is-upset.png",
    tags: ["reference"],
  },
  {
    name: "bufo-loading.gif",
    tags: ["animated", "ui"],
  },
  {
    name: "bufo-lol-cry.gif",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-lol.png",
    tags: ["laugh"],
  },
  {
    name: "bufo-lookin-dope.png",
    tags: ["cool"],
  },
  {
    name: "bufo-looks-a-little-closer.png",
    tags: ["take-a-look"],
    skip: true,
  },
  {
    name: "bufo-looks-like-hes-listening-but-hes-not.png",
    tags: ["avoids-you"],
  },
  {
    name: "bufo-looks-out-of-the-window.png",
    tags: [],
  },
  {
    name: "bufo-loves-blobs.png",
    tags: ["love", "happy"],
  },
  {
    name: "bufo-loves-doges.gif",
    tags: ["animated", "cute", "happy", "animal"],
  },
  {
    name: "bufo-loves-pho.png",
    tags: ["food"],
  },
  {
    name: "bufo-loves-rice-and-beans.png",
    tags: ["food"],
  },
  {
    name: "bufo-loves-ruby.png",
    tags: ["software-reference"],
  },
  {
    name: "bufo-loves-this-song.png",
    tags: ["music", "happy"],
  },
  {
    name: "bufo-luigi.png",
    tags: ["reference", "mario"],
  },
  {
    name: "bufo-lunch.png",
    tags: ["food"],
    skip: true,
  },
  {
    name: "bufo-lurk-delurk.gif",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-lurk.gif",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-lurk.png",
    tags: ["greetings", "take-a-look", "sus"],
  },
  {
    name: "bufo-macbook.png",
    tags: [],
  },
  {
    name: "bufo-made-salad.png",
    tags: ["food"],
  },
  {
    name: "bufo-made-you-a-burrito.png",
    tags: ["food"],
  },
  {
    name: "bufo-magician.png",
    tags: ["magic"],
  },
  {
    name: "bufo-makes-it-rain.png",
    tags: ["money"],
  },
  {
    name: "bufo-makes-the-dream-work.png",
    tags: ["reference"],
  },
  {
    name: "bufo-mama-mia-thatsa-one-spicy-a-meatball.png",
    tags: ["reference"],
  },
  {
    name: "bufo-marine.png",
    tags: ["profession"],
  },
  {
    name: "bufo-mario.png",
    tags: ["mario", "reference"],
  },
  {
    name: "bufo-mask.png",
    tags: ["accessories", "covid"],
  },
  {
    name: "bufo-matrix.gif",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-meltdown.png",
    tags: ["anger", "rage"],
  },
  {
    name: "bufo-melting.png",
    tags: ["horror", "core"],
  },
  {
    name: "bufo-micdrop.gif",
    tags: ["animated", "farewell", "cool"],
  },
  {
    name: "bufo-midsommar.png",
    tags: [],
  },
  {
    name: "bufo-mild-panic.png",
    tags: ["anxiety", "panic", "blank-stare"],
  },
  {
    name: "bufo-mildly-aggravated.png",
    tags: ["anger", "upset"],
  },
  {
    name: "bufo-mindblown.png",
    tags: ["shock", "disbelief"],
  },
  {
    name: "bufo-minecraft-attack.gif",
    tags: ["fight", "animated", "sword"],
  },
  {
    name: "bufo-minecraft-defend.gif",
    tags: ["fight", "animated", "sword"],
  },
  {
    name: "bufo-mitosis.gif",
    tags: ["animated", "meta"],
  },
  {
    name: "bufo-mittens.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-modern-art.png",
    tags: ["fancy"],
  },
  {
    name: "bufo-monocle.png",
    tags: ["fancy", "money"],
  },
  {
    name: "bufo-monstera.png",
    tags: ["anthropomorphic"],
  },
  {
    name: "bufo-morning-starbucks.png",
    tags: ["drink", "tired"],
  },
  {
    name: "bufo-morning-sun.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-morning.png",
    tags: ["cozy", "happy"],
  },
  {
    name: "bufo-mrtayto.png",
    tags: ["reference"],
  },
  {
    name: "bufo-mushroom.png",
    tags: ["vegetable", "food", "anthropomorphic"],
  },
  {
    name: "bufo-mustache.png",
    tags: ["accessories"],
  },
  {
    name: "bufo-my-pho.png",
    tags: ["food"],
  },
  {
    name: "bufo-nah.png",
    tags: ["disagree"],
  },
  {
    name: "bufo-naptime.png",
    tags: ["tired"],
  },
  {
    name: "bufo-needs-some-hot-tea-to-process-this-news.png",
    tags: ["shock", "disbelief"],
  },
  {
    name: "bufo-needs-to-vent.png",
    tags: ["blank-stare", "anger"],
  },
  {
    name: "bufo-nefarious.png",
    tags: ["evil"],
  },
  {
    name: "bufo-nervous-but-cute.png",
    tags: ["anger", "cute"],
  },
  {
    name: "bufo-nervous.gif",
    tags: ["animated", "anxiety"],
  },
  {
    name: "bufo-night.png",
    tags: ["cozy", "farewell"],
  },
  {
    name: "bufo-no-capes.png",
    tags: ["reference"],
  },
  {
    name: "bufo-no-more-today-thank-you.gif",
    tags: ["animated", "farewell", "greetings"],
  },
  {
    name: "bufo-no-prob.png",
    tags: [],
  },
  {
    name: "bufo-no-problem.png",
    tags: [],
  },
  {
    name: "bufo-no-ragrets.png",
    tags: [],
  },
  {
    name: "bufo-no-sleep.png",
    tags: ["tired"],
  },
  {
    name: "bufo-no-u.png",
    tags: ["fight"],
  },
  {
    name: "bufo-no.gif",
    tags: ["animated", "disagree"],
  },
  {
    name: "bufo-nod.gif",
    tags: ["animated", "agree"],
  },
  {
    name: "bufo-noodles.gif",
    tags: ["animated", "food"],
  },
  {
    name: "bufo-nope.gif",
    tags: ["animated", "farewell", "avoids-you"],
  },
  {
    name: "bufo-nosy.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-not-bad-by-dalle.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-not-my-problem.png",
    tags: ["avoids-you", "happy"],
  },
  {
    name: "bufo-not-respecting-your-personal-space.png",
    tags: [],
  },
  {
    name: "bufo-notice-me-senpai.gif",
    tags: ["animated", "cute"],
  },
  {
    name: "bufo-notification.png",
    tags: ["core", "panic"],
  },
  {
    name: "bufo-nun.png",
    tags: ["religion"],
  },
  {
    name: "bufo-nyc.png",
    tags: [],
  },
  {
    name: "bufo-oatly.png",
    tags: ["drink"],
  },
  {
    name: "bufo-oblivious-and-innocent.png",
    tags: ["cute"],
  },
  {
    name: "bufo-of-liberty.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-offering-bufo-offering-bufo-offering-bufo.png",
    tags: ["meta"],
  },
  {
    name: "bufo-offers-200.png",
    tags: ["approve", "agree"],
  },
  {
    name: "bufo-offers-a-bagel.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-a-ball-of-mud.png",
    tags: ["offers", "software-reference", "horror"],
  },
  {
    name: "bufo-offers-a-banana-in-these-trying-times.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-a-beer.png",
    tags: ["offers", "drink"],
  },
  {
    name: "bufo-offers-a-bicycle.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-a-bolillo-para-el-susto.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-a-book.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-a-bufo-egg-in-this-trying-time.png",
    tags: ["offers", "meta"],
  },
  {
    name: "bufo-offers-a-burger.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-a-cake.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-a-clover.png",
    tags: ["offers", "holiday"],
  },
  {
    name: "bufo-offers-a-cookie.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-a-factory.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-a-flan.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-a-focaccia.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-a-furby.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-a-gavel.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-a-generator.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-a-hario-scale.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-a-hot-take.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-a-jetpack-zebra.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-a-kakapo.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-a-like.png",
    tags: ["offers", "like"],
  },
  {
    name: "bufo-offers-a-llama.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-a-loading-spinner-spinning.gif",
    tags: ["offers", "animated", "ui"],
  },
  {
    name: "bufo-offers-a-loading-spinner.gif",
    tags: ["offers", "animated", "ui"],
  },
  {
    name: "bufo-offers-a-lock.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-a-mac-m1-chip.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-a-pager.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-a-piece-of-cake.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-a-pr.png",
    tags: ["offers", "software-reference"],
  },
  {
    name: "bufo-offers-a-rock.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-a-roomba.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-a-ruby.png",
    tags: ["offers", "software-reference"],
  },
  {
    name: "bufo-offers-a-sandbox.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-a-shocked-pikachu.png",
    tags: ["offers", "shock"],
  },
  {
    name: "bufo-offers-a-speedy-recovery.png",
    tags: ["offers", "feel-better"],
  },
  {
    name: "bufo-offers-a-status.png",
    tags: ["offers", "software-reference"],
  },
  {
    name: "bufo-offers-a-taco.gif",
    tags: ["offers", "food", "animated"],
    skip: true,
  },
  {
    name: "bufo-offers-a-telescope.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-a-tiny-wood-stove.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-a-torta-ahogada.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-a-webhook-but-the-logo-is-canonically-correct.png",
    tags: ["offers", "software-reference"],
  },
  {
    name: "bufo-offers-a-webhook.png",
    tags: ["offers", "software-reference"],
  },
  {
    name: "bufo-offers-a-wednesday.png",
    tags: ["offers", "meme"],
  },
  {
    name: "bufo-offers-a11y.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-airwrap.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-an-airpod-pro.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-an-eclair.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-an-egg-in-this-trying-time.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-an-ethernet-cable.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-an-export-of-your-data.png",
    tags: ["offers", "software-reference"],
  },
  {
    name: "bufo-offers-an-extinguisher.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-an-idea.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-an-incident.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-approval.png",
    tags: ["offers", "approve"],
  },
  {
    name: "bufo-offers-avocado.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-bento.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-boba.png",
    tags: ["offers", "drink"],
  },
  {
    name: "bufo-offers-box.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-bufo-cubo.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-bufo-offers.png",
    tags: ["offers", "meta"],
  },
  {
    name: "bufo-offers-bufo.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-bufomelon.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-calculated-decision-to-leave-tech-debt-for-now-and-clean-it-up-later.png",
    tags: ["offers", "software-reference", "clown"],
  },
  {
    name: "bufo-offers-caribufo.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-chart-with-upwards-trend.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-chrome.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-coffee.png",
    tags: ["offers", "drink"],
  },
  {
    name: "bufo-offers-corn.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-covid.png",
    tags: ["offers", "covid"],
  },
  {
    name: "bufo-offers-csharp.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-discord.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-f5.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-factorio.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-falafel.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-fart-cloud.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-footsie.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-fud.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-gatorade.png",
    tags: ["offers", "drink"],
  },
  {
    name: "bufo-offers-git-mailing-list.png",
    tags: ["offers", "software-reference"],
  },
  {
    name: "bufo-offers-golden-handcuffs.png",
    tags: ["offers", "money"],
  },
  {
    name: "bufo-offers-google-doc.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-google-drive.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-google-sheets.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-hello-kitty.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-help.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-hotdog.png",
    tags: ["offers", "food", "hotdog"],
  },
  {
    name: "bufo-offers-jira.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-ldap.png",
    tags: ["offers", "software-reference"],
  },
  {
    name: "bufo-offers-moneybag.png",
    tags: ["offers", "money"],
  },
  {
    name: "bufo-offers-nothing.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-oatmilk.png",
    tags: ["offers", "drink"],
  },
  {
    name: "bufo-offers-pancakes.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-peanuts.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-pineapple.png",
    tags: ["offers", "food", "fruit"],
  },
  {
    name: "bufo-offers-power.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-prescription-strength-painkillers.png",
    tags: ["offers", "pain"],
  },
  {
    name: "bufo-offers-python.png",
    tags: ["offers", "software-reference"],
  },
  {
    name: "bufo-offers-securifriend.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-spam.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-stash-of-tea-from-the-office-for-the-weekend.png",
    tags: ["offers", "drink"],
  },
  {
    name: "bufo-offers-tayto.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-the-cloud.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-the-weeknd.png",
    tags: ["offers", "music"],
  },
  {
    name: "bufo-offers-thoughts-and-prayers.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-thread.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-tim-tams.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-turkish-delights.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-ube.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-watermelon.png",
    tags: ["offers", "food", "fruit", "software-reference"],
  },
  {
    name: "bufo-offers-you-a-comically-oversized-waffle.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-you-a-db-for-your-customer-data.png",
    tags: ["offers", "software-reference"],
  },
  {
    name: "bufo-offers-you-a-gdpr-compliant-cookie.png",
    tags: ["offers", "food", "software-reference"],
  },
  {
    name: "bufo-offers-you-a-kfc-16-piece-family-size-bucket-of-fried-chicken.png",
    tags: ["offers", "food"],
  },
  {
    name: "bufo-offers-you-a-monster-early-in-the-morning.png",
    tags: ["offers", "drink"],
  },
  {
    name: "bufo-offers-you-a-pint-m8.png",
    tags: ["offers", "drink"],
  },
  {
    name: "bufo-offers-you-a-suspiciously-not-urgent-ticket.png",
    tags: ["offers", "software-reference"],
  },
  {
    name: "bufo-offers-you-an-urgent-ticket.png",
    tags: ["offers", "software-reference"],
  },
  {
    name: "bufo-offers-you-dangerously-high-rate-limits.png",
    tags: ["offers", "software-reference"],
  },
  {
    name: "bufo-offers-you-his-crypto-before-he-pumps-and-dumps-it.png",
    tags: ["offers", "money", "evil"],
  },
  {
    name: "bufo-offers-you-logs.png",
    tags: ["offers", "software-reference"],
  },
  {
    name: "bufo-offers-you-money-in-this-trying-time.png",
    tags: ["offers", "money"],
  },
  {
    name: "bufo-offers-you-the-best-emoji-culture-ever.png",
    tags: ["offers"],
  },
  {
    name: "bufo-offers-you-the-moon.png",
    tags: ["offers", "space"],
  },
  {
    name: "bufo-offers-you-the-world.png",
    tags: ["offers", "space"],
  },
  {
    name: "bufo-offers-yubikey.png",
    tags: ["offers"],
  },
  {
    name: "bufo-office.png",
    tags: ["meta"],
  },
  {
    name: "bufo-oh-hai.png",
    tags: ["greetings", "happy"],
  },
  {
    name: "bufo-oh-no.png",
    tags: ["anxiety", "panic"],
  },
  {
    name: "bufo-oh-yeah.png",
    tags: ["reference"],
  },
  {
    name: "bufo-ok.png",
    tags: ["approve", "agree"],
  },
  {
    name: "bufo-okay-pretty-salty-now.png",
    tags: ["anger", "upset"],
  },
  {
    name: "bufo-old.png",
    tags: [],
  },
  {
    name: "bufo-olives.png",
    tags: ["food", "vegetable", "anthropomorphic"],
  },
  {
    name: "bufo-omg.png",
    tags: ["cursed", "shock"],
  },
  {
    name: "bufo-on-fire-but-still-excited.png",
    tags: ["fire", "happy", "pain"],
  },
  {
    name: "bufo-on-the-ceiling.png",
    tags: [],
  },
  {
    name: "bufo-onion.png",
    tags: ["food", "vegetable", "anthropomorphic"],
  },
  {
    name: "bufo-open-mic.png",
    tags: ["baby"],
  },
  {
    name: "bufo-opens-a-haberdashery.png",
    tags: ["fancy", "profession"],
  },
  {
    name: "bufo-orange.png",
    tags: ["food", "fruit", "anthropomorphic"],
  },
  {
    name: "bufo-pager-duty.png",
    tags: ["software-reference", "panic", "anxiety", "emergency"],
  },
  {
    name: "bufo-pajama-party.gif",
    tags: ["animated", "cute", "happy", "dance"],
  },
  {
    name: "bufo-palpatine.png",
    tags: ["evil", "star-wars"],
  },
  {
    name: "bufo-panic.png",
    tags: ["anxiety", "panic", "cry"],
  },
  {
    name: "bufo-parrot.gif",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-party-conga-line.gif",
    tags: [
      "animated",
      "dance",
      "core",
      "high-quality",
      "celebration",
      "excited",
    ],
  },
  {
    name: "bufo-party.gif",
    tags: ["animated", "happy", "celebration", "excited"],
  },
  {
    name: "bufo-passed-the-load-test.png",
    tags: ["software-reference"],
  },
  {
    name: "bufo-passes-the-vibe-check.png",
    tags: [],
  },
  {
    name: "bufo-pat.gif",
    tags: ["animated", "encouragement"],
  },
  {
    name: "bufo-peaky-blinder.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-pear.png",
    tags: ["food", "fruit", "anthropomorphic"],
  },
  {
    name: "bufo-pearly-whites.png",
    tags: ["happy"],
  },
  {
    name: "bufo-peek.png",
    tags: ["take-a-look"],
  },
  {
    name: "bufo-peeking.gif",
    tags: ["animated", "take-a-look"],
  },
  {
    name: "bufo-pensivity-turned-discomfort-upon-realization-of-reality.gif",
    tags: ["anxiety", "discomfort"],
  },
  {
    name: "bufo-phew.png",
    tags: ["relief"],
  },
  {
    name: "bufo-phonecall.png",
    tags: [],
  },
  {
    name: "bufo-photographer.png",
    tags: ["profession"],
  },
  {
    name: "bufo-picked-you-a-flower.png",
    tags: ["cute"],
  },
  {
    name: "bufo-pikmin.png",
    tags: ["reference"],
  },
  {
    name: "bufo-pilgrim.png",
    tags: ["accessories"],
  },
  {
    name: "bufo-pinch-hitter.png",
    tags: ["sports"],
  },
  {
    name: "bufo-pineapple.png",
    tags: ["food", "fruit", "anthropomorphic"],
  },
  {
    name: "bufo-ping.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-pirate.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-pitchfork.png",
    tags: ["anger"],
  },
  {
    name: "bufo-pizza-hut.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-placeholder.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-plays-some-smooth-jazz.png",
    tags: ["music"],
  },
  {
    name: "bufo-pleading-1.png",
    tags: ["plead"],
  },
  {
    name: "bufo-pleading.png",
    tags: ["plead"],
  },
  {
    name: "bufo-please.png",
    tags: ["plead"],
  },
  {
    name: "bufo-pointing-down-there.gif",
    tags: ["meta", "animated"],
  },
  {
    name: "bufo-pointing-over-there.gif",
    tags: ["meta", "animated"],
  },
  {
    name: "bufo-pointing-right-there.gif",
    tags: ["meta", "animated"],
  },
  {
    name: "bufo-pointing-up-there.gif",
    tags: ["meta", "animated"],
  },
  {
    name: "bufo-police.png",
    tags: ["profession", "upset"],
  },
  {
    name: "bufo-poliwhirl.png",
    tags: ["pokemon"],
  },
  {
    name: "bufo-poof.gif",
    tags: ["animated", "farewell"],
  },
  {
    name: "bufo-popcorn.gif",
    tags: ["animated", "food"],
  },
  {
    name: "bufo-popping-out-of-the-coffee.gif",
    tags: ["je-ne-sais-quoi"],
  },
  {
    name: "bufo-popping-out-of-the-toilet.gif",
    tags: ["cursed"],
  },
  {
    name: "bufo-pops-by.gif",
    tags: ["animated", "greetings"],
  },
  {
    name: "bufo-pops-out-for-a-quick-bite-to-eat.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-possessed.png",
    tags: ["horror"],
  },
  {
    name: "bufo-potato.png",
    tags: ["food", "vegetable", "anthropomorphic"],
  },
  {
    name: "bufo-pours-one-out.gif",
    tags: ["animated", "farewell", "sad"],
  },
  {
    name: "bufo-praise.png",
    tags: ["encouragement", "excited"],
  },
  {
    name: "bufo-pray-partying.png",
    tags: ["celebration", "appreciation"],
  },
  {
    name: "bufo-pray.png",
    tags: ["appreciation"],
  },
  {
    name: "bufo-prays-for-this-to-be-over-already-intensifies.gif",
    tags: ["religion"],
  },
  {
    name: "bufo-prays-for-this-to-be-over-already.png",
    tags: ["religion"],
  },
  {
    name: "bufo-presents-to-the-bufos.png",
    tags: [],
  },
  {
    name: "bufo-pretends-to-have-authority.png",
    tags: [],
  },
  {
    name: "bufo-pretty-dang-sad.png",
    tags: ["sad"],
  },
  {
    name: "bufo-pride.gif",
    tags: ["animated", "happy"],
  },
  {
    name: "bufo-psychic.png",
    tags: ["profession"],
  },
  {
    name: "bufo-pumpkin-head.png",
    tags: ["holiday"],
  },
  {
    name: "bufo-pumpkin.png",
    tags: ["holiday"],
  },
  {
    name: "bufo-pushes-to-prod.gif",
    tags: ["animated", "software-reference", "panic", "fire"],
  },
  {
    name: "bufo-put-on-active-noise-cancelling-headphones-but-can-still-hear-you.png",
    tags: ["avoids-you", "upset"],
  },
  {
    name: "bufo-quadruple-vaccinated.png",
    tags: ["covid"],
  },
  {
    name: "bufo-question.png",
    tags: ["confused"],
  },
  {
    name: "bufo-rad.png",
    tags: ["cool", "accessories"],
  },
  {
    name: "bufo-rainbow.gif",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-raised-hand.png",
    tags: [],
  },
  {
    name: "bufo-ramen.gif",
    tags: ["animated", "food"],
  },
  {
    name: "bufo-reading.png",
    tags: ["smart"],
  },
  {
    name: "bufo-red-flags.gif",
    tags: ["animated", "emergency"],
  },
  {
    name: "bufo-redacted.png",
    tags: [],
  },
  {
    name: "bufo-regret.png",
    tags: ["sad", "upset", "cry"],
  },
  {
    name: "bufo-remains-perturbed-from-the-void.png",
    tags: ["void", "confused"],
  },
  {
    name: "bufo-returns-to-the-void.png",
    tags: ["void", "farewell"],
  },
  {
    name: "bufo-retweet.png",
    tags: ["like", "anthropomorphic"],
  },
  {
    name: "bufo-reverse.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-rich.png",
    tags: ["money"],
  },
  {
    name: "bufo-rick.png",
    tags: ["reference"],
  },
  {
    name: "bufo-riding-goose.gif",
    tags: ["animated", "cute", "animal"],
  },
  {
    name: "bufo-riot.gif",
    tags: ["fire", "animated", "fight"],
  },
  {
    name: "bufo-rip.png",
    tags: ["sad", "farewell"],
  },
  {
    name: "bufo-roasted.png",
    tags: ["fire"],
  },
  {
    name: "bufo-rofl.png",
    tags: ["laugh"],
  },
  {
    name: "bufo-roll-safe.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-roll-the-dice.png",
    tags: [],
  },
  {
    name: "bufo-roll.gif",
    tags: ["animated", "baby"],
  },
  {
    name: "bufo-rose.png",
    tags: ["cute", "love"],
  },
  {
    name: "bufo-ross.png",
    tags: ["reference"],
  },
  {
    name: "bufo-royalty-sparkle.gif",
    tags: ["animated", "fancy"],
  },
  {
    name: "bufo-royalty.png",
    tags: ["fancy"],
  },
  {
    name: "bufo-rude.png",
    tags: ["upset", "anger"],
  },
  {
    name: "bufo-rudolph.gif",
    tags: ["animated", "holiday"],
  },
  {
    name: "bufo-run-right.gif",
    tags: ["animated"],
  },
  {
    name: "bufo-run.gif",
    tags: ["animated"],
  },
  {
    name: "bufo-rush.png",
    tags: [],
  },
  {
    name: "bufo-sad-baguette.png",
    tags: ["food", "cry", "sad", "country"],
  },
  {
    name: "bufo-sad-but-ok.png",
    tags: ["sad", "cry"],
  },
  {
    name: "bufo-sad-rain.gif",
    tags: ["animated", "sad", "cry"],
  },
  {
    name: "bufo-sad-swinging.gif",
    tags: ["baby", "animated", "sad"],
  },
  {
    name: "bufo-sad-vibe.gif",
    tags: ["animated", "sad", "music"],
  },
  {
    name: "bufo-sad.png",
    tags: ["sad", "cry", "core"],
  },
  {
    name: "bufo-sailor-moon.png",
    tags: ["reference"],
  },
  {
    name: "bufo-salad.png",
    tags: ["food", "vegetable"],
  },
  {
    name: "bufo-salivating.png",
    tags: ["blank-stare"],
  },
  {
    name: "bufo-salty.png",
    tags: ["upset"],
  },
  {
    name: "bufo-salute.png",
    tags: ["acknowledgement"],
  },
  {
    name: "bufo-scientist.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-screams-into-the-ambient-void.png",
    tags: ["disbelief"],
  },
  {
    name: "bufo-sees-what-you-did-there.png",
    tags: [],
  },
  {
    name: "bufo-sends-a-demand-signal.gif",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-sends-to-print.gif",
    tags: ["software-reference", "animated"],
  },
  {
    name: "bufo-sends-you-to-the-shadow-realm.png",
    tags: ["reference"],
  },
  {
    name: "bufo-shaking-eyes.gif",
    tags: ["animated", "shock"],
  },
  {
    name: "bufo-shaking-head.gif",
    tags: ["animated", "disagree", "shock"],
  },
  {
    name: "bufo-shame.png",
    tags: ["punishment", "trapped"],
  },
  {
    name: "bufo-shares-his-banana.png",
    tags: ["food"],
  },
  {
    name: "bufo-sheesh.png",
    tags: ["cursed", "disbelief"],
  },
  {
    name: "bufo-shh.png",
    tags: [],
  },
  {
    name: "bufo-shifty.gif",
    tags: ["anxiety", "animated"],
  },
  {
    name: "bufo-ship.png",
    tags: ["software-reference", "excited"],
  },
  {
    name: "bufo-shipit.png",
    tags: ["software-reference", "fancy"],
  },
  {
    name: "bufo-shower.png",
    tags: [],
  },
  {
    name: "bufo-showing-off-baby.png",
    tags: ["baby"],
  },
  {
    name: "bufo-shredding.gif",
    tags: ["animated", "music"],
  },
  {
    name: "bufo-shrek-but-canonically-correct.png",
    tags: ["reference"],
  },
  {
    name: "bufo-shrek.png",
    tags: ["reference"],
  },
  {
    name: "bufo-shrooms.png",
    tags: ["blank-stare"],
  },
  {
    name: "bufo-shrug.png",
    tags: ["confused", "unsure"],
  },
  {
    name: "bufo-shy.gif",
    tags: ["anxiety", "animated"],
  },
  {
    name: "bufo-sigh.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-silly-goose-dance.gif",
    tags: ["animated", "dance", "cute"],
  },
  {
    name: "bufo-simba.png",
    tags: [],
    skip: true,
  },
  {
    name: "bufo-single-tear.png",
    tags: ["cry"],
  },
  {
    name: "bufo-sinks.gif",
    tags: ["drowning", "animated"],
  },
  {
    name: "bufo-sip.png",
    tags: ["drink"],
  },
  {
    name: "bufo-sipping-on-juice.png",
    tags: ["drink"],
  },
  {
    name: "bufo-sips-coffee.gif",
    tags: ["animated", "drink"],
  },
  {
    name: "bufo-sit.png",
    tags: [],
  },
  {
    name: "bufo-skeledance.gif",
    tags: ["cursed", "dance", "animated"],
  },
  {
    name: "bufo-skellington-1.png",
    tags: ["horror", "holiday"],
  },
  {
    name: "bufo-skellington.png",
    tags: ["horror", "holiday"],
  },
  {
    name: "bufo-sleep.png",
    tags: ["tired", "happy"],
  },
  {
    name: "bufo-slowly-heads-out.gif",
    tags: ["animated", "farewell"],
  },
  {
    name: "bufo-slowly-lurks-in.gif",
    tags: ["animated", "greetings"],
  },
  {
    name: "bufo-smile.png",
    tags: ["happy"],
  },
  {
    name: "bufo-smirk.png",
    tags: [],
  },
  {
    name: "bufo-smol.png",
    tags: ["baby"],
  },
  {
    name: "bufo-smug.png",
    tags: [],
  },
  {
    name: "bufo-snail.png",
    tags: ["animal", "anthropomorphic"],
  },
  {
    name: "bufo-snaps-a-pic.png",
    tags: [],
  },
  {
    name: "bufo-snore.png",
    tags: ["tired"],
  },
  {
    name: "bufo-snow.png",
    tags: ["happy", "ice"],
  },
  {
    name: "bufo-sobbing.gif",
    tags: ["animated", "cry", "sad"],
  },
  {
    name: "bufo-soccer.png",
    tags: ["sports", "anthropomorphic"],
  },
  {
    name: "bufo-softball.png",
    tags: ["sports", "anthropomorphic"],
  },
  {
    name: "bufo-sombrero.png",
    tags: ["accessories"],
  },
  {
    name: "bufo-spider.png",
    tags: ["animal", "anthropomorphic", "cursed"],
  },
  {
    name: "bufo-spit.png",
    tags: ["fight"],
  },
  {
    name: "bufo-spooky-szn.png",
    tags: ["holiday"],
  },
  {
    name: "bufo-sports.png",
    tags: [],
  },
  {
    name: "bufo-squad.gif",
    tags: [],
  },
  {
    name: "bufo-squash.png",
    tags: [],
  },
  {
    name: "bufo-sriracha.png",
    tags: [],
  },
  {
    name: "bufo-stab-murder.gif",
    tags: [],
  },
  {
    name: "bufo-stab-reverse.gif",
    tags: [],
  },
  {
    name: "bufo-stab.gif",
    tags: [],
  },
  {
    name: "bufo-stamp.png",
    tags: [],
  },
  {
    name: "bufo-standing.png",
    tags: [],
  },
  {
    name: "bufo-stare.png",
    tags: [],
  },
  {
    name: "bufo-stargazing.png",
    tags: [],
  },
  {
    name: "bufo-stars-in-a-old-timey-talkie.png",
    tags: [],
  },
  {
    name: "bufo-starstruck.png",
    tags: [],
  },
  {
    name: "bufo-steals-your-thunder.png",
    tags: [],
  },
  {
    name: "bufo-stick.gif",
    tags: [],
  },
  {
    name: "bufo-stole-caribufos-antler.png",
    tags: [],
  },
  {
    name: "bufo-stoned.png",
    tags: [],
  },
  {
    name: "bufo-stonks.png",
    tags: [],
  },
  {
    name: "bufo-stop.gif",
    tags: [],
  },
  {
    name: "bufo-stop.png",
    tags: [],
  },
  {
    name: "bufo-stopsign.gif",
    tags: [],
  },
  {
    name: "bufo-strains-his-neck.png",
    tags: [],
  },
  {
    name: "bufo-strange.png",
    tags: [],
  },
  {
    name: "bufo-strawberry.png",
    tags: [],
  },
  {
    name: "bufo-strikes-a-deal.png",
    tags: [],
  },
  {
    name: "bufo-stripe.png",
    tags: [],
  },
  {
    name: "bufo-stuffed.png",
    tags: [],
  },
  {
    name: "bufo-style.png",
    tags: [],
  },
  {
    name: "bufo-sun-bless.png",
    tags: [],
  },
  {
    name: "bufo-sunny-side-up.png",
    tags: [],
  },
  {
    name: "bufo-surf.png",
    tags: [],
  },
  {
    name: "bufo-sus.png",
    tags: [],
  },
  {
    name: "bufo-sushi.png",
    tags: [],
  },
  {
    name: "bufo-sussy-eyebrows.gif",
    tags: [],
  },
  {
    name: "bufo-sweat.png",
    tags: [],
  },
  {
    name: "bufo-sweep.png",
    tags: [],
  },
  {
    name: "bufo-sweet-dreams.png",
    tags: [],
  },
  {
    name: "bufo-sweet-potato.png",
    tags: [],
  },
  {
    name: "bufo-swims.png",
    tags: [],
  },
  {
    name: "bufo-sword.png",
    tags: [],
  },
  {
    name: "bufo-taco.png",
    tags: [],
  },
  {
    name: "bufo-tada.png",
    tags: [],
  },
  {
    name: "bufo-take-my-money.png",
    tags: [],
  },
  {
    name: "bufo-takes-a-bath.png",
    tags: [],
  },
  {
    name: "bufo-takes-bufo-give.png",
    tags: [],
  },
  {
    name: "bufo-takes-hotdog.png",
    tags: [],
  },
  {
    name: "bufo-takes-slack.png",
    tags: [],
  },
  {
    name: "bufo-takes-your-approval.png",
    tags: [],
  },
  {
    name: "bufo-takes-your-boba.png",
    tags: [],
  },
  {
    name: "bufo-takes-your-bufo-taco.png",
    tags: [],
  },
  {
    name: "bufo-takes-your-burrito.png",
    tags: [],
  },
  {
    name: "bufo-takes-your-fud-away.png",
    tags: [],
  },
  {
    name: "bufo-takes-your-golden-handcuffs.png",
    tags: [],
  },
  {
    name: "bufo-takes-your-incident.png",
    tags: [],
  },
  {
    name: "bufo-takes-your-pizza.png",
    tags: [],
  },
  {
    name: "bufo-takes-zoom.png",
    tags: [],
  },
  {
    name: "bufo-tapioca-pearl.png",
    tags: [],
  },
  {
    name: "bufo-tea.png",
    tags: [],
  },
  {
    name: "bufo-teal.png",
    tags: [],
  },
  {
    name: "bufo-tears-of-joy.png",
    tags: [],
  },
  {
    name: "bufo-tense.png",
    tags: [],
  },
  {
    name: "bufo-tequila.png",
    tags: [],
  },
  {
    name: "bufo-thanks-the-sr-bufo-for-their-wisdom.png",
    tags: [],
  },
  {
    name: "bufo-thanks-you-for-your-service.png",
    tags: [],
  },
  {
    name: "bufo-thanks.png",
    tags: [],
  },
  {
    name: "bufo-thanksgiving.png",
    tags: [],
  },
  {
    name: "bufo-thanos.png",
    tags: [],
  },
  {
    name: "bufo-thats-a-knee-slapper.png",
    tags: [],
  },
  {
    name: "bufo-the-builder.png",
    tags: [],
  },
  {
    name: "bufo-the-crying-osha-compliant-builder.png",
    tags: [],
  },
  {
    name: "bufo-the-osha-compliant-builder.png",
    tags: [],
  },
  {
    name: "bufo-think.png",
    tags: [],
  },
  {
    name: "bufo-thinking.png",
    tags: [],
  },
  {
    name: "bufo-thinks-about-a11y.png",
    tags: [],
  },
  {
    name: "bufo-thinks-about-fishsticks.gif",
    tags: [],
  },
  {
    name: "bufo-thinks-about-telemetry.png",
    tags: [],
  },
  {
    name: "bufo-thinks-this-is-a-total-bop.gif",
    tags: [],
  },
  {
    name: "bufo-this-is-fine.png",
    tags: [],
  },
  {
    name: "bufo-this.png",
    tags: [],
  },
  {
    name: "bufo-thonk.png",
    tags: [],
  },
  {
    name: "bufo-thonks-from-the-void.png",
    tags: [],
  },
  {
    name: "bufo-threatens-to-thwack-you-with-a-slipper-and-he-means-it.png",
    tags: [],
  },
  {
    name: "bufo-thumbsup.png",
    tags: [],
  },
  {
    name: "bufo-thunk.png",
    tags: [],
  },
  {
    name: "bufo-thwack.gif",
    tags: [],
  },
  {
    name: "bufo-timeout.png",
    tags: [],
  },
  {
    name: "bufo-tin-foil-hat.gif",
    tags: [],
  },
  {
    name: "bufo-tips-hat.png",
    tags: [],
  },
  {
    name: "bufo-tired.png",
    tags: [],
  },
  {
    name: "bufo-toad.png",
    tags: [],
  },
  {
    name: "bufo-tofu.png",
    tags: [],
  },
  {
    name: "bufo-tomato.png",
    tags: [],
  },
  {
    name: "bufo-tongue.gif",
    tags: [],
  },
  {
    name: "bufo-too-many-pings.gif",
    tags: [],
  },
  {
    name: "bufo-took-too-much.gif",
    tags: [],
  },
  {
    name: "bufo-tooth.png",
    tags: [],
  },
  {
    name: "bufo-tophat.png",
    tags: [],
  },
  {
    name: "bufo-tortoise.png",
    tags: [],
  },
  {
    name: "bufo-torus.gif",
    tags: [],
  },
  {
    name: "bufo-trailhead.png",
    tags: [],
  },
  {
    name: "bufo-train.png",
    tags: [],
  },
  {
    name: "bufo-transfixed.png",
    tags: [],
  },
  {
    name: "bufo-transmutes-reality.gif",
    tags: [],
  },
  {
    name: "bufo-trash-can.png",
    tags: [],
  },
  {
    name: "bufo-travels.png",
    tags: [],
  },
  {
    name: "bufo-tries-to-fight-you-but-his-arms-are-too-short-so-count-yourself-lucky.gif",
    tags: [],
  },
  {
    name: "bufo-tries-to-hug-you-back-but-his-arms-are-too-short.png",
    tags: [],
  },
  {
    name: "bufo-tries-to-hug-you-but-his-arms-are-too-short.png",
    tags: [],
  },
  {
    name: "bufo-triple-vaccinated.png",
    tags: [],
  },
  {
    name: "bufo-tripping.gif",
    tags: [],
  },
  {
    name: "bufo-trying-to-relax-while-procrastinating-but-its-not-working.png",
    tags: [],
  },
  {
    name: "bufo-turns-the-tables.png",
    tags: [],
  },
  {
    name: "bufo-tux.png",
    tags: [],
  },
  {
    name: "bufo-typing.gif",
    tags: [],
  },
  {
    name: "bufo-ufo.png",
    tags: [],
  },
  {
    name: "bufo-ugh.png",
    tags: [],
  },
  {
    name: "bufo-uh-okay-i-guess-so.png",
    tags: [],
  },
  {
    name: "bufo-uhhh.png",
    tags: [],
  },
  {
    name: "bufo-unicorn.png",
    tags: [],
  },
  {
    name: "bufo-unlocked-transdimensional-travel-while-in-the-void.png",
    tags: [],
  },
  {
    name: "bufo-uno.png",
    tags: [],
  },
  {
    name: "bufo-upvote.png",
    tags: [],
  },
  {
    name: "bufo-uses-100-percent-of-his-brain.png",
    tags: [],
  },
  {
    name: "bufo-uwu.png",
    tags: [],
  },
  {
    name: "bufo-vaccinated.png",
    tags: [],
  },
  {
    name: "bufo-vaccinates-you.png",
    tags: [],
  },
  {
    name: "bufo-vampire.png",
    tags: [],
  },
  {
    name: "bufo-venom.png",
    tags: [],
  },
  {
    name: "bufo-ventilator.png",
    tags: [],
  },
  {
    name: "bufo-very-angry.gif",
    tags: [],
  },
  {
    name: "bufo-vibe-dance.gif",
    tags: [],
  },
  {
    name: "bufo-vibe.gif",
    tags: [],
  },
  {
    name: "bufo-vomit.png",
    tags: [],
  },
  {
    name: "bufo-waddle.gif",
    tags: [],
  },
  {
    name: "bufo-waiting-for-aws-to-deep-archive-our-data.png",
    tags: [],
  },
  {
    name: "bufo-waits-in-queue.png",
    tags: [],
  },
  {
    name: "bufo-waldo.png",
    tags: [],
  },
  {
    name: "bufo-wallop.png",
    tags: [],
  },
  {
    name: "bufo-wants-a-refund.gif",
    tags: [],
  },
  {
    name: "bufo-wants-to-have-a-calm-and-civilized-conversation-with-you.png",
    tags: [],
  },
  {
    name: "bufo-wants-you-to-buy-his-crypto.gif",
    tags: [],
  },
  {
    name: "bufo-wards-off-the-evil-spirits.gif",
    tags: [],
  },
  {
    name: "bufo-was-eavesdropping-and-got-offended-by-your-convo-but-now-has-to-pretend-he-didnt-hear-you.png",
    tags: [],
  },
  {
    name: "bufo-wat.png",
    tags: [],
  },
  {
    name: "bufo-watches-from-a-distance.png",
    tags: [],
  },
  {
    name: "bufo-watches-the-rain.gif",
    tags: [],
  },
  {
    name: "bufo-watching-the-clock.png",
    tags: [],
  },
  {
    name: "bufo-watermelon.png",
    tags: [],
  },
  {
    name: "bufo-wave.gif",
    tags: [],
  },
  {
    name: "bufo-waves-hello-from-the-void.png",
    tags: [],
  },
  {
    name: "bufo-wears-a-paper-crown.png",
    tags: [],
  },
  {
    name: "bufo-wears-the-cone-of-shame.png",
    tags: [],
  },
  {
    name: "bufo-wedding.png",
    tags: [],
  },
  {
    name: "bufo-welcome.png",
    tags: [],
  },
  {
    name: "bufo-welp.png",
    tags: [],
  },
  {
    name: "bufo-whack.gif",
    tags: [],
  },
  {
    name: "bufo-what-are-you-doing-with-that.png",
    tags: [],
  },
  {
    name: "bufo-what-did-you-just-say.png",
    tags: [],
  },
  {
    name: "bufo-what-have-i-done.png",
    tags: [],
  },
  {
    name: "bufo-what-have-you-done.png",
    tags: [],
  },
  {
    name: "bufo-what-if.png",
    tags: [],
  },
  {
    name: "bufo-whatever.png",
    tags: [],
  },
  {
    name: "bufo-whew.png",
    tags: [],
  },
  {
    name: "bufo-whisky.png",
    tags: [],
  },
  {
    name: "bufo-who-me.gif",
    tags: [],
  },
  {
    name: "bufo-wholesome.png",
    tags: [],
  },
  {
    name: "bufo-why-must-it-be-this-way.png",
    tags: [],
  },
  {
    name: "bufo-wicked.png",
    tags: [],
  },
  {
    name: "bufo-wider-01.png",
    tags: [],
  },
  {
    name: "bufo-wider-02.png",
    tags: [],
  },
  {
    name: "bufo-wider-03.png",
    tags: [],
  },
  {
    name: "bufo-wider-04.png",
    tags: [],
  },
  {
    name: "bufo-wields-mjolnir.png",
    tags: [],
  },
  {
    name: "bufo-wields-the-hylian-shield.png",
    tags: [],
  },
  {
    name: "bufo-will-miss-you.gif",
    tags: [],
  },
  {
    name: "bufo-will-not-be-going-to-space-today.png",
    tags: [],
  },
  {
    name: "bufo-wine.gif",
    tags: [],
  },
  {
    name: "bufo-wink.gif",
    tags: [],
  },
  {
    name: "bufo-wishes-you-a-happy-valentines-day.png",
    tags: [],
  },
  {
    name: "bufo-with-a-drive-by-hot-take.gif",
    tags: [],
  },
  {
    name: "bufo-with-a-fresh-do.png",
    tags: [],
  },
  {
    name: "bufo-wizard.gif",
    tags: [],
  },
  {
    name: "bufo-wonders-if-deliciousness-of-this-cheese-is-worth-the-pain-his-lactose-intolerance-will-cause.png",
    tags: [],
  },
  {
    name: "bufo-worldstar.png",
    tags: [],
  },
  {
    name: "bufo-worried.png",
    tags: [],
  },
  {
    name: "bufo-worry.png",
    tags: [],
  },
  {
    name: "bufo-would-like-a-bite-of-your-cookie.png",
    tags: [],
  },
  {
    name: "bufo-writes-a-doc.png",
    tags: [],
  },
  {
    name: "bufo-wut.png",
    tags: [],
  },
  {
    name: "bufo-yah.png",
    tags: [],
  },
  {
    name: "bufo-yay.gif",
    tags: [],
  },
  {
    name: "bufo-yeehaw.png",
    tags: [],
  },
  {
    name: "bufo-yes.png",
    tags: [],
  },
  {
    name: "bufo-yismail.png",
    tags: [],
  },
  {
    name: "bufo-you-sure-about-that.png",
    tags: [],
  },
  {
    name: "bufo-yugioh.png",
    tags: [],
  },
  {
    name: "bufo-yummy.png",
    tags: [],
  },
  {
    name: "bufo-zoom-right.gif",
    tags: [],
  },
  {
    name: "bufo-zoom.gif",
    tags: [],
  },
  {
    name: "bufobot.png",
    tags: [],
  },
  {
    name: "bufochu.png",
    tags: [],
  },
  {
    name: "bufocopter.png",
    tags: [],
  },
  {
    name: "bufodile.png",
    tags: [],
  },
  {
    name: "bufofoop.gif",
    tags: [],
  },
  {
    name: "bufoling.png",
    tags: [],
  },
  {
    name: "bufolo.png",
    tags: [],
  },
  {
    name: "bufonana.png",
    tags: [],
  },
  {
    name: "bufone.png",
    tags: [],
  },
  {
    name: "bufonomical.png",
    tags: [],
  },
  {
    name: "bufopoof.gif",
    tags: [],
  },
  {
    name: "buforce-be-with-you.png",
    tags: [],
  },
  {
    name: "buforead.png",
    tags: [],
  },
  {
    name: "buforever.gif",
    tags: [],
  },
  {
    name: "bufos-got-your-back.png",
    tags: [],
  },
  {
    name: "bufovacado.png",
    tags: [],
  },
  {
    name: "bufowhirl.png",
    tags: [],
  },
  {
    name: "but-wait-theres-bufo.png",
    tags: [],
  },
  {
    name: "chonky-bufo-wants-to-be-held.png",
    tags: [],
  },
  {
    name: "christmas-bufo-on-a-goose.gif",
    tags: [],
  },
  {
    name: "circle-of-bufo.png",
    tags: [],
  },
  {
    name: "copper-bufo.png",
    tags: [],
  },
  {
    name: "corrupted-bufo.png",
    tags: [],
  },
  {
    name: "count-bufo.png",
    tags: [],
  },
  {
    name: "daily-dose-of-bufo-vitamins.png",
    tags: [],
  },
  {
    name: "doctor-bufo.png",
    tags: [],
  },
  {
    name: "egg-bufo.png",
    tags: [],
  },
  {
    name: "eggplant-bufo.png",
    tags: [],
  },
  {
    name: "et-tu-bufo.png",
    tags: [],
  },
  {
    name: "existential-bufo.gif",
    tags: [],
  },
  {
    name: "feelsgoodbufo.png",
    tags: [],
  },
  {
    name: "fix-it-bufo.png",
    tags: [],
  },
  {
    name: "friendly-neighborhood-bufo.png",
    tags: [],
  },
  {
    name: "future-bufos.png",
    tags: [],
  },
  {
    name: "get-in-lets-bufo.png",
    tags: [],
  },
  {
    name: "get-out-of-bufos-swamp.png",
    tags: [],
  },
  {
    name: "ghost-bufo-of-future-past-is-disappointed-in-your-lack-of-foresight.png",
    tags: [],
  },
  {
    name: "gold-bufo.png",
    tags: [],
  },
  {
    name: "great-white-bufo.png",
    tags: [],
  },
  {
    name: "holiday-bufo-offers-you-a-candy-cane.png",
    tags: [],
  },
  {
    name: "i-dont-trust-bufo.png",
    tags: [],
  },
  {
    name: "if-bufo-fits-bufo-sits.png",
    tags: [],
  },
  {
    name: "interdimensional-bufo-rests-atop-the-terrarium-of-existence.png",
    tags: [],
  },
  {
    name: "it-takes-a-bufo-to-know-a-bufo.png",
    tags: [],
  },
  {
    name: "its-been-such-a-long-day-that-bufo-doesnt-really-care-anymore.png",
    tags: [],
  },
  {
    name: "just-hear-bufo-out-for-a-sec.png",
    tags: [],
  },
  {
    name: "kermit-the-bufo.png",
    tags: [],
  },
  {
    name: "king-bufo.png",
    tags: [],
  },
  {
    name: "kirbufo.png",
    tags: [],
  },
  {
    name: "le-bufo.png",
    tags: [],
  },
  {
    name: "looks-good-to-bufo.png",
    tags: [],
  },
  {
    name: "low-fidelity-bufo-cant-believe-youve-done-this.png",
    tags: [],
  },
  {
    name: "low-fidelity-bufo-concerned.png",
    tags: [],
  },
  {
    name: "low-fidelity-bufo-excited.png",
    tags: [],
  },
  {
    name: "low-fidelity-bufo-gets-whiplash.png",
    tags: [],
  },
  {
    name: "m-bufo.png",
    tags: [],
  },
  {
    name: "maam-this-is-a-bufo.png",
    tags: [],
  },
  {
    name: "many-bufos.png",
    tags: [],
  },
  {
    name: "mega-bufo.png",
    tags: [],
  },
  {
    name: "not-bufo.png",
    tags: [],
  },
  {
    name: "old-bufo-yells-at-hubble.png",
    tags: [],
  },
  {
    name: "old-man-yells-at-bufo.png",
    tags: [],
  },
  {
    name: "old-man-yells-at-old-bufo.png",
    tags: [],
  },
  {
    name: "our-bufo-is-in-another-castle.png",
    tags: [],
  },
  {
    name: "paper-bufo.png",
    tags: [],
  },
  {
    name: "party-bufo.gif",
    tags: [],
  },
  {
    name: "planet-bufo.gif",
    tags: [],
  },
  {
    name: "pour-one-out-for-bufo.gif",
    tags: [],
  },
  {
    name: "press-x-to-bufo.png",
    tags: [],
  },
  {
    name: "princebufo.png",
    tags: [],
  },
  {
    name: "radioactive-bufo.gif",
    tags: [],
  },
  {
    name: "sen\u0303or-bufo.png",
    tags: [],
  },
  {
    name: "shiny-bufo.gif",
    tags: [],
  },
  {
    name: "shut-up-and-take-my-bufo.png",
    tags: [],
  },
  {
    name: "silver-bufo.png",
    tags: [],
  },
  {
    name: "sir-bufo-esquire.png",
    tags: [],
  },
  {
    name: "sir-this-is-a-bufo.png",
    tags: [],
  },
  {
    name: "smol-bufo-feels-blessed.png",
    tags: [],
  },
  {
    name: "so-bufoful.gif",
    tags: [],
  },
  {
    name: "spider-bufo.png",
    tags: [],
  },
  {
    name: "super-bufo-bros.png",
    tags: [],
  },
  {
    name: "super-bufo.png",
    tags: [],
  },
  {
    name: "tabufo.png",
    tags: [],
  },
  {
    name: "teamwork-makes-the-bufo-work.png",
    tags: [],
  },
  {
    name: "ted-bufo.png",
    tags: [],
  },
  {
    name: "the-bufo-nightmare-before-christmas.png",
    tags: [],
  },
  {
    name: "the-bufo-we-deserve.png",
    tags: [],
  },
  {
    name: "the-bufos-new-groove.png",
    tags: [],
  },
  {
    name: "the-more-you-bufo.png",
    tags: [],
  },
  {
    name: "theres-a-bufo-for-that.png",
    tags: [],
  },
  {
    name: "the_bufo_formerly_know_as_froge.png",
    tags: [],
  },
  {
    name: "this-8-dollar-starbucks-drink-isnt-helping-bufo-feel-any-better.png",
    tags: [],
  },
  {
    name: "this-is-bufo.png",
    tags: [],
  },
  {
    name: "this-will-be-bufos-little-secret.gif",
    tags: [],
  },
  {
    name: "triumphant-bufo.png",
    tags: [],
  },
  {
    name: "up-and-to-the-bufo.png",
    tags: [],
  },
  {
    name: "vin-bufo.png",
    tags: [],
  },
  {
    name: "vintage-bufo.png",
    tags: [],
  },
  {
    name: "whatever-youre-doing-its-attracting-the-bufos.png",
    tags: [],
  },
  {
    name: "whenlifegetsatbufo.png",
    tags: [],
  },
  {
    name: "wreck-it-bufo.png",
    tags: [],
  },
  {
    name: "wrong-frog.png",
    tags: [],
  },
  {
    name: "yay-bufo-1.gif",
    tags: [],
  },
  {
    name: "yay-bufo-2.gif",
    tags: [],
  },
  {
    name: "yay-bufo-3.gif",
    tags: [],
  },
  {
    name: "yay-bufo-4.gif",
    tags: [],
  },
  {
    name: "you-have-awoken-the-bufo.png",
    tags: [],
  },
  {
    name: "you-have-exquisite-taste-in-bufo.png",
    tags: [],
  },
];
