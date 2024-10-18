import {Game} from '@app/utils/types/game';
import {makeAutoObservable} from 'mobx';
import {hydrateStore, makePersistable} from 'mobx-persist-store';

export class GameStore implements IStore {
  game: Game | undefined = undefined;

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: GameStore.name,
      properties: ['game'],
    });
  }

  set<T extends StoreKeysOf<GameStore>>(what: T, value: GameStore[T]) {
    (this as GameStore)[what] = value;
  }
  setMany<T extends StoreKeysOf<GameStore>>(obj: Record<T, GameStore[T]>) {
    for (const [k, v] of Object.entries(obj)) {
      this.set(k as T, v as GameStore[T]);
    }
  }

  // Hydration
  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };
}
