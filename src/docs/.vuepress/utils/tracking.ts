/**
 * 用户来源追踪工具
 * 用于记录用户进入网站时的referer信息
 */

// 追踪API配置
const TRACKING_API_URL = 'https://analysis.zeusai.top/';

/**
 * 获取用户来源referer
 * @returns {string} referer值，如果没有则返回'direct'
 */
function getReferer(): string {
  // 尝试从URL参数中获取referer（最高优先级）
  const urlParams = new URLSearchParams(window.location.search);
  const urlReferer = urlParams.get('referer') || urlParams.get('ref');
  
  if (urlReferer) {
    return urlReferer;
  }
  
  // 检查document.referrer
  const documentReferer = document.referrer;
  
  // 如果没有referrer，说明是直接访问
  if (!documentReferer) {
    return 'direct';
  }
  
  // 如果是网站内跳转，返回internal
  if (isInternalReferrer(documentReferer)) {
    return 'internal';
  }
  
  // 外部来源
  return documentReferer;
}

/**
 * 检查是否为网站内跳转
 * @param {string} referrer - referrer URL
 * @returns {boolean} 是否为网站内跳转
 */
function isInternalReferrer(referrer: string): boolean {
  try {
    const referrerUrl = new URL(referrer);
    const currentUrl = new URL(window.location.href);
    
    // 比较域名，忽略协议和端口
    return referrerUrl.hostname === currentUrl.hostname;
  } catch (error) {
    // 如果URL解析失败，认为是外部来源
    return false;
  }
}

/**
 * 检测访问类型
 * @returns {string} 访问类型：'direct' | 'external' | 'internal'
 * 
 * 判断逻辑：
 * 1. direct: 直接访问网站（无referrer）
 * 2. external: 从其他网站跳转过来（有referrer且域名不同）
 * 3. internal: 网站内跳转（有referrer且域名相同）
 */
function detectAccessType(): string {
  // 检查是否有URL参数中的referer
  const urlParams = new URLSearchParams(window.location.search);
  const urlReferer = urlParams.get('referer') || urlParams.get('ref');
  
  if (urlReferer) {
    return 'external'; // 有URL参数，说明是外部来源
  }
  
  // 检查document.referrer
  const documentReferer = document.referrer;
  
  // 如果没有referrer，说明是直接访问
  if (!documentReferer) {
    return 'direct';
  }
  
  // 如果是网站内跳转
  if (isInternalReferrer(documentReferer)) {
    return 'internal';
  }
  
  // 外部来源
  return 'external';
}

/**
 * 发送追踪数据到API
 * @param {string} referer - 用户来源，将以 from 字段发送
 * 同时发送当前页面 URL，作为 to 字段
 */
function sendTrackingData(referer: string): void {
  try {
    const payload = {
      from: referer,
      to: window.location.href,
    };
    const data = JSON.stringify(payload);
    const success = navigator.sendBeacon(TRACKING_API_URL, data);
    
    if (success) {
      console.log('追踪数据发送成功:', payload);
    } else {
      console.warn('追踪数据发送失败');
    }
  } catch (error) {
    console.error('追踪数据发送错误:', error);
  }
}


/**
 * 执行用户来源追踪
 * 获取referer并发送到API
 */
export function trackUserReferer(): void {
  const accessType = detectAccessType();
  const referer = getReferer();
  
  // 发送追踪数据
  sendTrackingData(referer);
  
  console.log(`用户来源追踪完成: ${accessType} - ${referer}`);
}

/**
 * 检查是否已经发送过追踪数据
 * 避免重复发送
 */
function hasTracked(): boolean {
  return sessionStorage.getItem('tracking_sent') === 'true';
}

/**
 * 标记已发送追踪数据
 */
function markAsTracked(): void {
  try {
    sessionStorage.setItem('tracking_sent', 'true');
  } catch (error) {
    console.warn('无法标记追踪状态:', error);
  }
}

/**
 * 执行一次性的用户来源追踪
 * 确保每个会话只发送一次追踪数据
 */
export function trackUserRefererOnce(): void {
  if (hasTracked()) {
    console.log('追踪数据已发送，跳过');
    return;
  }
  
  trackUserReferer();
  markAsTracked();
}
