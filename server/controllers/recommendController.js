const recommendService = require("../services/recommendService"); 

    const validGoalTypes = ["emergency", "travel", "lump_sum", "housing", "investment"];
    const validAmountRanges = ["under_100", "100_400", "400_700", "700_1000", "over_1000"];
    const validPeriodMonths = [3, 6, 12, 24];
    const validIncomeRanges = ["under_100", "100_200", "200_300", "over_300"];
    const validPreferenceTypes = ["stable", "balanced", "profit"];

exports.recommendDeposit = async(req, res) => {
  try {
    // 사용자에게 req에서 뽑아올 답변
    const answers = {
        ...req.body,
        periodMonths: Number(req.body.periodMonths)
     };

    // 필수값 누락 에러
    if(!answers.goalType || 
       !answers.amountRange ||
       !answers.periodMonths || 
       !answers.incomeRange || 
       !answers.preferenceType) {
      return res.status(400).json({
        success: false,
        message: "필수 설문 답변 값이 누락되었습니다."
      });
    }

    // 답변 값이 다를 때
    if (
        !validGoalTypes.includes(answers.goalType) ||
        !validAmountRanges.includes(answers.amountRange) ||
        !validPeriodMonths.includes(answers.periodMonths) ||
        !validIncomeRanges.includes(answers.incomeRange) ||
        !validPreferenceTypes.includes(answers.preferenceType)
        ) {
        return res.status(400).json({
            success: false,
            message: "설문 답변 값이 올바르지 않습니다."
        });
    }


    const result = await recommendService.recommendDepositProducts(answers);

    if (!result.success) {
        return res.status(500).json(result);
    }

    //result 결과
    // success: true,
    // recommendations: recommendations.slice(0, 3)
    return res.json(result);

  } catch (err) {
    console.error("controller 예금 추천 에러", err);
    return res.status(500).json({
      success: false,
      message: "상품 추천 중 에러가 발생했습니다."
    }); 
  }
};