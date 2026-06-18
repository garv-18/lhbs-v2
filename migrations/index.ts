import * as migration_20260618_103741_categories from './20260618_103741_categories';
import * as migration_20260618_105825_locked_docs from './20260618_105825_locked_docs';

export const migrations = [
  {
    up: migration_20260618_103741_categories.up,
    down: migration_20260618_103741_categories.down,
    name: '20260618_103741_categories',
  },
  {
    up: migration_20260618_105825_locked_docs.up,
    down: migration_20260618_105825_locked_docs.down,
    name: '20260618_105825_locked_docs',
  }
];
