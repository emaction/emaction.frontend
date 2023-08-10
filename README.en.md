# emaction

Emaction is a standard web component that can be used on any HTML page.

You can add emoji reaction functionality to your page, with just two lines of code.

## Demo
[https://emaction.cool](https://emaction.cool)

## Get started

### Via CDN (Recommended)
```
<script type="module" src="https://cdn.jsdelivr.net/gh/emaction/frontend.dist@1.0.9/bundle.js"></script>
```
then
```
<emoji-reaction></emoji-reaction>
```
That's it!

### NPM
```
npm install emaction
```

## Configuration

### Custom emojis
You can specify custom emoji through the `availableArrayString` property like this:
```
<emoji-reaction availableArrayString="👍,thumbs-up;😄,smile-face;🎉,party-popper;😕,confused-face;❤️,red-heart;🚀,rocket;👀,eyes;"></emoji-reaction>
```

### Custom theme
You can specify background color, font color, border color, etc. through CSS variables like this(you can name the class whatever you want):
```
<style>
  .reactions {
    --start-smile-border-color: #d0d7de;
    --start-smile-border-color-hover: #bbb;
    --start-smile-bg-color: #f6f8fa;
    --start-smile-svg-fill-color: #656d76;
    --reaction-got-not-reacted-bg-color: #fff;
    --reaction-got-not-reacted-bg-color-hover: #eaeef2;
    --reaction-got-not-reacted-border-color: #d0d7de;
    --reaction-got-not-reacted-text-color: #656d76;
    --reaction-got-reacted-bg-color: #ddf4ff;
    --reaction-got-reacted-bg-color-hover: #b6e3ff;
    --reaction-got-reacted-border-color: #0969da;
    --reaction-got-reacted-text-color: #0969da;
    --reaction-available-popup-bg-color: #fff;
    --reaction-available-popup-border-color: #d0d7de;
    --reaction-available-popup-box-shadow: #8c959f33 0px 8px 24px 0px;
    --reaction-available-emoji-reacted-bg-color: #ddf4ff;
    --reaction-available-emoji-bg-color-hover: #f3f4f6;
    --reaction-available-emoji-z-index: 100;
    --reaction-available-mask-z-index: 80;
  }
</style>
<emoji-reaction class="reactions"></emoji-reaction>
```
Where `start-smile` refers to the smile emoji that pops up the selectable emojis when clicked, `reaction-got` refers to the emoji reactions the current page has received, `reacted` means the current user has clicked that reaction, and `not-reacted` is the opposite, `reaction-available` refers to the reactions available for clicking on the current page.

### Dark mode
You can specify dark/light mode through the `theme` custom property, It supports `dark`, `light`, and `system` options, with `light` as the default.

### Custom backend
You can also reference [emaction.backend](https://github.com/emaction/emaction.backend) to build your own backend to save data, then specify the API address through the `endpoint` property.

### Custom target id
The target id is used to identify what the reaction is referring to (usually the page it is on). Typically you do not need to specify a target id, because emaction will look for the canonical meta tag to determine the canonical URL for the current page content. If you do need to customize the target id (for example, to add reactions for each individual comment on a page), you can specify it using the reactionTargetId attribute.
