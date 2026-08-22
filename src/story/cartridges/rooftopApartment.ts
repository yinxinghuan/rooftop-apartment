import type { PresetEventDefinition, StoryCartridge, StoryDangerDirector, StoryDirector, StoryImageDirector } from '../types'

const coverImage = new URL('../img/worlds/rooftop-apartment.webp', import.meta.url).href
const entryImage = new URL('../img/worlds/rooftop-apartment-entry.webp', import.meta.url).href
const audioThemeUrl = new URL('../audio/assets/theme.mp3', import.meta.url).href
const audioAmbienceUrl = new URL('../audio/assets/ambience.mp3', import.meta.url).href

function storyDirector(locale: 'zh' | 'en'): StoryDirector {
  const zh = locale === 'zh'
  return {
    mode: 'guided',
    fixedWorldRules: zh ? [
      '这是现实可理解的合租生活故事。租金、公共秩序、邻里声誉、证据、钥匙和承诺都必须产生连续后果。',
      '乔、林澄和莫河是持续存在的住户；遇见房东、邻居或新住户不能让原有人物消失。',
      '人物只知道亲历、被告知或从账本与证据推断的事情；不能用模型全知替代人物沟通。',
    ] : [
      'This is grounded shared-apartment life. Rent, shared order, neighborhood reputation, evidence, keys and promises have continuous consequences.',
      'Jo, Lin Cheng and Mo He remain persistent residents. Meeting the landlord, neighbors or newcomers never erases them.',
      'People know only what they experienced, were told, or inferred from records and evidence; model omniscience never replaces communication.',
    ],
    generationRules: zh ? [
      '每轮推进当前生活矛盾或改变一个具体关系、证据、公共物品、时间、地点或公共数值，不能连续只写闲聊。',
      '危机以协商、分工、修复、证据和承担责任为主要方法，不把物理战斗当作常规玩法。',
      '失败产生催缴、故障、投诉、关系破裂、公共空间损失或住户离开风险，不删档。',
    ] : [
      'Every turn advances the current life conflict or changes a relationship, evidence, shared item, time, place or public stat; do not write consecutive idle chat.',
      'Crises center negotiation, coordination, repair, evidence and responsibility. Physical combat is not routine play.',
      'Failure causes collection pressure, breakdowns, complaints, relationship rupture, lost common space or a risk of departure, never save deletion.',
    ],
    choiceIntents: zh ? ['倾听、协商或查证', '分工、修复或使用公共物品', '承担责任、设立边界或拒绝'] : ['listen, negotiate, or verify', 'coordinate, repair, or use a shared item', 'take responsibility, set a boundary, or refuse'],
    maxActiveThreads: 3,
  }
}

function dangerDirector(locale: 'zh' | 'en'): StoryDangerDirector {
  const zh = locale === 'zh'
  return {
    minSafeTurns: 3, maxSafeTurns: 5, cooldownTurns: 1,
    escalationStats: ['rent', 'order', 'reputation'],
    threatPalette: zh
      ? ['房东的催缴或突访正在逼近', '公共区域突然断水或断电', '一处共用设施发生故障', '邻居准备正式投诉', '住户之间的重要承诺即将破裂', '关键生活证据正在失效']
      : ['a landlord collection demand or surprise visit is imminent', 'water or power has failed in a shared area', 'a shared facility has broken down', 'a neighbor is preparing a formal complaint', 'an important promise between residents is breaking', 'key household evidence is becoming unusable'],
    methods: zh ? ['倾听、协商或查明事实', '分工、修复或寻找替代方案', '使用证据、公共物品或明确边界'] : ['listen, negotiate, or establish facts', 'coordinate, repair, or find an alternative', 'use evidence, a shared item, or set a boundary'],
    physicalCombat: 'none',
    resolution: {
      skill: zh ? '共同生活应对' : 'Shared Living', modifier: 2, dcBySeverity: [8, 10, 12, 14, 16],
      fallbackCosts: [{ statId: 'order', operation: 'remove', amount: 8 }],
    },
  }
}

function presetEvents(locale: 'zh' | 'en'): PresetEventDefinition[] {
  if (locale === 'zh') return [
    { id: 'kitchen-fridge', locationId: 'kitchen', category: 'daily-life', choiceLabel: '查看冰箱为什么不断跳闸', text: '老冰箱的压缩机刚启动，厨房顶灯便暗了一下。乔从插座旁捡起一枚发热的旧转接头，林澄已经把药盒移到了保温袋里。', objective: '确认跳闸来自冰箱、转接头还是厨房线路', choices: ['拔下转接头检查烧焦位置', '请林澄记录每次灯光变暗的时间', '去电表箱核对厨房回路'], imagePrompt: 'FIRST-PERSON PLAYER-EYE VIEW inside a lived-in shared kitchen, a resident holding a warm old plug adapter beside a humming refrigerator while another protects a medicine bag, protagonist entirely out of frame, no text', imageSubject: 'others' },
    { id: 'kitchen-receipt', locationId: 'kitchen', category: 'evidence', choiceLabel: '核对门缝下塞进来的维修收据', text: '门缝下多了一张没有信封的维修收据，日期正好落在补缴单声称“无人报修”的那一周。纸角沾着楼下杂货店常用的蓝色印泥。', objective: '确认收据的来源和原件是否还能找到', choices: ['把收据和公共账本的日期并排核对', '去楼下问杂货店谁借过蓝色印泥', '拍下收据细节后暂时封存'], imagePrompt: 'observer close detail of an unmarked repair receipt under an apartment door beside a handmade communal ledger, warm domestic light, no readable text, no protagonist', imageSubject: 'environment' },
    { id: 'roof-pipe', locationId: 'roof', category: 'local-work', choiceLabel: '检查旧管道新出现的潮湿接缝', text: '屋顶旧管道的接头下出现一道新水线，顺着花盆背面流向墙角。莫河拿着粉笔标出水线终点，却发现它没有经过房东指控的改造区域。', objective: '记录漏水路径并判断它是否能证明责任来源', choices: ['沿水线检查每个管道接头', '请莫河把水线画进维修时间线', '用干布分段包住接头定位渗漏点'], imagePrompt: 'FIRST-PERSON PLAYER-EYE VIEW across a rooftop garden toward a wet pipe joint and chalk marks traced by a resident, protagonist body absent, no text', imageSubject: 'others' },
    { id: 'roof-laundry', locationId: 'roof', category: 'neighbor', choiceLabel: '询问晾衣线另一端是谁留下的便条', text: '晾衣线另一端夹着一张折过两次的空白纸，里面包着一枚楼下住户才用的红色衣夹。林澄说，那户人家上周亲眼看见物业工人检查过水表。', objective: '找到留下衣夹的邻居并确认他们愿不愿作证', choices: ['带着红衣夹去敲楼下邻居的门', '先请林澄说明她与那户人的关系', '把衣夹和发现时间记进公共账本'], imagePrompt: 'observer medium-wide rooftop apartment scene with a red clothespin and folded blank note on a laundry line, one resident pointing toward the stairwell, warm city dusk, no readable text', imageSubject: 'others' },
    { id: 'street-plumber', locationId: 'street', category: 'visitor', choiceLabel: '问修水管师傅是否记得这栋楼', text: '街角修水管师傅认出备用钥匙上的褪色塑料牌。他说两个月前来过这栋楼，却被物业要求把工单登记到另一个门牌。', objective: '查清错登门牌的工单是否与屋顶漏水有关', choices: ['请师傅描述当时修过的具体位置', '带他到楼门口确认门牌', '询问他是否保留工单副本'], imagePrompt: 'FIRST-PERSON PLAYER-EYE VIEW at an old neighborhood plumbing stall, a plumber pointing to a faded key tag while recalling a building visit, protagonist out of frame, no readable text', imageSubject: 'others' },
    { id: 'street-noticeboard', locationId: 'street', category: 'community', choiceLabel: '查看公告栏上被覆盖的停水通知', text: '街区公告栏最下层露出半张旧停水通知，日期与第一次漏水一致。新广告只盖住了楼号，没有盖住物业的圆形印章。', objective: '找到完整停水通知并确认受影响楼栋', choices: ['小心揭起上层广告查看楼号', '请附近店主回忆那次停水范围', '先拍下印章和日期作为线索'], imagePrompt: 'observer environmental detail of a layered neighborhood noticeboard with a partly covered utility notice and round stamp shapes, no readable text, no people', imageSubject: 'environment' },
  ]
  return [
    { id: 'kitchen-fridge', locationId: 'kitchen', category: 'daily-life', choiceLabel: 'Find why the refrigerator keeps tripping the circuit', text: 'The kitchen light dims when the old refrigerator starts. Jo picks up a warm plug adapter while Lin moves her medicine box into an insulated bag.', objective: 'Determine whether the fault is in the refrigerator, adapter, or kitchen circuit', choices: ['Unplug the adapter and inspect the scorched point', 'Ask Lin to record each light dip', 'Check the kitchen circuit at the meter box'], imagePrompt: 'FIRST-PERSON PLAYER-EYE VIEW inside a lived-in shared kitchen, a resident holding a warm old plug adapter beside a humming refrigerator while another protects a medicine bag, protagonist entirely out of frame, no text', imageSubject: 'others' },
    { id: 'kitchen-receipt', locationId: 'kitchen', category: 'evidence', choiceLabel: 'Check the repair receipt pushed under the door', text: 'An unmarked repair receipt lies under the door, dated in the week the surcharge says nobody reported a problem. One corner carries the blue ink used by the shop downstairs.', objective: 'Trace the receipt and learn whether the original still exists', choices: ['Compare its date with the shared ledger', 'Ask the shop who borrowed its blue stamp pad', 'Photograph the details and seal the receipt for now'], imagePrompt: 'observer close detail of an unmarked repair receipt under an apartment door beside a handmade communal ledger, warm domestic light, no readable text, no protagonist', imageSubject: 'environment' },
    { id: 'roof-pipe', locationId: 'roof', category: 'local-work', choiceLabel: 'Inspect the new wet seam on the old rooftop pipe', text: 'A fresh water line runs from an old pipe joint behind the planters. Mo marks its end with chalk and finds it never crosses the area blamed in the surcharge.', objective: 'Record the leak path and test whether it identifies the source of responsibility', choices: ['Inspect every joint along the water line', 'Have Mo add the path to the repair timeline', 'Wrap the joints in dry cloth to isolate the leak'], imagePrompt: 'FIRST-PERSON PLAYER-EYE VIEW across a rooftop garden toward a wet pipe joint and chalk marks traced by a resident, protagonist body absent, no text', imageSubject: 'others' },
    { id: 'roof-laundry', locationId: 'roof', category: 'neighbor', choiceLabel: 'Ask who left the folded note on the laundry line', text: 'A folded blank paper hangs from the far end of the line around a red clothespin used by the downstairs household. Lin says they saw building staff inspect the meter last week.', objective: 'Find the neighbor and learn whether they will give a statement', choices: ['Take the red clothespin to the downstairs door', 'Ask Lin how well she knows that household', 'Record the clothespin and discovery time in the ledger'], imagePrompt: 'observer medium-wide rooftop apartment scene with a red clothespin and folded blank note on a laundry line, one resident pointing toward the stairwell, warm city dusk, no readable text', imageSubject: 'others' },
    { id: 'street-plumber', locationId: 'street', category: 'visitor', choiceLabel: 'Ask the plumber whether he remembers this building', text: 'The plumber at the corner recognizes the faded tag on the spare key. He visited two months ago, but building management made him file the job under another street number.', objective: 'Learn whether the misfiled repair involved the rooftop leak', choices: ['Ask which fixture he repaired', 'Bring him to the entrance to confirm the number', 'Ask whether he kept a copy of the work order'], imagePrompt: 'FIRST-PERSON PLAYER-EYE VIEW at an old neighborhood plumbing stall, a plumber pointing to a faded key tag while recalling a building visit, protagonist out of frame, no readable text', imageSubject: 'others' },
    { id: 'street-noticeboard', locationId: 'street', category: 'community', choiceLabel: 'Inspect the water-shutoff notice hidden on the board', text: 'Half an old shutoff notice shows beneath newer advertisements, dated on the first day of the leak. Only the building number is covered; the management stamp remains visible.', objective: 'Recover the notice and confirm which buildings lost water', choices: ['Lift the newer advertisement to reveal the number', 'Ask a nearby shopkeeper which blocks lost water', 'Photograph the stamp and date before touching it'], imagePrompt: 'observer environmental detail of a layered neighborhood noticeboard with a partly covered utility notice and round stamp shapes, no readable text, no people', imageSubject: 'environment' },
  ]
}

const shared = {
  schemaVersion: 1 as const,
  id: 'rooftop-apartment',
  coverImage,
  entryImage,
  theme: { outer: '#111112', surface: '#171718', paper: '#e5ddcf', ink: '#2b2925', muted: '#817b72', accent: '#63826b', danger: '#a85f4d', gold: '#d4a860', material: 'apartment' as const },
  itemImageDirection: 'intimate editorial domestic still life, lived-in rooftop apartment, warm brick, plant green and faded cream, soft window light, tactile everyday realism',
  sceneImageDirection: 'intimate editorial slice-of-life illustration in a lived-in rooftop apartment, muted brick, plant green and faded cream, tactile everyday realism, soft window and city light, restrained natural gestures',
  sceneImageAvoid: 'the communal kitchen table, four mismatched mugs, the rent notice still life, or the original dusk window arrangement',
  imageDirector: {
    maxQuietTurns: 4,
    softCooldownTurns: 2,
    guaranteedTriggers: ['new-location', 'rare-item', 'party-change', 'chapter-checkpoint', 'character-expression'],
    softTriggers: ['relationship-change', 'objective-change', 'skill-outcome'],
    perspective: { ordinary: 'balanced', importantDialogue: 'first-person', newLocation: 'observer' },
  } satisfies StoryImageDirector,
  audioTheme: {
    recorded: { music: { src: audioThemeUrl, gain: .2 }, ambience: { src: audioAmbienceUrl, gain: .29 } },
    material: 'apartment' as const, bpm: 62, rootHz: 130.81, scale: [0, 2, 4, 7, 9],
    levels: { music: .11, ambient: .075, sfx: .16, master: .22 },
    tension: [
      { statId: 'rent', direction: 'high' as const, weight: .4 },
      { statId: 'order', direction: 'low' as const, weight: .3 },
      { statId: 'reputation', direction: 'low' as const, weight: .3 },
    ],
  },
}

export const rooftopApartment: StoryCartridge = {
  ...shared, locale: 'zh',
  transitionAnchor: '所有住户都会经过的楼梯平台与公共留言板',
  copy: { title: '屋顶公寓', subtitle: '四个人的公共生活记录', promise: '每件小事都会留下关系上的回声。', enter: '推开屋顶门', continue: '继续今天', customAction: '说说你想怎么做', itemImagingTitle: '公共柜正在归档', itemImagingBody: '你打开公共柜，住户记录开始为这些共同物品留下影像。它们会沿用公寓的纸张、暖光和生活痕迹，并在后台逐件完成。' },
  director: storyDirector('zh'),
  dangerDirector: dangerDirector('zh'),
  presetEventDirector: { events: presetEvents('zh') },
  initialFacts: {},
  domainRules: { rules: [
    {
      id: 'first-listen', intent: '先听住户说明情况', match: ['先听每个人说自己知道的情况'], matchMode: 'exact',
      requirements: [{ type: 'fact', id: 'first-method', notEquals: 'listen', reason: '你已经选择过开场处理方式' }, { type: 'fact', id: 'first-method', notEquals: 'records', reason: '你已经选择过开场处理方式' }, { type: 'fact', id: 'first-method', notEquals: 'landlord-call', reason: '你已经选择过开场处理方式' }],
      effects: [{ type: 'fact', id: 'first-method', value: 'listen' }, { type: 'fact', id: 'shared-timeline-started', value: true }, { type: 'stat', id: 'order', delta: 6 }, { type: 'clock', value: '周一 19:55' }, { type: 'objective', value: '把四个人记得的时间线拼完整' }],
      successText: '你把补缴单放到桌子正中，先不讨论谁负责，只让每个人按时间说自己看见了什么。林澄记得上周三水表已经倒转；乔承认拍过漏水照片；莫河想起账本里夹着一张同日维修单。争执没有消失，但第一次有了一条大家都能修正的共同时间线。',
      successChoices: ['请乔拿出上周三的照片', '和莫河核对账本里的维修编号', '让林澄整理一份给房东的时间线'],
    },
    {
      id: 'first-records', intent: '检查公共账本和维修记录', match: ['检查公共账本和维修记录'], matchMode: 'exact',
      requirements: [{ type: 'fact', id: 'first-method', notEquals: 'listen', reason: '你已经选择过开场处理方式' }, { type: 'fact', id: 'first-method', notEquals: 'records', reason: '你已经选择过开场处理方式' }, { type: 'fact', id: 'first-method', notEquals: 'landlord-call', reason: '你已经选择过开场处理方式' }],
      effects: [{ type: 'fact', id: 'first-method', value: 'records' }, { type: 'fact', id: 'old-repair-ticket-found', value: true }, { type: 'stat', id: 'order', delta: 4 }, { type: 'stat', id: 'rent', delta: -7 }, { type: 'clock', value: '周一 19:52' }, { type: 'objective', value: '确认旧维修单能否证明漏水早于屋顶改造' }],
      successText: '你和莫河翻开公共账本，在脱线的夹页里找到一张上周三的维修受理号——比屋顶改造早两天。它还不是足够完整的证据，却让补缴单上的因果顺序出现了裂缝。乔停止道歉，林澄开始记下需要向物业确认的问题。',
      successChoices: ['打给维修平台核对受理号', '请乔找出漏水照片的原始时间', '把证据摊开后再听每个人补充'],
    },
    {
      id: 'first-landlord', intent: '立刻联系房东', match: ['立刻给房东打电话'], matchMode: 'exact',
      requirements: [{ type: 'fact', id: 'first-method', notEquals: 'listen', reason: '你已经选择过开场处理方式' }, { type: 'fact', id: 'first-method', notEquals: 'records', reason: '你已经选择过开场处理方式' }, { type: 'fact', id: 'first-method', notEquals: 'landlord-call', reason: '你已经选择过开场处理方式' }],
      effects: [{ type: 'fact', id: 'first-method', value: 'landlord-call' }, { type: 'fact', id: 'landlord-deadline-set', value: true }, { type: 'stat', id: 'rent', delta: 5 }, { type: 'stat', id: 'reputation', delta: 4 }, { type: 'clock', value: '周一 19:48' }, { type: 'objective', value: '在明早九点前提交漏水早于改造的证据' }],
      successText: '你当着所有人的面拨通电话。房东没有撤回补缴单，却明确给出条件：明早九点前，如果你们能证明漏水早于屋顶改造，他会暂停追缴并让物业复查。直接交涉让压力暂时升高，也把含糊的争执变成了一个能共同应对的期限。',
      successChoices: ['立刻检查账本和维修记录', '让乔导出带时间信息的原始照片', '去楼下询问看见漏水的邻居'],
    },
  ] },
  statDefinitions: [
    { id: 'rent', label: '租金压力', min: 0, max: 100, initial: 42, display: 'bar', warningAt: 70, dangerAt: 90 },
    { id: 'order', label: '公共秩序', min: 0, max: 100, initial: 68, inverse: true, display: 'bar', warningAt: 40, dangerAt: 20 },
    { id: 'reputation', label: '邻里声誉', min: 0, max: 100, initial: 55, inverse: true, display: 'bar', warningAt: 35, dangerAt: 15 },
  ],
  drawerLabels: { party: '住户', map: '房间', inventory: '公共柜', log: '留言簿' },
  opening: {
    location: '屋顶公寓 · 公共厨房', time: '周一 19:40', objective: '决定如何处理突然出现的房租补缴单',
    imagePrompt: 'cozy lived-in rooftop apartment communal kitchen at dusk, four mismatched mugs, rent notice on table without readable text, warm windows and plants, editorial slice-of-life illustration, muted brick and plant green palette, no UI, 4:3',
    blocks: [
      { id: 'a0', kind: 'narration', text: '补缴单被压在盐罐下面。金额足够让公共冰箱空上半个月。' },
      { id: 'a1', kind: 'dialogue', speaker: '乔', tone: '心虚', text: '房东说是我们改造屋顶水管造成的。但那根管子明明去年就漏了。' },
      { id: 'a2', kind: 'event', text: '当前目标：在今晚结束前决定谁去面对房东。' },
    ],
    choices: [{ id: 'listen', label: '先听每个人说自己知道的情况' }, { id: 'records', label: '检查公共账本和维修记录' }, { id: 'landlord', label: '立刻给房东打电话' }],
  },
  characters: [
    { id: 'jo', name: '乔', role: '临时摄影师', vitality: 7, stress: 6, detail: '擅长注意别人忽略的画面，却常把不想面对的事实留在相机里。', lore: '他用屋顶储物间抵掉一部分房租，也因此最害怕房东收回公共空间。', skills: [{ id: 'listen', label: '倾听', value: 2 }, { id: 'hide', label: '掩饰', value: 4 }] },
    { id: 'lin', name: '林澄', role: '夜班护士', vitality: 6, stress: 7, detail: '行动果断，习惯在混乱中分配任务和确认时间线。', lore: '她是公寓里唯一与房东签过完整书面合同的人，大家常让她代表交涉。', skills: [{ id: 'coordinate', label: '协调', value: 4 }, { id: 'act', label: '行动力', value: 3 }] },
    { id: 'mo', name: '莫河', role: '研究生', vitality: 8, stress: 4, detail: '耐心整理账目和争执，常能记住一句话在几个月前的原意。', lore: '公共账本最初就是他用废论文装订的，里面混着维修、借款和住户之间的承诺。', skills: [{ id: 'listen', label: '倾听', value: 4 }, { id: 'coordinate', label: '协调', value: 2 }] },
  ],
  initialMap: [
    { id: 'kitchen', label: '公共厨房', current: true, detail: '四只不配套的杯子、老冰箱和一张总是被账单占据的餐桌。', lore: '这间厨房不是租约里的公共区域，是历任住户一点点争取来的。', facts: ['补缴单压在盐罐下面', '今晚所有住户都在场'] },
    { id: 'roof', label: '屋顶', connectedTo: '公共厨房', detail: '花盆、晾衣线和一根反复漏水的旧管道挤在半开放平台上。', lore: '住户自己修出的屋顶花园让这里成为家，也成了房东追加费用的理由。', facts: ['水表上周三已经倒转', '乔拍到过漏水照片'] },
    { id: 'street', label: '街区', connectedTo: '屋顶', detail: '楼下是熟悉住户多过正式店名的老街区。', lore: '邻里声誉决定谁会替公寓作证，也决定纠纷时谁愿意装作没看见。', facts: ['邻居能看到屋顶改造', '房东不住在本街区'] },
  ],
  initialInventory: [
    { id: 'ledger', label: '公共账本', count: 1, detail: '用废论文和棉线装订的厚账本，夹着票据、便签和维修编号。', effect: '可核对共同支出、借款和维修时间；缺页或未签名记录只能作为线索，不能单独证明责任。', lore: '它把一群临时住户慢慢变成共同生活的人，许多承诺只在这里有唯一记录。', metrics: [{ label: '记录跨度', value: '2 年 4 个月' }, { label: '缺页', value: '1 页' }], imagePrompt: 'single handmade communal apartment ledger bound from recycled paper with cotton thread, receipts and blank sticky notes, no readable text, warm window light, object only, square' },
    { id: 'keys', label: '备用钥匙', count: 2, detail: '两把颜色不同的旧黄铜钥匙，挂着没有文字的塑料牌。', effect: '分别打开屋顶门和地下水表间；借出后若未归还，公共空间安全会下降。', lore: '住户搬走时通常会交回钥匙，但这两把的原持有人都没有留下新地址。', metrics: [{ label: '屋顶门', value: '1 把' }, { label: '水表间', value: '1 把' }], imagePrompt: 'two mismatched old brass apartment keys on faded plastic tags without writing, intimate domestic still life, warm brick and plant green, object only, square' },
  ],
  demoTurns: [
    { match: ['听', '账本', '维修'], content: `你把补缴单放到桌子中央，让每个人按时间说清楚自己见过什么。
[林澄] [main] [思考]: "上周三凌晨，水表已经在倒转。那时屋顶还没动工。"
[skill_check: skill="倾听" dc="10" rolls="13" modifier="2" total="15" result="success"]
莫河从旧账本里找到同一天的维修报修编号。
[widget: order, value: 74]
[choices: "请林澄代表大家联系房东"|"让乔把照片时间戳整理成证据"|"先去屋顶确认水表仍在倒转"]` },
    { match: ['林澄', '乔', '屋顶'], content: `乔把相机递过来时，终于承认他早就拍到了漏水，只是害怕房东借机赶人。
[乔] [main] [尴尬]: "我不是想瞒你们。我只是……不知道说出来会不会更糟。"
[reputation: npc="乔" action="trusted"]
[widget: reputation, value: 62]
[map_update: new_location="屋顶" connected_to="公共厨房"]
[choices: "和乔一起整理照片"|"让他独自向大家道歉"|"先把证据发给房东"]`, imagePrompt: 'rooftop apartment garden at night, two residents reviewing camera photos beside an old leaking pipe, warm city windows, intimate editorial slice-of-life illustration, no text, no UI, 4:3' },
    { match: ['整理', '道歉', '房东'], content: `证据被按时间排好，公共账本也补上了缺失的一页。今晚没有解决房租，但大家终于在面对同一个问题。
[widget: rent, value: 35]
[session_end: reason="证据整理完成，适合明天继续与房东交涉"]` },
  ],
}

export const rooftopApartmentEn: StoryCartridge = {
  ...shared, locale: 'en',
  transitionAnchor: 'the shared stair landing and residents’ notice board',
  copy: { title: 'Rooftop Apartment', subtitle: 'A record of four shared lives', promise: 'Every small decision leaves an echo in the relationships around you.', enter: 'Open the rooftop door', continue: 'Continue today', customAction: 'Say what you want to do', itemImagingTitle: 'The shared cupboard is being archived', itemImagingBody: 'Opening the cupboard starts a visual record of the things everyone shares. Each plate keeps the apartment’s paper, warm window light, and lived-in traces while it develops in the background.' },
  director: storyDirector('en'),
  dangerDirector: dangerDirector('en'),
  presetEventDirector: { events: presetEvents('en') },
  initialFacts: {},
  domainRules: { rules: [
    {
      id: 'first-listen', intent: 'hear each resident first', match: ['Hear what each resident knows first'], matchMode: 'exact',
      requirements: [{ type: 'fact', id: 'first-method', notEquals: 'listen', reason: 'You already chose an opening approach' }, { type: 'fact', id: 'first-method', notEquals: 'records', reason: 'You already chose an opening approach' }, { type: 'fact', id: 'first-method', notEquals: 'landlord-call', reason: 'You already chose an opening approach' }],
      effects: [{ type: 'fact', id: 'first-method', value: 'listen' }, { type: 'fact', id: 'shared-timeline-started', value: true }, { type: 'stat', id: 'order', delta: 6 }, { type: 'clock', value: 'Monday 19:55' }, { type: 'objective', value: 'Complete a timeline everyone can correct together' }],
      successText: 'You put the surcharge notice in the center of the table and ask everyone to describe what they saw before discussing blame. Lin remembers the meter reversing last Wednesday; Jo admits he photographed the leak; Mo recalls a repair slip from the same day. The disagreement remains, but it now has a shared timeline everyone can challenge and repair.',
      successChoices: ['Ask Jo for last Wednesday’s original photos', 'Check the repair number with Mo', 'Have Lin turn the accounts into a landlord-ready timeline'],
    },
    {
      id: 'first-records', intent: 'check the shared records', match: ['Check the shared ledger and repair records'], matchMode: 'exact',
      requirements: [{ type: 'fact', id: 'first-method', notEquals: 'listen', reason: 'You already chose an opening approach' }, { type: 'fact', id: 'first-method', notEquals: 'records', reason: 'You already chose an opening approach' }, { type: 'fact', id: 'first-method', notEquals: 'landlord-call', reason: 'You already chose an opening approach' }],
      effects: [{ type: 'fact', id: 'first-method', value: 'records' }, { type: 'fact', id: 'old-repair-ticket-found', value: true }, { type: 'stat', id: 'order', delta: 4 }, { type: 'stat', id: 'rent', delta: -7 }, { type: 'clock', value: 'Monday 19:52' }, { type: 'objective', value: 'Confirm whether the old repair ticket predates the rooftop work' }],
      successText: 'You and Mo open the shared ledger and find a repair intake number in a loose page, dated two days before the rooftop work. It is not complete proof, but it breaks the surcharge’s claimed order of cause and effect. Jo stops apologizing; Lin starts listing what the building office must verify.',
      successChoices: ['Call the repair service about the intake number', 'Ask Jo for the original photo timestamps', 'Lay out the evidence and hear everyone’s additions'],
    },
    {
      id: 'first-landlord', intent: 'call the landlord immediately', match: ['Call the landlord immediately'], matchMode: 'exact',
      requirements: [{ type: 'fact', id: 'first-method', notEquals: 'listen', reason: 'You already chose an opening approach' }, { type: 'fact', id: 'first-method', notEquals: 'records', reason: 'You already chose an opening approach' }, { type: 'fact', id: 'first-method', notEquals: 'landlord-call', reason: 'You already chose an opening approach' }],
      effects: [{ type: 'fact', id: 'first-method', value: 'landlord-call' }, { type: 'fact', id: 'landlord-deadline-set', value: true }, { type: 'stat', id: 'rent', delta: 5 }, { type: 'stat', id: 'reputation', delta: 4 }, { type: 'clock', value: 'Monday 19:48' }, { type: 'objective', value: 'Submit evidence by 09:00 that the leak predates the rooftop work' }],
      successText: 'You make the call with everyone present. The landlord does not withdraw the surcharge, but sets a clear condition: prove by nine tomorrow that the leak predates the rooftop work, and collection will pause for a building review. The direct move raises immediate pressure, but turns a vague conflict into a deadline the household can face together.',
      successChoices: ['Check the ledger and repair records now', 'Have Jo export the original photographs', 'Ask downstairs neighbors who saw the leak'],
    },
  ] },
  statDefinitions: [
    { id: 'rent', label: 'Rent pressure', min: 0, max: 100, initial: 42, display: 'bar', warningAt: 70, dangerAt: 90 },
    { id: 'order', label: 'Shared order', min: 0, max: 100, initial: 68, inverse: true, display: 'bar', warningAt: 40, dangerAt: 20 },
    { id: 'reputation', label: 'Neighbor trust', min: 0, max: 100, initial: 55, inverse: true, display: 'bar', warningAt: 35, dangerAt: 15 },
  ],
  drawerLabels: { party: 'Residents', map: 'Rooms', inventory: 'Cupboard', log: 'Noticebook' },
  opening: {
    location: 'Rooftop Apartment · Shared Kitchen', time: 'Monday 19:40', objective: 'Decide how to handle the unexpected rent surcharge',
    imagePrompt: 'cozy lived-in rooftop apartment communal kitchen at dusk, four mismatched mugs, rent notice on table without readable text, warm windows and plants, editorial slice-of-life illustration, muted brick and plant green palette, no UI, 4:3',
    blocks: [
      { id: 'a0', kind: 'narration', text: 'The surcharge notice lies beneath the salt jar. Its total could empty the shared refrigerator for half a month.' },
      { id: 'a1', kind: 'dialogue', speaker: 'Jo', tone: 'uneasy', text: 'The landlord blames our rooftop plumbing work. But that pipe was leaking last year.' },
      { id: 'a2', kind: 'event', text: 'Current objective: decide who will face the landlord before tonight ends.' },
    ],
    choices: [{ id: 'listen', label: 'Hear what each resident knows first' }, { id: 'records', label: 'Check the shared ledger and repair records' }, { id: 'landlord', label: 'Call the landlord immediately' }],
  },
  characters: [
    { id: 'jo', name: 'Jo', role: 'Freelance photographer', vitality: 7, stress: 6, detail: 'Notices images others miss, but often leaves difficult truths trapped inside his camera.', lore: 'He trades use of the rooftop storage room for reduced rent, so he fears losing shared space most.', skills: [{ id: 'listen', label: 'Listen', value: 2 }, { id: 'hide', label: 'Conceal', value: 4 }] },
    { id: 'lin', name: 'Lin Cheng', role: 'Night-shift nurse', vitality: 6, stress: 7, detail: 'Decisive under pressure, accustomed to assigning tasks and reconstructing timelines.', lore: 'She is the only resident with a complete written lease, so the others often ask her to represent them.', skills: [{ id: 'coordinate', label: 'Coordinate', value: 4 }, { id: 'act', label: 'Initiative', value: 3 }] },
    { id: 'mo', name: 'Mo He', role: 'Graduate student', vitality: 8, stress: 4, detail: 'Patient with accounts and arguments, and remembers what a sentence meant months ago.', lore: 'He first bound the shared ledger from discarded thesis pages. It now holds repairs, debts, and promises.', skills: [{ id: 'listen', label: 'Listen', value: 4 }, { id: 'coordinate', label: 'Coordinate', value: 2 }] },
  ],
  initialMap: [
    { id: 'kitchen', label: 'Shared Kitchen', current: true, detail: 'Four mismatched mugs, an old refrigerator, and a table perpetually occupied by bills.', lore: 'The lease never promised a shared kitchen. Generations of residents negotiated it into existence.', facts: ['The surcharge notice is under the salt jar', 'Every resident is home tonight'] },
    { id: 'roof', label: 'Rooftop', connectedTo: 'Shared Kitchen', detail: 'Planters, clotheslines, and a repeatedly leaking pipe share a half-open platform.', lore: 'The resident-built garden made the building feel like home—and gave the landlord a reason to add fees.', facts: ['The meter was reversing last Wednesday', 'Jo photographed the leak'] },
    { id: 'street', label: 'Neighborhood', connectedTo: 'Rooftop', detail: 'An old neighborhood where residents are better known than official shop names.', lore: 'Neighbor trust determines who will testify for the apartment and who will pretend not to see a dispute.', facts: ['Neighbors can see the rooftop work', 'The landlord does not live nearby'] },
  ],
  initialInventory: [
    { id: 'ledger', label: 'Shared ledger', count: 1, detail: 'A thick book bound from discarded papers and cotton thread, full of receipts and repair numbers.', effect: 'Checks shared spending, debts, and repair dates; missing or unsigned records are clues, not proof by themselves.', lore: 'It slowly turned temporary tenants into a household. Some promises exist nowhere else.', metrics: [{ label: 'Record span', value: '2 years 4 months' }, { label: 'Missing pages', value: '1' }], imagePrompt: 'single handmade communal apartment ledger bound from recycled paper with cotton thread, receipts and blank sticky notes, no readable text, warm window light, object only, square' },
    { id: 'keys', label: 'Spare keys', count: 2, detail: 'Two mismatched brass keys on faded plastic tags with no writing.', effect: 'Open the rooftop door and basement meter room; shared security falls if a borrowed key is not returned.', lore: 'Departing tenants usually return their keys. The former owners of these two left no forwarding address.', metrics: [{ label: 'Rooftop', value: '1 key' }, { label: 'Meter room', value: '1 key' }], imagePrompt: 'two mismatched old brass apartment keys on faded plastic tags without writing, intimate domestic still life, warm brick and plant green, object only, square' },
  ],
  demoTurns: [
    { match: ['hear', 'listen', 'ledger', 'record', 'repair'], content: `You place the surcharge notice in the middle of the table and ask everyone to describe what they saw, in order.
[Lin Cheng] [main] [thinking]: "The water meter was already running backward early last Wednesday. The rooftop work had not begun."
[skill_check: skill="Listen" dc="10" rolls="13" modifier="2" total="15" result="success"]
Mo He finds a repair ticket from the same date in the old ledger.
[widget: order, value: 74]
[choices: "Ask Lin Cheng to contact the landlord for everyone"|"Have Jo organize the photo timestamps as evidence"|"Check whether the rooftop meter is still reversing"]` },
    { match: ['lin', 'jo', 'roof', 'evidence'], content: `When Jo hands over the camera, he finally admits that he photographed the leak days ago. He feared the landlord would use it to evict someone.
[Jo] [main] [embarrassed]: "I wasn't trying to hide it from you. I just… didn't know whether saying it would make things worse."
[reputation: npc="Jo" action="trusted"]
[widget: reputation, value: 62]
[map_update: new_location="Rooftop" connected_to="Shared Kitchen"]
[choices: "Organize the photographs with Jo"|"Ask him to apologize to everyone himself"|"Send the evidence to the landlord first"]`, imagePrompt: 'rooftop apartment garden at night, two residents reviewing camera photos beside an old leaking pipe, warm city windows, intimate editorial slice-of-life illustration, no text, no UI, 4:3' },
    { match: ['organize', 'apologize', 'landlord', 'send'], content: `The evidence is placed in chronological order, and the missing page returns to the shared ledger. The rent is not solved tonight, but everyone is finally facing the same problem.
[widget: rent, value: 35]
[session_end: reason="The evidence is organized; tomorrow is a good time to continue with the landlord"]` },
  ],
}
