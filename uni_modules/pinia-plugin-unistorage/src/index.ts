import {
  createPersistedState,
  type PersistedStateFactoryOptions,
} from "pinia-plugin-persistedstate";

export * from "pinia-plugin-persistedstate";

export function createUnistorage(
  globalOptions: PersistedStateFactoryOptions = {},
) {
  const persistedState = createPersistedState({
    storage: {
      getItem(key) {
        // @ts-ignore
        return uni.getStorageSync(key);
      },
      setItem(key, value) {
        // @ts-ignore
        uni.setStorageSync(key, value);
      },
    },
    serializer: {
      deserialize: JSON.parse,
      serialize: JSON.stringify,
    },
    ...globalOptions,
  });
  // @ts-ignore
  return (ctx) => {
    if (ctx.options.unistorage) {
      ctx.options.persist = ctx.options.unistorage;
    }
    return persistedState(ctx);
  };
}
