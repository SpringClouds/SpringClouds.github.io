// ========== 互动留言板块 ==========

// 留言数据存储
let comments = JSON.parse(localStorage.getItem('comments') || '[]');
let currentUser = localStorage.getItem('currentUser') || null;

// 初始化留言板
function initComment() {
    const loginPrompt = document.getElementById('login-prompt');
    const commentForm = document.getElementById('comment-form');
    const userName = document.getElementById('user-name');
    const userAvatar = document.getElementById('user-avatar');
    
    console.log('initComment 执行，当前用户:', currentUser);
    
    if (!loginPrompt) {
        console.log('未找到 login-prompt 元素');
        return;
    }
    
    if (currentUser) {
        // 已登录状态
        console.log('已登录，显示留言表单');
        loginPrompt.style.display = 'none';
        commentForm.style.display = 'block';
        if (userName) userName.textContent = currentUser;
        // 可选：设置用户头像
        if (userAvatar) {
            userAvatar.src = 'https://img.icons8.com/color/48/000000/user.png';
        }
    } else {
        // 未登录状态
        console.log('未登录，显示登录提示');
        loginPrompt.style.display = 'block';
        commentForm.style.display = 'none';
    }
    renderComments();
}

// 显示登录弹窗
function showLoginModal() {
    document.getElementById('login-modal').style.display = 'flex';
}

// 关闭登录弹窗
function closeLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
}

// 登录/注册
function doLogin() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    
    if (!username) {
        alert('请输入用户名');
        return;
    }
    
    currentUser = username;
    localStorage.setItem('currentUser', currentUser);
    
    closeLoginModal();
    initComment();  // 重新初始化留言板
    
    // 显示欢迎提示
    const toast = document.createElement('div');
    toast.textContent = `欢迎回来，${username}！`;
    toast.style.cssText = 'position: fixed; bottom: 100px; right: 20px; background: #8B1A1A; color: white; padding: 10px 20px; border-radius: 8px; z-index: 10001;';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
    
    // 同时更新导航栏
    if (typeof updateNavButtons === 'function') {
        updateNavButtons();
    }
}

// 退出登录（供导航栏调用）
function logout() {
    if (confirm('确定要退出登录吗？')) {
        currentUser = null;
        localStorage.removeItem('currentUser');
        initComment();  // 重新初始化留言板
        // 更新导航栏
        if (typeof updateNavButtons === 'function') {
            updateNavButtons();
        }
        alert('已退出登录');
        // 刷新页面可选
        // location.reload();
    }
}

// 提交留言
function submitComment() {
    if (!currentUser) {
        alert('请先登录！');
        showLoginModal();
        return;
    }
    
    const content = document.getElementById('comment-content').value.trim();
    
    if (!content) {
        alert('请输入留言内容');
        return;
    }
    
    const newComment = {
        id: Date.now(),
        username: currentUser,
        content: content,
        time: new Date().toLocaleString(),
        avatar: 'https://img.icons8.com/color/48/000000/user.png'
    };
    
    comments.unshift(newComment);
    localStorage.setItem('comments', JSON.stringify(comments));
    
    // 清空输入框
    document.getElementById('comment-content').value = '';
    
    // 重新渲染留言列表
    renderComments();
    
    alert('留言发布成功！');
}

// 删除留言
function deleteComment(id) {
    if (!confirm('确定要删除这条留言吗？')) return;
    
    comments = comments.filter(c => c.id !== id);
    localStorage.setItem('comments', JSON.stringify(comments));
    renderComments();
}

// 渲染留言列表
function renderComments() {
    const container = document.getElementById('comments-container');
    
    if (!container) return;
    
    if (comments.length === 0) {
        container.innerHTML = '<p style="color: #B87C4E; text-align: center; padding: 40px;">暂无留言，快来抢沙发！</p>';
        return;
    }
    
    let html = '';
    for (let i = 0; i < comments.length; i++) {
        const c = comments[i];
        const isOwner = currentUser === c.username;
        
        html += `
            <div style="background: #fffaf0; border-radius: 16px; padding: 20px; margin-bottom: 18px; border-left: 4px solid #D4AF37;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <img src="${c.avatar}" style="width: 44px; height: 44px; border-radius: 50%; border: 2px solid #D4AF37;">
                        <div>
                            <strong style="color: #8B1A1A; font-size: 16px;">${escapeHtml(c.username)}</strong>
                            <p style="color: #B87C4E; font-size: 12px; margin-top: 4px;">${c.time}</p>
                        </div>
                    </div>
                    ${isOwner ? `<button onclick="deleteComment(${c.id})" style="background: none; border: none; color: #B87C4E; cursor: pointer; font-size: 18px; padding: 5px;" title="删除">🗑️</button>` : ''}
                </div>
                <p style="color: #4a3b2a; line-height: 1.7; margin-top: 8px; font-size: 15px;">${escapeHtml(c.content).replace(/\n/g, '<br>')}</p>
            </div>
        `;
    }
    container.innerHTML = html;
}

// 防止XSS攻击
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成，初始化留言板');
    // 重新获取当前用户（确保最新）
    currentUser = localStorage.getItem('currentUser') || null;
    if (document.getElementById('comment-section')) {
        initComment();
    }
});

// 暴露全局函数供HTML调用
window.showLoginModal = showLoginModal;
window.closeLoginModal = closeLoginModal;
window.doLogin = doLogin;
window.submitComment = submitComment;
window.deleteComment = deleteComment;
window.logout = logout;