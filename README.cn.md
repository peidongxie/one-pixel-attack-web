# 像素攻击Web端

“像素攻击”是一个对抗攻击工具。本项目是它的前端。

## 内容列表

- [特性](#特性)
- [使用说明](#使用说明)
- [参考资料](#参考资料)
- [使用许可](#使用许可)

## 特性

- 响应式布局
- PWA
- 轻量级

## 使用说明

本地构建

``` shell script
yarn build
```

本地启动

``` shell script
yarn start
```

项目部署

``` shell script
yarn deploy
```

在index.html中，\<head\>元素内部的\<script\>元素是用来实现根据访问者的ip地址在不同站点间切换的功能。大部分情况下，这是不必要的，你可以将它们移除。

## 参考资料

- 论文： [One Pixel Attack for Fooling Deep Neural Networks](https://ieeexplore.ieee.org/document/8601309)
- 项目： [one-pixel-attack-keras](https://github.com/Hyperparticle/one-pixel-attack-keras)
- Tensorflow教程： [Convolutional Neural Network](https://www.tensorflow.org/tutorials/images/cnn)

## 使用许可

[MIT](LICENSE) © Peidong Xie
