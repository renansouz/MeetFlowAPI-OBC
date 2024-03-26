import {
  makeLoadAvailableTimesFactory,
  validateAvailableTimes,
  ValidateAvailableTimesSchema,
} from "@/slices/appointment/useCases";
export const makeValidateAvailableTimesFactory = (): ValidateAvailableTimesSchema => {
  return validateAvailableTimes(makeLoadAvailableTimesFactory());
};