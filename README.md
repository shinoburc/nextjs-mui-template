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