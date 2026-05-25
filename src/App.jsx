import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  Globe2,
  Search,
  ShoppingCart,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";

const SIZES = ["S", "M", "L", "XL", "XXL", "XXXL"];

const JERSEY_TYPES = [
  { key: "home", fr: "Chandail Domicile Régulier", en: "Regular Home Jersey", price: 80 },
  { key: "away", fr: "Chandail Extérieur Régulier", en: "Regular Away Jersey", price: 80 },
  { key: "home2024", fr: "Chandail Domicile 2024", en: "2024 Home Jersey", price: 80 },
  { key: "away2024", fr: "Chandail Extérieur 2024", en: "2024 Away Jersey", price: 80 },
  { key: "alternate", fr: "Chandail Alternatif", en: "Alternate Jersey", price: 80 },
  { key: "custom", fr: "Chandail Custom", en: "Custom Jersey", price: 95 },
];

const NHL_TEAMS = {
  Est: {
    Atlantique: [
      { team: "Boston Bruins", players: ["David Pastrnak", "Brad Marchand", "Charlie McAvoy", "Bobby Orr", "Ray Bourque"] },
      { team: "Buffalo Sabres", players: ["Tage Thompson", "Rasmus Dahlin", "Owen Power", "Dominik Hasek", "Gilbert Perreault"] },
      { team: "Detroit Red Wings", players: ["Dylan Larkin", "Lucas Raymond", "Moritz Seider", "Steve Yzerman", "Nicklas Lidstrom"] },
      { team: "Florida Panthers", players: ["Aleksander Barkov", "Matthew Tkachuk", "Sam Reinhart", "Sergei Bobrovsky", "Aaron Ekblad"] },
      {
        team: "Montréal Canadiens",
        players: [
          "Nick Suzuki",
          "Cole Caufield",
          "Lane Hutson",
          "Ivan Demidov",
          "Juraj Slafkovsky",
          "Jakub Dobes",
          "Jacob Fowler",
          "Noah Dobson",
          "Josh Anderson",
          "Brendan Gallagher",
          "Alex Newhook",
          "Kirby Dach",
          "Zach Bolduc",
          "David Reinbacher",
          "Oliver Kapanen",
          "Arber Xhekaj",
          "Kaiden Guhle",
        ],
      },
      { team: "Ottawa Senators", players: ["Brady Tkachuk", "Tim Stützle", "Jake Sanderson", "Thomas Chabot", "Daniel Alfredsson"] },
      { team: "Tampa Bay Lightning", players: ["Nikita Kucherov", "Brayden Point", "Victor Hedman", "Andrei Vasilevskiy", "Steven Stamkos"] },
      { team: "Toronto Maple Leafs", players: ["Auston Matthews", "Mitch Marner", "William Nylander", "John Tavares", "Mats Sundin"] },
    ],
    Metropolitaine: [
      { team: "Carolina Hurricanes", players: ["Sebastian Aho", "Andrei Svechnikov", "Jaccob Slavin", "Rod Brind'Amour", "Eric Staal"] },
      { team: "Columbus Blue Jackets", players: ["Adam Fantilli", "Zach Werenski", "Johnny Gaudreau", "Rick Nash", "Kirill Marchenko"] },
      { team: "New Jersey Devils", players: ["Jack Hughes", "Nico Hischier", "Jesper Bratt", "Dougie Hamilton", "Martin Brodeur"] },
      { team: "New York Islanders", players: ["Mathew Barzal", "Bo Horvat", "Ilya Sorokin", "Mike Bossy", "Bryan Trottier"] },
      { team: "New York Rangers", players: ["Artemi Panarin", "Mika Zibanejad", "Adam Fox", "Igor Shesterkin", "Mark Messier", "Brian Leetch"] },
      { team: "Philadelphia Flyers", players: ["Matvei Michkov", "Travis Konecny", "Owen Tippett", "Bobby Clarke", "Eric Lindros"] },
      { team: "Pittsburgh Penguins", players: ["Sidney Crosby", "Evgeni Malkin", "Kris Letang", "Jaromir Jagr", "Mario Lemieux"] },
      { team: "Washington Capitals", players: ["Alex Ovechkin", "John Carlson", "Tom Wilson", "Nicklas Backstrom", "Peter Bondra"] },
    ],
  },
  Ouest: {
    Centrale: [
      { team: "Chicago Blackhawks", players: ["Connor Bedard", "Taylor Hall", "Alex Vlasic", "Patrick Kane", "Jonathan Toews"] },
      { team: "Colorado Avalanche", players: ["Nathan MacKinnon", "Cale Makar", "Mikko Rantanen", "Joe Sakic", "Peter Forsberg", "Patrick Roy"] },
      { team: "Dallas Stars", players: ["Jason Robertson", "Miro Heiskanen", "Roope Hintz", "Jake Oettinger", "Mike Modano"] },
      { team: "Minnesota Wild", players: ["Kirill Kaprizov", "Matt Boldy", "Joel Eriksson Ek", "Brock Faber", "Marian Gaborik"] },
      { team: "Nashville Predators", players: ["Filip Forsberg", "Roman Josi", "Juuse Saros", "Ryan O'Reilly", "Shea Weber", "Pekka Rinne"] },
      { team: "St. Louis Blues", players: ["Robert Thomas", "Jordan Kyrou", "Jordan Binnington", "Brett Hull", "Alex Pietrangelo"] },
      { team: "Utah Mammoth", players: ["Logan Cooley", "Dylan Guenther", "Clayton Keller", "Mikhail Sergachev", "Connor Ingram"] },
      { team: "Winnipeg Jets", players: ["Connor Hellebuyck", "Kyle Connor", "Mark Scheifele", "Josh Morrissey", "Teemu Selanne", "Dale Hawerchuk"] },
    ],
    Pacifique: [
      { team: "Anaheim Ducks", players: ["Leo Carlsson", "Trevor Zegras", "Mason McTavish", "Cutter Gauthier", "Paul Kariya", "Teemu Selanne"] },
      { team: "Calgary Flames", players: ["Jonathan Huberdeau", "Nazem Kadri", "MacKenzie Weegar", "Dustin Wolf", "Jarome Iginla"] },
      { team: "Edmonton Oilers", players: ["Connor McDavid", "Leon Draisaitl", "Evan Bouchard", "Ryan Nugent-Hopkins", "Wayne Gretzky", "Mark Messier"] },
      { team: "Los Angeles Kings", players: ["Anze Kopitar", "Drew Doughty", "Kevin Fiala", "Quinton Byfield", "Wayne Gretzky", "Luc Robitaille"] },
      { team: "San Jose Sharks", players: ["Macklin Celebrini", "Will Smith", "William Eklund", "Logan Couture", "Joe Thornton", "Patrick Marleau"] },
      { team: "Seattle Kraken", players: ["Matty Beniers", "Jared McCann", "Vince Dunn", "Jordan Eberle", "Adam Larsson"] },
      { team: "Vancouver Canucks", players: ["Elias Pettersson", "Quinn Hughes", "J.T. Miller", "Thatcher Demko", "Pavel Bure", "Trevor Linden"] },
      { team: "Vegas Golden Knights", players: ["Jack Eichel", "Mark Stone", "Alex Pietrangelo", "William Karlsson", "Marc-Andre Fleury", "Jonathan Marchessault"] },
    ],
  },
};

const OTHER_SPORTS = {
  NFL: ["Kansas City Chiefs", "Buffalo Bills", "Dallas Cowboys", "Philadelphia Eagles", "San Francisco 49ers", "Green Bay Packers"],
  MLB: ["Toronto Blue Jays", "New York Yankees", "Los Angeles Dodgers", "Boston Red Sox", "New York Mets", "Montreal Expos"],
  NBA: ["Toronto Raptors", "Los Angeles Lakers", "Boston Celtics", "Chicago Bulls", "Golden State Warriors", "New York Knicks"],
  WWE: ["Roman Reigns", "Cody Rhodes", "The Rock", "John Cena", "Stone Cold", "The Undertaker"],
};

const TRANSLATIONS = {
  fr: {
    shop: "Magasiner",
    sports: "Sports",
    subtitle: "Chandails sportifs premium pour les vrais partisans.",
    hero: "Boutique bilingue de chandails LNH, NFL, MLB, NBA et WWE.",
    chooseSport: "Choisir un sport",
    east: "Conférence Est",
    west: "Conférence Ouest",
    back: "Retour",
    add: "Ajouter au panier",
    player: "Joueur",
    size: "Grandeur",
    familyName: "Nom de famille",
    number: "Numéro",
    cart: "Panier",
    empty: "Votre panier est vide.",
    home: "Accueil",
    customNotice: "Chandail personnalisé avec nom et numéro.",
    subtotal: "Sous-total",
    coming: "Structure prête : équipes, chandails, joueurs et grandeurs seront ajoutés comme pour la LNH.",
    searchTeam: "Rechercher une équipe",
    route: "Sports -> conférence/ligue -> équipe -> chandail -> joueur/grandeur.",
    quality: "Qualité premium",
    easy: "Commande simple",
    bilingual: "Service bilingue",
    shipping: "Livraison rapide",
  },
  en: {
    shop: "Shop",
    sports: "Sports",
    subtitle: "Premium sports jerseys for real fans.",
    hero: "Bilingual store for NHL, NFL, MLB, NBA and WWE jerseys.",
    chooseSport: "Choose a sport",
    east: "Eastern Conference",
    west: "Western Conference",
    back: "Back",
    add: "Add to cart",
    player: "Player",
    size: "Size",
    familyName: "Last name",
    number: "Number",
    cart: "Cart",
    empty: "Your cart is empty.",
    home: "Home",
    customNotice: "Personalized jersey with name and number.",
    subtotal: "Subtotal",
    coming: "Structure ready: teams, jerseys, players and sizes will be added like NHL.",
    searchTeam: "Search a team",
    route: "Sports -> conference/league -> team -> jersey -> player/size.",
    quality: "Premium quality",
    easy: "Easy ordering",
    bilingual: "Bilingual service",
    shipping: "Fast shipping",
  },
};

function money(amount) {
  return new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getAllNhlTeams() {
  return Object.values(NHL_TEAMS).flatMap((conference) => Object.values(conference).flat());
}

function runDataChecks() {
  const teams = getAllNhlTeams();
  console.assert(teams.length === 32, `Expected 32 NHL teams, got ${teams.length}`);
  console.assert(JERSEY_TYPES.length === 6, `Expected 6 jersey types, got ${JERSEY_TYPES.length}`);
  console.assert(JERSEY_TYPES.some((item) => item.key === "custom"), "Expected custom jersey type");
  console.assert(SIZES.includes("XXXL"), "Expected XXXL size option");
  console.assert(Boolean(NHL_TEAMS.Est), "Expected Eastern Conference");
  console.assert(Boolean(NHL_TEAMS.Ouest), "Expected Western Conference");
  const canadiens = teams.find((item) => item.team === "Montréal Canadiens");
  console.assert(Boolean(canadiens), "Expected Montréal Canadiens to exist");
  console.assert(canadiens?.players.includes("Ivan Demidov"), "Expected Ivan Demidov in Montréal Canadiens players");
  console.assert(canadiens?.players.includes("Kaiden Guhle"), "Expected Kaiden Guhle in Montréal Canadiens players");
}

runDataChecks();

function TeamPage({ team, lang, text, onBack, addToCart }) {
  const [choices, setChoices] = useState({});

  function updateChoice(jerseyKey, field, value) {
    setChoices((current) => ({
      ...current,
      [jerseyKey]: {
        ...current[jerseyKey],
        [field]: value,
      },
    }));
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 rounded-2xl border border-white/15 px-5 py-3 font-bold text-white/80 hover:border-orange-300 hover:text-orange-300"
        >
          <ArrowLeft size={18} />
          {text.back}
        </button>

        <section className="rounded-[2rem] border border-orange-400/25 bg-gradient-to-br from-orange-500/20 to-white/[0.04] p-8">
          <div className="text-sm font-black uppercase tracking-[0.3em] text-orange-300">LNH / NHL</div>
          <h1 className="mt-3 text-4xl font-black md:text-6xl">{team.team}</h1>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {JERSEY_TYPES.map((jersey) => {
            const current = choices[jersey.key] || {};
            const selectedPlayer = current.player || team.players[0];
            const selectedSize = current.size || "L";
            const customName = current.name || "TREMBLAY";
            const customNumber = current.number || "31";
            const title = lang === "fr" ? jersey.fr : jersey.en;
            const cartName = jersey.key === "custom"
              ? `${title} - ${customName} #${customNumber} - ${selectedSize}`
              : `${title} - ${selectedPlayer} - ${selectedSize}`;

            return (
              <article
                key={jersey.key}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-xl shadow-black/20"
              >
                <div className="grid h-56 place-items-center bg-gradient-to-br from-neutral-800 to-neutral-950">
                  <div className="text-center">
                    <div className="text-6xl">🏒</div>
                    <div className="mt-3 font-black text-orange-300">{team.team}</div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-2 w-fit rounded-full bg-orange-500 px-3 py-1 text-xs font-black text-neutral-950">
                    {money(jersey.price)}
                  </div>
                  <h2 className="text-xl font-black">{title}</h2>

                  {jersey.key === "custom" ? (
                    <div>
                      <p className="mt-2 text-sm text-white/55">{text.customNotice}</p>
                      <label className="mt-5 block text-sm font-bold text-white/70">{text.familyName}</label>
                      <input
                        value={customName}
                        maxLength={14}
                        onChange={(event) => updateChoice(jersey.key, "name", event.target.value.toUpperCase())}
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 outline-none focus:border-orange-300"
                      />
                      <label className="mt-4 block text-sm font-bold text-white/70">{text.number}</label>
                      <select
                        value={customNumber}
                        onChange={(event) => updateChoice(jersey.key, "number", event.target.value)}
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 outline-none focus:border-orange-300"
                      >
                        {Array.from({ length: 100 }, (_, index) => (
                          <option key={index} value={String(index)}>
                            {index}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="mt-5 block text-sm font-bold text-white/70">{text.player}</label>
                      <select
                        value={selectedPlayer}
                        onChange={(event) => updateChoice(jersey.key, "player", event.target.value)}
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 outline-none focus:border-orange-300"
                      >
                        {team.players.map((player) => (
                          <option key={player} value={player}>
                            {player}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <label className="mt-4 block text-sm font-bold text-white/70">{text.size}</label>
                  <select
                    value={selectedSize}
                    onChange={(event) => updateChoice(jersey.key, "size", event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 outline-none focus:border-orange-300"
                  >
                    {SIZES.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => addToCart({
                      id: `${team.team}-${jersey.key}-${Date.now()}`,
                      name: cartName,
                      team: team.team,
                      price: jersey.price,
                    })}
                    className="mt-5 w-full rounded-2xl bg-orange-500 px-4 py-3 font-black text-neutral-950 transition hover:bg-orange-300"
                  >
                    {text.add}
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}

export default function App() {
  const [lang, setLang] = useState("fr");
  const [sport, setSport] = useState(null);
  const [conference, setConference] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);

  const text = TRANSLATIONS[lang];

  const nhlTeamList = useMemo(() => {
    if (!conference) {
      return [];
    }
    return Object.values(NHL_TEAMS[conference]).flat();
  }, [conference]);

  const filteredNhlTeams = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return nhlTeamList;
    }
    return nhlTeamList.filter((team) => team.team.toLowerCase().includes(normalizedQuery));
  }, [nhlTeamList, query]);

  const filteredTeamNames = new Set(filteredNhlTeams.map((team) => team.team));
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);

  function resetHome() {
    setSport(null);
    setConference(null);
    setSelectedTeam(null);
    setQuery("");
  }

  function selectSport(nextSport) {
    setSport(nextSport);
    setConference(null);
    setSelectedTeam(null);
    setQuery("");
  }

  function addToCart(item) {
    setCart((current) => [...current, item]);
  }

  if (selectedTeam) {
    return (
      <TeamPage
        team={selectedTeam}
        lang={lang}
        text={text}
        onBack={() => setSelectedTeam(null)}
        addToCart={addToCart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="bg-orange-500 px-4 py-2 text-center text-sm font-black text-neutral-950">
        Affichez vos couleurs / Show your colors - Passion Sports Boutique
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <button type="button" onClick={resetHome} className="flex items-center gap-3 text-left">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-orange-400 to-red-600 text-xl font-black text-neutral-950">
              PS
            </div>
            <div>
              <div className="text-xl font-black">Passion Sports</div>
              <div className="-mt-1 text-xs uppercase tracking-[0.35em] text-orange-300">Boutique</div>
            </div>
          </button>

          <nav className="hidden gap-6 md:flex">
            <button type="button" onClick={resetHome} className="font-bold text-white/75 hover:text-orange-300">
              {text.home}
            </button>
            <a href="#sports" className="font-bold text-white/75 hover:text-orange-300">
              {text.sports}
            </a>
            <a href="#cart" className="font-bold text-white/75 hover:text-orange-300">
              {text.cart}
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 font-bold hover:border-orange-300 hover:text-orange-300"
            >
              <Globe2 size={16} />
              {lang === "fr" ? "EN" : "FR"}
            </button>
            <a href="#cart" className="relative rounded-full bg-white px-3 py-2 text-neutral-950 hover:bg-orange-300">
              <ShoppingCart size={18} />
              {cart.length > 0 ? (
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-orange-500 text-xs font-black">
                  {cart.length}
                </span>
              ) : null}
            </a>
          </div>
        </div>
      </header>

      <main>
        {!sport ? (
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.25),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(239,68,68,0.18),transparent_25%)]" />
            <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
              <div>
                <div className="mb-5 inline-flex rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm font-bold text-orange-200">
                  LNH - NFL - MLB - NBA - WWE
                </div>
                <h1 className="text-5xl font-black tracking-tight md:text-7xl">Passion Sports Boutique</h1>
                <p className="mt-5 text-2xl font-bold text-orange-300">{text.subtitle}</p>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">{text.hero}</p>
                <a
                  href="#sports"
                  className="mt-8 inline-flex rounded-2xl bg-orange-500 px-7 py-4 font-black text-neutral-950 shadow-2xl shadow-orange-500/20 hover:bg-orange-300"
                >
                  {text.shop}
                </a>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40">
                <div className="grid grid-cols-2 gap-4">
                  {["LNH", "NFL", "MLB", "NBA"].map((item) => (
                    <div key={item} className="grid h-40 place-items-center rounded-[1.5rem] bg-neutral-900 text-4xl font-black text-orange-300">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {!sport ? (
          <section className="border-y border-white/10 bg-white/[0.03]">
            <div className="mx-auto grid max-w-7xl gap-4 px-4 py-7 md:grid-cols-4">
              {[
                { icon: Star, label: text.quality },
                { icon: ShieldCheck, label: text.easy },
                { icon: Globe2, label: text.bilingual },
                { icon: Truck, label: text.shipping },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-4">
                  <Icon className="text-orange-300" />
                  <span className="font-bold text-white/80">{label}</span>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section id="sports" className="mx-auto max-w-7xl px-4 py-16">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-black md:text-4xl">{text.chooseSport}</h2>
              <p className="mt-2 text-white/60">{text.route}</p>
            </div>
            {sport ? (
              <button
                type="button"
                onClick={resetHome}
                className="rounded-2xl border border-white/15 px-5 py-3 font-bold hover:border-orange-300 hover:text-orange-300"
              >
                {text.back}
              </button>
            ) : null}
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            {["LNH", "NFL", "MLB", "NBA", "WWE"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => selectSport(item)}
                className={`rounded-[2rem] border px-6 py-10 text-3xl font-black transition ${
                  sport === item
                    ? "border-orange-300 bg-orange-500 text-neutral-950"
                    : "border-white/10 bg-white/[0.04] hover:border-orange-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {sport === "LNH" ? (
            <div className="mt-10">
              <div className="mb-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setConference("Est")}
                  className={`rounded-2xl px-5 py-3 font-black ${
                    conference === "Est" ? "bg-orange-500 text-neutral-950" : "bg-white/10 text-white/75 hover:bg-white/15"
                  }`}
                >
                  {text.east}
                </button>
                <button
                  type="button"