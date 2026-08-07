import type { StoryCartridge, StoryImageDirector } from '../types'

const coverImage = new URL('../img/worlds/rooftop-apartment.webp', import.meta.url).href
const entryImage = new URL('../img/worlds/rooftop-apartment-entry.webp', import.meta.url).href

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
    guaranteedTriggers: ['new-location', 'rare-item', 'party-change', 'chapter-checkpoint'],
    softTriggers: ['relationship-change', 'objective-change', 'skill-outcome'],
  } satisfies StoryImageDirector,
  audioTheme: {
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
  copy: { title: '屋顶公寓', subtitle: '四个人的公共生活记录', promise: '每件小事都会留下关系上的回声。', enter: '推开屋顶门', continue: '继续今天', customAction: '说说你想怎么做', itemImagingTitle: '公共柜正在归档', itemImagingBody: '你打开公共柜，住户记录开始为这些共同物品留下影像。它们会沿用公寓的纸张、暖光和生活痕迹，并在后台逐件完成。' },
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
  copy: { title: 'Rooftop Apartment', subtitle: 'A record of four shared lives', promise: 'Every small decision leaves an echo in the relationships around you.', enter: 'Open the rooftop door', continue: 'Continue today', customAction: 'Say what you want to do', itemImagingTitle: 'The shared cupboard is being archived', itemImagingBody: 'Opening the cupboard starts a visual record of the things everyone shares. Each plate keeps the apartment’s paper, warm window light, and lived-in traces while it develops in the background.' },
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
