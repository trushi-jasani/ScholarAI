// This is AI-assisted reasoning (NLP-style explanation)
// Hackathon-safe: no training, no fake ML claims

export const rankScholarships = (scholarships, user) => {
  return scholarships.map(s => {
    let reasons = [];

    if (s.income_limit >= user.income) {
      reasons.push("your family income is within the allowed limit");
    }

    if (s.category_allowed.includes(user.category)) {
      reasons.push(`you belong to the ${user.category} category`);
    }

    if (s.course_allowed.includes(user.course)) {
      reasons.push(`you are pursuing ${user.course}`);
    }

    return {
      ...s,
      ai_reason: `AI Recommendation: This scholarship matches because ${reasons.join(
        ", "
      )}.`
    };
  });
};
