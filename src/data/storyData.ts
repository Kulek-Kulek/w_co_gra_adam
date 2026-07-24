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
    text: `Sobotnie popołudnie. Kawa w Twoim kubku wreszcie ma idealną temperaturę, a kanapa wręcz zaprasza do odpoczynku. W tym momencie podchodzi do Ciebie Twój maluch, patrzy prosto w oczy z tą specyficzną miną i rzuca: **„Nudzi mi się... Mogę tablet? Tylko na chwilę!”**.

Wiesz, jak działa „tylko na chwilę” – algorytmy już zacierają ręce, a Ty czujesz ukłucie wyrzutów sumienia na samą myśl o kolejnej godzinie przed ekranem. Co robisz?`,
    choices: [
      {
        id: 'A',
        text: '„Dobrze, ale tylko 20 minut i potem wyłączamy”.',
        consequence: 'Ulegasz dla świętego spokoju. Dziecko znika w świecie cyfrowym.',
        effect: { parentEnergy: 10, childFocus: -15, familyBond: -20, creativityMovement: -15 },
        nextNodeId: 'p1_tablet_skrot',
      },
      {
        id: 'B',
        text: '„Pogoda jest piękna, idziemy na dwór i plac zabaw!”.',
        consequence: 'Szybki zryw – wyjście na świeże powietrze i doładowanie fizyczne.',
        effect: { parentEnergy: -30, childFocus: 15, familyBond: 15, creativityMovement: 30 },
        nextNodeId: 'p1_wyjscie_dwor',
      },
      {
        id: 'C',
        text: '„Tablet odpoczywa. Przynieś tę nową książkę z półki, poczytamy razem”.',
        consequence: 'Złoty środek – stawiasz na analogową alternatywę w bliskości.',
        effect: { parentEnergy: -5, childFocus: 25, familyBond: 25, creativityMovement: 5 },
        nextNodeId: 'p4_ksiazka_start',
      },
    ],
  },

  p1_tablet_skrot: {
    id: 'p1_tablet_skrot',
    type: 'story',
    actTitle: 'Akt I — Ekranowy Magnes',
    timeLabel: '15:50',
    progressPercent: 25,
    text: `Mija obiecane 20 minut. Wchodzisz do pokoju. Dziecko siedzi nieruchomo z twarzą rozświetloną chłodnym blaskiem ekranu. Na Twój widok drga i patrzy błagalnie: **„Eeee, jeszcze tylko chwileczkę! Zaraz wygram tę rundę, proooszę!”**.

Algorytmy zrobiły swoje – dziecko jest mocno wciągnięte w cyfrową grę. Co robisz?`,
    choices: [
      {
        id: 'A1',
        text: '„No dobrze, dokończ ten jeden poziom i bezdyskusyjnie kończymy”.',
        consequence: 'Dalsze uleganie. Zyskujesz chwilę, ale uwaga dziecka spada.',
        effect: { parentEnergy: 5, childFocus: -15, familyBond: -20, creativityMovement: -10 },
        nextNodeId: 'p2_tablet_kapitulacja',
      },
      {
        id: 'A2',
        text: '„Koniec czasu. Odkładamy tablet w tej chwili”.',
        consequence: 'Twarde „nie”. Stanowcza decyzja wywołuje spięcie.',
        effect: { parentEnergy: -20, childFocus: 5, familyBond: -30, creativityMovement: -10 },
        nextNodeId: 'p2_tablet_awantura',
      },
      {
        id: 'A3',
        text: '„Wiem, że gra wciąga. Ale spójrz, na dnie szafy leży tajemnicze, drewniane pudełko... Chcesz je otworzyć?”.',
        consequence: 'Sprytne przekierowanie uwagi na ciekawość i tajemnicę.',
        effect: { parentEnergy: -15, childFocus: 20, familyBond: 20, creativityMovement: 15 },
        nextNodeId: 'p4_ksiazka_start',
      },
    ],
  },

  p2_tablet_kapitulacja: {
    id: 'p2_tablet_kapitulacja',
    type: 'story',
    actTitle: 'Akt II — Przebodźcowanie',
    timeLabel: '16:50',
    progressPercent: 40,
    text: `Mija godzina. „Tylko jeden poziom” zamieniło się w maraton przed ekranem. Kiedy w końcu odłączasz dziecko od zasilania, widzisz pełne przebodźcowanie: czerwone oczy, marudzenie i złość na każde słowo.

Układ nerwowy malucha jest przeciążony. Musisz natychmiast pomóc mu się wyciszyć. Co robisz?`,
    choices: [
      {
        id: 'A1_1',
        text: '„Skoro jesteś zmęczony, włączę ci chociaż bajkę na telewizorze”.',
        consequence: 'Klin klinem – kupujesz chwile ciszy kolejnym ekranem.',
        effect: { parentEnergy: 10, childFocus: -10, familyBond: -15, creativityMovement: -10 },
        nextNodeId: 'p3_tablet_zombi_tv',
      },
      {
        id: 'A1_2',
        text: '„Dosyć tego. Marsz do pokoju sprzątać klocki!”.',
        consequence: 'Twardy reset – wymuszenie porządków na przeciążonym dziecku.',
        effect: { parentEnergy: -30, childFocus: 0, familyBond: -25, creativityMovement: 5 },
        nextNodeId: 'p3_tablet_zombi_wojna',
      },
      {
        id: 'A1_3',
        text: '„Widzę, że to granie bardzo cię zmęczyło. Chodź, położymy się razem i poczytamy nową książkę...”.',
        consequence: 'Ostatnia deska ratunku – wyciszenie i bliskość na kanapie.',
        effect: { parentEnergy: -15, childFocus: 25, familyBond: 25, creativityMovement: 5 },
        nextNodeId: 'p4_ksiazka_start',
      },
    ],
  },

  p2_tablet_awantura: {
    id: 'p2_tablet_awantura',
    type: 'story',
    actTitle: 'Akt II — Eksplozja Emocji',
    timeLabel: '16:00',
    progressPercent: 40,
    text: `Zabierasz tablet, a w pokoju momentalnie eksplodują trudne emocje. Dziecko krzyczy, rzuca poduszkami i tupie: **„To niesprawiedliwe! Nigdy nic nie mogę!”**.

Sytuacja jest patowa: maluch płacze z bezsilności, a w Tobie rośnie napięcie i trudny do opanowania stres. Jak próbujesz zażegnać ten kryzys?`,
    choices: [
      {
        id: 'A2_1',
        text: '„No już dobrze, nie płacz. Chodź do kuchni, dam ci coś słodkiego na zgodę”.',
        consequence: 'Przekupstwo słodyczami. Szybki zastrzyk cukru łagodzi krzyki.',
        effect: { parentEnergy: 10, childFocus: -10, familyBond: 10, creativityMovement: -5 },
        nextNodeId: 'p3_tablet_zombi_tv',
      },
      {
        id: 'A2_2',
        text: '„Pokrzyczysz, popłaczesz i ci przejdzie. Posiedź sam w pokoju i przemyśl swoje zachowanie”.',
        consequence: 'Przeczekanie i izolacja emocjonalna.',
        effect: { parentEnergy: 5, childFocus: 0, familyBond: -25, creativityMovement: 0 },
        nextNodeId: 'p4_dwor_awantura_izolacja',
      },
      {
        id: 'A2_3',
        text: '„Rozumiem, że jesteś wściekły, też bym był. Przepraszam, że tak gwałtownie zabrałem tablet. Zamiast tego... opowiem ci, jak bohater książki Adam poradził sobie z emocjami w czasie turnieju szachowego”.',
        consequence: 'Mądry rozejm – empatia i przejście do wartościowej opowieści.',
        effect: { parentEnergy: -10, childFocus: 20, familyBond: 25, creativityMovement: 10 },
        nextNodeId: 'p4_ksiazka_start',
      },
    ],
  },

  p1_wyjscie_dwor: {
    id: 'p1_wyjscie_dwor',
    type: 'story',
    actTitle: 'Akt I — Ruch na Świeżym Powietrzu',
    timeLabel: '16:15',
    progressPercent: 30,
    text: `Wybiegacie na dwór, a świeże powietrze natychmiast stawia Was na nogi! Dziecko biega wokół huśtawek, testuje zjeżdżalnię i wspina się na drabinki.

Sielanka trwa dobre 40 minut. Jednak w końcu baterie fizyczne zaczynają się wyczerpywać, a ze zmęczenia pojawia się marudzenie. Maluch ciągnie Cię za rękaw: **„Nogi mnie już bolą... Wracajmy! Ale w domu dasz mi pograć, co?”**. Jak wracacie do domu, by nie wpaść od razu w ramiona ekranu?`,
    choices: [
      {
        id: 'B1',
        text: '„Dobrze, wracamy. Pobiegałeś, więc w domu będziesz mógł chwilę pograć”.',
        consequence: 'Obietnica gry przy powrocie.',
        effect: { parentEnergy: 15, childFocus: -20, familyBond: -15, creativityMovement: -15 },
        nextNodeId: 'p3_dwor_kapitulacja',
      },
      {
        id: 'B2',
        text: '„Nie ma mowy o tablecie, dopiero co biegaliśmy. Wracamy, zjesz kolację i odpoczniesz”.',
        consequence: 'Przetrzymanie i twardy powrót bez dyskusji.',
        effect: { parentEnergy: -25, childFocus: 5, familyBond: -25, creativityMovement: -5 },
        nextNodeId: 'p3_dwor_awantura',
      },
      {
        id: 'B3',
        text: '„Oho, widzę, że rycerze opadli z sił! Wracamy do bazy. Musimy opracować tajny plan obrony naszego zamku, bo figury na planszy czekają na dowódcę”.',
        consequence: 'Zachęta na strategiczne myślenie i misję analogową.',
        effect: { parentEnergy: -10, childFocus: 20, familyBond: 20, creativityMovement: 15 },
        nextNodeId: 'p4_ksiazka_start',
      },
    ],
  },

  p3_dwor_kapitulacja: {
    id: 'p3_dwor_kapitulacja',
    type: 'story',
    actTitle: 'Akt II — Powrót do Domu',
    timeLabel: '17:00',
    progressPercent: 50,
    text: `Przekraczacie próg domu. Obietnica tabletu zadziałała podczas drogi, ale teraz przyszedł moment zapłaty. Dziecko natychmiast rzuca buty w kąt i sięga po ekran.

Wiesz, że zmęczony ruchem układ nerwowy dostanie potężną dawkę dopaminy z ekranu. Jak spróbujesz przekierować uwagę?`,
    choices: [
      {
        id: 'B1_1',
        text: '„Dobrze, masz tu tablet na obiecany czas, a ja w końcu zrobię obiad”.',
        consequence: 'Pełna kapitulacja – dziecko znika w cyfrowym świecie.',
        effect: { parentEnergy: 15, childFocus: -20, familyBond: -20, creativityMovement: -15 },
        nextNodeId: 'p4_dwor_pelny_ekran',
      },
      {
        id: 'B1_2',
        text: '„Wiesz co, zamiast ekranu, włączę ci super słuchowisko na głośniku, a sam poukładasz klocki, co?”.',
        consequence: 'Zmiana umowy na audio – bodźce słuchowe zamiast wzrokowych.',
        effect: { parentEnergy: -15, childFocus: 5, familyBond: -15, creativityMovement: 5 },
        nextNodeId: 'p4_dwor_pelny_ekran',
      },
      {
        id: 'B1_3',
        text: '„Umowa to umowa, ale spójrz – na stole leży nowa książka. O, patrz, w trzecim rozdziale też byli na obozie i grali w szachy biegane! Zupełnie jak my przed chwilą! Przeczytamy jedną stronę?”.',
        consequence: 'Szachowy podstęp z książki – połączenie ruchu z opowieścią.',
        effect: { parentEnergy: -5, childFocus: 25, familyBond: 20, creativityMovement: 10 },
        nextNodeId: 'p4_ksiazka_start',
      },
    ],
  },

  p3_dwor_awantura: {
    id: 'p3_dwor_awantura',
    type: 'story',
    actTitle: 'Akt II — Awantura w Przedpokoju',
    timeLabel: '17:00',
    progressPercent: 50,
    text: `Wchodzicie do mieszkania w akompaniamencie płaczu i trzaskania drzwiami. Dziecko jest skrajnie zmęczone, a odmowa tabletu przelała czarę goryczy. Rzuca się na dywan i krzyczy, że to najgorszy dzień w jego życiu!

Twój poziom energii spada, a w domu rośnie napięcie. Co robisz?`,
    choices: [
      {
        id: 'B2_1',
        text: '„No już przestań płakać, masz ten tablet, tylko się uspokój”.',
        consequence: 'Biała flaga – ulegasz pod wpływem krzyku.',
        effect: { parentEnergy: 10, childFocus: -25, familyBond: -15, creativityMovement: -20 },
        nextNodeId: 'p4_dwor_pelny_ekran',
      },
      {
        id: 'B2_2',
        text: '„Idź do swojego pokoju i wyrycz się, pogadamy jak będziesz spokojny”.',
        consequence: 'Izolacja do wyciszenia.',
        effect: { parentEnergy: 5, childFocus: 0, familyBond: -20, creativityMovement: -5 },
        nextNodeId: 'p4_dwor_awantura_izolacja',
      },
      {
        id: 'B2_3',
        text: '„Widzę, jak bardzo jesteś zmęczony i zły. Chodź, przytulę cię. Wiesz... książkowy Adam na swoim pierwszym turnieju szachowym też był zły i chciał uciekać. Chcesz usłyszeć, co przeszedł?”.',
        consequence: 'Mądry rozejm z historią – łagodne przejście do czytania.',
        effect: { parentEnergy: -10, childFocus: 20, familyBond: 30, creativityMovement: 10 },
        nextNodeId: 'p4_ksiazka_start',
      },
    ],
  },

  p4_ksiazka_start: {
    id: 'p4_ksiazka_start',
    type: 'story',
    actTitle: 'Akt III — Kanapowa Przystań',
    timeLabel: '17:30',
    progressPercent: 70,
    text: `Kanapa okazuje się wyjątkowo wygodna, a dziecko wtula się w Ciebie, przynosząc stosik książek. Atmosfera jest idealna – żadnych ekranów, czysta bliskość. Maluch patrzy na okładki i czeka.

Na co stawiasz podczas wspólnej lektury?`,
    choices: [
      {
        id: 'C1',
        text: '„Wybierzmy klasykę. Poczytamy o Kocie w butach!”.',
        consequence: 'Znana bajka uspokaja, ale szybko nuży malucha szukającego nowości.',
        effect: { parentEnergy: 10, childFocus: -15, familyBond: 5, creativityMovement: -5 },
        nextNodeId: 'p3_tablet_zombi_tv',
      },
      {
        id: 'C2',
        text: '„Skoro mamy czas, poczytajmy to opowiadanie po angielsku, żeby podszkolić język”.',
        consequence: 'Trudniejsza treść bez przygotowania szybko nuży dziecko.',
        effect: { parentEnergy: -20, childFocus: -30, familyBond: -10, creativityMovement: 0 },
        nextNodeId: 'p3_tablet_zombi_tv',
      },
      {
        id: 'C3',
        text: '„A chciałbyś posłuchać opowieści o chłopcu, który nazywa się Adam, poznał grę w szachy i przy okazji kilka angielskich słów?”.',
        consequence: 'Fascynująca nowość – wciągająca fabuła i zagadki wywołują błysk w oczach!',
        effect: { parentEnergy: -5, childFocus: 30, familyBond: 20, creativityMovement: 20 },
        nextNodeId: 'p4_ksiazka_adam',
      },
    ],
  },

  p4_ksiazka_adam: {
    id: 'p4_ksiazka_adam',
    type: 'story',
    actTitle: 'Akt III — Opowieść o Adamie',
    timeLabel: '17:45',
    progressPercent: 85,
    text: `Zaczynacie czytać pierwsze opowiadanie. Historia rówieśnika, który zapisuje się na kółko szachowe do trenera, od razu wciąga dziecko. Dochodzicie do momentu, w którym trener pokazuje szachownicę i mówi: **„This is a chessboard. It has 64 squares”**.

Twój maluch przerywa, dotyka ilustracji i mówi: **„O, wiem! Chessboard to szachownica! A zobacz, jaki fajny konik! Sprawdzimy w tym słowniczku szachowym, jak nazywa się po angielsku?”**.

Widzisz, że historia i urok ilustracji zadziałały idealnie. Co robisz?`,
    choices: [
      {
        id: 'C3_1',
        text: '„Super obserwacja! Sprawdźmy konika w słowniczku, a potem... wyciągnijmy naszą szachownicę i spróbujemy poustawiać figury dokładnie tak jak w książce!”.',
        consequence: 'Idziemy za ciosem – fizyczna zabawa szachowa na żywo!',
        effect: { parentEnergy: -10, childFocus: 15, familyBond: 20, creativityMovement: 20 },
        nextNodeId: 'p5_szachy_gra',
      },
      {
        id: 'C3_2',
        text: '„Masz rację, konik jest super! Sprawdźmy resztę szachowej ekipy w słowniczku, a potem czytajmy dalej, bo sam chcę wiedzieć, jak potoczy się ta partia!”.',
        consequence: 'Spokojne czytanie – dokończenie wciągającej historii.',
        effect: { parentEnergy: 10, childFocus: 20, familyBond: 15, creativityMovement: 5 },
        nextNodeId: 'p5_szachy_dalsza_lektura',
      },
      {
        id: 'C3_3',
        text: '„Dokładnie tak! To może mały pojedynek? Otwieramy słowniczek szachowy – ja mówię nazwę figury po polsku, a Ty próbujesz znaleźć angielskie imię figur!”.',
        consequence: 'Szachowe wyzwanie słowne – nauka języka przez rywalizację.',
        effect: { parentEnergy: -15, childFocus: 10, familyBond: 10, creativityMovement: 10 },
        nextNodeId: 'p5_szachy_angielski',
      },
    ],
  },

  // SUCCESS ENDINGS

  p5_szachy_gra: {
    id: 'p5_szachy_gra',
    type: 'success',
    actTitle: 'Finał Szachowy',
    timeLabel: '18:15',
    progressPercent: 100,
    endingPathType: 'chess',
    title: 'Szachowy Pojedynek na Dywanie!',
    text: `Dziecko z zapałem rozkłada figury na dywanie. Gdy szukacie dokładnych reguł, maluch sam sięga po książkę: **„Zobaczmy w słowniczku Adasia, tam było napisane!”**.

Wspólnie sprawdzacie zasady, rozstawiacie szachownicę i rozgrywacie pełną śmiechu mini-partię. W domu panuje wspaniała, ciepła atmosfera bez jakichkolwiek ekranów!`,
    choices: [
      {
        id: 'CTA_CHESS',
        text: 'Przejdź do podsumowania i sprawdź zapowiedź książki',
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
    title: 'Wieczór Wyciszenia i Zapachu Papieru',
    text: `Cofacie się w głąb kanapy. Czytacie o pierwszej partii i o tym, jak mądrze tata wspiera bohatera po przegranej.

Dziecko słucha jak urzeczone, całkowicie się wycisza, a na koniec przytula się do Ciebie i pyta cicho: **„Przeczytamy jutro kolejny rozdział?”**.`,
    choices: [
      {
        id: 'CTA_READING',
        text: 'Przejdź do podsumowania i sprawdź zapowiedź książki',
        effect: {},
        nextNodeId: 'landing_page_cta',
      },
    ],
  },

  p5_szachy_angielski: {
    id: 'p5_szachy_angielski',
    type: 'success',
    actTitle: 'Finał Edukacyjny',
    timeLabel: '18:15',
    progressPercent: 100,
    endingPathType: 'english',
    title: 'Angielskie Słówka w Mgnieniu Oka!',
    text: `Szachowy pojedynek na słówka okazuje się strzałem w dziesiątkę! Dziecko z wypiekami na twarzy szuka haseł *rook*, *bishop* i *knight*.

Ma potężną satysfakcję, że bezbłędnie potrafi je wymówić i wskazać na ilustracji. Nauka przez zabawę w najczystszej postaci!`,
    choices: [
      {
        id: 'CTA_ENGLISH',
        text: 'Przejdź do podsumowania i sprawdź zapowiedź książki',
        effect: {},
        nextNodeId: 'landing_page_cta',
      },
    ],
  },

  // GAME OVER NODES (Ślepe zaułki)

  p3_tablet_zombi_tv: {
    id: 'p3_tablet_zombi_tv',
    type: 'game_over',
    actTitle: 'Ślepy Zaułek — Efekt Zombi TV',
    timeLabel: '18:30',
    progressPercent: 60,
    text: `Włączyłeś telewizor. Dziecko siedzi na dywanie jak zahipnotyzowane. Masz upragnioną ciszę, ale gdy po pewnym czasie wyłączasz bajkę, emocje biorą górę.

Dziecko jest skrajnie przebodźcowane, płacze na zmianę ze złością, a wieczorne wyciszenie trwa znacznie dłużej niż zwykle. Cyfrowy spokój był tylko ułudą.`,
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
        text: 'Cofnij czas i spróbuj jeszcze raz',
        effect: {},
        nextNodeId: 'paragraf_1',
      },
    ],
  },

  p3_tablet_zombi_wojna: {
    id: 'p3_tablet_zombi_wojna',
    type: 'game_over',
    actTitle: 'Ślepy Zaułek — Domowa Wojna',
    timeLabel: '18:00',
    progressPercent: 60,
    text: `Próba wymuszenia dyscypliny na przebodźcowanym dziecku kończy się wybuchem. Klocki lądują na podłodze, wybuchają głośne protesty, a w domu rośnie poziom stresu.

Sobotni wieczór upływa w napiętej, chłodnej atmosferze, a Ty czujesz całkowite wyczerpanie.`,
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
        text: 'Cofnij czas i spróbuj jeszcze raz',
        effect: {},
        nextNodeId: 'paragraf_1',
      },
    ],
  },

  p4_dwor_pelny_ekran: {
    id: 'p4_dwor_pelny_ekran',
    type: 'game_over',
    actTitle: 'Ślepy Zaułek — Skasowany Ruch',
    timeLabel: '18:30',
    progressPercent: 65,
    text: `Obiad powstał w ciszy, ale zaraz po nim przychodzi znużenie. Swobodny ruch na świeżym powietrzu miał dotlenić mózg, tymczasem szybki powrót do tabletu wykasował całą dobrą energię z wyjścia.

Dziecko dłubie widelcem w talerzu, jest marudne i dopytuje tylko o kolejną grę cyfrową.`,
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
        text: 'Cofnij czas i spróbuj jeszcze raz',
        effect: {},
        nextNodeId: 'paragraf_1',
      },
    ],
  },

  p4_dwor_awantura_izolacja: {
    id: 'p4_dwor_awantura_izolacja',
    type: 'game_over',
    actTitle: 'Ślepy Zaułek — Emocjonalny Chłód',
    timeLabel: '18:00',
    progressPercent: 65,
    text: `Zostawiasz marudzące dziecko samo w pokoju. Po dłuższym czasie szlochanie cichnie, ale gdy zaglądasz do środka, maluch leży smętnie na łóżku i odwraca się plecami.

Trudne emocje opadły, ale w powietrzu wisi chłodny dystans i poczucie osamotnienia.`,
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
        text: 'Cofnij czas i spróbuj jeszcze raz',
        effect: {},
        nextNodeId: 'paragraf_1',
      },
    ],
  },
};
