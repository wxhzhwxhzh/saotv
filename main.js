

// 推荐频道数据
const channels = {
  "channels": [
    {
      "name": "BBC世界(欧洲)",
      "url": "https://viamotionhsi.netplus.ch/live/eds/bbcworld/browser-HLS8/bbcworld.m3u8"
    },
    {
      "name": "美国广播公司-新闻(ABC)",
      "url": "https://livetv-fa.tubi.video/abc-news/index.m3u8"
    },
    {
      "name": "美国福克斯(FOX)",
      "url": "https://fl1.moveonjoy.com/FOX/index.m3u8"
    },
    {
      "name": "美国福克斯news(FOX)",
      "url": "https://fl1.moveonjoy.com/FOX_NEWS_CHANNEL/index.m3u8"
    },
    {
      "name": "BBC新闻(北美)",
      "url": "https://fl1.moveonjoy.com/BBC_WORLD_NEWS/index.m3u8"
    },
    {
      "name": "BBC新闻",
      "url": "https://cdn4.skygo.mn/live/disk1/BBC_News/HLSv3-FTA/BBC_News.m3u8"
    },
    {
      "name": "中国国际CGTN",
      "url": "https://amg00405-rakutentv-cgtn-rakuten-i9tar.amagi.tv/master.m3u8"
    },
    {
      "name": "美国广播公司(ABC)",
      "url": "http://41.205.93.154/ABC/index.m3u8"
    },
    {
      "name": "美国消费者新闻与商业频道(CNBC)",
      "url": "https://fl1.moveonjoy.com/CNBC/index.m3u8"
    },
    {
      "name": "(CNBC-world)",
      "url": "https://fl1.moveonjoy.com/CNBC_World/index.m3u8"
    },
    {
      "name": "CBS News Los Angeles",
      "url": "https://cbsn-la.cbsnstream.cbsnews.com/out/v1/57b6c4534a164accb6b1872b501e0028/master.m3u8"
    }
  ]
}

function findNameByUrl(url) {
  // 遍历channels数组
  for (const channel of channels.channels) {
    // 比较url是否匹配（严格相等）
    if (channel.url === url) {
      return channel.name; // 找到则返回对应的name
    }
  }
  return "..."; // 未找到返回null或提示信息
}


function new_alert(message, duration = 3000) {
    // 创建弹窗元素
    const $alertBox = $('<div>')
        .text(message)
        .css({
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px 30px',
            backgroundColor: '#333', // 暗色背景
            color: '#fff', // 白色字体
            border: '1px solid #555',
            borderRadius: '8px',
            boxShadow: '0 2px 15px rgba(0,0,0,0.3)',
            zIndex: '9999',
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            cursor: 'pointer',
            opacity: '1',
            transition: 'opacity 0.3s ease'
        });

    // 添加到页面
    $('body').append($alertBox);

    // 自动关闭定时器
    const timer = setTimeout(() => {
        closeAlert($alertBox);
    }, duration);

    // 手动点击关闭
    $alertBox.on('click', () => {
        clearTimeout(timer);
        closeAlert($alertBox);
    });

    // 关闭提示框的辅助函数
    function closeAlert($el) {
        $el.css('opacity', '0');
        setTimeout(() => {
            $el.remove();
        }, 300);
    }
}