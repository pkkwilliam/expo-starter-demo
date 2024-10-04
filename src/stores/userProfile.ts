import {makeAutoObservable} from 'mobx';
import {hydrateStore, makePersistable} from 'mobx-persist-store';

export class UserProfileStore implements IStore {
  detail: any = null;

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: UserProfileStore.name,
      properties: ['detail'],
    });
  }

  // Unified set methods
  set<T extends StoreKeysOf<UserProfileStore>>(what: T, value: UserProfileStore[T]) {
    (this as UserProfileStore)[what] = value;
  }
  setMany<T extends StoreKeysOf<UserProfileStore>>(obj: Record<T, UserProfileStore[T]>) {
    for (const [k, v] of Object.entries(obj)) {
      this.set(k as T, v as UserProfileStore[T]);
    }
  }

  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };
}
