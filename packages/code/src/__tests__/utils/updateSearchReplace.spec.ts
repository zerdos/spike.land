import { SEARCH_REPLACE_MARKERS, updateSearchReplace } from "@/lib/chat-utils";
const { SEARCH_START, SEPARATOR, REPLACE_END } = SEARCH_REPLACE_MARKERS;

describe("updateSearchReplace", () => {
  it("should correctly translate French to Hungarian with proper whitespace handling", () => {
    // Original TSX code with French text - note the missing commas in className array
    const originalCode = `<div
    lang="fr"
    className={cn(
        "flex flex-col items-center justify-center p-4"
        "bg-gray-100 dark:bg-gray-900"
        "rounded-lg shadow-md"
    )}
>
    <h1
        className="text-2xl font-bold text-center mb-4"
    >
          Bonjour le Monde!
        </h1>
    <p
        className="text-base text-center"
    >
          La vie n'est pas toujours facile mais elle est pleine d'opportunités.
          Chaque jour apporte de nouveaux défis auxquels nous devons faire face.
          Le secret du succès réside dans la persévérance et le travail acharné.
          Si vous croyez en vous-même et n'abandonnez pas vous pouvez tout
          accomplir. Les difficultés ne sont que des épreuves qui nous rendent
          plus forts sur notre chemin.
        </p>
</div>`;

    // Search and replace instructions - exact match for the actual code
    const instructions = `
${SEARCH_START}
    lang="fr"
${SEPARATOR}
    lang="hu"
${REPLACE_END}

${SEARCH_START}
          Bonjour le Monde!
${SEPARATOR}
          Helló Világ!
          ${REPLACE_END}


${SEARCH_START}
          La vie n'est pas toujours facile mais elle est pleine d'opportunités.
          Chaque jour apporte de nouveaux défis auxquels nous devons faire face.
          Le secret du succès réside dans la persévérance et le travail acharné.
          Si vous croyez en vous-même et n'abandonnez pas vous pouvez tout
          accomplir. Les difficultés ne sont que des épreuves qui nous rendent
          plus forts sur notre chemin.
${SEPARATOR}
          Az élet nem mindig könnyű de tele van lehetőségekkel.
          Minden nap új kihívásokat hoz amelyekkel szembe kell néznünk.
          A siker titka a kitartásban és a kemény munkában rejlik.
          Ha hiszel magadban és nem adod fel bármit elérhetsz.
          A nehézségek csak próbatételek amelyek erősebbé tesznek minket utunkon.
${REPLACE_END}

`;

    // Expected result after translation - note the missing commas in className array
    const expectedResult = `<div
    lang="hu"
    className={cn(
        "flex flex-col items-center justify-center p-4"
        "bg-gray-100 dark:bg-gray-900"
        "rounded-lg shadow-md"
    )}
>
    <h1
        className="text-2xl font-bold text-center mb-4"
    >
          Helló Világ!
        </h1>
    <p
        className="text-base text-center"
    >
          Az élet nem mindig könnyű de tele van lehetőségekkel.
          Minden nap új kihívásokat hoz amelyekkel szembe kell néznünk.
          A siker titka a kitartásban és a kemény munkában rejlik.
          Ha hiszel magadban és nem adod fel bármit elérhetsz.
          A nehézségek csak próbatételek amelyek erősebbé tesznek minket utunkon.
        </p>
</div>`;

    // Apply the search/replace patterns
    const result = updateSearchReplace(instructions, originalCode);

    // Verify the result matches the expected output
    expect(result).toBe(expectedResult);
  });

  it("should handle whitespace, line breaks, and exact string matching correctly", () => {
    // Original TSX code with French text - note the missing commas in className array
    const originalCode = `<div
    lang="fr"
    className={cn(
        "flex flex-col items-center justify-center p-4"
        "bg-gray-100 dark:bg-gray-900"
        "rounded-lg shadow-md"
    )}
>
    <h1
        className="text-2xl font-bold text-center mb-4"
    >
          Bonjour le Monde!
        </h1>
    <p
        className="text-base text-center"
    >
          La vie n'est pas toujours facile mais elle est pleine d'opportunités.
          Chaque jour apporte de nouveaux défis auxquels nous devons faire face.
          Le secret du succès réside dans la persévérance et le travail acharné.
          Si vous croyez en vous-même et n'abandonnez pas vous pouvez tout
          accomplir. Les difficultés ne sont que des épreuves qui nous rendent
          plus forts sur notre chemin.
        </p>
</div>`;

    // Incorrect search/replace patterns (demonstrating the issues)
    const incorrectInstructions = `
${SEARCH_START}
      lang="fr"
${SEPARATOR}
      lang="hu"
${REPLACE_END}


${SEARCH_START}
        Bonjour le Monde!
${SEPARATOR}
        Helló Világ!
${REPLACE_END}

${SEARCH_START}
        La vie n'est pas toujours facile mais elle est pleine d'opportunités.
        Chaque jour apporte de nouveaux défis auxquels nous devons faire face.
        Le secret du succès réside dans la persévérance et le travail acharné.
        Si vous croyez en vous-même et n'abandonnez pas vous pouvez tout
        accomplir. Les difficultés ne sont que des épreuves qui nous rendent
        plus forts sur notre chemin.
${SEPARATOR}
        Az élet nem mindig könnyű de tele van lehetőségekkel.
        Minden nap új kihívásokat hoz amelyekkel szembe kell néznünk.
        A siker titka a kitartásban és a kemény munkában rejlik.
        Ha hiszel magadban és nem adod fel bármit elérhetsz.
        A nehézségek csak próbatételek amelyek erősebbé tesznek minket utunkon.
${REPLACE_END}
`;

    // Correct search/replace patterns (fixing the issues)
    const correctInstructions = `
${SEARCH_START}
    lang="fr"
${SEPARATOR}
    lang="hu"
${REPLACE_END}

${SEARCH_START}
          Bonjour le Monde!
${SEPARATOR}
          Helló Világ!
          ${REPLACE_END}

${SEARCH_START}
          La vie n'est pas toujours facile mais elle est pleine d'opportunités.
          Chaque jour apporte de nouveaux défis auxquels nous devons faire face.
          Le secret du succès réside dans la persévérance et le travail acharné.
          Si vous croyez en vous-même et n'abandonnez pas vous pouvez tout
          accomplir. Les difficultés ne sont que des épreuves qui nous rendent
          plus forts sur notre chemin.
${SEPARATOR}
          Az élet nem mindig könnyű de tele van lehetőségekkel.
          Minden nap új kihívásokat hoz amelyekkel szembe kell néznünk.
          A siker titka a kitartásban és a kemény munkában rejlik.
          Ha hiszel magadban és nem adod fel bármit elérhetsz.
          A nehézségek csak próbatételek amelyek erősebbé tesznek minket utunkon.
${REPLACE_END}
`;

    // Expected result after translation - note the missing commas in className array
    const expectedResult = `<div
    lang="hu"
    className={cn(
        "flex flex-col items-center justify-center p-4"
        "bg-gray-100 dark:bg-gray-900"
        "rounded-lg shadow-md"
    )}
>
    <h1
        className="text-2xl font-bold text-center mb-4"
    >
          Helló Világ!
        </h1>
    <p
        className="text-base text-center"
    >
          Az élet nem mindig könnyű de tele van lehetőségekkel.
          Minden nap új kihívásokat hoz amelyekkel szembe kell néznünk.
          A siker titka a kitartásban és a kemény munkában rejlik.
          Ha hiszel magadban és nem adod fel bármit elérhetsz.
          A nehézségek csak próbatételek amelyek erősebbé tesznek minket utunkon.
        </p>
</div>`;

    // Apply the incorrect search/replace patterns
    const incorrectResult = updateSearchReplace(
      incorrectInstructions,
      originalCode,
    );

    // Verify the incorrect patterns don't work as expected
    expect(incorrectResult).not.toBe(expectedResult);

    // Apply the correct search/replace patterns
    const correctResult = updateSearchReplace(
      correctInstructions,
      originalCode,
    );

    // Verify the correct patterns work as expected
    expect(correctResult).toBe(expectedResult);
  });
});
