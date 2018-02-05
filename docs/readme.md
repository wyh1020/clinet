#### npm包安装后，启动时报dll找不到的错误

npm install --global windows-build-tools

Run electron rebuild .\node_modules\.bin\electron-rebuild.cmd

#### 为了避免windows上的换行符的问题

提交时转换为LF，检出时不转换

git config --global core.autocrlf input 

#### npm安装出错
不要用npm install，用yarn add 或 yarn 

删除 node_modules/目录，重新yarn

npm cache verify

npm cache clean

#### 开发注意
在git pull后，git push前，必须执行npm run test 和npm run build，确保没有错误。
