

export const calculateInitialRiskPercentage = async (user, event, price) => {
  let riskPercentage = 0
  if (user.tickets !== undefined) {
    if (user.tickets !== undefined && user.tickets.length <= 1) {
      riskPercentage += 10
    }
  }
  riskPercentage = await calculatePriceRisk(event, price, riskPercentage)
  riskPercentage = await calculateCommentRisk(event, riskPercentage)
  riskPercentage = await calculateHourCreatedRisk(riskPercentage)
  riskPercentage = Math.min(95, riskPercentage)
  riskPercentage = Math.max(5, riskPercentage)
  return Math.round(riskPercentage)
}


const calculatePriceRisk = (event, price, currentRiskPercentage) => {
  let newRiskPercentage = currentRiskPercentage
  if (event.tickets !== undefined) {
    const averagePrice = (event.tickets.reduce((acc, ticket) => {
      return acc + ticket.price
    }, 0) / event.tickets.length)
    if (averagePrice > price) {
      newRiskPercentage += (100 - price / averagePrice * 100)
    }
    if (averagePrice < price) {
      const percentageDeduction = (price / averagePrice * 100 - 100)
      if (percentageDeduction > 10) {
        newRiskPercentage -= 10
      } else {
        newRiskPercentage -= percentageDeduction
      }
    }
  }
  return newRiskPercentage
}


const calculateHourCreatedRisk = (currentRiskPercentage) => {
  let newRiskPercentage = currentRiskPercentage
  const dateCreatedInUtcHours = new Date().getUTCHours()
  if (dateCreatedInUtcHours >= 9 && dateCreatedInUtcHours <= 17) {
    newRiskPercentage -= 10
  } else {
    newRiskPercentage += 10
  }
  return newRiskPercentage
}


const calculateCommentRisk = (event, currentRiskPercentage) => {
  let newRiskPercentage = currentRiskPercentage
  if (event.comments !== undefined && event.comments.length > 3) {
    newRiskPercentage += 10
  }
  return newRiskPercentage
}

