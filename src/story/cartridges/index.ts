import { rooftopApartment, rooftopApartmentEn } from './rooftopApartment'
import type { Locale, StoryCartridge } from '../types'

export const DEFAULT_CARTRIDGE_ID = 'rooftop-apartment'

const localized: Record<Locale, StoryCartridge> = {
  zh: rooftopApartment,
  en: rooftopApartmentEn,
}

export function listCartridges(locale: Locale): StoryCartridge[] { return [localized[locale]] }

export function resolveCartridge(_id: string | null | undefined, locale: Locale = 'zh'): StoryCartridge {
  return localized[locale]
}
