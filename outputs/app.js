const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const routes = ["capture", "self", "card", "match"];
const STORAGE_KEY = "mirror_me_accounts_v2";

const chatWindow = $("#chatWindow");
const chatForm = $("#chatForm");
const chatText = $("#chatText");
const voiceButton = $("#voiceButton");
const mirrorCard = $("#mirrorCard");
const flipButton = $("#flipButton");
const selfForm = $("#selfForm");
const simulateImport = $("#simulateImport");
const interestFile = $("#interestFile");
const downloadCard = $("#downloadCard");
const accountForm = $("#accountForm");
const currentAccountSelect = $("#currentAccountSelect");
const matchUserA = $("#matchUserA");
const matchUserB = $("#matchUserB");
const runMatch = $("#runMatch");
const getMbti = $("#getMbti");
const getBigFive = $("#getBigFive");
const generateGap = $("#generateGap");
const quizPanel = $("#quizPanel");
const quizForm = $("#quizForm");
const closeQuiz = $("#closeQuiz");

const mbtiItems = [
  ["当你遇到新朋友时，你", "说话的时间与聆听的时间相当。", "聆听的时间会比说话的时间多。", "E", "I"],
  ["下列哪一种是你的一般生活取向？", "只管做吧。", "找出多种不同选择。", "S", "N"],
  ["你喜欢自己的哪种性格？", "冷静而理性。", "热情而体谅。", "T", "F"],
  ["你擅长", "在有需要时间时同时协调进行多项工作。", "专注在某一项工作上，直至把它完成为止。", "J", "P"],
  ["你参与社交聚会时", "总是能认识新朋友。", "只跟几个亲密挚友呆在一起。", "E", "I"],
  ["当你尝试了解某些事情时，一般你会", "先要了解细节。", "先了解整体情况，细节容后再谈。", "S", "N"],
  ["你对下列哪方面较感兴趣？", "知道别人的想法。", "知道别人的感受。", "T", "F"],
  ["你较喜欢下列哪个工作？", "能让你迅速和即时做出反应。", "能让你定出目标，然后逐步达成目标的工作。", "J", "P"],
  ["下列哪一种说法较适合你？", "当我与友人尽兴后，我会感到精力充沛，并会继续追求这种欢娱。", "当我与友人尽兴后，我会感到疲累，觉得需要一些空间。", "E", "I"],
  ["下列哪一种说法较适合你？", "我较有兴趣知道别人的经历，例如他们做过什么、认识什么人。", "我较有兴趣知道别人的计划和梦想，例如他们会往哪里去、憧憬什么。", "S", "N"],
  ["下列哪一种说法较适合你？", "我擅长订出一些可行的计划。", "我擅长促成别人同意一些计划，并衷力合作。", "T", "F"],
  ["下列哪一种说法较适合你？", "我会突然尝试做某些事，看看会有什么事情发生。", "我尝试做任何事前，都想事先知道可能有什么事情发生。", "J", "P"],
  ["下列哪一种说法较适合你？", "我经常边说话，边思考。", "我在说话前，通常会思考要说的话。", "E", "I"],
  ["下列哪一种说法较适合你？", "四周的实际环境对我很重要，而且会影响我的感受。", "如果我喜欢所做的事情，气氛对我而言并不是那么重要。", "S", "N"],
  ["下列哪一种说法较适合你？", "我喜欢分析，心思缜密。", "我对人感兴趣，关心他们所发生的事。", "T", "F"],
  ["下列哪一种说法较适合你？", "即使已出计划，我也喜欢探讨其他新的方案。", "一旦定出计划，我便希望能依计行事。", "J", "P"],
  ["下列哪一种说法较适合你？", "认识我的人，一般都知道什么对我来说是重要的。", "除了我感觉亲近的人，我不会对人说出什么对我来说是重要的。", "E", "I"],
  ["下列哪一种说法较适合你？", "如果我喜欢某种活动，我会经常进行这种活动。", "我一旦熟悉某种活动后，便希望转而尝试其它新的活动。", "S", "N"],
  ["下列哪一种说法较适合你？", "当我作决定的时候，我更多地考虑正反两面的观点，并且会推理与质证。", "当我作决定的时候，我会更多地了解其他人的想法，并希望能够达成共识。", "T", "F"],
  ["下列哪一种说法较适合你？", "当我专注做某件事情时，需要不时停下来休息。", "当我专注做某件事情时，不希望受到任何干扰。", "J", "P"],
  ["下列哪一种说法较适合你？", "我独处太久，便会感到不安。", "若没有足够的自处时间，我便会感到烦躁不安。", "E", "I"],
  ["下列哪一种说法较适合你？", "我对一些没有实际用途的意念不感兴趣。", "我喜欢意念本身，并享受想象意念的过程。", "S", "N"],
  ["下列哪一种说法较适合你？", "当进行谈判时，我依靠自己的知识和技巧。", "当进行谈判时，我会拉拢其他人至同一阵线。", "T", "F"],
  ["当你放假时，你多数会", "随遇而安，做当时想做的事。", "为想做的事情订出时间表。", "J", "P"],
  ["当你放假时，你多数会", "花多些时间与别人共度。", "花多些时间自己阅读、散步或者发白日梦。", "E", "I"],
  ["当你放假时，你多数会", "返回你喜欢的地方度假。", "选择前往一些你从未到达的地方。", "S", "N"],
  ["当你放假时，你多数会", "带着一些与工作或学校有关的事情。", "处理一些对你重要的人际关系。", "T", "F"],
  ["当你放假时，你多数会", "忘记平时发生的事情，专心享乐。", "想着假期过后要准备的事情。", "J", "P"],
  ["当你放假时，你多数会", "参观著名景点。", "花时间逛博物馆和一些较为幽静的地方。", "E", "I"],
  ["当你放假时，你多数会", "在喜欢的餐厅用膳。", "尝试新的菜式。", "S", "N"],
  ["下列哪个说法最能贴切形容你对自己的看法？", "别人认为我会公正处事，并且尊重他人。", "别人相信在他们有需要时，我会在他们身边。", "T", "F"],
  ["下列哪个说法最能贴切形容你对自己的看法？", "随机应变。", "按照计划行事。", "J", "P"],
  ["下列哪个说法最能贴切形容你对自己的看法？", "坦率。", "深沉。", "E", "I"],
  ["下列哪个说法最能贴切形容你对自己的看法？", "留意事实。", "注重事实。", "S", "N"],
  ["下列哪个说法最能贴切形容你对自己的看法？", "知识广博。", "善解人意。", "T", "F"],
  ["下列哪个说法最能贴切形容你对自己的看法？", "容易适应转变。", "处事井井有条。", "J", "P"],
  ["下列哪个说法最能贴切形容你对自己的看法？", "爽朗。", "沉稳。", "E", "I"],
  ["下列哪个说法最能贴切形容你对自己的看法？", "实事求是。", "富想象力。", "S", "N"],
  ["下列哪个说法最能贴切形容你对自己的看法？", "喜欢询问实情。", "喜欢探索感受。", "T", "F"],
  ["下列哪个说法最能贴切形容你对自己的看法？", "不断接受新意见。", "着眼达成目标。", "J", "P"],
  ["下列哪个说法最能贴切形容你对自己的看法？", "率直。", "内敛。", "E", "I"],
  ["下列哪个说法最能贴切形容你对自己的看法？", "实事求是。", "具远大目光。", "S", "N"],
  ["下列哪个说法最能贴切形容你对自己的看法？", "公正。", "宽容。", "T", "F"],
  ["你会倾向", "暂时放下不愉快的事情，直至有心情时才处理。", "及时处理不愉快的事情，务求把它们抛诸脑后。", "J", "P"],
  ["你会倾向", "自己的工作被欣赏，即使你自己并不满意。", "创造一些有长远价值的东西，但不一定需在别人知道是你做的。", "E", "I"],
  ["你会倾向", "在自己有兴趣的范畴，积累丰富的经验。", "有各式各样不同的经验。", "S", "N"],
  ["哪一句较能表达你的看法？", "感情用事的人较容易犯错。", "逻辑思维会令人自以为是，因而容易犯错。", "T", "F"],
  ["哪一句较能表达你的看法？", "犹豫不决必失败。", "三思而后行。", "J", "P"]
];

const typeIntro = {
  ISTJ: "务实、可靠，重视责任与秩序。",
  ISFJ: "温和、细致，重视照顾他人与稳定关系。",
  INFJ: "洞察、理想主义，关注意义与人的成长。",
  INTJ: "独立、策略性强，喜欢用系统方式解决问题。",
  ISTP: "冷静、灵活，擅长处理具体问题。",
  ISFP: "敏感、真诚，重视个人体验与审美。",
  INFP: "理想、共情，重视价值感与真实表达。",
  INTP: "理性、好奇，喜欢分析概念与可能性。",
  ESTP: "行动力强，喜欢即时反馈和现实挑战。",
  ESFP: "热情、活跃，重视体验和人与人之间的连接。",
  ENFP: "开放、富有想象力，喜欢探索人与可能性。",
  ENTP: "机敏、好辩，擅长发现新思路。",
  ESTJ: "果断、组织力强，重视效率和规则。",
  ESFJ: "友善、负责，重视群体和谐与支持。",
  ENFJ: "有感染力，关注他人潜能与关系成长。",
  ENTJ: "目标明确，擅长组织资源推动结果。"
};

const bigFiveItems = [
  ["extraversion", "我是聚会中的活跃人物。", false],
  ["extraversion", "我和人在一起时感到自在。", false],
  ["extraversion", "我会主动开始谈话。", false],
  ["extraversion", "在聚会上我会和许多不同的人交谈。", false],
  ["extraversion", "我不介意成为关注的中心。", false],
  ["extraversion", "我话不多。", true],
  ["extraversion", "我会待在幕后。", true],
  ["extraversion", "我没什么话可说。", true],
  ["extraversion", "我不喜欢引人注意。", true],
  ["extraversion", "我在陌生人面前很安静。", true],
  ["agreeableness", "我对人感兴趣。", false],
  ["agreeableness", "我同情他人的感受。", false],
  ["agreeableness", "我心肠柔软。", false],
  ["agreeableness", "我愿意花时间帮助别人。", false],
  ["agreeableness", "我能感受到他人的情绪。", false],
  ["agreeableness", "我能让人感到自在。", false],
  ["agreeableness", "我对别人并不真的感兴趣。", true],
  ["agreeableness", "我会冒犯别人。", true],
  ["agreeableness", "我对别人的问题不感兴趣。", true],
  ["agreeableness", "我很少关心别人。", true],
  ["conscientiousness", "我总是准备充分。", false],
  ["conscientiousness", "我关注细节。", false],
  ["conscientiousness", "我会立刻完成杂务。", false],
  ["conscientiousness", "我喜欢秩序。", false],
  ["conscientiousness", "我遵循时间表。", false],
  ["conscientiousness", "我对自己的工作要求精确。", false],
  ["conscientiousness", "我会把自己的东西到处乱放。", true],
  ["conscientiousness", "我会把事情弄得一团糟。", true],
  ["conscientiousness", "我常忘记把东西放回原位。", true],
  ["conscientiousness", "我会逃避自己的职责。", true],
  ["neuroticism", "我很容易感到压力。", false],
  ["neuroticism", "我会为事情担心。", false],
  ["neuroticism", "我容易受到打扰。", false],
  ["neuroticism", "我容易不安或生气。", false],
  ["neuroticism", "我的情绪变化很多。", false],
  ["neuroticism", "我经常情绪波动。", false],
  ["neuroticism", "我容易烦躁。", false],
  ["neuroticism", "我经常感到沮丧。", false],
  ["neuroticism", "我大多数时候很放松。", true],
  ["neuroticism", "我很少感到沮丧。", true],
  ["openness", "我的词汇量丰富。", false],
  ["openness", "我有生动的想象力。", false],
  ["openness", "我有很好的想法。", false],
  ["openness", "我能很快理解事情。", false],
  ["openness", "我会使用较难的词语。", false],
  ["openness", "我会花时间反思事情。", false],
  ["openness", "我充满想法。", false],
  ["openness", "我难以理解抽象概念。", true],
  ["openness", "我对抽象概念不感兴趣。", true],
  ["openness", "我的想象力不太好。", true]
];

const aiReplyBank = [
  {
    keywords: ["压力", "焦虑", "累", "难过", "烦", "崩溃"],
    replies: [
      "听起来你最近真的绷得有点紧。你愿意说说，最消耗你的那一部分是什么吗？",
      "我先陪你把这件事放慢一点看。它更像是任务上的压力，还是关系里的压力？",
      "这种感觉并不轻松。你现在更想被安慰一下，还是想一起把事情理清楚？"
    ]
  },
  {
    keywords: ["朋友", "关系", "社交", "聊天", "喜欢的人", "同学"],
    replies: [
      "人与人之间那种微妙的距离感确实很值得聊。你在这段关系里最在意的是什么？",
      "我听起来你不是简单地想热闹，而是想要一种更被理解的连接。",
      "这段关系好像对你挺重要的。你更希望它变得轻松一点，还是更深入一点？"
    ]
  },
  {
    keywords: ["未来", "计划", "目标", "职业", "考研", "工作"],
    replies: [
      "这个话题很适合慢慢拆开。你现在对未来最清楚的一点是什么，最模糊的一点又是什么？",
      "听起来你在认真规划自己。你更害怕选错方向，还是害怕没有开始？",
      "未来感有时候会让人兴奋，也会让人有点悬空。你现在更接近哪一种感觉？"
    ]
  },
  {
    keywords: ["心理学", "MBTI", "人格", "大五", "自我"],
    replies: [
      "心理学真的很容易让人越聊越上头。你最近是被哪个概念吸引到了？",
      "这个话题我很愿意陪你聊。你是因为课程接触到它，还是生活里刚好遇到了相关的事？",
      "听起来你最近对自己挺好奇的。我们可以随便聊，不用急着给自己下结论。"
    ]
  },
  {
    keywords: ["电影", "音乐", "旅行", "写作", "摄影", "游戏"],
    replies: [
      "这个兴趣听起来很有画面感。最近有没有一个让你印象很深的作品或瞬间？",
      "我想多听一点。你最近有没有一个特别喜欢的作品或体验？",
      "这个我也想听。你喜欢它的时候，是更放松，还是更有被点亮的感觉？"
    ]
  }
];

const fallbackReplies = [
  "嗯，我在听。你可以继续往下说一点，我想知道这件事对你意味着什么。",
  "这个说法很有意思。你是一直都这样感受，还是最近才变得明显？",
  "我会先不急着下结论。你愿意举一个最近发生的小例子吗？",
  "听起来这里面有一点你很在意的东西。你想先吐槽一下，还是慢慢讲清楚？",
  "我理解。那一刻应该不只是一个简单的想法，可能还夹着一点情绪。"
];

let state = loadState();
let activeQuiz = null;

function createAccountData(name, overrides = {}) {
  const id = overrides.id || `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  return {
    id,
    name,
    mbti: overrides.mbti || "",
    mbtiScores: overrides.mbtiScores || null,
    mbtiCompleted: Boolean(overrides.mbtiCompleted),
    bigFive: overrides.bigFive || null,
    bigFiveCompleted: Boolean(overrides.bigFiveCompleted),
    traits: overrides.traits || "好奇、温和、开放、慢热",
    interests: overrides.interests || "心理学、电影、旅行",
    intro: overrides.intro || "我正在通过 Mirror ME 更好地理解自己。",
    behaviorInterests: overrides.behaviorInterests || ["心理学", "电影", "旅行", "情绪成长"],
    interestSourceText: overrides.interestSourceText || "",
    behaviorTags: overrides.behaviorTags || ["开放探索", "关系敏感"],
    chatHistory: overrides.chatHistory || [],
    chatMessages: overrides.chatMessages || null,
    aiAnalysis: overrides.aiAnalysis || null,
    chatAnalyzedCount: overrides.chatAnalyzedCount || 0,
    chatStyle: overrides.chatStyle || "待分析"
  };
}

function defaultAccounts() {
  return [
    createAccountData("你", {
      id: "user_me",
      traits: "内向、敏感、共情、慢热",
      interests: "心理学、电影、旅行、写作",
      intro: "我喜欢观察人，也喜欢在安全的关系里表达真实想法。"
    }),
    createAccountData("小林", {
      id: "user_lin",
      mbti: "INFJ",
      mbtiScores: { E: 38, I: 76, S: 42, N: 80, T: 45, F: 78, J: 70, P: 48 },
      mbtiCompleted: true,
      bigFive: { openness: 76, conscientiousness: 68, extraversion: 45, agreeableness: 82, neuroticism: 58 },
      bigFiveCompleted: true,
      traits: "稳定、倾听、理性、支持",
      interests: "心理学、纪录片、摄影、校园生活",
      intro: "我喜欢慢慢了解一个人，也愿意在关系里提供稳定支持。",
      behaviorInterests: ["心理学", "纪录片", "摄影", "校园生活", "效率工具"],
      behaviorTags: ["倾听", "结构清晰", "现实支持", "关系稳定"],
      chatHistory: ["我喜欢先听别人讲完，再慢慢表达自己的想法。"],
      aiAnalysis: { mbti: [42, 78, 74, 52], bigFive: [76, 68, 45, 82, 58], type: "INFJ-ish" },
      chatStyle: "稳定倾听型"
    })
  ];
}

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored?.accounts?.length) {
      stored.accounts = stored.accounts.map((account) => createAccountData(account.name || "未命名账户", account));
      return stored;
    }
    const legacy = JSON.parse(localStorage.getItem("mirror_me_accounts_v1"));
    if (legacy?.accounts?.length) {
      legacy.accounts = legacy.accounts.map((account) => createAccountData(account.name || "未命名账户", {
        ...account,
        mbti: "",
        mbtiScores: null,
        mbtiCompleted: false,
        bigFive: null,
        bigFiveCompleted: false,
        chatHistory: [],
        aiAnalysis: null,
        chatStyle: "待分析"
      }));
      return legacy;
    }
  } catch (error) {
    console.warn("账户数据读取失败，已重置为示例账户。", error);
  }
  const accounts = defaultAccounts();
  return { currentId: accounts[0].id, accounts };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function currentAccount() {
  return state.accounts.find((account) => account.id === state.currentId) || state.accounts[0];
}

function accountById(id) {
  return state.accounts.find((account) => account.id === id) || state.accounts[0];
}

function listFromText(text = "") {
  return text.split(/[、,，\s]+/).map((item) => item.trim()).filter(Boolean);
}

function unique(items) {
  return Array.from(new Set(items.filter(Boolean)));
}

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

const interestTopics = [
  ["心理学", ["心理", "人格", "MBTI", "大五", "情绪", "关系", "咨询", "自我", "成长"]],
  ["电影", ["电影", "导演", "影评", "影院", "演员", "纪录片", "剧集", "镜头"]],
  ["旅行", ["旅行", "旅游", "城市", "路线", "酒店", "民宿", "景点", "出发"]],
  ["校园生活", ["校园", "课程", "考试", "社团", "同学", "大学", "学习", "宿舍"]],
  ["效率工具", ["效率", "笔记", "计划", "时间管理", "工具", "日程", "复盘", "待办"]],
  ["音乐", ["音乐", "歌单", "演唱会", "乐队", "旋律", "专辑", "歌词"]],
  ["摄影", ["摄影", "相机", "照片", "构图", "胶片", "修图", "镜头"]],
  ["美食", ["美食", "餐厅", "咖啡", "甜品", "食谱", "料理", "探店"]],
  ["运动", ["运动", "健身", "跑步", "瑜伽", "篮球", "训练", "户外"]],
  ["写作", ["写作", "小说", "日记", "文字", "表达", "灵感", "阅读"]]
];

function analyzeInterestText(text) {
  const normalized = text || "";
  const scored = interestTopics.map(([topic, keywords]) => {
    const score = keywords.reduce((sum, keyword) => {
      const matches = normalized.match(new RegExp(keyword, "gi"));
      return sum + (matches ? matches.length : 0);
    }, 0);
    return { topic, score };
  }).sort((a, b) => b.score - a.score);
  const detected = scored.filter((item) => item.score > 0).map((item) => item.topic);
  return detected.length ? detected.slice(0, 6) : ["心理学", "电影", "旅行", "情绪成长"];
}

function applyInterestAnalysis(account, text) {
  const topics = analyzeInterestText(text);
  account.interestSourceText = text;
  account.behaviorInterests = unique([...topics, ...account.behaviorInterests]).slice(0, 6);
  account.behaviorTags = unique([...account.behaviorTags, "兴趣稳定", topics.includes("心理学") ? "自我探索" : "主题偏好"]).slice(0, 6);
  saveState();
  updateProfileViews();
}

function getRouteFromHash() {
  const route = window.location.hash.replace("#", "");
  return routes.includes(route) ? route : "capture";
}

function setActivePage(route) {
  if (route === "card" || route === "match") {
    ensureAnalysis(currentAccount());
  }
  $$(".route-page").forEach((page) => page.classList.toggle("active", page.dataset.page === route));
  $$(".top-nav a").forEach((link) => link.classList.toggle("active", link.dataset.route === route));
  document.body.dataset.route = route;
  window.scrollTo(0, 0);
}

function navigate(route) {
  if (!routes.includes(route)) return;
  if (window.location.hash !== `#${route}`) window.location.hash = route;
  else setActivePage(route);
}

function renderAccountOptions() {
  const options = state.accounts.map((account) => `<option value="${account.id}">${account.name}</option>`).join("");
  currentAccountSelect.innerHTML = options;
  matchUserA.innerHTML = options;
  matchUserB.innerHTML = options;
  currentAccountSelect.value = currentAccount().id;
  matchUserA.value = currentAccount().id;
  const other = state.accounts.find((account) => account.id !== currentAccount().id) || currentAccount();
  matchUserB.value = other.id;
}

function loadAccountIntoForm() {
  const account = currentAccount();
  $("#selfTraits").value = account.traits;
  $("#selfInterests").value = account.interests;
  $("#selfIntro").value = account.intro;
  renderChatHistory();
  updateProfileViews();
}

function saveFormToCurrentAccount(mergeInterests = false) {
  const account = currentAccount();
  account.traits = $("#selfTraits").value;
  account.interests = $("#selfInterests").value;
  account.intro = $("#selfIntro").value;
  if (mergeInterests) {
    account.behaviorInterests = unique([...account.behaviorInterests, ...listFromText(account.interests)]).slice(0, 6);
  }
  saveState();
}

function renderInterestVisuals(account) {
  const interests = account.behaviorInterests.slice(0, 6);
  const classes = ["w1", "w2", "w3", "w4", "w5", "w6"];
  $("#wordCloud").innerHTML = interests.map((interest, index) => `<span class="${classes[index]}">${interest}</span>`).join("");
  $("#interestMetrics").innerHTML = [
    ["高频主题", interests.slice(0, 3).join("、") || "暂无"],
    ["兴趣稳定度", account.chatHistory.length ? `${clamp(58 + interests.length * 5)}%` : "待采集"],
    ["隐性兴趣推测", account.behaviorTags.slice(0, 3).join("、") || "待分析"]
  ].map(([label, value]) => `<li><span>${label}</span><strong>${value}</strong></li>`).join("");
  $("#interestBars").innerHTML = interests.slice(0, 3).map((interest, index) => {
    const width = [82, 68, 56][index];
    return `<span style="--bar:${width}%">${interest}</span>`;
  }).join("");
}

function renderTestSummary(account) {
  if (!account.mbtiCompleted && !account.bigFiveCompleted) {
    $("#testSummary").innerHTML = "<span>测试结果</span><p>完成 MBTI 与大五人格测试后，这里会显示各维度比例、总结果和简要介绍。</p>";
    return;
  }
  const parts = [];
  if (account.mbtiCompleted && account.mbtiScores) {
    const s = account.mbtiScores;
    parts.push(`MBTI：${account.mbti}。E/I ${s.E}%/${s.I}%，S/N ${s.S}%/${s.N}%，T/F ${s.T}%/${s.F}%，J/P ${s.J}%/${s.P}%。${typeIntro[account.mbti] || ""}`);
  }
  if (account.bigFiveCompleted && account.bigFive) {
    parts.push(`大五：开放性 ${account.bigFive.openness}%，尽责性 ${account.bigFive.conscientiousness}%，外向性 ${account.bigFive.extraversion}%，宜人性 ${account.bigFive.agreeableness}%，神经质 ${account.bigFive.neuroticism}%。`);
  }
  $("#testSummary").innerHTML = `<span>测试结果</span><p>${parts.join("<br>")}</p>`;
}

function barHtml(label, value, sideLabel = "") {
  const safeValue = clamp(value);
  return `
    <div class="metric-bar">
      <div><span>${label}</span><strong>${sideLabel || `${safeValue}%`}</strong></div>
      <i style="--bar:${safeValue}%"></i>
    </div>
  `;
}

function renderResultBars(account) {
  const mbtiBlock = account.mbtiCompleted && account.mbtiScores
    ? `
      <div class="result-group">
        <strong>MBTI 维度比例</strong>
        ${barHtml("外倾 E / 内倾 I", account.mbtiScores.E, `${account.mbtiScores.E}% / ${account.mbtiScores.I}%`)}
        ${barHtml("感觉 S / 直觉 N", account.mbtiScores.S, `${account.mbtiScores.S}% / ${account.mbtiScores.N}%`)}
        ${barHtml("思维 T / 情感 F", account.mbtiScores.T, `${account.mbtiScores.T}% / ${account.mbtiScores.F}%`)}
        ${barHtml("判断 J / 知觉 P", account.mbtiScores.J, `${account.mbtiScores.J}% / ${account.mbtiScores.P}%`)}
      </div>
    `
    : `<div class="result-group"><strong>MBTI 维度比例</strong><span>完成 MBTI 测试后显示。</span></div>`;

  const bigFiveBlock = account.bigFiveCompleted && account.bigFive
    ? `
      <div class="result-group">
        <strong>大五人格比例</strong>
        ${barHtml("开放性 Openness", account.bigFive.openness)}
        ${barHtml("尽责性 Conscientiousness", account.bigFive.conscientiousness)}
        ${barHtml("外向性 Extraversion", account.bigFive.extraversion)}
        ${barHtml("宜人性 Agreeableness", account.bigFive.agreeableness)}
        ${barHtml("神经质 Neuroticism", account.bigFive.neuroticism)}
      </div>
    `
    : `<div class="result-group"><strong>大五人格比例</strong><span>完成大五人格测试后显示。</span></div>`;

  $("#resultBars").innerHTML = mbtiBlock + bigFiveBlock;
}

function updateProfileViews() {
  const account = currentAccount();
  $("#previewMbti").textContent = account.mbtiCompleted ? account.mbti : "未测试";
  $("#previewIntro").textContent = account.intro;
  $("#cardMbti").textContent = account.mbtiCompleted ? account.mbti : "未测试";
  $("#cardIntro").textContent = account.intro;
  $("#cardTraits").textContent = `自我关键词：${account.traits}`;
  $("#cardInterests").textContent = `自认为的兴趣：${account.interests}`;
  $("#mbtiResult").textContent = account.mbtiCompleted ? account.mbti : "未测试";
  $("#bigFiveResult").textContent = account.bigFiveCompleted
    ? `O${account.bigFive.openness} C${account.bigFive.conscientiousness} E${account.bigFive.extraversion} A${account.bigFive.agreeableness} N${account.bigFive.neuroticism}`
    : "未测试";
  $("#aiSummary").textContent = account.aiAnalysis
    ? (account.aiAnalysis.mbti[0] >= 62 ? "你像一个温柔的深度连接者。" : "你像一个稳定的观察型陪伴者。")
    : "完成 Mirror Capture 聊天后生成镜中画像。";
  $("#aiTags").textContent = account.aiAnalysis
    ? `AI 观察标签：${account.behaviorTags.join("、")}。`
    : "AI 观察标签：暂无聊天历史。";
  renderInterestVisuals(account);
  renderTestSummary(account);
  renderResultBars(account);
  drawAllRadars(account);
  renderMatch();
}

function renderQuiz(type) {
  activeQuiz = type;
  quizPanel.hidden = false;
  quizForm.innerHTML = "";
  if (type === "mbti") {
    $("#quizKicker").textContent = "MBTI 中文题库";
    $("#quizTitle").textContent = "MBTI 测试";
    $("#quizIntro").textContent = "请在每题 A 与 B 中选择更符合你自然状态的一项，凭第一反应作答即可。";
    mbtiItems.forEach(([stem, optionA, optionB], index) => {
      quizForm.insertAdjacentHTML("beforeend", `
        <fieldset class="quiz-item mbti-item">
          <legend>${index + 1}. ${stem}</legend>
          <div class="ab-choice">
            <label><input name="q${index}" type="radio" value="A" required><span><strong>A.</strong> ${optionA}</span></label>
            <label><input name="q${index}" type="radio" value="B" required><span><strong>B.</strong> ${optionB}</span></label>
          </div>
        </fieldset>
      `);
    });
  } else {
    $("#quizKicker").textContent = "IPIP 大五人格";
    $("#quizTitle").textContent = "Big-Five Factor Markers";
    $("#quizIntro").textContent = "以下为 IPIP 公开领域 50 题 Big-Five Factor Markers。请按真实感受选择同意程度，结果按 OCEAN 五维计算。";
    bigFiveItems.forEach(([, text], index) => {
      quizForm.insertAdjacentHTML("beforeend", `
        <fieldset class="quiz-item">
          <legend>${index + 1}. ${text}</legend>
          <div class="scale-row">
            ${[1, 2, 3, 4, 5].map((value) => `
              <label><input name="q${index}" type="radio" value="${value}" required>${["很不同意", "较不同意", "不确定", "较同意", "很同意"][value - 1]}</label>
            `).join("")}
          </div>
        </fieldset>
      `);
    });
  }
  quizForm.insertAdjacentHTML("beforeend", `<button class="primary-action" type="submit">提交并生成结果</button>`);
  quizPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function scoreMbti(formData) {
  const raw = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  mbtiItems.forEach(([, , , poleA, poleB], index) => {
    const choice = formData.get(`q${index}`);
    raw[choice === "A" ? poleA : poleB] += 1;
  });
  const scalePair = (a, b) => {
    const total = raw[a] + raw[b] || 1;
    return [clamp((raw[a] / total) * 100), clamp((raw[b] / total) * 100)];
  };
  const [E, I] = scalePair("E", "I");
  const [S, N] = scalePair("S", "N");
  const [T, F] = scalePair("T", "F");
  const [J, P] = scalePair("J", "P");
  const scores = { E, I, S, N, T, F, J, P, raw };
  const mbti = `${E > I ? "E" : "I"}${S > N ? "S" : "N"}${T > F ? "T" : "F"}${J > P ? "J" : "P"}`;
  return { mbti, scores };
}

function scoreBigFive(formData) {
  const buckets = {
    openness: [],
    conscientiousness: [],
    extraversion: [],
    agreeableness: [],
    neuroticism: []
  };
  bigFiveItems.forEach(([trait, , reverse], index) => {
    const raw = Number(formData.get(`q${index}`));
    const value = reverse ? 6 - raw : raw;
    buckets[trait].push(value);
  });
  return Object.fromEntries(Object.entries(buckets).map(([trait, values]) => {
    const average = values.reduce((sum, value) => sum + value, 0) / values.length;
    return [trait, clamp((average - 1) * 25)];
  }));
}

function analyzeChat(account) {
  const text = account.chatHistory.join(" ");
  if (!text.trim()) {
    account.aiAnalysis = null;
    account.chatStyle = "待分析";
    account.chatAnalyzedCount = 0;
    return;
  }
  const lengthFactor = Math.min(text.length / 180, 1);
  const count = (words) => words.reduce((sum, word) => sum + (text.includes(word) ? 1 : 0), 0);
  const social = count(["朋友", "社交", "聊天", "分享", "表达", "一起", "别人"]);
  const feeling = count(["感觉", "情绪", "理解", "关系", "安全", "喜欢", "压力", "难过"]);
  const idea = count(["未来", "可能", "想象", "意义", "探索", "为什么", "心理"]);
  const structure = count(["计划", "安排", "目标", "效率", "步骤", "完成", "规则"]);
  const mbti = [
    clamp(42 + social * 9 + lengthFactor * 22),
    clamp(46 + idea * 10 + lengthFactor * 18),
    clamp(48 + feeling * 9 + lengthFactor * 14),
    clamp(62 - structure * 7 + idea * 5)
  ];
  const bigFive = [
    clamp(48 + idea * 9 + lengthFactor * 18),
    clamp(44 + structure * 10),
    mbti[0],
    clamp(50 + feeling * 8),
    clamp(38 + count(["压力", "焦虑", "担心", "敏感", "难过"]) * 10 + feeling * 3)
  ];
  account.aiAnalysis = { mbti, bigFive, type: `${mbti[0] >= 55 ? "E" : "I"}${mbti[1] >= 55 ? "N" : "S"}${mbti[2] >= 55 ? "F" : "T"}${mbti[3] >= 55 ? "P" : "J"}-ish` };
  account.behaviorTags = unique([
    mbti[0] >= 62 ? "表达欲" : "观察倾向",
    mbti[1] >= 62 ? "开放探索" : "现实关注",
    mbti[2] >= 62 ? "共情" : "理性判断",
    mbti[3] >= 58 ? "弹性调整" : "结构推进",
    feeling >= 2 ? "关系敏感" : ""
  ]);
  account.chatStyle = mbti[0] >= 62 ? "深度表达型" : "稳定倾听型";
  account.chatAnalyzedCount = account.chatHistory.length;
}

function ensureAnalysis(account) {
  if (account.chatHistory.length && account.chatAnalyzedCount !== account.chatHistory.length) {
    analyzeChat(account);
    saveState();
  }
}

const mbtiDimensionMeta = [
  { label: "能量方向", aiLabel: "外倾表达", selfA: "外倾 E", selfB: "内倾 I", aiIndex: 0, selfKey: "E", oppositeKey: "I" },
  { label: "信息获取", aiLabel: "直觉联想", selfA: "感觉 S", selfB: "直觉 N", aiIndex: 1, selfKey: "N", oppositeKey: "S" },
  { label: "判断方式", aiLabel: "情感回应", selfA: "思维 T", selfB: "情感 F", aiIndex: 2, selfKey: "F", oppositeKey: "T" },
  { label: "生活节奏", aiLabel: "知觉弹性", selfA: "判断 J", selfB: "知觉 P", aiIndex: 3, selfKey: "P", oppositeKey: "J" }
];

const bigFiveMeta = [
  ["openness", "开放性"],
  ["conscientiousness", "尽责性"],
  ["extraversion", "外向性"],
  ["agreeableness", "宜人性"],
  ["neuroticism", "神经质"]
];

function describeGap(label, aiValue, selfValue) {
  const diff = aiValue - selfValue;
  const abs = Math.abs(diff);
  if (abs < 18) return `${label}差异较小，镜中表现与心中认知比较接近。`;
  const direction = diff > 0 ? "聊天与行为线索更高" : "自我测试结果更高";
  const hint = diff > 0
    ? "这通常说明你在自然表达里会把这一面展示得更明显，可能是熟悉、安全或有兴趣的话题让它被激活。"
    : "这通常说明你对这一面有较强的自我认同，但它未必总会在短时聊天里完全显现，可能需要更明确的场景或更长样本。";
  return `${label}差异 ${abs} 分，${direction}。${hint}`;
}

function generateGapAnalysisText(account) {
  if (!account.aiAnalysis || !account.mbtiCompleted) {
    return "小Me 需要同时获得 Mirror Capture 的聊天历史和 Self Mirror 的测试结果，才能比较“镜中之我”与“心中之我”。";
  }
  const aiType = account.aiAnalysis.type;
  const selfTraits = listFromText(account.traits).slice(0, 2).join("、") || "自我关键词";
  const selfInterests = listFromText(account.interests);
  const common = selfInterests.filter((item) => account.behaviorInterests.includes(item));
  const mbtiGaps = mbtiDimensionMeta.map((item) => {
    const aiValue = account.aiAnalysis.mbti[item.aiIndex];
    const selfValue = account.mbtiScores?.[item.selfKey] ?? 50;
    return { ...item, aiValue, selfValue, diff: Math.abs(aiValue - selfValue) };
  }).sort((a, b) => b.diff - a.diff);
  const topMbti = mbtiGaps[0];
  const mbtiLine = aiType[0] === account.mbti[0]
    ? `MBTI 总体上，你的心中类型 ${account.mbti} 与镜中推测 ${aiType} 的能量方向比较接近，说明你对自己的基本社交节奏有一定稳定认知。`
    : `MBTI 总体上，你的心中类型 ${account.mbti} 与镜中推测 ${aiType} 有可见差异。差异最大的部分是${topMbti.label}：镜中“${topMbti.aiLabel}”约 ${topMbti.aiValue}%，而心中“${topMbti.selfKey}”约 ${topMbti.selfValue}%。这不一定表示矛盾，更像是你在自我评价和自然对话场景中调用了不同侧面。`;
  const bigFiveLine = account.bigFiveCompleted && account.bigFive
    ? bigFiveMeta.map(([key, label], index) => ({
        label,
        aiValue: account.aiAnalysis.bigFive[index],
        selfValue: account.bigFive[key],
        diff: Math.abs(account.aiAnalysis.bigFive[index] - account.bigFive[key])
      })).sort((a, b) => b.diff - a.diff).slice(0, 2)
        .map((item) => describeGap(item.label, item.aiValue, item.selfValue)).join("")
    : "大五人格还没有完成心中之我测试，因此小Me 暂时只参考聊天线索，不对大五差距下结论。";
  const traitLine = `关键词上，你写下的“${selfTraits}”与小Me观察到的“${account.behaviorTags.slice(0, 2).join("、") || "暂无观察标签"}”可以同时成立。前者更像你对自己的稳定叙述，后者更像你在聊天和兴趣行为里自然露出的状态。`;
  const interestLine = common.length
    ? `兴趣上，${common.join("、")} 同时出现在自填兴趣和行为兴趣中，是较稳定的身份线索。你可以把这些主题当作“无需刻意证明、已经自然出现”的兴趣核心。`
    : "兴趣上，自填兴趣和行为兴趣暂时重合较少。比较可能的解释是：你心中认同的兴趣偏长期价值，而浏览记录更受阶段任务、情绪需求或平台推荐影响。";
  return `${mbtiLine}<br><br>${bigFiveLine}<br><br>${traitLine}<br><br>${interestLine}`;
}

function renderResumeFront(account, label) {
  const interests = listFromText(account.interests).slice(0, 4);
  const tags = account.behaviorTags.slice(0, 4);
  return `
    <span class="resume-side">镜中之我</span>
    <h2>${label}：${account.name}</h2>
    <p class="profile-line">${account.chatStyle} · ${account.aiAnalysis?.type || "待分析"} · 行为兴趣 ${account.behaviorInterests.slice(0, 3).join("、") || "暂无"}</p>
    <span>聊天分析：${account.aiAnalysis ? `外倾表达 ${account.aiAnalysis.mbti[0]}%，直觉联想 ${account.aiAnalysis.mbti[1]}%，情感回应 ${account.aiAnalysis.mbti[2]}%` : "进入 Mirror Card 或 Match 后，会根据聊天历史生成镜中画像。"}</span>
    <div class="tag-row">${tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
  `;
}

function renderResumeBack(account, label) {
  const interests = listFromText(account.interests).slice(0, 4);
  const bigFiveText = account.bigFiveCompleted && account.bigFive
    ? `开放 ${account.bigFive.openness}% · 尽责 ${account.bigFive.conscientiousness}% · 外向 ${account.bigFive.extraversion}% · 宜人 ${account.bigFive.agreeableness}% · 神经质 ${account.bigFive.neuroticism}%`
    : "未完成大五人格测试";
  return `
    <span class="resume-side">心中之我</span>
    <h2>${label}：${account.name}</h2>
    <p class="profile-line">${account.mbtiCompleted ? account.mbti : "未测 MBTI"} · ${interests.join("、") || "未填写兴趣"}</p>
    <span>自我介绍：${account.intro || "未填写"}</span>
    <span>大五人格：${bigFiveText}</span>
    <div class="tag-row">${listFromText(account.traits).slice(0, 4).map((tag) => `<span>${tag}</span>`).join("")}</div>
  `;
}

function calculateMatch(a, b) {
  const interestsA = unique([...listFromText(a.interests), ...a.behaviorInterests]);
  const interestsB = unique([...listFromText(b.interests), ...b.behaviorInterests]);
  const common = interestsA.filter((item) => interestsB.includes(item));
  const union = unique([...interestsA, ...interestsB]);
  const interestScore = clamp(45 + common.length * 13 + (common.length / Math.max(union.length, 1)) * 35);
  const aExpress = a.aiAnalysis?.mbti?.[0] ?? 50;
  const bExpress = b.aiAnalysis?.mbti?.[0] ?? 50;
  const aOpen = a.bigFive?.openness ?? a.aiAnalysis?.bigFive?.[0] ?? 50;
  const bOpen = b.bigFive?.openness ?? b.aiAnalysis?.bigFive?.[0] ?? 50;
  const aAgree = a.bigFive?.agreeableness ?? a.aiAnalysis?.bigFive?.[3] ?? 50;
  const bAgree = b.bigFive?.agreeableness ?? b.aiAnalysis?.bigFive?.[3] ?? 50;
  const expressionGap = Math.abs(aExpress - bExpress);
  const opennessGap = Math.abs(aOpen - bOpen);
  const complementScore = clamp(66 + Math.min(expressionGap, 38) * .45 + Math.min(Math.abs(aAgree - bAgree), 28) * .22);
  const chatScore = clamp(64 + common.length * 5 + Math.min(aAgree, bAgree) * .18 - opennessGap * .16);
  const expressive = aExpress >= bExpress ? a : b;
  const listener = expressive.id === a.id ? b : a;
  const reasoning = [
    common.length
      ? `你们的共同兴趣集中在 ${common.slice(0, 4).join("、")}，适合从具体作品、经历或最近收藏切入，而不是一开始就讨论抽象标签。`
      : "当前共同兴趣不算明显，建议先交换最近真实关注的内容，让系统获得更多样本后再重新匹配。",
    expressionGap >= 22
      ? `${expressive.name} 的镜中画像更偏表达，${listener.name} 相对更偏接收和整理信息。这个组合适合一人抛出故事与感受，另一人做回应、追问和总结。`
      : `你们在表达节奏上的差异不大，更适合平等来回式聊天：轮流分享近况、轮流提出问题，关系会更自然。`,
    opennessGap >= 22
      ? `开放性差异较明显：开放性更高的一方可以带来新话题和新体验，另一方可以帮助把想法落到具体安排。注意不要把“谨慎”误读成没兴趣，也不要把“发散”误读成不认真。`
      : "开放性接近，说明你们对新鲜话题的接受度比较同步，可以直接聊电影、心理学、旅行计划或校园生活里的新发现。"
  ].join("");
  return {
    common: common.length ? common : ["暂无明显重合"],
    interestScore,
    complementScore,
    chatScore,
    reasoning,
    breakers: unique([...common, "最近看过的一部电影", "理想中的旅行方式", "对 MBTI 的看法", "最近一次情绪波动"]).slice(0, 5)
  };
}

function renderMatch() {
  if (!matchUserA.value || !matchUserB.value) return;
  const a = accountById(matchUserA.value);
  const b = accountById(matchUserB.value);
  ensureAnalysis(a);
  ensureAnalysis(b);
  const result = calculateMatch(a, b);
  $("#resumeAFront").innerHTML = renderResumeFront(a, "账户 A");
  $("#resumeABack").innerHTML = renderResumeBack(a, "账户 A");
  $("#resumeBFront").innerHTML = renderResumeFront(b, "账户 B");
  $("#resumeBBack").innerHTML = renderResumeBack(b, "账户 B");
  $("#interestScore").textContent = `${result.interestScore}%`;
  $("#complementScore").textContent = `${result.complementScore}%`;
  $("#chatScore").textContent = `${result.chatScore}%`;
  $("#commonInterests").textContent = result.common.join("、");
  $("#complementText").textContent = (a.aiAnalysis?.mbti?.[0] ?? 50) >= (b.aiAnalysis?.mbti?.[0] ?? 50)
    ? `${a.name} 的镜中名片更偏表达，${b.name} 的镜中名片更偏倾听；再结合两人的心中名片，可以把聊天设计成“一个人讲近况，一个人追问细节”的节奏。`
    : `${b.name} 的镜中名片更偏表达，${a.name} 的镜中名片更偏倾听；再结合两人的心中名片，适合从共同兴趣慢慢展开到价值观和关系感受。`;
  $("#matchReasoning").textContent = result.reasoning;
  $("#iceBreakers").textContent = result.breakers.join("、");
}

function drawRadar(canvasId, labels, values, color, title) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2 + 2;
  const radius = Math.min(width, height) * 0.25;
  const points = labels.length;
  ctx.clearRect(0, 0, width, height);

  for (let level = 1; level <= 5; level += 1) {
    ctx.beginPath();
    for (let i = 0; i < points; i += 1) {
      const angle = Math.PI * 2 * i / points - Math.PI / 2;
      const r = radius * level / 5;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = level === 5 ? "rgba(102, 112, 133, .34)" : "rgba(102, 112, 133, .2)";
    ctx.stroke();
  }

  labels.forEach((label, index) => {
    const angle = Math.PI * 2 * index / points - Math.PI / 2;
    const axisX = centerX + Math.cos(angle) * radius;
    const axisY = centerY + Math.sin(angle) * radius;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(axisX, axisY);
    ctx.strokeStyle = "rgba(102, 112, 133, .18)";
    ctx.stroke();
    for (let tick = 1; tick <= 5; tick += 1) {
      const r = radius * tick / 5;
      const tx = centerX + Math.cos(angle) * r;
      const ty = centerY + Math.sin(angle) * r;
      ctx.beginPath();
      ctx.arc(tx, ty, tick === 5 ? 1.7 : 1.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(102, 112, 133, .28)";
      ctx.fill();
    }
    const x = centerX + Math.cos(angle) * (radius + 36);
    const y = centerY + Math.sin(angle) * (radius + 26);
    ctx.fillStyle = "#344054";
    ctx.font = "10px Microsoft YaHei, Arial";
    ctx.textAlign = "center";
    const valueText = values ? ` ${clamp(values[index])}%` : "";
    ctx.fillText(`${label}${valueText}`, x, y);
  });

  if (!values) {
    return;
  }

  ctx.beginPath();
  values.forEach((value, index) => {
    const angle = Math.PI * 2 * index / points - Math.PI / 2;
    const r = radius * value / 100;
    const x = centerX + Math.cos(angle) * r;
    const y = centerY + Math.sin(angle) * r;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = color.replace("1)", ".22)");
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();

  values.forEach((value, index) => {
    const angle = Math.PI * 2 * index / points - Math.PI / 2;
    const r = radius * value / 100;
    const x = centerX + Math.cos(angle) * r;
    const y = centerY + Math.sin(angle) * r;
    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, .9)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });
}

function drawAllRadars(account) {
  drawRadar("aiMbtiRadar", ["外倾E", "直觉N", "情感F", "知觉P"], account.aiAnalysis?.mbti || null, "rgba(15, 143, 131, 1)", "镜中 MBTI");
  drawRadar("aiBigFiveRadar", ["开放O", "尽责C", "外向E", "宜人A", "神经质N"], account.aiAnalysis?.bigFive || null, "rgba(239, 111, 97, 1)", "镜中 大五");
  const selfMbtiValues = account.mbtiCompleted && account.mbtiScores
    ? [account.mbtiScores.I, account.mbtiScores.N, account.mbtiScores.F, account.mbtiScores.P]
    : null;
  const selfBigFiveValues = account.bigFiveCompleted && account.bigFive
    ? [account.bigFive.openness, account.bigFive.conscientiousness, account.bigFive.extraversion, account.bigFive.agreeableness, account.bigFive.neuroticism]
    : null;
  drawRadar("selfMbtiRadar", ["内倾I", "直觉N", "情感F", "知觉P"], selfMbtiValues, "rgba(57, 117, 168, 1)", "心中 MBTI");
  drawRadar("selfBigFiveRadar", ["开放O", "尽责C", "外向E", "宜人A", "神经质N"], selfBigFiveValues, "rgba(240, 188, 69, 1)", "心中 大五");
}

function appendMessage(text, type) {
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function defaultChatMessages() {
  return [
    { type: "ai", text: "你好，我是小Me。今天想从生活、学习、兴趣、人际关系，还是未来计划聊起？" },
    { type: "user", text: "我最近在学心理学，也很想知道自己在别人眼里是什么样。" },
    { type: "ai", text: "这听起来很有意思。心理学有时候像一面小镜子，会让人突然想看看自己在关系里是什么样。你最近是被哪件事触发了这种好奇？" }
  ];
}

function renderChatHistory() {
  const account = currentAccount();
  if (!account.chatMessages) {
    account.chatMessages = account.chatHistory.length
      ? account.chatHistory.flatMap((text) => [{ type: "user", text }])
      : defaultChatMessages();
  }
  chatWindow.innerHTML = "";
  account.chatMessages.forEach((message) => appendMessage(message.text, message.type));
}

function saveChatMessage(type, text) {
  const account = currentAccount();
  if (!account.chatMessages) account.chatMessages = defaultChatMessages();
  account.chatMessages.push({ type, text });
  if (type === "user") account.chatHistory.push(text);
  saveState();
}

function naturalReply(text) {
  const matched = aiReplyBank.find((group) => group.keywords.some((keyword) => text.includes(keyword)));
  const replies = matched ? matched.replies : fallbackReplies;
  return replies[Math.floor(Math.random() * replies.length)];
}

window.addEventListener("hashchange", () => setActivePage(getRouteFromHash()));
$$(".top-nav a").forEach((link) => link.addEventListener("click", (event) => {
  event.preventDefault();
  navigate(link.dataset.route);
}));
$(".brand").addEventListener("click", (event) => {
  event.preventDefault();
  navigate("capture");
});

accountForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = $("#accountName").value.trim();
  if (!name) return;
  const newAccount = createAccountData(name);
  state.accounts.push(newAccount);
  state.currentId = newAccount.id;
  $("#accountName").value = "";
  saveState();
  renderAccountOptions();
  loadAccountIntoForm();
});

currentAccountSelect.addEventListener("change", () => {
  state.currentId = currentAccountSelect.value;
  saveState();
  renderAccountOptions();
  loadAccountIntoForm();
});

[matchUserA, matchUserB].forEach((select) => select.addEventListener("change", renderMatch));
runMatch.addEventListener("click", renderMatch);

getMbti.addEventListener("click", () => renderQuiz("mbti"));
getBigFive.addEventListener("click", () => renderQuiz("bigFive"));
closeQuiz.addEventListener("click", () => {
  quizPanel.hidden = true;
});

quizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(quizForm);
  const account = currentAccount();
  if (activeQuiz === "mbti") {
    const result = scoreMbti(formData);
    account.mbti = result.mbti;
    account.mbtiScores = result.scores;
    account.mbtiCompleted = true;
  } else {
    account.bigFive = scoreBigFive(formData);
    account.bigFiveCompleted = true;
  }
  saveState();
  updateProfileViews();
  quizPanel.hidden = true;
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = chatText.value.trim();
  if (!text) return;
  appendMessage(text, "user");
  saveChatMessage("user", text);
  chatText.value = "";
  const reply = naturalReply(text);
  setTimeout(() => {
    appendMessage(reply, "ai");
    saveChatMessage("ai", reply);
  }, 260);
  saveState();
  updateProfileViews();
});

voiceButton.addEventListener("click", () => {
  voiceButton.classList.toggle("active");
  appendMessage(voiceButton.classList.contains("active") ? "语音模式已开启。这里可以理解为未来接入语音输入的入口。" : "已切回文字聊天模式。", "ai");
});

selfForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveFormToCurrentAccount(true);
  updateProfileViews();
  mirrorCard.classList.add("flipped");
  navigate("card");
});

["#selfTraits", "#selfInterests", "#selfIntro"].forEach((selector) => {
  $(selector).addEventListener("input", () => {
    saveFormToCurrentAccount(false);
    updateProfileViews();
  });
});

mirrorCard.addEventListener("click", () => mirrorCard.classList.toggle("flipped"));
mirrorCard.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    mirrorCard.classList.toggle("flipped");
  }
});
flipButton.addEventListener("click", () => mirrorCard.classList.toggle("flipped"));

["#matchCardA", "#matchCardB"].forEach((selector) => {
  const card = $(selector);
  card.addEventListener("click", () => card.classList.toggle("flipped"));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      card.classList.toggle("flipped");
    }
  });
});

interestFile.addEventListener("change", () => {
  const file = interestFile.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const text = String(reader.result || "");
    const account = currentAccount();
    account.interestSourceText = text;
    $("#interestFileStatus").textContent = `已读取：${file.name}`;
    saveState();
  };
  reader.onerror = () => {
    $("#interestFileStatus").textContent = "读取失败，请换 txt、csv、json 或 md 文件";
  };
  reader.readAsText(file, "utf-8");
});

simulateImport.addEventListener("click", () => {
  const account = currentAccount();
  const sampleText = "心理学 情绪成长 电影 旅行 校园生活 效率工具 关系 自我 成长";
  applyInterestAnalysis(account, account.interestSourceText || sampleText);
  $("#interestFileStatus").textContent = account.interestSourceText ? "已基于上传文档生成分析" : "已基于示例文本生成分析";
});

generateGap.addEventListener("click", () => {
  saveFormToCurrentAccount(false);
  const text = generateGapAnalysisText(currentAccount());
  $("#aiGapResult").innerHTML = `<span>小Me 分析完成</span><p>${text}</p>`;
});

downloadCard.addEventListener("click", () => {
  const account = currentAccount();
  const text = [
    `Mirror ME 人格卡片摘要：${account.name}`,
    "",
    $("#aiSummary").textContent,
    $("#aiTags").textContent,
    "",
    `心中类型：${account.mbtiCompleted ? account.mbti : "未测试"}`,
    account.intro,
    `自我关键词：${account.traits}`,
    `自认为的兴趣：${account.interests}`,
    "",
    $("#aiGapResult").textContent.trim(),
    "",
    "说明：本分析不是医学诊断，而是非诊断性的自我探索参考。"
  ].join("\n");
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Mirror-ME-${account.name}-personality-card.txt`;
  link.click();
  URL.revokeObjectURL(url);
});

renderAccountOptions();
loadAccountIntoForm();
setActivePage(getRouteFromHash());
