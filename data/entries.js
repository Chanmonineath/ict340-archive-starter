const entries = [
  {
    id: "coconut-oil",
    title: "Coconut Oil",
    khmerName: "ប្រេងដូង",
    category: "Hair & Skin",
    contributor: "My grandmother",
    place: "Phnom Penh",
    ingredients: "Fresh mature coconuts and clean water",
    process: [
      "Grate the white flesh of mature coconuts.",
      "Add a small amount of clean water and squeeze it through a cloth or strainer to make thick coconut milk.",
      "Put the coconut milk in a clean pan over low to medium heat.",
      "Stir regularly while the water slowly evaporates.",
      "Continue heating until the coconut solids turn light golden brown and clear oil separates.",
      "Let it cool, strain out the browned solids using a clean cloth, and store the oil in a clean, dry container.",
    ],
    benefit:
      "Coconut oil may help skin and hair feel softer and smoother because it reduces moisture loss and acts as an oil-based moisturizer. It may also make hair look shinier and help reduce the feeling of dryness or frizz. It is not proven to remove stretch marks, although moisturizing may make dry skin feel more comfortable and may improve its temporary appearance.",
    duration: "~45 mins",
    imageLabel: "Photo placeholder — coconut oil jar",
  },
  {
    id: "coffee-tamarind-scrub",
    title: "Coffee and Ripe Tamarind Body Scrub",
    khmerName: "កាហ្វេ និងអំពិលទុំ",
    category: "Hair & Skin",
    contributor: "My mother",
    place: "Phnom Penh",
    ingredients:
      "Finely ground coffee or used coffee grounds, ripe tamarind pulp, and a small amount of clean water if needed",
    process: [
      "Remove seeds and hard fibers from ripe tamarind pulp.",
      "Mash the pulp until smooth.",
      "Mix a small amount of finely ground coffee with the tamarind pulp to make a thick paste.",
    ],
    benefit:
      "The coffee grounds may provide physical exfoliation, which can remove loose surface dead skin cells and leave body skin feeling temporarily smoother. Tamarind contains natural fruit acids, so it may add mild exfoliation, but it can also irritate sensitive skin. This scrub does not permanently whiten skin, erase scars, cure acne, or remove stretch marks.",
    duration: "~15 mins",
    imageLabel: "Photo placeholder — coffee tamarind scrub",
  },
  {
    id: "ponlai-turmeric-honey-tamarind-scrub",
    title: "Ponlai, Turmeric, Honey and Ripe Tamarind Body Scrub",
    khmerName: "ពន្លៃ រមៀត ទឹកឃ្មុំ និងអំពិលទុំ",
    category: "Hair & Skin",
    contributor: "Aunt",
    place: "Phnom Penh",
    ingredients:
      "Dried ponlai powder (ពន្លៃ), dried turmeric powder (រមៀត), raw honey, ripe tamarind pulp, and a splash of clean water if the paste goes too stiff",
    process: [
      "Pull the seeds and stringy fibers out of the ripe tamarind, then mash the pulp smooth.",
      "Sift the ponlai and turmeric powders — the coarse bits are what scratch the skin.",
      "Fold the powders into the tamarind with honey until it holds on a spoon.",
      "Rub onto damp skin, massage lightly, leave 10 to 15 minutes, rinse well with lukewarm water, then moisturize. Once a week, not every day.",
    ],
    benefit:
      "This behaves like a scrub, and that is the honest version of it. The powders give the gentle scratch and the tamarind does the rest — ripe pulp is full of fruit acids that loosen dead surface cells, which is why skin feels smoother after. Honey keeps it from feeling stripped. Ponlai and រមៀត are old Khmer skin botanicals with real anti-inflammatory activity behind them, though not proven cosmetic actives. It will not whiten your skin for good, erase old acne marks, or take away stretch marks. Turmeric tints skin yellow for a day or two and causes allergic reactions in some people. Patch test your arm first, keep it to once or twice a week.",
    duration: "~20 mins",
    imageLabel: "Photo placeholder — ponlai turmeric scrub",
  },
  {
    id: "kaffir-lime-hair-mask",
    title: "Kaffir Lime Hair Mask",
    khmerName: "ក្រូចសើច",
    category: "Hair & Skin",
    contributor: "My friend's mother",
    place: "Phnom Penh",
    ingredients:
      "Fresh kaffir lime fruit (ក្រូចសើច, Citrus hystrix), 2–3 whole fruits, and clean water",
    process: [
      "Peel off the rind, then cut the fruit in half or into thin slices.",
      "Crush and rub it gently through the hair and scalp.",
      "Leave 10–15 minutes, then rinse out with water.",
    ],
    benefit:
      "In Cambodia the juice of ក្រូចសើច is traditionally used as a natural hair cleanser and conditioner, and the fruit is commonly made into home-made សាប៊ូកក់សក់. Khmer health writing lists hair care among its main benefits, and small Cambodian producers build natural shampoos around it. It cleans and de-greases the scalp and leaves hair smooth and fragrant.",
    duration: "~15 mins",
    imageLabel: "Photo placeholder — kaffir lime fruit",
  },
  {
    id: "spanish-thyme-cough-remedy",
    title: "Spanish Thyme for Cough",
    khmerName: "ជីត្រចៀកជ្រូក",
    category: "Cough & Cold",
    contributor: "Uncle",
    place: "Phnom Penh",
    ingredients:
      "A small handful of fresh ជីត្រចៀកជ្រូក leaves (Plectranthus amboinicus), plus honey if you want to soften the taste",
    process: [
      "Rinse the thick fuzzy leaves and pat them dry.",
      "Crush them in a mortar until the juice comes out — the sharp oregano smell hits right away.",
      "Squeeze out the juice, take about a spoonful with honey, and sip slowly.",
    ],
    benefit:
      "This one has more behind it than most home remedies. In Cambodia the plant has long been used to keep colds off children, and crushed leaf juice is the standard way to take it across Southeast Asia. The oil in those thick leaves is heavy in carvacrol and thymol, real expectorants that loosen phlegm, and a double-blind trial found less coughing and easier expectoration within a week. Still, it is relief, not a cure — a cough lasting over two weeks, or with fever or trouble breathing, needs a doctor. No honey for babies under one.",
    duration: "~10 mins",
    imageLabel: "Photo placeholder — Spanish thyme leaves",
  },
  {
    id: "noni-fruit-tonic",
    title: "Noni Fruit Tonic",
    khmerName: "ផ្លែញរ",
    category: "Heart & Circulation",
    contributor: "Family elder",
    place: "Phnom Penh",
    ingredients:
      "ផ្លែញរ (Morinda citrifolia) picked when half-ripe, plus honey or palm sugar — enough to coat the fruit",
    process: [
      "Wash the fruit and leave it in the house a few days to soften.",
      "Cut it up, mix it well with honey or sugar, and seal it in a clean jar for 18 to 20 days.",
      "Drink a small amount before meals, three or four times a day.",
    ],
    benefit:
      "Khmer families have used ញរ for about two hundred years, and everything on the tree gets used — the young leaves wrap fish amok, and the crushed bark becomes an ointment for sore muscles and joints. The fruit is the medicine part: people take it for immunity, aching joints, skin and signs of ageing, and to help keep blood pressure down. Some of that holds up. A trial in heavy smokers found real drops in cholesterol and inflammation, and a small study of ten people saw blood pressure fall from 144/83 to 132/76 after a month. But these studies are small, and nothing is proven. Elders here already warn it off for pregnant women and anyone with kidney or liver trouble — good advice, because ញរ is heavy in potassium and has been linked to rare liver injury. Expect a foul smell and bad breath, and stop if your eyes or urine turn dark.",
    duration: "~10 mins",
    imageLabel: "Photo placeholder — noni fruit jar",
  },
];

export default entries;
