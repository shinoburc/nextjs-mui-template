## Getting Started

### Proxy Settings

PowerShell

```powershell
$env:http_proxy="http://proxy.occ.co.jp:8080"
$env:https_proxy="http://proxy.occ.co.jp:8080"
```

Bash
```powershell
export http_proxy="http://proxy.occ.co.jp:8080"
export https_proxy="http://proxy.occ.co.jp:8080"
```

### clone and run

```powershell
git clone git@github.com:shinoburc/nextjs-mui-template.git
cd nextjs-mui-template
npm install
npx prisma migrate dev --name init
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- admin アカウント
  - Account: admin@ts.occ.co.jp
  - Password: admin
- user アカウント
  - Account: user@ts.occ.co.jp
  - Password: user

### DB関連の更新を行った場合

schema.prisma に model を追加・変更等した場合は
以下を実行して DB と prisma-client が生成する型を更新する。

`<マイグレーションに名前を付ける>` は任意の名前を付ける。

```powershell
npx prisma migrate dev --name <マイグレーションに名前を付ける>
npx prisma generate
```