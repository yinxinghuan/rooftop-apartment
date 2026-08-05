import type { StoryCartridge } from '../types'

const coverImage = new URL('../img/worlds/rooftop-apartment.webp', import.meta.url).href

const shared = {
  schemaVersion: 1 as const,
  id: 'rooftop-apartment',
  coverImage,
  theme: { outer: '#111112', surface: '#171718', paper: '#e5ddcf', ink: '#2b2925', muted: '#817b72', accent: '#63826b', danger: '#a85f4d', gold: '#d4a860', material: 'apartment' as const },
  audioTheme: {
    material: 'apartment' as const,
    bpm: 62,
    rootHz: 130.81,
    scale: [0, 2, 4, 7, 9],
    levels: { music: .11, ambient: .075, sfx: .16, master: .22 },
    tension: [{ statId: 'rent', direction: 'high' as const, weight: .4 }, { statId: 'order', direction: 'low' as const, weight: .3 }, { statId: 'reputation', direction: 'low' as const, weight: .3 }],
  },
}

export const rooftopApartment: StoryCartridge = {
  ...shared, locale: 'zh',
  copy: { title: '屋顶公寓', subtitle: '四个人的公共生活记录', promise: '每件小事都会留下关系上的回声。', enter: '推开屋顶门', continue: '继续今天', customAction: '说说你想怎么做' },
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
    { id: 'jo', name: '乔', role: '临时摄影师', vitality: 7, stress: 6, skills: [{ id: 'listen', label: '倾听', value: 2 }, { id: 'hide', label: '掩饰', value: 4 }] },
    { id: 'lin', name: '林澄', role: '夜班护士', vitality: 6, stress: 7, skills: [{ id: 'coordinate', label: '协调', value: 4 }, { id: 'act', label: '行动力', value: 3 }] },
    { id: 'mo', name: '莫河', role: '研究生', vitality: 8, stress: 4, skills: [{ id: 'listen', label: '倾听', value: 4 }, { id: 'coordinate', label: '协调', value: 2 }] },
  ],
  initialMap: [{ id: 'kitchen', label: '公共厨房', current: true }, { id: 'roof', label: '屋顶', connectedTo: '公共厨房' }, { id: 'street', label: '街区', connectedTo: '屋顶' }],
  initialInventory: [{ id: 'ledger', label: '公共账本', count: 1 }, { id: 'keys', label: '备用钥匙', count: 2 }],
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
  copy: { title: 'Rooftop Apartment', subtitle: 'A record of four shared lives', promise: 'Every small decision leaves an echo in the relationships around you.', enter: 'Open the rooftop door', continue: 'Continue today', customAction: 'Say what you want to do' },
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
    { id: 'jo', name: 'Jo', role: 'Freelance photographer', vitality: 7, stress: 6, skills: [{ id: 'listen', label: 'Listen', value: 2 }, { id: 'hide', label: 'Conceal', value: 4 }] },
    { id: 'lin', name: 'Lin Cheng', role: 'Night-shift nurse', vitality: 6, stress: 7, skills: [{ id: 'coordinate', label: 'Coordinate', value: 4 }, { id: 'act', label: 'Initiative', value: 3 }] },
    { id: 'mo', name: 'Mo He', role: 'Graduate student', vitality: 8, stress: 4, skills: [{ id: 'listen', label: 'Listen', value: 4 }, { id: 'coordinate', label: 'Coordinate', value: 2 }] },
  ],
  initialMap: [{ id: 'kitchen', label: 'Shared Kitchen', current: true }, { id: 'roof', label: 'Rooftop', connectedTo: 'Shared Kitchen' }, { id: 'street', label: 'Neighborhood', connectedTo: 'Rooftop' }],
  initialInventory: [{ id: 'ledger', label: 'Shared ledger', count: 1 }, { id: 'keys', label: 'Spare keys', count: 2 }],
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
