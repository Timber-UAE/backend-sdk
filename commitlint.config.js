module.exports = {
  parserPreset: 'conventional-changelog-conventionalcommits',
  rules: {
    'body-leading-blank': [1, 'always'],
    'agro-core-prefix': [2, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'subject-case': [
      2,
      'always',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case', 'lower-case', 'snake-case'],
    ],
    'subject-empty': [1, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [0, 'never'],
    'type-enum': [0, 'always'],
  },
  plugins: [
    {
      rules: {
        'agro-core-prefix': ({ header }) => {
          if (!header) {
            return [false, 'Commit message cannot be empty.'];
          }

          const typeRegex = /^(fix|chore|build|ci|docs|refactor|revert|test|feat|style)/;
          const ticketRegex = /\((\w+-\d+)\)/;
          const subjectRegex = /:\s(.+)/;

          if (!typeRegex.test(header)) {
            return [
              false,
              'Invalid type! Valid types are: fix, chore, build, ci, docs, refactor, revert, test, feat, style.',
            ];
          }

          if (!ticketRegex.test(header)) {
            return [
              false,
              'Invalid or missing ticket reference! The ticket should be in the format (TICKET-ID) e.g., (TIM-6).',
            ];
          }

          if (!subjectRegex.test(header)) {
            return [
              false,
              'Invalid or missing subject! Provide a meaningful subject after the ticket reference, e.g., feat(TIM-6): Implement feature.',
            ];
          }

          return [true, 'You made a correct commit message.'];
        },
      },
    },
  ],
};
