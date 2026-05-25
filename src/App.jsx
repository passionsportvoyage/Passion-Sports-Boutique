import React, { useMemo, useState } from "react";
import { Search, ShoppingCart, Globe2, Menu, X, Star, Truck, ShieldCheck, Heart, ChevronRight, Filter, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const translations = {
  fr: {
    announcement: "Affichez vos couleurs — livraison partout au Canada • Nouveaux arrivages chaque semaine",
    shopNow: "Magasiner maintenant",
    heroTitle: "Passion Sports Boutique",
    heroSubtitle: "Chandails sportifs premium pour les vrais partisans.",
    heroText: "LNH, NFL, MLB, NBA, soccer international, WWE et collections rétro — une boutique bilingue moderne, rapide et prête pour vos produits.",
    search: "Rechercher un joueur, une équipe ou un sport",
    categories: "Catégories populaires",
    featured: "Produits en vedette",
    teams: "Équipes populaires",
    allProducts: "Catalogue",
    add: "Ajouter",
    view: "Voir",
    cart: "Panier",
    emptyCart: "Votre panier est vide.",
    subtotal: "Sous-total",
    checkout: "Passer la commande",
    sizes: "Grandeurs",
    color: "Couleur",
    price: "Prix",
    league: "Ligue",
    team: "Équipe",
    trust1: "Qualité premium",
    trust2: "Commande simple",
    trust3: "Service bilingue",
    trust4: "Livraison rapide",
    newsletter: "Recevez les nouveaux arrivages",
    newsletterText: "Promotions, collections spéciales et chandails rétro directement dans votre courriel.",
    email: "Votre courriel",
    subscribe: "S'abonner",
    contact: "Contact",
    contactText: "Pour questions, commandes spéciales ou tailles particulières.",
    rights: "Tous droits réservés.",
    home: "Accueil",
    nhl: "LNH",
    nfl: "NFL",
    mlb: "MLB",
    nba: "NBA",
    soccer: "Soccer",
    wwe: "WWE",
    retro: "Rétro",
    promo: "Promotions",
    custom: "Personnalisés",
    orderNote: "Note: branchement Stripe/Shopify/WooCommerce possible à l'étape suivante.",
    filterAll: "Toutes",
  },
  en: {
    announcement: "Show your colors — shipping across Canada • New drops every week",
    shopNow: "Shop now",
    heroTitle: "Passion Sports Boutique",
    heroSubtitle: "Premium sports jerseys for real fans.",
    heroText: "NHL, NFL, MLB, NBA, international soccer, WWE and retro collections — a modern bilingual storefront ready for your products.",
    search: "Search player, team or sport",
    categories: "Popular categories",
    featured: "Featured products",
    teams: "Popular teams",
    allProducts: "Catalog",
    add: "Add",
    view: "View",
    cart: "Cart",
    emptyCart: "Your cart is empty.",
    subtotal: "Subtotal",
    checkout: "Checkout",
    sizes: "Sizes",
    color: "Color",
    price: "Price",
    league: "League",
    team: "Team",
    trust1: "Premium quality",
    trust2: "Easy ordering",
    trust3: "Bilingual service",
    trust4: "Fast shipping",
    newsletter: "Get the newest drops",
    newsletterText: "Promotions, special collections and retro jerseys straight to your inbox.",
    email: "Your email",
    subscribe: "Subscribe",
    contact: "Contact",
    contactText: "For questions, special orders or specific sizes.",
    rights: "All rights reserved.",
    home: "Home",
    nhl: "NHL",
    nfl: "NFL",
    mlb: "MLB",
    nba: "NBA",
    soccer: "Soccer",
    wwe: "WWE",
    retro: "Retro",
    promo: "Deals",
    custom: "Custom",
    orderNote: "Note: Stripe/Shopify/WooCommerce connection can be added next.",
    filterAll: "All",
  },
};

const categories = [
  { key: "nhl", icon: "🏒", image: "https://images.unsplash.com/photo-1515703407324-5f753afd8be8?auto=format&fit=crop&w=1200&q=80", color: "from-red-600 to-orange-500" },
  { key: "nfl", icon: "🏈", image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80", color: "from-orange-600 to-yellow-500" },
  { key: "mlb", icon: "⚾", image: "https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&w=1200&q=80", color: "from-blue-600 to-sky-400" },
  { key: "nba", icon: "🏀", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80", color: "from-purple-600 to-orange-500" },
  { key: "soccer", icon: "⚽", image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80", color: "from-emerald-600 to-lime-500" },
  { key: "wwe", icon: "💪", image: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?auto=format&fit=crop&w=1200&q=80", color: "from-neutral-700 to-orange-500" },
];

const nhlEastTeams = [
  {
    team: "Boston Bruins",
    players: ["Pastrnak", "Marchand", "McAvoy", "Orr", "Bourque"],
  },
  {
    team: "Buffalo Sabres",
    players: ["Thompson", "Dahlin", "Power", "Hasek", "Perreault"],
  },
  {
    team: "Detroit Red Wings",
    players: ["Larkin", "Raymond", "Seider", "Yzerman", "Lidstrom"],
  },
  {
    team: "Florida Panthers",
    players: ["Barkov", "Tkachuk", "Reinhart", "Bobrovsky", "Lundell"],
  },
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
      "Kaiden Guhle"
    ],
  },
  {
    team: "Ottawa Senators",
    players: ["Tkachuk", "Stützle", "Sanderson", "Chabot", "Alfredsson"],
  },
  {
    team: "Tampa Bay Lightning",
    players: ["Kucherov", "Point", "Hedman", "Vasilevskiy", "Stamkos"],
  },
  {
    team: "Toronto Maple Leafs",
    players: ["Matthews", "Marner", "Nylander", "Tavares", "Sundin", "Gilmour"],
  },
  {
    team: "Carolina Hurricanes",
    players: ["Aho", "Svechnikov", "Slavin", "Brind'Amour", "Staal"],
  },
  {
    team: "Columbus Blue Jackets",
    players: ["Fantilli", "Werenski", "Gaudreau", "Nash", "Marchenko"],
  },
  {
    team: "New Jersey Devils",
    players: ["Hughes", "Hischier", "Bratt", "Hamilton", "Brodeur"],
  },
  {
    team: "New York Islanders",
    players: ["Barzal", "Horvat", "Sorokin", "Bossy", "Trottier"],
  },
  {
    team: "New York Rangers",
    players: ["Panarin", "Zibanejad", "Fox", "Shesterkin", "Messier", "Leetch"],
  },
  {
    team: "Philadelphia Flyers",
    players: ["Michkov", "Konecny", "Tippett", "Clarke", "Lindros"],
  },
  {
    team: "Pittsburgh Penguins",
    players: ["Crosby", "Malkin", "Letang", "Jagr", "Lemieux"],
  },
  {
    team: "Washington Capitals",
    players: ["Ovechkin", "Carlson", "Wilson", "Backstrom", "Bondra"],
  },
];

const nhlWestTeams = [
  {
    team: "Chicago Blackhawks",
    players: ["Bedard", "Hall", "Vlasic", "Kane", "Toews", "Mikita"],
  },
  {
    team: "Colorado Avalanche",
    players: ["MacKinnon", "Makar", "Rantanen", "Sakic", "Forsberg", "Roy"],
  },
  {
    team: "Dallas Stars",
    players: ["Robertson", "Heiskanen", "Hintz", "Oettinger", "Modano", "Benn"],
  },
  {
    team: "Minnesota Wild",
    players: ["Kaprizov", "Boldy", "Eriksson Ek", "Faber", "Gaborik", "Koivu"],
  },
  {
    team: "Nashville Predators",
    players: ["Forsberg", "Josi", "Saros", "O'Reilly", "Weber", "Rinne"],
  },
  {
    team: "St. Louis Blues",
    players: ["Thomas", "Kyrou", "Binnington", "Pietrangelo", "Hull", "O'Reilly"],
  },
  {
    team: "Utah Mammoth",
    players: ["Cooley", "Guenther", "Keller", "Sergachev", "Ingram"],
  },
  {
    team: "Winnipeg Jets",
    players: ["Hellebuyck", "Connor", "Scheifele", "Morrissey", "Selanne", "Hawerchuk"],
  },
  {
    team: "Anaheim Ducks",
    players: ["Carlsson", "Zegras", "McTavish", "Gauthier", "Kariya", "Selanne"],
  },
  {
    team: "Calgary Flames",
    players: ["Huberdeau", "Kadri", "Weegar", "Wolf", "Iginla", "Fleury"],
  },
  {
    team: "Edmonton Oilers",
    players: ["McDavid", "Draisaitl", "Bouchard", "Nugent-Hopkins", "Gretzky", "Messier"],
  },
  {
    team: "Los Angeles Kings",
    players: ["Kopitar", "Doughty", "Fiala", "Byfield", "Gretzky", "Robitaille"],
  },
  {
    team: "San Jose Sharks",
    players: ["Celebrini", "Smith", "Eklund", "Couture", "Thornton", "Marleau"],
  },
  {
    team: "Seattle Kraken",
    players: ["Beniers", "McCann", "Dunn", "Eberle", "Larsson"],
  },
  {
    team: "Vancouver Canucks",
    players: ["Pettersson", "Hughes", "Miller", "Demko", "Bure", "Linden"],
  },
  {
    team: "Vegas Golden Knights",
    players: ["Eichel", "Stone", "Pietrangelo", "Karlsson", "Fleury", "Marchessault"],
  },
];

const sizes = ["S", "M", "L", "XL", "XXL", "XXXL"];

const jerseyStyles = [
  { key: "home", fr: "Chandail Domicile Régulier", en: "Regular Home Jersey" },
  { key: "away", fr: "Chandail Extérieur Régulier", en: "Regular Away Jersey" },
  { key: "home2024", fr: "Chandail Domicile 2024", en: "2024 Home Jersey" },
  { key: "away2024", fr: "Chandail Extérieur 2024", en: "2024 Away Jersey" },
  { key: "alternate", fr: "Chandail Alternatif", en: "Alternate Jersey" },
  { key: "custom", fr: "Chandail Custom", en: "Custom Jersey" },
];

const nhlConferences = {
  Est: {
    Atlantique: nhlEastTeams.slice(0, 8),
    Métropolitaine: nhlEastTeams.slice(8, 16),
  },
  Ouest: {
    Centrale: nhlWestTeams.slice(0, 8),
    Pacifique: nhlWestTeams.slice(8, 16),
  },
};

function TeamPage({ teamData, lang, t, onBack, onAdd }) {
  const [selectedPlayers, setSelectedPlayers] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [customNames, setCustomNames] = useState({});
  const [customNumbers, setCustomNumbers] = useState({});

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <button onClick={onBack} className="mb-6 rounded-2xl border border-white/15 px-5 py-3 font-bold text-white/75 hover:border-orange-300 hover:text-orange-300">← Retour aux équipes</button>
      <div className="mb-8 rounded-[2rem] border border-orange-400/25 bg-gradient-to-br from-orange-500/20 to-white/[0.04] p-8">
        <div className="text-sm font-black uppercase tracking-[0.3em] text-orange-300">NHL / LNH</div>
        <h2 className="mt-3 text-4xl font-black md:text-6xl">{teamData.team}</h2>
        <p className="mt-4 max-w-2xl text-white/65">Choisis le modèle de chandail, le joueur et la grandeur. Chaque équipe peut avoir ses propres photos et variantes.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jerseyStyles.map((style) => {
          const player = selectedPlayers[style.key] || teamData.players[0];
          const customName = customNames[style.key] || "TREMBLAY";
          const customNumber = customNumbers[style.key] || "31";
          const size = selectedSizes[style.key] || sizes[2];
          const itemName = lang === "fr" ? style.fr : style.en;
          return (
            <article key={style.key} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-xl shadow-black/20">
              <img src="https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80" alt={`${teamData.team} ${itemName}`} className="h-64 w-full object-cover" />
              <div className="p-5">
                <div className="mb-2 rounded-full bg-orange-500 px-3 py-1 text-xs font-black text-neutral-950 w-fit">80$ CAD</div>
                <h3 className="text-xl font-black">{itemName}</h3>
                <p className="mt-1 text-sm text-white/55">{teamData.team}</p>

                {style.key !== "custom" ? (
                  <>
                    <label className="mt-5 block text-sm font-bold text-white/70">Joueur</label>
                    <select value={player} onChange={(e) => setSelectedPlayers({ ...selectedPlayers, [style.key]: e.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 outline-none focus:border-orange-300">
                      {teamData.players.map((p) => <option key={p}>{p}</option>)}
                    </select>
                  </>
                ) : (
                  <>
                    <label className="mt-5 block text-sm font-bold text-white/70">Nom de famille</label>
                    <input value={customName} maxLength={14} onChange={(e) => setCustomNames({ ...customNames, [style.key]: e.target.value.toUpperCase() })} className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 outline-none focus:border-orange-300" placeholder="TREMBLAY" />

                    <label className="mt-4 block text-sm font-bold text-white/70">Numéro</label>
                    <select value={customNumber} onChange={(e) => setCustomNumbers({ ...customNumbers, [style.key]: e.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 outline-none focus:border-orange-300">
                      {Array.from({ length: 100 }, (_, i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </>
                )}

                <label className="mt-4 block text-sm font-bold text-white/70">Grandeur</label>
                <select value={size} onChange={(e) => setSelectedSizes({ ...selectedSizes, [style.key]: e.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 outline-none focus:border-orange-300">
                  {sizes.map((s) => <option key={s}>{s}</option>)}
                </select>

                <button onClick={() => onAdd({ id: `${teamData.team}-${style.key}-${player}-${size}`,
                  league: "NHL",
                  team: teamData.team,
                  nameFr: style.key === "custom"
                    ? `${style.fr} - ${customName} #${customNumber} - ${size}`
                    : `${style.fr} - ${player} - ${size}`,
                  nameEn: style.key === "custom"
                    ? `${style.en} - ${customName} #${customNumber} - ${size}`
                    : `${style.en} - ${player} - ${size}`,
                  price: style.key === "custom" ? 95 : 80,
                  img: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80"
                })}({ id: `${teamData.team}-${style.key}-${player}-${size}`, league: "NHL", team: teamData.team, nameFr: `${style.fr} - ${player} - ${size}`, nameEn: `${style.en} - ${player} - ${size}`, price: 80, img: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80" })} className="mt-5 w-full rounded-2xl bg-orange-500 px-4 py-3 font-black text-neutral-950 transition hover:bg-orange-300">Ajouter au panier</button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

const products = [
  ...nhlEastTeams.map((item, index) => ({
    id: index + 1,
    league: "NHL",
    team: item.team,
    players: item.players,
    nameFr: `Chandail ${item.team}`,
    nameEn: `${item.team} jersey`,
    price: 80,
    sizes,
    tag: index < 8 ? "Atlantique" : "Métropolitaine",
    img: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80",
  })),
  ...nhlWestTeams.map((item, index) => ({
    id: index + 17,
    league: "NHL",
    team: item.team,
    players: item.players,
    nameFr: `Chandail ${item.team}`,
    nameEn: `${item.team} jersey`,
    price: 80,
    sizes,
    tag: index < 8 ? "Centrale" : "Pacifique",
    img: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80",
  })),
  { id: 101, league: "NFL", team: "Kansas City Chiefs", players: ["Mahomes", "Kelce", "Rice"], nameFr: "Chandail football rouge premium", nameEn: "Premium red football jersey", price: 75, sizes, tag: "Populaire", img: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=900&q=80" },
  { id: 102, league: "NFL", team: "Buffalo Bills", players: ["Allen", "Cook", "Coleman"], nameFr: "Chandail football bleu royal", nameEn: "Royal blue football jersey", price: 75, sizes, tag: "Nouveau", img: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80" },
  { id: 103, league: "MLB", team: "Toronto Blue Jays", players: ["Guerrero", "Bichette", "Gausman"], nameFr: "Chandail baseball blanc/bleu", nameEn: "White and blue baseball jersey", price: 80, sizes, tag: "Canada", img: "https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&w=900&q=80" },
  { id: 104, league: "NBA", team: "Toronto Raptors", players: ["Barnes", "Quickley", "Carter"], nameFr: "Chandail basketball noir/rouge", nameEn: "Black and red basketball jersey", price: 80, sizes, tag: "Canada", img: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=900&q=80" },
];

const popularTeams = {
  NHL: ["Canadiens", "Rangers", "Maple Leafs", "Bruins", "Oilers", "Blackhawks", "Nordiques", "Red Wings"],
  NFL: ["Chiefs", "Bills", "Cowboys", "Eagles", "Packers", "49ers", "Giants", "Steelers"],
  MLB: ["Blue Jays", "Yankees", "Dodgers", "Red Sox", "Mets", "Expos", "Cubs", "Cardinals"],
  NBA: ["Raptors", "Lakers", "Celtics", "Bulls", "Warriors", "Knicks", "Heat", "Spurs"],
  Soccer: ["Canada", "France", "Portugal", "Argentine", "Brésil", "Italie", "Espagne", "Inter Miami"],
};

function formatPrice(value) {
  return new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(value);
}

export default function PassionSportsBoutique() {
  const [lang, setLang] = useState("fr");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [league, setLeague] = useState("All");
  const [cart, setCart] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedConference, setSelectedConference] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const t = translations[lang];

  const nav = [t.home, t.nhl, t.nfl, t.mlb, t.nba, t.soccer, t.wwe, t.retro, t.promo];

  const filteredProducts = useMemo(() => {
    const q = query.toLowerCase();
    return products.filter((p) => {
      const matchLeague = league === "All" || p.league === league;
      const matchSearch = [p.team, p.player, p.nameFr, p.nameEn, p.league].join(" ").toLowerCase().includes(q);
      return matchLeague && matchSearch;
    });
  }, [query, league]);

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);

  const addToCart = (product) => setCart((current) => [...current, product]);

  if (selectedTeam) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white">
        <TeamPage teamData={selectedTeam} lang={lang} t={t} onBack={() => setSelectedTeam(null)} onAdd={addToCart} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="bg-orange-500 px-4 py-2 text-center text-sm font-bold text-neutral-950">
        {t.announcement}
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-orange-400 to-red-600 text-xl font-black shadow-lg shadow-orange-500/20">PS</div>
            <div>
              <div className="text-lg font-black tracking-tight">Passion Sports</div>
              <div className="-mt-1 text-xs uppercase tracking-[0.35em] text-orange-300">Boutique</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 lg:flex">
            {nav.map((item) => (
              <a key={item} href="#catalog" className="text-sm font-semibold text-white/75 transition hover:text-orange-300">{item}</a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === "fr" ? "en" : "fr")} className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-sm font-bold text-white/80 hover:border-orange-300 hover:text-orange-300">
              <Globe2 size={16} /> {lang === "fr" ? "EN" : "FR"}
            </button>
            <a href="#cart" className="relative rounded-full bg-white px-3 py-2 text-neutral-950 transition hover:bg-orange-300">
              <ShoppingCart size={18} />
              {cart.length > 0 && <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-orange-500 text-xs font-black">{cart.length}</span>}
            </a>
            <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
        {mobileOpen && (
          <div className="border-t border-white/10 px-4 py-4 lg:hidden">
            <div className="grid gap-3">
              {nav.map((item) => <a key={item} href="#catalog" className="rounded-xl bg-white/5 px-4 py-3 font-semibold">{item}</a>)}
            </div>
          </div>
        )}
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.24),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(239,68,68,0.18),transparent_25%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
            <div className="mb-5 inline-flex rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm font-bold text-orange-200">NHL • NFL • MLB • NBA • Soccer • WWE</div>
            <h1 className="max-w-4xl text-5xl font-black tracking-tight md:text-7xl">{t.heroTitle}</h1>
            <p className="mt-5 text-2xl font-bold text-orange-300">{t.heroSubtitle}</p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">{t.heroText}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#catalog" className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 font-black text-neutral-950 shadow-2xl shadow-orange-500/20 transition hover:bg-orange-300">{t.shopNow}<ChevronRight className="transition group-hover:translate-x-1" /></a>
              <a href="#contact" className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-6 py-4 font-bold text-white/80 transition hover:border-orange-300 hover:text-orange-300">{t.custom}</a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative z-10">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl shadow-black/40 backdrop-blur">
              <div className="grid grid-cols-2 gap-3">
                {products.slice(0, 4).map((p) => (
                  <div key={p.id} className="overflow-hidden rounded-[1.5rem] bg-neutral-900">
                    <img src={p.img} alt={lang === "fr" ? p.nameFr : p.nameEn} className="h-44 w-full object-cover opacity-80" />
                    <div className="p-4">
                      <div className="text-xs font-black text-orange-300">{p.league}</div>
                      <div className="line-clamp-1 text-sm font-bold">{p.team}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-7 md:grid-cols-4">
          {[{ icon: Star, label: t.trust1 }, { icon: ShieldCheck, label: t.trust2 }, { icon: Globe2, label: t.trust3 }, { icon: Truck, label: t.trust4 }].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-4">
              <Icon className="text-orange-300" />
              <span className="font-bold text-white/80">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black md:text-4xl">{t.categories}</h2>
            <p className="mt-2 text-white/60">Une navigation simple par sport, équipe et collection.</p>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <button key={cat.key} onClick={() => setLeague(cat.key === "soccer" ? "Soccer" : cat.key.toUpperCase())} className="group relative overflow-hidden rounded-[2rem] p-0 text-left shadow-xl shadow-black/20">
              <img src={cat.image} alt={t[cat.key]} className="h-56 w-full object-cover opacity-55 transition duration-500 group-hover:scale-105 group-hover:opacity-75" />
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-45`} />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="mb-2 text-4xl">{cat.icon}</div>
                <div className="text-3xl font-black">{t[cat.key]}</div>
                <div className="mt-2 flex items-center gap-2 text-sm font-bold text-white/85">{t.view} <ChevronRight size={16} /></div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section id="catalog" className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-black md:text-4xl">Catalogue par sport</h2>
          <p className="mt-2 text-white/60">Clique sur un sport, puis sur une conférence et une équipe.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          {["LNH", "NFL", "MLB", "NBA", "WWE"].map((sport) => (
            <button key={sport} onClick={() => { setSelectedSport(sport); setSelectedConference(null); }} className={`rounded-[2rem] border px-6 py-8 text-2xl font-black transition ${selectedSport === sport ? "border-orange-300 bg-orange-500 text-neutral-950" : "border-white/10 bg-white/[0.04] hover:border-orange-300"}`}>{sport}</button>
          ))}
        </div>

        {selectedSport === "LNH" && (
          <div className="mt-10">
            <div className="mb-6 flex flex-wrap gap-3">
              {["Est", "Ouest"].map((conf) => (
                <button key={conf} onClick={() => setSelectedConference(conf)} className={`rounded-2xl px-5 py-3 font-black ${selectedConference === conf ? "bg-orange-500 text-neutral-950" : "bg-white/10 text-white/75 hover:bg-white/15"}`}>Conférence {conf}</button>
              ))}
            </div>

            {selectedConference && (
              <div className="grid gap-8 lg:grid-cols-2">
                {Object.entries(nhlConferences[selectedConference]).map(([division, teams]) => (
                  <div key={division} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                    <h3 className="mb-5 text-2xl font-black text-orange-300">Division {division}</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {teams.map((team) => (
                        <button key={team.team} onClick={() => setSelectedTeam(team)} className="rounded-2xl bg-white/5 px-4 py-4 text-left font-bold text-white/80 transition hover:bg-orange-500 hover:text-neutral-950">{team.team}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {selectedSport && selectedSport !== "LNH" && (
          <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
            <h3 className="text-2xl font-black">{selectedSport}</h3>
            <p className="mt-2 text-white/60">Même structure à venir : ligue → équipes → page équipe → chandails → joueur → grandeur.</p>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-3xl font-black md:text-4xl">{t.teams}</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {Object.entries(popularTeams).map(([leagueName, teams]) => (
            <div key={leagueName} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
              <h3 className="mb-4 text-xl font-black text-orange-300">{leagueName}</h3>
              <div className="grid gap-2">
                {teams.map((team) => <button key={team} onClick={() => setQuery(team)} className="rounded-xl bg-white/5 px-3 py-2 text-left text-sm font-semibold text-white/75 transition hover:bg-orange-500 hover:text-neutral-950">{team}</button>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="cart" className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <h2 className="mb-6 text-3xl font-black">{t.cart}</h2>
            {cart.length === 0 ? <p className="text-white/60">{t.emptyCart}</p> : (
              <div className="grid gap-4">
                {cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex items-center justify-between gap-4 rounded-2xl bg-white/5 p-4">
                    <div className="flex items-center gap-4">
                      <img src={item.img} alt="" className="h-16 w-16 rounded-xl object-cover" />
                      <div>
                        <div className="font-bold">{lang === "fr" ? item.nameFr : item.nameEn}</div>
                        <div className="text-sm text-white/55">{item.team}</div>
                      </div>
                    </div>
                    <div className="font-black text-orange-300">{formatPrice(item.price)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <aside className="rounded-[2rem] border border-orange-400/25 bg-gradient-to-br from-orange-500/15 to-white/[0.04] p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-white/65">{t.subtotal}</span>
              <span className="text-3xl font-black text-orange-300">{formatPrice(subtotal)}</span>
            </div>
            <button className="mt-6 w-full rounded-2xl bg-orange-500 px-5 py-4 font-black text-neutral-950 transition hover:bg-orange-300">{t.checkout}</button>
            <p className="mt-4 text-sm leading-6 text-white/55">{t.orderNote}</p>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] lg:grid-cols-[1fr_0.9fr]">
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-black md:text-4xl">{t.newsletter}</h2>
            <p className="mt-3 max-w-xl text-white/60">{t.newsletterText}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input placeholder={t.email} className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-neutral-950 px-5 py-4 outline-none focus:border-orange-300" />
              <button className="rounded-2xl bg-orange-500 px-6 py-4 font-black text-neutral-950 hover:bg-orange-300">{t.subscribe}</button>
            </div>
          </div>
          <div className="min-h-64 bg-[url('https://images.unsplash.com/photo-1471295253337-3ceaaedca402?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-80" />
        </div>
      </section>

      <footer id="contact" className="border-t border-white/10 bg-black">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-orange-400 to-red-600 text-xl font-black">PS</div>
              <div>
                <div className="text-lg font-black">Passion Sports</div>
                <div className="text-xs uppercase tracking-[0.35em] text-orange-300">Boutique</div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-white/55">{t.contactText}</p>
          </div>
          <div>
            <h3 className="mb-4 font-black text-orange-300">{t.contact}</h3>
            <div className="grid gap-3 text-sm text-white/65">
              <div className="flex items-center gap-3"><Mail size={16} /> info@passionsportsboutique.com</div>
              <div className="flex items-center gap-3"><Phone size={16} /> 514-742-1319</div>
              <div className="flex items-center gap-3"><MapPin size={16} /> St-Bruno-de-Montarville, QC</div>
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-black text-orange-300">Menu</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-white/65">
              {nav.map((item) => <a key={item} href="#catalog" className="hover:text-orange-300">{item}</a>)}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/40">© 2026 Passion Sports Boutique. {t.rights}</div>
      </footer>
    </div>
  );
}
