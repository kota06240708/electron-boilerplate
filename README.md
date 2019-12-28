# electron-boilerplate

## Overview

webpack v4 (TypeScript + React)

- [**webpack**](https://github.com/webpack/webpack)
  - [TypeScript](https://github.com/microsoft/TypeScript)
  - [React](https://github.com/facebook/react)

## Installing

yarn を使うので下記に従い yarn インストールしてください。

```bash
$ brew install yarn
```

## Building

### 依存モジュールをインストール。

```bash
$ yarn install
```

### 開発開始

```bash
$ yarn start
```

### 本番環境生成

```bash
$ yarn prod
```

### 本番環境デバック

```bash
$ yarn browser
```

### アプリ化

```bash
$ yarn package
```

## Structure

```sh
.
├── @type          # 全体共通の型
├── dist           # 吐き出し先フォルダ
└── src            # 実際に手を動かすフォルダ
```
