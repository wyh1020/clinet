#### npm包安装后，启动时报dll找不到的错误

npm install --global windows-build-tools

Run electron rebuild .\node_modules\.bin\electron-rebuild.cmd

#### 为了避免windows上的换行符的问题

提交时转换为LF，检出时不转换

git config --global core.autocrlf input 