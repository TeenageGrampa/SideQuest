# react-dice-roller
> A react component allowing you to render a dice on the screen with which the user can interact.

[![npm version](https://badge.fury.io/js/react-dice-roller.svg)](https://badge.fury.io/js/react-dice-roller)
![NPM](https://img.shields.io/npm/l/react-dice-roller.svg)

## Install - NPM

```bash
npm i react-dice-roller
```

## Install - Yarn

```bash
yarn add react-dice-roller
```


## Usage

Adding a dice to your page is pretty easy, just import it and define the number of sides.

```js
# react-dice-roller
import ReactDice from 'react-dice-roller';

<ReactDice size={20} /> 
<ReactDice size={12} />
<ReactDice size={10} />
<ReactDice size={8} />
<ReactDice size={6} />
<ReactDice size={4} />
```

### Customize

You can customize several feature of the dice.

#### Progress bar
*Default: false*

You can render a progress bar on the top of the dice, by setting the property `showProgress` to true.

```js
<ReactDice size={6} showProgress  />
```
You can also customize the styling of this progress bar, by passing a class to the property `progressClassName`. Be aware, the width is set programmaticaly, so you should not define it in the class.

#### Roll duration
*Default: 2 (seconds)*

You can change the time the roll needs to finish, by setting the `` property. This value is in seconds and animates several cycles that start of fast and slowly end in the final value in the time set here.

```js
<ReactDice size={6} rollSeconds={3}  />
```

### Styling

There is a default styling rendering a black and white dice with a gray and white overlay. Which you can customize any way you want, by passing in the following classes:

`diceClassName`
This styles the dice itself, the container div.

`overlayClassName`
This styles the overlay which shows the 'Roll' message.

`progressClassName`
This styles the progress bar.

```js
<ReactDice 
  size={6} 
  diceClassName='myCustomDiceClass'
  overlayClassName='myCustomOverlayClass'
  progressClassName='myCustomProgressClass'
/>
```
## License

[MIT](http://vjpr.mit-license.org)
