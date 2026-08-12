import assert from 'node:assert/strict'
import { rooftopApartment } from '../src/story/cartridges/rooftopApartment'
import { resolveDomainAction } from '../src/story/engine/domainRules'
import { applyParsedScene, createInitialSave } from '../src/story/engine/reducer'
import { parseStoryProtocol } from '../src/story/engine/protocol'

const expected = ['listen', 'records', 'landlord-call']
for (const [index, choice] of rooftopApartment.opening.choices.entries()) {
  const save = createInitialSave(rooftopApartment)
  const resolution = resolveDomainAction(save, rooftopApartment, choice.label)
  assert.equal(resolution?.kind, 'accepted')
  const next = applyParsedScene(save, parseStoryProtocol('[widget: rent, value: 100]\n[choices: "wrong one"|"wrong two"|"wrong three"]', 'zh'), rooftopApartment, choice.label, undefined, undefined, undefined, resolution)
  assert.equal(next.facts['first-method'], expected[index])
  assert.equal(next.choices.length, 3)
  assert.notEqual(next.choices[0]?.label, 'wrong one')
  assert.equal(resolveDomainAction(next, rooftopApartment, choice.label)?.kind, 'rejected')
}
console.log(JSON.stringify({ ok: true, branches: 3, localAuthority: true }))

