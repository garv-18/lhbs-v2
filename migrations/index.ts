import * as migration_20260618_103741_categories from './20260618_103741_categories';

export const migrations = [
  {
    name: '20260618_103741_categories',
    up: migration_20260618_103741_categories.up,
    down: migration_20260618_103741_categories.down,
  }
];
