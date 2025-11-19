let currentHls = null;

// 1. 推荐频道数据 (已去重并扁平化结构)
const channelList = [
  { name: "BBC世界(欧洲)", url: "https://viamotionhsi.netplus.ch/live/eds/bbcworld/browser-HLS8/bbcworld.m3u8" },
  { name: "美国广播公司-新闻(ABC)", url: "https://livetv-fa.tubi.video/abc-news/index.m3u8" },
  { name: "美国福克斯(FOX)", url: "https://fl1.moveonjoy.com/FOX/index.m3u8" },
  { name: "美国福克斯news(FOX)", url: "https://fl1.moveonjoy.com/FOX_NEWS_CHANNEL/index.m3u8" },
  { name: "BBC新闻(北美)", url: "https://fl1.moveonjoy.com/BBC_WORLD_NEWS/index.m3u8" },
  { name: "BBC新闻", url: "https://cdn4.skygo.mn/live/disk1/BBC_News/HLSv3-FTA/BBC_News.m3u8" },
  { name: "中国国际CGTN", url: "https://amg00405-rakutentv-cgtn-rakuten-i9tar.amagi.tv/master.m3u8" },
  { name: "美国广播公司(ABC)", url: "http://41.205.93.154/ABC/index.m3u8" },
  { name: "美国消费者新闻与商业频道(CNBC)", url: "https://fl1.moveonjoy.com/CNBC/index.m3u8" },
  { name: "(CNBC-world)", url: "https://fl1.moveonjoy.com/CNBC_World/index.m3u8" },
  { name: "安顺新闻频道", url: "https://hplayer1.juyun.tv/camera/154379194.m3u8" },
  { name: "cctv+", url: "https://cd-live-stream.news.cctvplus.com/live/smil:CHANNEL1.smil/playlist.m3u8" },
  { name: "CBS News Los Angeles", url: "https://cbsn-la.cbsnstream.cbsnews.com/out/v1/57b6c4534a164accb6b1872b501e0028/master.m3u8" }
];

/**
 * 根据URL查找频道名称
 * 优化：使用 Array.find 替代 for 循环
 */
function findNameByUrl(url) {
  const channel = channelList.find(ch => ch.url === url);
  return channel ? channel.name : "...";
}

/**
 * 自定义提示框
 */
function new_alert(message, duration = 3000) {
  const $alertBox = $('<div>').text(message).css({
    position: 'fixed', top: '10%', left: '50%', transform: 'translate(-50%, -50%)',
    padding: '20px 30px', backgroundColor: '#333', color: '#fff',
    border: '1px solid #555', borderRadius: '8px', boxShadow: '0 2px 15px rgba(0,0,0,0.3)',
    zIndex: '9999', fontFamily: 'Arial, sans-serif', fontSize: '16px',
    cursor: 'pointer', opacity: '1', transition: 'opacity 0.3s ease'
  });

  $('body').append($alertBox);

  const closeAlert = () => {
    $alertBox.css('opacity', '0');
    setTimeout(() => $alertBox.remove(), 300);
  };

  const timer = setTimeout(closeAlert, duration);

  $alertBox.on('click', () => {
    clearTimeout(timer);
    closeAlert();
  });
}

// 页面加载完毕
$(function () {
  const $videoPlayer = $('#video-player');
  const $m3u8Input = $('#m3u8-url');

  // --- 核心功能模块 ---

  // 初始化频道列表
  function initChannels() {
    const $channelList = $('#channel-list').empty();
    
    // 使用 map 生成 HTML 字符串再一次性 append，性能略优
    const items = channelList.map(channel => {
      return $('<li>').addClass('channel-item')
        .html(`<span class="channel-icon">📡</span><span class="channel-name">${channel.name}</span>`)
        .on('click', () => {
          $m3u8Input.val(channel.url);
          playStream(channel.url);
        });
    });
    
    $channelList.append(items);
  }

  // 主题管理
  function loadTheme() {
    const savedTheme = localStorage.getItem('themePreference') || 'dark';
    setTheme(savedTheme);
  }

  function toggleTheme() {
    const currentTheme = $('html').attr('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  function setTheme(theme) {
    $('html').attr('data-theme', theme);
    $('#theme-icon').text(theme === 'light' ? '🌙' : '☀️');
    localStorage.setItem('themePreference', theme);
  }

  // 历史记录管理
  function loadHistory() {
    const history = JSON.parse(localStorage.getItem('playHistory')) || [];
    const $historyList = $('#history-list').empty();

    if (history.length === 0) {
      $historyList.html('<div class="empty-state"><div class="empty-state-icon">📭</div><div>暂无播放记录</div></div>');
      return;
    }

    history.forEach((url, index) => {
      const $li = $('<li>').html(`
        <span class="url-text" title="${url}">${url}</span>
        <button class="history-delete">删除</button>
      `);

      $li.on('click', (e) => {
        // 如果点击的是删除按钮，不触发播放
        if ($(e.target).hasClass('history-delete')) return;
        playStream(url);
      });

      $li.find('.history-delete').on('click', (e) => {
        e.stopPropagation(); // 阻止冒泡
        deleteHistoryItem(index);
      });

      $historyList.append($li);
    });
  }

  function updateHistory(url) {
    let history = JSON.parse(localStorage.getItem('playHistory')) || [];
    // 移除已存在的相同URL（去重），放到最前面
    history = history.filter(item => item !== url);
    history.unshift(url);
    
    if (history.length > 10) history.pop(); // 保持最近10条

    localStorage.setItem('playHistory', JSON.stringify(history));
    loadHistory();
  }

  function deleteHistoryItem(index) {
    const history = JSON.parse(localStorage.getItem('playHistory')) || [];
    history.splice(index, 1);
    localStorage.setItem('playHistory', JSON.stringify(history));
    loadHistory();
  }

  function clearHistory() {
    if (confirm('确定要清空所有播放历史吗？')) {
      localStorage.removeItem('playHistory');
      loadHistory();
    }
  }

  // 播放器状态更新
  function updateStatus(status, isActive = false) {
    $('#status-text').text(status);
    $('#status-dot').toggleClass('active', isActive);
  }

  // 核心播放逻辑
  function playStream(url = null) {
    const videoUrl = url || $m3u8Input.val().trim();
    const videoEl = $videoPlayer[0];

    if (!videoUrl) {
      alert("请输入视频链接！");
      return;
    }

    // 重置播放器
    if (currentHls) {
      currentHls.destroy();
      currentHls = null;
    }

    updateStatus('正在加载...', false);
    $('#current-url').text(videoUrl);
    $('#status-name').text(findNameByUrl(videoUrl));

    // HLS.js 支持
    if (Hls.isSupported()) {
      currentHls = new Hls();
      currentHls.loadSource(videoUrl);
      currentHls.attachMedia(videoEl);

      currentHls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('流媒体加载成功！');
        updateStatus('播放中', true);
        videoEl.play().catch(e => console.warn("自动播放被阻止:", e));
      });

      currentHls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS Error:', data);
        if (data.fatal) {
           updateStatus('加载失败', false);
           new_alert('加载流媒体时发生错误，请检查链接或网络连接。');
        }
      });
    } 
    // 原生 HLS 支持 (Safari 等)
    else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
      videoEl.src = videoUrl;
      videoEl.addEventListener('loadedmetadata', () => {
        updateStatus('播放中', true);
        videoEl.play();
      });
      videoEl.addEventListener('error', () => updateStatus('加载失败', false));
    } 
    else {
      updateStatus('不支持', false);
      alert("您的浏览器不支持播放该流媒体！");
      return;
    }

    updateHistory(videoUrl);
  }

  // --- 初始化与事件绑定 ---

  loadTheme();
  loadHistory();
  initChannels();

  // 按钮事件
  $('#theme-toggle').on('click', toggleTheme);
  $('#play-btn').on('click', () => playStream());
  $('#clear-btn').on('click', () => $m3u8Input.val('').focus());
  $('#clear-history-btn').on('click', clearHistory);

  // 输入框回车事件
  $m3u8Input.on('keypress', (e) => {
    if (e.which === 13) playStream();
  });

  // 视频播放器原生事件监听
  $videoPlayer
    .on('play', () => updateStatus('播放中', true))
    .on('pause', () => updateStatus('已暂停', false))
    .on('ended', () => updateStatus('播放完成', false));

  // 侧边栏/汉堡菜单
  const $sidebar = $('.sidebar');
  const $overlay = $('.sidebar-overlay');
  
  $('.menu-toggle').on('click', () => {
    $sidebar.addClass('active');
    $overlay.addClass('active');
  });

  $overlay.on('click', () => {
    $sidebar.removeClass('active');
    $overlay.removeClass('active');
  });
});