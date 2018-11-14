
/**
 * A singleton-like object for guaranteeing unique component keys so that multiple
 * instances of a component's state may be instantiated and passed to a component.
 */
export const keyFactory = {
  containerIds: {},
  // examines the keys on the given container object and stores them as a set 
  // under the given containerId
  storePreexistingKeys: (containerId, container) => {
    _storeKeys(containerId, Object.keys(container))
  },
  // returns a key value that is unique for the set under the given containerId
  getUniqueKey: (containerId) => {
    this._initializeContainer(containerId)
    let key = null
    while (!this._isUnique(key)) {
      key = '_' + Math.random().toString(36).substr(2, 9);
    }
    this._storeKey(containerId, key)
    return key
  },
  // removes the given key from the set under the given containerId
  removeKey: (containerId, key) => {
    this._initializeContainer(containerId)
    this.containerIds[containerId].remove(key)
  },
  // removes all the keys from the set under the given containerId
  clear: (containerId) => {
    this._initializeContainer(containerId)
    this.containerIds[containerId].clear()
  },
  _storeKeys: (containerId, keys) => {
    this._initializeContainer(containerId)
    for (key of keys) {
      this._storeKey(containerId, key)
    }
  },
  _storeKey: (containerId, key) => {
    this.containerIds[containerId].add(key)
  },
  _isUnique: (containerId, key) => {
    return !!key && this.containerIds[containerId].has(key)
  },
  _initializeContainer: (containerId) => {
    if (!this.containerIds[containerId]) {
      this.containerIds[containerId] = new Set()
    }
  }
};