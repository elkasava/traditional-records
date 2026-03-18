/**
 * TRADITIONAL RECORDS - CORE ENGINE V39.0
 * Refactored for accessibility, performance, and maintainability.
 */

// ---------------------------------------------------------------------------
// 1. DATA LAYER
// ---------------------------------------------------------------------------
const MOCK_DB = {
    releases: [
        { id: 1,  artist: "AMSA",           title: "Watra Ing",                   genres: ["WINTI"],           price: 20.00, img: "cd-holder.jpg", spotify: "https://open.spotify.com/search/Amsa%20Watra%20Ing",                          desc: "Authentieke Surinaamse klanken van Amsa." },
        { id: 2,  artist: "BIGA",           title: "Bijlhoutweg",                  genres: ["WINTI"],           price: 22.00, img: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/42/a0/b4/42a0b488-40c0-bc16-eaf5-17a9373ebd64/198999580341.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/search/Biga%20Bijlhoutweg",                          desc: "Rhythms, Roots, Power, Drums, Spirits, Winti, Aisa.", scarcity: "LAATSTE 3" },
        { id: 3,  artist: "EWALD KROLIS",   title: "The Best Of",                  genres: ["KASEKO"],          price: 20.00, img: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/24/9c/4e/249c4ec9-f3e6-5a47-a4c7-3285b997844e/198595545768.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/search/Ewald%20Krolis%20The%20Best%20Of",          desc: "Het beste van Ewald Krolis in één collectie." },
        { id: 4,  artist: "FAJA WOWIA",     title: "Sama Toli",                    genres: ["DANCEHALL", "REGGAE"], price: 22.50, img: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/c2/87/e3/c287e3dc-8d89-9c1d-0da3-4a8f41971d97/198595420867.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/search/Faja%20Wowia%20Sama%20Toli",              desc: "Faja Wowia brengt vuur met Sama Toli." },
        { id: 5,  artist: "GHETTO CREW",    title: "Anoa Moo Na Winta",            genres: ["DANCEHALL", "REGGAE"], price: 20.00, img: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/4c/a0/f7/4ca0f764-183f-b98e-bea0-44375270ebd6/198595516638.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/search/Ghetto%20Crew%20Anoa%20Moo%20Na%20Winta",  desc: "Ghetto Crew op zijn best." },
        { id: 6,  artist: "GHETTO CREW",    title: "Atoekoeng Peleng",             genres: ["DANCEHALL", "REGGAE"], price: 20.00, img: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/1c/d9/af/1cd9af2d-72f5-b890-5893-462ec76ca4b8/198500405903.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/search/Ghetto%20Crew%20Atoekoeng%20Peleng",      desc: "Krachtige ritmes van Ghetto Crew." },
        { id: 7,  artist: "GHETTO CREW",    title: "Full Pattato Modellato",       genres: ["DANCEHALL", "REGGAE"], price: 20.00, img: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/d6/49/01/d6490151-cba7-907b-8ba2-61186a7c9eeb/198500691481.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/search/Ghetto%20Crew%20Full%20Pattato%20Modellato", desc: "Full Pattato Modellato — onvergetelijk." },
        { id: 8,  artist: "MA ES",          title: "Mi Na Singi Man",              genres: ["WINTI"],           price: 20.00, img: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/64/4f/5c/644f5cfd-4d55-e222-d82d-53bb3cd643d4/198595394687.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/search/Ma%20Es%20Mi%20Na%20Singi%20Man",           desc: "Ma Es met zijn meeslepende zangstijl." },
        { id: 9,  artist: "PAPA TOUWTJIE",  title: "The Legend 4 Ever",            genres: ["DANCEHALL", "REGGAE"], price: 20.00, img: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/9d/d6/92/9dd6925d-6867-5844-5255-fc84312e4cb7/198595489505.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/search/Papa%20Touwtjie%20The%20Legend%204%20Ever", desc: "De legende leeft voort." },
        { id: 10, artist: "PAWANA",         title: "Erom\u00e9 Pawana S\u00e9wa Imy\u00e9ro", genres: ["KAWINA"], price: 25.00, img: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/94/bf/11/94bf1118-81c5-a550-91e4-d0a1ec20992d/198595392720.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/search/Pawana%20Erome%20Pawana%20Sewa",            desc: "Een unieke mix van traditionele klanken en moderne beats.", scarcity: "LAATSTE 5" },
        { id: 11, artist: "PEP",            title: "Ondrofeni (Special)",          genres: ["ZOUK"],            price: 20.00, img: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/c2/0a/fc/c20afcb9-5fb3-7385-1e98-2c2b0e09b4ce/198500404777.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/search/Pep%20Ondrofeni",                           desc: "Pep met een speciale editie van Ondrofeni.", scarcity: "OUT OF PRINT" },
        { id: 12, artist: "STIMOFO",        title: "Fodu Yow\u00e9",               genres: ["WINTI"],           price: 24.00, img: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/b5/74/c2/b574c2ce-7e38-6758-114d-ef06032610ee/199199623111.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/search/Stimofo%20Fodu%20Yowe",                     desc: "De beste Winti band van Suriname. Nu op vinyl.", scarcity: "UITVERKOCHT" },
        { id: 13, artist: "STIMOFO",        title: "Ma Pete Mama",                 genres: ["WINTI"],           price: 20.00, img: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/fd/36/37/fd363737-532a-f3cd-e30e-52a364a312fb/198595393635.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/search/Stimofo%20Ma%20Pete%20Mama",                desc: "Een ode aan de moeders van Suriname." },
        { id: 14, artist: "STIMOFO",        title: "Marianna Trusu",               genres: ["WINTI"],           price: 20.00, img: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/dc/a1/16/dca116a1-350b-7299-96cb-73eb2ac97be8/199199259105.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/search/Stimofo%20Marianna%20Trusu",              desc: "Marianna Trusu — pure Surinaamse energie." },
        { id: 15, artist: "TAM",            title: "Hier Is Tam",                  genres: ["KAWINA"],          price: 20.00, img: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/e5/cb/06/e5cb068e-2460-df24-b1ff-af43fefea6b1/198500691504.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/search/Tam%20Hier%20Is%20Tam",                   desc: "Tam presenteert zich met zijn debuut." },
        { id: 16, artist: "THE MESSENGERS", title: "Wang Gado De",                 genres: ["GOSPEL"],          price: 18.50, img: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/a2/af/c2/a2afc2c5-7931-958e-f768-2994f24d6c44/198595391556.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/search/The%20Messengers%20Wang%20Gado%20De",    desc: "Spirituele klanken van The Messengers." },
        { id: 17, artist: "THEO BIJLHOUT",  title: "Switi Kerst",                  genres: ["GOSPEL"],          price: 20.00, img: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/d8/17/bd/d817bdf4-8bdd-c1ce-756a-9128ec1488e3/198999580334.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/search/Theo%20Bijlhout%20Switi%20Kerst",       desc: "Switi Kerst — feestelijke klanken van Theo Bijlhout." },
        { id: 18, artist: "TJATJIE",          title: "Kon Go",                       genres: ["DANCEHALL", "REGGAE"], price: 20.00, img: "cd-holder.jpg", spotify: "https://open.spotify.com/album/7k7h8kYYNBUFUPG0UbPRMj", desc: "Tjatjie — Kon Go." },
        { id: 19, artist: "NAKS KAWINA LOCO", title: "Kamergeheimen",              genres: ["KAWINA"],          price: 20.00, img: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/85/c0/c9/85c0c9c6-030a-ea42-13cc-c07298d44e4b/cover.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/album/7vzGMoZLM6gJtltPr7P7vu", desc: "Naks Kawina Loco — Kamergeheimen." },
        { id: 20, artist: "NAKS KASEKO LOKO", title: "Un Ne Prati",                genres: ["KASEKO"],          price: 20.00, img: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/65/8f/20/658f202b-eb6a-b1db-2fad-a4ef55c0c784/cover.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/album/2NzhScJUwZPkPBrlT9C8Sc", desc: "Naks Kaseko Loko — Un Ne Prati." },
        { id: 21, artist: "NAKS KASEKO LOKO", title: "Niks No Fout Re-Mix (Live)", genres: ["KASEKO"],          price: 20.00, img: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/3d/14/ac/3d14ac25-866f-0be2-3af7-d8b9eddda4d2/cover.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/album/3AQJWqPjgoBlkD8xfaR7X0", desc: "Naks Kaseko Loko — live remix." },
        { id: 22, artist: "NAKS KASEKO LOKO", title: "Live 2007",                  genres: ["KASEKO"],          price: 20.00, img: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/03/77/b5/0377b53e-878a-5f05-ac6b-141e749529bf/cover.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/album/7g5yUjIm9BbC3WJuENugJv", desc: "Naks Kaseko Loko — Live 2007." },
        { id: 23, artist: "COMBINATIE XVI",  title: "Flamingo",                    genres: ["GROOT BAZUIN"],    price: 20.00, img: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/1c/fa/14/1cfa14c1-a4b2-56f8-f314-4997b75d3dd7/cover.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/album/0UC7qVaFkKywCAd6wjOLUP", desc: "Combinatie XVI — Flamingo." },
        { id: 24, artist: "COMBINATIE XVI",  title: "Live Tori Oso",               genres: ["GROOT BAZUIN"],    price: 20.00, img: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/ca/39/2a/ca392a93-2e1e-4612-b6eb-4e6898710243/cover.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/album/6zRCGwywKSHLSrx0asWdFm", desc: "Combinatie XVI — Live Tori Oso." },
        { id: 25, artist: "COMBINATIE XVI",  title: "Losso",                       genres: ["GROOT BAZUIN"],    price: 20.00, img: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/8d/35/bb/8d35bbbb-7ef6-920b-2e51-6dc3941a634c/cover.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/album/08XKmHZdMNdTZulYtNymS4", desc: "Combinatie XVI — Losso." },
        { id: 26, artist: "COMBINATIE XVI",  title: "Combinatie XVI",              genres: ["GROOT BAZUIN"],    price: 20.00, img: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/ed/64/0b/ed640bc0-79bc-cb9c-8b1d-534dc460c248/cover.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/album/5Chj68ABpoZLaM51mK7PfT", desc: "Combinatie XVI." }
    ],
    merch: [
        { id: 101, title: "LIMITED 'UNITY' JACKET", price: 120.00, img: "1.webp", badge: "LOW STOCK", desc: "Heavyweight canvas jacket met geborduurd ruglogo." },
        { id: 102, title: "SIGNATURE HOODIE - ONYX", price: 85.00, img: "2.webp", desc: "Premium katoen, oversized fit." },
        { id: 103, title: "ESSENTIAL TEE - BONE", price: 45.00, img: "3.webp", badge: "NEW", desc: "Zwaargewicht t-shirt met subtiele print." },
        { id: 104, title: "TOUR CAP 2026", price: 35.00, img: "4.webp", desc: "Verstelbare dad cap met 3D borduursel." },
        { id: 105, title: "VINYL TOTE BAG", price: 25.00, img: "5.webp", desc: "Stevige katoenen tas." }
    ],
    events: [
        { day: "20", month: "JUN", year: "2026", artist: "PAWANA", venue: "PARADISO", city: "AMSTERDAM", link: "#" },
        { day: "11", month: "JUL", year: "2026", artist: "FAJA WOWIA", venue: "TIVOLI VREDENBURG", city: "UTRECHT", link: "#" },
        { day: "25", month: "JUL", year: "2026", artist: "STIMOFO", venue: "013", city: "TILBURG", link: "#" }
    ],
    artists: [
        { id: "stimofo",      name: "STIMOFO",        genre: "WINTI",            origin: "Paramaribo, Suriname", active: "1985 – heden",  bio: "Stimofo geldt als de meest invloedrijke Winti-band van Suriname. Hun muziek combineert ancestrale geestenrituelen met hedendaagse ritmes, en brengt de Afro-Surinaamse spirituele traditie levend naar een nieuw publiek.", img: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/b5/74/c2/b574c2ce-7e38-6758-114d-ef06032610ee/199199623111.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/search/Stimofo", instagram: "#" },
        { id: "pawana",       name: "PAWANA",          genre: "KAWINA",           origin: "Suriname",            active: "2000 – heden",  bio: "Pawana is een prominente naam in de Kawina-scene. Hun muziek weerspiegelt de Javaans-Surinaamse culturele fusie, met energieke polyritmes en traditionele zangstijlen die generaties verbinden.", img: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/94/bf/11/94bf1118-81c5-a550-91e4-d0a1ec20992d/198595392720.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/search/Pawana", instagram: "#" },
        { id: "faja-wowia",   name: "FAJA WOWIA",      genre: "DANCEHALL",        origin: "Suriname",            active: "1995 – heden",  bio: "Faja Wowia ('Vuur van Wowia') staat bekend om hun explosieve live-optredens. Ze versmolten Surinaams dancehall met reggae-invloeden en werden daarmee pioniers van de moderne Surinaamse urban sound.", img: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/c2/87/e3/c287e3dc-8d89-9c1d-0da3-4a8f41971d97/198595420867.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/search/Faja+Wowia", instagram: "#" },
        { id: "papa-touwtjie",name: "PAPA TOUWTJIE",   genre: "DANCEHALL",        origin: "Paramaribo, Suriname", active: "1990 – heden", bio: "Papa Touwtjie is een legende in de Surinaamse popmuziek. Met decennia aan hits en een onmiskenbare stijl is hij een symbool voor de kracht van Surinaams talent op het wereldpodium.", img: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/9d/d6/92/9dd6925d-6867-5844-5255-fc84312e4cb7/198595489505.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/search/Papa+Touwtjie", instagram: "#" },
        { id: "the-messengers",name: "THE MESSENGERS", genre: "GOSPEL",           origin: "Suriname",            active: "2010 – heden",  bio: "The Messengers verspreidt hun boodschap via krachtige gospelklanken die diepe wortels hebben in de Surinaamse kerktraditie. Hun muziek raakt harten en overstijgt grenzen.", img: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/a2/af/c2/a2afc2c5-7931-958e-f768-2994f24d6c44/198595391556.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/search/The+Messengers+Suriname", instagram: "#" },
        { id: "theo-bijlhout",name: "THEO BIJLHOUT",   genre: "GOSPEL",           origin: "Suriname",            active: "1980 – heden",  bio: "Theo Bijlhout is een van de meest gerespecteerde namen in de Surinaamse gospel. Zijn rijke baritonstem en diepe overtuiging hebben hem tot een icoon gemaakt van christelijke muziek in de diaspora.", img: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/d8/17/bd/d817bdf4-8bdd-c1ce-756a-9128ec1488e3/198999580334.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/search/Theo+Bijlhout", instagram: "#" },
        { id: "ghetto-crew",  name: "GHETTO CREW",     genre: "DANCEHALL",        origin: "Paramaribo, Suriname", active: "1998 – heden", bio: "Ghetto Crew bracht de straatcultuur van Paramaribo naar platen. Ruw, eerlijk en onversneden — hun teksten documenteren het leven in de Surinaamse wijken en verbinden diasporajongeren wereldwijd.", img: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/1c/d9/af/1cd9af2d-72f5-b890-5893-462ec76ca4b8/198500405903.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/search/Ghetto+Crew+Suriname", instagram: "#" },
        { id: "groot-bazuin",     name: "GROOT BAZUIN",       genre: "GROOT BAZUIN", origin: "Suriname", active: "1980 – heden", bio: "Groot Bazuin is een van de meest invloedrijke culturele muziekorganisaties van Suriname. Onder hun vleugels vallen ensembles zoals Combinatie XVI, Naks Kawina Loco en Naks Kaseko Loko — elk een bewaker van de Surinaamse kawina- en kaseko-tradities.", img: "https://i.scdn.co/image/ab67616d00001e02e57490f869d2f777d43aa351", spotify: "https://open.spotify.com/artist/1Y1TqVV4Ma5Nw1M8ms9O94", instagram: "#" },
        { id: "naks-kawina-loco",  name: "NAKS KAWINA LOCO",   genre: "KAWINA",       origin: "Suriname", active: "1975 – heden", bio: "Naks Kawina Loco is het kawina-ensemble van Groot Bazuin, opgericht ter bewaking en verspreiding van de traditionele kawina-muziek. Met energieke polyritmes en authentieke zangstijlen verbinden zij generaties Surinamers.", img: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/85/c0/c9/85c0c9c6-030a-ea42-13cc-c07298d44e4b/cover.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/album/7vzGMoZLM6gJtltPr7P7vu", instagram: "#" },
        { id: "naks-kaseko-loko",  name: "NAKS KASEKO LOKO",   genre: "KASEKO",       origin: "Suriname", active: "1975 – heden", bio: "Naks Kaseko Loko is het kaseko-ensemble van Groot Bazuin, behoeder van de levendige kaseko-traditie. Hun muziek combineert blazers, percussie en dans in een onstuitbare groove die direct teruggaat naar de Afro-Surinaamse wortels.", img: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/65/8f/20/658f202b-eb6a-b1db-2fad-a4ef55c0c784/cover.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/album/2NzhScJUwZPkPBrlT9C8Sc", instagram: "#" },
        { id: "combinatie-xvi",    name: "COMBINATIE XVI",     genre: "GROOT BAZUIN", origin: "Suriname", active: "1980 – heden", bio: "Combinatie XVI is het veelzijdige ensemble van Groot Bazuin dat meerdere Surinaamse muziekstijlen samenbrengt. Hun live-optredens zijn legendarisch — een viering van Surinaamse culturele rijkdom op het podium.", img: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/1c/fa/14/1cfa14c1-a4b2-56f8-f314-4997b75d3dd7/cover.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/album/0UC7qVaFkKywCAd6wjOLUP", instagram: "#" },
        { id: "pep",          name: "PEP",              genre: "ZOUK",             origin: "Suriname",            active: "2005 – heden",  bio: "PEP brengt sensualiteit en ritme samen in een unieke Surinaamse zouk-stijl. Zijn muziek weeft Caribbean romance en Surinaamse warmte tot een geluid dat grenzen overstijgt.", img: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/c2/0a/fc/c20afcb9-5fb3-7385-1e98-2c2b0e09b4ce/198500404777.jpg/600x600bb.jpg", spotify: "https://open.spotify.com/search/Pep+Suriname+Zouk", instagram: "#" }
    ]
};

// Expose on window for sub-page access
window.MOCK_DB = MOCK_DB;

const API = {
    async getData() {
        return MOCK_DB;
    }
};

// ---------------------------------------------------------------------------
// 2. STATE
// ---------------------------------------------------------------------------
let globalCatalog = [];
const currency = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' });

// ---------------------------------------------------------------------------
// 3. INIT
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
    const isHomepage = !!document.getElementById('heroText');

    try {
        const data = await API.getData();
        globalCatalog = [...data.releases, ...data.merch];

        Modules.Render.releases(isHomepage ? data.releases.slice(0, 8) : data.releases);
        Modules.Render.merch(data.merch);
        Modules.Render.agenda(data.events);

        if (isHomepage) initGenreFilter(data.releases);
    } catch (e) {
        console.error("Data load error:", e);
    }

    Modules.Cart.init();
    Modules.Search.init();
    Modules.Mobile.init();
    Modules.UX.init();
    Modules.Carousel.init();
    Modules.Effects.init();

    initHeroDots();
    initTicker();
    initScrollProgress();
    initBackToTop();
    if (isHomepage) {
        initNewsletterPopup();
        injectJsonLd(data);
    }

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(() => {});
    }
});

// ---------------------------------------------------------------------------
// 4. MODULES
// ---------------------------------------------------------------------------
const Modules = window.Modules = {

    // -----------------------------------------------------------------------
    // Render: builds DOM content from data
    // -----------------------------------------------------------------------
    Render: {
        releases(items) {
            const el = document.getElementById('releasesGrid');
            if (!el) return;
            const canShare = !!navigator.share;
            el.innerHTML = items.map(i => `
                <article class="release-card hover-target" data-product-id="${i.id}" tabindex="0" role="button" aria-label="${i.artist} - ${i.title}">
                    <div class="card-img-container">
                        <img src="${i.img}" alt="${i.artist} - ${i.title}" loading="lazy" width="280" height="280">
                        ${canShare ? `<button class="share-btn hover-target" data-share-id="${i.id}" aria-label="Deel ${i.title}" type="button" onclick="event.stopPropagation()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></button>` : ''}
                    </div>
                    <div class="card-info">
                        <h3>${i.artist}</h3>
                        <p>${i.title}</p>
                    </div>
                </article>
            `).join('');

            // Wire share buttons
            if (canShare) {
                el.querySelectorAll('.share-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const item = globalCatalog.find(x => x.id === parseInt(btn.dataset.shareId));
                        if (item) navigator.share({ title: item.artist, text: `${item.artist} — ${item.title}`, url: item.spotify || location.href }).catch(() => {});
                    });
                });
            }
        },

        merch(items) {
            const el = document.getElementById('merchTrack');
            if (!el) return;
            el.innerHTML = items.map(i => `
                <article class="merch-carousel-item hover-target" data-product-id="${i.id}" tabindex="0" role="button" aria-label="${i.title} - ${currency.format(i.price)}">
                    ${i.badge ? `<span class="scarcity-badge">${i.badge}</span>` : ''}
                    <div class="merch-carousel-img">
                        <img src="${i.img}" alt="${i.title}" loading="lazy" width="280" height="350">
                    </div>
                    <div class="merch-carousel-info">
                        <h3>${i.title}</h3>
                        <p>${currency.format(i.price)}</p>
                    </div>
                </article>
            `).join('');

            // Also render on merch page if that grid exists
            const merchGrid = document.getElementById('merchGrid');
            if (merchGrid) {
                merchGrid.innerHTML = items.map(i => `
                    <article class="release-card hover-target" data-product-id="${i.id}" tabindex="0" role="button" aria-label="${i.title} - ${currency.format(i.price)}">
                        ${i.badge ? `<span class="scarcity-badge">${i.badge}</span>` : ''}
                        <div class="card-img-container">
                            <img src="${i.img}" alt="${i.title}" loading="lazy" width="280" height="280">
                        </div>
                        <div class="card-info">
                            <h3>${i.title}</h3>
                            <p>${currency.format(i.price)}</p>
                        </div>
                    </article>
                `).join('');
            }
        },

        agenda(items) {
            const el = document.getElementById('agendaList');
            if (!el) return;
            el.innerHTML = items.map(e => `
                <article class="agenda-item-classic hover-target">
                    <div class="agenda-date-box">
                        <span class="agenda-day">${e.day}</span>
                        <span class="agenda-month">${e.month}</span>
                    </div>
                    <div class="agenda-details">
                        <h3>${e.artist}</h3>
                        <p>${e.venue} // ${e.city}</p>
                    </div>
                    <a href="${e.link}" class="ticket-btn-classic hover-target" aria-label="Koop tickets voor ${e.artist} op ${e.day} ${e.month}">TICKETS</a>
                </article>
            `).join('');
        }
    },

    // -----------------------------------------------------------------------
    // Effects: cursor, parallax
    // -----------------------------------------------------------------------
    Effects: {
        init() {
            const cursor = document.getElementById('cursor');
            const isDesktop = () => window.innerWidth > 900;

            // Custom cursor follows mouse (use rAF for smoothness)
            if (cursor) {
                let cursorX = 0, cursorY = 0;
                document.addEventListener('mousemove', (e) => {
                    cursorX = e.clientX;
                    cursorY = e.clientY;
                });

                const updateCursor = () => {
                    if (isDesktop()) {
                        cursor.style.left = cursorX + 'px';
                        cursor.style.top = cursorY + 'px';
                    }
                    requestAnimationFrame(updateCursor);
                };
                requestAnimationFrame(updateCursor);

                // Hover enlargement via event delegation
                document.body.addEventListener('mouseover', (e) => {
                    if (e.target.closest('.hover-target, a, button')) {
                        cursor.classList.add('hovered');
                    } else {
                        cursor.classList.remove('hovered');
                    }
                });
            }

            // Parallax hero text on scroll (throttled with rAF)
            const heroText = document.getElementById('heroText');
            if (heroText) {
                let ticking = false;
                window.addEventListener('scroll', () => {
                    if (!ticking) {
                        requestAnimationFrame(() => {
                            if (isDesktop()) {
                                const scrollY = window.scrollY;
                                heroText.style.transform = `translateY(${scrollY * 0.3}px)`;
                                heroText.style.opacity = Math.max(0, 1 - scrollY / 600);
                            }
                            ticking = false;
                        });
                        ticking = true;
                    }
                }, { passive: true });
            }
        }
    },

    // -----------------------------------------------------------------------
    // Carousel: merch left/right scroll
    // -----------------------------------------------------------------------
    Carousel: {
        init() {
            const track = document.getElementById('merchTrack');
            const prev = document.getElementById('merchPrevBtn');
            const next = document.getElementById('merchNextBtn');
            if (!track) return;

            const getScrollAmount = () => track.offsetWidth / 3;

            next?.addEventListener('click', () => {
                track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
            });
            prev?.addEventListener('click', () => {
                track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
            });

            // Allow keyboard scrolling when track is focused
            track.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') {
                    track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
                } else if (e.key === 'ArrowLeft') {
                    track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
                }
            });
        }
    },

    // -----------------------------------------------------------------------
    // Cart: localStorage-backed cart
    // -----------------------------------------------------------------------
    Cart: {
        items: [],
        init() {
            try {
                this.items = JSON.parse(localStorage.getItem('myCart')) || [];
            } catch {
                this.items = [];
            }
            this.updateBadge();
        },
        add(product) {
            const existing = this.items.find(i => i.id === product.id);
            if (existing) {
                existing.qty += product.qty;
            } else {
                this.items.push(product);
            }
            this.save();
        },
        remove(id) {
            this.items = this.items.filter(i => i.id !== id);
            this.save();
        },
        save() {
            localStorage.setItem('myCart', JSON.stringify(this.items));
            this.updateBadge();
            Modules.UI.renderCart();
        },
        updateBadge() {
            const badge = document.getElementById('cartCountBadge');
            const total = this.items.reduce((sum, i) => sum + i.qty, 0);
            if (badge) {
                badge.textContent = total;
                badge.style.display = total > 0 ? 'flex' : 'none';
            }
        }
    },

    // -----------------------------------------------------------------------
    // Search
    // -----------------------------------------------------------------------
    Search: {
        init() {
            const box = document.getElementById('searchContainer');
            const inp = document.getElementById('searchInput');
            const res = document.getElementById('searchResults');
            const toggleBtn = document.getElementById('toggleSearchBtn');
            const closeBtn = document.getElementById('closeSearch');

            if (!box || !inp) return;

            toggleBtn?.addEventListener('click', (e) => {
                e.preventDefault();
                box.classList.toggle('active');
                if (box.classList.contains('active')) {
                    inp.focus();
                }
            });

            closeBtn?.addEventListener('click', () => {
                box.classList.remove('active');
                inp.value = '';
                if (res) {
                    res.innerHTML = '';
                    res.classList.remove('active');
                }
            });

            // Close search on Escape
            inp?.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    box.classList.remove('active');
                }
            });

            inp?.addEventListener('input', () => {
                const term = inp.value.toLowerCase().trim();
                if (term.length < 2) {
                    if (res) res.classList.remove('active');
                    return;
                }

                const hits = globalCatalog.filter(x =>
                    x.title.toLowerCase().includes(term) ||
                    (x.artist && x.artist.toLowerCase().includes(term))
                );

                if (res) {
                    res.innerHTML = hits.length
                        ? hits.map(h => `
                            <div class="search-result-item" data-product-id="${h.id}" tabindex="0" role="option">
                                <img src="${h.img}" alt="${h.artist || ''} ${h.title}" width="40" height="40">
                                <div><strong>${h.artist || 'TRADITIONAL RECORDS'}</strong> - ${h.title}</div>
                            </div>
                        `).join('')
                        : '<div style="padding:15px; text-align:center; color:#666;">Geen resultaten gevonden</div>';
                    res.classList.add('active');
                }
            });

            // Click delegation on search results
            res?.addEventListener('click', (e) => {
                const item = e.target.closest('.search-result-item');
                if (item) {
                    const id = parseInt(item.dataset.productId);
                    Modules.UI.openModal(id);
                    box.classList.remove('active');
                }
            });
        }
    },

    // -----------------------------------------------------------------------
    // Mobile: hamburger menu
    // -----------------------------------------------------------------------
    Mobile: {
        init() {
            const btn = document.getElementById('hamburgerBtn');
            const menu = document.getElementById('navMenu');
            if (!btn || !menu) return;

            btn.addEventListener('click', () => {
                const isOpen = btn.classList.toggle('active');
                menu.classList.toggle('active');
                btn.setAttribute('aria-expanded', isOpen);
                btn.setAttribute('aria-label', isOpen ? 'Menu sluiten' : 'Menu openen');

                // Prevent body scroll when menu is open
                document.body.style.overflow = isOpen ? 'hidden' : '';
            });

            // Close menu when a link is clicked
            menu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    btn.classList.remove('active');
                    menu.classList.remove('active');
                    btn.setAttribute('aria-expanded', 'false');
                    btn.setAttribute('aria-label', 'Menu openen');
                    document.body.style.overflow = '';
                });
            });
        }
    },

    // -----------------------------------------------------------------------
    // UX: scroll effects, reveal, modal wiring
    // -----------------------------------------------------------------------
    UX: {
        init() {
            // Navbar scroll state
            const nav = document.querySelector('.navbar');
            if (nav) {
                let scrollTicking = false;
                window.addEventListener('scroll', () => {
                    if (!scrollTicking) {
                        requestAnimationFrame(() => {
                            nav.classList.toggle('scrolled', window.scrollY > 50);
                            scrollTicking = false;
                        });
                        scrollTicking = true;
                    }
                }, { passive: true });

                // Set initial state
                nav.classList.toggle('scrolled', window.scrollY > 50);
            }

            // Intersection Observer for reveal animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        const vinyl = entry.target.querySelector('.decor-vinyl');
                        if (vinyl) vinyl.classList.add('visible');
                        observer.unobserve(entry.target); // Stop observing once revealed
                    }
                });
            }, { threshold: 0.15 });

            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

            // Event delegation for product cards (instead of inline onclick)
            document.addEventListener('click', (e) => {
                const card = e.target.closest('[data-product-id]');
                if (card && !e.target.closest('.ticket-btn-classic')) {
                    const id = parseInt(card.dataset.productId);
                    if (id) Modules.UI.openModal(id);
                }
            });

            // Keyboard support for product cards
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    const card = e.target.closest('[data-product-id]');
                    if (card) {
                        e.preventDefault();
                        const id = parseInt(card.dataset.productId);
                        if (id) Modules.UI.openModal(id);
                    }
                }
            });

            // Modal close buttons
            document.querySelectorAll('.close-modal, #continueShopping').forEach(btn => {
                btn.addEventListener('click', () => Modules.UI.closeModals());
            });

            // Close modals on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    Modules.UI.closeModals();
                }
            });

            // Close modals when clicking overlay background
            document.querySelectorAll('.modal-overlay').forEach(overlay => {
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        Modules.UI.closeModals();
                    }
                });
            });

            // Cart button
            document.getElementById('openCartBtn')?.addEventListener('click', (e) => {
                e.preventDefault();
                Modules.UI.openCart();
            });

            // Quantity controls — scoped to modal to avoid ambiguity
            const modal = document.getElementById('productModal');
            const qty = document.getElementById('modalQty');
            modal?.querySelector('button[data-action="increase"]')?.addEventListener('click', () => {
                if (qty) qty.value = parseInt(qty.value) + 1;
            });
            modal?.querySelector('button[data-action="decrease"]')?.addEventListener('click', () => {
                if (qty && parseInt(qty.value) > 1) qty.value = parseInt(qty.value) - 1;
            });

            // Add to cart
            document.getElementById('addToCartBtn')?.addEventListener('click', () => {
                const btn = document.getElementById('addToCartBtn');
                const id = parseInt(btn.dataset.id);
                const product = globalCatalog.find(x => x.id === id);
                if (product) {
                    Modules.Cart.add({
                        ...product,
                        qty: parseInt(document.getElementById('modalQty').value)
                    });
                    Modules.UI.closeModals();
                    Modules.UI.openCart();
                }
            });

            // Cart item remove delegation
            document.getElementById('cartItemsContainer')?.addEventListener('click', (e) => {
                const removeBtn = e.target.closest('.cart-item-remove');
                if (removeBtn) {
                    const id = parseInt(removeBtn.dataset.removeId);
                    Modules.Cart.remove(id);
                }
            });

            // Checkout button
            document.querySelector('.checkout-btn')?.addEventListener('click', () => {
                if (Modules.Cart.items.length === 0) return;
                const total = Modules.Cart.items.reduce((sum, i) => sum + (Number(i.price) * i.qty), 0);
                const container = document.getElementById('cartItemsContainer');
                if (container) {
                    container.innerHTML = `
                        <div style="text-align:center; padding:60px 20px;">
                            <div style="font-size:40px; margin-bottom:15px;">&#10003;</div>
                            <h3 style="color:#000; margin:0 0 10px; font-size:18px;">BEDANKT VOOR JE BESTELLING</h3>
                            <p style="color:#666; font-size:13px; margin:0;">Je bestelling van ${currency.format(total)} wordt verwerkt.<br>Je ontvangt een bevestiging per e-mail.</p>
                        </div>`;
                }
                Modules.Cart.items = [];
                Modules.Cart.save();
                const checkoutBtn = document.querySelector('.checkout-btn');
                if (checkoutBtn) checkoutBtn.classList.add('hidden');
            });

            // Newsletter form handling
            document.querySelectorAll('.newsletter-form').forEach(form => {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const input = form.querySelector('input[type="email"]');
                    const btn = form.querySelector('button');
                    if (input && btn) {
                        btn.textContent = 'AANGEMELD!';
                        btn.style.background = '#1DB954';
                        btn.style.color = '#fff';
                        input.value = '';
                        input.disabled = true;
                        setTimeout(() => {
                            btn.textContent = 'SUBSCRIBE';
                            btn.style.background = '';
                            btn.style.color = '';
                            input.disabled = false;
                        }, 3000);
                    }
                });
            });
        }
    },

    // -----------------------------------------------------------------------
    // UI: modal management, cart rendering
    // -----------------------------------------------------------------------
    UI: {
        previousFocus: null,

        openModal(id) {
            const product = globalCatalog.find(x => x.id === id);
            if (!product) return;

            const modal = document.getElementById('productModal');
            if (!modal) return;

            this.previousFocus = document.activeElement;

            document.getElementById('modalImg').src = product.img;
            document.getElementById('modalImg').alt = `${product.artist || 'Traditional Records'} - ${product.title}`;
            document.getElementById('modalArtist').textContent = product.artist || "TRADITIONAL RECORDS";
            document.getElementById('modalTitle').textContent = product.title;

            const descEl = document.getElementById('modalDesc');
            if (descEl) descEl.textContent = product.desc || '';

            document.getElementById('modalPrice').textContent = currency.format(product.price);
            document.getElementById('addToCartBtn').dataset.id = id;
            document.getElementById('modalQty').value = 1;

            const spotifyBtn = document.getElementById('modalSpotifyBtn');
            if (spotifyBtn) {
                spotifyBtn.href = product.spotify || '#';
                spotifyBtn.style.display = product.spotify ? 'flex' : 'none';
            }

            // Audio preview — fetch from iTunes Search API (free, no auth needed)
            Modules.UI.loadAudioPreview(product);

            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            // Focus the close button for accessibility
            const closeBtn = modal.querySelector('.close-modal');
            if (closeBtn) closeBtn.focus();
        },

        openCart() {
            this.renderCart();
            const cartModal = document.getElementById('cartModal');
            if (cartModal) {
                this.previousFocus = document.activeElement;
                cartModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';

                const closeBtn = cartModal.querySelector('.close-modal');
                if (closeBtn) closeBtn.focus();
            }
        },

        loadAudioPreview(product) {
            const section    = document.getElementById('audioPreviewSection');
            const statusEl   = document.getElementById('audioPreviewStatus');
            const statusText = document.getElementById('audioStatusText');
            const playerUI   = document.getElementById('audioPlayerUI');
            const audioEl    = document.getElementById('audioPreview');
            const audioSrc   = document.getElementById('audioSource');
            const playBtn    = document.getElementById('audioPlayBtn');
            const playIcon   = document.getElementById('playIcon');
            const pauseIcon  = document.getElementById('pauseIcon');
            const progressEl = document.getElementById('audioProgress');
            const timerEl    = document.getElementById('audioTimer');
            if (!section || !audioEl) return;

            // Reset player state
            audioEl.pause();
            audioEl.currentTime = 0;
            if (progressEl) progressEl.style.width = '0%';
            if (playIcon)  playIcon.style.display  = '';
            if (pauseIcon) pauseIcon.style.display = 'none';
            statusEl.style.display = 'flex';
            statusText.textContent = 'Preview laden...';
            playerUI.style.display = 'none';

            // Abort any previous fetch and event listeners cleanly
            if (section._audioAbort) section._audioAbort.abort();
            const abortCtrl = new AbortController();
            section._audioAbort = abortCtrl;
            const { signal } = abortCtrl;

            const query = encodeURIComponent(`${product.artist} ${product.title}`);
            fetch(`https://itunes.apple.com/search?term=${query}&media=music&limit=5&country=NL`, { signal })
                .then(r => r.json())
                .then(data => {
                    if (signal.aborted) return;
                    const track = data.results?.find(t => t.previewUrl);
                    if (!track?.previewUrl) {
                        statusText.textContent = 'Geen preview beschikbaar';
                        return;
                    }
                    audioSrc.src = track.previewUrl;
                    audioEl.load();
                    statusEl.style.display = 'none';
                    playerUI.style.display = 'flex';

                    const pi = document.getElementById('playIcon');
                    const pa = document.getElementById('pauseIcon');
                    const pb = document.getElementById('audioPlayBtn');

                    const onPlay = () => {
                        if (audioEl.paused) { audioEl.play(); pi.style.display = 'none'; pa.style.display = ''; }
                        else { audioEl.pause(); pi.style.display = ''; pa.style.display = 'none'; }
                    };
                    const onTime = () => {
                        if (!audioEl.duration) return;
                        const pct = (audioEl.currentTime / audioEl.duration) * 100;
                        if (progressEl) progressEl.style.width = `${pct}%`;
                        const remaining = Math.ceil(audioEl.duration - audioEl.currentTime);
                        if (timerEl) timerEl.textContent = `0:${String(remaining).padStart(2,'0')}`;
                    };
                    const onEnd = () => {
                        pi.style.display = ''; pa.style.display = 'none';
                        if (progressEl) progressEl.style.width = '0%';
                        if (timerEl) timerEl.textContent = '0:30';
                        audioEl.currentTime = 0;
                    };

                    pb.addEventListener('click', onPlay, { signal });
                    audioEl.addEventListener('timeupdate', onTime, { signal });
                    audioEl.addEventListener('ended', onEnd, { signal });
                })
                .catch(err => {
                    if (err.name !== 'AbortError') statusText.textContent = 'Preview niet beschikbaar';
                });
        },

        closeModals() {
            const productModal = document.getElementById('productModal');
            const cartModal = document.getElementById('cartModal');

            if (productModal) productModal.style.display = 'none';
            if (cartModal) cartModal.style.display = 'none';

            // Stop audio preview
            const audioEl = document.getElementById('audioPreview');
            if (audioEl) { audioEl.pause(); audioEl.currentTime = 0; }

            document.body.style.overflow = '';

            // Restore focus to the element that opened the modal
            if (Modules.UI.previousFocus) {
                Modules.UI.previousFocus.focus();
                Modules.UI.previousFocus = null;
            }
        },

        renderCart() {
            const container = document.getElementById('cartItemsContainer');
            if (!container) return;

            if (Modules.Cart.items.length === 0) {
                container.innerHTML = '<p style="text-align:center; color:#999; padding:40px 20px;">Uw winkelwagen is leeg.</p>';
            } else {
                container.innerHTML = Modules.Cart.items.map(i => `
                    <div class="cart-item">
                        <img src="${i.img}" alt="${i.title || i.artist}" width="60" height="60">
                        <div class="cart-item-info">
                            <h4>${i.title || i.artist}</h4>
                            <p>x${i.qty} - ${currency.format(Number(i.price) * i.qty)}</p>
                        </div>
                        <button class="cart-item-remove" data-remove-id="${i.id}" aria-label="Verwijder ${i.title || i.artist}" type="button">&times;</button>
                    </div>
                `).join('');
            }

            const total = Modules.Cart.items.reduce((sum, i) => sum + (Number(i.price) * i.qty), 0);
            const totalEl = document.getElementById('cartTotalPrice');
            if (totalEl) totalEl.textContent = currency.format(total);
        }
    }
};

// ---------------------------------------------------------------------------
// 5. HERO SLIDESHOW + DOTS (JS-driven, Ken Burns zoom)
// ---------------------------------------------------------------------------
function initHeroDots() {
    const dots   = document.querySelectorAll('.hero-dot');
    const slides = document.querySelectorAll('.hero-section .slide');
    if (!slides.length) return;

    let current = 0;
    let timer   = null;

    function goToSlide(index) {
        // Fade out every slide and clear Ken Burns
        slides.forEach(s => s.classList.remove('active', 'kenburns'));
        dots.forEach(d => d.classList.remove('active'));

        // Activate target slide
        slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');

        // Two rAFs: let the browser commit the new opacity transition first,
        // then kick off the Ken Burns scale transform
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                slides[index].classList.add('kenburns');
            });
        });
    }

    // Show first slide immediately on load
    goToSlide(0);

    // Cycle every 6 s
    timer = setInterval(() => {
        current = (current + 1) % slides.length;
        goToSlide(current);
    }, 6000);
}

// ---------------------------------------------------------------------------
// 6. TICKER (JS-driven — immune to prefers-reduced-motion)
// ---------------------------------------------------------------------------
function initTicker() {
    const ticker = document.querySelector('.ticker');
    if (!ticker) return;

    // Disable CSS animation in case it's still set
    ticker.style.animation = 'none';

    let pos = 0;
    const speed = 0.4; // px per frame (~24px/s at 60fps)
    let halfWidth = 0;
    let raf = null;
    let paused = false;

    function measure() {
        // Half the scroll width (two identical copies of the text)
        halfWidth = ticker.scrollWidth / 2;
    }

    function step() {
        if (!paused) {
            pos -= speed;
            if (pos <= -halfWidth) pos = 0;
            ticker.style.transform = `translateX(${pos}px)`;
        }
        raf = requestAnimationFrame(step);
    }

    // Pause on hover / resume on leave (accessibility)
    const bar = ticker.closest('.ticker-bar-divider');
    if (bar) {
        bar.addEventListener('mouseenter', () => { paused = true; });
        bar.addEventListener('mouseleave', () => { paused = false; });
    }

    // Wait one frame so the DOM has rendered and we can measure
    requestAnimationFrame(() => {
        measure();
        raf = requestAnimationFrame(step);
    });
}

// ---------------------------------------------------------------------------
// 7. GENRE FILTER (homepage)
// ---------------------------------------------------------------------------
function initGenreFilter(releases) {
    const filterEl = document.getElementById('genreFilter');
    if (!filterEl) return;
    filterEl.addEventListener('click', (e) => {
        const btn = e.target.closest('.genre-btn');
        if (!btn) return;
        filterEl.querySelectorAll('.genre-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const genre = btn.dataset.genre;
        const filtered = genre === 'all'
            ? releases.slice(0, 8)
            : releases.filter(r => r.genres.includes(genre));
        Modules.Render.releases(filtered);
    });
}

// ---------------------------------------------------------------------------
// 7. SCROLL PROGRESS BAR
// ---------------------------------------------------------------------------
function initScrollProgress() {
    const bar = document.createElement('div');
    bar.id = 'scrollProgress';
    document.body.appendChild(bar);
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        bar.style.width = (Math.min(scrolled, 1) * 100) + '%';
    }, { passive: true });
}

// ---------------------------------------------------------------------------
// 8. BACK TO TOP
// ---------------------------------------------------------------------------
function initBackToTop() {
    const btn = document.createElement('button');
    btn.id = 'backToTop';
    btn.className = 'hover-target';
    btn.setAttribute('aria-label', 'Terug naar boven');
    btn.setAttribute('type', 'button');
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M18 15l-6-6-6 6"/></svg>';
    document.body.appendChild(btn);
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ---------------------------------------------------------------------------
// 9. NEWSLETTER POPUP
// ---------------------------------------------------------------------------
function initNewsletterPopup() {
    if (localStorage.getItem('nl_dismissed')) return;
    const popup = document.createElement('div');
    popup.id = 'nlPopup';
    popup.innerHTML = `
        <div class="nl-inner">
            <button class="nl-close hover-target" id="nlClose" aria-label="Sluiten" type="button">&times;</button>
            <p class="nl-tag">THE INNER CIRCLE</p>
            <h2 class="nl-title">Mis niks.</h2>
            <p class="nl-sub">Nieuwe releases, exclusieve drops en tour dates — direct in je inbox.</p>
            <form class="nl-form" id="nlForm">
                <input type="email" placeholder="EMAIL ADDRESS" required autocomplete="email">
                <button type="submit" class="hover-target">SUBSCRIBE</button>
            </form>
        </div>
    `;
    document.body.appendChild(popup);

    const dismiss = () => {
        popup.classList.remove('active');
        localStorage.setItem('nl_dismissed', '1');
    };

    setTimeout(() => popup.classList.add('active'), 15000);

    document.getElementById('nlClose')?.addEventListener('click', dismiss);
    popup.addEventListener('click', (e) => { if (e.target === popup) dismiss(); });
    document.getElementById('nlForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        popup.querySelector('.nl-form').innerHTML = '<p class="nl-success">AANGEMELD ✓</p>';
        setTimeout(dismiss, 2000);
    });
}

// ---------------------------------------------------------------------------
// 10. JSON-LD STRUCTURED DATA (Schema.org — boosts Google Rich Results)
// ---------------------------------------------------------------------------
function injectJsonLd(data) {
    const ld = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "MusicGroup",
                "name": "Traditional Records",
                "url": "https://traditionalrecords.sr",
                "logo": "https://traditionalrecords.sr/logo.png",
                "genre": ["Kaseko", "Kawina", "Winti", "Dancehall", "Reggae", "Gospel", "Zouk"],
                "foundingDate": "2025",
                "description": "Het toonaangevende platenlabel voor Surinaamse erfgoedmuziek.",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Waterkant 12",
                    "addressLocality": "Paramaribo",
                    "addressCountry": "SR"
                },
                "sameAs": [
                    "https://instagram.com/traditionalrecords",
                    "https://facebook.com/traditionalrecords"
                ]
            },
            ...(data.releases || []).slice(0, 10).map(r => ({
                "@type": "MusicAlbum",
                "name": r.title,
                "byArtist": { "@type": "MusicGroup", "name": r.artist },
                "genre": r.genres[0],
                "offers": {
                    "@type": "Offer",
                    "price": r.price.toFixed(2),
                    "priceCurrency": "EUR",
                    "availability": r.scarcity === 'UITVERKOCHT'
                        ? "https://schema.org/OutOfStock"
                        : "https://schema.org/InStock"
                },
                "image": r.img
            })),
            ...(data.events || []).map(e => ({
                "@type": "MusicEvent",
                "name": `${e.artist} — ${e.venue}`,
                "startDate": `2026-${e.month === 'JUN' ? '06' : e.month === 'JUL' ? '07' : '08'}-${e.day}`,
                "location": {
                    "@type": "MusicVenue",
                    "name": e.venue,
                    "address": { "@type": "PostalAddress", "addressLocality": e.city, "addressCountry": "NL" }
                },
                "performer": { "@type": "MusicGroup", "name": e.artist }
            }))
        ]
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(ld);
    document.head.appendChild(script);
}
