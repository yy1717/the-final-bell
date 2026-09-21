const C=window.HALLOWEEN_CONFIG||{};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
let ROLES=[], SLOTS=[], HOLD=null, holdInterval=null, LAST_STATUS=null, ACTIVE_FILTER='ALL';
let LANG=localStorage.getItem('final_bell_lang')||'en';
if(!['en','zh'].includes(LANG)) LANG='en';

const I18N={
  en:{
    bookingPrelaunchTitle:'BOOKING OPENS IN OCTOBER',bookingPrelaunchLimit:'First 12 valid bookings only',bookingPrelaunchRounds:'Five game rounds will be available.',bookingPrelaunchReturn:'Please return to this page when booking opens.',
    slotClosed:'Unavailable',slotsLoadError:'Booking slots could not be loaded. Please refresh.',
    earlyBirdLabel:'Early Bird',regularLabel:'Regular',helpEyebrow:'NEED HELP?',helpTitle:'Questions?',helpText:'If you have any questions about booking, payment or The Final Bell, feel free to contact me.',whatsappHint:'Chat on WhatsApp',instagramHint:'View Instagram',
    zombiePackageEyebrow:'INCLUDED SIDE ACTIVITY',zombiePackageTitle:'MORE THAN ONE GAME.',zombiePackageText:'Every The Final Bell ticket includes access to Zombie Dance.',zombiePointReplay:'🧟 Unlimited Zombie Dance replay',zombiePointDuration:'⏱ Up to 10 minutes per round',zombiePointPrizes:'🏆 Compete for extra prizes',zombiePointIncluded:'🎟 Included in your The Final Bell ticket',zombieDiscover:'DISCOVER ZOMBIE DANCE →',zombieMiniTagline:'Dance. Deceive. Survive.',zombieMiniText:'10-minute social deception dance game. Included with every The Final Bell ticket.',zombieExplore:'EXPLORE →',organisedBy:'Organised by:',
    navHow:'How to Play',navRoles:'Roles',navBooking:'Booking',heroEyebrow:'HALLOWEEN SPECIAL · HIDDEN ROLE GAME',players:'Players',minutes:'min',bookNow:'BOOK A SLOT',learnGame:'HOW TO PLAY',eventInfo:'EVENT INFO',dateLabel:'📅 Date',timeLabel:'🕒 Time',venueLabel:'📍 Venue',ticketLabel:'🎟 Ticket',gameLabel:'⏱ Game',arriveEarly:'Please arrive 5 minutes early.',
    howEyebrow:'HOW THE GAME WORKS',howTitle:'Learn it in one minute.',howDesc:'Read this before your round so the game can start fast.',tapImage:'🔍 Tap to view full image',
    flow1Title:'Draw a role',flow1Text:'Receive one secret physical role card. Never show it to other players.',flow2Title:'Night phase',flow2Text:'Close your eyes. The GM calls roles and resolves secret abilities.',flow3Title:'Discuss & bluff',flow3Text:'During Day, share clues, make claims, lie, defend and accuse.',flow4Title:'Vote',flow4Text:'Players vote to eliminate a suspect. Eliminated players keep all hidden information secret.',flow5Title:'Final Bell',flow5Text:'Good, Evil and Shadow Mage have different victory conditions. Survive your route.',
    featureRoleTitle:'Know every role',featureRoleText:'Role rules are public before the game. Your assigned card is private.',featurePhoneTitle:'Phone-free round',featureZombieTitle:'Eliminated early?',featureZombieText:'Keep the fun going at the Zombie Dance area while the main round continues.',
    roleEyebrow:'ROLE GUIDE',roleTitle:'Meet the 12 roles.',roleDesc:'8 Good · 3 Evil · 1 Independent. Tap a card to read the full ability and win condition.',filterAll:'All',filterGood:'Good',filterEvil:'Evil',filterIndependent:'Independent',loadingRoles:'Loading roles…',
    bookingEyebrow:'ONLINE BOOKING',bookingTitle:'Choose your round.',bookingDesc:'A new reservation holds one seat for 15 minutes while you make payment.',refreshSlots:'↻ Refresh',loadingSlots:'Loading slots…',
    rulesEyebrow:'BEFORE YOU PLAY',rulesTitle:'Quick rules',rule1:'Keep your assigned role card secret. You may bluff.',rule2:'No phones during the main game.',rule3:'Close your eyes during Night. No peeking.',rule4:'Eliminated players must not reveal hidden information.',rule5:'Follow the GM’s instructions.',
    policyEyebrow:'BOOKING POLICY',policyTitle:'Non-refundable booking',policyText:'All bookings are non-refundable for no-shows, late arrivals, change of mind, or choosing the wrong time slot. Please arrive at least 5 minutes early.',policyException:'If the school or organiser cancels the event/session, affected participants will be contacted regarding the available arrangement.',policyEncore:'Advance bookings may include multiple rounds at the regular ticket price. After completing your first round, additional same-day Encore rounds are RM10, subject to remaining seats. Encore rounds do not include an additional Mystery Gift.',footerNote:'Play fair · Respect the GM · Have fun',
    reserveStep:'STEP 1 · RESERVE',reserveSeat:'Reserve a seat',nameLabel:'Name / Nickname',contactLabel:'WhatsApp / Contact',contactPlaceholder:'Recommended for booking updates',refundAgree:'I understand that my booking is non-refundable, including no-shows and late arrivals.',bookingReminder:'Early Bird RM9.90 · Regular RM15.00 · Non-refundable · Please arrive 5 minutes early',reserveButton:'Reserve for 15 minutes',
    paymentStep:'STEP 2 · PAYMENT',seatReserved:'Seat reserved',bookingReference:'Booking reference',reservationHold:'Reservation hold',amountLabel:'Amount',recipientLabel:'Recipient',paymentWarning:'Always verify the recipient name in your banking app before confirming payment.',paymentRefLabel:'Payment / transaction reference *',paymentRefPlaceholder:'Enter the reference shown in your banking app',paymentRefHelp:'After making payment, enter the transaction reference shown in your banking app.',iPaid:'I have paid',cancelReservation:'Cancel reservation',
    statusEyebrow:'BOOKING STATUS',leaveFeedback:'Leave Feedback',feedbackThanks:'Feedback submitted ✓ Thank you!',checkAgain:'Check status again',feedbackEyebrow:'AFTER THE GAME',feedbackTitle:'How was the round?',feedbackDesc:'Your feedback helps improve the next session. One response per verified booking.',overallFun:'Overall fun *',difficultyLabel:'Difficulty',durationLabel:'25-minute duration',favoriteRoleLabel:'Favourite role',payAgainLabel:'Would you pay RM15 again?',tooEasy:'Too easy',justRight:'Just right',tooHard:'Too hard',tooShort:'Too short',tooLong:'Too long',chooseOne:'Choose one',yes:'Yes',maybe:'Maybe',no:'No',commentLabel:'Comment / suggestion',commentPlaceholder:'What was fun? What was confusing?',submitFeedback:'Submit Feedback',
    factionGOOD:'GOOD',factionEVIL:'EVIL',factionINDEPENDENT:'INDEPENDENT',typeGOD:'GOD',typeCIVILIAN:'CIVILIAN',typeEVIL:'EVIL',typeINDEPENDENT:'INDEPENDENT',ability:'ABILITY',winCondition:'WIN CONDITION',readRole:'VIEW ROLE',
    round:'ROUND',full:'FULL',seatLeft:'seat left',seatsLeft:'seats left',reserve:'Reserve',perPlayer:'/ player',noSlots:'No booking slots are open yet. Please check again later.',notConfigured:'Online booking is not configured yet. The organiser needs to connect this page to Supabase.',roleUnavailable:'Role guide is not available yet.',
    agreePolicy:'Please agree to the booking and refund policy before continuing.',reserving:'Reserving seat…',paymentQrMissing:'Payment QR has not been published yet. Contact the organiser before paying.',reservationExpired:'Reservation expired. Please close this window and reserve again.',enterPaymentRef:'Please enter your payment / transaction reference.',submittingPayment:'Submitting payment for verification…',paymentSubmitted:'Payment submitted for confirmation',cancelConfirm:'Cancel this reservation?',reservationCancelled:'Reservation cancelled',noSavedBooking:'No saved booking.',
    statusReceived:'Booking received',statusConfirmed:'Booking confirmed ✓',statusRejected:'Payment not verified',statusCancelled:'Booking cancelled',statusRefunded:'Payment refunded',roundLabel:'Round',statusLabel:'Status',amountStatusLabel:'Amount',pendingHelp:'Your seat is reserved for 15 minutes while you make payment.',awaitingHelp:'Payment submitted. Your seat is reserved while the organiser verifies the transfer.',paidHelp:'Payment confirmed. Your booking is confirmed. Please arrive at least 5 minutes early.',rejectedHelp:'Payment could not be verified. Please contact the organiser or make a new booking.',cancelledHelp:'Booking cancelled.',refundedHelp:'Payment refunded.',
    missingBooking:'Booking information is missing.',chooseRating:'Choose an overall fun rating first.',submitting:'Submitting…',feedbackReceived:'Thank you — feedback received.',
    phoneDefault:'Phones stay away once the round starts.',paymentNoteDefault:'Scan the payment QR, pay the amount shown, then enter the transaction reference from your banking app.',recipientDefault:'Verify in banking app',heroSubtitle:'12 Players · Hidden Roles · One Final Bell'
  },
  zh:{
    bookingPrelaunchTitle:'预订将于十月开放',bookingPrelaunchLimit:'首12个有效预订名额',bookingPrelaunchRounds:'活动将开放5个游戏场次。',bookingPrelaunchReturn:'请在预订开放后再次回来完成报名。',
    slotClosed:'暂不可预约',slotsLoadError:'无法加载预约场次，请刷新重试。',
    earlyBirdLabel:'早鸟票',regularLabel:'普通票',helpEyebrow:'需要帮助？',helpTitle:'有问题？',helpText:'如果你对预订、付款或 The Final Bell 有任何疑问，欢迎联系我。',whatsappHint:'通过 WhatsApp 聊天',instagramHint:'查看 Instagram',
    zombiePackageEyebrow:'门票已包含的支线活动',zombiePackageTitle:'不只一场游戏。',zombiePackageText:'每一张 The Final Bell 门票都包含 Zombie Dance 参与资格。',zombiePointReplay:'🧟 Zombie Dance 不限次数重玩',zombiePointDuration:'⏱ 每轮最长 10 分钟',zombiePointPrizes:'🏆 争夺额外奖品',zombiePointIncluded:'🎟 已包含在 The Final Bell 门票内',zombieDiscover:'探索 ZOMBIE DANCE →',zombieMiniTagline:'舞动。欺骗。生存。',zombieMiniText:'10 分钟社交推理舞蹈游戏。每张 The Final Bell 门票均已包含。',zombieExplore:'探索 →',organisedBy:'主办：',
    navHow:'怎么玩',navRoles:'角色',navBooking:'预约',heroEyebrow:'万圣节限定 · 隐藏身份推理游戏',players:'玩家',minutes:'分钟',bookNow:'预约场次',learnGame:'查看玩法',eventInfo:'活动资料',dateLabel:'📅 日期',timeLabel:'🕒 时间',venueLabel:'📍 地点',ticketLabel:'🎟 票价',gameLabel:'⏱ 游戏',arriveEarly:'请至少提前 5 分钟到场。',
    howEyebrow:'游戏玩法',howTitle:'一分钟看懂怎么玩。',howDesc:'建议开局前先看完，现场就能更快进入游戏。',tapImage:'🔍 点击查看完整图片',
    flow1Title:'抽取角色',flow1Text:'每人获得一张秘密实体角色卡。不要给其他玩家看。',flow2Title:'夜晚阶段',flow2Text:'所有人闭眼，由 GM 依序叫角色并结算秘密技能。',flow3Title:'讨论与伪装',flow3Text:'白天可以分享线索、假跳身份、说谎、辩解与指认。',flow4Title:'投票淘汰',flow4Text:'玩家投票淘汰嫌疑人。出局后不能透露隐藏身份或夜晚信息。',flow5Title:'终场铃声',flow5Text:'Good、Evil 与 Shadow Mage 的胜利条件不同，想办法完成你阵营的路线。',
    featureRoleTitle:'先认识所有角色',featureRoleText:'所有角色规则在开局前公开，但你实际抽到的角色必须保密。',featurePhoneTitle:'主游戏禁用手机',featureZombieTitle:'还在等你的场次？',featureZombieText:'Zombie Dance 已包含在门票内。等待 The Final Bell、活动空档或被淘汰后都可以参加，并可重复游玩，视现场排队与空间而定。',
    roleEyebrow:'角色指南',roleTitle:'认识 12 个角色。',roleDesc:'8 Good · 3 Evil · 1 Independent。点击角色卡查看完整技能与胜利条件。',filterAll:'全部',filterGood:'好人',filterEvil:'坏人',filterIndependent:'独立',loadingRoles:'正在加载角色…',
    bookingEyebrow:'线上预约',bookingTitle:'选择你的场次。',bookingDesc:'预约成功后会暂时保留座位 15 分钟，让你完成付款。',refreshSlots:'↻ 刷新',loadingSlots:'正在加载场次…',
    rulesEyebrow:'开局前须知',rulesTitle:'快速规则',rule1:'你抽到的角色卡必须保密，但你可以说谎或假装其他身份。',rule2:'主游戏进行期间不可使用手机。',rule3:'夜晚阶段必须闭眼，不可以偷看。',rule4:'被淘汰后不可透露隐藏身份或夜晚信息。',rule5:'请跟随 GM 的指示。',
    policyEyebrow:'预约规则',policyTitle:'预约后不退款',policyText:'No-show、迟到、临时改变主意或自己选错场次均不退款。请至少提前 5 分钟到场。',policyException:'如果场次由学校或主办方取消，我们会联系受影响的参与者并另行安排。',policyEncore:'玩家可提前预约多个 The Final Bell 场次，每个场次按正常票价计算。完成第一轮后，如当天仍有剩余座位，可现场以 RM10 Encore 价参与额外场次。',footerNote:'公平游戏 · 尊重 GM · 玩得开心',
    reserveStep:'步骤 1 · 预约',reserveSeat:'预约一个座位',nameLabel:'名字 / 昵称',contactLabel:'WhatsApp / 联络方式',contactPlaceholder:'建议填写，方便预约更新时联系你',refundAgree:'我明白本次预约不退款，包括 no-show 与迟到。',bookingReminder:'Early Bird RM9.90 · Regular RM15.00 · 不退款 · 请提前 5 分钟到场',reserveButton:'保留座位 15 分钟',
    paymentStep:'步骤 2 · 付款',seatReserved:'座位已暂时保留',bookingReference:'预约编号',reservationHold:'座位保留时间',amountLabel:'金额',recipientLabel:'收款人',paymentWarning:'付款前请务必在银行 App 核对收款人名字。',paymentRefLabel:'付款 / Transaction Reference *',paymentRefPlaceholder:'填写银行 App 显示的交易编号',paymentRefHelp:'完成付款后，请输入银行 App 显示的 Transaction Reference。',iPaid:'我已付款',cancelReservation:'取消预约',
    statusEyebrow:'预约状态',leaveFeedback:'填写游戏反馈',feedbackThanks:'反馈已提交 ✓ 谢谢！',checkAgain:'再次检查状态',feedbackEyebrow:'游戏结束后',feedbackTitle:'这一局体验怎么样？',feedbackDesc:'你的意见会帮助我们改善下一场。每个已验证 Booking 只能提交一次。',overallFun:'整体好玩程度 *',difficultyLabel:'游戏难度',durationLabel:'25 分钟时长',favoriteRoleLabel:'最喜欢的角色',payAgainLabel:'你愿意再付 RM15 玩一次吗？',tooEasy:'太简单',justRight:'刚刚好',tooHard:'太难',tooShort:'太短',tooLong:'太长',chooseOne:'请选择',yes:'愿意',maybe:'可能',no:'不会',commentLabel:'意见 / 建议',commentPlaceholder:'哪里好玩？哪里让你觉得混乱？',submitFeedback:'提交反馈',
    factionGOOD:'好人阵营',factionEVIL:'邪恶阵营',factionINDEPENDENT:'独立阵营',typeGOD:'神职',typeCIVILIAN:'民职',typeEVIL:'邪恶',typeINDEPENDENT:'独立',ability:'技能',winCondition:'胜利条件',readRole:'查看角色',
    round:'场次',full:'已满',seatLeft:'个座位剩余',seatsLeft:'个座位剩余',reserve:'预约',perPlayer:'/ 人',noSlots:'目前还没有开放预约场次，请稍后再来看看。',notConfigured:'线上预约尚未连接 Supabase，请联系主办方。',roleUnavailable:'角色指南暂时无法加载。',
    agreePolicy:'请先同意预约与退款规则再继续。',reserving:'正在保留座位…',paymentQrMissing:'付款 QR 尚未发布，请先联系主办方再付款。',reservationExpired:'座位保留时间已结束，请关闭此窗口后重新预约。',enterPaymentRef:'请输入付款 / Transaction Reference。',submittingPayment:'正在提交付款资料等待核实…',paymentSubmitted:'付款资料已提交，等待确认',cancelConfirm:'确定要取消这次预约吗？',reservationCancelled:'预约已取消',noSavedBooking:'没有找到已保存的预约。',
    statusReceived:'已收到预约',statusConfirmed:'预约已确认 ✓',statusRejected:'付款无法核实',statusCancelled:'预约已取消',statusRefunded:'款项已退款',roundLabel:'场次',statusLabel:'状态',amountStatusLabel:'金额',pendingHelp:'你的座位会暂时保留 15 分钟，请在时间内完成付款。',awaitingHelp:'你已提交付款资料，座位会继续保留，等待主办方核实入账。',paidHelp:'付款已确认，预约正式成立。请至少提前 5 分钟到场。',rejectedHelp:'我们暂时无法核实这笔付款，请联系主办方或重新预约。',cancelledHelp:'预约已取消。',refundedHelp:'款项已退款。',
    missingBooking:'找不到预约资料。',chooseRating:'请先选择整体好玩程度。',submitting:'正在提交…',feedbackReceived:'谢谢！我们已经收到你的反馈。',
    phoneDefault:'游戏开始后请收起手机。',paymentNoteDefault:'扫描付款 QR 支付显示的金额，再填写银行 App 中的 Transaction Reference。',recipientDefault:'请在银行 App 核对',heroSubtitle:'12 人 · 隐藏身份 · 一声终场铃'
  }
};
const t=(k)=>I18N[LANG]?.[k]??I18N.en[k]??k;

const ROLE_ZH={
  1:{name:'占卜师',en:'Fortune Teller',ability:'命运连结',text:'每局最多 2 次。夜晚选择 2 名玩家，GM 会告诉你两人属于「相同阵营」或「不同阵营」。',win:'全部 3 名 Evil 玩家被淘汰时，Good 立即获胜。'},
  2:{name:'侦探',en:'Detective',ability:'调查',text:'每局 1 次。夜晚调查 1 名玩家，GM 回答 GOOD 或 NOT GOOD。Shadow Mage 会被视为 NOT GOOD。',win:'全部 3 名 Evil 玩家被淘汰时，Good 立即获胜。'},
  3:{name:'白女巫',en:'White Witch',ability:'守护',text:'每局 1 次。夜晚保护 1 名玩家，使其免受普通 Evil 夜杀。不能保护自己。',win:'全部 3 名 Evil 玩家被淘汰时，Good 立即获胜。'},
  4:{name:'守夜人',en:'Night Watcher',ability:'监视',text:'每局 1 次。所有夜晚行动结束后选择 1 名玩家，GM 只会告诉你该玩家当晚是否使用了「个人角色技能」。普通 Evil 阵营夜杀不算个人技能。',win:'全部 3 名 Evil 玩家被淘汰时，Good 立即获胜。'},
  5:{name:'幽灵',en:'Ghost',ability:'最后低语',text:'当你被淘汰时，只有 Ghost 可以留下大约 10 秒的最后发言，然后离开主游戏。',win:'全部 3 名 Evil 玩家被淘汰时，Good 立即获胜。'},
  6:{name:'黑猫',en:'Black Cat',ability:'九命',text:'第一次受到普通 Evil 夜杀时不会死亡。白天投票淘汰仍然会正常出局。',win:'全部 3 名 Evil 玩家被淘汰时，Good 立即获胜。'},
  7:{name:'南瓜王',en:'Pumpkin King',ability:'王权之票',text:'每局 1 次。在白天投票前发动，本轮你的票算 2 票。',win:'全部 3 名 Evil 玩家被淘汰时，Good 立即获胜。'},
  8:{name:'木乃伊',en:'Mummy',ability:'古老诅咒',text:'每局 1 次。夜晚诅咒 1 名玩家；该玩家第二天仍然可以发言，但投票不计入。',win:'全部 3 名 Evil 玩家被淘汰时，Good 立即获胜。'},
  9:{name:'狼人',en:'Werewolf',ability:'血月',text:'狼人存活时是 Evil 的 Pack Leader。每局 1 次发动 Blood Moon，让当晚 Evil 夜杀无视普通保护或夜杀免疫，包括 White Witch 的 Protection、Black Cat 的 Nine Lives，以及 Shadow Mage 的 Shadow Veil。狼人出局后，其余 Evil 仍然可以继续普通夜杀。',win:'只要 4 名 God 全部出局，或 4 名 Civilian 全部出局，Evil 立即获胜。'},
  10:{name:'蒙面客',en:'Masked Guest',ability:'假面',text:'第一次受到阵营调查时，会被视为 GOOD。该次调查后伪装破裂，之后的调查会正常显示 Evil。',win:'只要 4 名 God 全部出局，或 4 名 Civilian 全部出局，Evil 立即获胜。'},
  11:{name:'蜘蛛女王',en:'Spider Queen',ability:'蛛网',text:'每局 1 次。夜晚选择 1 名玩家，使该玩家当晚的个人角色技能失效。如果该玩家在被蛛网影响时尝试使用每局限 1 次的角色技能，该次使用次数仍会被消耗。不会取消正常发言、白天投票或 Evil 阵营夜杀。',win:'只要 4 名 God 全部出局，或 4 名 Civilian 全部出局，Evil 立即获胜。'},
  12:{name:'影法师',en:'Shadow Mage',ability:'暗影帷幕',text:'每局 1 次，夜晚发动 Shadow Veil。如果当晚被普通 Evil 夜杀选为目标，你会存活。如果没有被选为目标，该次使用次数仍会被消耗。白天被投票淘汰仍然会出局。Blood Moon 会无视 Shadow Veil。',win:'Final Bell 响起时，如果 Good 和 Evil 均尚未获胜，而你仍然存活，就触发 Shadow Ending，并由你单独获胜。'}
};

function money(v){return `${C.currency||'RM'}${Number(v||0).toFixed(2)}`}
function toast(msg,type=''){const el=$('#toast');el.textContent=msg;el.className='toast '+type;clearTimeout(toast._t);toast._t=setTimeout(()=>el.className='toast hidden',3200)}
function headers(){const h={'apikey':C.publishableKey,'Content-Type':'application/json'};if(String(C.publishableKey||'').startsWith('eyJ'))h.Authorization='Bearer '+C.publishableKey;return h}
async function rpc(name,payload={}){if(!C.supabaseUrl||!C.publishableKey)throw Error(t('notConfigured'));const r=await fetch(`${C.supabaseUrl}/rest/v1/rpc/${name}`,{method:'POST',headers:headers(),body:JSON.stringify(payload)});const j=await r.json().catch(()=>null);if(!r.ok)throw Error(j?.message||j?.hint||`Booking service error (${r.status})`);return j}
function roleNames(r){const parts=String(r.name||'').split('/').map(x=>x.trim());const zh=ROLE_ZH[Number(r.id)]||{};return LANG==='zh'?{main:zh.name||parts[1]||parts[0],sub:zh.en||parts[0]}:{main:parts[0],sub:parts[1]||zh.name||''}}
function roleCopy(r){if(LANG==='zh'&&ROLE_ZH[Number(r.id)])return ROLE_ZH[Number(r.id)];return {ability:r.ability_name,text:r.ability_text,win:r.win_condition}}
function factionLabel(f){return t('faction'+f)}
function typeLabel(type){return type?t('type'+type):''}
function phoneCopy(){return LANG==='zh'?t('phoneDefault'):(C.phoneRule||t('phoneDefault'))}
function paymentNoteCopy(){return LANG==='zh'?t('paymentNoteDefault'):(C.paymentNote||t('paymentNoteDefault'))}

function bookingIsEnabled(){return C.bookingEnabled===true}
function bookingOpenMessage(){return LANG==='zh'?t('bookingPrelaunchTitle'):(C.bookingOpenText||t('bookingPrelaunchTitle'))}
function applyBookingMode(){
  const enabled=bookingIsEnabled();
  $('[data-i18n="bookNow"]').classList.toggle('hidden',!enabled);
  $('#refreshSlots').classList.toggle('hidden',!enabled);
  $('#slotGrid').classList.toggle('hidden',!enabled);
  $('#bookingPrelaunch').classList.toggle('hidden',enabled);
  $('[data-i18n="bookingDesc"]').classList.toggle('hidden',!enabled);
  $('[data-i18n="bookingTitle"]').textContent=enabled?t('bookingTitle'):bookingOpenMessage();
  if(!enabled){
    $('#cloudWarning').classList.add('hidden');
    $('#reserveBtn').disabled=true;
    if($('#reserveDialog').open)$('#reserveDialog').close();
  }
}

function applyLanguage(){
  document.documentElement.lang=LANG==='zh'?'zh-CN':'en';
  $$('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;if(I18N[LANG]?.[key]!=null)el.textContent=t(key)});
  $$('[data-i18n-placeholder]').forEach(el=>{el.placeholder=t(el.dataset.i18nPlaceholder)});
  $$('.lang-btn').forEach(b=>{const active=b.dataset.lang===LANG;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active?'true':'false')});
  $('#eventSubtitle').textContent=LANG==='zh'?t('heroSubtitle'):(C.eventSubtitle||t('heroSubtitle'));
  $('#roleTitle').textContent=LANG==='zh'?`认识 ${ROLES.length||12} 个角色。`:`Meet the ${ROLES.length||12} roles.`;
  $('#duration').textContent=`${C.durationMinutes||25} ${LANG==='zh'?'分钟':'min'}`;
  $('#durationHero').textContent=C.durationMinutes||25;
  $('#ticketHero').textContent=`${money(C.earlyBirdPrice||9.90)} / ${money(C.regularPrice||15)}`;
  $('#phoneRule').textContent=phoneCopy();
  $('#paymentNote').textContent=paymentNoteCopy();
  if(ROLES.length){renderRoles(ACTIVE_FILTER);fillFavoriteRoles()}
  if(SLOTS.length)renderSlots();
  if(LAST_STATUS&&$('#statusDialog').open)renderStatus(LAST_STATUS);
  if(HOLD&&$('#paymentDialog').open){$('#recipient').textContent=C.paymentRecipient||t('recipientDefault')}
  localStorage.setItem('final_bell_lang',LANG);
  applyBookingMode();
}
$$('[data-lang]').forEach(b=>b.addEventListener('click',()=>{LANG=b.dataset.lang;applyLanguage()}));

async function initInfo(){
  if(C.localApi){try{const r=await fetch('/api/public/settings');if(r.ok){const j=await r.json(),s=j.settings||{};Object.assign(C,{eventName:s.event_name,eventSubtitle:s.event_subtitle,eventDate:s.event_date,eventTime:s.event_time,venue:s.venue,ticketPrice:s.ticket_price,currency:s.currency,durationMinutes:s.duration_minutes,phoneRule:s.phone_rule,paymentNote:s.payment_note,contactText:s.contact_text,paymentQr:s.payment_qr||C.paymentQr})}}catch(e){console.warn('Local settings unavailable',e)}}
  document.title=C.eventName||'THE FINAL BELL';
  $('#eventName').textContent=C.eventName||'THE FINAL BELL';$('#brandName').textContent=C.eventName||'THE FINAL BELL';$('#eventDate').textContent=C.eventDate||'TBA';$('#eventTime').textContent=C.eventTime||'TBA';$('#venue').textContent=C.venue||'TBA';$('#earlyBirdAmount').textContent=money(C.earlyBirdPrice||9.90);$('#regularAmount').textContent=money(C.regularPrice||15);$('#recipient').textContent=C.paymentRecipient||t('recipientDefault');$('#contact').textContent=C.contactText||'';
  applyLanguage();
}

async function loadRoles(){try{if(C.localApi){const lr=await fetch('/api/public/roles',{cache:'no-store'});if(lr.ok){const lj=await lr.json();ROLES=lj.roles||[];renderRoles(ACTIVE_FILTER);fillFavoriteRoles();return}}const r=await fetch('./roles.json',{cache:'no-store'});ROLES=await r.json();renderRoles(ACTIVE_FILTER);fillFavoriteRoles()}catch(e){$('#roleGrid').innerHTML=`<div class="notice">${esc(t('roleUnavailable'))}</div>`}}
function renderRoles(f){$('#roleTitle').textContent=LANG==='zh'?`认识 ${ROLES.length} 个角色。`:`Meet the ${ROLES.length} roles.`;ACTIVE_FILTER=f;const rows=f==='ALL'?ROLES:ROLES.filter(r=>r.faction===f);$('#roleGrid').innerHTML=rows.map(r=>{const n=roleNames(r),c=roleCopy(r);return `<button type="button" class="role ${esc(r.faction)}" data-role-id="${Number(r.id)}"><span class="role-emoji">${esc(r.emoji)}</span><h3 class="role-name">${esc(n.main)}</h3>${n.sub?`<div class="role-subname">${esc(n.sub)}</div>`:''}<div class="role-meta"><span class="faction ${esc(r.faction)}">${esc(factionLabel(r.faction))}</span>${r.role_type?`<span class="role-type">${esc(typeLabel(r.role_type))}</span>`:''}</div><div class="role-ability"><strong>${esc(c.ability||r.ability_name)}</strong><span>${esc(LANG==='zh'?'点击查看完整技能':'Tap for full ability')}</span></div><span class="role-more">${esc(t('readRole'))} →</span></button>`}).join('');$$('[data-role-id]').forEach(b=>b.onclick=()=>openRole(Number(b.dataset.roleId)))}
function openRole(id){const r=ROLES.find(x=>Number(x.id)===id);if(!r)return;const n=roleNames(r),c=roleCopy(r),d=$('#roleDialog');d.classList.remove('GOOD','EVIL','INDEPENDENT');d.classList.add(r.faction);$('#roleDialogContent').innerHTML=`<div class="role-detail-top"><div class="role-detail-emoji">${esc(r.emoji)}</div><div><div class="role-meta"><span class="faction ${esc(r.faction)}">${esc(factionLabel(r.faction))}</span>${r.role_type?`<span class="role-type">${esc(typeLabel(r.role_type))}</span>`:''}</div><h3 class="role-detail-name">${esc(n.main)}</h3>${n.sub?`<div class="role-detail-sub">${esc(n.sub)}</div>`:''}</div></div><div class="role-detail-section"><h4>${esc(t('ability'))} · ${esc(c.ability||r.ability_name)}</h4><p>${esc(c.text||r.ability_text)}</p></div><div class="role-detail-section"><h4>${esc(t('winCondition'))}</h4><p>${esc(c.win||r.win_condition)}</p></div>`;d.showModal()}
function fillFavoriteRoles(){const s=$('#feedbackFavorite');if(!s)return;s.innerHTML=`<option value="">${esc(t('chooseOne'))}</option>`+ROLES.map(r=>{const n=roleNames(r);return `<option value="${esc(r.name)}">${esc(r.emoji+' '+n.main+(n.sub?' / '+n.sub:''))}</option>`}).join('')}
$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{$$('[data-filter]').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderRoles(b.dataset.filter)}));

function slotIsOpen(s){return Boolean(s)&&Number.isSafeInteger(Number(s.id))&&Number(s.id)>0&&Number.isFinite(Number(s.available))&&Number(s.available)>0&&![false,0,'false','0'].includes(s.active)&&(s.status==null||['upcoming','boarding','open'].includes(String(s.status).toLowerCase()))}
function renderSlots(){if(!bookingIsEnabled()){applyBookingMode();return}if(!SLOTS.length){$('#slotGrid').innerHTML=`<div class="notice">${esc(t('noSlots'))}</div>`;return}$('#slotGrid').innerHTML=SLOTS.map(s=>{const left=Number(s.available||0),open=slotIsOpen(s),full=Number.isFinite(left)&&left<=0;const seatText=!open?t(full?'full':'slotClosed'):(LANG==='zh'?`${left}${t('seatsLeft')}`:`${left} ${left===1?t('seatLeft'):t('seatsLeft')}`);const selected=open&&String(s.id)===$('#slotId').value;return `<article class="slot ${open?'':'full'}${selected?' is-selected':''}" data-slot-id="${esc(s.id)}" aria-disabled="${!open}"${selected?' aria-current="true"':''}><div><div class="eyebrow">${esc(t('round'))}</div><h3>${esc(s.start_time)}</h3><div class="seats slot-status">${esc(seatText)}</div>${s.notes?`<p class="muted">${esc(s.notes)}</p>`:''}<small class="price">${money(s.price)} ${esc(t('perPlayer'))}</small></div><button type="button" class="btn ${open?'primary':''}" ${open?'':'disabled'} data-reserve="${esc(s.id)}" aria-haspopup="dialog" aria-controls="reserveDialog">${esc(open?t('reserve'):t(full?'full':'slotClosed'))}</button></article>`}).join('')}
async function loadSlots(){if(!bookingIsEnabled()){applyBookingMode();return}if(!C.supabaseUrl||!C.publishableKey){SLOTS=[];$('#cloudWarning').textContent=t('notConfigured');$('#cloudWarning').classList.remove('hidden');$('#slotGrid').innerHTML='';return}try{const slots=await rpc('public_slot_availability',{});if(!Array.isArray(slots)||slots.some(s=>!s||typeof s!=='object'))throw Error(t('slotsLoadError'));SLOTS=slots;$('#cloudWarning').classList.add('hidden');renderSlots()}catch(e){SLOTS=[];$('#slotGrid').innerHTML=`<div class="notice warning" role="alert">${esc(t('slotsLoadError'))} ${esc(e.message||'')}</div>`}}
// Delegate to the persistent grid so the whole card and its native keyboard-
// accessible button work after every availability refresh or language change.
$('#slotGrid').addEventListener('click',e=>{const card=e.target.closest('[data-slot-id]');if(!card||!$('#slotGrid').contains(card))return;openReserve(Number(card.dataset.slotId))});
$('#refreshSlots').onclick=loadSlots;
function openReserve(id){if(!bookingIsEnabled())return;const s=SLOTS.find(x=>Number(x.id)===id);if(!slotIsOpen(s))return;$('#slotId').value=String(s.id);$('#reserveTitle').textContent=(LANG==='zh'?'预约 · ':'Reserve · ')+[s.event_date||s.date||C.eventDate,s.start_time].filter(Boolean).join(' · ');$('#reserveMsg').textContent='';$('#refundAgree').checked=false;$$('#slotGrid [data-slot-id]').forEach(card=>{const selected=card.dataset.slotId===String(s.id);card.classList.toggle('is-selected',selected);if(selected)card.setAttribute('aria-current','true');else card.removeAttribute('aria-current')});if(!$('#reserveDialog').open)$('#reserveDialog').showModal()}

function closeDialog(d){if(d?.open)d.close()}
$('#closeRole').onclick=()=>closeDialog($('#roleDialog'));
$('#closeGameFlow').onclick=()=>closeDialog($('#gameFlowDialog'));
$('#openGameFlow').onclick=()=>$('#gameFlowDialog').showModal();
$('#closeReserve').onclick=()=>closeDialog($('#reserveDialog'));
$('#closePayment').onclick=()=>closeDialog($('#paymentDialog'));
$('#closeStatus').onclick=()=>closeDialog($('#statusDialog'));
$('#closeFeedback').onclick=()=>closeDialog($('#feedbackDialog'));
$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d)d.close()}));

document.addEventListener('keydown',e=>{if(e.key==='Escape')$$('dialog[open]').forEach(d=>d.close())});

$('#reserveForm').addEventListener('submit',async e=>{e.preventDefault();if(!bookingIsEnabled()){$('#reserveMsg').textContent=bookingOpenMessage();return}if(!$('#refundAgree').checked){$('#reserveMsg').textContent=t('agreePolicy');return}const btn=$('#reserveBtn');btn.disabled=true;$('#reserveMsg').textContent=t('reserving');try{HOLD=await rpc('public_create_hold',{p_slot_id:Number($('#slotId').value),p_name:$('#name').value.trim(),p_contact:$('#contactInput').value.trim()});localStorage.setItem('final_bell_booking',JSON.stringify(HOLD));$('#reserveDialog').close();showPayment(HOLD);loadSlots()}catch(err){$('#reserveMsg').textContent=err.message}finally{btn.disabled=false}});

function showPayment(h){HOLD=h;$('#bookingRef').textContent=h.booking_ref;$('#amountDue').textContent=money(h.amount_due);$('#recipient').textContent=C.paymentRecipient||t('recipientDefault');$('#paymentNote').textContent=paymentNoteCopy();$('#paymentRef').value='';$('#paymentMsg').textContent='';if(C.paymentQr){$('#paymentQrWrap').innerHTML=`<img src="${esc(C.paymentQr)}" alt="Payment QR">`}else{$('#paymentQrWrap').innerHTML=`<div class="notice warning">${esc(t('paymentQrMissing'))}</div>`}startHoldTimer(h.expires_at);$('#paymentDialog').showModal()}
function startHoldTimer(exp){clearInterval(holdInterval);const tick=()=>{const sec=Math.max(0,Math.floor((new Date(exp).getTime()-Date.now())/1000));$('#holdTimer').textContent=`${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`;if(sec<=0){clearInterval(holdInterval);$('#paymentMsg').textContent=t('reservationExpired');$('#markPaid').disabled=true}};tick();holdInterval=setInterval(tick,1000);$('#markPaid').disabled=false}
$('#markPaid').onclick=async()=>{if(!HOLD)return;const ref=$('#paymentRef').value.trim();if(!ref){$('#paymentMsg').textContent=t('enterPaymentRef');return}const b=$('#markPaid');b.disabled=true;$('#paymentMsg').textContent=t('submittingPayment');try{await rpc('public_mark_paid',{p_booking_ref:HOLD.booking_ref,p_hold_token:HOLD.hold_token,p_payment_ref:ref});clearInterval(holdInterval);$('#paymentDialog').close();showStatus(await checkBooking());toast(t('paymentSubmitted'),'good');loadSlots()}catch(e){$('#paymentMsg').textContent=e.message;b.disabled=false}};
$('#cancelHold').onclick=async()=>{if(!HOLD)return;if(!confirm(t('cancelConfirm')))return;try{await rpc('public_cancel_hold',{p_booking_ref:HOLD.booking_ref,p_hold_token:HOLD.hold_token});localStorage.removeItem('final_bell_booking');HOLD=null;$('#paymentDialog').close();loadSlots();toast(t('reservationCancelled'))}catch(e){toast(e.message,'error')}};

async function checkBooking(){if(!HOLD)throw Error(t('noSavedBooking'));return rpc('public_check_booking',{p_booking_ref:HOLD.booking_ref,p_hold_token:HOLD.hold_token})}
function renderStatus(s){LAST_STATUS=s;const raw=String(s.status||'pending'),statusDisplay=LANG==='zh'?({pending:'待付款',awaiting_confirmation:'等待付款确认',paid:'已付款 / 已确认',rejected:'付款无法核实',cancelled:'已取消',refunded:'已退款'}[raw]||raw.replaceAll('_',' ')):raw.replaceAll('_',' ');let title=t('statusReceived');if(raw==='paid')title=t('statusConfirmed');if(raw==='rejected')title=t('statusRejected');if(raw==='cancelled')title=t('statusCancelled');if(raw==='refunded')title=t('statusRefunded');$('#statusTitle').textContent=title;let help='';if(raw==='pending')help=t('pendingHelp');if(raw==='awaiting_confirmation')help=t('awaitingHelp');if(raw==='paid')help=t('paidHelp');if(raw==='rejected')help=t('rejectedHelp');if(raw==='cancelled')help=t('cancelledHelp');if(raw==='refunded')help=t('refundedHelp');$('#statusBox').innerHTML=`<p><strong>${esc(s.booking_ref||HOLD?.booking_ref||'')}</strong></p><p>${esc(t('roundLabel'))}: ${esc(s.start_time||HOLD?.start_time||'')}</p><p>${esc(t('statusLabel'))}: <strong>${esc(statusDisplay)}</strong></p><p>${esc(t('amountStatusLabel'))}: ${money(s.amount_due||HOLD?.amount_due)}</p>${help?`<p class="muted">${esc(help)}</p>`:''}`;$('#leaveFeedback').classList.toggle('hidden',!s.feedback_eligible);$('#feedbackDone').classList.toggle('hidden',!s.feedback_submitted)}
function showStatus(s){renderStatus(s);if(!$('#statusDialog').open)$('#statusDialog').showModal()}
$('#checkAgain').onclick=async()=>{try{showStatus(await checkBooking())}catch(e){toast(e.message,'error')}};
$('#leaveFeedback').onclick=()=>{$('#statusDialog').close();openFeedback()};

const rb=$('#ratingBtns');rb.innerHTML=[1,2,3,4,5].map(n=>`<button type="button" class="btn rating-btn" data-rate="${n}" aria-label="${n} stars">${'★'.repeat(n)}</button>`).join('');$$('[data-rate]').forEach(b=>b.onclick=()=>{$('#feedbackRating').value=b.dataset.rate;$$('[data-rate]').forEach(x=>x.classList.toggle('primary',x===b))});
function openFeedback(){$('#feedbackMsg').textContent='';$('#feedbackDialog').showModal()}
$('#feedbackForm').onsubmit=async e=>{e.preventDefault();if(!HOLD){$('#feedbackMsg').textContent=t('missingBooking');return}const rating=Number($('#feedbackRating').value||0);if(rating<1||rating>5){$('#feedbackMsg').textContent=t('chooseRating');return}const btn=$('#feedbackSubmit');btn.disabled=true;$('#feedbackMsg').textContent=t('submitting');try{await rpc('public_submit_feedback',{p_booking_ref:HOLD.booking_ref,p_hold_token:HOLD.hold_token,p_rating:rating,p_difficulty:$('#feedbackDifficulty').value,p_duration:$('#feedbackDuration').value,p_favorite_role:$('#feedbackFavorite').value,p_would_pay_again:$('#feedbackPayAgain').value,p_comment:$('#feedbackComment').value.trim()});$('#feedbackDialog').close();const s=await checkBooking();showStatus(s);toast(t('feedbackReceived'),'good')}catch(err){$('#feedbackMsg').textContent=err.message}finally{btn.disabled=false}};

async function restoreBooking(){try{const raw=localStorage.getItem('final_bell_booking')||localStorage.getItem('halloween_booking');if(!raw)return;HOLD=JSON.parse(raw);localStorage.setItem('final_bell_booking',JSON.stringify(HOLD));const s=await checkBooking();if(s.error){localStorage.removeItem('final_bell_booking');localStorage.removeItem('halloween_booking');HOLD=null;return}if(s.status==='pending'&&HOLD.expires_at&&new Date(HOLD.expires_at)>new Date()){showPayment(HOLD)}else if(['awaiting_confirmation','paid','rejected','cancelled','refunded'].includes(s.status)){showStatus(s)}}catch(e){console.warn(e)}}

(async()=>{await initInfo();await loadRoles();await loadSlots();setInterval(loadSlots,30000);restoreBooking()})();
