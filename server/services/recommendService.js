const productModel = require("../models/productModel");

    //1. productModel에서 예금 + 선택 기간 상품 조회
    //2. 명백히 금액 조건 안 맞는 상품 제외
    //3. 각 상품의 amountScore 계산
    //4. 각 상품의 interestScore 계산
    //6. goalType + preferenceType으로 weights 계산
    //7. 최종 score 계산
    //8. score 내림차순 정렬
    //9. TOP 3 반환

//현재 보유 금액 범위를 객체로 변환
exports.convertAmountRangeToRange = function (amountRange){
    const amountMap = {
        under_100: {
            min: 0,
            max: 1000000
        },
        "100_400": {
            min: 1000000,
            max: 4000000
        },        
        "400_700": {
            min: 4000000,
            max: 7000000
        },
        "700_1000": {
            min: 7000000,
            max: 10000000
        },
        over_1000: {
            min: 10000000,
            max: null
        }                 
    };

    return amountMap[amountRange];
};

// 월 소득의 범위를 객체로 변환
exports.convertIncomeRangeToRange = function (incomeRange){
    const incomeMap = {
        under_100: {
            min: 0,
            max: 1000000
        },
        "100_200": {
            min: 1000000,
            max: 2000000
        },        
        "200_300": {
            min: 2000000,
            max: 3000000
        },
        over_300: {
            min: 3000000,
            max: null
        } 
    }

    return incomeMap[incomeRange];
};

// 명백히 금액 조건 안 맞는 상품 제외
exports.isAmountClearlyNotEnough = function (product, answers){
    // 1. 사용자 답변에서 사용자 보유 금액을 객체로 변환
    const amountRange = exports.convertAmountRangeToRange(answers.amountRange);

    // 2. 사용자 보유 금액의 최대값만 가져옴
    const userMaxAmount = amountRange.max;

    // 3. 상품의 최소 가입 금액을 가져옴
    const productMinAmount = Number(product.min_amount) || 0;

    if(userMaxAmount === null){
        return false;
    }

    // 사용자 보유 금액의 최대값 < 상품의 최소 가입 금액이면 true 반환
    return userMaxAmount < productMinAmount;
};

// 각 상품의 amountScore 계산
exports.getAmountScore = function (product, answers) {
    // 금액 조건 점수 계산
    const amountRange = exports.convertAmountRangeToRange(answers.amountRange);

    const userMinAmount = amountRange.min;
    const userMaxAmount = amountRange.max;
    const productMinAmount = Number(product.min_amount) || 0;

    if (userMinAmount >= productMinAmount) {
        return 30;
    }

    if (userMaxAmount === null) {
        return 25;
    }

    if (userMaxAmount >= productMinAmount) {
        return 20;
    }

    return 10;
};

// 각 상품의 interestScore 계산
exports.getInterestScore = function (product, maxRate) {
    // 상품의 금리 꺼내옴
    const rate = Number(product.interest_rate);

    // 
    if (!rate || !maxRate) {
        return 0;
    }

    return Math.round((rate / maxRate) * 30);
};

// 사용자의 월 소득 별로 가중치 할당
const incomeWeights = {
    under_100: {
        interest: 0.85,
        amount: 1.2
    },
    "100_200": {
        interest: 0.95,
        amount: 1.1
    },
    "200_300": {
        interest: 1.05,
        amount: 1.0
    },
    over_300: {
        interest: 1.15,
        amount: 0.95
    }
};

// 사용자의 저축 목표 별로 가중치 할당
const goalWeights = {
    emergency: {
        interest: 0.7,
        amount: 1.4,
    },
    travel: {
        interest: 1.0,
        amount: 1.2,
    },
    lump_sum: {
        interest: 1.2,
        amount: 1.1,
    },
    housing: {
        interest: 1.1,
        amount: 1.3,
    },
    investment: {
        interest: 1.5,
        amount: 0.9,
    }
};

// 사용자의 저축 성향 별로 가중치 할당
const preferenceWeights = {
    stable: {
        interest: 0.9,
        amount: 1.2,
    },
    balanced: {
        interest: 1.0,
        amount: 1.0,
    },
    profit: {
        interest: 1.25,
        amount: 0.9,
    }
};

// 월 소득 가중 x 저축 목표 가중치 x 저축 성향 가중치 = 최종 가중치
exports.getWeights = function (answers) {
    const goal = goalWeights[answers.goalType];
    const preference = preferenceWeights[answers.preferenceType];
    const income = incomeWeights[answers.incomeRange];

    return {
        interest: goal.interest * preference.interest * income.interest,
        amount: goal.amount * preference.amount * income.amount
    };
};

// 상품 1개의 최종 점수 계산
exports.calculateDepositScore = function (product, answers, maxRate) {
    const amountScore = exports.getAmountScore(product, answers);
    const interestScore = exports.getInterestScore(product, maxRate);
    const weights = exports.getWeights(answers);

    const finalScore =
        amountScore * weights.amount +
        interestScore * weights.interest;

    return finalScore;
};

// 사용자 답변 받아서 예금 상품 추천 
exports.recommendDepositProducts = async function (answers) {
    try {
        // DB(productModel)에서 (예금, 금리기간)에 맞는 상품 조회
        const products = await productModel.findProductsByType(
            "deposit",
            answers.periodMonths
        );

        // 사용자가 선택한 저축 금액대에 해당하지 않는 상품 제외
        const availableProducts = products.filter((product) => {
            return !exports.isAmountClearlyNotEnough(product, answers);
        });

        // 후보 상품 중에서 제일 높은 금리를 뽑아오기
        const maxRate = availableProducts.reduce((max, product) => {
            const rate = Number(product.interest_rate);

            if (rate > max) {
                return rate;
            }

            return max;
        }, 0);

        // 각 상품 별 최종 점수 매기기
        const recommendations = availableProducts.map((product) => {
            const score = exports.calculateDepositScore(product, answers, maxRate);

            return {
                ...product,
                interest_rate: (Number(product.interest_rate).toFixed(1)),
                early_termination_rate: product.early_termination_rate === null
                    ? null
                    : (Number(product.early_termination_rate).toFixed(1)),
                score: score
            };
        });

        
        recommendations.sort((a, b) => {
            // 점수 다르면 점수 높은 상품 먼저
            if (b.score !== a.score) {
                return b.score - a.score;
            }

            // 점수가 같으면 금리 높은 상품 먼저
            if (Number(b.interest_rate) !== Number(a.interest_rate)) {
                return Number(b.interest_rate) - Number(a.interest_rate);
            }

            // 금리도 같으면 최소 가입금액 낮은 상품 먼저
            if (Number(a.min_amount) !== Number(b.min_amount)) {
                return Number(a.min_amount) - Number(b.min_amount);
            }
            
            // 그것도 같으면 id 작은 상품 먼저
            return a.id - b.id;
        });


        return {
            success: true,
            recommendations: recommendations.slice(0, 3)
        };
    } catch (err) {
        console.error("service 예금 추천 에러:", err);

        return {
            success: false,
            message: "예금 상품 추천 중 오류가 발생했습니다."
        };
    }
};
