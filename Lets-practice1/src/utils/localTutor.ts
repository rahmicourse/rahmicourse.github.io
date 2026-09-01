// Local, API-free tutor engine for GitHub Pages.
// This replaces the server/Gemini dependency with deterministic feedback.
export function evaluateRuleBased(text: string, topicIndex: number, studentName: string, retryCount: number) {
  const lower = text.toLowerCase();
  const nextIdx = topicIndex + 1;
  const isFinished = topicIndex >= 7;

  // Topic 0: Name
  if (topicIndex === 0) {
    const hasNamePattern = lower.includes("name is") || lower.includes("i am") || lower.includes("i'm") || lower.includes("my name");
    if (lower.length < 2 || lower.includes("don't know") || lower.includes("tidak tahu")) {
      return {
        reply: "No worries! You can simply say: 'My name is [your name]' or 'I'm [your name]'. What's your name?",
        hasMistake: true,
        correctionNote: "Good try! 👍 Clue: You can use your first name or nickname!",
        hint: "Example: My name is Rina.",
        advanceTopic: false,
        nextTopicIndex: 0,
        suggestedReplies: ["My name is Alex.", "I'm Sarah."],
        isConversationFinished: false,
        feedbackSummary: null,
      };
    }
    const extractedName = text.replace(/my name is|i am|i'm|saya|nama saya/gi, "").trim() || "friend";
    return {
      reply: `Nice to meet you, ${extractedName}! 👋 I'm Alex. Where are you from?`,
      hasMistake: false,
      correctionNote: null,
      hint: null,
      advanceTopic: true,
      nextTopicIndex: 1,
      suggestedReplies: ["I'm from Bandung.", "I come from Jakarta.", "I'm from Indonesia."],
      isConversationFinished: false,
      feedbackSummary: null,
    };
  }

  // Topic 1: Origin
  if (topicIndex === 1) {
    const hasFrom = lower.includes("from") || lower.includes("come from");
    if (!hasFrom && !lower.includes("indonesia") && !lower.includes("jakarta") && !lower.includes("bandung") && lower.length < 3) {
      return {
        reply: "Good try! 👍 When telling where you are from, use 'I am from...' or 'I come from...'. Can you try again?",
        hasMistake: true,
        correctionNote: "Tip: 'I'm from [City/Country]' (Saya berasal dari...).",
        hint: "Example: I'm from Bandung.",
        advanceTopic: false,
        nextTopicIndex: 1,
        suggestedReplies: ["I'm from Bandung.", "I come from Surabaya."],
        isConversationFinished: false,
        feedbackSummary: null,
      };
    }
    return {
      reply: `Oh wow, that's such a great place! 🌆 By the way, how old are you?`,
      hasMistake: false,
      correctionNote: null,
      hint: null,
      advanceTopic: true,
      nextTopicIndex: 2,
      suggestedReplies: ["I'm thirteen years old.", "I am 12 years old.", "I'm 13 years old."],
      isConversationFinished: false,
      feedbackSummary: null,
    };
  }

  // Topic 2: Age
  if (topicIndex === 2) {
    const hasAge = /\d+/.test(lower) || lower.includes("twelve") || lower.includes("thirteen") || lower.includes("fourteen");
    const hasYearsOld = lower.includes("years old") || lower.includes("year old");
    if (!hasAge) {
      return {
        reply: "Good try! 👍 To state your age, say: 'I am [number] years old'. Give it a try!",
        hasMistake: true,
        correctionNote: "Tip: Gunakan pola 'I am ... years old'.",
        hint: "Example: I am thirteen years old.",
        advanceTopic: false,
        nextTopicIndex: 2,
        suggestedReplies: ["I am 13 years old.", "I'm thirteen years old."],
        isConversationFinished: false,
        feedbackSummary: null,
      };
    }
    return {
      reply: `Cool! I'm 13 years old too! We are the same age! 🎒 Where do you study?`,
      hasMistake: false,
      correctionNote: hasYearsOld ? null : "Nice! Pro-tip: You can also say 'years old' at the end! 🌟",
      hint: null,
      advanceTopic: true,
      nextTopicIndex: 3,
      suggestedReplies: ["I study at SMP Harapan.", "I study at SMP Merdeka 1."],
      isConversationFinished: false,
      feedbackSummary: null,
    };
  }

  // Topic 3: School
  if (topicIndex === 3) {
    const hasStudy = lower.includes("study") || lower.includes("smp") || lower.includes("school");
    if (!hasStudy && lower.length < 3) {
      return {
        reply: "Good try! 👍 To tell your school, say: 'I study at SMP [School Name]'. Let's try again!",
        hasMistake: true,
        correctionNote: "Tip: 'I study at...' artinya 'Saya belajar di...'",
        hint: "Example: I study at SMP Harapan.",
        advanceTopic: false,
        nextTopicIndex: 3,
        suggestedReplies: ["I study at SMP Nusantara.", "I study at SMP 1."],
        isConversationFinished: false,
        feedbackSummary: null,
      };
    }
    return {
      reply: `Awesome school! 🏫 Where do you live? (Remember: You can create a fictional address, like Jl. Bintang No. 10!)`,
      hasMistake: false,
      correctionNote: null,
      hint: null,
      advanceTopic: true,
      nextTopicIndex: 4,
      suggestedReplies: ["I live in Bandung.", "I live on Jl. Mawar No. 15.", "I live in Jakarta."],
      isConversationFinished: false,
      feedbackSummary: null,
    };
  }

  // Topic 4: Fictional Address
  if (topicIndex === 4) {
    const hasLive = lower.includes("live in") || lower.includes("live on") || lower.includes("live");
    if (!hasLive) {
      return {
        reply: "Good try! 👍 To tell where you live, say: 'I live in [City]' or 'I live on [Street Name]'. Try again!",
        hasMistake: true,
        correctionNote: "Tip: Gunakan 'in' untuk kota (in Surabaya) dan 'on' untuk nama jalan (on Jl. Melati).",
        hint: "Example: I live on Jl. Merdeka No. 7.",
        advanceTopic: false,
        nextTopicIndex: 4,
        suggestedReplies: ["I live in Jakarta.", "I live on Jl. Bintang No. 5."],
        isConversationFinished: false,
        feedbackSummary: null,
      };
    }
    return {
      reply: `Got it! Sounds like a cozy area. 🏡 How many people are there in your family?`,
      hasMistake: false,
      correctionNote: null,
      hint: null,
      advanceTopic: true,
      nextTopicIndex: 5,
      suggestedReplies: ["There are four people in my family.", "There are five people in my family.", "There are 3 people in my family."],
      isConversationFinished: false,
      feedbackSummary: null,
    };
  }

  // Topic 5: Family
  if (topicIndex === 5) {
    const hasFamily = lower.includes("there are") || lower.includes("people") || lower.includes("family") || /\d+/.test(lower);
    if (!hasFamily) {
      return {
        reply: "Good try! 👍 To tell about family members, say: 'There are [number] people in my family.' Can you try that?",
        hasMistake: true,
        correctionNote: "Tip: 'There are four people in my family.' (Ada 4 orang di keluarga saya).",
        hint: "Example: There are four people in my family.",
        advanceTopic: false,
        nextTopicIndex: 5,
        suggestedReplies: ["There are 4 people in my family.", "There are five people in my family."],
        isConversationFinished: false,
        feedbackSummary: null,
      };
    }
    return {
      reply: `That's wonderful! 👨‍👩‍👧‍👦 Next, what is your hobby? What do you like doing?`,
      hasMistake: false,
      correctionNote: null,
      hint: null,
      advanceTopic: true,
      nextTopicIndex: 6,
      suggestedReplies: ["My hobby is playing badminton.", "I like reading books.", "My hobby is drawing."],
      isConversationFinished: false,
      feedbackSummary: null,
    };
  }

  // Topic 6: Hobbies
  if (topicIndex === 6) {
    const hasHobby = lower.includes("hobby") || lower.includes("like") || lower.includes("playing") || lower.includes("reading") || lower.includes("listening");
    if (!hasHobby && lower.length < 3) {
      return {
        reply: "Good try! 👍 To express your hobby, you can say 'My hobby is [activity]' or 'I like [activity]'. Try again!",
        hasMistake: true,
        correctionNote: "Tip: 'My hobby is playing football' atau 'I like reading'.",
        hint: "Example: My hobby is playing badminton.",
        advanceTopic: false,
        nextTopicIndex: 6,
        suggestedReplies: ["My hobby is playing football.", "I like reading books."],
        isConversationFinished: false,
        feedbackSummary: null,
      };
    }
    return {
      reply: `That sounds like so much fun! ⚽🎨 Last question: What is your favorite subject at school?`,
      hasMistake: false,
      correctionNote: null,
      hint: null,
      advanceTopic: true,
      nextTopicIndex: 7,
      suggestedReplies: ["My favorite subject is English.", "My favorite subject is Science.", "I like Math."],
      isConversationFinished: false,
      feedbackSummary: null,
    };
  }

  // Topic 7: Favorite Subject (Final)
  return {
    reply: `English is amazing! I'm so glad we got to meet and introduce ourselves today. You did fantastic! 🎉`,
    hasMistake: false,
    correctionNote: null,
    hint: null,
    advanceTopic: true,
    nextTopicIndex: 8,
    suggestedReplies: ["Thank you Alex!", "Nice meeting you too!"],
    isConversationFinished: true,
    feedbackSummary: {
      whatYouDidWell: "You successfully completed all 8 introduction questions with confidence! Great job using greeting expressions, stating your name, age, hobbies, and favorite subjects clearly.",
      vocabularyToImprove: "Keep practicing prepositions: use 'in' for cities (in Bandung) and 'on' for streets (on Jl. Sudirman).",
      grammarToImprove: "Remember to use 'am' with 'I' ('I am 13 years old') and possessive 'my' ('My hobby is...').",
      recommendedSentence: "Hello! My name is Rina, I am thirteen years old, and my favorite subject is English.",
    },
  };
}
