const textarea = document.getElementById('markdown-input');
const preview = document.getElementById('preview');
const saveButton = document.getElementById('save-btn');

const defaultContent = `# 欢迎使用令爷 Markdown 一页笔记




## 任务列表示例
- [x] 创建 Markdown 笔记应用
- [ ] 添加更多功能
- [ ] 优化设计

## 超链接示例
查看 [Markdown 指南](https://www.markdown.xyz/basic-syntax/) 了解更多 Markdown 语法！


## 表格示例
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容1 | 内容2 | 内容3 |
| 内容4 | 内容5 | 内容6 |



## Mermaid 图表示例
\`\`\`mermaid
graph TD
    A[开始] --> B{是否有问题?}
    B -- 是 --> C[解决问题]
    B -- 否 --> D[完成]
    C --> D
\`\`\`










## 代码块示例（Python）
\`\`\`python
def hello_world():
    print("Hello, World!")

hello_world()
\`\`\`


开始编辑这个笔记或创建你自己的笔记吧！

`;

// 配置 marked
marked.setOptions({
    highlight: function(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-'
});

// 从服务器加载笔记内容
fetch('note.php')
    .then(response => response.text())
    .then(data => {
        textarea.value = data || defaultContent;
        updatePreview();
        adjustTextareaHeight();
    })
    .catch(error => {
        console.error('加载笔记失败:', error);
        textarea.value = defaultContent;
        updatePreview();
        adjustTextareaHeight();
    });

textarea.addEventListener('input', () => {
    updatePreview();
    adjustTextareaHeight();
});

saveButton.addEventListener('click', () => {
    fetch('note.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'content=' + encodeURIComponent(textarea.value),
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => {
        console.error('保存笔记失败:', error);
        alert('保存笔记失败，请稍后再试。');
    });
});

function updatePreview() {
    let content = marked.parse(textarea.value);
    preview.innerHTML = content;
    
    // 渲染 Mermaid 图表
    mermaid.init(undefined, document.querySelectorAll('.language-mermaid'));
}

function adjustTextareaHeight() {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    preview.style.height = textarea.style.height;
}

// 初始化 Mermaid
mermaid.initialize({ startOnLoad: true });

// 窗口大小改变时调整高度
window.addEventListener('resize', adjustTextareaHeight);
