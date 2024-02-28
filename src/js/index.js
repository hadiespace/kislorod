import 'what-input';
import { testSupportWebp } from './modules/test-support-webp.js';
import { initLinkScroll } from './modules/init-link-scroll.js';
import { defocusButton } from './modules/defocus-button.js';
import { initPhoneMask } from './modules/init-phone-mask.js';
import { initPhoneHref } from './modules/init-phone-href.js';
import { initFancybox } from './modules/init-fancybox.js';
import { resizeTextarea } from './modules/resize-textarea.js';
import { initRating } from './modules/init-rating.js';
import { sendForm } from './modules/send-form.js';

testSupportWebp();
defocusButton();
initPhoneHref();
initLinkScroll();
initPhoneMask();
initFancybox();
resizeTextarea();
initRating();
sendForm();