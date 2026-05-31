Kort beskrivelse af projektet

Dette projekt er udviklet som en del af eksamensprojektet på Multimediedesign 1. semester. 

Projektet handler om at udvikle en mobilvenlig løsning til SpilCaféen, hvor brugeren kan få overblik over de forskellige spil i cafeen gennem en listeside med filtrering samt detaljeside for hvert spil. 

Formålet med projektet er at skabe en overskuelig og brugervenlig løsning, hvor brugeren hurtigt kan finde spil ud fra interesser og behov. 

I projektet er der brugt HTML, CSS, JavaScript, JSON-data og Figma til prototype og design. 

På siden kan brugeren: 

- Se en liste med spil 
- Filtrere spil efter kategorier
- Søge efter spil
- Åbne en detaljeside med information om det enkelte spil

Projektet arbejder med data fra JSON-fil, som indeholder informationer om forskellige spil. 


Fil-og mappestruktur:

Projektet er organiseret i forskellige filer og mapper for at skabe overblik og struktur. 


HTML:

HTML-filen indeholder sidens struktur og indhold. Her er blandt andet: 

- topbar/navigation
- filterfunktion
- søgefelt
- spil-grid/cards
- overlay/detaljeside 


CSS:

CSS-filerne bruges til styling af siden. 
Her styles blandt andet med:

- layout
- farver
- typografi
- responsive løsninger
- cards
- knapper
- overlay/modal 


JavaScript:

Filerne bruges til funktionalitet og interaktivitet på siden. 
Her håndteres blandt andet: 

- hentning af data fra JSON
- filtrering af spil
-  søgefunktion 
- visning af spil i DOM'en 
- klikfunktioner
- overlay/detaljeside


Billeder:

Projektet bruger både lokale billeder og billeder hentet eksternt via JSON-data. 
Logo ligger i img-mappen. Spillenes billeder hentes dynamisk fra URLs i JSON-filen og vises automatisk på siden gennem JavaScript. 

Projektet bruger også eksterne ikoner og assets fra hentet via CDN. 


Validering af CSS:

Jeg har valideret min CSS ved hjælp af W3C CSS Validator. Jeg validerede min CSS-fil for at undersøge, om der var fejl eller advarsler i koden. 

Under validering blev jeg bekræftet i, at min CSS var uden fejl. 


Validering af HTML:

HTML er blevet valideret ved hjælp af W3C HTML Validator. 
HTML-filen blev valideres for at sikre korrekt struktur og semantisk opbygning. 

Under validering blev der vist enkelte konklusioner med info og warnings, primært angående manglende heading i nogle sektioner. Ellers en validering uden fejl. 


JavaScript datastruktur:

Projektets kodning arbejder med data fra en JSON-fil. Dataene består af et array med objekter, hvor hvert objekt repræsenterer et spil. 

Hvert objekt indeholder forskellige properties, for eksempel:

- title
- category
- players
- time
- image
- description
- rules 

Denne datastruktur passer godt til projektet, fordi hvert spil har flere informationer tilknyttet, som nemt kan vises dynamisk på siden. 

Ved at arbejde med objekter i et array bliver det også lettere at filtrere data, søge i data og vise data dynamisk i DOM'en. 


Eksempel på JavaScript kode:

function applyFiltersAndSort() {

    // Henter teksten fra søgefeltet
    const searchValue = document
    .querySelector("#search-input-mobile")
    // Fjerner mellemrum før og efter teksten
    .value.trim()
    // Gør søgningen mindre følsom over for store og små bogstaver
    .toLowerCase();

    // Henter den valgte genre for dropdown-menu 
    const selectedGenre = document.querySelector("#genre-select").value;

    /*
    Spillene filtreres ud fra søgning på titel og valgt genre.
    */
    let filteredGames = allGames.filter(function (game) {
    
    // Undersøger om spillets titel matcher søgningen
    const matchesTitle = game.title.toLowerCase().includes(searchValue);

    /*
    Nogle spil kan have flere genre.
    Derfor undersøges det først om genre er et array.
    */
    const gameGenres = Array.isArray(game.genre)
      ? game.genre
      : [game.genre];

    /*
    Hvis brugeren har valgt "all", vises alle spil. 
    Ellers vises kun spil, der passer til den valgte genre.
    */
    const matchesGenre =
      selectedGenre === "all" || gameGenres.includes(selectedGenre);

    //Spillet vises kun hvis begge betingelser passer.
    return matchesTitle && matchesGenre;
  });

    // Til sidst vises de filtrerede spil på siden
    showGames(filteredGames);
}