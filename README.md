# HM10-Ionic

HM-10モジュールに対してionic/react 実機iOSからBluetooth通信を行い、データの送受信を行う

## 開発環境

- Mac Studio(M1 MAX 2022)
- macOS Ventra 13.4
- XCode 14.3.1
- nodejs v20.0.0
- react@18.2.0
- ionic/react@7.0.0
- capacitor@5.0.4

## iosデバック

### [ライブリロード](https://ionicframework.com/docs/cli/livereload)

プロジェクトフォルダのターミナルで以下を実行
`ionic capacitor run ios -l --external`
xcodeを以下で開き、使用する実機端末を選んでデバック開始
`npx cap ope ios`

## プラグイン(capacitor)

### [BLE](https://ionicframework.com/docs/v5/native/ble)

インストールコマンド

```
npm install cordova-plugin-ble-central 
npm install @awesome-cordova-plugins/ble 
ionic cap sync
```

参考プロジェクト
[https://github.com/satujamsaja/hm10-rgb-led-control](https://github.com/satujamsaja/hm10-rgb-led-control)
