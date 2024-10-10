import {makeAutoObservable} from 'mobx';
import {hydrateStore, makePersistable} from 'mobx-persist-store';

export class SocketMessageStore implements IStore {
  messages: Array<any> = [];
  size: number = 50;
  messages2: Array<any> = [];

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: SocketMessageStore.name,
      properties: ['messages', 'messages2'],
    });
  }

  add<T extends StoreKeysOf<SocketMessageStore>>(value: any) {
    (this as SocketMessageStore).messages.push(value);
  }

  // Unified set methods
  set<T extends StoreKeysOf<SocketMessageStore>>(what: T, value: SocketMessageStore[T]) {
    console.log('attemp tp ste', value);
    (this as SocketMessageStore)[what] = value;
    (this as SocketMessageStore).messages2.push(value);
  }
  setMany<T extends StoreKeysOf<SocketMessageStore>>(obj: Record<T, SocketMessageStore[T]>) {
    for (const [k, v] of Object.entries(obj)) {
      this.set(k as T, v as SocketMessageStore[T]);
    }
  }

  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };
}
