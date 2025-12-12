import countryRates from "../data/Country";

// Grade multipliers for daily allowance (times per diem base rate)
export const gradeMultipliers = {
  minister: 1.5,
  accounting: 1.45,
  accounting_non: 1.4,
  chief_director: 1.35,
  director: 1.3,
  deputy_director: 1.25,
  officer: 1,
};

// Representation allowance percentages
export const representationPercentages = {
  minister: 10,
  accounting: 9.5,
  accounting_non: 8.5,
  chief_director: 8,
  director: 7.5,
  deputy_director: 5,
  officer: 0,
};

// DSA component percentages
export const dsaComponents = {
  accommodation: 50,
  lunch: 15,
  dinner: 15,
  breakfast: 10,
  other: 10,
};

const MS_IN_HOUR = 1000 * 60 * 60;
const MS_IN_DAY = MS_IN_HOUR * 24;

const ensureDate = (value) => {
  if (value instanceof Date) return value;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error("Invalid date provided for calculation");
  }
  return parsed;
};

const normalizeRoute = (route, index, leg) => {
  if (!route.departure || !route.destination) {
    throw new Error(`Route ${index + 1} (${leg}) is missing a country selection.`);
  }
  const hasDepartureRate = Object.prototype.hasOwnProperty.call(countryRates, route.departure);
  const hasDestinationRate = Object.prototype.hasOwnProperty.call(countryRates, route.destination);
  if (!hasDepartureRate || !hasDestinationRate) {
    throw new Error(`Route ${index + 1} (${leg}) has an unknown country code.`);
  }
  return {
    departure: route.departure,
    destination: route.destination,
    departureDate: ensureDate(route.departureDate),
    arrivalDate: ensureDate(route.arrivalDate),
  };
};

export const formatHours = (hours) => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m}m`;
};

export const getFlightDuration = (departureTime, arrivalTime) => {
  if (!(departureTime instanceof Date) || !(arrivalTime instanceof Date)) return 0;
  let diffMs = arrivalTime.getTime() - departureTime.getTime();
  if (diffMs < 0) {
    let safety = 0;
    while (diffMs < 0 && safety < 3) {
      diffMs += MS_IN_DAY;
      safety += 1;
    }
  }
  const hours = diffMs / MS_IN_HOUR;
  if (hours < 0) return 0;
  return Math.round(hours * 100) / 100;
};

const isBreakfastEligible = (departureTime, arrivalTime, ) => {
  const depHour = departureTime.getHours();
  const arrHour = arrivalTime.getHours();
  const sameDay = departureTime.toDateString() === arrivalTime.toDateString();
  if (depHour < 7) return true;
  if (!sameDay && arrHour < 6) return true;
  return false;
};

const isLunchEligible = (departureTime, arrivalTime) => {
  const depHour = departureTime.getHours();
  const arrHour = arrivalTime.getHours();
  if (depHour >= 7 && depHour < 12) {
    const lunchStart = new Date(departureTime);
    lunchStart.setHours(12, 0, 0, 0);
    const lunchEnd = new Date(departureTime);
    lunchEnd.setHours(14, 0, 0, 0);
    if (arrivalTime >= lunchStart && departureTime < lunchEnd) {
      return true;
    }
  }
  if (arrHour >= 12 && arrHour < 14) return true;
  if (arrHour === 14 && arrivalTime.getMinutes() === 0) return true;
  return false;
};

const isDinnerEligible = (departureTime, arrivalTime) => {
  const arrHour = arrivalTime.getHours();
  if (arrHour >= 18 || arrHour < 6) return true;
  const dinnerStart = new Date(departureTime);
  dinnerStart.setHours(18, 0, 0, 0);
  const dinnerEnd = new Date(departureTime);
  dinnerEnd.setHours(20, 0, 0, 0);
  if (arrivalTime >= dinnerStart && departureTime < dinnerEnd) {
    return true;
  }
  return false;
};

const calculateDestinationDSA = (arrivalTime, departureTime, perDiemRate, gradeMultiplier) => {
  const dailyAllowance = perDiemRate * gradeMultiplier;
  let breakdown = {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    accommodation: 0,
    other: 0,
    breakfastCount: 0,
    lunchCount: 0,
    dinnerCount: 0,
    nightCount: 0,
  };
  const stayMs = departureTime - arrivalTime;
  const stayHours = stayMs / MS_IN_HOUR;
  const fullDays = Math.floor(stayHours / 24);
  if (fullDays > 0) {
    breakdown.breakfast = (dailyAllowance * dsaComponents.breakfast * fullDays) / 100;
    breakdown.lunch = (dailyAllowance * dsaComponents.lunch * fullDays) / 100;
    breakdown.dinner = (dailyAllowance * dsaComponents.dinner * fullDays) / 100;
    breakdown.accommodation = (dailyAllowance * dsaComponents.accommodation * fullDays) / 100;
    breakdown.other = (dailyAllowance * dsaComponents.other * fullDays) / 100;
    breakdown.breakfastCount = fullDays;
    breakdown.lunchCount = fullDays;
    breakdown.dinnerCount = fullDays;
    breakdown.nightCount = fullDays;
  }
  const arrivalDate = new Date(arrivalTime);
  arrivalDate.setHours(0, 0, 0, 0);
  const firstFullDayStart = new Date(arrivalDate);
  firstFullDayStart.setDate(firstFullDayStart.getDate() + 1);
  const departureDate = new Date(departureTime);
  departureDate.setHours(0, 0, 0, 0);
  if (arrivalTime < firstFullDayStart && fullDays >= 0) {
    const arrivalHour = arrivalTime.getHours();
    if (arrivalHour < 12) {
      breakdown.lunch += (dailyAllowance * dsaComponents.lunch) / 100;
      breakdown.lunchCount++;
    }
    if (arrivalHour < 18) {
      breakdown.dinner += (dailyAllowance * dsaComponents.dinner) / 100;
      breakdown.dinnerCount++;
    }
    if (fullDays > 0 || departureTime.toDateString() !== arrivalTime.toDateString()) {
      breakdown.accommodation += (dailyAllowance * dsaComponents.accommodation) / 100;
      breakdown.nightCount++;
    }
  }
  const lastFullDayEnd = new Date(departureDate);
  if (departureTime > lastFullDayEnd && fullDays >= 0) {
    const departureHour = departureTime.getHours();
    if (departureHour >= 7) {
      breakdown.breakfast += (dailyAllowance * dsaComponents.breakfast) / 100;
      breakdown.breakfastCount++;
    }
    if (departureHour >= 14) {
      breakdown.lunch += (dailyAllowance * dsaComponents.lunch) / 100;
      breakdown.lunchCount++;
    }
  }
  const totalDSA = breakdown.breakfast + breakdown.lunch + breakdown.dinner + breakdown.accommodation + breakdown.other;
  return { totalDSA, breakdown };
};

const calculateTravelDSA = (departureTime, arrivalTime, departureCountryRate, destinationCountryRate, gradeMultiplier) => {
  const departureDailyAllowance = departureCountryRate * gradeMultiplier;
  const destinationDailyAllowance = destinationCountryRate * gradeMultiplier;
  let breakdown = {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    accommodation: 0,
    other: 0,
    breakfastCount: 0,
    lunchCount: 0,
    dinnerCount: 0,
    nightCount: 0,
  };
  const isOvernight = departureTime.toDateString() !== arrivalTime.toDateString();
  const depHour = departureTime.getHours();
  const arrHour = arrivalTime.getHours();
  if (depHour < 7) {
    breakdown.breakfast += (departureDailyAllowance * dsaComponents.breakfast) / 100;
    breakdown.breakfastCount++;
  }
  if (depHour < 14) {
    breakdown.lunch += (departureDailyAllowance * dsaComponents.lunch) / 100;
    breakdown.lunchCount++;
  }
  const dinnerTime = new Date(departureTime);
  dinnerTime.setHours(18, 0, 0, 0);
  if (arrivalTime >= dinnerTime || isOvernight) {
    breakdown.dinner += (departureDailyAllowance * dsaComponents.dinner) / 100;
    breakdown.dinnerCount++;
  }
  if (isOvernight) {
    breakdown.accommodation += (departureDailyAllowance * dsaComponents.accommodation) / 100;
    breakdown.nightCount++;
  }
  if (isOvernight && arrHour < 12) {
    breakdown.breakfast += (destinationDailyAllowance * dsaComponents.breakfast) / 100;
    breakdown.breakfastCount++;
  } else if (!isOvernight && arrHour >= 7 && arrHour < 12) {
    breakdown.breakfast += (destinationDailyAllowance * dsaComponents.breakfast) / 100;
    breakdown.breakfastCount++;
  }
  if (arrHour >= 12 && arrHour < 18) {
    breakdown.lunch += (destinationDailyAllowance * dsaComponents.lunch) / 100;
    breakdown.lunchCount++;
  }
  if (arrHour >= 18) {
    breakdown.dinner += (destinationDailyAllowance * dsaComponents.dinner) / 100;
    breakdown.dinnerCount++;
  }
  const avgDailyAllowance = (departureDailyAllowance + destinationDailyAllowance) / 2;
  const daysWithMeals = Math.ceil((breakdown.breakfastCount + breakdown.lunchCount + breakdown.dinnerCount) / 3);
  breakdown.other = (avgDailyAllowance * dsaComponents.other * daysWithMeals) / 100;
  const totalDSA = breakdown.breakfast + breakdown.lunch + breakdown.dinner + breakdown.accommodation + breakdown.other;
  return { totalDSA, breakdown };
};

const calculateSegmentDSA = (departureTime, arrivalTime, perDiemRate, gradeMultiplier) => {
  const dailyAllowance = perDiemRate * gradeMultiplier;
  let breakdown = {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    accommodation: 0,
    other: 0,
    breakfastCount: 0,
    lunchCount: 0,
    dinnerCount: 0,
    nightCount: 0,
  };
  const isOvernight = departureTime.toDateString() !== arrivalTime.toDateString();
  let currentDate = new Date(departureTime);
  let dayCount = 0;
  while (currentDate <= arrivalTime && dayCount < 100) {
    const dayStart = new Date(currentDate);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(currentDate);
    dayEnd.setHours(23, 59, 59, 999);
    const effectiveStart = dayCount === 0 ? departureTime : dayStart;
    const effectiveEnd = currentDate.toDateString() === arrivalTime.toDateString() ? arrivalTime : dayEnd;
    if (dayCount === 0 && isBreakfastEligible(effectiveStart, effectiveEnd, isOvernight)) {
      breakdown.breakfast += (dailyAllowance * dsaComponents.breakfast) / 100;
      breakdown.breakfastCount++;
    } else if (dayCount > 0 && effectiveEnd.getHours() >= 6) {
      breakdown.breakfast += (dailyAllowance * dsaComponents.breakfast) / 100;
      breakdown.breakfastCount++;
    }
    if (isLunchEligible(effectiveStart, effectiveEnd)) {
      breakdown.lunch += (dailyAllowance * dsaComponents.lunch) / 100;
      breakdown.lunchCount++;
    }
    if (isDinnerEligible(effectiveStart, effectiveEnd)) {
      breakdown.dinner += (dailyAllowance * dsaComponents.dinner) / 100;
      breakdown.dinnerCount++;
    }
    if (currentDate.toDateString() !== arrivalTime.toDateString()) {
      breakdown.accommodation += (dailyAllowance * dsaComponents.accommodation) / 100;
      breakdown.nightCount++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
    currentDate.setHours(0, 0, 0, 0);
    dayCount++;
  }
  const daysWithMeals = Math.ceil((breakdown.breakfastCount + breakdown.lunchCount + breakdown.dinnerCount) / 3);
  breakdown.other = (dailyAllowance * dsaComponents.other * daysWithMeals) / 100;
  const totalDSA = breakdown.breakfast + breakdown.lunch + breakdown.dinner + breakdown.accommodation + breakdown.other;
  return { totalDSA, breakdown };
};

const aggregateBreakdown = (target, source) => {
  target.breakfast += source.breakfast || 0;
  target.lunch += source.lunch || 0;
  target.dinner += source.dinner || 0;
  target.accommodation += source.accommodation || 0;
  target.other += source.other || 0;
  target.breakfastCount += source.breakfastCount || 0;
  target.lunchCount += source.lunchCount || 0;
  target.dinnerCount += source.dinnerCount || 0;
  target.nightCount += source.nightCount || 0;
};

const buildTimeline = (outboundRoutes, returnRoutes) => {
  let timeline = [];
  outboundRoutes.forEach((route, index) => {
    timeline.push({
      type: "travel_start",
      time: route.departureDate,
      location: route.departure,
      destination: route.destination,
      routeIndex: index,
      leg: "outbound",
    });
    timeline.push({
      type: "travel_end",
      time: route.arrivalDate,
      location: route.destination,
      from: route.departure,
      routeIndex: index,
      leg: "outbound",
    });
  });
  returnRoutes.forEach((route, index) => {
    timeline.push({
      type: "travel_start",
      time: route.departureDate,
      location: route.departure,
      destination: route.destination,
      routeIndex: index,
      leg: "return",
    });
    timeline.push({
      type: "travel_end",
      time: route.arrivalDate,
      location: route.destination,
      from: route.departure,
      routeIndex: index,
      leg: "return",
    });
  });
  timeline.sort((a, b) => a.time - b.time);
  return timeline;
};

const buildDayByDayBreakdown = ({ startDate, endDate, outboundRoutes, returnRoutes, perDiemRate, gradeMultiplier, grade, fundingSource }) => {
  const dailyAllowance = perDiemRate * gradeMultiplier;
  const accommodationRate = (dailyAllowance * dsaComponents.accommodation) / 100;
  const lunchRate = (dailyAllowance * dsaComponents.lunch) / 100;
  const dinnerRate = (dailyAllowance * dsaComponents.dinner) / 100;
  const breakfastRate = (dailyAllowance * dsaComponents.breakfast) / 100;
  const otherRate = (dailyAllowance * dsaComponents.other) / 100;
  const timeline = buildTimeline(outboundRoutes, returnRoutes);
  let currentDate = new Date(startDate);
  currentDate.setHours(0, 0, 0, 0);
  let dayCounter = 1;
  const results = [];
  while (currentDate <= endDate) {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    let dayStatus = "destination";
    let currentLocation = outboundRoutes[outboundRoutes.length - 1].destination;
    timeline.forEach((event) => {
      if (event.time >= currentDate && event.time < nextDate) {
        if (event.type === "travel_start") {
          dayStatus = event.leg === "outbound" ? "outbound_travel" : "return_travel";
          currentLocation = event.location;
        } else if (event.type === "travel_end") {
          currentLocation = event.location;
        }
      }
    });
    const dayRecord = {
      dayNumber: dayCounter,
      date: new Date(currentDate),
      status: dayStatus,
      location: currentLocation,
      allowances: {
        breakfast: { eligible: false, amount: 0 },
        lunch: { eligible: false, amount: 0 },
        dinner: { eligible: false, amount: 0 },
        accommodation: { eligible: false, amount: 0 },
        other: { eligible: false, amount: 0 },
        supplementary: { eligible: false, amount: 0 },
        representation: { eligible: false, amount: 0 },
      },
    };
    if (currentDate.toDateString() === startDate.toDateString()) {
      const depHour = startDate.getHours();
      if (depHour < 7) {
        dayRecord.allowances.breakfast = { eligible: true, amount: breakfastRate };
      }
      if (depHour < 14) {
        dayRecord.allowances.lunch = { eligible: true, amount: lunchRate };
      }
      dayRecord.allowances.dinner = { eligible: true, amount: dinnerRate };
      if (currentDate.toDateString() !== endDate.toDateString()) {
        dayRecord.allowances.accommodation = { eligible: true, amount: accommodationRate };
      }
      dayRecord.allowances.other = { eligible: true, amount: otherRate };
    } else if (currentDate.toDateString() === endDate.toDateString()) {
      const arrHour = endDate.getHours();
      if (arrHour >= 7) {
        dayRecord.allowances.breakfast = { eligible: true, amount: breakfastRate };
      }
      if (arrHour >= 14) {
        dayRecord.allowances.lunch = { eligible: true, amount: lunchRate };
      }
      if (arrHour >= 18) {
        dayRecord.allowances.dinner = { eligible: true, amount: dinnerRate };
      }
    } else {
      dayRecord.allowances.breakfast = { eligible: true, amount: breakfastRate };
      dayRecord.allowances.lunch = { eligible: true, amount: lunchRate };
      dayRecord.allowances.dinner = { eligible: true, amount: dinnerRate };
      dayRecord.allowances.accommodation = { eligible: true, amount: accommodationRate };
      dayRecord.allowances.other = { eligible: true, amount: otherRate };
    }
    if (fundingSource === "external" && dayCounter <= 30) {
      dayRecord.allowances.supplementary = { eligible: true, amount: 50 };
    }
    if (representationPercentages[grade] > 0) {
      const repPercentage = representationPercentages[grade];
      const repAmount = (perDiemRate * repPercentage) / 100;
      dayRecord.allowances.representation = { eligible: true, amount: repAmount };
    }
    dayRecord.dayTotal = Object.values(dayRecord.allowances).reduce((sum, allowance) => {
      if (allowance.eligible) {
        return sum + allowance.amount;
      }
      return sum;
    }, 0);
    results.push(dayRecord);
    currentDate.setDate(currentDate.getDate() + 1);
    dayCounter++;
  }
  return results;
};

export const calculateTravelAndSubsistence = ({ grade, purpose, fundingSource = "government", outboundRoutes = [], returnRoutes = [] }) => {
  if (!grade) {
    throw new Error("Grade must be selected before calculation.");
  }
  if (!purpose || !purpose.trim()) {
    throw new Error("Please provide the purpose of the journey.");
  }
  if (!outboundRoutes.length) {
    throw new Error("At least one outbound route is required.");
  }
  if (!returnRoutes.length) {
    throw new Error("At least one return route is required.");
  }
  const normalizedOutbound = outboundRoutes.map((route, index) => normalizeRoute(route, index, "outbound"));
  const normalizedReturn = returnRoutes.map((route, index) => normalizeRoute(route, index, "return"));
  const startDate = normalizedOutbound[0].departureDate;
  const endDate = normalizedReturn[normalizedReturn.length - 1].arrivalDate;
  if (startDate >= endDate) {
    throw new Error("Return date must be after the first departure date.");
  }
  const gradeMultiplier = gradeMultipliers[grade] || 1;
  let totals = {
    totalDSA: 0,
    outboundHours: 0,
    returnHours: 0,
    destinationDays: 0,
  };
  let breakdownTotals = {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    accommodation: 0,
    other: 0,
    breakfastCount: 0,
    lunchCount: 0,
    dinnerCount: 0,
    nightCount: 0,
  };
  let currentTime = normalizedOutbound[0].departureDate;
  normalizedOutbound.forEach((route, index) => {
    const legDurationHours = getFlightDuration(route.departureDate, route.arrivalDate);
    totals.outboundHours += legDurationHours;
    const departureRate = countryRates[route.departure];
    const destinationRate = countryRates[route.destination];
    const legResult = calculateTravelDSA(route.departureDate, route.arrivalDate, departureRate, destinationRate, gradeMultiplier);
    totals.totalDSA += legResult.totalDSA;
    aggregateBreakdown(breakdownTotals, legResult.breakdown);
    currentTime = route.arrivalDate;
    const nextRoute = normalizedOutbound[index + 1];
    if (nextRoute) {
      const layoverHours = getFlightDuration(route.arrivalDate, nextRoute.departureDate);
      totals.outboundHours += layoverHours;
      const layoverResult = calculateSegmentDSA(route.arrivalDate, nextRoute.departureDate, destinationRate, gradeMultiplier);
      totals.totalDSA += layoverResult.totalDSA;
      aggregateBreakdown(breakdownTotals, layoverResult.breakdown);
      currentTime = nextRoute.departureDate;
    }
  });
  const finalDestination = normalizedOutbound[normalizedOutbound.length - 1].destination;
  const destinationPerDiem = countryRates[finalDestination];
  const returnStartTime = normalizedReturn[0].departureDate;
  const destinationResult = calculateDestinationDSA(currentTime, returnStartTime, destinationPerDiem, gradeMultiplier);
  totals.totalDSA += destinationResult.totalDSA;
  aggregateBreakdown(breakdownTotals, destinationResult.breakdown);
  const timeAtDestinationHours = Math.max(0, (returnStartTime - currentTime) / MS_IN_HOUR);
  totals.destinationDays = timeAtDestinationHours / 24;
  currentTime = returnStartTime;
  normalizedReturn.forEach((route, index) => {
    const legDurationHours = getFlightDuration(route.departureDate, route.arrivalDate);
    totals.returnHours += legDurationHours;
    const departureRate = countryRates[route.departure];
    const destinationRate = countryRates[route.destination];
    const legResult = calculateTravelDSA(route.departureDate, route.arrivalDate, departureRate, destinationRate, gradeMultiplier);
    totals.totalDSA += legResult.totalDSA;
    aggregateBreakdown(breakdownTotals, legResult.breakdown);
    currentTime = route.arrivalDate;
    const nextRoute = normalizedReturn[index + 1];
    if (nextRoute) {
      const layoverHours = getFlightDuration(route.arrivalDate, nextRoute.departureDate);
      totals.returnHours += layoverHours;
      const layoverResult = calculateSegmentDSA(route.arrivalDate, nextRoute.departureDate, destinationRate, gradeMultiplier);
      totals.totalDSA += layoverResult.totalDSA;
      aggregateBreakdown(breakdownTotals, layoverResult.breakdown);
      currentTime = nextRoute.departureDate;
    }
  });
  const totalDurationMs = endDate - startDate;
  const totalDurationHours = totalDurationMs / MS_IN_HOUR;
  const totalDurationDays = totalDurationHours / 24;
  const destinationDailyAllowance = destinationPerDiem * gradeMultiplier;
  const dailyAllowance = destinationDailyAllowance;
  const representationPercentage = representationPercentages[grade] || 0;
  const representationAllowance = ((destinationPerDiem * representationPercentage) / 100) * totalDurationDays;
  let supplementaryAllowance = 0;
  if (fundingSource === "external") {
    const daysToCount = Math.min(totalDurationDays, 30);
    supplementaryAllowance = daysToCount * 50;
  }
  let totalPayment = totals.totalDSA + representationAllowance;
  if (fundingSource === "external") {
    totalPayment += supplementaryAllowance;
  }
  const dayByDay = buildDayByDayBreakdown({
    startDate,
    endDate,
    outboundRoutes: normalizedOutbound,
    returnRoutes: normalizedReturn,
    perDiemRate: destinationPerDiem,
    gradeMultiplier,
    grade,
    fundingSource,
  });
  return {
    summary: {
      purpose,
      totalDurationDays,
      totalDurationHours,
      outboundHours: totals.outboundHours,
      returnHours: totals.returnHours,
      destinationDays: totals.destinationDays,
      totalDSA: totals.totalDSA,
      totalPayment,
      fundingSource,
    },
    breakdown: {
      accommodation: breakdownTotals.accommodation,
      lunch: breakdownTotals.lunch,
      dinner: breakdownTotals.dinner,
      breakfast: breakdownTotals.breakfast,
      other: breakdownTotals.other,
      counts: {
        breakfast: breakdownTotals.breakfastCount,
        lunch: breakdownTotals.lunchCount,
        dinner: breakdownTotals.dinnerCount,
        nights: breakdownTotals.nightCount,
      },
      representationAllowance,
      supplementaryAllowance,
      dailyAllowance,
      destinationPerDiem,
      gradeMultiplier,
    },
    dayByDay,
  };
};

export default calculateTravelAndSubsistence;


