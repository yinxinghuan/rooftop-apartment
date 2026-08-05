# Rooftop Apartment

一款有状态 AI 多人关系模拟。玩家加入一间屋顶合租公寓，在租金压力、公共秩序与邻里声誉之间处理会延续到下一次进入的生活冲突。

## 核心能力

- 单一独立游戏入口，不包含其他 Cartridge 选择器。
- zh/en 完整内容，系统语言首开，玩家回答语言可切换后续界面与回复。
- 独立 UUID、Aigram 云端存档与 localStorage 兜底；远程 chatId 随世界保存。
- 租金压力、公共秩序、邻里声誉三项结构化状态，d20 检定、房间、公共物品与关系事件。
- 当前 AlterU 用户头像作为故事主角，并可用于关键剧情图参考；个人资料不写入 StorySave。
- 关键剧情图片原位进入时间线，不会更新到页面顶部。

## 本地运行

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 4182
```

调试头像：`?avatar_url=<public-https-url>&user_name=Alex`。调试语言：`?lang=en` 或 `?lang=zh`。

## 验证

```bash
npm run build
```

需求、视觉与技术说明见 `doc/`。
