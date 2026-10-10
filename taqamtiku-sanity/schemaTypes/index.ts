import menuItemType from './menuItemType'
import menuType from './menuType'
import restaurantMenuType from './restaurantMenuType'
import restaurantMenuCategoryType from './restaurantMenuCategoryType'
import restaurantMenuItemType from './restaurantMenuItemType'
import pageType from './pageType'
import articleType from './articleType'
import textWithLinksBlock from './textWithLinksBlock'
import videoType from './videoType'
import siteSettings from './siteSettings'

// Ordering system
import restaurantTableType from './restaurantTableType'
import orderLineItemType from './orderLineItemType'
import orderType from './orderType'
import staffUserType from './staffUserType'
import orderCounterType from './orderCounterType'

// Sections
import latestArticlesSection from './latestArticlesSection'
import richTextSection from './richTextSection'
import sliderSection from './sliderSection'
import logoListSection from './logoListSection'
import callToActionSection from './callToActionSection'
import faqSection from './faqSection'
import mediaTextSection from './mediaTextSection'
import temoignagesSection from './temoignagesSection'

export const schemaTypes = [
  menuType,
  menuItemType,
  pageType,
  restaurantMenuType,
  restaurantMenuCategoryType,
  restaurantMenuItemType,
  articleType,
  videoType,
  siteSettings,

  // Ordering system
  restaurantTableType,
  orderLineItemType,
  orderType,
  staffUserType,
  orderCounterType,

  // Sections
  richTextSection,
  sliderSection,
  faqSection,
  logoListSection,
  latestArticlesSection,
  textWithLinksBlock,
  callToActionSection,
  mediaTextSection,
  temoignagesSection,
]
