const createHashTable = (size = 20) => {
  const table = {};

  const _hash = (key) =>
    key
      .split("")
      .reduce((hash, char) => (hash * 33) ^ char.charCodeAt(0), 5381) % size;

  const put = (key, value) => {
    const index = _hash(key);
    table[index] = table[index] || [];

    const existingEntry = table[index].find((entry) => entry.key === key);

    if (existingEntry) {
      throw new Error(
        `Key "${key}" already exists in the table with value "${existingEntry.value}".`
      );
    }

    table[index].push({ key, value });
  };

  const get = (key) => {
    const index = _hash(key);
    const entry =
      table[index] && table[index].find((entry) => entry.key === key);
    return entry ? entry.value : undefined;
  };

  const remove = (key) => {
    const index = _hash(key);
    const removedEntry =
      table[index] && table[index].find((entry) => entry.key === key);

    if (removedEntry) {
      table[index] = table[index].filter((entry) => entry.key !== key);
      return removedEntry;
    } else {
      throw new Error(`Key "${key}" not found in the table.`);
    }
  };

  const count = () => {
    const totalCount = Object.values(table)
      .filter((entries) => entries && entries.length > 0)
      .reduce((sum, entries) => sum + entries.length, 0);

    console.log(`Total count is ${totalCount}`);
    return totalCount;
  };

  const contains = (key) => {
    const keyExists = Object.values(table).some(
      (entries) => entries && entries.some((entry) => entry.key === key)
    );

    if (keyExists) {
      console.log(`Key "${key}" exists in the table.`);
    } else {
      console.log(`Key "${key}" does not exist in the table.`);
    }

    return keyExists;
  };

  const displayTable = () => {
    console.log("\nHash Table Contents:");
    console.log(table);
  };

  return {
    put,
    get,
    remove,
    count,
    contains,
    displayTable,
  };
};

module.exports = createHashTable;
