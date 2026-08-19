import assert from 'node:assert/strict'
import { rooftopApartment } from '../src/story/cartridges/rooftopApartment'
import { createAuthorityShadowSample } from '../src/story/engine/authorityShadow'
import { createInitialSave } from '../src/story/engine/reducer'
const save = createInitialSave(rooftopApartment); const visible = JSON.stringify(save.choices); const sample = createAuthorityShadowSample(save, rooftopApartment)
assert.equal(JSON.stringify(save.choices), visible); assert.equal(sample.choices.length, save.choices.length); assert.equal(sample.emptyTray, false); assert.ok(sample.choices.every((choice) => ['accepted', 'rejected', 'open'].includes(choice.status))); assert.equal(createAuthorityShadowSample({ ...save, entered: true, choices: [], sessionEnded: false }, rooftopApartment).emptyTray, true)
console.log('rooftop-apartment authority shadow is observational: ok')
