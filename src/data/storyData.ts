import { GameNode, GameStats } from '../types';

export const INITIAL_STATS: GameStats = {
  parentEnergy: 80,
  childFocus: 30,
  familyBond: 70,
  creativityMovement: 45,
};

export const STORY_NODES: Record<string, GameNode> = {
  paragraf_1: {
    id: 'paragraf_1',
    type: 'story',
    actTitle: 'Akt I — Sobotnie Popołudnie',
    timeLabel: '15:30',
    progressPercent: 10,
    image: '/images/coffee_mug.jpg',
    text: `Sobotnie popołudnie. Kawa w Twoim kubku wreszcie ma idealną temperaturę, a kanapa wręcz zaprasza do odpoczynku. W tym momencie podchodzi do Ciebie Twój maluch, patrzy prosto w oczy z tą specyficzną miną i rzuca: **„Nudzi mi się... Mogę tablet? Tylko na chwilę!”**.

Wiesz, jak działa „tylko na chwilę” – algorytmy już zacierają ręce, a Ty czujesz ukłucie wyrzutów sumienia na samą myśl o kolejnej godzinie przed ekranem. Co robisz?`,
    choices: [
      {
        id: 'A',
        text: '„Dobrze, ale tylko 20 minut i potem wyłączamy”.',
        consequence: 'Zgadzasz się na 20 minut',
        effect: { parentEnergy: 5, childFocus: -15, familyBond: -15, creativityMovement: -15 },
        nextNodeId: 'p1_tablet_skrot',
      },
      {
        id: 'B',
        text: '„Pogoda jest piękna, idziemy na dwór i plac zabaw!”.',
        consequence: 'Wyjście na plac zabaw',
        effect: { parentEnergy: -30, childFocus: 15, familyBond: 15, creativityMovement: 30 },
        nextNodeId: 'p1_wyjscie_dwor',
      },
      {
        id: 'C',
        text: '„Tablet odpoczywa. Przynieś tę nową książkę z półki, poczytamy razem”.',
        consequence: 'Proponujesz zamianę',
        effect: { parentEnergy: -15, childFocus: 25, familyBond: 25, creativityMovement: 5 },
        nextNodeId: 'p4_ksiazka_start',
      },
    ],
  },

  p1_tablet_skrot: {
    id: 'p1_tablet_skrot',
    type: 'story',
    actTitle: 'Sobotnie Popołudnie',
    timeLabel: '15:50',
    progressPercent: 25,
    text: `Mija obiecane 20 minut. Wchodzisz do pokoju. Dziecko siedzi nieruchomo z twarzą rozświetloną chłodnym blaskiem ekranu. Na Twój widok drga i patrzy błagalnie: **„Eeee, jeszcze tylko chwileczkę! Zaraz wygram tę rundę, proooszę!”**.

Algorytmy zrobiły swoje. Co robisz?`,
    choices: [
      {
        id: 'A1',
        text: '„No dobrze, dokończ ten jeden poziom i bezdyskusyjnie kończymy”.',
        consequence: 'Dajesz jeszcze jeden poziom',
        effect: { parentEnergy: 5, childFocus: -15, familyBond: -15, creativityMovement: -10 },
        nextNodeId: 'p2_tablet_kapitulacja',
      },
      {
        id: 'A2',
        text: '„Koniec czasu. Odkładamy tablet w tej chwili”.',
        consequence: 'Odbierasz tablet',
        effect: { parentEnergy: -20, childFocus: 5, familyBond: -30, creativityMovement: -10 },
        nextNodeId: 'p2_tablet_awantura',
      },
      {
        id: 'A3',
        text: '„Wiem, że gra wciąga. Ale spójrz, zbudujmy szybką bazę z poduszek na kanapie i poczytajmy! Przyniosę garść książek i zobaczymy, co dzisiaj wybierzemy.”',
        consequence: 'Zamiast zakazu — propozycja',
        effect: { parentEnergy: -15, childFocus: 20, familyBond: 20, creativityMovement: 15 },
        nextNodeId: 'p4_ksiazka_start',
      },
    ],
  },

  p2_tablet_kapitulacja: {
    id: 'p2_tablet_kapitulacja',
    type: 'story',
    actTitle: 'Popołudniowe Dylematy',
    timeLabel: '16:50',
    progressPercent: 40,
    text: `Mija godzina. Kiedy odłączasz dziecko od ekranu, widzisz pełne przebodźcowanie: czerwone oczy, marudzenie i złość na każde słowo. Musisz natychmiast pomóc mu się wyciszyć. Co robisz?`,
    choices: [
      {
        id: 'A1_1',
        text: '„Skoro jesteś zmęczony, włączę ci chociaż bajkę na telewizorze”.',
        consequence: 'Włączasz bajkę',
        effect: { parentEnergy: 5, childFocus: -5, familyBond: -15, creativityMovement: -10 },
        nextNodeId: 'p3_tablet_zombi_tv',
      },
      {
        id: 'A1_2',
        text: '„Dosyć tego. Marsz do pokoju sprzątać klocki!”.',
        consequence: 'Nakazujesz sprzątanie',
        effect: { parentEnergy: -30, childFocus: 0, familyBond: -25, creativityMovement: 5 },
        nextNodeId: 'p3_tablet_zombi_wojna',
      },
      {
        id: 'A1_3',
        text: '„Widzę zmęczenie. Chodź, położymy się razem i poczytamy opowieść o pewnym chłopcu...”.',
        consequence: 'Wyciszenie przez bliskość',
        effect: { parentEnergy: -15, childFocus: 25, familyBond: 25, creativityMovement: 5 },
        nextNodeId: 'p4_ksiazka_adam',
      },
    ],
  },

  p2_tablet_awantura: {
    id: 'p2_tablet_awantura',
    type: 'story',
    actTitle: 'Emocje w Pokoju',
    timeLabel: '16:00',
    progressPercent: 40,
    text: `Zabierasz tablet, a w pokoju eksplodują emocje. Dziecko krzyczy: **„To niesprawiedliwe! Nigdy nic nie mogę!”**. Płacze z bezsilności, a w Tobie rośnie napięcie. Jak reagujesz?`,
    choices: [
      {
        id: 'A2_1',
        text: '„Już nie płacz. Chodź do kuchni, dam ci coś słodkiego na zgodę”.',
        consequence: 'Oferujesz coś słodkiego',
        effect: { parentEnergy: 10, childFocus: -10, familyBond: 10, creativityMovement: -5 },
        nextNodeId: 'p3_slodycze_skok_cukru',
      },
      {
        id: 'A2_2',
        text: '„Popłaczesz i ci przejdzie. Posiedź sam w pokoju”.',
        consequence: 'Zostawiasz dziecko samo',
        effect: { parentEnergy: 5, childFocus: 0, familyBond: -25, creativityMovement: 0 },
        nextNodeId: 'p4_dwor_awantura_izolacja',
      },
      {
        id: 'A2_3',
        text: '„Widzę, jak bardzo jesteś zły. Wiem, że to trudne odłożyć grę. Jestem przy tobie. Jak minie największa złość, mam coś ciekawego – nie zgadniesz co to! Świetną historię o pewnym chłopcu...”.',
        consequence: 'Nazywasz emocję i czekasz',
        effect: { parentEnergy: -10, childFocus: 20, familyBond: 25, creativityMovement: 10 },
        nextNodeId: 'p4_ksiazka_adam',
      },
    ],
  },

  p1_wyjscie_dwor: {
    id: 'p1_wyjscie_dwor',
    type: 'story',
    actTitle: 'Spacer na Świeżym Powietrzu',
    timeLabel: '16:15',
    progressPercent: 30,
    text: `Wybiegacie na dwór! Dziecko biega wokół huśtawek i testuje zjeżdżalnię. Po 40 minutach zaczyna marudzić ze zmęczenia i ciągnie Cię za rękaw: **„Nogi mnie już bolą... Wracajmy! A dasz mi w domu tablet?”**. Jak wracacie?`,
    choices: [
      {
        id: 'B1',
        text: '„Dobrze, pobiegałeś, to w domu możesz chwilę pograć”.',
        consequence: 'Pozwalasz na tablet po powrocie',
        effect: { parentEnergy: 15, childFocus: -20, familyBond: -15, creativityMovement: -15 },
        nextNodeId: 'p3_dwor_kapitulacja',
      },
      {
        id: 'B2',
        text: '„Nie ma mowy o tablecie. Wracamy, zjesz kolację i odpoczniesz”.',
        consequence: 'Omawiasz zasadę braku tabletu',
        effect: { parentEnergy: -25, childFocus: 5, familyBond: -25, creativityMovement: -5 },
        nextNodeId: 'p3_dwor_awantura',
      },
      {
        id: 'B3',
        text: '„To wracamy do bazy! Wskakujemy na kanapę dać odpocząć nogom, a ja przyniosę garść książek i zobaczymy, co dzisiaj wybierzemy.”',
        consequence: 'Proponujesz odpoczynek z książką',
        effect: { parentEnergy: -10, childFocus: 20, familyBond: 20, creativityMovement: 15 },
        nextNodeId: 'p4_ksiazka_start',
      },
    ],
  },

  p3_dwor_kapitulacja: {
    id: 'p3_dwor_kapitulacja',
    type: 'story',
    actTitle: 'Powrót do Domu',
    timeLabel: '17:00',
    progressPercent: 50,
    text: `Przekraczacie próg domu. Dziecko natychmiast rzuca buty i sięga po ekran. Wiesz, że po ruchu dostanie teraz silny strzał bodźców z gry. Jak reagujesz?`,
    choices: [
      {
        id: 'B1_1',
        text: '„Masz tablet, a ja zrobię w końcu kolację”.',
        consequence: 'Zostawiasz tablet',
        effect: { parentEnergy: 15, childFocus: -20, familyBond: -20, creativityMovement: -15 },
        nextNodeId: 'p4_dwor_pelny_ekran',
      },
      {
        id: 'B1_2',
        text: '„Zamiast ekranu włączę ci słuchowisko, a sam poukładasz klocki, co?”.',
        consequence: 'Proponujesz bajkę audio',
        effect: { parentEnergy: -15, childFocus: 5, familyBond: -15, creativityMovement: 5 },
        nextNodeId: 'p4_audio_klocki',
      },
      {
        id: 'B1_3',
        text: '„Spójrz, na stole leży nowa książka. W trzecim rozdziale też grali w szachy biegane! Ciekawe na czym to polega? Poczytamy o tym?”.',
        consequence: 'Sięgasz po książkę o szachach',
        effect: { parentEnergy: -5, childFocus: 25, familyBond: 20, creativityMovement: 10 },
        nextNodeId: 'p4_ksiazka_adam',
      },
    ],
  },

  p4_audio_klocki: {
    id: 'p4_audio_klocki',
    type: 'story',
    actTitle: 'Odpoczynek w Pokoju',
    timeLabel: '17:15',
    progressPercent: 60,
    text: `Dziecko słucha bajki grającej z głośnika i dłubie bez przekonania w klockach. Widzisz, że jest zmęczone po dworze, ale audio nie daje mu pełnego wyciszenia. Po chwili spogląda na Ciebie i marudzi: **„Nudne to...”**. Co robisz?`,
    choices: [
      {
        id: 'B1_2_1',
        text: '„To może zmienimy historię? Mam tu opowieść o małym szachiście, który ma na imię Adam...”.',
        consequence: 'Proponujesz historię o Adasiu',
        effect: { parentEnergy: -5, childFocus: 25, familyBond: 15, creativityMovement: 15 },
        nextNodeId: 'p4_ksiazka_adam',
      },
      {
        id: 'B1_2_2',
        text: '„No dobrze, to włączę ci ten tablet na chwilę...”.',
        consequence: 'Zgadzasz się na tablet',
        effect: { parentEnergy: 10, childFocus: -20, familyBond: -15, creativityMovement: -15 },
        nextNodeId: 'p4_dwor_pelny_ekran',
      },
    ],
  },

  p3_dwor_awantura: {
    id: 'p3_dwor_awantura',
    type: 'story',
    actTitle: 'Emocje po Powrocie',
    timeLabel: '17:00',
    progressPercent: 50,
    text: `Wchodzicie do domu z płaczem i trzaskaniem drzwiami. Dziecko jest skrajnie zmęczone i krzyczy na dywanie, że to najgorszy dzień! Twój poziom energii spada. Co robisz?`,
    choices: [
      {
        id: 'B2_1',
        text: '„No przestań płakać, masz ten tablet, tylko się uspokój”.',
        consequence: 'Oddajesz tablet',
        effect: { parentEnergy: 10, childFocus: -25, familyBond: -15, creativityMovement: -20 },
        nextNodeId: 'p4_dwor_pelny_ekran',
      },
      {
        id: 'B2_2',
        text: '„Idź do pokoju i uspokój się, pogadamy jak będziesz spokojny”.',
        consequence: 'Odsyłasz do pokoju',
        effect: { parentEnergy: 5, childFocus: 0, familyBond: -20, creativityMovement: -5 },
        nextNodeId: 'p4_dwor_awantura_izolacja',
      },
      {
        id: 'B2_3',
        text: '„Chodź, przytulę cię. Wiesz... znam świetną historię o chłopcu, który złościł się dokładnie tak samo jak Ty. Poczytamy o nim chwilę na kanapie?”.',
        consequence: 'Wspierasz w emocjach i proponujesz książkę',
        effect: { parentEnergy: -10, childFocus: 20, familyBond: 30, creativityMovement: 10 },
        nextNodeId: 'p4_ksiazka_adam',
      },
    ],
  },

  p4_ksiazka_start: {
    id: 'p4_ksiazka_start',
    type: 'story',
    actTitle: 'Wspólne Czytanie',
    timeLabel: '17:30',
    progressPercent: 70,
    text: `Kanapa okazuje się wyjątkowo wygodna, a dziecko wtula się w Ciebie z książkami. Czysta bliskość. Na co stawiasz podczas wspólnej lektury?`,
    choices: [
      {
        id: 'C1',
        text: '„Wybierzmy klasykę. Poczytamy o kocie w tradycyjnym wydaniu!”.',
        consequence: 'Czytacie znaną bajkę',
        effect: { parentEnergy: 5, childFocus: -10, familyBond: 5, creativityMovement: -5 },
        nextNodeId: 'p5_ksiazka_znudzenie',
      },
      {
        id: 'C2',
        text: '„Poczytajmy opowiadanie po angielsku, żeby podszkolić język”.',
        consequence: 'Próbujesz lekcji po angielsku',
        effect: { parentEnergy: -10, childFocus: -10, familyBond: -5, creativityMovement: 0 },
        nextNodeId: 'p5_ksiazka_frustracja',
      },
      {
        id: 'C3',
        text: '„A chciałbyś posłuchać opowieści o chłopcu, który nazywa się Adam, poznał grę w szachy i przy okazji kilka angielskich słów?”.',
        consequence: 'Proponujesz historię o Adasiu',
        effect: { parentEnergy: -5, childFocus: 30, familyBond: 15, creativityMovement: 20 },
        nextNodeId: 'p4_ksiazka_adam',
      },
    ],
  },

  p5_ksiazka_znudzenie: {
    id: 'p5_ksiazka_znudzenie',
    type: 'story',
    actTitle: 'Poszukiwanie Historii',
    timeLabel: '17:40',
    progressPercent: 75,
    text: `Czytacie klasyczną bajkę, ale dziecko zna ją na pamięć. Zaczyna kręcić się na kanapie, wiercić i wreszcie wzdycha: **„Ile stron do końca?”**. Co robisz?`,
    choices: [
      {
        id: 'C1_1',
        text: '„To zmieńmy historię! Mam tu opowieść o małym szachiście Adasiu...”.',
        consequence: 'Proponujesz historię o Adasiu',
        effect: { parentEnergy: -5, childFocus: 25, familyBond: 15, creativityMovement: 15 },
        nextNodeId: 'p4_ksiazka_adam',
      },
      {
        id: 'C1_2',
        text: '„Dobra, poddaję się. Masz ten tablet, skoro nic innego ci dzisiaj nie pasuje”.',
        consequence: 'Zgadzasz się na tablet',
        effect: { parentEnergy: 10, childFocus: -15, familyBond: -10, creativityMovement: -10 },
        nextNodeId: 'p3_tablet_zombi_tv',
      },
    ],
  },

  // Non-terminal C2 node (Child protests English lesson, offering 1 repair chance to switch to Adam's story)
  p5_ksiazka_frustracja: {
    id: 'p5_ksiazka_frustracja',
    type: 'story',
    actTitle: 'Chwila Wyciszenia',
    timeLabel: '17:45',
    progressPercent: 75,
    text: `Dziecko po kilku skomplikowanych zdaniach gubi się w obcym języku, wzdycha i zniecierpliwione przerywa: **„To za trudne... Nic nie rozumiem! Miała być fajna bajka!”**.

Jak reagujesz na ten protest?`,
    choices: [
      {
        id: 'C2_REPAIR',
        text: '„Masz rację, po całym dniu to za dużo. Przełączmy się na wciągającą historię o Adasiu, który gra w szachy – będzie ciekawie i bez presji!”',
        consequence: 'Przeprosiny i zmiana na historię o Adasiu',
        effect: { parentEnergy: 5, childFocus: 20, familyBond: 20, creativityMovement: 10 },
        nextNodeId: 'p4_ksiazka_adam',
      },
    ],
  },

  p4_ksiazka_adam: {
    id: 'p4_ksiazka_adam',
    type: 'story',
    actTitle: 'Opowiadanie o Adasiu',
    timeLabel: '17:50',
    progressPercent: 85,
    text: `Zaczynacie czytać pierwsze opowiadanie. Historia rówieśnika na kółku szachowym od razu wciąga malucha. Trener pokazuje szachownicę: **„This is a chessboard. It has 64 squares”**.

Dziecko przerywa, dotyka ilustracji i mówi: **„O, patrz, konik! A jak on się nazywa po angielsku?”**. Co robisz?`,
    choices: [
      {
        id: 'C3_1',
        text: '„Sprawdźmy w słowniczku! A potem wyciągnijmy naszą szachownicę i poustawiajmy figury jak w książce!”.',
        consequence: 'Wyciągacie szachownicę',
        effect: { parentEnergy: -10, childFocus: 15, familyBond: 10, creativityMovement: 20 },
        nextNodeId: 'p5_szachy_gra',
      },
      {
        id: 'C3_2',
        text: '„Sprawdźmy w słowniczku, a potem czytajmy dalej, bo sam chcę wiedzieć, jak potoczy się ta partia!”.',
        consequence: 'Czytacie całe opowiadanie',
        effect: { parentEnergy: 10, childFocus: 15, familyBond: 10, creativityMovement: 5 },
        nextNodeId: 'p5_szachy_dalsza_lektura',
      },
      {
        id: 'C3_3',
        text: '„Otwieramy słowniczek – ja mówię nazwę figury po polsku, a Ty szukasz angielskiego imienia!”.',
        consequence: 'Szukacie słówek po angielsku',
        effect: { parentEnergy: 5, childFocus: 25, familyBond: 20, creativityMovement: 15 },
        nextNodeId: 'p5_szachy_angielski',
      },
    ],
  },

  // SUCCESS ENDINGS (Tailored headlines & balanced stats)

  p5_szachy_gra: {
    id: 'p5_szachy_gra',
    type: 'success',
    actTitle: 'Finał Szachowy',
    timeLabel: '18:15',
    progressPercent: 100,
    endingPathType: 'chess',
    title: 'Gratulacje! Rozstawiliście figury na dywanie!',
    text: `Dziecko z zapałem rozkłada figury na dywanie. Gdy szukacie dokładnych reguł, maluch sam sięga po książkę: **„Zobaczmy w słowniczku Adama, tam było napisane!”**.

Wspólnie sprawdzacie zasady, rozgrywacie pełną śmiechu mini-partię, a w domu panuje wspaniała atmosfera. Razem opanowaliście ten dzień!`,
    choices: [
      {
        id: 'CTA_CHESS',
        text: 'Przejdź do podsumowania i odbierz bezpłatny poradnik',
        effect: {},
        nextNodeId: 'landing_page_cta',
      },
    ],
  },

  p5_szachy_dalsza_lektura: {
    id: 'p5_szachy_dalsza_lektura',
    type: 'success',
    actTitle: 'Finał Czytelniczy',
    timeLabel: '18:15',
    progressPercent: 100,
    endingPathType: 'reading',
    title: 'Gratulacje! Maluch poprosił o kolejny rozdział!',
    text: `Cofacie się w głąb kanapy. Czytacie o turnieju szachowym i o tym, jak mądrze tata wspiera bohatera po przegranej.

Dziecko słucha jak urzeczone, całkowicie się wycisza, a na koniec przytula się do Ciebie i pyta cicho: **„Przeczytamy jutro kolejny rozdział?”**. Razem opanowaliście ten dzień!`,
    choices: [
      {
        id: 'CTA_READING',
        text: 'Przejdź do podsumowania i odbierz bezpłatny poradnik',
        effect: {},
        nextNodeId: 'landing_page_cta',
      },
    ],
  },

  p5_szachy_angielski: {
    id: 'p5_szachy_angielski',
    type: 'success',
    actTitle: 'Finał Językowy',
    timeLabel: '18:15',
    progressPercent: 100,
    endingPathType: 'english',
    title: 'Gratulacje! Wymówił «knight» bezbłędnie!',
    text: `Szachowy pojedynek na słówka okazuje się strzałem w dziesiątkę! Dziecko z wypiekami na twarzy szuka haseł *rook*, *bishop* i *knight*.

Ma potężną satysfakcję, że bezbłędnie potrafi je wymówić. Nauka przez zabawę w najczystszej postaci. Razem opanowaliście ten dzień!`,
    choices: [
      {
        id: 'CTA_ENGLISH',
        text: 'Przejdź do podsumowania i odbierz bezpłatny poradnik',
        effect: {},
        nextNodeId: 'landing_page_cta',
      },
    ],
  },

  // GAME OVER NODES (Ślepe zaułki)

  p3_tablet_zombi_tv: {
    id: 'p3_tablet_zombi_tv',
    type: 'game_over',
    actTitle: 'Ślepy Zaułek',
    timeLabel: '18:30',
    progressPercent: 60,
    text: `Włączyłeś telewizor. Dziecko siedzi na dywanie jak zahipnotyzowane. Masz upragnioną ciszę, ale gdy wyłączasz bajkę, emocje biorą górę. Dziecko jest skrajnie przebodźcowane, a wieczorne wyciszenie trwa znacznie dłużej.`,
    finalStatsOverview: {
      childFocus: 0,
      familyBond: 20,
      parentEnergy: 20,
      creativityMovement: 10,
    },
    gameOverCommentary: `Kolejny ekran daje chwilę oddechu rodzicowi, ale ostatecznie podwaja trudność w wyciszeniu dziecka na resztę dnia.`,
    choices: [
      {
        id: 'RETRY',
        text: 'Cofnij czas i spróbuj jeszcze raz ➔ Przejdź do startu',
        effect: {},
        nextNodeId: 'paragraf_1',
      },
    ],
  },

  p3_tablet_zombi_wojna: {
    id: 'p3_tablet_zombi_wojna',
    type: 'game_over',
    actTitle: 'Ślepy Zaułek',
    timeLabel: '18:00',
    progressPercent: 60,
    text: `Próba wymuszenia dyscypliny na przebodźcowanym dziecku kończy się wybuchem. Klocki lądują na podłodze, a w domu rośnie poziom stresu.`,
    finalStatsOverview: {
      childFocus: 5,
      familyBond: 10,
      parentEnergy: 10,
      creativityMovement: 15,
    },
    gameOverCommentary: `Gdy układ nerwowy malucha jest przeciążony ekranem, zmuszanie go do obowiązków wywołuje tylko większy opór. Najpierw spokój i bliskość, potem porządki.`,
    choices: [
      {
        id: 'RETRY',
        text: 'Cofnij czas i spróbuj jeszcze raz ➔ Przejdź do startu',
        effect: {},
        nextNodeId: 'paragraf_1',
      },
    ],
  },

  p3_slodycze_skok_cukru: {
    id: 'p3_slodycze_skok_cukru',
    type: 'game_over',
    actTitle: 'Ślepy Zaułek',
    timeLabel: '17:30',
    progressPercent: 60,
    text: `Słodycze na chwilę uciszyły płacz, ale krótki skok glukozy szybko zamienia się w jeszcze większy wybuch złości i marudzenie. Dziecko nie nauczyło się radzić z trudną emocją, a Ty masz w domu mały wulkan.`,
    finalStatsOverview: {
      childFocus: 0,
      familyBond: 30,
      parentEnergy: 15,
      creativityMovement: 0,
    },
    gameOverCommentary: `Zastępowanie trudnych emocji cukrem wycisza problem na 5 minut, ale w dłuższej perspektywie potęguje trudności z samoregulacją i skupieniem.`,
    choices: [
      {
        id: 'RETRY',
        text: 'Cofnij czas i spróbuj jeszcze raz ➔ Przejdź do startu',
        effect: {},
        nextNodeId: 'paragraf_1',
      },
    ],
  },

  p4_dwor_pelny_ekran: {
    id: 'p4_dwor_pelny_ekran',
    type: 'game_over',
    actTitle: 'Ślepy Zaułek',
    timeLabel: '18:30',
    progressPercent: 65,
    text: `Ruch na świeżym powietrzu miał dotlenić mózg, tymczasem szybki powrót do tabletu wykasował całą energię z wyjścia. Dziecko dłubie widelcem w talerzu i dopytuje tylko o kolejną grę.`,
    finalStatsOverview: {
      childFocus: 5,
      familyBond: 20,
      parentEnergy: 30,
      creativityMovement: 10,
    },
    gameOverCommentary: `Ruch na dworze daje świetną bazę pod analogowe zabawy w domu. Zamiana dotlenionego mózgu na cyfrowy ekran uśpiła wrodzoną ciekawość.`,
    choices: [
      {
        id: 'RETRY',
        text: 'Cofnij czas i spróbuj jeszcze raz ➔ Przejdź do startu',
        effect: {},
        nextNodeId: 'paragraf_1',
      },
    ],
  },

  p4_dwor_awantura_izolacja: {
    id: 'p4_dwor_awantura_izolacja',
    type: 'game_over',
    actTitle: 'Ślepy Zaułek',
    timeLabel: '18:00',
    progressPercent: 65,
    text: `Zostawiasz marudzące dziecko samo w pokoju. Po dłuższym czasie szlochanie cichnie, ale gdy zaglądasz do środka, maluch leży smętnie na łóżku. Trudne emocje opadły, ale w powietrzu wisi chłodny dystans.`,
    finalStatsOverview: {
      childFocus: 10,
      familyBond: 10,
      parentEnergy: 40,
      creativityMovement: 5,
    },
    gameOverCommentary: `Izolacja wycisza dom, ale zamraża relację. Zmęczone dziecko potrzebowało bezpiecznego powrotu do równowagi z Twoją pomocą.`,
    choices: [
      {
        id: 'RETRY',
        text: 'Cofnij czas i spróbuj jeszcze raz ➔ Przejdź do startu',
        effect: {},
        nextNodeId: 'paragraf_1',
      },
    ],
  },
};
