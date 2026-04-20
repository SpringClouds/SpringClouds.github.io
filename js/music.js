// ========== 音乐播放器（支持默认音乐、歌单、本地上传 + 音量控制） ==========
document.addEventListener('DOMContentLoaded', function() {
    // ========== 内置歌单（古风音乐） ==========
    const playlist = [
        {
            name: 'Guita',
            url: 'music/jita.mp3',
            cover: 'https://img.icons8.com/fluency/96/000000/music.png'
        },
        {
            name: 'Pleasure',
            url: 'music/huankuai.mp3',
            cover: 'https://img.icons8.com/fluency/96/000000/music.png'
        },
        {
            name: 'BGM',
            url: 'music/bgm.mp3',
            cover: 'https://img.icons8.com/fluency/96/000000/music.png'
        },
        {
            name: 'Guita',
            url: 'music/jita.mp3',
            cover: 'https://img.icons8.com/fluency/96/000000/music.png'
        }
    ];

    // DOM 元素
    const musicFileInput = document.getElementById('musicFile');
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('musicPrevBtn');
    const nextBtn = document.getElementById('musicNextBtn');
    const musicStatus = document.getElementById('musicStatus');
    const musicName = document.getElementById('musicName');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    const volumeSlider = document.getElementById('volumeSlider'); // 音量滑块

    // 播放器状态
    let audio = null;
    let isPlaying = false;
    let currentPlaylist = [...playlist];
    let currentIndex = 0;
    let isLocalMusic = false;

    // ========== 初始化默认音频 ==========
    function initDefaultAudio() {
        if (audio) {
            audio.pause();
            audio = null;
        }
        audio = new Audio(currentPlaylist[currentIndex].url);
        audio.loop = false;
        audio.volume = 0.8; // 默认音量 80%
        updateMusicDisplay();
        
        audio.addEventListener('ended', function() {
            if (!isLocalMusic) playNext();
        });
    }

    // ========== 音量控制 ==========
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function() {
            if (audio) audio.volume = this.value / 100;
        });
    }

    // ========== 更新界面显示 ==========
    function updateMusicDisplay() {
        if (musicName) musicName.textContent = currentPlaylist[currentIndex].name;
        if (musicStatus) {
            musicStatus.textContent = isLocalMusic ? '🎵 本地音乐' : `🎵 ${currentPlaylist[currentIndex].name}`;
        }
        const coverImg = document.querySelector('.cover-img');
        if (coverImg && currentPlaylist[currentIndex].cover) {
            coverImg.src = currentPlaylist[currentIndex].cover;
        }
    }

    // ========== 播放音乐 ==========
    function playMusic() {
        if (!audio) initDefaultAudio();
        audio.play().then(() => {
            isPlaying = true;
            if (playIcon) playIcon.style.display = 'none';
            if (pauseIcon) pauseIcon.style.display = 'block';
        }).catch(err => console.warn('播放失败:', err));
    }

    // ========== 暂停音乐 ==========
    function pauseMusic() {
        if (audio) {
            audio.pause();
            isPlaying = false;
            if (playIcon) playIcon.style.display = 'block';
            if (pauseIcon) pauseIcon.style.display = 'none';
        }
    }

    // ========== 切换歌曲 ==========
    function playSong(index) {
        if (index < 0) index = currentPlaylist.length - 1;
        if (index >= currentPlaylist.length) index = 0;
        currentIndex = index;
        const wasPlaying = isPlaying;
        if (audio) audio.pause();
        
        audio = new Audio(currentPlaylist[currentIndex].url);
        audio.loop = false;
        audio.volume = volumeSlider ? volumeSlider.value / 100 : 0.8; // 保持音量
        
        audio.addEventListener('ended', () => { if (!isLocalMusic) playNext(); });
        updateMusicDisplay();
        
        if (wasPlaying) {
            audio.play().then(() => {
                isPlaying = true;
                if (playIcon) playIcon.style.display = 'none';
                if (pauseIcon) pauseIcon.style.display = 'block';
            }).catch(err => console.warn('播放失败:', err));
        }
    }

    // ========== 上一首 / 下一首 ==========
    function playPrev() { if (isLocalMusic) { switchToDefaultPlaylist(); return; } playSong(currentIndex - 1); }
    function playNext() { if (isLocalMusic) { switchToDefaultPlaylist(); return; } playSong(currentIndex + 1); }

    // ========== 切换回默认歌单 ==========
    function switchToDefaultPlaylist() {
        if (isLocalMusic) {
            if (audio) audio.pause();
            isLocalMusic = false;
            currentPlaylist = [...playlist];
            currentIndex = 0;
            initDefaultAudio();
            if (isPlaying) audio.play().catch(() => {});
            updateMusicDisplay();
        }
    }

    // ========== 加载本地音乐 ==========
    function loadLocalMusic(file) {
        if (!file || !file.type.includes('audio')) return;
        const audioUrl = URL.createObjectURL(file);
        if (audio) audio.pause();
        
        audio = new Audio(audioUrl);
        audio.volume = volumeSlider ? volumeSlider.value / 100 : 0.8;
        isLocalMusic = true;
        isPlaying = false;
        
        currentPlaylist = [{
            name: file.name.replace(/\.[^/.]+$/, ''),
            url: audioUrl,
            cover: 'https://img.icons8.com/fluency/96/000000/music.png'
        }];
        currentIndex = 0;
        
        if (musicName) musicName.textContent = file.name;
        if (musicStatus) musicStatus.textContent = '🎵 本地音乐';
        if (playIcon) playIcon.style.display = 'block';
        if (pauseIcon) pauseIcon.style.display = 'none';
        
        const coverImg = document.querySelector('.cover-img');
        if (coverImg) coverImg.src = 'https://img.icons8.com/fluency/96/000000/music.png';
        
        audio.addEventListener('ended', () => {
            if (isLocalMusic) {
                switchToDefaultPlaylist();
                if (isPlaying) playMusic();
            }
        });
    }

    // ========== 事件绑定 ==========
    if (playBtn) playBtn.addEventListener('click', () => isPlaying ? pauseMusic() : playMusic());
    if (prevBtn) prevBtn.addEventListener('click', playPrev);
    if (nextBtn) nextBtn.addEventListener('click', playNext);
    if (musicFileInput) musicFileInput.addEventListener('change', e => loadLocalMusic(e.target.files[0]));

    // 初始化
    initDefaultAudio();

    // 首次点击自动播放
    let autoPlayAttempted = false;
    function tryAutoPlay() {
        if (!autoPlayAttempted && audio) {
            audio.play().then(() => {
                isPlaying = true;
                if (playIcon) playIcon.style.display = 'none';
                if (pauseIcon) pauseIcon.style.display = 'block';
            }).catch(() => {
                if (musicStatus) musicStatus.textContent = '点击播放按钮开始欣赏古风音乐';
            });
            autoPlayAttempted = true;
        }
    }
    document.body.addEventListener('click', tryAutoPlay, { once: true });
});