export const Questions = [
  {
    id: "64e4324b4e25c067d39bb9c2",
    question_type: 4,
    question:
      "TypeScript supports Object Oriented Programming concepts like classes, interfaces, inheritance?",
    mark: 2,
  },
  {
    id: "64e432324e25c067d39bb9ba",
    question_type: 3,
    question: "How can a datatype be declared to be a constant type?",
    mark: 1,
  },
  {
    id: "64e431be4e25c067d39bb9b2",
    question_type: 2,
    question:
      "What is the inherited type for the variable example in 'const example = ['Dylan']'?",
    option_1: " any[]",
    option_2: "string[]",
    option_3: "string",
    option_4: "unknown[]",
    mark: 1,
  },
  {
    id: "64e4319e4e25c067d39bb9a9",
    question_type: 1,
    question: "TypeScript is ?",
    option_1: " case-sensitive",
    option_2: "Case-insensitive",
    option_3: "depends on typescript version",
    option_4: "depends on npm version",
    mark: 1,
  },
];

export enum QuestionType {
  MCQ = 1,
  MAQ = 2,
  FILL_IN_THE_BLANK = 3,
  YES_NO = 4,
}

export const getFormattedOptions = (question: any) => {
  let options;
  if (
    QuestionType.MAQ == question?.question_type ||
    QuestionType.MCQ == question?.question_type
  ) {
    options = [
      {
        id: "option_1",
        answer: "option_1",
        label: question?.option_1,
      },
      {
        id: "option_2",
        answer: "option_2",
        label: question?.option_2,
      },
      {
        id: "option_3",
        answer: "option_3",
        label: question?.option_3,
      },
      {
        id: "option_4",
        answer: "option_4",
        label: question?.option_4,
      },
    ];
  } else {
    options = [
      {
        id: 1,
        answer: "1",
        label: "YES",
      },
      {
        id: 2,
        answer: "0",
        label: "NO",
      },
    ];
  }
  return options;
};
