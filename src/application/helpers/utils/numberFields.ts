export const numberFields = [
  "price",
  "duration",
  "appointmentsTotal",
  "minimumTimeForReSchedule",
];

export const numberFieldsWithOperatorsGt = numberFields.map(
  (field) => field + "operatorgt"
);
export const numberFieldsWithOperatorsGte = numberFields.map(
  (field) => field + "operatorgte"
);
export const numberFieldsWithOperatorsLt = numberFields.map(
  (field) => field + "operatorlt"
);
export const numberFieldsWithOperatorsLte = numberFields.map(
  (field) => field + "operatorlte"
);
export const numberFieldsWithOperatorsne = numberFields.map(
  (field) => field + "operatorne"
);
export const numberFieldsWithOperations = [
  ...numberFieldsWithOperatorsGt,
  ...numberFieldsWithOperatorsGte,
  ...numberFieldsWithOperatorsLte,
  ...numberFieldsWithOperatorsLt,
  ...numberFieldsWithOperatorsne,
];
export const booleanFields = [
  "haveRecurrence",
  "face",
  "active",
];