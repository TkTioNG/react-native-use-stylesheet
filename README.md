# react-native-use-stylesheet

Simple responsive UI in React Native by extending `StyleSheet` with media query ability.

**NOTE:** This package is still on active development. Bugs and API changes is expected.

## 💍 Features

- Extend react-native built-in StyleSheet to accept media queries
- Utilize hooks for fast and accurate responsiveness
- Accept multiple queries, i.e. breakpoint, aspect ratio, platform and more
- Customizable breakpoint with context
- Built with Typescript

### 🟢 Why use us?

- Only want very **basic** media query support on top of `react-native` built-in API
- Only want a lightweight and less opinionated library
- In the midst of migrating to other UI framework, while still trying to push some responsive features

### 🔴 Why don't use us?

- Want a full fledge UI framework
- Looking for UI component library

**NOTE**: If you want a library for more complex use case, you should find another library or UI framework instead.

## Installation

```bash
npm install react-native-use-stylesheet
```

or yarn:

```bash
yarn add react-native-use-stylesheet
```

## Basic Usage

It will be the same as how you style with React Native built-in `StyleSheet`.

```tsx
import { StyleSheet, useStyleSheet } from 'react-native-use-stylesheet';

export default function MyComponent() {
  const queryStyles = useStyleSheet(styles);

  // ... later in code use queryStyles.wrapper
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    mediaQueries: [
      {
        query: { breakpoint: 'lg' },
        flexDirection: 'row', // Change direction for larger screen
      },
    ],
  },
});
```

If you need responsive UI support, you will need to use `useStyleSheet` hooks to achieve that.

## StyleSheet

It acts as a **drop-in** replacement for React Native's built-in [`StyleSheet`](https://reactnative.dev/docs/stylesheet).

In fact, you don't need to change to use our `StyleSheet` and stay with original `StyleSheet`. However, we provide type support for the media query properties, hence, will recommend you to switch it.

**How it works?**

It wraps original `StyleSheet` under the hood and return the same API.

For `StyleSheet`, the only thing that changed is the `.create()` method. We allow media query by extending the `NamedStyles` and add a new `mediaQueries` property.

### .create() Properties

It accepts the same styling object as `StyleSheet.create()` with extended properties:

|     Name     |          Type           | Description                                            |
| :----------: | :---------------------: | :----------------------------------------------------- |
| mediaQueries | `PossibleQueryStyles[]` | An array of styles with `query` property. _(optional)_ |

### PossibleQueryStyles

|      Name      |               Type               | Description                                                          |
| :------------: | :------------------------------: | :------------------------------------------------------------------- |
|   breakpoint   |       `sm` \| `md` \| `lg`       | Breakpoint based on the window width. _(optional)_                   |
|    minWidth    |             `number`             | Min width of the window. _(optional)_                                |
|    maxWidth    |             `number`             | Max width of the window. _(optional)_                                |
|   minHeight    |             `number`             | Min height of the window. _(optional)_                               |
|   maxHeight    |             `number`             | Max height of the window. _(optional)_                               |
| minAspectRatio |             `number`             | Min aspect ratio of the window. _(optional)_                         |
| maxAspectRatio |             `number`             | Max aspect ratio of the window. _(optional)_                         |
| minPixelRatio  |             `number`             | Min pixel ratio of the device. _(optional)_                          |
| maxPixelRatio  |             `number`             | Max pixel ratio of the device. _(optional)_                          |
|  minFontScale  |             `number`             | Min font scale of the device. _(optional)_                           |
|  maxFontScale  |             `number`             | Max font scale of the device. _(optional)_                           |
|  orientation   |    `landscape` \| `portrait`     | Current orientation of the device. _(optional)_                      |
|    platform    | `Platform.OS` \| `Platform.OS[]` | OS of the device, it can be a string or an array of OS. _(optional)_ |

### Example

`mediaQueries` property is an array of style with `query`, which allow you to conditionally provide styling with responsiveness.

You can put in multiple queries in the `query` properties, they will be treated with `AND` condition.

```tsx
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    flexDirection: 'column',
    mediaQueries: [
      {
        // Change flex direction for larger screen
        query: { breakpoint: 'lg' },
        flexDirection: 'row',
      },
      {
        // Change backgroundColor for landscape and device with min pixel ratio of 2.5
        query: { orientation: 'landscape', minPixelRatio: 2.5 },
        backgroundColor: 'black',
      },
    ],
  },
});
```

Furthermore, you can use breakpoint shorthand for `query`, i.e.:

```tsx
const styles = StyleSheet.create({
  wrapper: {
    color: 'white',
    mediaQueries: [
      {
        // Change text to red for medium breakpoint
        query: 'md',
        color: 'red',
      },
      {
        // Change text to blue for large breakpoint
        query: 'lg',
        color: 'blue',
      },
    ],
  },
});
```

This will not work out-of-the-box, in order to support the `mediaQueries`, you will need to compliment it with `useStyleSheet` hooks.

## useStyleSheet

It is a React hook that takes in style object with query and will return merged style based on the media query and current device conditions.

### Example

```tsx
function MyComponent() {
  const queryStyles = useStyleSheet(styles);

  // Default style
  // queryStyles = { wrapper: { color: "white" } }

  // For medium breakpoint screen
  // queryStyles = { wrapper: { color: "red" } }

  // For large breakpoint screen
  // queryStyles = { wrapper: { color: "blue" } }
}

// Example styles
const styles = StyleSheet.create({
  wrapper: {
    color: 'white',
    mediaQueries: [
      {
        // Change text to red for medium breakpoint
        query: 'md',
        color: 'red',
      },
      {
        // Change text to blue for large breakpoint
        query: 'lg',
        color: 'blue',
      },
    ],
  },
});
```

As you can see from the above example, all styling in the `mediaQueries` array will be merged back to the base style based on the condition of the device and its media queries.

## MediaQueryComponent

`<MediaQueryComponent />` will only render the children when media queries pass in are true. The media query properties are [`PossibleQueryStyles`](#possiblequerystyles).

### Example

It is the same with `query` property in `mediaQueries`, you can place multiple conditions in the component. They will be treated with `AND` condition.

If the media queries are not matched, nothing will be rendered.

```tsx
// Only shown when width is shorter than 600 and for ios/android device only
<MediaQueryComponent maxWidth={600} platform={['ios', 'android']}>
  <Children />
</MediaQueryComponent>
```

You can define a fallback component to render if the media query are not matched too.

```tsx
// If the orientation is landscape, <Landscape /> component will be rendered,
// else if it is portrait, fallback <Portrait /> will be rendered.
<MediaQueryComponent orientation="landscape" fallback={<Portrait />}>
  <Landscape />
</MediaQueryComponent>
```

## MediaQueryContext

It allows the user to modify the base media query configurations of this library through Reract context.

### Base Configurations

```tsx
{
  breakpoint: {
    sm: 400,
    md: 600,
    lg: 800,
  },
}
```

### Example

```tsx
import { MediaQueryContext } from 'react-native-use-stylesheet';

// Set a new breakpoints
const mediaQueryConfig = {
  breakpoint: {
    sm: 300,
    md: 600,
    lg: 900,
  },
};

// Wrap your app
<MediaQueryContext.Provider value={mediaQueryConfig}>
  <App />
</MediaQueryContext.Provider>;
```

**NOTE:** You don't need to use this context in your app, if you don't want to change the default configurations.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
