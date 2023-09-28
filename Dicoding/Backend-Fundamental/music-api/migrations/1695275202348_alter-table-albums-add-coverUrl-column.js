/* eslint-disable linebreak-style */
/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.addColumns('albums', {
    cover_url: {
      unique: true,
      type: 'TEXT',
      notNull: false,
      default: null,
    },
  }, { ifNotExists: true });
};

exports.down = (pgm) => {
  pgm.dropColumns(
    'albums',
    ['cover_url'],
    {
      ifExists: true,
    },
  );
};
