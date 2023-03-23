// TODO: Move these sub categories in db
const CattleRefContent: any = {
  buffalo: [
    { code: "murrah", text: "Murrah " },
    { code: "jafarabadi", text: "Jafarabadi" },
    { code: "surti", text: "Surti" },
    { code: "nagpuri", text: "Nagpuri" },
    { code: "gyr_cattle", text: "Gyr cattle" },
    { code: "nili_ravi", text: "Nili-Ravi" },
    { code: "pandharpuri", text: "Pandharpuri" },
  ],
  cow: [
    { code: "rathi", text: "Rathi" },
    { code: "tharparkar", text: "Tharparkar" },
    { code: "deoni", text: "Deoni" },
    { code: "hariana", text: "Hariana" },
    { code: "Sahiwal", text: "Sahiwal" },
    { code: "gir", text: "Gir" },
  ],
  dog: [
    { code: "labrador_retriever", text: "Labrador Retriever" },
    { code: "german_ghepherd", text: "German Shepherd" },
    { code: "pomeranian", text: "Pomeranian" },
    { code: "boxer", text: "Labrador Retriever" },
    { code: "pug", text: "Pug" },
  ],

  type: [
    { code: "cow", text: "Cow", gender: "female" },
    { code: "buffalo", text: "Buffalo", gender: "female" },
    { code: "maleCow", text: "🐄 बैल(Male Cow)", gender: "male" },
    { code: "maleBuffalo", text: "🐃 भैंसा (Male Buffalo)", gender: "male" },
    { code: "femaleGoat", text: "बकरी (bakari)", gender: "female" },
    { code: "maleGoat", text: "बकरा (bakra)", gender: "male" },
    {
      code: "femaleSheep",
      text: "मादा भेड़ (sheep - female)",
      gender: "female",
    },
    { code: "maleSheep", text: "नर भेड़ (sheep - male)", gender: "male" },
    { code: "hen", text: "Hen", gender: "male" },
    { code: "dog", text: "Dog", gender: "male" },
    { code: "femaleCamel", text: "मादा ऊंट (camel - female", gender: "female" },
    { code: "maleCamel", text: "ऊंट (camel - male", gender: "male" },
    { code: "femaleHorse", text: "घोड़ी (horse - female)", gender: "female" },
    { code: "maleHorse", text: "घोडा (horse - male)", gender: "male" },
  ],
};
export default CattleRefContent;
