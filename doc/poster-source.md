# 海报来源记录

- 制作日期：2026-08-05
- 制作接口：`POST https://chat.aiwaves.tech/aigram/api/gen-image`
- 请求 Origin：`https://aigram.app`
- 参考世界母图：`https://cdn.aiwaves.tech/prod/telegram/avatar/0/1785932206289958.webp`
- 最终生成源：`https://cdn.aiwaves.tech/prod/telegram/avatar/0/1785940046970310.webp`
- 本地发布文件：`public/poster.png`，1024×1024 PNG；WebP 源仅做格式转换，没有程序化重绘或 UI 栅格化。
- 场景：暮色屋顶合租公寓，公共厨房、四只不配套杯子、合拢账本、旧管道、屋顶植物与四位住户形成明确关系冲突。
- 标题：上方安全区只出现准确英文 `ROOFTOP APARTMENT`；无中文、中英混排、副标题、Logo、UI、水印或签名。
- 1024×1024 检查：标题拼写、四位人物、公共空间与生活冲突均清楚；主体脸部避开底部 20%。
- 160×160 检查：标题仍可读，前景主角、三位住户、杯子与账本仍能形成故事关系。

## 世界母图

- 最终源：`https://cdn.aiwaves.tech/prod/telegram/avatar/0/1785932206289958.webp`
- 本地文件：`src/story/img/worlds/rooftop-apartment.webp`
- 用途：入口使用 3:2 彩色裁切；运行时生图未完成时使用 4:3 低饱和记录底图。
- 约束：无 Logo、无 UI、账本合拢且没有可读伪文字。
